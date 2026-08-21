# Futé Services — website redesign

A complete redesign of futeservices.com as a **static site**: plain HTML, CSS and
vanilla JavaScript. No framework, no runtime, no dependencies. Upload the folder
to any host (Netlify, Vercel, cPanel, S3, Hostinger) and it works.

The content architecture follows the **Internal Portfolio Service Brief** — six
product families, outcome-led selling, and the positioning ladder from
*visualisation vendor* to *real-estate experience & technology company*.

Design reference: the editorial, numbered-index rigour of [big.dk](https://big.dk)
crossed with the cinematic restraint of [brickvisual.com](https://www.brickvisual.com).
Palette is **black, white and red only** — taken from the Futé logo.

---

## Run it locally

```bash
node server.js       # → http://localhost:5173
```

Any static server works. Opening `index.html` from the filesystem also works.

---

## Pages

**Core**

| File | What it is |
|---|---|
| `index.html` | Home — hero, positioning ladder, six families, work, objective-led entry, process, sectors, clients, offices |
| `studio.html` | About the studio — vision & mission, values, timeline, leadership, FAQ, careers |
| `services.html` | The product architecture: all six families, how they combine, engagement models |
| `solutions.html` | Four packaged solutions built around a business objective |
| `work.html` | Filterable project index (25 cards, 8 filters) |
| `project.html` | Case-study template — duplicate per project |
| `journal.html` | News / insights index |
| `contact.html` | Enquiry form, direct lines, all six studios |
| `quote.html` | Structured quote request — starts with the business objective |
| `404.html` | Not found |

**Product families** — generated, do not edit directly (see below)

| File | Family |
|---|---|
| `service-visual-experience.html` | 01 Visual Experience |
| `service-cinematic-experience.html` | 02 Cinematic Experience |
| `service-interactive-experience.html` | 03 Interactive Experience |
| `service-sales-experience.html` | 04 Sales Experience |
| `service-immersive-experience.html` | 05 Immersive Experience |
| `service-ai-technology.html` | 06 AI & Technology |

Every family page carries the same ten sections the brief specifies: name,
one-line positioning, client challenge, Futé solution, deliverables, business
benefit, best work, case study (challenge → solution → result), related products,
call to action.

---

## Editing

Root `.html` files are **generated**. Edit the source and rebuild:

```
src/partials/head.html      <head> + opening <body>
src/partials/header.html    header + full-screen menu
src/partials/footer.html    closing CTA + footer + script tag
src/partials/product.html   the shared product-family template
src/data/products.js        all six families' content — edit copy here
src/pages/*.html            the <main> of each authored page + front matter
```

```bash
node build.js     # regenerates every root .html
```

Front matter sits at the top of each `src/pages/*.html`:

```html
<!-- meta {
  "page": "work",              // which nav item gets aria-current
  "title": "…",
  "description": "…",
  "ogImage": "assets/img/…",
  "cta": false                 // optional: drop the shared closing CTA
} -->
```

**To change a product family's copy**, edit `src/data/products.js` and rebuild —
never the generated `service-*.html`. To add a seventh family, add an entry to
that array; the page, its nav links and its cross-sell references follow.

If you would rather not keep a build step, delete `src/` and `build.js` and edit
the root `.html` files directly — they are complete, standalone documents.

---

## Design system

Everything is driven by custom properties in `assets/css/main.css`.

```css
--ink:  #0B0B0C   /* page black      */
--paper:#FFFFFF   /* page white      */
--red:  #C8102E   /* brand red       */
--red-bright:#E4172F
--red-deep:  #7A0F1C
```

**Section themes.** Put `data-theme` on any `.section` to flip it:
`light` (white), `bone` (warm off-white), `red` (full red band). No attribute =
black. Every component reads `--bg` / `--fg` / `--line`, so it inherits correctly.

**Type.** Archivo (grotesk) for everything structural, Instrument Serif italic for
emphasis words, IBM Plex Mono for labels, indices and buttons. Sizes are all
`clamp()` — no separate mobile type scale to maintain.

**Grid.** 12 columns, `--maxw: 1680px`, `--gutter` fluid from 20px to 72px.

**Motion.** Add `reveal` (fade up), `reveal-line` (masked line, wrap the text in a
child `<span>`), `reveal-mask` (clip wipe) or `reveal-img` (slow scale-down) to any
element. Add `data-stagger="120"` to a parent to cascade its children. All of it
is disabled under `prefers-reduced-motion`.

**Logo.** `tools/logo-knockout.js` derives `fute-logo-light.png` from the supplied
logo by rewriting only the neutral dark pixels to white — the red mark and
"services" are untouched. That light version sits directly on the dark ground, so
the header needs no white plate. Re-run `node tools/logo-knockout.js` if the
source logo changes.

**JS modules** (`assets/js/main.js`) are all optional — each no-ops when its markup
is absent, so one file serves every page: sticky/hide header, menu, reveals,
counters, marquee, product-family media switcher, hero slideshow, work filters,
accordion, chips, form validation, cursor dot.

---

## Before this goes live — things to replace

The structure and copy are production-ready; these specific items are placeholders.

1. **Case studies.** Every family page carries a placeholder narrative, flagged as
   such in its section aside. The brief asks for 2–3 real case studies per family.
   Replace the `caseStudy` block in `src/data/products.js`.
2. **Project names, cities and years** in `work.html`, `index.html` and
   `project.html` (Axis Business District, Meridian Heights, …) are invented.
3. **Imagery** in `assets/img/work/` was pulled from the current futeservices.com
   so the layout could be judged against real work. Replace with final, licensed
   masters. Several files (e.g. `res-06.webp`, `int-02.webp`, `com-07.webp`) still
   carry the old on-image Futé watermark.
4. **AI & Technology has no imagery of its own** — that page currently borrows
   architectural renders. It needs interface, dashboard or product screenshots.
5. **Interactive / Sales / Immersive** would be far stronger with screen captures
   of a real masterplan, unit selector, sales platform and headset experience.
6. **Statistics** on the home page: "12+ years" comes from the current site;
   "6 studios" and "6 product families" are factual. **"1,200+ deliverables
   shipped" is a placeholder** — confirm or change it.
7. **Founding year 2013** is inferred from the current site's "12 years in the
   market". Confirm it; it appears in the hero, the footer and the studio timeline.
8. **Studio timeline** (`studio.html`) — the milestones are plausible but invented.
9. **Client list** is text-only (Runwal, Godrej, Embassy, L&T Realty, Lulu). Drop in
   logo SVGs and confirm you have permission to name each one.
10. **Office addresses** are city-level only. Add registered street addresses in
    `contact.html`, and swap `.mapish` for a real embedded map.
11. **Leadership portraits** — `studio.html` shows initials in correctly-sized
    frames. Replace `.team__ph` with an `<img>` when the shoot is done.
12. **Journal articles** are placeholder posts, all linking back to the index.
13. **Showreel** currently links to `work.html`. Point `.reel` at the real video.
14. **Forms do not submit anywhere.** `main.js` validates and shows a confirmation
    message; wire the `submit` handler to your endpoint. Search for `data-form`.

### Also worth knowing

The current live site's footer is injected with **spam links** to dozens of
unrelated domains — a strong sign the existing deployment has been compromised.
This rebuild is clean, but the hosting account and any old CMS should be audited
before or during the cutover.

---

## Accessibility & performance notes

- Skip link, visible focus rings, `aria-current` on the active nav item, labelled
  form fields with live error messaging, `aria-expanded` on the menu and accordion.
- The closed menu is `visibility:hidden`, so it stays out of the tab order.
- The product-family switcher responds to `focusin` as well as hover, so it is
  usable from the keyboard.
- All motion respects `prefers-reduced-motion`.
- Images use `loading="lazy"` (except the hero, which is `fetchpriority="high"`).
- Fonts load from Google Fonts with `display=swap` and preconnect. For a fully
  self-hosted build, download the three families into `assets/fonts/` and swap the
  `<link>` in `src/partials/head.html` for `@font-face` rules.
- Before launch, run the source images through a compressor — several are over
  700 KB, which is the single biggest performance item on the site.
