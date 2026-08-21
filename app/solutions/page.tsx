import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, Cta, Objectives, Process } from '@/components/sections';
import { PageHero, SectionHead } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Four packaged solutions built around a business objective: Project Launch Experience, Luxury Brand Experience, Sales Conversion Experience and Digital Experience Centre.',
  openGraph: { images: ['/assets/img/work/com-07.webp'] },
};

/* Objectives here jump down the page rather than across to it. */
const LOCAL_OBJECTIVES = [
  { name: 'Project launch', rec: 'Project Launch Experience', href: '#launch' },
  { name: 'Premium positioning', rec: 'Luxury Brand Experience', href: '#luxury' },
  { name: 'Buyer engagement', rec: 'Sales Conversion Experience', href: '#conversion' },
  { name: 'Sales conversion', rec: 'Sales Conversion Experience', href: '#conversion' },
  { name: 'Experience-centre transformation', rec: 'Digital Experience Centre', href: '#experience-centre' },
  { name: 'Investor communication', rec: 'Project Launch Experience', href: '#launch' },
  { name: 'International marketing', rec: 'Luxury Brand Experience', href: '#luxury' },
];

type Package = {
  id: string;
  num: string;
  name: string;
  text: string;
  combo: string[];
  families: { label: string; slug: string }[];
};

const PACKAGES: Package[] = [
  {
    id: 'launch',
    num: '01',
    name: 'Project Launch Experience',
    text: 'Everything required to translate the project vision into a premium launch. Built backwards from the launch date, so every asset lands when the campaign needs it.',
    combo: ['Story DNA', 'CGI campaign', 'Cinematic film', 'Interactive project experience', 'Sales-gallery content'],
    families: [
      { label: '01 Visual', slug: 'visual-experience' },
      { label: '02 Cinematic', slug: 'cinematic-experience' },
      { label: '03 Interactive', slug: 'interactive-experience' },
      { label: '04 Sales', slug: 'sales-experience' },
    ],
  },
  {
    id: 'luxury',
    num: '02',
    name: 'Luxury Brand Experience',
    text: 'A differentiated visual and emotional identity for premium real estate, where the decision is made on feeling and the buyer is often not in the country.',
    combo: ['Story strategy', 'Premium CGI', 'Cinematic storytelling', 'Lifestyle visualisation', 'Immersive presentation'],
    families: [
      { label: '01 Visual', slug: 'visual-experience' },
      { label: '02 Cinematic', slug: 'cinematic-experience' },
      { label: '05 Immersive', slug: 'immersive-experience' },
    ],
  },
  {
    id: 'conversion',
    num: '03',
    name: 'Sales Conversion Experience',
    text: 'For teams selling a complex development: many towers, many unit types, and a conversation that keeps stalling on “let me find that plan”.',
    combo: ['Interactive masterplan', 'Unit selector', 'Floor-plan explorer', 'Sales presentation platform', 'AI sales assistant'],
    families: [
      { label: '03 Interactive', slug: 'interactive-experience' },
      { label: '04 Sales', slug: 'sales-experience' },
      { label: '06 AI & Tech', slug: 'ai-technology' },
    ],
  },
  {
    id: 'experience-centre',
    num: '04',
    name: 'Digital Experience Centre',
    text: 'Turning a traditional sales gallery into an intelligent project experience — one interface across the wall, the tablet and the headset.',
    combo: ['Interactive wall / touchscreen', 'Real-time 3D', 'Virtual tours', 'Films', 'Unit exploration', 'Immersive experience'],
    families: [
      { label: '03 Interactive', slug: 'interactive-experience' },
      { label: '04 Sales', slug: 'sales-experience' },
      { label: '05 Immersive', slug: 'immersive-experience' },
      { label: '06 AI & Tech', slug: 'ai-technology' },
    ],
  },
];

const SCOPING = [
  {
    title: 'Diagnose the objective',
    text: 'Launch, positioning, engagement, conversion, experience centre, investors or international. We name it before anything is priced.',
  },
  {
    title: 'Map the buyer journey',
    text: 'Where the buyer first meets the project, where they stall, and which moment the package has to fix.',
  },
  {
    title: 'Combine the families',
    text: 'Two or three product families, built from one source model so nothing contradicts anything else.',
  },
  {
    title: 'Scope, schedule, number',
    text: 'A written proposal with deliverables, checkpoints and a fixed price — usually within two working days.',
  },
];

export default function SolutionsPage() {
  return (
    <main id="main">
      <PageHero
        bg="/assets/img/work/com-05.webp"
        trail={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
        lines={[
          'Start with the',
          <>
            <em>objective</em>.
          </>,
        ]}
        aside={
          <p className="t-body">
            Four packages, each built backwards from a business outcome rather than forwards from a
            deliverable list. Every one combines two or more of the six product families.
          </p>
        }
      />

      {/* ---------------------------------------------------- 01 diagnose first */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(01)   Diagnose first"
            title={
              <h2 className="t-h2 reveal">
                What is this project
                <br />
                actually trying to do?
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Pick the closest objective. It points at the package that fits.
              </p>
            }
          />
          <Objectives items={LOCAL_OBJECTIVES} down />
        </div>
      </section>

      {/* -------------------------------------------------------- 02 packages */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(02)   The packages"
            title={
              <h2 className="t-h2 reveal">
                Four combinations,
                <br />
                four <span className="t-serif t-red">outcomes</span>.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Every package is a starting point, not a fixed menu — we tune the combination to the
                project.
              </p>
            }
          />
          <div className="packages" data-stagger="130">
            {PACKAGES.map((pkg) => (
              <article className="package reveal" id={pkg.id} key={pkg.id}>
                <p className="package__num">{pkg.num}</p>
                <h3 className="package__name">{pkg.name}</h3>
                <p className="package__text">{pkg.text}</p>
                <div className="package__combo">
                  {pkg.combo.map((c) => (
                    <span className="package__chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
                <p className="t-label u-mt-m">
                  Families &nbsp;·&nbsp;{' '}
                  {pkg.families.map((f) => (
                    <span key={f.slug}>
                      <Link href={`/services/${f.slug}/`}>{f.label}</Link>{' '}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- 03 scoping */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(03)   How a package gets built"
            title={
              <h2 className="t-h2 reveal">
                Consultative, not
                <br />
                a quotation counter.
              </h2>
            }
          />
          <Process steps={SCOPING} />
        </div>
      </section>

      {/* ------------------------------------------------ 04 portfolio levels */}
      <section className="section" data-theme="bone">
        <div className="shell">
          <SectionHead
            eyebrow="(04)   For your team"
            title={
              <h2 className="t-h2 reveal">
                Three ways we
                <br />
                present this.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Tell us who is in the room and we bring the right one.
              </p>
            }
          />
          <div className="grid grid-12" data-stagger="120">
            <Card num="01" title="Master portfolio">
              The complete Futé capability, for first introductions and leadership presentations. 25–35
              slides.
            </Card>
            <Card num="02" title="Product portfolio">
              A focused deck for one product family — Interactive or Cinematic, for example. 8–12 slides.
            </Card>
            <Card num="03" title="Client-specific pitch">
              Starts with your project, your buyer and your challenge, then the relevant solution and case
              studies. 10–15 slides.
            </Card>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
