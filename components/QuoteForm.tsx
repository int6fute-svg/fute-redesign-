'use client';

import { useState } from 'react';
import { Btn } from './ui';
import { ChipSet, Field, FormNote, FormStatus, Select, TextArea, useFormState } from './form';

const OBJECTIVES = [
  'Project launch',
  'Premium positioning',
  'Buyer engagement',
  'Sales conversion',
  'Experience-centre transformation',
  'Investor communication',
  'International marketing',
  'Not sure yet — advise us',
];

const TYPOLOGY = [
  'Residential tower',
  'Township / masterplan',
  'Commercial & office',
  'Retail & mixed use',
  'Hospitality',
  'Healthcare',
  'Institutional',
  'Industrial & logistics',
  'Infrastructure',
];

const ASSETS = [
  'Full drawing set (CAD)',
  'PDF drawings only',
  '3D model available',
  'Concept sketches only',
  'Nothing yet',
];

const BUDGET = ['Under ₹2 lakh', '₹2 – 5 lakh', '₹5 – 15 lakh', '₹15 lakh +', 'Not defined yet'];

/* Grouped by product family, matching the six-family architecture. */
const SCOPE_GROUPS: { label: string; items: string[] }[] = [
  {
    label: '01 · Visual   02 · Cinematic',
    items: [
      'Exterior CGI',
      'Interior CGI',
      'Aerial views',
      'Floor-plan visualisation',
      'Walkthrough',
      'Launch film',
      'Teaser / lifestyle film',
    ],
  },
  {
    label: '03 · Interactive   04 · Sales',
    items: [
      'Interactive masterplan',
      'Unit / floor selector',
      '360° virtual tour',
      'Real-time 3D',
      'Sales presentation platform',
      'Sales-gallery interface',
      'Physical scale model',
    ],
  },
  {
    label: '05 · Immersive   06 · AI & Technology',
    items: [
      'Virtual reality',
      'AR experience',
      'Immersive room',
      'Digital twin',
      'AI property advisor',
      'AI sales assistant',
      'Drone / chroma shoot',
    ],
  },
];

const STEPS = ['Project', 'Scope', 'Schedule', 'You'];

export default function QuoteForm() {
  const { values, errors, sent, set, onSubmit } = useFormState(['objective', 'project', 'name', 'email']);
  const [scope, setScope] = useState<Set<string>>(new Set());

  const toggle = (v: string) =>
    setScope((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });

  return (
    <>
      <div className="steps" aria-hidden="true">
        {STEPS.map((s, i) => (
          <div className="step-tab is-active" key={s}>
            <span>{String(i + 1).padStart(2, '0')}</span> {s}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} noValidate>
        <fieldset className="fieldset">
          <legend className="u-sr">Project</legend>
          <div className="fieldset__legend">
            <span className="t-num">01</span>
            <h3>The project</h3>
          </div>
          <div className="form-grid">
            <Select name="objective" label="Business objective — start here" value={values.objective} error={errors.objective} onChange={set('objective')} options={OBJECTIVES} required full />
            <Field name="project" label="Project name" value={values.project} error={errors.project} onChange={set('project')} required full />
            <Select name="typology" label="Typology" value={values.typology} error={errors.typology} onChange={set('typology')} options={TYPOLOGY} />
            <Field name="city" label="City / location" value={values.city} error={errors.city} onChange={set('city')} />
            <Field name="scale" label="Scale (units, floors or built-up area)" value={values.scale} error={errors.scale} onChange={set('scale')} full />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="u-sr">Scope</legend>
          <div className="fieldset__legend">
            <span className="t-num">02</span>
            <h3>What you need</h3>
          </div>
          <p className="t-body" style={{ fontSize: '.875rem', marginBottom: '1.25rem' }}>
            Not sure? Answer the objective above and leave this blank — we will recommend the combination.
          </p>

          {SCOPE_GROUPS.map((g, i) => (
            <div key={g.label}>
              <p className="t-label t-label--red" style={{ margin: i === 0 ? '0 0 .75rem' : '1.5rem 0 .75rem' }}>
                {g.label}
              </p>
              <ChipSet options={g.items} selected={scope} toggle={toggle} />
            </div>
          ))}

          <div className="form-grid u-mt-m">
            <Field name="views" label="Approx. number of views" value={values.views} error={errors.views} onChange={set('views')} inputMode="numeric" />
            <Select name="assets" label="Drawings / 3D model available?" value={values.assets} error={errors.assets} onChange={set('assets')} options={ASSETS} />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="u-sr">Schedule</legend>
          <div className="fieldset__legend">
            <span className="t-num">03</span>
            <h3>Timing &amp; budget</h3>
          </div>
          <div className="form-grid">
            <Field name="deadline" label="Launch or delivery date" value={values.deadline} error={errors.deadline} onChange={set('deadline')} />
            <Select name="budget" label="Indicative budget" value={values.budget} error={errors.budget} onChange={set('budget')} options={BUDGET} />
            <TextArea name="notes" label="Anything else we should know" value={values.notes} error={errors.notes} onChange={set('notes')} full />
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="u-sr">Your details</legend>
          <div className="fieldset__legend">
            <span className="t-num">04</span>
            <h3>Your details</h3>
          </div>
          <div className="form-grid">
            <Field name="name" label="Full name" value={values.name} error={errors.name} onChange={set('name')} required autoComplete="name" />
            <Field name="company" label="Company" value={values.company} error={errors.company} onChange={set('company')} autoComplete="organization" />
            <Field name="email" label="Email" type="email" value={values.email} error={errors.email} onChange={set('email')} required autoComplete="email" />
            <Field name="phone" label="Phone" type="tel" value={values.phone} error={errors.phone} onChange={set('phone')} autoComplete="tel" />
          </div>
        </fieldset>

        <div className="u-mt-l">
          <Btn type="submit">Request the quote</Btn>
        </div>

        <FormNote>
          Drawings and commercial details are treated as confidential. We do not publish client work without
          written permission.
        </FormNote>
        <FormStatus sent={sent} />
      </form>
    </>
  );
}
