'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '@/lib/products';
import { ArrowRight } from './icons';

/**
 * The six product families as a numbered index with a pinned media panel.
 *
 * Hovering or focusing a row swaps the image and the caption. The panel is a
 * real grid column rather than a cursor-following overlay, so it never covers
 * the copy.
 */
export default function FamilyIndex({ families }: { families: Product[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="fam">
      <div className="fam__list">
        {families.map((f, i) => (
          <Link
            className={`fam__row${i === active ? ' is-active' : ''}`}
            href={`/services/${f.slug}/`}
            key={f.slug}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="fam__inner">
              <span className="fam__num">{f.num}</span>
              <span>
                <span className="fam__name" dangerouslySetInnerHTML={{ __html: f.name }} />
                <span className="fam__line">{f.salesLine}</span>
              </span>
              <ArrowRight className="fam__arrow" />
            </span>
          </Link>
        ))}
      </div>

      <div className="fam__visual">
        <div className="fam__media" aria-hidden="true">
          {families.map((f, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={f.heroImage}
              alt=""
              key={f.slug}
              className={i === active ? 'is-active' : undefined}
              loading="lazy"
            />
          ))}
        </div>
        <p className="fam__caption t-label">
          <span className="t-num">→</span>
          <span>{families[active].capability}</span>
        </p>
      </div>
    </div>
  );
}
