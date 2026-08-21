import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from './icons';

/** Primary/ghost/dark button. `href` renders a Link, otherwise a <button>. */
export function Btn({
  href,
  children,
  variant,
  type,
  className = '',
}: {
  href?: string;
  children: ReactNode;
  variant?: 'ghost' | 'solid-light' | 'dark';
  type?: 'submit' | 'button';
  className?: string;
}) {
  const cls = `btn${variant ? ` btn--${variant}` : ''}${className ? ` ${className}` : ''}`;
  const inner = (
    <>
      {children}
      <ArrowUpRight className="btn__arrow" />
    </>
  );
  if (href) {
    return (
      <Link className={cls} href={href}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} type={type ?? 'button'}>
      {inner}
    </button>
  );
}

/** Underlined mono text link with the red sweep. */
export function TextLink({
  href,
  children,
  style,
}: {
  href: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Link className="link" href={href} style={style}>
      {children}
      <ArrowUpRight />
    </Link>
  );
}

/** The three-column section header used across every page. */
export function SectionHead({
  eyebrow,
  title,
  aside,
  style,
}: {
  eyebrow: ReactNode;
  title?: ReactNode;
  aside?: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="sec-head" style={style}>
      <div className="sec-head__eyebrow">
        <p className="t-label t-label--red">{eyebrow}</p>
      </div>
      {title ? <div className="sec-head__title">{title}</div> : null}
      {aside ? <div className="sec-head__aside">{aside}</div> : null}
    </div>
  );
}

/** Breadcrumb trail. Last entry is rendered as plain text. */
export function Crumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {trail.map((c, i) => (
        <span key={c.label} style={{ display: 'contents' }}>
          {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
          {i < trail.length - 1 ? <em>/</em> : null}
        </span>
      ))}
    </nav>
  );
}

/** Dark page header used by every inner page. */
export function PageHero({
  bg,
  lines,
  aside,
  trail,
}: {
  bg?: string;
  lines: ReactNode[];
  aside: ReactNode;
  trail: { label: string; href?: string }[];
}) {
  return (
    <section className={`page-hero${bg ? ' page-hero--media' : ''}`}>
      {bg ? (
        <div className="page-hero__bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bg} alt="" />
        </div>
      ) : null}
      <div className="page-hero__inner shell">
        <Crumbs trail={trail} />
        <div className="page-hero__grid">
          <h1 className="page-hero__title">
            {lines.map((line, i) => (
              <span className="reveal-line" key={i} style={{ '--d': `${100 + i * 110}ms` } as React.CSSProperties}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <div className="page-hero__aside reveal" style={{ '--d': '380ms' } as React.CSSProperties}>
            {aside}
          </div>
        </div>
      </div>
    </section>
  );
}
