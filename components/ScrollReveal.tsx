'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const SELECTOR = '.reveal, .reveal-line, .reveal-mask, .reveal-img, [data-count], .process__step, .evolution__step';
const STAGGERABLE = '.reveal, .reveal-line, .reveal-mask, .reveal-img, .process__step, .evolution__step';

/**
 * One effect layer for the whole site: scroll-in reveals and counters.
 *
 * Deliberately class-driven rather than per-component state — the animation is
 * presentation, the classes already live in the CSS, and this keeps every page
 * a server component. Re-scans on route change.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!items.length) return;

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => {
        el.classList.add('is-in');
        const target = el.getAttribute('data-count');
        if (target) el.textContent = target;
      });
      return;
    }

    const pending = new Set(items);

    function count(el: HTMLElement) {
      const target = parseFloat(el.getAttribute('data-count') || '');
      if (Number.isNaN(target)) return;
      const dur = 1500;
      let start: number | null = null;
      const dec = (String(target).split('.')[1] || '').length;

      function frame(ts: number) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = target.toFixed(dec);
      }
      requestAnimationFrame(frame);
    }

    function show(el: HTMLElement) {
      if (!pending.has(el)) return;
      pending.delete(el);
      io.unobserve(el);
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) count(el);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal on entry, and also for anything already scrolled past — an
          // anchor jump or a restored scroll position must never leave content
          // stuck at opacity 0.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            show(entry.target as HTMLElement);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    items.forEach((el) => {
      const parent = el.parentElement;
      const step = parent?.getAttribute('data-stagger');
      if (step) {
        const sibs = Array.from(parent!.querySelectorAll<HTMLElement>(STAGGERABLE));
        const i = sibs.indexOf(el);
        if (i > -1) el.style.setProperty('--d', `${i * Number(step)}ms`);
      }
      io.observe(el);
    });

    // Safety net for jumps large enough that the observer never sees the
    // element cross the viewport. Runs only while something is still hidden.
    let ticking = false;
    function sweep() {
      ticking = false;
      if (!pending.size) return;
      const limit = window.innerHeight * 0.92;
      Array.from(pending).forEach((el) => {
        if (el.getBoundingClientRect().top < limit) show(el);
      });
    }
    function onScroll() {
      if (ticking || !pending.size) return;
      ticking = true;
      requestAnimationFrame(sweep);
    }
    function onVisible() {
      if (!document.hidden) sweep();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [pathname]);

  return null;
}
