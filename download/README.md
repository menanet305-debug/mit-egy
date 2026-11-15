# MIT.egy — Web Development & Software Engineering Studio

> Full-stack Next.js 16 + TypeScript + Tailwind CSS 4 website for **MIT.egy** (Miser Info Technology), a Cairo-based software engineering studio. Multilingual (EN/AR/FR), with a chatbot, contact-form pipeline (Resend), full SEO, and production-grade security.

![MIT.egy](public/logo.svg)

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Pages & Routes](#pages--routes)
7. [Internationalization (i18n)](#internationalization-i18n)
8. [Chatbot](#chatbot)
9. [Contact Pipeline & Email](#contact-pipeline--email)
10. [Security](#security)
11. [SEO](#seo)
12. [Deployment (Vercel)](#deployment-vercel)
13. [Scripts](#scripts)
14. [Health Check](#health-check)
15. [License](#license)

---

## Overview

- **Brand:** MIT.egy — Miser Info Technology
- **Activity:** Web development, mobile apps, e-commerce, SaaS engineering, UI/UX, DevOps
- **Founded:** 2020
- **HQ:** Smart Village, Cairo, Egypt
- **Demo content:** 30 sample projects, 4 blog posts, 6 testimonials, 8 team members, 10 FAQ entries

## Tech Stack

| Concern         | Technology                                   |
| --------------- | -------------------------------------------- |
| Framework       | Next.js 16 (App Router, output: standalone)  |
| Language        | TypeScript 5 (strict)                        |
| Styling         | Tailwind CSS 4 + shadcn/ui (New York)        |
| Fonts           | Cairo (body) + Playfair Display (headings), self-hosted via `next/font/google` (preload=true) |
| Animations      | Pure CSS only (no framer-motion)             |
| Icons           | `lucide-react`                               |
| Email           | Resend SDK                                   |
| Maps            | Google Maps Embed (iframe, no API key)       |
| Images          | Next.js Image Optimization (WebP/AVIF, lazy) |
| Deployment      | Vercel (auto-deploy from GitHub)             |
| Security        | CSRF, rate limit, body size, email validation, HTML escape |

### Brand colors

| Token             | Hex       |
| ----------------- | --------- |
| Primary (navy)    | `#1a2b4c` |
| Accent (gold)     | `#c29a59` |
| Background        | `#ffffff` |
| Background alt    | `#f5f5f5` |
| Text              | `#1a1a1a` |
| Text muted        | `#6b6b6b` |
| Success (green)   | `#2d7d46` |
| Warning (orange)  | `#e8833a` |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts + metadata
│   ├── page.tsx                # Home page
│   ├── globals.css             # Tailwind + brand colors + animations
│   ├── projects/
│   │   ├── page.tsx            # Projects listing with filters
│   │   └── [id]/page.tsx       # Project detail page
│   ├── services/page.tsx
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx
│   ├── api/contact/route.ts    # POST endpoint (secured)
│   ├── sitemap.xml/route.ts    # Auto sitemap
│   └── robots.txt/route.ts     # Auto robots.txt
├── components/
│   ├── shared/                 # Header, Footer, Chatbot, JsonLd, etc.
│   ├── sections/               # Hero, Stats, ProjectCard, Testimonials...
│   └── ui/                     # shadcn/ui components
├── data/
│   ├── projects.ts             # 30 demo projects
│   ├── team.ts                 # 8 team members
│   ├── testimonials.ts         # 6 testimonials
│   ├── blog.ts                 # 4 blog posts
│   ├── partners.ts             # 6 partners
│   └── company.ts              # Single source of truth for company info
├── i18n/
│   ├── config.ts               # Locale constants
│   ├── store.ts                # useSyncExternalStore-based locale store
│   ├── get-dictionary.ts
│   └── dictionaries/
│       ├── en.ts               # English (default)
│       ├── ar.ts               # Arabic (RTL)
│       └── fr.ts               # French
├── lib/
│   ├── format.ts               # Currency / date formatters
│   ├── security/api.ts         # Rate limit, CSRF, validation, escape
│   ├── email/
│   │   ├── resend.ts           # Resend SDK wrapper
│   │   └── templates.ts        # HTML email templates
│   └── seo/schemas.ts          # JSON-LD schemas
└── hooks/
    └── use-toast.ts
```

## Getting Started

### Prerequisites

- Node.js 20+ (or Bun)
- npm / yarn / bun

### Install & run

```bash
# Install dependencies
npm install        # or: bun install

# Copy env template
cp .env.example .env
# → Edit .env and add your RESEND_API_KEY

# Run dev server
npm run dev        # or: bun run dev
# → http://localhost:3000
```

### Build for production

```bash
npm run build
npm run start      # serves the standalone build
```

### Lint

```bash
npm run lint
```

## Environment Variables

See [`.env.example`](./.env.example):

```bash
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=menanet305@gmail.com
NEXT_PUBLIC_SITE_URL=https://mit-egy.vercel.app
ALLOWED_ORIGINS=https://mit-egy.vercel.app,http://localhost:3000
NODE_ENV=development
```

> **Important:** never commit the real `.env` file. It is in `.gitignore`.

## Pages & Routes

| Route               | Description                                 |
| ------------------- | ------------------------------------------- |
| `/`                 | Home: Hero, Stats, Featured, Why Us, Testimonials, CTA, Partners |
| `/projects`         | Filterable project portfolio (type, status, tech, industry, budget, team size, sort, pagination) |
| `/projects/[id]`    | Project detail with gallery, specs, map, contact, similar projects |
| `/services`         | 6 service cards with icons and descriptions |
| `/about`            | Story, vision, mission, stats, team, gallery |
| `/blog`             | Blog listing with cover, tags, reading time  |
| `/blog/[slug]`      | Blog post with markdown rendering and share  |
| `/contact`          | Contact form + info + map (Resend pipeline)  |
| `/api/contact`      | POST endpoint (CSRF + rate limit + validation) |
| `/sitemap.xml`      | Auto-generated sitemap (all pages + projects + blog) |
| `/robots.txt`       | Allow all + sitemap link                     |

## Internationalization (i18n)

- **3 locales:** `en` (LTR, default), `ar` (RTL), `fr` (LTR)
- **Store:** `useSyncExternalStore` (hydration-safe) with `localStorage` persistence (key: `mit-lang`)
- **Switching:** Globe dropdown in the header; updates `<html lang dir>` immediately
- **Dictionary files:** `src/i18n/dictionaries/{en,ar,fr}.ts`
- All UI strings, navigation, hero, CTAs, FAQ, contact labels, chatbot text, project filters, and project detail labels are translated.

## Chatbot

Floating button (bottom-right in LTR, bottom-left in RTL) on every page.

- Welcome message in the active locale
- Search box + FAQ search engine with scoring:
  - Exact substring in question → **+10**
  - Substring in answer → **+5**
  - Token overlap → **+2** (in question) / **+1** (in answer)
- Single match → answer shown inline
- Multiple matches → quick-reply chips
- No match → typing indicator + WhatsApp handoff after 1.5s with message "I'll connect you with a human teammate on WhatsApp."
- Typing indicator (3 bouncing dots)
- NO category browsing, NO static suggested-questions list

## Contact Pipeline & Email

1. User submits the contact form on `/contact`
2. Browser POSTs to `/api/contact` with JSON body
3. Server validates and sends two emails via **Resend**:
   - **Internal notification** to `CONTACT_TO_EMAIL` (reply-to = client email)
   - **Auto-confirmation** to the client ("Thank you, we'll reply within 24 hours")
4. Both emails are styled HTML with the MIT.egy brand (navy header, gold accents, structured sections)

## Security

The `/api/contact` endpoint enforces these layers (in order):

1. **CSRF Protection** — Origin header validated against `ALLOWED_ORIGINS` (403 if invalid)
2. **Body Size Limit** — 16 KB max (413 if exceeded)
3. **Rate Limiting** — 5 requests / IP / hour, in-memory (429 with `Retry-After`)
4. **Email Validation** — RFC-ish regex (400 if invalid)
5. **Field Capping** — 2 KB max per field (truncated if exceeded)
6. **HTML Escape** — All user input is HTML-escaped before being embedded in email templates

### Security Headers (applied to all routes via `next.config.ts`)

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `X-Permitted-Cross-Domain-Policies: none`
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors *`

## SEO

- **sitemap.xml** — auto-generated, includes all static routes, 30 projects, and blog posts
- **robots.txt** — allow all + sitemap link
- **JSON-LD Schemas:**
  - `Organization` (on home)
  - `ProfessionalService` (on home + about)
  - `WebSite` (on home, with SearchAction)
  - `FAQPage` (on home — 10 questions)
  - `BreadcrumbList` (on every project detail)
  - `BlogPosting` (on every blog post)
- **OpenGraph + Twitter Cards** — set globally in `layout.tsx`
- **metadataBase** — `https://mit-egy.vercel.app`
- **Canonical URLs** — via `alternates.canonical`
- **Image Optimization** — WebP/AVIF, lazy loading, no `unoptimized`
- **Font preload** — woff2 preloaded via `next/font/google`

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: MIT.egy full site"
git branch -M main
git remote add origin https://github.com/<your-username>/mit-egy.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to <https://vercel.com/new>
2. Import your GitHub repo `mit-egy`
3. Framework preset: **Next.js**
4. Vercel will auto-detect build settings (no override needed)

### 3. Add environment variables

In the Vercel dashboard → Project → Settings → Environment Variables:

| Key                    | Value                              |
| ---------------------- | ---------------------------------- |
| `RESEND_API_KEY`       | `re_xxx` (your real key)           |
| `RESEND_FROM_EMAIL`    | `onboarding@resend.dev` (or your verified domain) |
| `CONTACT_TO_EMAIL`     | `menanet305@gmail.com`             |
| `NEXT_PUBLIC_SITE_URL` | `https://mit-egy.vercel.app`       |
| `ALLOWED_ORIGINS`      | `https://mit-egy.vercel.app,https://your-custom-domain.com` |
| `NODE_ENV`             | `production`                       |

### 4. Deploy

Click **Deploy**. Vercel will build and deploy within ~2 minutes.

### 5. Verify

- Visit `https://mit-egy.vercel.app` — should load with HTTP 200
- Visit `https://mit-egy.vercel.app/sitemap.xml` — should return valid XML
- Visit `https://mit-egy.vercel.app/robots.txt` — should return the rules
- Submit the contact form — should get an auto-confirmation email
- Open chatbot — should respond to "what services" or similar

## Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Dev server on port 3000                  |
| `npm run build`    | Production build (standalone)            |
| `npm run start`    | Run the standalone production server     |
| `npm run lint`     | ESLint check                             |
| `npm run db:push`  | Push Prisma schema (if you use the DB)   |

## Health Check

Run `scripts/health-check.sh` (after deployment) to verify all routes return 200:

```bash
chmod +x scripts/health-check.sh
./scripts/health-check.sh https://mit-egy.vercel.app
```

## License

© 2020–2025 MIT.egy · Miser Info Technology. All rights reserved.
Commercial Registry No. 2020/123456.

## Notes on `npm audit`

Production runtime has **0 vulnerabilities** (`bun audit` reports `No vulnerabilities found` after applying the `overrides` block in `package.json`).

There is **1 moderate dev-only vulnerability** remaining in `minimatch` (a transitive dependency of `eslint` and `typescript-eslint`). It is a ReDoS pattern that can only be triggered by feeding crafted glob patterns into lint-time file matching — it does **not** affect the production runtime, the deployed bundle, or end users. Upgrading `minimatch` to v11+ (which contains the fix) breaks eslint's internal API. Once `eslint-config-next` ships a version that supports `minimatch@11`, this last finding will resolve automatically.

To verify before deploying:

```bash
bun audit
# Expected: 0 production vulnerabilities, 1 moderate dev-only
```
