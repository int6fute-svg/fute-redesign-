import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Instrument_Serif } from 'next/font/google';

import './globals.css';
import './sections.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Cursor from '@/components/Cursor';

/* Self-hosted at build time — no request to Google at runtime. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.futeservices.com'),
  title: {
    default: 'Futé Services — Real-Estate Experience & Technology',
    template: '%s — Futé Services',
  },
  description:
    'Six product families for real-estate developers: Visual, Cinematic, Interactive, Sales, Immersive and AI & Technology.',
  icons: {
    icon: '/assets/img/logo-mark.svg',
    apple: '/assets/img/fute-logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Futé Services',
    images: ['/assets/img/work/com-01.webp'],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#0B0B0C',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`js ${archivo.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <ScrollReveal />
        <Cursor />
      </body>
    </html>
  );
}
