/*
 * Serves the exported `out/` folder exactly as a dumb static host would, so you
 * can check the production build before uploading it.
 *
 *   npm run build && npm run serve   →  http://localhost:4173
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'out');
const PORT = process.env.PORT || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

if (!fs.existsSync(ROOT)) {
  console.error('No out/ folder. Run `npm run build` first.');
  process.exit(1);
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(ROOT, path.normalize(urlPath).replace(/^([/\\])+/, ''));
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    // Directory URLs map to index.html, matching trailingSlash: true output.
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';

    fs.readFile(file, (err, buf) => {
      if (err) {
        const nf = path.join(ROOT, '404.html');
        res.writeHead(404, { 'Content-Type': TYPES['.html'] });
        res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(buf);
    });
  })
  .listen(PORT, () => console.log('Static export → http://localhost:' + PORT));
