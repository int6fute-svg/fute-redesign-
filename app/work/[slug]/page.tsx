import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WorkCard from '@/components/WorkCard';
import { Cta } from '@/components/sections';
import { Crumbs, SectionHead, TextLink } from '@/components/ui';
import { projects } from '@/lib/work';

/* One case-study template drives every project route. Swap the copy per project
   by extending lib/work.ts with per-project brief and gallery fields. */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.title} — ${p.meta}. Architectural visualisation by Futé Services.`,
    openGraph: { images: [p.src] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const [typology, city, year] = p.meta.split(' · ');

  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-hero__inner shell">
          <Crumbs
            trail={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work/' }, { label: p.title }]}
          />
          <div className="page-hero__grid">
            <h1 className="page-hero__title">
              <span className="reveal-line" style={{ '--d': '100ms' } as React.CSSProperties}>
                <span>{p.title}</span>
              </span>
            </h1>
            <div className="page-hero__aside reveal" style={{ '--d': '380ms' } as React.CSSProperties}>
              <p className="t-body">
                A {typology?.toLowerCase()} project in {city}, visualised before a slab was poured. Replace
                this with the real brief once the project is cleared for publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <div className="frame reveal-img" style={{ aspectRatio: '21/9' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} fetchPriority="high" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <div className="spec">
            <div className="spec__item">
              <p className="t-label t-label--red">Client</p>
              <p className="spec__val">Confidential developer</p>
            </div>
            <div className="spec__item">
              <p className="t-label t-label--red">Location</p>
              <p className="spec__val">{city}</p>
            </div>
            <div className="spec__item">
              <p className="t-label t-label--red">Typology</p>
              <p className="spec__val">{typology}</p>
            </div>
            <div className="spec__item">
              <p className="t-label t-label--red">Year</p>
              <p className="spec__val">{year}</p>
            </div>
          </div>
          <div className="spec">
            {p.cats.map((c) => (
              <div className="spec__item" key={c}>
                <p className="t-label t-label--red">Scope</p>
                <p className="spec__val" style={{ textTransform: 'capitalize' }}>
                  {c.replace('-', ' ').replace('vr360', '360 & VR')}
                </p>
              </div>
            ))}
            <div className="spec__item">
              <p className="t-label t-label--red">Index</p>
              <p className="spec__val">{p.idx}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="statement">
            <div className="statement__label">
              <p className="t-label t-label--red">(01) &nbsp; The brief</p>
            </div>
            <div className="statement__body">
              <p className="statement__lead reveal">
                Sell a place, not a plan — show something people would want to <em>spend a day in</em>.
              </p>
              <div className="statement__cols" data-stagger="120">
                <p className="t-body reveal">
                  Placeholder narrative. Replace with the real client challenge: what the marketing team
                  needed the imagery to prove, and which objection it had to answer.
                </p>
                <p className="t-body reveal">
                  Then the art-direction decision that made the difference — the hour, the camera height,
                  the human density — and what changed for the client once it shipped.
                </p>
              </div>
              <div className="u-mt-l">
                <TextLink href="/services/visual-experience/">The discipline behind this</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Next project"
            aside={<TextLink href="/work/">Back to all work</TextLink>}
            style={{ paddingBottom: '1.5rem' }}
          />
          <div className="work-grid">
            <WorkCard p={{ ...next, span: 12, frame: 'frame--16x9', offset: false }} />
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
