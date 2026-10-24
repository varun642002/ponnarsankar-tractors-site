import {
  business, badges, carousel, stats, support, whyUs, partners,
  testimonials, gallery, products,
} from './data.mjs';
import { esc, branchGrid, enquiryPanel, pageHead, shell } from './layout.mjs';

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: business.name,
  foundingDate: String(business.since),
  telephone: business.phones.map((p) => p.raw),
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 09:00-18:00',
  sameAs: business.social.map((s) => s.href),
};

const badgeStrip = `<div class="badges">${badges
  .map(
    (b, i) => `<div class="badge glass">
  <i>${String(i + 1).padStart(2, '0')}</i>
  <span><b>${esc(b.title)}</b><span>${esc(b.note)}</span></span>
</div>`,
  )
  .join('\n')}</div>`;

const productCards = (depth = 0) =>
  `<div class="grid">${products
    .map(
      (p) => `<a class="card glass" href="${depth ? '' : ''}products/${p.slug}.html">
  <img class="card-img" src="${p.image}" alt="${esc(p.name)}" loading="lazy">
  <div class="card-body">
    <h3>${esc(p.name)}<span class="ta">${p.ta}</span></h3>
    <p class="tagline">${esc(p.summary)}</p>
    <ul class="tags">${p.models
      .slice(0, 4)
      .map((m) => `<li>${esc(m.name.replace(/^(VST Shakti |Gomadhi |Tractor )/, ''))}</li>`)
      .join('\n')}</ul>
    <div class="card-foot"><span class="pill-link">View details &rarr;</span></div>
  </div>
</a>`,
    )
    .join('\n')}</div>`;

const supportTiles = `<div class="tiles">${support
  .map(
    (s) => `<div class="tile glass">
  <p class="num">${esc(s.kicker)}</p>
  <h3>${esc(s.title)}</h3>
  <p>${esc(s.body)}</p>
</div>`,
  )
  .join('\n')}</div>`;

const partnerCards = `<div class="partners">${partners
  .map(
    (p) => `<article class="partner glass">
  <div class="partner-top">
    <h3>${esc(p.name)}</h3>
    ${p.logo ? `<img class="partner-logo" src="${p.logo}" alt="${esc(p.name)}" loading="lazy">` : ''}
  </div>
  <span class="seal">${esc(p.seal)}</span>
  <p class="tagline">${esc(p.body)}</p>
  <ul class="checks">${p.points.map((t) => `<li>${esc(t)}</li>`).join('\n')}</ul>
  <a class="pill-link" href="${p.site}" target="_blank" rel="noopener">Visit website &rarr;</a>
</article>`,
  )
  .join('\n')}</div>`;

const quoteBlock = `<div class="quote-panel glass">
  <p class="eyebrow">From a customer</p>
  ${testimonials
    .map(
      (t) => `<blockquote>&ldquo;${esc(t.quote)}&rdquo;</blockquote>
  <footer><b>${esc(t.name)}</b>${esc(t.role)}</footer>`,
    )
    .join('\n')}
</div>`;

/* ------------------------------------------------------------------ home */

