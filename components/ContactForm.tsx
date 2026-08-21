'use client';

import { Btn } from './ui';
import { Field, FormNote, FormStatus, Select, TextArea, useFormState } from './form';

const SUBJECTS = [
  'New project enquiry',
  'Quote for a defined scope',
  'Retained studio capacity',
  'Careers & portfolio submission',
  'Press or partnership',
  'Something else',
];

export default function ContactForm() {
  const { values, errors, sent, set, onSubmit } = useFormState(['name', 'email', 'message']);

  return (
    <form className="u-mt-m" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <Field name="name" label="Full name" value={values.name} error={errors.name} onChange={set('name')} required autoComplete="name" />
        <Field name="company" label="Company" value={values.company} error={errors.company} onChange={set('company')} autoComplete="organization" />
        <Field name="email" label="Email" type="email" value={values.email} error={errors.email} onChange={set('email')} required autoComplete="email" />
        <Field name="phone" label="Phone" type="tel" value={values.phone} error={errors.phone} onChange={set('phone')} autoComplete="tel" />
        <Select name="subject" label="What is this about?" value={values.subject} error={errors.subject} onChange={set('subject')} options={SUBJECTS} full />
        <TextArea name="message" label="Tell us about the project" value={values.message} error={errors.message} onChange={set('message')} required full />
      </div>

      <div className="u-mt-m">
        <Btn type="submit">Send enquiry</Btn>
      </div>

      <FormNote>
        We use what you send only to answer your enquiry. Drawings and reference material are treated as
        confidential and are never shown as work without written permission.
      </FormNote>
      <FormStatus sent={sent} />
    </form>
  );
}
