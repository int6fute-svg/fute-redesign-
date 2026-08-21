/*
 * Futé Services — page assembler.
 *
 * Each file in src/pages/ holds only the <main> content plus a JSON front
 * matter block. This script wraps it in the shared head / header / footer
 * partials and writes plain static HTML to the project root, so the shipped
 * site needs no build step or runtime of any kind.
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

const FRONT = /^<!--\s*meta\s*([\s\S]*?)-->\s*/;

function build(file) {
  const raw = read(path.join(PAGES, file));
  const match = raw.match(FRONT);
  if (!match) throw new Error(file + ': missing <!-- meta { ... } --> front matter');

  const meta = JSON.parse(match[1]);
  const body = raw.slice(match[0].length);

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

  const out = resolvedHead + '\n' + resolvedHeader + '\n' + body.trim() + '\n\n' + resolvedFooter;
  fs.writeFileSync(path.join(ROOT, file), out, 'utf8');
  return file;
}

const files = fs.readdirSync(PAGES).filter((f) => f.endsWith('.html'));
files.forEach((f) => console.log('built  ' + build(f)));
console.log('\n' + files.length + ' pages written to ' + ROOT);
