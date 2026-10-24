import { business, nav, products, branches, productOfferings, searchTerms } from './data.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Pages in products/ sit one level down, so every shared link takes a prefix.
export const up = (depth) => (depth ? '../' : '');

export function mark(depth) {
  return `<a class="mark" href="${up(depth)}index.html">
  <span class="mark-badge">PS</span>
  <span>
    <span class="mark-name">${business.name.replace(' Tractors', '')}</span>
    <span class="mark-sub">Tractors &middot; ${business.tagline}</span>
  </span>
</a>`;
}

export function telRow(phone) {
  return `<div class="tel-row">
  <span class="tel-num">${phone.display}</span>
  <button class="copy" type="button" data-copy="${phone.raw}">Copy</button>
</div>`;
}

function header(depth, current) {
  const p = up(depth);
  const navItems = nav
    .map((item) => {
      const href = item.href.startsWith('http') ? item.href : p + item.href;
      if (item.children) {
        const menu = products
          .map((pr) => `<a href="${p}products/${pr.slug}.html">${esc(pr.name)}</a>`)
          .join('\n');
        const here = current === 'products' ? ' aria-current="page"' : '';
        return `<div class="has-menu">
  <a class="nav-top" href="${p}products.html"${here}>${item.label}</a>
  <div class="nav-menu glass-dark">${menu}</div>
</div>`;
      }
      const aria = current === item.label.toLowerCase() ? ' aria-current="page"' : '';
      return `<a href="${href}"${aria} class="ta-swap" data-ta="${item.ta}">${item.label}</a>`;
    })
    .join('\n');

  const drawerItems = nav
    .map((item) => {
      const href = item.href.startsWith('http') ? item.href : p + item.href;
      if (item.children) {
        return (
          `<a href="${p}products.html">Products</a>` +
          products
            .map((pr) => `<a class="sub" href="${p}products/${pr.slug}.html">${esc(pr.name)}</a>`)
            .join('\n')
        );
      }
      return `<a href="${href}">${item.label}</a>`;
    })
    .join('\n');

  return `<header class="site-head">
  <div class="wrap">
    <div class="head-row glass-dark">
      ${mark(depth)}
      <nav class="nav" aria-label="Main">${navItems}</nav>
      <div class="head-tools">
        <button class="chip" id="lang-toggle" type="button" aria-pressed="false">தமிழ்</button>
        <button class="chip burger" id="burger" type="button" aria-expanded="false" aria-controls="drawer">Menu</button>
        <a class="btn btn-amber head-call" href="${p}contact.html">Enquire</a>
      </div>
    </div>
    <nav class="drawer glass-dark" id="drawer" aria-label="Mobile" hidden>${drawerItems}</nav>
  </div>
</header>`;
}

function socialRail(depth) {
  const p = up(depth);
  const links = [
    `<a href="${business.whatsapp}" target="_blank" rel="noopener" title="WhatsApp">WA</a>`,
    `<a href="${p}contact.html" title="Call us">Call</a>`,
    ...business.social.map(
      (s) => `<a href="${s.href}" target="_blank" rel="noopener" title="${s.label}">${s.short}</a>`,
    ),
    `<a href="${business.maps}" target="_blank" rel="noopener" title="Find the shop">Map</a>`,
  ].join('\n');
  return `<nav class="social-rail glass" aria-label="Contact shortcuts">${links}</nav>`;
}

function footer(depth) {
  const p = up(depth);
  const productLinks = products
    .map((pr) => `<li><a href="${p}products/${pr.slug}.html">${esc(pr.name)}</a></li>`)
    .join('\n');
  const quickLinks = nav
    .filter((i) => !i.children)
    .map((i) => `<li><a href="${i.href.startsWith('http') ? i.href : p + i.href}">${i.label}</a></li>`)
    .join('\n');
  const socialLinks = business.social
    .map((s) => `<li><a href="${s.href}" target="_blank" rel="noopener">${s.label}</a></li>`)
    .join('\n');
  const termPills = (list) =>
    list
      .map((t) => `<span>${esc(t.en)}<i>${esc(t.ta)}</i></span>`)
      .join('\n');

  return `<footer class="foot">
  <div class="wrap">
    <div class="foot-panel glass-dark on-dark">
      <div class="foot-grid">
        <div>
          ${mark(depth)}
          <p class="form-note" style="margin-top:16px;max-width:34ch;padding-left:0">Authorised dealer for VST Tillers Tractors and certified partner of Gomadhi Engineering, serving Namakkal, Trichy, Karur and Salem districts.</p>
          <div class="tel" style="margin-top:16px">${business.phones.map(telRow).join('\n')}</div>
        </div>
        <div>
          <h4>Products</h4>
          <ul>${productLinks}</ul>
        </div>
        <div>
          <h4>Quick links</h4>
          <ul>${quickLinks}<li><a href="${p}sitemap.xml">Sitemap</a></li></ul>
        </div>
        <div>
          <h4>Connect with us</h4>
          <ul>${socialLinks}
            <li><a href="${business.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="${business.maps}" target="_blank" rel="noopener">Find the shop</a></li>
          </ul>
        </div>
      </div>
      <details class="seo-block">
        <summary>Product offerings</summary>
        <div class="terms">${termPills(productOfferings)}</div>
      </details>
      <details class="seo-block">
        <summary>Common search terms</summary>
        <div class="terms">${termPills(searchTerms)}</div>
      </details>
      <div class="foot-bottom">
        <span>${esc(business.name)} &middot; Established ${business.since}</span>
        <span>Mon&ndash;Sat 9:00&ndash;18:00 &middot; Closed Sunday</span>
      </div>
    </div>
  </div>
</footer>`;
}

