# Futé Services — website redesign

A complete redesign of futeservices.com as a **static site**: plain HTML, CSS and
vanilla JavaScript. No framework, no runtime, no dependencies. Upload the folder
to any host (Netlify, Vercel, cPanel, S3, Hostinger) and it works.

Design reference: the editorial, numbered-index rigour of [big.dk](https://big.dk)
crossed with the cinematic, image-first restraint of
[brickvisual.com](https://www.brickvisual.com). Palette is **black, white and red
only** — taken straight from the Futé logo.

---

## Run it locally

```bash
node server.js       # → http://localhost:5173
```

Any static server works (`npx serve`, Live Server, python -m http.server). Opening
`index.html` from the filesystem also works, though the dev server is closer to
production.

---

## Pages

| File | What it is |
|---|---|
| `index.html` | Home — hero, studio statement, capability index, selected work, showreel, process, sectors, clients, offices |
| `studio.html` | About the studio — vision & mission, values, timeline, leadership, FAQ, careers |
| `services.html` | The eight disciplines, in depth, plus engagement models and process |
| `work.html` | Filterable project index (25 cards, 8 filters) |
| `project.html` | Case-study template — duplicate this per project |
| `journal.html` | News / insights index |
| `contact.html` | Enquiry form, direct lines, all six studios |
| `quote.html` | Structured four-part quote request |
| `404.html` | Not found |

---

## Editing

Header, footer and the closing CTA are shared. **Do not edit them in the root
`.html` files** — those are generated. Edit the source and rebuild:

```
src/partials/head.html      <head> + opening <body>
src/partials/header.html    header + full-screen menu
src/partials/footer.html    closing CTA + footer + script tag
src/pages/*.html            the <main> of each page + JSON front matter
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
element. Add `data-stagger="120"` to a parent to cascade its children. Everything
is disabled under `prefers-reduced-motion`.

**JS modules** (`assets/js/main.js`) are all optional — each no-ops when its markup
is absent, so one file serves every page: sticky/hide header, scroll progress,
menu, reveals, counters, marquee, capability hover-preview, hero slideshow, work
filters, accordion, chips, form validation, cursor dot.

---

## Before this goes live — things to replace

The structure and copy are production-ready; these specific items are placeholders.

1. **Project names, cities and years** in `work.html`, `index.html` and
   `project.html` (Axis Business District, Meridian Heights, …) are invented.
   Swap for real projects. The card markup is identical for every one.
2. **Imagery** in `assets/img/work/` was pulled from the current futeservices.com
   so the layout could be judged against real work. Replace with the final,
   properly licensed, watermark-free masters. Several files (e.g. `res-06.webp`,
   `int-02.webp`) still carry the old on-image Futé watermark.
3. **Statistics** on the home page: "12+ years" comes from the current site;
   "6 studios" and "8 disciplines" are factual. **"1,200+ deliverables shipped" is
   a placeholder** — confirm or change it.
4. **Founding year 2013** is inferred from the current site's "12 years in the
   market". Confirm the real date; it appears in the hero meta, the footer and the
   studio timeline.
5. **Studio timeline** (`studio.html`) — the milestones are plausible but invented.
6. **Client list** is text-only (Runwal, Godrej, Embassy, L&T Realty, Lulu). Drop in
   logo SVGs and confirm you have permission to name each one.
7. **Office addresses** are city-level only. Add registered street addresses in
   `contact.html`, and swap `.mapish` for a real embedded map.
8. **Leadership portraits** — `studio.html` shows initials in correctly-sized frames.
   Replace `.team__ph` with an `<img>` when the shoot is done.
9. **Journal articles** are placeholder posts, all linking back to the index.
10. **Client quote** on `project.html` is marked as a placeholder in the caption.
11. **Showreel** currently links to `work.html`. Point `.reel` at the real video.
12. **Forms do not submit anywhere.** `main.js` validates and shows a confirmation
    message; wire the `submit` handler to your endpoint (Formspree, a PHP mailer,
    or your CRM). Search for `data-form` in `assets/js/main.js`.

### Also worth knowing

The current live site's footer is injected with **spam links** to dozens of
unrelated domains — a strong sign the existing WordPress/React deployment has been
compromised. This rebuild is clean, but the hosting account and any old CMS should
be audited before or during the cutover.

---

## Accessibility & performance notes

- Skip link, visible focus rings, `aria-current` on the active nav item, labelled
  form fields with live error messaging, `aria-expanded` on the menu and accordion.
- The closed menu is `visibility:hidden`, so it stays out of the tab order.
- All motion respects `prefers-reduced-motion`.
- Images use `loading="lazy"` (except the hero, which is `fetchpriority="high"`)
  and carry intrinsic dimensions where known.
- Fonts load from Google Fonts with `display=swap` and preconnect. For a fully
  self-hosted build, download the three families into `assets/fonts/` and swap the
  `<link>` in `src/partials/head.html` for `@font-face` rules.
- Before launch, run the source images through a compressor — several are over
  700 KB, which is the single biggest performance item on the site.
