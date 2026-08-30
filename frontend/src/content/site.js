/**
 * Site-level identity and the hero.
 *
 * The brand name is always lowercase, including at the start of a
 * sentence. There is one primary action on this site and it is defined
 * here; every button that renders it reads it from this object.
 */
export const site = {
  name: 'buildlyone',
  url: 'https://buildlyone.com',
  email: 'hello@buildlyone.com',

  title: 'buildlyone — technology that does the job it was bought to do',
  positioning:
    'buildlyone is a software engineering practice for businesses whose systems have stopped keeping up with them. We diagnose before we build, and we publish the method.',

  primaryAction: { label: 'Start a conversation', href: '#start' },
  secondaryAction: { label: 'Read the method', href: '#method' },
};

/**
 * The hero.
 *
 * Rule one of the system: pain before philosophy. This states the
 * visitor's situation and names a villain. The worldview appears far
 * down the page as a signature, never here.
 *
 * No adjectives about ourselves, no mention of AI, no image.
 */
export const hero = {
  kicker: 'Software engineering for businesses',
  headline: 'The software runs. The business still waits.',
  body: [
    'Somewhere between the order coming in and the money arriving, a person is copying numbers between two screens, a spreadsheet is doing a job nobody chose for it, and a question that should take a second takes a phone call.',
    'That is not a software problem you can buy your way out of. It is a specific break in how work moves through your business, and it can be found.',
  ],
};

export default site;
