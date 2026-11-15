// Resend email client wrapper
import { Resend } from "resend";

let cachedClient: Resend | null = null;

export function getResendClient(): Resend | null {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_xxx") || apiKey === "re_placeholder") {
    // No real API key — return null so callers fall back to dev simulation
    if (process.env.NODE_ENV === "production") {
      console.error("[resend] Missing or placeholder RESEND_API_KEY in production");
    }
    return null;
  }
  cachedClient = new Resend(apiKey);
  return cachedClient;
}

export interface SendEmailParams {
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<{ ok: boolean; id?: string; error?: string }> {
  const client = getResendClient();
  if (!client) {
    // In development without API key, simulate success
    if (process.env.NODE_ENV !== "production") {
      console.log("[resend] (dev mode) Would send:", params.subject, "to", params.to);
      return { ok: true, id: "dev-mode-simulated" };
    }
    return { ok: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await client.emails.send({
      from: params.from,
      to: params.to,
      replyTo: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true, id: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { ok: false, error: msg };
  }
}
