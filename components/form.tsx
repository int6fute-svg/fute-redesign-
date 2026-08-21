'use client';

import { useState, type ReactNode } from 'react';
import { Caret } from './icons';

/* ------------------------------------------------------------------ shared */

export type Values = Record<string, string>;
export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns a map of field name → message. Empty map means valid. */
export function validate(values: Values, required: string[]): Errors {
  const errors: Errors = {};
  required.forEach((name) => {
    const v = (values[name] || '').trim();
    if (!v) errors[name] = 'Required';
    else if (name.includes('email') && !EMAIL.test(v)) errors[name] = 'Enter a valid email address';
  });
  return errors;
}

/** Shared submit behaviour: no backend is wired up yet. */
export function useFormState(required: string[]) {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (name: string) => (v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(values, required);
    setErrors(next);
    if (Object.keys(next).filter((k) => next[k]).length) {
      const first = e.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      setSent(false);
      return;
    }
    setSent(true);
  }

  return { values, errors, sent, set, onSubmit };
}

export function FormStatus({ sent }: { sent: boolean }) {
  if (!sent) return null;
  return (
    <p className="form-status" role="status">
      Thank you — your enquiry is ready to send. Connect this form to your endpoint, or email{' '}
      <a href="mailto:marketing@futeservices.com">marketing@futeservices.com</a> directly.
    </p>
  );
}

/* ------------------------------------------------------------------ fields */

type Base = {
  name: string;
  label: string;
  value?: string;
  error?: string;
  onChange: (v: string) => void;
  required?: boolean;
  full?: boolean;
};

function wrap(value: string | undefined, error: string | undefined, full: boolean | undefined) {
  return [
    'field',
    value ? 'is-filled' : '',
    full ? 'field--full' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function Field({
  name,
  label,
  value,
  error,
  onChange,
  required,
  full,
  type = 'text',
  autoComplete,
  inputMode,
}: Base & {
  type?: string;
  autoComplete?: string;
  inputMode?: 'numeric' | 'text' | 'tel' | 'email';
}) {
  return (
    <div className={wrap(value, error, full)} style={error ? { borderBottomColor: 'var(--red-bright)' } : undefined}>
      <label htmlFor={`f-${name}`}>{label}</label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        value={value ?? ''}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={error ? 'true' : 'false'}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="field__err" aria-live="polite">
        {error}
      </span>
    </div>
  );
}

export function TextArea({ name, label, value, error, onChange, required, full, rows = 4 }: Base & { rows?: number }) {
  return (
    <div className={wrap(value, error, full)} style={error ? { borderBottomColor: 'var(--red-bright)' } : undefined}>
      <label htmlFor={`f-${name}`}>{label}</label>
      <textarea
        id={`f-${name}`}
        name={name}
        rows={rows}
        value={value ?? ''}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="field__err" aria-live="polite">
        {error}
      </span>
    </div>
  );
}

export function Select({
  name,
  label,
  value,
  error,
  onChange,
  required,
  full,
  options,
}: Base & { options: string[] }) {
  return (
    <div className={wrap(value, error, full)} style={error ? { borderBottomColor: 'var(--red-bright)' } : undefined}>
      <label htmlFor={`f-${name}`}>{label}</label>
      <select
        id={`f-${name}`}
        name={name}
        value={value ?? ''}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <Caret />
      <span className="field__err" aria-live="polite">
        {error}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------- chips */

export function ChipSet({
  options,
  selected,
  toggle,
}: {
  options: string[];
  selected: Set<string>;
  toggle: (v: string) => void;
}) {
  return (
    <div className="chip-set">
      {options.map((o) => (
        <label className={`chip${selected.has(o) ? ' is-active' : ''}`} key={o}>
          <input type="checkbox" name="scope" value={o} checked={selected.has(o)} onChange={() => toggle(o)} />
          {o}
        </label>
      ))}
    </div>
  );
}

export function FormNote({ children }: { children: ReactNode }) {
  return (
    <p className="form-note">
      <span className="t-num">●</span>
      {children}
    </p>
  );
}
