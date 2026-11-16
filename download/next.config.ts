import type { NextConfig } from "next";

// Production-grade strict security headers.
// Applied only in production builds — dev mode needs `unsafe-eval` for React DevTools.
const productionHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors *",
  },
];

// Dev-mode headers: relaxed CSP to allow eval (React DevTools / HMR) + cross-origin for preview proxies.
const devHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: ws: wss:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https: ws: wss:; object-src 'none'; frame-ancestors *",
  },
];

const isDev = process.env.NODE_ENV !== "production";
// Standalone output is only needed for self-hosting (Docker/VPS). On Vercel and
// similar managed platforms it is unnecessary and can confuse the build pipeline.
const isStandalone = process.env.STANDALONE === "true";

const nextConfig: NextConfig = {
  ...(isStandalone ? { output: "standalone" as const } : {}),
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: ["*.space-z.ai", "*.chatglm.cn", "*.vercel.app", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: isDev ? devHeaders : productionHeaders,
      },
    ];
  },
};

export default nextConfig;
