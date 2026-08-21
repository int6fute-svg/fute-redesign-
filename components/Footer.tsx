import Link from 'next/link';
import { products } from '@/lib/products';
import { TextLink } from './ui';
import Year from './Year';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/studio/', label: 'Studio' },
  { href: '/services/', label: 'Services' },
  { href: '/solutions/', label: 'Solutions' },
  { href: '/work/', label: 'Work' },
  { href: '/journal/', label: 'Journal' },
  { href: '/contact/', label: 'Contact' },
];

const STUDIOS = ['Bengaluru — HQ', 'Mumbai', 'Delhi', 'Hyderabad', 'Dubai', 'Prague — Workshop'];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__grid">
          <div className="footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/fute-logo-light.png"
              alt="Futé Services"
              width={504}
              height={161}
              style={{ height: '52px', width: 'auto' }}
            />
            <p className="t-body u-mt-m u-maxw-46" style={{ fontSize: '.9rem' }}>
              Futuristic. Unique. Trendy. Exceptional. Turning ideas into works of art — and into the
              experiences that sell them — since 2013.
            </p>
            <div className="u-mt-m">
              <TextLink href="/quote/">Get a quote</TextLink>
            </div>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Navigate</p>
            <ul className="footer__list">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Product families</p>
            <ul className="footer__list">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/services/${p.slug}/`} dangerouslySetInnerHTML={{ __html: p.name }} />
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col--wide">
            <p className="footer__heading">Contact</p>
            <ul className="footer__list">
              <li>
                <a href="mailto:marketing@futeservices.com">marketing@futeservices.com</a>
              </li>
              <li>
                <a href="mailto:hr@futeservices.com">hr@futeservices.com</a>
              </li>
              <li>
                <a href="tel:+916362396806">+91 63623 96806</a>
              </li>
              <li>
                <a href="tel:+919742223928">+91 97422 23928</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__heading">Studios</p>
            <ul className="footer__list">
              {STUDIOS.map((s) => (
                <li key={s}>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer__logotype" aria-hidden="true">
          FUTÉ SERVICES
        </p>

        <div className="footer__bar">
          <p>
            © <Year /> Futé Services. All rights reserved.
          </p>
          <p>Futuristic · Unique · Trendy · Exceptional</p>
          <p>
            <Link href="/contact/">Privacy</Link> &nbsp;/&nbsp; <Link href="/contact/">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
