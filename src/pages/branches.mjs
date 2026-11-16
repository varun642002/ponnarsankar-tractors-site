import { business } from '../data.mjs';
import { esc, branchGrid, enquiryPanel, pageHead, shell } from '../layout.mjs';
import { localBusiness } from '../components.mjs';

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

<section class="band">
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

<section class="band">
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
