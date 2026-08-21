'use client';

import { useMemo, useState } from 'react';
import { FILTERS, projects } from '@/lib/work';
import WorkCard from './WorkCard';

/**
 * Filterable project index. Cards stay mounted and are hidden with a class so
 * the CSS grid keeps its rhythm and images are not re-fetched on every filter.
 */
export default function WorkIndex() {
  const [filter, setFilter] = useState('all');

  const shown = useMemo(
    () => projects.filter((p) => filter === 'all' || p.cats.includes(filter)),
    [filter]
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by discipline">
        {FILTERS.map((f) => (
          <button
            className={`chip${filter === f.key ? ' is-active' : ''}`}
            type="button"
            key={f.key}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="u-sr" role="status">
        {shown.length} projects shown
      </p>

      <div className="work-grid">
        {projects.map((p) => (
          <WorkCard key={p.slug} p={p} hidden={!shown.includes(p)} />
        ))}
      </div>
    </>
  );
}