export function home(mode) {
  const slides = carousel
    .map(
      (s, i) => `<article class="slide${i === 0 ? ' is-active' : ''}" aria-hidden="${i !== 0}">
  <img class="slide-img" src="${s.image}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
  <div class="wrap slide-inner">
    <p class="eyebrow">${esc(s.eyebrow)}</p>
    ${i === 0 ? '<h1>' : '<h2>'}${s.title}${i === 0 ? '</h1>' : '</h2>'}
    <p class="lede">${esc(s.body)}</p>
    <div class="cta-row">
      <a class="btn btn-amber" href="${s.cta.href}">${esc(s.cta.label)}</a>
      <a class="btn btn-glass" href="branches.html">Find your branch</a>
    </div>
  </div>
</article>`,
    )
    .join('\n');

  const dots = carousel
    .map(
      (s, i) =>
        `<button class="dot" type="button" role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}: ${esc(s.eyebrow)}"></button>`,
    )
    .join('\n');

  const body = `<section class="hero on-dark">
  <div class="slides">${slides}</div>
  <div class="slide-nav" role="tablist" aria-label="Featured equipment">
    <button class="arrow" id="slide-prev" type="button" aria-label="Previous slide">&larr;</button>
    ${dots}
    <button class="arrow" id="slide-next" type="button" aria-label="Next slide">&rarr;</button>
  </div>
  <div class="wrap plate-wrap">
    <div class="plate">
      <div class="glass-dark"><dt>1988</dt><dd>Serving farmers since</dd></div>
      <div class="glass-dark"><dt>6 branches</dt><dd>Across Tamil Nadu</dd></div>
      <div class="glass-dark"><dt>7 ranges</dt><dd>Of farm machinery</dd></div>
      <div class="glass-dark"><dt>2 dealerships</dt><dd>VST and Gomadhi</dd></div>
    </div>
  </div>
</section>

<section class="band-tight"><div class="wrap">${badgeStrip}</div></section>

<section class="band" id="equipment" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Equipment range</p>
        <h2 class="ta-swap" data-ta="விவசாய உபகரணங்கள்">Everything from first tillage to the last bale</h2>
      </div>
      <p class="lede">Each range is stocked with genuine VST and Gomadhi models, demonstrated on your own land before you buy, and backed by spares held at every branch.</p>
    </div>
    ${productCards()}
  </div>
</section>

<section class="band" id="support" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">After-sales support</p>
        <h2 class="ta-swap" data-ta="விற்பனைக்குப் பின் சேவை">A machine is only as good as the service behind it</h2>
      </div>
      <p class="lede">Downtime in the middle of a season costs more than the repair. Every branch keeps trained mechanics and the parts they need on the shelf.</p>
    </div>
    ${supportTiles}
  </div>
</section>

<section class="band" id="partners" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Authorised dealerships</p>
        <h2 class="ta-swap" data-ta="அங்கீகரிக்கப்பட்ட பங்காளிகள்">Certificates on the wall, not just claims on a page</h2>
      </div>
      <p class="lede">Both dealership certificates are held at the head office and shown in full on the about page.</p>
    </div>
    ${partnerCards}
  </div>
</section>

<section class="band" style="padding-top:0"><div class="wrap">${quoteBlock}</div></section>

<section class="band" id="branches" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Branch network</p>
        <h2 class="ta-swap" data-ta="எங்கள் கிளைகள்">Six branches, one phone call away</h2>
      </div>
      <p class="lede">Sales, spares and service at every location. Call ahead and we will keep the machine you want ready to look at.</p>
    </div>
    ${branchGrid()}
  </div>
</section>

<section class="band" id="contact" style="padding-top:0">
  <div class="wrap">${enquiryPanel(0, 'Tell us what you farm, we will tell you what fits')}</div>
</section>`;

  return shell({
    mode,
    current: 'home',
    title: 'Ponnar Sankar Tractors',
    description:
      'Authorised VST Tillers and Gomadhi Engineering dealer in Paramathi Velur, Namakkal. Power tillers, round balers, rotavators, cultivators, tippers, water tankers and mulchers, with spares and service from six branches across Tamil Nadu since 1988.',
    jsonLd: localBusiness,
    body,
  });
}

/* ------------------------------------------------------------------- 404 */

/**
 * The host serves this for any unknown path, including deep ones like
 * /products/typo.html, so it carries a <base> and every link resolves from the
 * site root rather than from whatever was typed.
 */
