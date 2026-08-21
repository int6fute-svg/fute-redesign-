import Link from 'next/link';
import FamilyIndex from '@/components/FamilyIndex';
import HeroStage from '@/components/HeroStage';
import WorkCard from '@/components/WorkCard';
import { PlayGlyph } from '@/components/icons';
import { Cta, Evolution, Marquee, Objectives, Process, Stats } from '@/components/sections';
import { Btn, SectionHead, TextLink } from '@/components/ui';
import { products } from '@/lib/products';
import { CLIENTS, MARQUEE, OBJECTIVES, OFFICES, PROCESS, SECTORS } from '@/lib/site';
import { featured } from '@/lib/work';

const SLIDES = [
  { src: '/assets/img/work/com-01.webp', w: 1920, h: 1280 },
  { src: '/assets/img/work/res-01.webp', w: 1920, h: 1080 },
];

export default function Home() {
  return (
    <main id="main">
      <HeroStage
        slides={SLIDES}
        meta={
          <dl>
            <div>
              <dt>Studios</dt>
              <dd>06</dd>
            </div>
            <div>
              <dt>Product families</dt>
              <dd>06</dd>
            </div>
          </dl>
        }
      >
        <h1 className="hero__title">
          <span className="reveal-line" style={{ '--d': '120ms' } as React.CSSProperties}>
            <span>We turn ideas</span>
          </span>
          <span className="reveal-line" style={{ '--d': '230ms' } as React.CSSProperties}>
            <span>
              into <em className="t-red">works of art</em>
            </span>
          </span>
        </h1>

        <p
          className="hero__lede t-lead reveal"
          style={{ '--d': '420ms', color: 'rgba(255,255,255,.8)' } as React.CSSProperties}
        >
          We build the visual, interactive and immersive experiences that sell real estate — for the
          developers shaping India and the Gulf.
        </p>

        <div className="hero__actions reveal" style={{ '--d': '520ms' } as React.CSSProperties}>
          <Btn href="/work/">See the work</Btn>
          <TextLink href="/services/">What we do</TextLink>
        </div>
      </HeroStage>

      <Marquee items={MARQUEE} />

      {/* ------------------------------------------------------- 01 statement */}
      <section className="section" id="statement">
        <div className="shell">
          <div className="statement">
            <div className="statement__label">
              <p className="t-label t-label--red">(01) &nbsp; The studio</p>
            </div>
            <div className="statement__body">
              <p className="statement__lead reveal">
                Architecture is sold long before it is built. We make the unbuilt <em>believable</em> —
                light, material, weather and human life resolved with the discipline of a film set and the
                accuracy of a construction drawing.
              </p>

              <div className="statement__cols" data-stagger="120">
                <p className="t-body reveal">
                  Futé was founded on a simple conviction: a render is not a picture of a building, it is
                  the first experience anyone will ever have of it. Every frame we deliver is art-directed —
                  camera, hour, season, mood — so the project reads exactly as its architect intended.
                </p>
                <p className="t-body reveal">
                  That conviction has taken us past imagery. Today we build the interactive, immersive and
                  intelligent systems developers use to explain, sell and hand over a project — from the
                  first hero frame to the screen in the sales gallery.
                </p>
              </div>

              <div className="u-mt-l">
                <TextLink href="/studio/">Inside the studio</TextLink>
              </div>
            </div>
          </div>

          <Evolution />

          {/* "Deliverables shipped" is a placeholder figure — see README. */}
          <Stats
            items={[
              { value: 12, suffix: '+', label: 'Years in practice' },
              { value: 6, label: 'Studios & offices' },
              { value: 6, label: 'Product families' },
              { value: 1200, suffix: '+', label: 'Deliverables shipped' },
            ]}
          />
        </div>
      </section>

      {/* ------------------------------------------------------ 02 capabilities */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(02)   Capabilities"
            title={
              <h2 className="t-h2 reveal">
                Six product families,
                <br />
                one <span className="t-serif t-red">partner</span>.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Modelled once, reused everywhere. Most projects need two or three of these working together
                — not one.
              </p>
            }
          />
          <FamilyIndex families={products} />
          <div className="u-mt-l">
            <TextLink href="/services/">The full product architecture</TextLink>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ 03 selected work */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(03)   Selected work"
            title={
              <h2 className="t-h2 reveal">
                A decade of
                <br />
                <span className="t-serif t-red">unbuilt</span> architecture.
              </h2>
            }
            aside={<TextLink href="/work/">All projects</TextLink>}
          />
          <div className="work-grid">
            {featured.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- 04 objectives */}
      <section className="section" data-theme="bone">
        <div className="shell">
          <SectionHead
            eyebrow="(04)   Start here"
            title={
              <h2 className="t-h2 reveal">
                Tell us the objective,
                <br />
                not the <span className="t-serif t-red">deliverable</span>.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Every objective has a different combination behind it. Pick yours and we will bring the
                right one.
              </p>
            }
          />
          <Objectives items={OBJECTIVES} />
          <div className="u-mt-l">
            <Btn href="/solutions/" variant="dark">
              See the packaged solutions
            </Btn>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- reel */}
      <section className="section section--tight">
        <div className="shell">
          <Link className="reel" href="/work/" data-cursor="lg" aria-label="Watch the studio showreel">
            <div className="reel__media reveal-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/img/reel-poster.jpg" alt="Still frame from the Futé showreel" loading="lazy" />
            </div>
            <span className="reel__play">
              <PlayGlyph />
              <span>Showreel</span>
            </span>
          </Link>
          <SectionHead
            style={{ paddingTop: '1.5rem', paddingBottom: 0 }}
            eyebrow="2026 Showreel · 02:14"
            title={
              <p className="t-body">
                A cut of the walkthroughs, aerials and interiors delivered across our residential,
                commercial and hospitality work.
              </p>
            }
          />
        </div>
      </section>

      {/* --------------------------------------------------------- 05 process */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(05)   How we work"
            title={
              <h2 className="t-h2 reveal">
                A process built for
                <br />
                <span className="t-serif t-red">launch dates</span>.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Fixed checkpoints, one art director per project, and nothing rendered before the composition
                is signed off.
              </p>
            }
          />
          <Process steps={PROCESS} />
        </div>
      </section>

      {/* --------------------------------------------------------- 06 sectors */}
      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="(06)   Sectors" title={<h2 className="t-h2 reveal">Where our work lands.</h2>} />
          <div className="sectors">
            {SECTORS.map((s, i) => (
              <div className="sector" key={s}>
                <span className="sector__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sector__name">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- 07 clients */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(07)   Clients"
            title={
              <h2 className="t-h2 reveal">
                Trusted by the names
                <br />
                that build the skyline.
              </h2>
            }
          />
          {/* Replace text cells with client logo SVGs when supplied. */}
          <div className="clients">
            {CLIENTS.map((c) => (
              <div className="client" key={c}>
                {c}
              </div>
            ))}
            <div className="client" style={{ color: 'var(--red)' }}>
              + many more
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- mission */}
      <section className="section">
        <div className="shell">
          <figure className="quote">
            <blockquote className="reveal">
              <span className="quote__mark">&ldquo;</span>Our mission is to evolve into the greatest
              architectural visualisation company that redefines brilliance with its ultra-modern approach
              to photorealism.<span className="quote__mark">&rdquo;</span>
            </blockquote>
            <figcaption className="reveal">
              <span className="tag tag--red">Futé Services</span>
              <span className="t-label">The studio mission</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* -------------------------------------------------------- 08 presence */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(08)   Presence"
            title={
              <h2 className="t-h2 reveal">
                Six studios.
                <br />
                One <span className="t-serif t-red">24-hour</span> pipeline.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Our modelling workshop in Prague keeps production running while India sleeps — and the other
                way around.
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
                <p className="office__addr">{o.addr}</p>
                <a className="office__tel" href={o.href}>
                  {o.contact}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
