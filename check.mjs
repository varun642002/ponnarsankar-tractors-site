/** Verifies the built site in dist/. No dependencies; run it after build.mjs.
 *
 *     node build.mjs && node check.mjs
 *
 * This catches the kinds of breakage that otherwise deploy silently: a link or
 * image path that does not resolve, an image shipped at full size because
 * optimize.py was not re-run, a template that rendered "undefined", a page
 * missing from the sitemap. Exits non-zero on the first failing category so CI
 * can gate the deploy on it.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, normalize, posix, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const problems = [];
const fail = (page, msg) => problems.push(`${page}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(dist);
const present = new Set(files.map((f) => relative(dist, f).split('\\').join('/')));
const pages = [...present].filter((p) => p.endsWith('.html') && p !== 'index.artifact.html');

if (pages.length < 12) fail('build', `expected at least 12 pages, found ${pages.length}`);

/**
 * Resolve an href/src found on `page` to a path relative to dist.
 *
 * Root-relative refs resolve from dist, never from the page's directory, or a
 * nested page's "/assets/x.webp" would be looked for under products/. The 404
 * sets a <base> of the deploy root, so all of its refs are root-relative.
 */
const resolveRef = (page, ref) => {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return '';
  const rootRelative = clean.startsWith('/') || page === '404.html';
  const dir = rootRelative ? '' : posix.dirname(page);
  const joined = posix.join(dir === '.' ? '' : dir, clean.replace(/^\//, ''));
  const path = normalize(joined).split('\\').join('/');
  // a link to a directory is served by its index.html
  return path.endsWith('/') ? path + 'index.html' : path;
};

const attrs = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

for (const page of pages) {
  const raw = await readFile(join(dist, page), 'utf8');
  // the <base> tag's own href is not a link to check
  const html = raw.replace(/<base[^>]*>/g, '');
  const label = page;

  // 1. templates that rendered nothing useful, anywhere in the markup
  //    (scripts are excluded: JSON-LD and inline code may use these words)
  const prose = html.replace(/<script[\s\S]*?<\/script>/g, '');
  for (const bad of [/\bundefined\b/, /\bNaN\b/, /\[object Object\]/]) {
    if (bad.test(prose)) fail(label, `rendered ${String(bad)}`);
  }

  // 2. structure every page must have
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(label, `expected exactly one <h1>, found ${h1s}`);
  if (!html.includes('class="head-row')) fail(label, 'missing the header');
  if (!html.includes('class="foot')) fail(label, 'missing the footer');
  if (!/<title>[^<]{3,}<\/title>/.test(html)) fail(label, 'missing a real <title>');
  if (!/name="description" content="[^"]{30,}"/.test(html)) fail(label, 'missing a description');

  // 3. internal links resolve
  for (const href of attrs(html, /href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    const target = resolveRef(page, href);
    if (!target || target === '.') continue;
    if (!present.has(target)) fail(label, `dead link -> ${href}`);
  }

  // 4. images and every srcset candidate resolve
  for (const src of attrs(html, /<img[^>]+src="([^"]+)"/g)) {
    if (!src || src.startsWith('data:')) continue;
    if (!present.has(resolveRef(page, src))) fail(label, `missing image -> ${src}`);
  }
  for (const set of attrs(html, /srcset="([^"]+)"/g)) {
    for (const candidate of set.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (!present.has(resolveRef(page, url))) fail(label, `missing srcset file -> ${url}`);
    }
  }

  // 5. an <img> pointing at a source that has variants means optimize.py ran
  //    but the template bypassed img(), or ran after the build
  for (const src of attrs(html, /<img[^>]+src="([^"]+)"/g)) {
    const m = /([^/]+)\.(?:webp|jpe?g|png)$/i.exec(src || '');
    if (!m || /-(?:480|720|960|1440)$/.test(m[1])) continue;
    const hasVariant = [480, 720, 960, 1440].some((w) => present.has(`assets/${m[1]}-${w}.webp`));
    if (hasVariant) fail(label, `full-size image used while variants exist -> ${src}`);
  }

  // 6. srcset needs sizes, or the browser assumes 100vw
  const imgTags = html.match(/<img[^>]*>/g) || [];
  for (const tag of imgTags) {
    if (tag.includes('srcset=') && !tag.includes('sizes=')) fail(label, 'srcset without sizes');
  }
}

// 7. the 404 must carry a base, or it breaks when served from a deep path
const notFound = await readFile(join(dist, '404.html'), 'utf8');
if (!/<base href="[^"]+">/.test(notFound)) fail('404.html', 'missing <base>');

// 8. sitemap covers every page except the 404 and the artifact fragment
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
// The origin is configurable, so take it from the home entry and then require
// an exact one-to-one match with the pages — a loose "ends with /" test would
// accept a sitemap that had lost its home page.
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const home = locs.find((l) => l.endsWith('/'));
if (!home) {
  fail('sitemap.xml', 'has no entry for the home page');
} else {
  const expected = new Set(
    pages.filter((p) => p !== '404.html').map((p) => (p === 'index.html' ? home : home + p)),
  );
  for (const want of expected) if (!locs.includes(want)) fail('sitemap.xml', `does not list ${want}`);
  for (const got of locs) if (!expected.has(got)) fail('sitemap.xml', `lists something unexpected: ${got}`);
}

// 9. the assets actually shipped should be variants, not the heavy sources
// the largest legitimate variant is around 150KB; a source slipping through
// would be 250KB and up
const MAX_ASSET_KB = 200;
const heavy = [];
for (const file of files.filter((f) => /assets[\\/][^\\/]+\.(webp|jpe?g|png)$/i.test(f))) {
  const { size } = await stat(file);
  if (size > MAX_ASSET_KB * 1024) heavy.push(`${relative(dist, file)} ${Math.round(size / 1024)}KB`);
}
if (heavy.length) fail('assets', `files over ${MAX_ASSET_KB}KB shipped: ${heavy.join(', ')}`);

if (problems.length) {
  console.error(`check failed — ${problems.length} problem(s):\n`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log(`check passed — ${pages.length} pages, ${present.size} files, all links and images resolve`);
