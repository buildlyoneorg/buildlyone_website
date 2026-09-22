import { problems } from './problems.js';

/**
 * The method.
 *
 * buildlyone has no client work to show. That makes this section the
 * site's primary credibility instrument rather than a supporting
 * section: it is the one thing here that a firm without a method could
 * not produce, and that a firm with a bad method could not publish.
 *
 * It is published in full on the dedicated method page. A business
 * should be able to run steps 1.0 through 1.3 without us.
 *
 * @type {import('./types.js').Method}
 */
/** @type {import('./types.js').MethodStep[]} */
const methodSteps = [
    {
      id: '1.0',
      number: '1.0',
      title: 'Watch the work before discussing the software',
      statement:
        'We start by watching someone do the job, at normal speed, without commentary.',
      body: [
        'A described process and an observed process are different processes. The gap between them is where the workarounds live, and the workarounds are the most reliable evidence available about what the business actually values.',
      ],
      questions: [
        'Show us the task as it is really done, including the parts you would not put in a manual.',
        'What do you do when it goes wrong?',
        'What have you stopped trying to do because the system will not let you?',
      ],
      rulesOut: [
        'Problems that are described urgently but not performed daily.',
        'Requests that turn out to be one person’s preference rather than a constraint.',
      ],
      deliverable: 'Written observations, sent to you before we interpret them.',
      duration: 'Two to three days',
    },
    {
      id: '1.1',
      number: '1.1',
      title: 'Separate what is measured from what matters',
      statement:
        'We establish which numbers the business acts on and which it merely produces.',
      body: [
        'Most reporting reflects what was easy to collect at the time the system was bought. Before we can say anything about a constraint, we need to know which figures are trusted, who assembles them, and what they leave out.',
      ],
      questions: [
        'Which number would change a decision if it moved?',
        'When two figures disagree, whose is used?',
        'What does the business record that nobody looks at?',
      ],
      rulesOut: [
        'Reporting problems that are collection problems in disguise.',
      ],
      deliverable: 'A list of the standing questions and whether each is currently answerable.',
      duration: 'One to two days',
    },
    {
      id: '1.2',
      number: '1.2',
      title: 'Find the earliest break, not the loudest one',
      statement:
        'Where several things are wrong, we name the one that the others depend on.',
      body: [
        'Symptoms cluster downstream. A retention problem is often an activation problem; a reporting problem is often a data-capture problem; an integration problem is often a decision nobody made about which system is authoritative. Fixing the loudest symptom while the upstream cause stands produces work that has to be done twice.',
      ],
      rulesOut: [
        'Anything downstream of a break we have not fixed yet.',
      ],
      deliverable:
        'A named primary constraint, the alternatives we considered, and what would prove us wrong.',
      duration: 'Two days',
    },
    {
      id: '1.3',
      number: '1.3',
      title: 'Say what we do not know',
      statement:
        'Every finding is labelled as observed, inferred, or assumed, and we do not upgrade one to another.',
      body: [
        'A diagnosis with no stated uncertainty is a sales document. If the evidence supports two explanations, you get both, with what it would take to separate them.',
      ],
      deliverable: 'The diagnosis, with confidence stated per finding.',
    },
    {
      id: '2.0',
      number: '2.0',
      title: 'Write the rules down before automating them',
      statement:
        'Nothing gets encoded until the business can read it back and disagree with it.',
      body: [
        'The exceptions are usually rules nobody has ever stated. Encoding a process you do not understand makes it permanent and unreadable in the same move, and the next person will build a spreadsheet beside it.',
      ],
      deliverable: 'The rules, in plain language, signed off before any code.',
    },
    {
      id: '2.1',
      number: '2.1',
      title: 'Build the failure path first',
      statement:
        'We build what happens when it goes wrong before we build what happens when it goes right.',
      body: [
        'Retries, conflicts, duplicates, and the case where a person has to intervene. The happy path is the part you demo; the failure path is the part you live with, and it decides whether anyone trusts the system in a year.',
      ],
      deliverable: 'Failure handling, visible and testable, in the first working version.',
    },
    {
      id: '2.2',
      number: '2.2',
      title: 'Ship in pieces that can be stopped',
      statement:
        'Every stage leaves the business working, and every plan has a point where it can be abandoned without loss.',
      body: [
        'A plan with no safe abandonment point is a bet, not a project. We do not schedule a single cut-over that the business has to trade through.',
      ],
      deliverable: 'A sequence with a stated stopping point at each stage.',
    },
    {
      id: '3.0',
      number: '3.0',
      title: 'Measure against the baseline we took at the start',
      statement:
        'The numbers we agreed to move are measured the same way afterwards, including when they did not move.',
      body: [
        'This is why the baseline is taken before the work rather than reconstructed after it. A baseline assembled at the end is an argument, not a measurement.',
      ],
      deliverable: 'The before and after figures, with the method stated.',
    },
    {
      id: '3.1',
      number: '3.1',
      title: 'Hand over so that we are not needed',
      statement:
        'Documentation, access, and a working understanding go to your team, whether or not we continue.',
      body: [
        'A system only one supplier can change is a liability you are paying for. We would rather be re-hired than depended on.',
      ],
      deliverable: 'Runbook, architecture notes, and a walkthrough with whoever will maintain it.',
    },
    {
      id: '4.0',
      number: '4.0',
      title: 'Publish only what can be checked',
      statement:
        'We do not present borrowed logos, anonymous praise, or vague project descriptions as proof.',
      body: [
        'Client work appears only with permission and with our specific role stated. Until then, illustrative stories remain labelled as composites, and every published number must be traceable to something a reader can inspect.',
      ],
    },
];

