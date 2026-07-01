import { Resend } from 'resend';

// Initialize Resend client with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Add CORS headers for local cross-origin development calls
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { client_name, client_email, company_name, project_description } = req.body;

    // Validation
    if (!client_name || !client_email || !project_description) {
      return res.status(400).json({ error: 'Missing required parameters: client_name, client_email, and project_description are mandatory.' });
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'notification@buildlyone.com';

    // 1. Send internal notification email to buildlyone team
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'buildlyone Alerts <onboarding@resend.dev>',
      to: notificationEmail,
      subject: `New Client Brief: ${client_name} - ${company_name || 'Individual'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eeeeee;">
          <h2 style="border-bottom: 1px solid #cccccc; padding-bottom: 10px; color: #0d0d0d;">New Client Brief Received</h2>
          <p><strong>Name:</strong> ${client_name}</p>
          <p><strong>Email:</strong> ${client_email}</p>
          <p><strong>Company:</strong> ${company_name || 'N/A'}</p>
          <p><strong>Brief Details:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #0d0d0d; margin: 20px 0; font-size: 1rem; line-height: 1.6;">
            ${project_description.replace(/\n/g, '<br>')}
          </blockquote>
        </div>
      `
    });

    if (adminError) {
      console.error("Resend Admin Notification Error:", adminError);
      return res.status(400).json({ error: adminError.message });
    }

    // 2. Send confirmation receipt to client (matching brand style: dark background, bone typography, Cormorant/Georgia headers)
    const { error: clientError } = await resend.emails.send({
      from: 'buildlyone <onboarding@resend.dev>',
      to: client_email,
      subject: 'We have received your brief — buildlyone',
      html: `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>buildlyone</title>
            <style>
              body {
                background-color: #0D0D0D;
                color: #E8E4DC;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                margin: 0;
                padding: 40px 20px;
                text-align: left;
              }
              .container {
                max-width: 500px;
                margin: 0 auto;
                border: 1px solid #222222;
                padding: 40px;
                background-color: #0D0D0D;
              }
              h1 {
                font-family: Georgia, serif;
                font-size: 2.2rem;
                font-weight: 400;
                color: #E8E4DC;
                margin-top: 0;
                margin-bottom: 24px;
                border-bottom: 1px solid #222222;
                padding-bottom: 20px;
              }
              p {
                font-size: 1rem;
                line-height: 1.6;
                color: #888888;
                margin-bottom: 24px;
              }
              .footer {
                margin-top: 40px;
                border-top: 1px solid #222222;
                padding-top: 20px;
                font-size: 0.8rem;
                color: #888888;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>buildlyone</h1>
              <p>We have received your brief, and our engineering team is reviewing it.</p>
              <p>Because of our commitment to excellence, we limit our active engagements to three to five per quarter. We evaluate every project before accepting it, ensuring that we only take on what we can do well.</p>
              <p>A senior engineer will contact you within 48 hours to discuss your system requirements, operational constraints, and the consequences of failure.</p>
              <div class="footer">
                buildlyone &middot; Lagos &middot; London &middot; Global
              </div>
            </div>
          </body>
        </html>
      `
    });

    if (clientError) {
      console.warn("Resend Client Confirmation Email Warning:", clientError);
    }

    return res.status(200).json({ success: true, data: adminData });
  } catch (err) {
    console.error("Serverless Function Internal Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
