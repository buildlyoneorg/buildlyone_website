export const proposalMeta = {
  reference: 'BLD/OPS/0926',
  date: '22 September 2026',
  preparedFor: 'Client proposal',
  title: 'Operations visibility platform',
  summary:
    'A practical system for site inspections, goods movement, delivery proof, customer feedback, and management oversight.',
};

export const packages = {
  web: {
    id: 'web',
    label: 'Web MVP1',
    price: 8000000,
    description:
      'A responsive web application that works on computers, tablets, and phone browsers.',
    bestFor: 'The fastest, lower-cost way to test the full workflow with real users.',
    fieldExperience: 'Phone browser with camera, signature, and event-based GPS check-ins.',
    laterPrices: { mvp2: 12000000, mvp3: 16000000 },
    breakdown: [
      { label: 'Planning and workflow design', amount: 600000, note: 'Turn the current process into clear screens, roles, and approval steps.' },
      { label: 'User experience and interface design', amount: 900000, note: 'Design simple phone and desktop screens that field and office teams can use.' },
      { label: 'Field and business web application', amount: 1800000, note: 'Build the site inspection, goods, delivery, and feedback workflows.' },
      { label: 'Management dashboard', amount: 1400000, note: 'Give the office one place to monitor sites, issues, deliveries, and status.' },
      { label: 'Database and secure system', amount: 1500000, note: 'Store users, records, photos, signatures, and activity history safely.' },
      { label: 'GPS, signatures, and reports', amount: 700000, note: 'Confirm visits and deliveries, then produce clear printable reports.' },
      { label: 'Testing, launch, and training', amount: 600000, note: 'Test the agreed workflows, launch the system, and train key users.' },
      { label: 'Delivery contingency', amount: 500000, note: 'A controlled allowance for minor implementation issues within the agreed scope.' },
    ],
  },
  mobile: {
    id: 'mobile',
    label: 'Mobile MVP1',
    price: 10000000,
    description:
      'A dedicated field mobile application with a web dashboard for management.',
    bestFor: 'Teams that need a stronger field experience, offline support, and phone notifications.',
    fieldExperience: 'Dedicated mobile application plus a browser dashboard for office users.',
    laterPrices: { mvp2: 15000000, mvp3: 20000000 },
    breakdown: [
      { label: 'Planning and workflow design', amount: 700000, note: 'Turn the current process into clear screens, roles, and approval steps.' },
      { label: 'User experience and interface design', amount: 1100000, note: 'Design the mobile field journey and the office management experience.' },
      { label: 'Dedicated mobile application', amount: 2400000, note: 'Build the engineer and field-user application for day-to-day work.' },
      { label: 'Management web dashboard', amount: 1600000, note: 'Give the office one place to monitor sites, issues, deliveries, and status.' },
      { label: 'Database and secure system', amount: 1800000, note: 'Store users, records, photos, signatures, and activity history safely.' },
      { label: 'GPS, offline support, alerts, and reports', amount: 1100000, note: 'Improve field reliability and notify users when action is needed.' },
      { label: 'Testing, launch, and training', amount: 800000, note: 'Test field and office workflows, launch both products, and train key users.' },
      { label: 'Delivery contingency', amount: 500000, note: 'A controlled allowance for minor implementation issues within the agreed scope.' },
    ],
  },
};

export const scopeGroups = [
  {
    id: 'engineering',
    number: '01',
    label: 'Engineering operations',
    promise: 'Know who visited each site, what they found, who must act, and whether the work was completed.',
    capabilities: [
      ['Site and project records', 'Register each site, its location, responsible people, and current status.'],
      ['Engineer assignments', 'Send a named engineer to a named site with the purpose of the visit.'],
      ['Verified arrival', 'Capture arrival time, site coordinates, and the engineer’s digital signature.'],
      ['Inspection evidence', 'Record findings, severity, photos, notes, and the exact area affected.'],
      ['Recommendations', 'Direct each issue to the right discipline, engineer, contractor, or company.'],
      ['Follow-up and closure', 'Track open work until evidence is reviewed and an authorised person closes it.'],
      ['Reports', 'Print or export site visits, unresolved issues, and contractor responsibilities.'],
    ],
  },
  {
    id: 'business',
    number: '02',
    label: 'Business operations',
    promise: 'Know what was sent, who is responsible, whether it arrived, and the condition in which it was received.',
    capabilities: [
      ['Customers and goods', 'Keep a clear record of customers, products, quantities, and expected delivery.'],
      ['Delivery assignment', 'Assign a driver, traveller, or agent to a delivery.'],
      ['Status updates', 'Record dispatch, movement events, arrival, and completion.'],
      ['Delivery evidence', 'Capture destination coordinates, photos, condition, signature, and customer confirmation.'],
      ['Customer feedback', 'Record complaints, recommendations, and follow-up responsibility.'],
      ['Basic money records', 'Enter sales, expenses, currency, and a simple profit summary manually.'],
      ['Management view', 'See active work, delayed items, unresolved complaints, and recent activity.'],
    ],
  },
];

export const roadmap = [
  {
    id: 'mvp1',
    number: '01',
    label: 'MVP1',
    title: 'Make the work visible',
    description: 'The first release proves the two core workflows: engineering accountability and basic business tracking.',
    outcomes: ['Verified site visits', 'Findings and action tracking', 'Basic goods and delivery records', 'Management dashboard and reports'],
  },
  {
    id: 'mvp2',
    number: '02',
    label: 'MVP2',
    title: 'Coordinate movement at scale',
    description: 'The second release adds the operational depth needed for more people, routes, consignments, and incidents.',
    outcomes: ['Master trades and split consignments', 'Vehicles, vessels, agents, and route history', 'Incident, delay, loss, and damage management', 'Better alerts, offline use, and operational reporting'],
  },
  {
    id: 'mvp3',
    number: '03',
    label: 'MVP3',
    title: 'Connect money and compliance',
    description: 'The third release adds sensitive integrations only after the operational records are proven reliable.',
    outcomes: ['Verified digital payments', 'Multiple currencies and exchange-rate history', 'Profit by trade and consignment', 'Customs, insurance, compliance, and accounting connections'],
  },
];

export const exclusions = [
  'Continuous live vehicle tracking in the web MVP1',
  'Payment processing, wallets, or foreign-exchange services',
  'Customs clearance or automatic government submissions',
  'Full accounting, payroll, or inventory management',
  'Third-party charges for hosting, maps, SMS, email, payment providers, domains, or app stores',
  'New features introduced after the agreed MVP1 scope is signed off',
];

export const paymentMilestones = [
  { label: 'Start', percentage: 30, note: 'Scope confirmation and engagement start' },
  { label: 'Design approval', percentage: 30, note: 'Approved screens and working prototype' },
  { label: 'Build completion', percentage: 30, note: 'Agreed MVP1 features ready for acceptance testing' },
  { label: 'Launch', percentage: 10, note: 'Deployment, training, and handover' },
];
