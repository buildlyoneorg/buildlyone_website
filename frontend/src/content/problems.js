/**
 * The four problems. This is the spine of the site: the nav, the section
 * order, and the method all hang off this array.
 *
 * Each problem runs the same four beats — pain, story, what we build,
 * how you would know it worked. The fourth beat is deliberately not
 * called proof: it is a measurement contract for work not yet done, not
 * a claim about work already delivered.
 *
 * @type {import('./types.js').Problem[]}
 */
export const problems = [
  {
    id: 'integration',
    number: '01',
    symptom: "Your systems don't talk to each other",
    villain: 'a spreadsheet that has quietly become the real database',

    signal: [
      'The same order is typed into two systems by two different people.',
      'A number is right in one place and wrong in another, and nobody can say which came first.',
      'Someone exports a CSV every morning so that a second system knows what the first one did.',
      'A member of staff is, in practice, the integration between two tools.',
      'When you need a figure that spans both systems, you ask a person rather than a screen.',
    ],
    priorityReason:
      'Re-keying is not a fixed cost. Every new system, product line, or member of staff adds another pair of things to keep in agreement, so the reconciliation work grows faster than the business does. The cost is rarely visible as a line item, because it is spread across people who are also doing other jobs.',

    story: {
      kind: 'illustrative',
      disclosure: 'Illustrative. A composite, not a client.',
      setting: 'A distributor running three warehouses and about forty staff',
      body: [
        'Orders arrive by phone, email, and a web form. They are entered into an accounting package. Stock lives in a separate warehouse system that the accounting package cannot see, so every morning someone exports yesterday’s orders and types them in again.',
        'It works. It has worked for six years. The person who does it knows which orders to skip, which customers use two different names, and which SKUs were entered wrong in 2021. None of that is written down.',
        'The cost is not the two hours a day. It is that nobody can answer "what do we actually have" without asking her, and she is the only one who can close the month.',
      ],
    },

    investigationQuestions: [
      'Which system is the one people trust when two disagree, and who decided that?',
      'What is copied by hand between systems, how often, and by whom?',
      'What does the person doing the copying know that is not written down anywhere?',
      'Which of these tools has an API, and which has only an export button?',
      'What breaks first when the person who does the reconciliation is on leave?',
      'Has anyone tried to connect these before, and what stopped them?',
    ],
    evidenceToGather: [
      'A list of every system that holds customer, order, or stock data.',
      'One real example of a record that exists in two places and disagrees.',
      'The export or report someone runs on a schedule to keep things in sync.',
    ],

    whatWeBuild: [
      {
        title: 'One system of record, with the others reading from it',
        detail:
          'We do not merge your tools. We decide which one is authoritative for each kind of data, and make that decision explicit in code rather than in someone’s head.',
        stack: ['Postgres', 'event log', 'idempotent sync workers'],
      },
      {
        title: 'Integrations that survive being wrong',
        detail:
          'Real integrations fail: a network drops, a field changes, a record arrives twice. We build for retry and reconciliation from the start, because the failure path is the part you will actually live with.',
        stack: ['queues', 'dead-letter handling', 'replay'],
      },
      {
        title: 'A reconciliation you can read',
        detail:
          'A page that shows what disagreed, when, and what was done about it. The point is that the answer stops living with one person.',
        stack: ['audit trail', 'diff view', 'alerting'],
      },
    ],

    metrics: [
      {
        name: 'Records re-keyed by hand each week',
        definition:
          'Count of records a person types into a second system after they already exist in a first.',
        howMeasured:
          'Counted by the team for one ordinary week before we start, then from the sync log afterwards.',
        baselineSource:
          'A manual tally over five working days. If nobody can produce it, that is itself the first finding.',
      },
      {
        name: 'Time to answer a question that spans two systems',
        definition:
          'Wall-clock time from asking for a cross-system figure to holding a number you would act on.',
        howMeasured: 'Timed on three real questions, before and after.',
        baselineSource: 'Whoever currently gets asked.',
      },
    ],

    avoid: [
      {
        statement: 'We will not replace all three systems at once.',
        reason:
          'A single cut-over puts every risk on one day, and the business still has to trade on that day.',
      },
      {
        statement: 'We will not build a sync that silently drops conflicts.',
        reason:
          'A conflict you cannot see is worse than the copying, because it removes the person who used to notice.',
      },
    ],

    relatedMethodSteps: ['1.0', '1.2', '2.1'],
  },

  {
    id: 'manual-work',
    number: '02',
    symptom: 'Your team does by hand what software should do',
    villain: 'a process that was documented once, in a person',

    signal: [
      'Someone spends the first hour of every day preparing the same report.',
      'A task is described as "just" something, and it takes a person half a day.',
      'When you hire, part of the job is the workaround rather than the work.',
      'The process lives in a spreadsheet with tabs nobody outside the team can read.',
      'Two people do the same job differently and both are correct.',
    ],
    priorityReason:
      'Manual work does not scale linearly with volume, because the errors scale too. Doubling the orders more than doubles the checking. Businesses usually notice this as "we need another person" rather than as a technology problem, which is why it goes unexamined for years.',

    story: {
      kind: 'illustrative',
      disclosure: 'Illustrative. A composite, not a client.',
      setting: 'A services firm invoicing about three hundred clients a month',
      body: [
        'Invoicing takes four days. Not because there are many invoices, but because each one is assembled from a timesheet, a rate card, and a set of exceptions that only two people know.',
        'They have tried to automate it twice. Both attempts failed at the exceptions, because the exceptions were the job. The spreadsheet came back within a month.',
        'The cost is four days of senior time, and an invoice run that cannot happen while either person is away.',
      ],
    },

    investigationQuestions: [
      'Walk us through the task as it is actually done, not as it is supposed to be done.',
      'Where do the exceptions come from, and are they real rules or accumulated habit?',
      'What has been automated before here, and why did people go back to the manual version?',
      'Which parts of this genuinely need a human judgement call?',
      'What would happen if this ran wrong for a week before anyone noticed?',
    ],
    evidenceToGather: [
      'A screen recording of someone doing the task once, end to end, at normal speed.',
      'The spreadsheet or document the process actually runs on.',
      'The last three things that went wrong, and what was done about them.',
    ],

    whatWeBuild: [
      {
        title: 'The rules, written down and executable',
        detail:
          'The exceptions are usually rules nobody has stated. We state them, in a form the business can read and change, before we automate anything.',
        stack: ['rules engine', 'versioned config', 'plain-language tests'],
      },
      {
        title: 'Automation with a human in the loop where it matters',
        detail:
          'The judgement calls stay with people. What goes is the assembly, the copying, and the checking that a computer is better at.',
        stack: ['job scheduler', 'approval queue', 'audit trail'],
      },
      {
        title: 'A version that fails loudly',
        detail:
          'If the automation cannot decide, it stops and asks, rather than guessing. Silent automation is how a manual process gets replaced by an invisible one.',
        stack: ['exception queue', 'alerting', 'run history'],
      },
    ],

    metrics: [
      {
        name: 'Hours per cycle spent on the task',
        definition:
          'Total person-hours across everyone who touches the task, per run, including checking and correction.',
        howMeasured: 'Timed across two full cycles before, and two after.',
        baselineSource:
          'The people who do it. Ask them to time it rather than estimate it; estimates run low.',
      },
      {
        name: 'Share of runs needing correction after the fact',
        definition: 'Runs where something had to be fixed after it was considered done.',
        howMeasured: 'Counted from the correction log, or created if there is not one.',
        baselineSource:
          'Usually unknown at the start. Establishing it is part of the work.',
      },
      {
        name: 'People who can run it alone',
        definition: 'Number of staff who can complete the task without asking anyone.',
        howMeasured: 'Counted. Not estimated.',
        baselineSource: 'Ask the team. The answer is often one.',
      },
    ],

    avoid: [
      {
        statement: 'We will not automate a process nobody can explain.',
        reason:
          'Encoding a process you do not understand makes it permanent and unreadable at the same time.',
      },
      {
        statement: 'We will not remove the human check on anything that moves money.',
        reason:
          'The saving is not worth the class of error it introduces, and you will not find out until it matters.',
      },
    ],

    relatedMethodSteps: ['1.1', '2.0', '2.2'],
  },

  {
    id: 'outgrown',
    number: '03',
    symptom: 'You have outgrown the tools you started the business on',
    villain: 'software that fitted the company you were five years ago',

    signal: [
      'You pay for seats, tiers, or add-ons to work around a limit rather than to use a feature.',
      'A tool that took an afternoon to set up now takes a specialist to change.',
      'You have started keeping the real numbers somewhere other than the system of record.',
      'New staff are trained on the workarounds before they are trained on the work.',
      'You have been told the fix is the enterprise plan, and it does not fix it.',
    ],
    priorityReason:
      'Outgrowing a tool is rarely a single event, so it rarely gets a decision. It shows up as a slow rise in workarounds until the workarounds are the system. The expensive part is not the migration; it is the years of decisions made around a constraint nobody re-examined.',

    story: {
      kind: 'illustrative',
      disclosure: 'Illustrative. A composite, not a client.',
      setting: 'A retailer that started on one off-the-shelf platform and now runs four',
      body: [
        'The original platform still runs the shop. It cannot handle their pricing, so pricing moved to a spreadsheet. It cannot handle their delivery zones, so a second tool was bought. Neither knows about the other.',
        'Every proposal to replace it has stalled on the same question: what happens to the eleven years of order history that only that system can read.',
        'The cost is that no one will make a pricing change on a Friday, because the reconciliation cannot be finished before the weekend.',
      ],
    },

    investigationQuestions: [
      'Which limit are you actually paying to work around, and what does that cost per year?',
      'What lives in the old system that exists nowhere else?',
      'What would have to be true for you to keep it another three years?',
      'Which constraints are the tool’s, and which have become yours by habit?',
      'Who decided the current setup, and are they still here to say why?',
      'What has to keep working, uninterrupted, during any change?',
    ],
    evidenceToGather: [
      'Twelve months of what you pay for every tool, including the add-ons bought to work around a limit.',
      'An export of the data you would be unable to reconstruct.',
      'The list of things staff have been told not to do because the system cannot cope.',
    ],

    whatWeBuild: [
      {
        title: 'A route off, taken in pieces',
        detail:
          'We move one capability at a time, with the old system still running, so there is never a day the business depends on a single cut-over succeeding.',
        stack: ['strangler pattern', 'read replicas', 'dual-write with reconciliation'],
      },
      {
        title: 'Your history, readable without the old tool',
        detail:
          'The data that only the legacy system understands gets exported, verified against the source, and made queryable on its own terms.',
        stack: ['schema mapping', 'verified export', 'archive store'],
      },
      {
        title: 'Only the parts you outgrew',
        detail:
          'Most of an off-the-shelf tool is usually fine. We replace the parts that constrain you and leave the rest, which is normally the cheapest defensible answer.',
        stack: ['integration layer', 'incremental cut-over'],
      },
    ],

    metrics: [
      {
        name: 'Annual spend on working around the limit',
        definition:
          'Licences, tiers, and add-ons bought to work around a constraint, plus staff time spent on the workaround.',
        howMeasured: 'From invoices, plus a timed sample of the manual work.',
        baselineSource: 'Twelve months of billing. Most businesses have not added this up.',
      },
      {
        name: 'Lead time for a routine change',
        definition:
          'Time from deciding to change something ordinary, such as a price or a delivery zone, to it being live and correct everywhere.',
        howMeasured: 'Measured on three real changes.',
        baselineSource: 'The team that makes the change.',
      },
    ],

    avoid: [
      {
        statement: 'We will not rebuild what the off-the-shelf tool already does well.',
        reason:
          'It is the most expensive way to arrive back where you started, and it is what we would be paid the most to do.',
      },
      {
        statement: 'We will not start a migration we cannot stop halfway.',
        reason:
          'If the plan has no safe abandonment point, the plan is a bet rather than a project.',
      },
    ],

    relatedMethodSteps: ['1.2', '2.1', '3.0'],
  },

  {
    id: 'visibility',
    number: '04',
    symptom: "You can't see what's actually happening in the business",
    villain: 'a dashboard that reports what is easy to count',

    signal: [
      'Two people produce two different numbers for the same question and both can defend theirs.',
      'The monthly figures arrive late enough that they describe a situation you can no longer act on.',
      'You know the revenue and not the margin, or the margin and not where it went.',
      'A decision gets made on the number someone happened to have.',
      'You have a dashboard and you still ring someone to find out what is going on.',
    ],
    priorityReason:
      'Bad visibility does not announce itself: the business keeps running, and every decision is simply made slightly blind. The compounding cost is a long series of small misallocations that nobody can attribute afterwards, because the data to attribute them was never kept.',

    story: {
      kind: 'illustrative',
      disclosure: 'Illustrative. A composite, not a client.',
      setting: 'A manufacturer with good accounts and no operational reporting',
      body: [
        'The accounts are accurate and thirty days late. They can tell you what a month cost after the month is over, which is enough for tax and not enough to run a line.',
        'Everyone knows which product is the busy one. Nobody knows which is the profitable one, because labour is booked in aggregate and never against a job.',
        'The cost is a product line that was expanded for two years on the strength of revenue, while its margin fell.',
      ],
    },

    investigationQuestions: [
      'What decision would you make differently if you had this number on time?',
      'Where does the number come from now, and how many hands does it pass through?',
      'What is being counted because it matters, and what because it is easy to count?',
      'What does the business already record that nobody looks at?',
      'When two figures disagree, whose is used, and why?',
    ],
    evidenceToGather: [
      'The report you actually make decisions on, as it was last sent.',
      'The question you asked in the last month that nobody could answer.',
      'A description of how the headline number is assembled, step by step.',
    ],

    whatWeBuild: [
      {
        title: 'Measurement at the point the thing happens',
        detail:
          'Most visibility problems are collection problems. If the event is not recorded when it occurs, no reporting layer can recover it later.',
        stack: ['event capture', 'job-level costing', 'validated inputs'],
      },
      {
        title: 'One definition per number',
        detail:
          'Every figure gets a written definition, an owner, and a stated refresh time. Disagreement is usually two correct answers to two different questions.',
        stack: ['metric registry', 'documented lineage'],
      },
      {
        title: 'Few numbers, on time',
        detail:
          'A small set of figures that arrive early enough to act on, rather than a wall of charts that arrives after the decision. We would rather ship six numbers you trust than sixty you skim.',
        stack: ['scheduled reporting', 'threshold alerts'],
      },
    ],

    metrics: [
      {
        name: 'Age of the number when you act on it',
        definition:
          'Time between the thing happening and the figure describing it reaching the person who decides.',
        howMeasured: 'Measured for the three figures that drive the most decisions.',
        baselineSource: 'Current reporting schedule.',
      },
      {
        name: 'Questions answerable without asking a person',
        definition:
          'From a fixed list of the business’s standing questions, how many can be answered from a system.',
        howMeasured: 'Agreed list, checked before and after.',
        baselineSource: 'Written at the start of the engagement.',
      },
    ],

    avoid: [
      {
        statement: 'We will not build a second dashboard.',
        reason:
          'If the first one is not used, another will not be either, and the reason is almost never the charts.',
      },
      {
        statement: 'We will not report a number we cannot trace to where it was recorded.',
        reason:
          'An untraceable figure gets defended rather than checked, and it will eventually be wrong.',
      },
    ],

    relatedMethodSteps: ['1.1', '2.2', '3.1'],
  },
];

export default problems;
