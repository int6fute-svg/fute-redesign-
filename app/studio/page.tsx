import type { Metadata } from 'next';
import Accordion, { type Faq } from '@/components/Accordion';
import { Cta, Stats } from '@/components/sections';
import { Btn, PageHero, SectionHead, TextLink } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Who we are: architects, 3D artists, lighting specialists, editors and model makers working across six locations on one production pipeline.',
  openGraph: { images: ['/assets/img/work/sm-02.webp'] },
};

const VALUES = [
  {
    title: 'Socio-cultural value',
    text: 'A building belongs to a street, a city and a climate. We show it in its context — the people, the light and the life that will actually surround it.',
  },
  {
    title: 'Experiential value',
    text: 'What does it feel like to arrive, to walk in, to look up? Composition, camera height and movement are directed to answer that, frame by frame.',
  },
  {
    title: 'Building-technical value',
    text: 'Modelled to the drawing set, shaded against real material samples. If it cannot be built that way, we do not draw it that way.',
  },
  {
    title: 'Economic value',
    text: 'Imagery is a sales instrument. Every deliverable is planned around the launch date, the channel and the audience it has to convert.',
  },
];

const TIMELINE = [
  { year: '2013', title: 'Founded in Bengaluru', text: 'Futé opens with a small team of architects and 3D artists, working on residential exteriors for local developers.' },
  { year: '2015', title: 'Walkthrough & film', text: 'Animation and editorial capability added in-house, moving the studio from still imagery into cinematic launch films.' },
  { year: '2017', title: 'Model workshop', text: 'Physical scale-model production begins, allowing digital and physical deliverables to be built from a single source model.' },
  { year: '2019', title: 'Immersive division', text: 'VR, AR and 360° panorama work is formalised as its own discipline for sales galleries and remote buyers.' },
  { year: '2021', title: 'Gulf & Europe', text: 'Dubai presence and a Prague modelling studio extend the pipeline to a genuine 24-hour cycle for international clients.' },
  { year: 'Today', title: 'Six families, one standard', text: 'Visual, Cinematic, Interactive, Sales, Immersive and AI & Technology — delivered under a single art direction.' },
];

const TEAM = [
  { initials: 'RK', name: 'Ratish Kovvammal', role: 'Founder & Chief Executive', bio: 'Fourteen years in architectural visualisation. Sets the art direction standard the studio is measured against.' },
  { initials: 'S', name: 'Soma', role: 'Managing Director', bio: 'Owns client relationships and studio strategy across the Indian and Gulf regions.' },
  { initials: 'PS', name: 'Payel Saha', role: 'Chief Operations Officer', bio: 'Runs production across six locations — scheduling, capacity and the delivery promise behind every launch date.' },
];

const FAQ: Faq[] = [
  {
    q: 'What do you need from us to start?',
    a: 'Architectural drawings (plans, elevations, sections) in CAD or PDF, any 3D model you already hold, the material and finish schedule, site context or a location pin, and reference imagery for the mood you want. If a piece is missing we will tell you what it changes rather than guess.',
  },
  {
    q: 'How long does a set of exterior stills take?',
    a: 'A typical set of three to five exterior views runs two to three weeks from approved drawings: modelling and camera options in the first week, art direction and lighting in the second, grade and revisions in the third. Launch-critical work can be compressed — tell us the date at kick-off, not at the end.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Two structured rounds are built into every scope: one at grey-scale camera stage, one after the first lit render. Because composition is signed off before anything is rendered, late-stage surprises are rare and expensive changes are rarer.',
  },
  {
    q: 'Can one model drive stills, film, VR and a physical model?',
    a: 'Yes — that is the reason to keep all six product families in one studio. The asset is built once to the highest required fidelity, then optimised per output. It keeps materials, landscape and branding identical across your brochure, your film, your headset tour and the model in the sales gallery.',
  },
  {
    q: 'Which formats do you deliver?',
    a: 'Print-ready TIFF or PSD at hoarding resolution, web-optimised JPEG and WebP, layered files for your agency, ProRes and H.264 masters for film, equirectangular panoramas for web and headset, and packaged builds for VR. Source files can be handed over on request.',
  },
];

