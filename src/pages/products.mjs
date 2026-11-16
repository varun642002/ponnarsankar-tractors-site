import { business, products } from '../data.mjs';
import { esc, enquiryPanel, pageHead, shell, img, SIZES } from '../layout.mjs';
import { badgeStrip, productCards, supportTiles } from '../components.mjs';

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

<section class="band"><div class="wrap">${badgeStrip}</div></section>

<section class="band">
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

<section class="band">
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
    ${img(m.image, { alt: esc(m.name), sizes: SIZES.model, prefix: '../' })}
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

<section class="band">
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

<section class="band">
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
