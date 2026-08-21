import type { Metadata } from 'next';
import FamilyIndex from '@/components/FamilyIndex';
import { Card, Cta, Process } from '@/components/sections';
import { Btn, PageHero, SectionHead } from '@/components/ui';
import { products } from '@/lib/products';
import { PROCESS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Six product families: Visual, Cinematic, Interactive, Sales, Immersive and AI & Technology. The full Futé product architecture for real-estate developers.',
  openGraph: { images: ['/assets/img/work/res-01.webp'] },
};

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        bg="/assets/img/work/res-10.webp"
        trail={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        lines={[
          'Six product families.',
          <>
            One <em>partner</em>.
          </>,
        ]}
        aside={
          <p className="t-body">
            Not a list of deliverables — a product architecture. Each family solves a specific business
            problem, and most projects need two or three of them working together.
          </p>
        }
      />

      {/* ------------------------------------------------ 01 how to read this */}
      <section className="section">
        <div className="shell">
          <div className="statement">
            <div className="statement__label">
              <p className="t-label t-label--red">(01) &nbsp; How to read this</p>
            </div>
            <div className="statement__body">
              <p className="statement__lead reveal">
                A developer does not buy renders. They buy a launch, a positioning, an engaged buyer, a
                converted sale, or a sales gallery that finally <em>works</em>.
              </p>
              <div className="statement__cols" data-stagger="120">
                <p className="t-body reveal">
                  So the right question is never &ldquo;how many views do you need?&rdquo; It is what the
                  project has to achieve, by when, and for whom. Answer that and the combination of products
                  picks itself.
                </p>
                <p className="t-body reveal">
                  Each family below states the client problem it solves, our point of view, the
                  deliverables, and the business value to you — in that order, every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- 02 product architecture */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(02)   Product architecture"
            title={<h2 className="t-h2 reveal">The six families.</h2>}
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Hover to preview. Open any family for the full brief — challenge, solution, deliverables,
                value and case study.
              </p>
            }
          />
          <FamilyIndex families={products} />
        </div>
      </section>

      {/* --------------------------------------------------- 03 how they combine */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(03)   How they combine"
            title={
              <h2 className="t-h2 reveal">
                Nothing here works
                <br />
                alone for long.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                One model, one story, one set of materials — reused across every family so nothing drifts
                between the brochure and the headset.
              </p>
            }
          />
          <div className="grid grid-12" data-stagger="110">
            <Card num="01 → 02" title="Visual into Cinematic">
              The hero frames become the film&rsquo;s key art, and the film&rsquo;s Story DNA decides which
              frames get made in the first place.
            </Card>
            <Card num="03 → 04" title="Interactive into Sales">
              The masterplan and unit selector stop being a website feature and become the sales team&rsquo;s
              primary interface.
            </Card>
            <Card num="05 → 06" title="Immersive into AI">
              What a buyer explored in the headset becomes the signal that decides what the follow-up should
              say.
            </Card>
          </div>
          <div className="u-mt-l">
            <Btn href="/solutions/">See the packaged solutions</Btn>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ 04 engagement */}
      <section className="section" data-theme="bone">
        <div className="shell">
          <SectionHead
            eyebrow="(04)   Engagement"
            title={
              <h2 className="t-h2 reveal">
                Three ways to
                <br />
                work with us.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Not sure which fits? Send the brief and we will recommend one.
              </p>
            }
          />
          <div className="grid grid-12" data-stagger="120">
            <Card num="A" title="Single product">
              One deliverable from one family — a hero image set, a film, a scale model. Fixed scope, fixed
              price, fixed date.
            </Card>
            <Card num="B" title="Packaged solution">
              A combination built around one business objective, planned backwards from your launch date.
            </Card>
            <Card num="C" title="Retained partner">
              Reserved monthly capacity across your whole portfolio, with a named art director and agreed
              turnaround times.
            </Card>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- 05 process */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(05)   How we work"
            title={
              <h2 className="t-h2 reveal">
                Four checkpoints,
                <br />
                no surprises.
              </h2>
            }
          />
          <Process steps={PROCESS} />
        </div>
      </section>

      <Cta />
    </main>
  );
}
