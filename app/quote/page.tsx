import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';
import { PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Get a quote',
  description:
    'Tell us the business objective, the project and the launch date. We come back with a scope, a schedule and a number — usually within two working days.',
  openGraph: { images: ['/assets/img/work/res-01.webp'] },
};

const NEXT_STEPS = [
  { num: '01', title: 'We read it properly', text: 'A producer and an art director review the brief together — not a sales desk.' },
  { num: '02', title: 'Questions, if any', text: 'If something material is missing we ask once, in one message, rather than drip-feeding.' },
  { num: '03', title: 'Scope, schedule, number', text: 'A written proposal with deliverables, checkpoints and a fixed price — usually within two working days.' },
  { num: '04', title: 'Kick-off', text: 'One call to agree the objective and the story each frame tells. Then we start building.' },
];

export default function QuotePage() {
  return (
    <main id="main">
      <PageHero
        trail={[{ label: 'Home', href: '/' }, { label: 'Get a quote' }]}
        lines={[
          'Tell us what',
          <>
            you’re <em>launching</em>.
          </>,
        ]}
        aside={
          <p className="t-body">
            Five minutes here saves a week of back-and-forth. The more you can answer, the tighter the number
            we come back with.
          </p>
        }
      />

      <section className="section">
        <div className="shell">
          <div className="contact-grid">
            <div className="contact-grid__form">
              <QuoteForm />
            </div>

            <aside className="contact-grid__aside">
              <p className="t-label t-label--red">What happens next</p>
              {NEXT_STEPS.map((s) => (
                <div className="contact-block u-mt-m" key={s.num}>
                  <p className="t-num">{s.num}</p>
                  <p className="contact-block__val">{s.title}</p>
                  <p className="card__text u-mt-s">{s.text}</p>
                </div>
              ))}

              <div className="u-mt-l">
                <p className="t-label">Prefer to write directly?</p>
                <p className="contact-block__val u-mt-s">
                  <a href="mailto:marketing@futeservices.com">marketing@futeservices.com</a>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