/**
 * Global refusals. Per-problem refusals live on Problem.avoid.
 * A refusal that costs nothing is marketing; each of these should be
 * something a less careful firm would happily take money for.
 *
 * @type {import('./types.js').Refusal[]}
 */
const globalRefusals = [
    {
      statement: 'We will not quote a build from a brief alone.',
      reason:
        'A number produced before the diagnosis is a guess wearing a suit, and it is the client who carries it.',
    },
    {
      statement: 'We will not take an engagement where the constraint is not technical.',
      reason:
        'If the answer is a process change or a hire, software will make it more expensive and harder to reverse. We will say so and decline the work.',
    },
];

export const method = {
  manifesto: {
    kicker: 'The method',
    statement: [
      'Most technology work fails before anyone writes code, at the point where a symptom is mistaken for a cause.',
      'A business says it needs a dashboard. What it needs is for two systems to stop disagreeing. It says it needs to automate invoicing. What it needs is for the exceptions to be written down. The prescription is confidently wrong, the build is competent, and the money is spent correctly on the wrong thing.',
      'So we diagnose first, in the open, and we tell you what we ruled out. If the honest answer is that you should fix a process rather than buy software, that is the answer you get.',
    ],
  },

  /**
   * Countable inputs in place of client counts.
   *
   * Hard constraint: every number here must be verifiable by counting
   * things on this page. They are therefore DERIVED from the content
   * rather than typed, so a claim cannot drift away from the thing it
   * describes. If you add a question, the number goes up by itself.
   */
  get stats() {
    const problemQuestions = problems.reduce((n, p) => n + p.investigationQuestions.length, 0);
    const stepQuestions = methodSteps.reduce((n, s) => n + (s.questions?.length ?? 0), 0);
    const artefacts = problems.reduce((n, p) => n + p.evidenceToGather.length, 0);
    const refusals = problems.reduce((n, p) => n + p.avoid.length, 0) + globalRefusals.length;

    return [
      {
        value: String(problemQuestions + stepQuestions),
        label: 'questions we ask before quoting',
        verifiableBy: `${problemQuestions} across the four problem pages, ${stepQuestions} in the steps below. Count them.`,
      },
      {
        value: String(artefacts),
        label: 'artefacts we ask you to gather',
        verifiableBy: 'Listed in full under each problem above.',
      },
      {
        value: String(refusals),
        label: 'things we refuse to build',
        verifiableBy: 'Two under each problem above, two at the end of this section.',
      },
    ];
  },

  steps: methodSteps,

  refusals: globalRefusals,

  homepageRefusals: [
    problems[0].avoid[0],
    problems[1].avoid[0],
    problems[3].avoid[0],
    globalRefusals[0],
  ],
};

export default method;
