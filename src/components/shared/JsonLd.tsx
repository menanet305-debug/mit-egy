"use client";

import {
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
  faqPageSchema,
  breadcrumbSchema,
  blogPostingSchema,
} from "@/lib/seo/schemas";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

interface Props {
  type: "home" | "about" | "faq" | "project" | "blog";
  locale?: Locale;
  slug?: string;
  breadcrumbItems?: { name: string; url: string }[];
}

export function JsonLd({ type, locale = "en", slug, breadcrumbItems }: Props) {
  const schemas: Record<string, unknown>[] = [];

  if (type === "home") {
    schemas.push(organizationSchema());
    schemas.push(professionalServiceSchema());
    schemas.push(websiteSchema());
    // Add FAQ schema on home (chatbot serves FAQ)
    const dict = getDictionary(locale);
    schemas.push(faqPageSchema([...dict.faq.questions]));
  }

  if (type === "about") {
    schemas.push(organizationSchema());
    schemas.push(professionalServiceSchema());
  }

  if (type === "faq") {
    const dict = getDictionary(locale);
    schemas.push(faqPageSchema([...dict.faq.questions]));
  }

  if (type === "project" && slug && breadcrumbItems) {
    schemas.push(breadcrumbSchema(breadcrumbItems));
  }

  if (type === "blog" && slug) {
    const schema = blogPostingSchema(slug);
    if (schema) schemas.push(schema);
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
