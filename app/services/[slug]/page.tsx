import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from '@/components/icons';
import { Cta } from '@/components/sections';
import { Crumbs, SectionHead, TextLink } from '@/components/ui';
import { bySlug, products, type Product } from '@/lib/products';

const strip = (s: string) => s.replace(/<[^>]+>/g, '');

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug[slug];
  if (!p) return {};
  return {
    title: strip(p.name),
    description: strip(p.positioning),
    openGraph: { images: [p.heroImage] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p: Product | undefined = bySlug[slug];
  if (!p) notFound();

  return (
    <main id="main">
      {/* --------------------------------------- 1 name · 2 one-line positioning */}
      <section className="page-hero page-hero--media">
        <div className="page-hero__bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.heroImage} alt="" />
        </div>
        <div className="page-hero__inner shell">
          <Crumbs
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services/' },
              { label: strip(p.name) },
            ]}
          />
          <div className="page-hero__grid">
            <h1 className="page-hero__title">
              <span className="reveal-line" style={{ '--d': '100ms' } as React.CSSProperties}>
                <span dangerouslySetInnerHTML={{ __html: p.heroTitle }} />
              </span>
            </h1>
            <div className="page-hero__aside reveal" style={{ '--d': '380ms' } as React.CSSProperties}>
              <p className="t-label t-label--red">Product family {p.num} / 06</p>
              <p className="t-body u-mt-s">{p.positioning}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ 3 challenge · 4 solution */}
      <section className="section">
        <div className="shell">
          <div className="pr-split">
            <div className="pr-split__col">
              <p className="t-label t-label--red">(01) &nbsp; The client challenge</p>
              <div className="u-mt-m">
                {p.challenge.map((t) => (
                  <p className="t-lead" key={t} dangerouslySetInnerHTML={{ __html: t }} />
                ))}
              </div>
            </div>
            <div className="pr-split__col pr-split__col--accent">
              <p className="t-label t-label--red">(02) &nbsp; The Futé solution</p>
              <div className="u-mt-m">
                {p.solution.map((t) => (
                  <p className="t-lead" key={t} dangerouslySetInnerHTML={{ __html: t }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Story DNA pipeline */}
      {p.process ? (
        <section className="section section--tight" data-theme="red">
          <div className="shell">
            <SectionHead
              style={{ paddingBottom: 'clamp(1.5rem,3vw,2.5rem)' }}
              eyebrow="The Futé process"
              title={
                <h2 className="t-h2 reveal">
                  It starts with <span className="t-serif">Story DNA</span>.
                </h2>
              }
              aside={
                <p className="t-body reveal" style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.86)' }}>
                  Ten stages, in order. Nothing is animated before the story is agreed.
                </p>
              }
            />
            <ol className="pipeline" data-stagger="70">
              {p.process.map((s, i) => (
                <li className="pipeline__step reveal" key={s}>
                  <span className="pipeline__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pipeline__name" dangerouslySetInnerHTML={{ __html: s }} />
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* --------------------------------------- 5 deliverables · 6 value */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(03)   What you get"
            title={
              <h2 className="t-h2 reveal">
                Deliverables and
                <br />
                what they <span className="t-serif t-red">buy you</span>.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Ideal buyers: {p.buyers}
              </p>
            }
          />
          <div className="pr-lists">
            <div className="pr-lists__col">
              <p className="t-label">Services &amp; deliverables</p>
              <ul className="pr-deliverables" data-stagger="60">
                {p.deliverables.map((d) => (
                  <li className="pr-deliverables__item reveal" key={d} dangerouslySetInnerHTML={{ __html: d }} />
                ))}
              </ul>
            </div>
            <div className="pr-lists__col">
              <p className="t-label">Business value</p>
              <ul className="pr-value" data-stagger="70">
                {p.value.map((v) => (
                  <li className="pr-value__item reveal" key={v}>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- 7 best work */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(04)   Best work"
            title={<h2 className="t-h2 reveal">Quality over quantity.</h2>}
            aside={<TextLink href="/work/">Full project index</TextLink>}
          />
          <div className="gallery" data-stagger="110">
            {p.gallery.map((g, i) => (
              <figure className={`gallery__item${i === 0 ? ' gallery__item--full' : ''} reveal-img`} key={g.src}>
                <div
                  className={`frame ${i === 0 ? '' : 'frame--3x2'}`}
                  style={i === 0 ? { aspectRatio: '21/9' } : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt} loading="lazy" />
                </div>
                <figcaption className="gallery__cap t-label">
                  {String(i + 1).padStart(2, '0')} — {g.cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- 8 case study */}
      <section className="section" data-theme="bone">
        <div className="shell">
          <SectionHead
            eyebrow="(05)   Case study"
            title={
              <h2 className="t-h2 reveal">
                Challenge, solution,
                <br />
                result.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Placeholder narrative — replace with a named client story once approved.
              </p>
            }
          />
          <ol className="casestudy" data-stagger="140">
            <li className="casestudy__step reveal">
              <p className="casestudy__label t-label">Client challenge</p>
              <p className="casestudy__text">{p.caseStudy.challenge}</p>
            </li>
            <li className="casestudy__step reveal">
              <p className="casestudy__label t-label">Futé solution</p>
              <p className="casestudy__text">{p.caseStudy.solution}</p>
            </li>
            <li className="casestudy__step casestudy__step--result reveal">
              <p className="casestudy__label t-label">Result &amp; impact</p>
              <p className="casestudy__text">{p.caseStudy.result}</p>
            </li>
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------- 9 related products */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(06)   Related products"
            title={<h2 className="t-h2 reveal">What this pairs with.</h2>}
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Most projects need two or three of these together.{' '}
                <Link href="/solutions/" style={{ color: 'var(--fg)', textDecoration: 'underline' }}>
                  See the packaged solutions
                </Link>
                .
              </p>
            }
          />
          <div className="crosssell">
            {p.related.map((slug) => {
              const r = bySlug[slug];
              return (
                <Link className="crosssell__item reveal" href={`/services/${r.slug}/`} key={r.slug}>
                  <span className="crosssell__num t-num">{r.num}</span>
                  <span className="crosssell__name" dangerouslySetInnerHTML={{ __html: r.name }} />
                  <span className="crosssell__line">{r.salesLine}</span>
                  <ArrowRight className="crosssell__arrow" size={16} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- 10 call to action */}
      <Cta />
    </main>
  );
}
