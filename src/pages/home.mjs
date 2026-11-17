import { carousel } from '../data.mjs';
import { esc, branchGrid, enquiryPanel, shell, img, SIZES } from '../layout.mjs';
import { localBusiness, badgeStrip, productCards, supportTiles, partnerCards, quoteBlock } from '../components.mjs';

export function home(mode) {
  const slides = carousel
    .map(
      (s, i) => `<article class="slide${i === 0 ? ' is-active' : ''}" aria-hidden="${i !== 0}">
  ${img(s.image, { cls: 'slide-img', sizes: SIZES.full, eager: i === 0 })}
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
    <button class="arrow" id="slide-pause" type="button" aria-label="Pause the slideshow"><svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" focusable="false"><rect x="2" y="1" width="3.5" height="12" fill="currentColor"/><rect x="8.5" y="1" width="3.5" height="12" fill="currentColor"/></svg></button>
  </div>
  <p class="sr-only" id="slide-status" role="status" aria-live="polite"></p>
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

<section class="band" id="equipment">
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

<section class="band band-dark" id="support">
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

<section class="band" id="partners">
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

<section class="band"><div class="wrap">${quoteBlock}</div></section>

<section class="band" id="branches">
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

<section class="band" id="contact">
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
