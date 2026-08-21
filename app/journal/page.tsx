import type { Metadata } from 'next';
import Link from 'next/link';
import { Cta } from '@/components/sections';
import { Btn, PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'Notes from the studio: art direction, render craft, immersive sales tools and what makes real-estate experiences convert.',
  openGraph: { images: ['/assets/img/work/int-02.webp'] },
};

/* Placeholder articles. Replace copy, dates and images with real posts —
   ideally moved to MDX or a CMS once there is a publishing rhythm. */
type Post = {
  tag: string;
  read: string;
  title: string;
  excerpt: string;
  date: string;
  src: string;
  alt: string;
  lead?: boolean;
};

const POSTS: Post[] = [
  {
    tag: 'Art direction',
    read: '12 min read',
    title: 'Why the hour of day decides whether your render sells',
    excerpt:
      'Blue hour flatters glass. Midday flatters mass. Choosing the wrong one costs you the objection you were trying to answer — here is how we pick, and what we ask the client before we do.',
    date: '14 August 2026',
    src: '/assets/img/work/int-02.webp',
    alt: 'Interior render lit at golden hour',
    lead: true,
  },
  {
    tag: 'Immersive',
    read: '7 min',
    title: 'What a VR tour actually changes in a sales gallery',
    excerpt:
      'Six months of gallery data, one uncomfortable finding: the headset does not close the sale. It removes the objection that was blocking it.',
    date: '2 August 2026',
    src: '/assets/img/work/vr-02.webp',
    alt: 'Virtual reality tour interface',
  },
  {
    tag: 'Craft',
    read: '9 min',
    title: 'The physical model is not nostalgia',
    excerpt: 'Why a lit acrylic model still outperforms a screen in the one moment that matters — the walk-up.',
    date: '21 July 2026',
    src: '/assets/img/work/sm-03.webp',
    alt: 'Model maker working on a physical scale model',
  },
  {
    tag: 'Sales',
    read: '6 min',
    title: 'Buyers cannot read plans. Stop asking them to.',
    excerpt:
      'The single cheapest upgrade to a portal listing is a furnished 3D plan. We measured what it does to enquiry quality.',
    date: '9 July 2026',
    src: '/assets/img/work/fp-02.webp',
    alt: '3D floor plan with furniture',
  },
  {
    tag: 'Process',
    read: '8 min',
    title: 'Sign off the composition, not the render',
    excerpt:
      'Grey-scale camera approval is the cheapest checkpoint in the whole pipeline — and the one clients most often want to skip.',
    date: '28 June 2026',
    src: '/assets/img/work/res-09.webp',
    alt: 'Aerial render of a development in context',
  },
  {
    tag: 'Craft',
    read: '10 min',
    title: 'People, not entourage',
    excerpt:
      'The cutouts you drop into a plaza tell a buyer who the building is for. Most of them are telling the wrong story.',
    date: '15 June 2026',
    src: '/assets/img/work/com-06.webp',
    alt: 'Commercial development render',
  },
  {
    tag: 'Business',
    read: '5 min',
    title: 'What a launch package should actually contain',
    excerpt:
      'Working backwards from the launch date: the deliverables that earn their place, and the ones that are usually vanity.',
    date: '30 May 2026',
    src: '/assets/img/work/res-02.webp',
    alt: 'Residential tower render at dusk',
  },
];

export default function JournalPage() {
  return (
    <main id="main">
      <PageHero
        trail={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
        lines={[
          'Notes from',
          <>
            the <em>studio</em>.
          </>,
        ]}
        aside={
          <p className="t-body">
            Craft, art direction and the commercial mechanics of selling architecture before it exists.
            Written by the people making the work.
          </p>
        }
      />

      <section className="section">
        <div className="shell">
          <div className="journal" data-stagger="120">
            {POSTS.map((post) => (
              <Link
                className={`post${post.lead ? ' post--lead' : ''} reveal`}
                href="/journal/"
                key={post.title}
              >
                <div className={`post__media ${post.lead ? 'frame--3x2' : 'frame--4x3'} reveal-img`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.src} alt={post.alt} loading="lazy" />
                </div>
                <div className="post__body">
                  <div className="post__meta">
                    <span className={post.lead ? 'tag tag--red' : 'tag'}>{post.tag}</span>
                    <span className="t-label">{post.read}</span>
                  </div>
                  {post.lead ? (
                    <h2 className="post__title">{post.title}</h2>
                  ) : (
                    <h3 className="post__title">{post.title}</h3>
                  )}
                  <p className="post__excerpt">{post.excerpt}</p>
                  <p className="t-label u-mt-m">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="u-mt-l" style={{ display: 'flex', justifyContent: 'center' }}>
            <Btn href="/journal/" variant="ghost">
              Load more articles
            </Btn>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
