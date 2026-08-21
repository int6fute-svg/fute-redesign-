import Link from 'next/link';
import type { Project } from '@/lib/work';

export default function WorkCard({ p, hidden }: { p: Project; hidden?: boolean }) {
  return (
    <Link
      className={[
        'work-card',
        `work-card--w${p.span}`,
        p.offset ? 'work-card--offset' : '',
        hidden ? 'is-hidden' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      href={`/work/${p.slug}/`}
    >
      <div className={`work-card__media ${p.frame} reveal-img`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.src} alt={p.alt} loading="lazy" />
      </div>
      <span className="work-card__badge tag tag--red">View project</span>
      <div className="work-card__foot">
        <div>
          <h3 className="work-card__title">{p.title}</h3>
          <p className="work-card__meta t-label">{p.meta}</p>
        </div>
        <span className="work-card__idx">{p.idx}</span>
      </div>
    </Link>
  );
}
