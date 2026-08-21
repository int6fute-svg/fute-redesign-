/*
 * Builds a light-on-dark version of the Futé logo.
 *
 * The supplied logo is drawn for white paper: the wordmark, the tagline and the
 * swoosh are near-black, so on the dark site it had to sit on a white plate,
 * which read as a sticker. This rewrites only the neutral (low-saturation) dark
 * pixels to white and leaves every red pixel — the mark and "services" — alone.
 *
 *   node tools/logo-knockout.js
 *   → assets/img/fute-logo-light.png
 *
 * Pure Node: PNG decode/encode is done here rather than pulling in a dependency.
 */
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'img', 'fute-logo.png');
const OUT = path.join(__dirname, '..', 'assets', 'img', 'fute-logo-light.png');

/* ---------------------------------------------------------------- decode */
function decode(buf) {
  let off = 8;
  let ihdr = null;
  const idat = [];

  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.slice(off + 4, off + 8).toString('ascii');
    const data = buf.slice(off + 8, off + 8 + len);
    if (type === 'IHDR') {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        depth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') break;
    off += 12 + len;
  }

  if (!ihdr) throw new Error('no IHDR');
  if (ihdr.depth !== 8 || ihdr.colorType !== 6 || ihdr.interlace !== 0) {
    throw new Error('expected 8-bit RGBA, non-interlaced');
  }

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const { width, height } = ihdr;
  const bpp = 4;
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);

  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.slice(pos, pos + stride);
    pos += stride;
    const cur = out.slice(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.slice((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = line[x];
      switch (filter) {
        case 0: break;
        case 1: v += a; break;
        case 2: v += b; break;
        case 3: v += (a + b) >> 1; break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
          break;
        }
        default: throw new Error('bad filter ' + filter);
      }
      cur[x] = v & 0xff;
    }
  }
  return { ...ihdr, pixels: out };
}

/* ---------------------------------------------------------------- encode */
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0, 0);
  return Buffer.concat([len, body, crc]);
}

let CRC_TABLE = null;
function crc32(buf) {
  if (!CRC_TABLE) {
    CRC_TABLE = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      CRC_TABLE[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return c ^ -1;
}

function encode(width, height, pixels) {
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: None
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* -------------------------------------------------------------- recolour */
const img = decode(fs.readFileSync(SRC));
const px = img.pixels;
let touched = 0, kept = 0, transparent = 0;

for (let i = 0; i < px.length; i += 4) {
  const r = px[i], g = px[i + 1], b = px[i + 2], a = px[i + 3];
  if (a === 0) { transparent++; continue; }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Neutral and dark → invert to white. Red stays red; the white script "f"
  // is neutral but bright, so it is left alone.
  if (chroma < 42 && lum < 165) {
    px[i] = 255; px[i + 1] = 255; px[i + 2] = 255;
    touched++;
  } else {
    kept++;
  }
}

fs.writeFileSync(OUT, encode(img.width, img.height, px));
console.log(
  `${img.width}x${img.height} — recoloured ${touched}, kept ${kept}, transparent ${transparent}`
);
console.log('wrote ' + path.relative(process.cwd(), OUT));
