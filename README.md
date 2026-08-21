# Futé Services — website

**Next.js 15 (App Router) + React 19 + TypeScript**, built as a **static export**.
`npm run build` writes a plain `out/` folder that runs on any host — Netlify,
Vercel, cPanel, S3, Hostinger — with no Node runtime required.

The content architecture follows the **Internal Portfolio Service Brief**: six
product families, outcome-led selling, and the positioning ladder from
*visualisation vendor* to *real-estate experience & technology company*.

Design reference: the editorial, numbered-index rigour of [big.dk](https://big.dk)
crossed with the cinematic restraint of [brickvisual.com](https://www.brickvisual.com).
Palette is **black, white and red only** — taken from the Futé logo.

---

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static export → out/
npm run serve    # serve out/ exactly as a dumb host would → http://localhost:4173
npm run lint
```

Always check `npm run serve` before uploading: it catches anything that only
worked because the dev server was clever.

---

## Routes

| Route | File | What it is |
|---|---|---|
| `/` | `app/page.tsx` | Hero, positioning ladder, six families, work, objective-led entry, process, sectors, clients, offices |
| `/studio` | `app/studio/page.tsx` | Vision & mission, values, timeline, leadership, FAQ, careers |
| `/services` | `app/services/page.tsx` | The product architecture: six families, how they combine, engagement |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | One page per family — six static routes |
| `/solutions` | `app/solutions/page.tsx` | Four packaged solutions built around a business objective |
| `/work` | `app/work/page.tsx` | Filterable project index |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Case-study template — one route per project |
| `/journal` | `app/journal/page.tsx` | News / insights index |
| `/contact` | `app/contact/page.tsx` | Enquiry form, direct lines, all six studios |
| `/quote` | `app/quote/page.tsx` | Structured quote request — starts with the business objective |
| 404 | `app/not-found.tsx` | Not found |

Both dynamic segments use `generateStaticParams`, so every page is prerendered
at build time — 41 HTML files in total.

---

## Where the content lives

Copy is data, not markup. Edit these and the pages follow:

```
lib/products.ts   the six product families — the whole services section
lib/work.ts       the project index and its filters
lib/site.ts       clients, sectors, offices, objectives, process steps
```

`lib/products.ts` is the important one. Every family page renders the same ten
sections the brief mandates — name, one-line positioning, client challenge, Futé
solution, deliverables, business benefit, best work, case study
(challenge → solution → result), related products, call to action — from one
template, so the format cannot drift between them. Adding a seventh family means
adding one entry to that array; the route, the nav links, the footer and every
cross-sell reference follow automatically.

---

## Component map

**Server components** (the default — no JS shipped):
`Footer`, `WorkCard`, `ui.tsx` (Btn, TextLink, SectionHead, Crumbs, PageHero),
`sections.tsx` (Marquee, Stats, Evolution, Objectives, Process, Card, Cta),
`icons.tsx`.

**Client components** (only where there is real interaction):

| Component | Why it is a client component |
|---|---|
| `Header` | scroll state, hide-on-scroll, full-screen menu |
| `HeroStage` | crossfading slides and the dot control |
| `FamilyIndex` | hover/focus swaps the pinned media panel |
| `WorkIndex` | filter state |
| `Accordion` | open/close with animated height |
| `ContactForm` / `QuoteForm` | validation and state |
| `ScrollReveal` | one IntersectionObserver for the whole page |
| `Cursor` | the pointer dot |
| `Year` | the footer year, so a static build does not freeze it |

`ScrollReveal` is deliberately class-driven rather than per-component state: the
animation is presentation, the classes already live in the CSS, and it keeps
every page a server component. It re-scans on route change.

---

## Design system

Tokens live in `app/globals.css`; section and page styles in `app/sections.css`.

```css
--ink:  #0B0B0C   /* page black */
--paper:#FFFFFF   /* page white */
--red:  #C8102E   /* brand red  */
```

**Section themes.** Put `data-theme` on any `.section` to flip it: `light`
(white), `bone` (warm off-white), `red` (full red band). No attribute = black.
Every component reads `--bg` / `--fg` / `--line`, so it inherits correctly.

**Type.** Archivo (grotesk) for structure, Instrument Serif italic for emphasis
words, IBM Plex Mono for labels and buttons — all three self-hosted through
`next/font`, so there is no runtime request to Google. Sizes are all `clamp()`.

**Grid.** 12 columns, `--maxw: 1680px`, `--gutter` fluid from 20px to 72px.

**Motion.** Add `reveal`, `reveal-line` (wrap the text in a child `<span>`),
`reveal-mask` or `reveal-img` to any element; `data-stagger="120"` on a parent
cascades its children. All of it is disabled under `prefers-reduced-motion`.

**Logo.** `tools/logo-knockout.js` derives `fute-logo-light.png` from the supplied
logo by rewriting only the neutral dark pixels to white — the red mark and
"services" are untouched. Re-run `node tools/logo-knockout.js` if the source
logo changes.

**Images** use plain `<img>` rather than `next/image`: static export cannot run
the optimiser, so `next/image` would add a wrapper without adding value. Sizes
are governed by CSS aspect-ratio boxes, so there is no layout shift.

---

## Deploying

- **Vercel / Netlify** — connect the repo; the defaults work. To use Vercel's
  image optimisation and ISR instead, delete `output: 'export'` from
  `next.config.ts`.
- **Any static host** — `npm run build`, then upload the contents of `out/`.
- **Hosting under a sub-path** (e.g. `example.com/site/`) needs `basePath` and
  `assetPrefix` in `next.config.ts`; asset URLs are absolute today.

---

## Before this goes live — things to replace

The structure and copy are production-ready; these specific items are placeholders.

1. **Case studies.** Every family page carries a placeholder narrative, flagged in
   its section aside. The brief asks for 2–3 real case studies per family. Edit
   the `caseStudy` block in `lib/products.ts`.
2. **Project names, cities and years** in `lib/work.ts` (Axis Business District,
   Meridian Heights, …) are invented. So is the brief copy on `/work/[slug]`.
3. **Imagery** in `public/assets/img/work/` was pulled from the current
   futeservices.com so the layout could be judged against real work. Replace with
   final, licensed masters. Several files (`res-06.webp`, `int-02.webp`,
   `com-07.webp`) still carry the old on-image Futé watermark.
4. **AI & Technology has no imagery of its own** — that page borrows architectural
   renders. It needs interface, dashboard or product screenshots.
5. **Interactive / Sales / Immersive** would be far stronger with screen captures
   of a real masterplan, unit selector, sales platform and headset experience.
6. **Statistics**: "12+ years" comes from the current site; "6 studios" and
   "6 product families" are factual. **"1,200+ deliverables shipped" is a
   placeholder** — confirm or change it.
7. **Founding year 2013** is inferred from the current site's "12 years in the
   market". Confirm it; it appears in the footer and the studio timeline.
8. **Studio timeline** (`app/studio/page.tsx`) — plausible but invented.
9. **Client list** is text-only. Drop in logo SVGs and confirm permission to name
   each one.
10. **Office addresses** are city-level only. Add registered street addresses in
    `app/contact/page.tsx`, and swap `.mapish` for a real embedded map.
11. **Leadership portraits** — initials in correctly-sized frames. Replace
    `.team__ph` with an `<img>` when the shoot is done.
12. **Journal articles** are placeholder posts, all linking back to the index.
    Move them to MDX or a CMS once there is a publishing rhythm.
13. **Showreel** links to `/work/`. Point `.reel` at the real video.
14. **Forms do not submit anywhere.** `components/form.tsx` validates and shows a
    confirmation; wire `useFormState`'s success branch to your endpoint. If you
    drop `output: 'export'`, a server action is the cleanest option.

### Also worth knowing

The current live futeservices.com footer is injected with **spam links** to dozens
of unrelated domains — a strong sign that deployment has been compromised. This
rebuild is clean, but the hosting account and any old CMS should be audited before
or during the cutover.

---

## Accessibility notes

- Skip link, visible focus rings, `aria-current` on the active nav item, labelled
  form fields with live error messaging, `aria-expanded` on the menu and accordion.
- The closed menu is `visibility:hidden`, so it stays out of the tab order.
- The family switcher responds to `focus` as well as hover, so it is keyboard-usable.
- All motion respects `prefers-reduced-motion`.
- Before launch, run the source images through a compressor — several are over
  700 KB, which is the single biggest performance item on the site.
