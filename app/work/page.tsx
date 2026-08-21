import type { Metadata } from 'next';
import WorkIndex from '@/components/WorkIndex';
import { Cta } from '@/components/sections';
import { PageHero } from '@/components/ui';
import { projects } from '@/lib/work';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected architectural visualisation: residential and commercial exteriors, interiors, walkthroughs, 360° tours, floor plans and physical scale models.',
  openGraph: { images: ['/assets/img/work/res-03.webp'] },
};

export default function WorkPage() {
  return (
    <main id="main">
      <PageHero
        bg="/assets/img/work/com-04.webp"
        trail={[{ label: 'Home', href: '/' }, { label: 'Work' }]}
        lines={[
          'Selected',
          <>
            <em>work</em>.
          </>,
        ]}
        aside={
          <p className="t-body">
            Residential towers, business districts, townships, interiors and scale models — across India and
            the Gulf. <span style={{ color: '#fff' }}>{projects.length}</span> projects shown.
          </p>
        }
      />

      <section className="section">
        <div className="shell">
          <WorkIndex />
        </div>
      </section>

      <Cta />
    </main>
  );
}