function mobileRail(depth) {
  const p = up(depth);
  return `<nav class="rail glass" aria-label="Quick actions">
  <a href="${business.whatsapp}" target="_blank" rel="noopener"><b>WhatsApp</b>Chat now</a>
  <a href="${p}contact.html"><b>Enquire</b>Send details</a>
  <a href="${p}branches.html"><b>Branches</b>6 shops</a>
  <a href="${p}index.html#equipment"><b>Range</b>7 ranges</a>
</nav>`;
}

/** Shared block: every branch as a glass card. */
export function branchGrid() {
  const cards = branches
    .map(
      (b) => `<article class="branch${b.head ? ' head' : ''} glass">
  <p class="num">${esc(b.kicker)}</p>
  <h3>${esc(b.name)}</h3>
  <address>${b.address.map(esc).join(',<br>')}</address>
  <div class="tel">${b.phones.map(telRow).join('\n')}</div>
  ${b.note ? `<p class="note">${esc(b.note)}</p>` : ''}
  <a class="pill-link" href="${b.maps}" target="_blank" rel="noopener">Get directions &rarr;</a>
</article>`,
    )
    .join('\n');

  return `<div class="branch-grid">${cards}
  <article class="branch soon">
    <span>New branch opening soon</span>
    <p class="tagline">Call the head office to find out where we are heading next.</p>
  </article>
</div>
<p class="hours">${esc(business.hours)}</p>`;
}

/** Shared block: the enquiry panel, used on the home and contact pages. */
export function enquiryPanel(depth, heading) {
  const machineOptions = products
    .map((p) => `<option>${esc(p.name)}</option>`)
    .join('\n') + '\n<option>Spares or service</option>';
  const branchOptions = branches
    .map((b) => `<option>${esc(b.name)}${b.head ? ' (head office)' : ''}</option>`)
    .join('\n');

  return `<div class="panel-dark glass-dark on-dark">
  <div class="two-col">
    <div>
      <p class="eyebrow">Enquiries</p>
      <h2 class="ta-swap" data-ta="எங்களை தொடர்பு கொள்ள">${heading}</h2>
      <p class="lede">Send an enquiry or simply call the head office. We answer in Tamil and English, Monday to Saturday.</p>
      <div class="tel" style="margin-top:26px">${business.phones.map(telRow).join('\n')}</div>
      <p class="form-note" style="margin-top:18px;padding-left:0">${business.address.lines.join(', ')}</p>
      <div class="cta-row">
        <a class="btn btn-amber" href="${business.whatsapp}" target="_blank" rel="noopener">Message on WhatsApp</a>
        <a class="btn btn-glass" href="${business.maps}" target="_blank" rel="noopener">Get directions</a>
      </div>
    </div>
    <form class="form" id="enquiry" novalidate>
      <div class="field">
        <label for="f-name">Your name</label>
        <input id="f-name" name="name" type="text" autocomplete="name">
      </div>
      <div class="field">
        <label for="f-phone">Phone number</label>
        <input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel">
      </div>
      <div class="field">
        <label for="f-machine">Machine you are interested in</label>
        <select id="f-machine" name="machine">${machineOptions}</select>
      </div>
      <div class="field">
        <label for="f-branch">Nearest branch</label>
        <select id="f-branch" name="branch">${branchOptions}</select>
      </div>
      <div class="field">
        <label for="f-msg">Acreage, crop or anything else</label>
        <textarea id="f-msg" name="message"></textarea>
      </div>
      <button class="btn btn-amber" type="submit">Prepare my enquiry</button>
      <p class="form-note" id="form-note">Submitting builds your enquiry as text you can copy into WhatsApp or read out on a call.</p>
    </form>
  </div>
</div>`;
}

/** Shared block: the inner-page header with breadcrumbs. */
export function pageHead(depth, { title, lede, image, crumbs }) {
  const p = up(depth);
  const trail = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<span>${esc(c.label)}</span>`
        : `<a href="${p + c.href}">${esc(c.label)}</a>`,
    )
    .join('<span>/</span>');
  return `<section class="page-head on-dark">
  ${image ? `<img class="page-head-img" src="${p}${image}" alt="">` : ''}
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">${trail}</nav>
    <h1>${title}</h1>
    ${lede ? `<p class="lede">${lede}</p>` : ''}
  </div>
</section>`;
}

/**
 * Wraps a page body. `mode` is "document" for a deployable file or "fragment"
 * for the Claude artifact, whose host supplies the document skeleton.
 */
export function shell({ depth = 0, current = '', title, description, body, jsonLd, mode = 'document' }) {
  const p = up(depth);
  const head = `<title>${esc(title)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@500;600&display=swap">
<link rel="stylesheet" href="${p}styles.css">`;

  const page = `${header(depth, current)}
<main>
${body}
</main>
${footer(depth)}
${socialRail(depth)}
${mobileRail(depth)}
<script src="${p}app.js" defer></script>`;

  if (mode === 'fragment') return `${head}\n${page}\n`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head}
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body>
${page}
</body>
</html>
`;
}