export function notFound(base) {
  const ranges = products
    .map((p) => `<li><a class="pill-link" href="products/${p.slug}.html">${esc(p.name)}</a></li>`)
    .join('\n');

  const body = `<section class="page-head on-dark">
  <img class="page-head-img" src="assets/hero-cultivator.webp" alt="">
  <div class="wrap">
    <p class="eyebrow">404</p>
    <h1>This page is not here</h1>
    <p class="lede">The address may have changed, or it may have been mistyped. Everything we sell is one of the links below.</p>
    <div class="cta-row">
      <a class="btn btn-amber" href="index.html">Back to the home page</a>
      <a class="btn btn-glass" href="contact.html">Contact us</a>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Equipment range</p>
        <h2>Looking for a machine?</h2>
      </div>
      <p class="lede">Or call the head office on ${business.phones[0].display} and we will point you to the right one.</p>
    </div>
    <ul class="link-row">${ranges}</ul>
  </div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Everything else</p>
        <h2>The rest of the site</h2>
      </div>
    </div>
    <ul class="link-row">
      <li><a class="pill-link" href="index.html">Home</a></li>
      <li><a class="pill-link" href="products.html">Products</a></li>
      <li><a class="pill-link" href="about.html">About</a></li>
      <li><a class="pill-link" href="about.html#gallery">Gallery</a></li>
      <li><a class="pill-link" href="branches.html">Branches</a></li>
      <li><a class="pill-link" href="contact.html">Contact</a></li>
    </ul>
  </div>
</section>`;

  return shell({
    base,
    title: 'Page not found — Ponnar Sankar Tractors',
    description: 'That page could not be found. Browse the equipment ranges, branches and contact details for Ponnar Sankar Tractors.',
    body,
  });
}

/* -------------------------------------------------------- products index */

export function productsIndex() {
  const body = `${pageHead(0, {
    title: 'Our products',
    lede: 'Seven ranges of farm machinery, all stocked, demonstrated on your own land and serviced from the branch you bought them from.',
    image: 'assets/hero-cultivator.webp',
    crumbs: [{ label: 'Home', href: 'index.html' }, { label: 'Products' }],
  })}

<section class="band">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Equipment range</p>
        <h2 class="ta-swap" data-ta="விவசாய உபகரணங்கள்">Choose a range to see every model and its specifications</h2>
      </div>
      <p class="lede">We are authorised dealers for VST Tillers Tractors and Gomadhi Engineering, and we build the cultivators, tippers and tankers ourselves.</p>
    </div>
    ${productCards()}
  </div>
</section>

<section class="band" style="padding-top:0"><div class="wrap">${badgeStrip}</div></section>

<section class="band" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Support</p>
        <h2>Bought here, serviced here</h2>
      </div>
      <p class="lede">Every machine we sell is installed, demonstrated and serviced by the branch it came from.</p>
    </div>
    ${supportTiles}
  </div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">${enquiryPanel(0, 'Not sure which machine fits your land?')}</div>
</section>`;

  return shell({
    current: 'products',
    title: 'Products — Ponnar Sankar Tractors',
    description:
      'Power tillers, round balers, rotavators, cultivators and ploughs, tippers, water tankers and mulchers from Ponnar Sankar Tractors, authorised VST and Gomadhi dealers in Namakkal.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Farm machinery ranges',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `https://ponnarsankartractors.com/products/${p.slug}.html`,
      })),
    },
    body,
  });
}

/* ----------------------------------------------------------------- about */

