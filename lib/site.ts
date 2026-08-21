/* Shared site content used on more than one page. */

export const SECTORS = [
  'Residential Towers',
  'Township & Masterplan',
  'Commercial & Office',
  'Retail & Mixed Use',
  'Hospitality',
  'Healthcare',
  'Institutional',
  'Industrial & Logistics',
  'Infrastructure',
];

export type Office = { city: string; tag?: string; addr: string; contact: string; href: string };

export const OFFICES: Office[] = [
  {
    city: 'Bengaluru',
    tag: 'HQ',
    addr: 'Head office & principal production floor — visualisation, immersive and post.',
    contact: '+91 63623 96806',
    href: 'tel:+916362396806',
  },
  {
    city: 'Mumbai',
    addr: 'Client servicing and art direction for western-region developers.',
    contact: '+91 97422 23928',
    href: 'tel:+919742223928',
  },
  {
    city: 'Delhi',
    addr: 'Northern-region accounts, presentation and pitch support.',
    contact: 'marketing@futeservices.com',
    href: 'mailto:marketing@futeservices.com',
  },
  {
    city: 'Hyderabad',
    addr: 'Visualisation and floor-plan production.',
    contact: 'marketing@futeservices.com',
    href: 'mailto:marketing@futeservices.com',
  },
  {
    city: 'Dubai',
    addr: 'Gulf region — developer relations and on-site model installation.',
    contact: 'marketing@futeservices.com',
    href: 'mailto:marketing@futeservices.com',
  },
  {
    city: 'Prague',
    tag: 'Workshop',
    addr: 'Scale-model workshop and overnight render capacity.',
    contact: 'Directions',
    href: '/contact/',
  },
];

/** Outcome-led entry points. The brief's rule: lead with the objective. */
export const OBJECTIVES = [
  {
    name: 'Project launch',
    rec: 'Story DNA + CGI campaign + cinematic film + interactive project experience',
    href: '/solutions/#launch',
  },
  {
    name: 'Premium positioning',
    rec: 'Story strategy + premium CGI + cinematic storytelling + lifestyle visualisation',
    href: '/solutions/#luxury',
  },
  {
    name: 'Buyer engagement',
    rec: 'Interactive masterplan + 360° tours + view-from-unit + immersive experience',
    href: '/solutions/#conversion',
  },
  {
    name: 'Sales conversion',
    rec: 'Unit selector + floor-plan explorer + sales presentation platform + AI sales assistant',
    href: '/solutions/#conversion',
  },
  {
    name: 'Experience-centre transformation',
    rec: 'Interactive wall + real-time 3D + virtual tours + films + unit exploration',
    href: '/solutions/#experience-centre',
  },
  {
    name: 'Investor communication',
    rec: 'Masterplan imagery + aerial CGI + project film + interactive presentation',
    href: '/solutions/#launch',
  },
  {
    name: 'International marketing',
    rec: 'Virtual apartment + 360° environments + cloud sales experience + AI advisor',
    href: '/solutions/#luxury',
  },
];

export const PROCESS = [
  {
    title: 'Objective & brief',
    text: 'We start with the business objective, not the deliverable list. Drawings, materials, site context and launch date in one kick-off.',
  },
  {
    title: 'Build & composition',
    text: 'One source model for every family. Grey-scale camera options and interface wireframes come back for approval before anything is finished.',
  },
  {
    title: 'Art direction & look',
    text: 'Hour, weather, season and human life are directed. Materials are shaded against real samples, not guesses.',
  },
  {
    title: 'Grade, review & deploy',
    text: 'Two structured revision rounds, then delivery in every format the campaign needs — print, digital, gallery screen, headset.',
  },
];
