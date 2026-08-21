'use client';

import { useEffect, useState, type ReactNode } from 'react';

export type Slide = { src: string; w: number; h: number };

const INTERVAL = 6000;

/**
 * The full-bleed home hero: crossfading media, scrim, content and the bottom bar.
 *
 * Slides are wide dusk exteriors with open sky on the left where the type sits —
 * interiors, verticals and model shots crop badly here and fight the headline.
 */
export default function HeroStage({
  slides,
  children,
  meta,
}: {
  slides: Slide[];
  children: ReactNode;
  meta?: ReactNode;
}) {
  const [i, setI] = useState(0);
  // Bumped on every change so the dot's progress animation remounts and replays.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (slides.length < 2) return;
    const t = setInterval(() => {
      setI((v) => (v + 1) % slides.length);
      setTick((v) => v + 1);
    }, INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  function go(n: number) {
    setI(n);
    setTick((v) => v + 1);
  }

  return (
    <section className="hero">
      <div className="hero__media" aria-hidden="true">
        {slides.map((s, n) => (
          <div className={`hero__slide${n === i ? ' is-active' : ''}`} key={s.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt=""
              width={s.w}
              height={s.h}
              fetchPriority={n === 0 ? 'high' : undefined}
              loading={n === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__inner">
        <div className="shell">
          <div className="hero__grid">
            <div className="hero__main">{children}</div>
            {meta ? (
              <div className="hero__meta reveal" style={{ '--d': '600ms' } as React.CSSProperties}>
                {meta}
              </div>
            ) : null}
          </div>

          <div className="hero__bar">
            <a className="scroll-cue" href="#statement">
              <span className="scroll-cue__line" aria-hidden="true" />
              Scroll to explore
            </a>
            <div className="hero__dots">
              {slides.map((s, n) => (
                <button
                  className={`hero__dot${n === i ? ' is-active' : ''}`}
                  key={n === i ? `${n}-${tick}` : String(n)}
                  type="button"
                  aria-label={`Show slide ${n + 1}`}
                  aria-current={n === i}
                  onClick={() => go(n)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
