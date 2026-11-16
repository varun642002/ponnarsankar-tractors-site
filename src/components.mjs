/** Fragments shared by more than one page. */
import { business, badges, support, partners, testimonials, products } from './data.mjs';
import { esc, img, SIZES } from './layout.mjs';

export const localBusiness = {
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

export const badgeStrip = `<div class="badges">${badges
  .map(
    (b, i) => `<div class="badge glass">
  <i>${String(i + 1).padStart(2, '0')}</i>
  <span><b>${esc(b.title)}</b><span>${esc(b.note)}</span></span>
</div>`,
  )
  .join('\n')}</div>`;

export const productCards = (depth = 0) =>
  `<div class="grid">${products
    .map(
      (p) => `<a class="card glass" href="${depth ? '' : ''}products/${p.slug}.html">
  ${img(p.image, { cls: 'card-img', alt: esc(p.name), sizes: SIZES.card })}
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

export const supportTiles = `<div class="tiles">${support
  .map(
    (s) => `<div class="tile glass">
  <p class="num">${esc(s.kicker)}</p>
  <h3>${esc(s.title)}</h3>
  <p>${esc(s.body)}</p>
</div>`,
  )
  .join('\n')}</div>`;

export const partnerCards = `<div class="partners">${partners
  .map(
    (p) => `<article class="partner glass">
  <div class="partner-top">
    <h3>${esc(p.name)}</h3>
    ${p.logo ? img(p.logo, { cls: 'partner-logo', alt: esc(p.name), sizes: SIZES.logo }) : ''}
  </div>
  <span class="seal">${esc(p.seal)}</span>
  <p class="tagline">${esc(p.body)}</p>
  <ul class="checks">${p.points.map((t) => `<li>${esc(t)}</li>`).join('\n')}</ul>
  <a class="pill-link" href="${p.site}" target="_blank" rel="noopener">Visit website &rarr;</a>
</article>`,
  )
  .join('\n')}</div>`;

export const quoteBlock = `<div class="quote-panel glass">
  <p class="eyebrow">From a customer</p>
  ${testimonials
    .map(
      (t) => `<blockquote>&ldquo;${esc(t.quote)}&rdquo;</blockquote>
  <footer><b>${esc(t.name)}</b>${esc(t.role)}</footer>`,
    )
    .join('\n')}
</div>`;
