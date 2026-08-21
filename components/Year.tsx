'use client';

import { useEffect, useState } from 'react';

/**
 * The build is a static export, so a server-rendered year would freeze at build
 * time. Render it on the client instead, with the build year as the fallback.
 */
export default function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
