# Ponnar Sankar Tractors

A redesign of [ponnarsankartractors.com](https://ponnarsankartractors.com/) — the site of a
VST Tillers and Gomadhi Engineering dealership in Paramathi Velur, Namakkal, Tamil Nadu,
trading since 1988.

No framework and no build dependencies. Pages are generated from the content and templates
in `src/` into a `dist/` folder of plain HTML you can host anywhere.

## Build and preview

```bash
node build.mjs     # writes dist/
node serve.mjs     # serves dist/ on http://localhost:4321
```

`build.mjs` needs nothing beyond Node 18 or newer. There is no `package.json`, no install
step and no lockfile.

## What gets built

Twelve pages, plus `sitemap.xml` and `robots.txt`:

| Page | Source |
| --- | --- |
| Home, with the hero carousel | `src/pages.mjs` → `home()` |
| Products index | `productsIndex()` |
| Seven product detail pages | `productPage()`, one per entry in `products` |
| About, with the certificates and photo gallery | `about()` |
| Branches | `branchesPage()` |
| Contact | `contact()` |

`dist/index.artifact.html` is the home page without the surrounding `<html>` document, for
hosts that supply their own. Ignore it if you are deploying the folder as a normal site.

## Layout

```
assets/        product photographs, certificates, gallery images
src/data.mjs   all content: products, specifications, branches, keyword lists
src/layout.mjs the page shell, header, footer and shared blocks
src/pages.mjs  one function per page
src/styles.css the whole stylesheet
src/app.js     carousel, language toggle, gallery lightbox, enquiry form
build.mjs      renders src/ into dist/
serve.mjs      a static server for local preview only
```

To change a specification, a branch address or a phone number, edit `src/data.mjs` and
rebuild. Nothing is hard-coded into the markup.

## Content

Product specifications, branch addresses and the bilingual keyword lists were taken from the
existing site. Models the dealership publishes no figures for are shown as "specifications on
request" rather than filled in with guesses.

Two gaps worth knowing about:

- The Rasipuram branch has no street address or map pin of its own on the current site. Its
  card uses a Google Maps search link and notes that calls reach the head office.
- The product photographs are the low-resolution ones from the existing site.

## Notes

- The enquiry form has no server behind it. Submitting assembles the enquiry as text to copy
  into WhatsApp or read out on a call.
- Phone numbers are shown as selectable text with a copy button, because `tel:` links are
  unreliable in embedded contexts.
- Light theme only. The green panels are brand colour, not a dark mode.
- Tamil and English throughout, with the choice remembered between pages.
