import { business, products } from '../data.mjs';
import { esc, shell, img, SIZES } from '../layout.mjs';

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
  ${img('assets/hero-cultivator.webp', { cls: 'page-head-img', sizes: SIZES.full })}
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

<section class="band">
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
