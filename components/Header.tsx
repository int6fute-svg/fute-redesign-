'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from './icons';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/studio/', label: 'Studio' },
  { href: '/services/', label: 'Services' },
  { href: '/solutions/', label: 'Solutions' },
  { href: '/work/', label: 'Work' },
  { href: '/journal/', label: 'Journal' },
  { href: '/contact/', label: 'Contact' },
];

const MENU = [...NAV, { href: '/quote/', label: 'Get a quote' }];

export default function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  /* Sticky + hide-on-scroll-down. */
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || 0;
      setStuck(y > 24);
      setHidden(y > 320 && y > lastY.current && !open);
      lastY.current = y;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  /* Lock the page behind the full-screen menu, and close it on Escape. */
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  /* A route change always closes the menu. */
  useEffect(() => setOpen(false), [pathname]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className={`header${stuck ? ' is-stuck' : ''}${hidden ? ' is-hidden' : ''}`}>
        <div className="header__inner">
          <Link className="brand" href="/" aria-label="Futé Services — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/fute-logo-light.png" alt="Futé Services" width={504} height={161} />
          </Link>

          <nav className="nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                className="nav__link"
                href={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header__cta">
            <Link className="btn" href="/quote/">
              Get a quote
              <ArrowUpRight className="btn__arrow" />
            </Link>
            <button
              className={`burger${open ? ' is-open' : ''}`}
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu${open ? ' is-open' : ''}`} id="site-menu" aria-hidden={!open}>
        <nav aria-label="All pages">
          <ul className="menu__list">
            {MENU.map((item, i) => (
              <li className="menu__item" key={item.href}>
                <Link
                  className="menu__link"
                  href={item.href}
                  style={{ transitionDelay: open ? `${80 + i * 55}ms` : '0ms' }}
                >
                  <span className="t-num">{String(i + 1).padStart(2, '0')}</span> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu__foot">
          <div>
            <p className="t-label">Bengaluru — Head office</p>
            <p className="u-mt-s">
              HSR Layout, Bengaluru,
              <br />
              Karnataka, India
            </p>
          </div>
          <div>
            <p className="t-label">Talk to us</p>
            <p className="u-mt-s">
              <a href="tel:+916362396806">+91 63623 96806</a>
              <br />
              <a href="tel:+919742223928">+91 97422 23928</a>
            </p>
          </div>
          <div>
            <p className="t-label">Write to us</p>
            <p className="u-mt-s">
              <a href="mailto:marketing@futeservices.com">marketing@futeservices.com</a>
              <br />
              <a href="mailto:hr@futeservices.com">hr@futeservices.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
