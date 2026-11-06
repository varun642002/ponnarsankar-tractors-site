import { test, expect } from '@playwright/test';

/**
 * Every assertion here corresponds to a bug this site actually shipped at some
 * point: a table that pushed the page sideways, a menu the bottom bar covered,
 * Copy buttons too small for a thumb, a header button that reappeared on
 * phones, and a 404 that arrived unstyled from a deep path.
 */

const PAGES = [
  '/index.html',
  '/products.html',
  '/about.html',
  '/branches.html',
  '/contact.html',
  '/404.html',
  '/products/power-tiller.html',
  '/products/round-baler.html',
  '/products/rotavator.html',
  '/products/cultivator.html',
  '/products/tipper.html',
  '/products/water-tanker.html',
  '/products/mulcher.html',
];

for (const path of PAGES) {
  test(`${path} does not scroll sideways`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'horizontal overflow in CSS pixels').toBe(0);
  });

  test(`${path} has thumb-sized controls`, async ({ page }) => {
    await page.goto(path);
    const tooSmall = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('a,button,input,select,textarea')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        // the wordmark is a wide secondary target and is allowed to be shorter
        if (el.classList.contains('mark')) continue;
        if (r.height < 44) out.push(`${el.className || el.tagName} ${Math.round(r.height)}px`);
      }
      return [...new Set(out)];
    });
    expect(tooSmall, 'controls under 44px tall').toEqual([]);
  });
}

test('the menu covers the page and hides the bottom bar', async ({ page }) => {
  await page.goto('/products.html');
  const drawer = page.locator('#drawer');
  const burger = page.locator('#burger');

  await expect(drawer).toBeHidden();
  await burger.click();

  await expect(drawer).toBeVisible();
  await expect(burger).toHaveText('Close');
  await expect(page.locator('.rail')).toBeHidden();

  const state = await page.evaluate(() => {
    const d = document.getElementById('drawer');
    return {
      position: getComputedStyle(d).position,
      opacity: getComputedStyle(d).backgroundColor,
      bottom: Math.round(d.getBoundingClientRect().bottom),
      viewport: document.documentElement.clientHeight,
      bodyOverflow: getComputedStyle(document.body).overflow,
    };
  });
  expect(state.position, 'drawer must overlay, not push the page').toBe('fixed');
  expect(state.bottom, 'drawer must end inside the screen').toBeLessThanOrEqual(state.viewport);
  expect(state.bodyOverflow, 'page behind must not scroll').toBe('hidden');
  // 0.76 was see-through enough for page text to read through the panel
  const alpha = Number(/rgba?\([^)]*?,\s*([\d.]+)\s*\)/.exec(state.opacity)?.[1] ?? 1);
  expect(alpha, 'panel must be near-opaque').toBeGreaterThanOrEqual(0.9);

  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(page.locator('.rail')).toBeVisible();
});

test('Enquire stays out of the phone header', async ({ page }) => {
  await page.goto('/index.html');
  await expect(page.locator('.head-call')).toBeHidden();
  const clipped = await page.evaluate(() => {
    const n = document.querySelector('.mark-name');
    return n.scrollWidth > Math.ceil(n.getBoundingClientRect().width) + 1;
  });
  expect(clipped, 'wordmark must not be truncated').toBe(false);
});

test('the carousel advances and its dot follows', async ({ page }) => {
  await page.goto('/index.html');
  // autoplay runs every 7s, so compare against whatever is showing right now
  // rather than assuming slide 0
  const state = () =>
    page.evaluate(() => ({
      slide: [...document.querySelectorAll('.slide')].findIndex((s) => s.classList.contains('is-active')),
      dot: [...document.querySelectorAll('.dot')].findIndex((d) => d.getAttribute('aria-selected') === 'true'),
    }));

  const before = await state();
  await page.locator('#slide-next').click();
  await expect.poll(async () => (await state()).slide).not.toBe(before.slide);

  const after = await state();
  expect(after.dot, 'the selected dot must track the slide').toBe(after.slide);
  await expect(page.locator('.dot[aria-selected="true"]')).toHaveCount(1);
});

