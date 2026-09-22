/**
 * The engagement model.
 *
 * Real names are omitted until there is a complete, approved roster.
 * The page explains what the client can hold the engagement to rather
 * than publishing placeholders or implying a team that is not named.
 *
 * @type {import('./types.js').TeamContent}
 */
export const team = {
  kicker: 'How we engage',
  title: 'Direct access to the people doing the work.',
  lede: 'The engagement is structured to keep diagnosis, decisions, and implementation close together. Named team profiles can be added when they are ready to be published.',
  people: [],
  principles: [
    { id: 'e1', title: 'One accountable team', detail: 'The people diagnosing the problem remain involved in the build and handover.' },
    { id: 'e2', title: 'Decisions written down', detail: 'Important trade-offs, assumptions, and exclusions are recorded before they become code.' },
    { id: 'e3', title: 'A handover that works', detail: 'Access, documentation, and operating knowledge move to your team rather than staying with a supplier.' },
  ],
};

export default team;