export function about() {
  const body = `${pageHead(0, {
    title: 'Empowering farmers <em>since 1988</em>',
    lede: 'A trusted name in agricultural machinery across Tamil Nadu, and authorised dealers for VST Tillers Tractors and Gomadhi Engineering.',
    image: 'assets/about-hero.png',
    crumbs: [{ label: 'Home', href: 'index.html' }, { label: 'About' }],
  })}

<section class="band">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Who we are</p>
        <h2>Thirty-five years of the same advice: buy what suits your land</h2>
      </div>
      <div>
        <p class="lede">Since 1988 we have sold premium power tillers, rotary tillers, round balers and a complete range of farm implements. With six branches we serve farmers of every scale — and our commitment runs past the sale, into spares, servicing and technical help that keeps the machine working.</p>
      </div>
    </div>
    <div class="stat-grid">${stats
      .map((s) => `<div class="stat glass"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`)
      .join('\n')}</div>
  </div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">
    <div class="quote-panel glass">
      <p class="eyebrow">Our commitment</p>
      <blockquote>Every farmer deserves machinery they can rely on, and service that does not disappear after the sale.</blockquote>
      <footer><b>${esc(business.name)}</b>Paramathi Velur, Namakkal</footer>
    </div>
  </div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Why choose us</p>
        <h2>Six reasons farmers keep coming back</h2>
      </div>
      <p class="lede">Most of our customers arrive because a neighbour sent them. These are the reasons they give.</p>
    </div>
    <div class="tiles">${whyUs
      .map(
        (w, i) => `<div class="tile glass">
  <p class="num">${String(i + 1).padStart(2, '0')}</p>
  <h3>${esc(w.title)}</h3>
  <p>${esc(w.body)}</p>
</div>`,
      )
      .join('\n')}</div>
  </div>
</section>

<section class="band" id="certificates" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Authorised certifications</p>
        <h2>The dealership certificates in full</h2>
      </div>
      <p class="lede">Official certificates from both manufacturers, held at the head office and reproduced here.</p>
    </div>
    <div class="cert-grid">${partners
      .map(
        (p) => `<article class="cert glass">
  <img src="${p.certificate}" alt="${esc(p.name)} dealership certificate" loading="lazy">
  <h3>${esc(p.name)}</h3>
  <p>${esc(p.body)}</p>
</article>`,
      )
      .join('\n')}</div>
  </div>
</section>

<section class="band" id="gallery" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Equipment in action</p>
        <h2 class="ta-swap" data-ta="படத்தொகுப்பு">Our machines working on real Tamil Nadu farms</h2>
      </div>
      <p class="lede">Photographs from customer fields and demonstrations. Select any photo to see it full size.</p>
    </div>
    <div class="gallery">${gallery
      .map(
        (g) => `<button type="button"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy"></button>`,
      )
      .join('\n')}</div>
  </div>
</section>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Gallery photo" hidden>
  <div>
    <img id="lightbox-img" src="" alt="">
    <div class="lightbox-bar">
      <button class="arrow" id="lightbox-prev" type="button" aria-label="Previous photo">&larr;</button>
      <span class="lightbox-count" id="lightbox-count"></span>
      <button class="arrow" id="lightbox-next" type="button" aria-label="Next photo">&rarr;</button>
      <button class="arrow" id="lightbox-close" type="button" aria-label="Close gallery">&times;</button>
    </div>
  </div>
</div>

<section class="band" style="padding-top:0">
  <div class="wrap" style="display:flex;flex-wrap:wrap;gap:12px">
    <a class="btn btn-amber" href="index.html#equipment">Explore our products</a>
    <a class="btn btn-glass" href="contact.html">Contact us</a>
  </div>
</section>`;

  return shell({
    current: 'about',
    title: 'About Ponnar Sankar Tractors',
    description:
      'Ponnar Sankar Tractors has served farmers across Tamil Nadu since 1988 as authorised dealers for VST Tillers Tractors and Gomadhi Engineering, with six branches and full after-sales support.',
    body,
  });
}

/* -------------------------------------------------------------- branches */

export function branchesPage() {
  const body = `${pageHead(0, {
    title: 'Our branches',
    lede: 'Visit us at any of our locations across Namakkal, Trichy and Karur districts.',
    image: 'assets/hero-cultivator.webp',
    crumbs: [{ label: 'Home', href: 'index.html' }, { label: 'Branches' }],
  })}

<section class="band">
  <div class="wrap">
    ${branchGrid()}
  </div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">${enquiryPanel(0, 'Call ahead and we will have the machine ready')}</div>
</section>`;

  return shell({
    current: 'branches',
    title: 'Branches — Ponnar Sankar Tractors',
    description:
      'Six Ponnar Sankar Tractors branches across Tamil Nadu: Paramathi Velur head office, Myalampatti, Manapaarai, Thuraiyur, Kulithalai and Rasipuram.',
    jsonLd: localBusiness,
    body,
  });
}

/* --------------------------------------------------------------- contact */

export function contact() {
  const body = `${pageHead(0, {
    title: 'Contact us',
    lede: 'Call, message on WhatsApp, or send an enquiry and we will come back to you.',
    image: 'assets/hero-tiller.webp',
    crumbs: [{ label: 'Home', href: 'index.html' }, { label: 'Contact' }],
  })}

