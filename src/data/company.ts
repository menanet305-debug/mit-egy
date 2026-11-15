// Company configuration — single source of truth for contact details, etc.
// Derived numbers: always computed from foundedYear so every page stays consistent.
const yearsActive = new Date().getFullYear() - 2008;

export const company = {
  name: "MIT.egy",
  fullName: "Miser Info Technology",
  tagline: "Web Development & Software Engineering Studio",
  description:
    "MIT.egy is a Cairo-based software engineering studio. We design, build, and ship professional websites, web apps, mobile apps, and SaaS platforms for clients worldwide. 100+ projects delivered.",
  foundedYear: 2008,
  email: "menanet305@gmail.com",
  phone: "+20 100 577 1268",
  whatsapp: "+201005771268",
  whatsappLink: "https://wa.me/201005771268",
  address: {
    street: "Cairo, Egypt",
    city: "Cairo",
    country: "Egypt",
    full: "Cairo, Egypt",
  },
  hours: "Mon – Fri, 10:00 – 18:00 (EET)",
  hoursShort: "10:00 – 18:00",
  workingDays: "Mon – Fri",
  social: {
    linkedin: "https://linkedin.com/company/mit-egy",
    github: "https://github.com/mit-egy",
    twitter: "https://twitter.com/mit_egy",
    instagram: "https://instagram.com/mit.egy",
  },
  stats: [
    { value: "100+", labelKey: "stats.projects" },
    { value: `${yearsActive}+`, labelKey: "stats.years" },
    { value: "200+", labelKey: "stats.clients" },
    { value: "12", labelKey: "stats.countries" },
  ],
  allowedOrigins: [
    "https://mit-egy.vercel.app",
    "https://real-states.vercel.app",
    "http://localhost:3000",
  ],
} as const;
