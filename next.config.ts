import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Static export. `npm run build` writes a fully static `out/` folder that can
   * be dropped on any host — Netlify, Vercel, cPanel, S3, Hostinger — with no
   * Node runtime. Drop this line if you later want ISR, route handlers or
   * server actions.
   */
  output: 'export',

  /** Emit /work/index.html rather than /work.html, so plain file hosts work. */
  trailingSlash: true,

  images: {
    /** The default optimiser needs a server; static export cannot use it. */
    unoptimized: true,
  },

  reactStrictMode: true,
};

export default nextConfig;
