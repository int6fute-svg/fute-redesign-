import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Client } from '@/lib/clients';
import ClientMark from './ClientMark';
import { ArrowRight } from './icons';
import { Btn } from './ui';

/* ------------------------------------------------------------------ marquee */
export function Marquee({
  clients,
  tail,
  seconds = 46,
}: {
  clients: Client[];
  tail?: string;
  seconds?: number;
}) {
  const row = (
    <div className="marquee__item">
      {clients.map((c) => (
        <ClientMark client={c} key={c.file} />
      ))}
      {tail ? <span>{tail}</span> : null}
    </div>
  );
  return (
    <section className="section section--flush" style={{ paddingBlock: 0 }}>
      <div className="marquee" aria-label="Selected clients">
        <div className="marquee__track" style={{ animationDuration: `${seconds}s` }}>
          {row}
          {/* The loop needs the row twice; the copy is decorative. */}
          <div aria-hidden="true" style={{ display: 'contents' }}>
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- stats */
export type Stat = { value: number; suffix?: string; label: string };

export function Stats({ items }: { items: Stat[] }) {
  return (
    <div className="stats u-mt-l" data-stagger="110">
      {items.map((s) => (
        <div className="stat reveal" key={s.label}>
          <div className="stat__num">
            <span data-count={s.value}>0</span>
            {s.suffix ? <span className="stat__suffix">{s.suffix}</span> : null}
          </div>
          <p className="stat__label t-label">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- evolution */
export function Evolution() {
  return (
    <div className="u-mt-l">
      <p className="t-label t-label--red">Where we are going</p>
      <div className="evolution u-mt-m" data-stagger="150">
        <div className="evolution__step reveal">
          <p className="evolution__idx">Was</p>
          <h3 className="evolution__name">Visualisation vendor</h3>
          <p className="evolution__note">Briefed per deliverable. Priced per view. Judged on turnaround.</p>
        </div>
        <div className="evolution__step reveal">
          <p className="evolution__idx">Now</p>
          <h3 className="evolution__name">Creative + technology partner</h3>
          <p className="evolution__note">
            Briefed on the business objective. Six product families combined into one answer.
          </p>
        </div>
        <div className="evolution__step reveal">
          <p className="evolution__idx">Next</p>
          <h3 className="evolution__name">
            Real-estate <em>experience &amp; technology</em> company
          </h3>
          <p className="evolution__note">
            Owning the buyer journey — interactive, immersive and intelligent, end to end.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- objectives */
export type Objective = { name: string; rec: string; href: string };

export function Objectives({ items, down = false }: { items: Objective[]; down?: boolean }) {
  return (
    <div className="objectives" data-stagger="70">
      {items.map((o, i) => (
        <Link className="objectives__row reveal" href={o.href} key={o.name + i}>
          <span className="objectives__num">{String(i + 1).padStart(2, '0')}</span>
          <span className="objectives__name">{o.name}</span>
          <span className="objectives__rec">{o.rec}</span>
          {down ? (
            <svg className="objectives__arrow" width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          ) : (
            <ArrowRight className="objectives__arrow" size={16} />
          )}
        </Link>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ process */
export type Step = { title: string; text: string };

export function Process({ steps }: { steps: Step[] }) {
  return (
    <div className="process" data-stagger="140">
      {steps.map((s, i) => (
        <div className="process__step reveal" key={s.title}>
          <p className="process__num">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="process__title">{s.title}</h3>
          <p className="process__text">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------- card */
export function Card({ num, title, children, span = 4 }: { num: string; title: string; children: ReactNode; span?: number }) {
  return (
    <div className="card reveal" style={{ gridColumn: `span ${span}` }}>
      <p className="t-num">{num}</p>
      <h3 className="card__title">{title}</h3>
      <p className="card__text">{children}</p>
    </div>
  );
}

/* ---------------------------------------------------------------------- CTA */
export function Cta() {
  return (
    <section className="section" data-theme="red">
      <div className="shell">
        <div className="cta__inner">
          <h2 className="cta__title reveal">
            Have a project
            <br />
            that isn&rsquo;t built <em>yet</em>?
          </h2>
          <div className="cta__side reveal">
            <p style={{ color: 'rgba(255,255,255,.86)' }}>
              Send us the drawings, the launch date and the ambition. We will come back with a scope, a
              schedule and a number — usually within two working days.
            </p>
            <Btn href="/quote/" variant="dark">
              Start a project
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