test('the enquiry form builds a message', async ({ page }) => {
  await page.goto('/contact.html');
  await page.fill('#f-name', 'Murugan');
  await page.fill('#f-phone', '9876543210');
  await page.click('#enquiry button[type="submit"]');

  const note = page.locator('#form-note');
  await expect(note).toHaveClass(/form-ok/);
  await expect(note).toContainText('Enquiry for Ponnar Sankar Tractors');
  await expect(note).toContainText('Murugan');
});

test('the form asks for the details it needs', async ({ page }) => {
  await page.goto('/contact.html');
  await page.click('#enquiry button[type="submit"]');
  await expect(page.locator('#form-note')).toContainText('name and phone number');
});

test('the 404 is styled when served from a deep path', async ({ page }) => {
  const response = await page.goto('/products/no-such-machine.html');
  expect(response.status()).toBe(404);

  // an unstyled page means <base> did not resolve the stylesheet
  const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(background).not.toBe('rgba(0, 0, 0, 0)');
  await expect(page.locator('.head-row')).toBeVisible();
  await expect(page.locator('.link-row a').first()).toBeVisible();
});

test('the gallery lightbox opens and pages', async ({ page }) => {
  await page.goto('/about.html');
  await page.locator('.gallery button').first().click();

  const lightbox = page.locator('#lightbox');
  await expect(lightbox).toBeVisible();
  await expect(page.locator('#lightbox-count')).toHaveText('1 / 12');
  await expect(page.locator('#lightbox-img')).toHaveJSProperty('complete', true);

  await page.locator('#lightbox-next').click();
  await expect(page.locator('#lightbox-count')).toHaveText('2 / 12');
});

test('Tamil can be switched on and stays on across pages', async ({ page }) => {
  await page.goto('/index.html');
  const heading = page.locator('.ta-swap').first();
  const english = await heading.textContent();

  await page.locator('#lang-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ta');
  await expect(heading).not.toHaveText(english);
  // Tamil block, so the swap really happened rather than blanking the text
  await expect(heading).toHaveText(/[஀-௿]/);

  await page.goto('/branches.html');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ta');
  await expect(page.locator('#lang-toggle')).toHaveText('English');
  await expect(page.locator('.ta-swap').first()).toHaveText(/[஀-௿]/);
});

test('fonts are self-hosted and each weight is its own shape', async ({ page }) => {
  const external = [];
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1')) external.push(r.url());
  });

  await page.goto('/index.html');
  await page.evaluate(() => document.fonts.ready);
  expect(external, 'no third-party requests').toEqual([]);

  // a heavier weight must put more ink on the canvas; declaring one file for
  // several weights silently renders them all identically
  const ink = await page.evaluate(() => {
    const measure = (family, weight) => {
      const c = document.createElement('canvas');
      c.width = 420; c.height = 90;
      const x = c.getContext('2d');
      x.font = `${weight} 64px "${family}"`;
      x.fillText('Harvest', 4, 66);
      const d = x.getImageData(0, 0, 420, 90).data;
      let n = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] > 40) n++;
      return n;
    };
    return {
      saira: [600, 700, 800].map((w) => measure('Saira Condensed', w)),
      plex: [400, 600].map((w) => measure('IBM Plex Sans', w)),
    };
  });
  expect(ink.saira[1], 'Saira 700 heavier than 600').toBeGreaterThan(ink.saira[0]);
  expect(ink.saira[2], 'Saira 800 heavier than 700').toBeGreaterThan(ink.saira[1]);
  expect(ink.plex[1], 'Plex 600 heavier than 400').toBeGreaterThan(ink.plex[0]);

  // Tamil must come from the Tamil font, not a fallback
  const tamil = page.locator('.ta').first();
  await expect(tamil).toHaveText(/[஀-௿]/);
  const family = await tamil.evaluate((el) => getComputedStyle(el).fontFamily);
  expect(family).toContain('Noto Sans Tamil');
});

test('phones are served small images, not the full-size sources', async ({ page }) => {
  await page.goto('/index.html');
  // networkidle never settles here: the carousel keeps loading slides
  await expect
    .poll(() => page.evaluate(() => document.querySelector('.slide-img').currentSrc),
      { message: 'hero should come from a resized variant' })
    .toMatch(/-(480|720|960)\.webp$/);
});
