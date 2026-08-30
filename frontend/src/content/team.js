/**
 * The team.
 *
 * Named, roles only — no project histories, no outbound links. That is
 * a deliberate choice and it is worth knowing what it costs: team
 * expertise is the factor buyers weigh most heavily when choosing a
 * firm, and they typically verify it across several independent
 * sources. A name with nothing checkable behind it does less work than
 * it looks like it does. Revisit if enquiries stall here.
 *
 * @type {import('./types.js').TeamContent}
 */
export const team = {
  kicker: 'Who we are',
  title: 'A small practice, named.',
  lede: 'The people who do the diagnosis are the people who do the build. There is no account layer between you and the person writing the code.',

  // TK — REPLACE BEFORE LAUNCH. These are placeholders, not people.
  // Real names and roles required; `npm run check:content` fails while
  // any TK marker survives.
  people: [
    { id: 'p1', name: 'TK Name', role: 'TK Role', focus: 'TK — six to twelve words on discipline.' },
    { id: 'p2', name: 'TK Name', role: 'TK Role', focus: 'TK — six to twelve words on discipline.' },
  ],
};

export default team;
