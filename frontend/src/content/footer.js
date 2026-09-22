/**
 * The footer.
 *
 * This is the only place on the site where a capability list appears as
 * a list. Services are evidence, not the pitch, so they sit here in
 * mono rather than in a grid of cards near the top.
 *
 * @type {import('./types.js').FooterContent}
 */
export const footer = {
  tagline: 'Technology that does the job it was bought to do.',
  capabilitiesHeading: 'What that usually involves',
  capabilities: [
    'Financial infrastructure',
    'Regulated workflows',
    'Systems integration',
    'Process automation',
    'Legacy migration',
    'Operational reporting',
    'Internal tools',
    'Data modelling',
    'API design',
    'Maintenance and handover',
  ],
  legal: `© ${new Date().getFullYear()} buildlyone`,
};

export default footer;
