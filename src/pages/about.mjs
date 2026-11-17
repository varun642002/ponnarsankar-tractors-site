import { business, stats, whyUs, partners, gallery } from '../data.mjs';
import { esc, pageHead, shell, img, SIZES } from '../layout.mjs';

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
      // the finished figure is in the markup, so the page reads correctly with
      // no script; app.js counts up to it when it first comes into view
      .map((s) => {
        const [, digits, suffix] = /^(\d+)(.*)$/.exec(s.value) || [, '', s.value];
        const count = digits ? ` data-count="${digits}" data-suffix="${esc(suffix)}"` : '';
        return `<div class="stat glass"><b${count}>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`;
      })
      .join('\n')}</div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="quote-panel quote-panel--wide glass">
      <div>
        <p class="eyebrow">Our commitment</p>
        <blockquote>Every farmer deserves machinery they can rely on, and service that does not disappear after the sale.</blockquote>
        <footer><b>${esc(business.name)}</b>Paramathi Velur, Namakkal</footer>
      </div>
      <figure class="quote-shots">
        ${img('assets/cultivator-cutout.png', { alt: 'A heavy duty chisel plough', sizes: SIZES.quote })}
      </figure>
    </div>
  </div>
</section>

<section class="band">
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

<section class="band" id="certificates">
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
  ${img(p.certificate, { alt: `${esc(p.name)} dealership certificate`, sizes: SIZES.certificate })}
  <h3>${esc(p.name)}</h3>
  <p>${esc(p.body)}</p>
</article>`,
      )
      .join('\n')}</div>
  </div>
</section>

<section class="band" id="gallery">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <p class="eyebrow">Recent handovers</p>
        <h2 class="ta-swap" data-ta="படத்தொகுப்பு">Machines going out to farmers across the districts</h2>
      </div>
      <p class="lede">Every photograph here is a customer collecting a machine from one of our branches. Select any photo to see it full size.</p>
    </div>
    <div class="gallery">${gallery
      .map(
        (g) => `<button type="button">${img(g.src, { alt: esc(g.alt), sizes: SIZES.gallery })}</button>`,
      )
      .join('\n')}</div>
  </div>
</section>

<section class="band">
  <div class="wrap cta-row" style="margin-top:0">
    <a class="btn btn-amber" href="index.html#equipment">Explore our products</a>
    <a class="btn btn-glass" href="contact.html">Contact us</a>
  </div>
</section>

<!-- Last, so it does not sit between two sections and break .band + .band -->
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
</div>`;

  return shell({
    current: 'about',
    title: 'About Ponnar Sankar Tractors',
    description:
      'Ponnar Sankar Tractors has served farmers across Tamil Nadu since 1988 as authorised dealers for VST Tillers Tractors and Gomadhi Engineering, with six branches and full after-sales support.',
    body,
  });
}
