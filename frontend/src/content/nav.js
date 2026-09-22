import { problems } from './problems.js';
import { site } from './site.js';

/**
 * Navigation.
 *
 * The problems are the primary nav. Services and work are not in it at
 * all: the nav is the one piece of a site that cannot hide behind
 * copywriting, so a nav reading Services / Work / About describes a
 * firm-first site no matter what the hero says.
 *
 * Problem anchors are derived from the problems array, so a fifth
 * problem cannot silently miss the nav.
 */
export const nav = {
  items: [
    { label: 'Problems', href: '/#problems' },
    { label: 'Method', href: '/method' },
    { label: 'How we engage', href: '/#engagement' },
  ],
  problemLinks: problems.map((p) => ({
    label: p.symptom,
    href: `/problems/${p.id}`,
    number: p.number,
  })),
  action: site.primaryAction,
};

export default nav;
