/*
 * Futé Services — page assembler.
 *
 * 1. Files in src/pages/ hold only the <main> content plus JSON front matter.
 * 2. The six product-family pages are generated from src/data/products.js
 *    through src/partials/product.html, so every one of them carries the same
 *    ten sections the Portfolio Service Brief specifies.
 *
 * Both are wrapped in the shared head / header / footer partials and written to
 * the project root as plain static HTML — the shipped site needs no build step.
 *
 *   node build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS = path.join(ROOT, 'src', 'partials');
const PAGES = path.join(ROOT, 'src', 'pages');

const read = (p) => fs.readFileSync(p, 'utf8');

const head = read(path.join(PARTIALS, 'head.html'));
const header = read(path.join(PARTIALS, 'header.html'));
const footer = read(path.join(PARTIALS, 'footer.html'));
const productTpl = read(path.join(PARTIALS, 'product.html'));
const products = require('./src/data/products.js');

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
const strip = (s) => s.replace(/<[^>]+>/g, '');

function wrap(meta, body) {
  const resolvedHead = head
    .replace(/\{\{title\}\}/g, meta.title)
    .replace(/\{\{description\}\}/g, meta.description)
    .replace(/\{\{ogImage\}\}/g, meta.ogImage || 'assets/img/work/com-01.webp');

  const resolvedHeader = header.replace(/\{\{active:([a-z-]+)\}\}/g, (_, key) =>
    key === meta.page ? ' aria-current="page"' : ''
  );

  // Pages that carry their own closing CTA opt out of the shared one.
  const resolvedFooter = meta.cta === false
    ? footer.replace(/<!-- =+ CTA -->[\s\S]*?<\/section>\n\n/, '')
    : footer;

  return resolvedHead + '\n' + resolvedHeader + '\n' + body.trim() + '\n\n' + resolvedFooter;
}

/* ---------------------------------------------------- authored pages */
const FRONT = /^<!--\s*meta\s*([\s\S]*?)-->\s*/;

function buildPage(file) {
  const raw = read(path.join(PAGES, file));
  const match = raw.match(FRONT);
  if (!match) throw new Error(file + ': missing <!-- meta { ... } --> front matter');
  const meta = JSON.parse(match[1]);
  fs.writeFileSync(path.join(ROOT, file), wrap(meta, raw.slice(match[0].length)), 'utf8');
  return file;
}

/* ------------------------------------------------ product families */
function li(items, cls) {
  return items.map((t) => `<li class="${cls} reveal">${t}</li>`).join('\n          ');
}

function paras(items) {
  return items.map((t) => `<p class="t-lead">${t}</p>`).join('\n            ');
}

function galleryHtml(items) {
  return items
    .map(
      (g, i) => `
        <figure class="gallery__item${i === 0 ? ' gallery__item--full' : ''} reveal-img">
          <div class="frame ${i === 0 ? '' : 'frame--3x2'}"${i === 0 ? ' style="aspect-ratio:21/9"' : ''}><img src="${g.src}" alt="${g.alt}" loading="lazy"></div>
          <figcaption class="gallery__cap t-label">${String(i + 1).padStart(2, '0')} &mdash; ${g.cap}</figcaption>
        </figure>`
    )
    .join('');
}

function relatedHtml(slugs) {
  return slugs
    .map((s) => {
      const p = bySlug[s];
      if (!p) throw new Error('unknown related slug: ' + s);
      return `
        <a class="crosssell__item reveal" href="service-${p.slug}.html">
          <span class="crosssell__num t-num">${p.num}</span>
          <span class="crosssell__name">${p.name}</span>
          <span class="crosssell__line">${p.salesLine}</span>
          <svg class="crosssell__arrow" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.3"/></svg>
        </a>`;
    })
    .join('');
}

function processHtml(p) {
  if (!p.process) return '';
  const steps = p.process
    .map((s, i) => `
        <li class="pipeline__step reveal">
          <span class="pipeline__num">${String(i + 1).padStart(2, '0')}</span>
          <span class="pipeline__name">${s}</span>
        </li>`)
    .join('');
  return `
  <!-- ====================================================== PROCESS -->
  <section class="section section--tight" data-theme="red">
    <div class="shell">
      <div class="sec-head" style="padding-bottom:clamp(1.5rem,3vw,2.5rem)">
        <div class="sec-head__eyebrow"><p class="t-label t-label--red">The Futé process</p></div>
        <div class="sec-head__title"><h2 class="t-h2 reveal">It starts with <span class="t-serif">Story DNA</span>.</h2></div>
        <div class="sec-head__aside"><p class="t-body reveal" style="font-size:.875rem;color:rgba(255,255,255,.86)">Ten stages, in order. Nothing is animated before the story is agreed.</p></div>
      </div>
      <ol class="pipeline" data-stagger="70">${steps}
      </ol>
    </div>
  </section>
`;
}

function buildProduct(p) {
  const file = `service-${p.slug}.html`;
  const body = productTpl
    .replace(/\{\{heroImage\}\}/g, p.heroImage)
    .replace(/\{\{heroTitleLine\}\}/g, p.heroTitle)
    .replace(/\{\{name\}\}/g, p.name)
    .replace(/\{\{num\}\}/g, p.num)
    .replace(/\{\{positioning\}\}/g, p.positioning)
    .replace(/\{\{buyers\}\}/g, p.buyers)
    .replace(/\{\{challenge\}\}/g, paras(p.challenge))
    .replace(/\{\{solution\}\}/g, paras(p.solution))
    .replace(/\{\{process\}\}/g, processHtml(p))
    .replace(/\{\{deliverables\}\}/g, li(p.deliverables, 'pr-deliverables__item'))
    .replace(/\{\{value\}\}/g, li(p.value, 'pr-value__item'))
    .replace(/\{\{gallery\}\}/g, galleryHtml(p.gallery))
    .replace(/\{\{caseChallenge\}\}/g, p.caseStudy.challenge)
    .replace(/\{\{caseSolution\}\}/g, p.caseStudy.solution)
    .replace(/\{\{caseResult\}\}/g, p.caseStudy.result)
    .replace(/\{\{related\}\}/g, relatedHtml(p.related));

  const meta = {
    page: 'services',
    title: `${strip(p.name)} — Futé Services`,
    description: strip(p.positioning),
    ogImage: p.heroImage,
  };

  fs.writeFileSync(path.join(ROOT, file), wrap(meta, body), 'utf8');
  return file;
}

/* ------------------------------------------------------------ run */
const authored = fs.readdirSync(PAGES).filter((f) => f.endsWith('.html'));
authored.forEach((f) => console.log('page     ' + buildPage(f)));
products.forEach((p) => console.log('product  ' + buildProduct(p)));
console.log(`\n${authored.length + products.length} pages written to ${ROOT}`);