export default function StudioPage() {
  return (
    <main id="main">
      <PageHero
        bg="/assets/img/work/sm-04.webp"
        trail={[{ label: 'Home', href: '/' }, { label: 'Studio' }]}
        lines={[
          'The studio behind',
          <>
            the <em>image</em>.
          </>,
        ]}
        aside={
          <p className="t-body">
            Architects, 3D artists, lighting specialists, editors, developers and model makers. One craft,
            split across six locations and a single production pipeline.
          </p>
        }
      />

      {/* --------------------------------------------- 01 vision & mission */}
      <section className="section">
        <div className="shell">
          <div className="statement">
            <div className="statement__label">
              <p className="t-label t-label--red">(01) &nbsp; Vision &amp; mission</p>
            </div>
            <div className="statement__body">
              <p className="statement__lead reveal">
                Our vision is to provide one-of-a-kind <em>turnkey solutions</em> for every marketing need —
                customisable, end to end, and built around the way your project actually sells.
              </p>
              <div className="statement__cols" data-stagger="120">
                <p className="t-body reveal">
                  Our mission is to evolve into the greatest architectural visualisation company — one that
                  redefines brilliance through an ultra-modern approach to photorealism. That is not a
                  slogan; it sets the bar every frame has to clear before it leaves the studio.
                </p>
                <p className="t-body reveal">
                  We build partnerships rather than take orders. Cross-sector collaboration — developers,
                  architects, landscape designers, marketing agencies — is how a project keeps one voice from
                  the first render to the last hoarding.
                </p>
              </div>
            </div>
          </div>

          <Stats
            items={[
              { value: 12, suffix: '+', label: 'Years in practice' },
              { value: 6, label: 'Studios & offices' },
              { value: 5, label: 'Countries served' },
              { value: 24, suffix: '/7', label: 'Production cycle' },
            ]}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- 02 values */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(02)   What we hold to"
            title={
              <h2 className="t-h2 reveal">
                Four values that
                <br />
                reinforce each other.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Every project is measured against all four. Drop one and the picture stops being true.
              </p>
            }
          />
          <div className="values" data-stagger="130">
            {VALUES.map((v, i) => (
              <div className="value reveal" key={v.title}>
                <p className="value__num">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="value__title">{v.title}</h3>
                <p className="value__text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- 03 craft */}
      <section className="section">
        <div className="shell">
          <div className="split">
            <div className="split__media reveal-img">
              <div className="frame frame--4x3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/img/work/int-05.webp"
                  alt="Interior visualisation showing directed lighting and material detail"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="split__body">
              <p className="t-label t-label--red">(03) &nbsp; The craft</p>
              <h2 className="t-h2 u-mt-m reveal">
                A render is the first
                <br />
                experience of a building.
              </h2>
              <p className="t-body u-mt-m">
                Long before a slab is poured, someone decides whether they want to live or work in your
                project. That decision is made in front of an image. We treat it with the seriousness it
                deserves.
              </p>
              <p className="t-body">
                That means art direction before production: agreeing the hour of day, the weather, the season
                and the human story of each frame — then building only what the camera will see, to the
                standard the camera demands.
              </p>
              <div className="u-mt-m">
                <TextLink href="/services/">See the six families</TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- 04 timeline */}
      <section className="section" data-theme="bone">
        <div className="shell">
          <SectionHead
            eyebrow="(04)   Trajectory"
            title={
              <h2 className="t-h2 reveal">
                How the studio
                <br />
                came to be.
              </h2>
            }
          />
          <div className="timeline" data-stagger="90">
            {TIMELINE.map((t) => (
              <div className="timeline__row reveal" key={t.year}>
                <p className="timeline__year">{t.year}</p>
                <h3 className="timeline__title">{t.title}</h3>
                <p className="timeline__text">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ 05 leadership */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="(05)   Leadership"
            title={
              <h2 className="t-h2 reveal">
                The people who
                <br />
                sign off the work.
              </h2>
            }
            aside={
              <p className="t-body reveal" style={{ fontSize: '.875rem' }}>
                Replace the initials with studio portraits when the shoot is done — the frames are already
                sized for it.
              </p>
            }
          />
          <div className="team" data-stagger="120">
            {TEAM.map((m) => (
              <article className="team__card reveal" key={m.name}>
                <div className="team__media">
                  <div className="team__ph" aria-hidden="true">
                    {m.initials}
                  </div>
                </div>
                <h3 className="team__name">{m.name}</h3>
                <p className="team__role t-label">{m.role}</p>
                <p className="card__text u-mt-s">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- 06 FAQ */}
      <section className="section" data-theme="light">
        <div className="shell">
          <SectionHead
            eyebrow="(06)   Inside the pipeline"
            title={
              <h2 className="t-h2 reveal">
                Questions we get
                <br />
                before a first brief.
              </h2>
            }
          />
          <Accordion items={FAQ} />
        </div>
      </section>

      {/* --------------------------------------------------------- 07 careers */}
      <section className="section">
        <div className="shell">
          <div className="split split--flip">
            <div className="split__media reveal-img">
              <div className="frame frame--3x2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/img/work/com-05.webp"
                  alt="Commercial architectural render produced by the studio"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="split__body">
              <p className="t-label t-label--red">(07) &nbsp; Careers</p>
              <h2 className="t-h2 u-mt-m reveal">
                Artists, architects,
                <br />
                engineers and makers.
              </h2>
              <p className="t-body u-mt-m">
                We hire for taste as much as for technique. If you can look at a frame and say precisely why
                it is not working yet, we would like to see your reel.
              </p>
              <div className="u-mt-m">
                <Btn href="mailto:hr@futeservices.com" variant="ghost">
                  hr@futeservices.com
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
