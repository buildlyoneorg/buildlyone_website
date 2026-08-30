/**
 * Content barrel, and the ordered section manifest.
 *
 * App.jsx renders by iterating `sections` rather than hardcoding the
 * page, so reordering the site is a one-line edit here.
 *
 * `surface` drives the sectional invert: Section writes it as
 * data-surface, and the token layer remaps colour from there. No
 * component needs to know which surface it is on.
 */
export { site, hero } from './site.js';
export { nav } from './nav.js';
export { problems } from './problems.js';
export { method } from './method.js';
export { team } from './team.js';
export { intake, responsePromise } from './intake.js';
export { footer } from './footer.js';

export const sections = [
  { id: 'hero', component: 'Hero', surface: 'ink' },
  { id: 'problems', component: 'ProblemIndex', surface: 'paper' },
  { id: 'problem-detail', component: 'ProblemDetail', surface: 'paper', repeatOver: 'problems' },
  { id: 'method', component: 'Method', surface: 'paper' },
  { id: 'refusals', component: 'RefusalList', surface: 'paper' },
  { id: 'team', component: 'Team', surface: 'paper' },
  { id: 'start', component: 'Intake', surface: 'paper' },
];
