import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { PageHero, SectionHead } from '@/components/ui';
import { OFFICES } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to the studio. Bengaluru head office, plus Mumbai, Delhi, Hyderabad, Dubai and a Prague model workshop.',
  openGraph: { images: ['/assets/img/work/com-04.webp'] },
};

const DIRECT = [
  { label: 'New business', value: 'marketing@futeservices.com', href: 'mailto:marketing@futeservices.com' },
  { label: 'Careers', value: 'hr@futeservices.com', href: 'mailto:hr@futeservices.com' },
  { label: 'Bengaluru — head office', value: '+91 63623 96806', href: 'tel:+916362396806' },
  { label: 'Mumbai', value: '+91 97422 23928', href: 'tel:+919742223928' },
];

const PINS = [
  { left: '34%', top: '62%' },
  { left: '28%', top: '48%' },
  { left: '38%', top: '26%' },
  { left: '40%', top: '54%' },
  { left: '16%', top: '38%' },
  { left: '66%', top: '18%' },
];

const ADDRESSES = [
  'HSR Layout, Bengaluru, Karnataka, India',
  'Maharashtra, India',
  'National Capital Region, India',
  'Telangana, India',
  'United Arab Emirates',
  'Czech Republic',
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        trail={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        lines={[
          'Let’s talk about',
          <>
            what you’re <em>building</em>.
          </>,
        ]}
        aside={
          <p className="t-body">
            Enquiries are answered within one working day. If you already know the scope, the{' '}
            <Link href="/quote/" style={{ color: '#fff', textDecoration: 'underline' }}>
              quote form
            </Link>{' '}
            gets you a number faster.
          </p>
        }
      />

      <section className="section">
        <div className="shell">
          <div className="contact-grid">
            <div className="contact-grid__form">
              <p className="t-label t-label--red">(01) &nbsp; Send an enquiry</p>
              <ContactForm />
            </div>

            <aside className="contact-grid__aside">
              <p className="t-label t-label--red">(02) &nbsp; Direct lines</p>

              {DIRECT.map((d) => (
                <div className="contact-block u-mt-m" key={d.label}>
                  <p className="t-label">{d.label}</p>
                  <p className="contact-block__val">
                    <a href={d.href}>{d.value}</a>
                  </p>
                </div>
              ))}

              <div className="contact-block">
                <p className="t-label">Studio hours</p>
                <p className="contact-block__val">Mon – Sat, 10:00 – 19:00 IST</p>
              </div>

              <div className="mapish u-mt-l" role="img" aria-label="Schematic map of studio locations">
                {PINS.map((p, i) => (
                  <span className="mapish__pin" style={{ left: p.left, top: p.top }} key={i} />
                ))}
                <span className="mapish__label">Six locations · drop a live map here</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(03)   Studios"
            title={<h2 className="t-h2 reveal">Where to find us.</h2>}
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Street addresses are placeholders — replace with the registered address for each office.
              </p>
            }
          />
          <div className="offices">
            {OFFICES.map((o, i) => (
              <div className="office" key={o.city}>
                <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="office__city">
                  {o.city} {o.tag ? <span>{o.tag}</span> : null}
                </h3>
                <p className="office__addr">
                  {ADDRESSES[i]}
                  <br />
                  {o.addr}
                </p>
                <a className="office__tel" href={o.href}>
                  {o.contact}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
