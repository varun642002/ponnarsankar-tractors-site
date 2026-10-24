// Generates the static site into dist/.
//
// Every page is written twice over: dist/*.html are standalone documents for
// real hosting, and dist/index.artifact.html is the same home page without the
// document skeleton, because the Claude artifact host supplies its own.
import { writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { products } from './src/data.mjs';
import { home, productsIndex, about, branchesPage, contact, productPage, notFound } from './src/pages.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, 'dist');
// Where the built site will be served from, used by sitemap.xml and robots.txt.
// Override when deploying elsewhere:
//   SITE_ORIGIN=https://ponnarsankartractors.com node build.mjs
const ORIGIN = (process.env.SITE_ORIGIN || 'https://varun642002.github.io/ponnarsankar-tractors-site').replace(/\/$/, '');

const pages = [
  ['index.html', home('document'), '1.0'],
  ['products.html', productsIndex(), '0.9'],
  ['about.html', about(), '0.8'],
  ['branches.html', branchesPage(), '0.8'],
  ['contact.html', contact(), '0.8'],
  ...products.map((p) => [`products/${p.slug}.html`, productPage(p), '0.9']),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([path, , priority]) =>
      `  <url><loc>${ORIGIN}/${path === 'index.html' ? '' : path}</loc><priority>${priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Sitemap: ${ORIGIN}/sitemap.xml
`;

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'products'), { recursive: true });

for (const [path, html] of pages) {
  await writeFile(join(dist, path), html);
}
// Served for any unknown path, so it is not in the sitemap and its links are
// resolved against the deploy's base path rather than the path that was typed.
await writeFile(join(dist, '404.html'), notFound(new URL(ORIGIN + '/').pathname));
await writeFile(join(dist, 'index.artifact.html'), home('fragment'));
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(join(dist, 'robots.txt'), robots);
await cp(join(here, 'src', 'styles.css'), join(dist, 'styles.css'));
await cp(join(here, 'src', 'app.js'), join(dist, 'app.js'));
await cp(join(here, 'assets'), join(dist, 'assets'), { recursive: true });

console.log(`built site/dist — ${pages.length} pages`);
