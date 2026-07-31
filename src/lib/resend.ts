// src/lib/resend.ts
// Email sending via Resend

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const TO   = 'bhuvaneshkalidasan2@gmail.com';

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `[Portfolio Contact] ${data.subject || 'New message from ' + data.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7C3AED;">New Contact Form Submission</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 100px;">From:</td>
              <td style="padding: 8px;">${data.name} &lt;${data.email}&gt;</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Subject:</td>
              <td style="padding: 8px;">${data.subject || '(no subject)'}</td>
            </tr>
          </table>
          <hr style="margin: 16px 0; border-color: #e2e8f0;" />
          <div style="white-space: pre-wrap; line-height: 1.6;">${data.message}</div>
          <hr style="margin: 16px 0; border-color: #e2e8f0;" />
          <p style="color: #94a3b8; font-size: 12px;">
            Sent via your portfolio contact form — bhuvanesh.dev
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error('Resend error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
