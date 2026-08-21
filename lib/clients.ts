import fs from 'node:fs';
import path from 'node:path';

/**
 * Client list.
 *
 * Server-only: the logo lookup touches the filesystem at build time. Import this
 * from server components only.
 *
 * To show a real logo, drop a file into public/assets/img/clients/ named after
 * `file` below — `runwal.svg`, `godrej.png`, `embassy.webp` and so on. Anything
 * without a file falls back to a set wordmark, so the section never looks broken
 * while the logos are being collected. SVG is preferred; the marks are rendered
 * monochrome, so colour in the source file does not matter.
 *
 * Project names and cities are taken from the current futeservices.com.
 */

export type Client = {
  name: string;
  file: string;
  project: string;
  city: string;
  logo: string | null;
};

const RAW: Omit<Client, 'logo'>[] = [
  { name: 'Runwal Group', file: 'runwal', project: 'Runwal Eirene', city: 'Mumbai' },
  { name: 'Godrej Properties', file: 'godrej', project: 'Godrej City', city: 'Mumbai' },
  { name: 'Embassy Group', file: 'embassy', project: 'Embassy Tech Village', city: 'Bengaluru' },
  { name: 'L&T Realty', file: 'lt-realty', project: 'Raintree Boulevard', city: 'Bengaluru' },
  { name: 'Lulu Group', file: 'lulu', project: 'Y Tower', city: 'Dubai' },
];

const DIR = path.join(process.cwd(), 'public', 'assets', 'img', 'clients');
const EXTENSIONS = ['svg', 'png', 'webp'];

function findLogo(file: string): string | null {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(DIR, `${file}.${ext}`))) {
      return `/assets/img/clients/${file}.${ext}`;
    }
  }
  return null;
}

export const clients: Client[] = RAW.map((c) => ({ ...c, logo: findLogo(c.file) }));
