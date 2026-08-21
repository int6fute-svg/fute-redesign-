/** Shared inline SVGs. Kept tiny and stroke-based so they inherit currentColor. */

export function ArrowUpRight({ className = 'arrow', size = 12 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 13 13 1M13 1H4M13 1v9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ArrowRight({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function ArrowDown({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function Caret() {
  return (
    <span className="field__caret" aria-hidden="true">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

export function PlayGlyph() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
      <path d="M19 11 1 21V1l18 10Z" fill="currentColor" />
    </svg>
  );
}
