import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  validateOrigin,
  checkBodySize,
  isValidEmail,
  capField,
  getClientIp,
} from "@/lib/security/api";
import { company } from "@/data/company";
import { sendEmail } from "@/lib/email/resend";
import {
  internalNotificationHtml,
  internalNotificationText,
  clientConfirmationHtml,
  clientConfirmationText,
  type ContactPayload,
} from "@/lib/email/templates";

const ALLOWED_ORIGINS = company.allowedOrigins;

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. CSRF — Origin validation
  const origin = req.headers.get("origin");
  if (!validateOrigin(origin, ALLOWED_ORIGINS)) {
    return NextResponse.json(
      { ok: false, error: "Forbidden origin" },
      { status: 403 }
    );
  }

  // 2. Body size limit (16 KB)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 16 * 1024) {
    return NextResponse.json(
      { ok: false, error: "Request body too large" },
      { status: 413 }
    );
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
  if (!checkBodySize(Buffer.byteLength(raw, "utf8"))) {
    return NextResponse.json(
      { ok: false, error: "Request body too large" },
      { status: 413 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  // 3. Rate limit — 5 per IP per hour
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rl.resetAt),
        },
      }
    );
  }

  // 4. Validate + cap fields
  const name = capField(String(body.name ?? "").trim());
  const email = capField(String(body.email ?? "").trim());
  const phone = capField(String(body.phone ?? "").trim());
  const requestType = capField(String(body.requestType ?? "new").trim());
  const projectType = capField(String(body.projectType ?? "").trim());
  const industry = capField(String(body.industry ?? "").trim());
  const budget = capField(String(body.budget ?? "").trim());
  const message = capField(String(body.message ?? "").trim());

  // Required field check
  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }
  if (!phone || phone.length < 5) {
    return NextResponse.json({ ok: false, error: "Phone is required" }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Message is too short" }, { status: 400 });
  }

  // 5. Build payload
  const payload: ContactPayload = {
    name,
    email,
    phone,
    requestType,
    projectType,
    industry,
    budget,
    message,
  };

  const meta = {
    ip,
    userAgent: req.headers.get("user-agent") ?? "unknown",
    receivedAt: new Date().toISOString(),
  };

  // 6. Send emails (don't fail the request if email fails — log only)
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_TO_EMAIL || company.email;

  const internalHtml = internalNotificationHtml(payload, meta);
  const internalText = internalNotificationText(payload);
  const clientHtml = clientConfirmationHtml(payload);
  const clientText = clientConfirmationText(payload);

  // Send internal notification
  const internalResult = await sendEmail({
    from: `MIT.egy Contact <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `[${requestType}] New inquiry from ${name}`,
    html: internalHtml,
    text: internalText,
  });

  // Send confirmation to client
  const clientResult = await sendEmail({
    from: `MIT.egy <${fromEmail}>`,
    to: email,
    subject: "We received your message — MIT.egy",
    html: clientHtml,
    text: clientText,
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("[contact] internal:", internalResult, "client:", clientResult);
  }

  if (!internalResult.ok && !clientResult.ok) {
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Message sent successfully",
      remaining: rl.remaining,
    },
    {
      status: 200,
      headers: {
        "X-RateLimit-Limit": "5",
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-RateLimit-Reset": String(rl.resetAt),
      },
    }
  );
}

// Explicitly disallow other methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
