import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Origins allowed to POST here.
 *
 * The previous version sent `Access-Control-Allow-Origin: *` together
 * with `Access-Control-Allow-Credentials: true`. That pair is invalid —
 * browsers reject it — and the wildcard was pointless anyway, since the
 * form is served from the same origin as this function. Credentials are
 * not used at all, so the header is gone rather than loosened.
 */
const ALLOWED_ORIGINS = [
  'https://buildlyone.com',
  'https://www.buildlyone.com',
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.NODE_ENV !== 'production'
    ? ['http://localhost:5173', 'http://localhost:3000']
    : []),
];

/** Field limits mirror the maxLength values in src/content/intake.js. */
const LIMITS = {
  client_name: 120,
  client_email: 200,
  company_name: 160,
  project_description: 4000,
};

/**
 * The previous version interpolated project_description straight into an
 * HTML email with only a newline replacement. Anything a stranger typed
 * into the form ran as markup in our inbox.
 */
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

/**
 * Kept in step with `responsePromise` in src/content/intake.js. The page
 * and the confirmation email must not be able to disagree about this.
 */
const RESPONSE_PROMISE =
  'We reply within two working days, to every enquiry, from a person.';

export default function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // A cross-origin POST from anywhere not on the list is refused.
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  return send(req, res);
}

async function send(req, res) {
  try {
    const body = req.body ?? {};
    const {
      client_name = '',
      client_email = '',
      company_name = '',
      project_description = '',
      company_website = '', // honeypot
    } = body;

    // A bot fills every field it finds. Accept and discard, so it does
    // not learn that the trap exists.
    if (String(company_website).trim()) {
      return res.status(200).json({ success: true });
    }

    const name = String(client_name).trim();
    const email = String(client_email).trim();
    const company = String(company_name).trim();
    const description = String(project_description).trim();

    if (!name || !email || !description) {
      return res.status(400).json({
        error: 'Your name, email, and a description of what is not working are all needed.',
      });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ error: 'That email address does not look right.' });
    }
    for (const [field, max] of Object.entries(LIMITS)) {
      if (String(body[field] ?? '').length > max) {
        return res.status(400).json({ error: `${field} is longer than ${max} characters.` });
      }
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hello@buildlyone.com';
    const fromAddress = process.env.MAIL_FROM || 'buildlyone <hello@buildlyone.com>';

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: notificationEmail,
      replyTo: email,
      subject: `Enquiry — ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Business: ${company || '—'}`,
        '',
        'What is not working:',
        description,
      ].join('\n'),
      html:
        `<p><strong>Name</strong> ${escapeHtml(name)}<br>` +
        `<strong>Email</strong> ${escapeHtml(email)}<br>` +
        `<strong>Business</strong> ${escapeHtml(company || '—')}</p>` +
        `<p><strong>What is not working</strong></p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(description)}</p>`,
    });

    if (error) {
      console.error('Resend notification error:', error);
      return res.status(502).json({ error: 'We could not send that. Please email us directly.' });
    }

    // Confirmation to the sender. Plain text: it is three sentences, and
    // an HTML restatement of the brand here was a third copy of the
    // design to keep in step with the site.
    const { error: confirmError } = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: notificationEmail,
      subject: 'We have your message — buildlyone',
      text: [
        `Thanks ${name}.`,
        '',
        RESPONSE_PROMISE,
        '',
        'If it turns out the answer is not software, we will tell you that too.',
        '',
        'buildlyone',
      ].join('\n'),
    });

    if (confirmError) console.warn('Resend confirmation warning:', confirmError);

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('send handler error:', err);
    return res.status(500).json({ error: 'Something went wrong on our end.' });
  }
}
