// Security utilities for API routes

const MAX_BODY_BYTES = 16 * 1024; // 16 KB
const MAX_FIELD_BYTES = 2 * 1024; // 2 KB per field
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 requests per IP per hour

// In-memory rate limiter
interface RateBucket {
  count: number;
  resetAt: number;
}
const rateBuckets = new Map<string, RateBucket>();

export function checkRateLimit(ip: string): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  bucket.count += 1;
  if (bucket.count > RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }
  return {
    ok: true,
    remaining: RATE_LIMIT_MAX - bucket.count,
    resetAt: bucket.resetAt,
  };
}

// Prune expired buckets periodically (lazy)
setInterval(() => {
  const now = Date.now();
  for (const [ip, b] of rateBuckets.entries()) {
    if (b.resetAt < now) rateBuckets.delete(ip);
  }
}, 60 * 1000).unref?.();

// CSRF: validate Origin against allowed list
export function validateOrigin(origin: string | null, allowed: readonly string[]): boolean {
  if (!origin) return false;
  try {
    return allowed.includes(origin);
  } catch {
    return false;
  }
}

// Body size check
export function checkBodySize(size: number): boolean {
  return size <= MAX_BODY_BYTES;
}

// Email regex (RFC-ish)
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export function isValidEmail(email: string): boolean {
  if (email.length > MAX_FIELD_BYTES) return false;
  return EMAIL_RE.test(email);
}

// Field cap: returns truncated string if too long
export function capField(value: string): string {
  if (value.length > MAX_FIELD_BYTES) {
    return value.slice(0, MAX_FIELD_BYTES);
  }
  return value;
}

// HTML escape for safe embedding in email templates
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Get client IP from Next.js request headers
export function getClientIp(req: Request): string {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export const SECURITY_LIMITS = {
  MAX_BODY_BYTES,
  MAX_FIELD_BYTES,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
};
