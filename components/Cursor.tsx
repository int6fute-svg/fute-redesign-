'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, .work-card, .fam__row, .objectives__row, .crosssell__item, [data-cursor="lg"]';

/** Small red dot that trails the pointer and swells over interactive targets. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer:coarse)').matches
    ) {
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    function onMove(e: PointerEvent) {
      x = e.clientX;
      y = e.clientY;
      dot!.classList.add('is-on');
      dot!.classList.toggle('is-lg', !!(e.target as Element)?.closest?.(INTERACTIVE));
    }
    function onLeave() {
      dot!.classList.remove('is-on');
    }
    function loop() {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      dot!.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    loop();

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden="true" />;
}
