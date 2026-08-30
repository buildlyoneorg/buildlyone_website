/**
 * The intake form.
 *
 * Field names are the wire contract with /api/send and must stay in
 * step with it. The response promise renders both here and in the
 * confirmation email, from this one constant — so it can only be
 * changed in one place.
 *
 * @type {import('./types.js').IntakeContent}
 */

/** TK — CONFIRM. Rendered on the page and in the confirmation email.
 *  Unresponsiveness is the second most common reason buyers rule a
 *  supplier out, so this must be a promise that will actually be kept. */
export const responsePromise = 'We reply within two working days, to every enquiry, from a person.';

export const intake = {
  kicker: 'Start',
  title: 'Tell us what is not working.',
  lede: 'Not a brief, and not a specification. Describe the thing that is going wrong in your business, in your own words. If we think the answer is not software, we will tell you that instead.',

  responsePromise,
  whatHappensNext: [
    'A person reads it. Not a form router.',
    'If it is not a fit, we say so, and say why.',
    'If it is, we propose a call to work out whether a diagnosis is worth doing.',
  ],

  fields: [
    {
      name: 'client_name',
      label: 'Your name',
      type: 'text',
      required: true,
      maxLength: 120,
      autoComplete: 'name',
    },
    {
      name: 'client_email',
      label: 'Email',
      type: 'email',
      required: true,
      maxLength: 200,
      autoComplete: 'email',
    },
    {
      name: 'company_name',
      label: 'Business',
      type: 'text',
      required: false,
      maxLength: 160,
      autoComplete: 'organization',
    },
    {
      name: 'project_description',
      label: 'What is not working',
      type: 'textarea',
      required: true,
      hint: 'The symptom, not the solution. What happens, how often, and who it lands on.',
      maxLength: 4000,
    },
  ],

  submitLabel: 'Send',
  submitPendingLabel: 'Sending',

  successMessage:
    'Received. ' + responsePromise,
  errorMessage:
    'Something in that did not go through. Check the required fields and try again.',
  // Must never claim the submission was stored. It was not.
  offlineMessage:
    'We could not reach the server, so this was not sent. Please email us directly instead.',

  fallbackEmail: 'hello@buildlyone.com',
  privacyNote:
    'What you send reaches us by email and is used to answer you. It is not added to a mailing list and is not shared.',
};

export default intake;