<section class="band">
  <div class="wrap">${enquiryPanel(0, 'Tell us what you farm, we will tell you what fits')}</div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Head office</p>
        <h2>Where to find us</h2>
      </div>
      <p class="lede">${esc(business.hours)}</p>
    </div>
    ${branchGrid()}
  </div>
</section>`;

  return shell({
    current: 'contact',
    title: 'Contact Ponnar Sankar Tractors',
    description:
      'Call +91 90423 50451 or +91 94434 24552, or visit the Ponnar Sankar Tractors head office on Bypass Road, Padamudipaalayam, Paramathi Velur, Namakkal.',
    jsonLd: localBusiness,
    body,
  });
}

/* -------------------------------------------------------- product detail */

export function productPage(product) {
  const side = `<nav class="side glass" aria-label="Product ranges">
  <h2>All ranges</h2>
  ${products
    .map(
      (p) =>
        `<a href="${p.slug}.html"${p.slug === product.slug ? ' aria-current="page"' : ''}>${esc(p.name)}</a>`,
    )
    .join('\n')}
</nav>`;

  const models = product.models
    .map((m) => {
      const specs = m.specs && m.specs.length
        ? `<dl class="spec-pills">${m.specs
            .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
            .join('\n')}</dl>`
        : `<p class="on-request">Specifications for this model on request — call the branch or send an enquiry.</p>`;

      const features = m.features
        ? `<ul class="checks">${m.features.map((f) => `<li>${esc(f)}</li>`).join('\n')}</ul>`
        : '';

      const table = m.table
        ? `<div>
  <p class="num" style="margin-bottom:12px">${esc(m.table.caption)}</p>
  <div class="table-scroll">
    <table>
      <thead><tr>${m.table.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${m.table.rows
        .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`)
        .join('\n')}</tbody>
    </table>
  </div>
  ${m.table.note ? `<p class="note" style="margin-top:10px">${esc(m.table.note)}</p>` : ''}
</div>`
        : '';

      return `<article class="model glass">
  ${m.image ? `<figure class="model-media">
    <img src="../${m.image}" alt="${esc(m.name)}" loading="lazy">
  </figure>` : ''}
  <div class="model-info">
    <div class="model-top">
      <h3>${esc(m.name)}</h3>
      <span class="maker">${esc(m.maker)}</span>
    </div>
    <p>${esc(m.body)}</p>
    ${specs}
    ${features}
    ${table}
    <div class="cta-row" style="margin-top:4px">
      <a class="btn btn-amber" href="../contact.html">Request a price</a>
      <a class="btn btn-glass" href="${business.whatsapp}" target="_blank" rel="noopener">Ask on WhatsApp</a>
    </div>
  </div>
</article>`;
    })
    .join('\n');

  const body = `${pageHead(1, {
    title: esc(product.name),
    lede: esc(product.intro),
    image: product.image,
    crumbs: [
      { label: 'Home', href: 'index.html' },
      { label: 'Products', href: 'index.html#equipment' },
      { label: product.name },
    ],
  })}

<section class="band">
  <div class="wrap product-layout">
    ${side}
    <div>
      <p class="eyebrow">${esc(product.maker)} &middot; ${product.models.length} model${product.models.length > 1 ? 's' : ''}</p>
      ${models}
    </div>
  </div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Support</p>
        <h2>Bought here, serviced here</h2>
      </div>
      <p class="lede">Every machine we sell is installed, demonstrated and serviced by the branch it came from.</p>
    </div>
    ${supportTiles}
  </div>
</section>

<section class="band" style="padding-top:0">
  <div class="wrap">${enquiryPanel(1, 'Ask about ' + esc(product.name).toLowerCase())}</div>
</section>`;

  return shell({
    depth: 1,
    current: 'products',
    title: `${product.name} — Ponnar Sankar Tractors`,
    description: `${product.summary} ${product.name} from ${product.maker}, sold and serviced by Ponnar Sankar Tractors across Namakkal, Trichy and Karur districts.`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: product.name,
      itemListElement: product.models.map((m, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Product', name: m.name, brand: m.maker, description: m.body },
      })),
    },
    body,
  });
}
