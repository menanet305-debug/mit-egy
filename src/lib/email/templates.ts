// Email templates for Resend
import { escapeHtml } from "@/lib/security/api";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  requestType: string;
  projectType?: string;
  industry?: string;
  budget?: string;
  message: string;
}

// Internal notification email — sent to the company
export function internalNotificationHtml(p: ContactPayload, meta: { ip: string; userAgent: string; receivedAt: string }): string {
  const safe = (v: string | undefined) => escapeHtml(v ?? "—");
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background-color:#1a2b4c;padding:24px 32px;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#c29a59;">
                    MIT<span style="color:#ffffff;">.egy</span>
                  </td>
                </tr>
                <tr>
                  <td style="color:#ffffff;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;opacity:0.7;padding-top:4px;">
                    New Contact Form Submission
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px 32px;">
              <h2 style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:18px;color:#1a2b4c;">Client Information</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                <tr><td style="padding:6px 0;color:#6b6b6b;width:130px;">Name</td><td style="padding:6px 0;font-weight:600;">${safe(p.name)}</td></tr>
                <tr><td style="padding:6px 0;color:#6b6b6b;">Email</td><td style="padding:6px 0;"><a href="mailto:${safe(p.email)}" style="color:#1a2b4c;font-weight:600;text-decoration:none;">${safe(p.email)}</a></td></tr>
                <tr><td style="padding:6px 0;color:#6b6b6b;">Phone</td><td style="padding:6px 0;font-weight:600;">${safe(p.phone)}</td></tr>
              </table>

              <h2 style="margin:24px 0 16px 0;font-family:Georgia,serif;font-size:18px;color:#1a2b4c;">Request Details</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                <tr><td style="padding:6px 0;color:#6b6b6b;width:130px;">Request Type</td><td style="padding:6px 0;font-weight:600;">${safe(p.requestType)}</td></tr>
                <tr><td style="padding:6px 0;color:#6b6b6b;">Project Type</td><td style="padding:6px 0;">${safe(p.projectType)}</td></tr>
                <tr><td style="padding:6px 0;color:#6b6b6b;">Industry</td><td style="padding:6px 0;">${safe(p.industry)}</td></tr>
                <tr><td style="padding:6px 0;color:#6b6b6b;">Budget</td><td style="padding:6px 0;">${safe(p.budget)}</td></tr>
              </table>

              <h2 style="margin:24px 0 16px 0;font-family:Georgia,serif;font-size:18px;color:#1a2b4c;">Message</h2>
              <div style="background-color:#f5f5f5;border-left:3px solid #c29a59;padding:14px 16px;border-radius:6px;font-size:14px;line-height:1.6;white-space:pre-wrap;">${safe(p.message)}</div>

              <h2 style="margin:24px 0 16px 0;font-family:Georgia,serif;font-size:18px;color:#1a2b4c;">Notes</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:12px;color:#6b6b6b;">
                <tr><td style="padding:4px 0;width:130px;">Received at</td><td style="padding:4px 0;">${escapeHtml(meta.receivedAt)}</td></tr>
                <tr><td style="padding:4px 0;">Source IP</td><td style="padding:4px 0;">${escapeHtml(meta.ip)}</td></tr>
                <tr><td style="padding:4px 0;">User-Agent</td><td style="padding:4px 0;">${escapeHtml((meta.userAgent || "").slice(0, 200))}</td></tr>
              </table>

              <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e5e5;">
                <p style="margin:0;font-size:12px;color:#6b6b6b;">Reply directly to this email to respond to the client.</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1a2b4c;padding:16px 32px;">
              <p style="margin:0;color:#ffffff;font-size:12px;opacity:0.7;">
                © ${new Date().getFullYear()} MIT.egy · Miser Info Technology
              </p>
              <p style="margin:4px 0 0 0;color:#c29a59;font-size:11px;">
                Cairo, Egypt · menanet305@gmail.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Auto-confirmation email — sent to the client
export function clientConfirmationHtml(p: ContactPayload): string {
  const safe = (v: string | undefined) => escapeHtml(v ?? "");
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Thank you for contacting MIT.egy</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:#1a2b4c;padding:24px 32px;text-align:center;">
              <div style="font-family:Georgia,serif;font-size:24px;font-weight:700;color:#c29a59;">
                MIT<span style="color:#ffffff;">.egy</span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 12px 0;font-family:Georgia,serif;font-size:22px;color:#1a2b4c;">Thank you, ${safe(p.name.split(" ")[0])}!</h1>
              <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#1a1a1a;">
                We've received your message and one of our team members will get back to you within 24 hours.
              </p>
              <div style="background-color:#f5f5f5;border-radius:8px;padding:16px;margin:16px 0;">
                <p style="margin:0 0 8px 0;font-size:12px;color:#6b6b6b;text-transform:uppercase;letter-spacing:0.5px;">Your submission</p>
                <p style="margin:0;font-size:14px;color:#1a1a1a;line-height:1.6;white-space:pre-wrap;">${safe(p.message.slice(0, 500))}${p.message.length > 500 ? "…" : ""}</p>
              </div>
              <h2 style="margin:24px 0 8px 0;font-family:Georgia,serif;font-size:16px;color:#1a2b4c;">Need to talk now?</h2>
              <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;">
                <a href="mailto:menanet305@gmail.com" style="color:#1a2b4c;">menanet305@gmail.com</a><br />
                <a href="tel:+201005771268" style="color:#1a2b4c;">+20 100 577 1268</a><br />
                <a href="https://wa.me/201005771268" style="color:#1a2b4c;">WhatsApp us</a>
              </p>
              <p style="margin:16px 0 0 0;font-size:12px;color:#6b6b6b;line-height:1.6;">
                Working hours: Monday – Friday, 10:00 – 18:00 (EET)<br />
                Cairo, Egypt
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#1a2b4c;padding:16px 32px;">
              <p style="margin:0;color:#ffffff;font-size:11px;opacity:0.7;text-align:center;">
                © ${new Date().getFullYear()} MIT.egy · Miser Info Technology. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Plain-text fallback
export function internalNotificationText(p: ContactPayload): string {
  return `New Contact Form Submission — MIT.egy

Name: ${p.name}
Email: ${p.email}
Phone: ${p.phone}

Request Type: ${p.requestType}
Project Type: ${p.projectType || "—"}
Industry: ${p.industry || "—"}
Budget: ${p.budget || "—"}

Message:
${p.message}

---
This message was sent from the contact form on mit-egy.vercel.app
`;
}

export function clientConfirmationText(p: ContactPayload): string {
  return `Hi ${p.name.split(" ")[0]},

Thank you for contacting MIT.egy. We've received your message and will respond within 24 hours.

If you'd like to reach us sooner:
- Email: menanet305@gmail.com
- Phone: +20 100 577 1268
- WhatsApp: https://wa.me/201005771268

Working hours: Monday – Friday, 10:00 – 18:00 (EET)

Best regards,
The MIT.egy Team
`;
}
