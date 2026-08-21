'use client';

import { useRef, useState } from 'react';

export type Faq = { q: string; a: string };

/** Single-open accordion; heights are animated so the CSS transition still runs. */
export default function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`acc__item${isOpen ? ' is-open' : ''}`} key={item.q}>
            <button
              className="acc__btn"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <span className="acc__icon" aria-hidden="true" />
            </button>
            <div
              className="acc__panel"
              id={`acc-panel-${i}`}
              role="region"
              ref={(el) => {
                panels.current[i] = el;
              }}
              style={{ height: isOpen ? panels.current[i]?.scrollHeight ?? 'auto' : 0 }}
            >
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
