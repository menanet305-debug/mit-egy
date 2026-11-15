// JSON-LD structured data schemas
import { company } from "@/data/company";
import { blogPosts } from "@/data/blog";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://mit-egy.vercel.app/#organization",
    name: "MIT.egy",
    alternateName: "Miser Info Technology",
    url: "https://mit-egy.vercel.app",
    logo: "https://mit-egy.vercel.app/logo.svg",
    description: company.description,
    foundingDate: String(company.foundedYear),
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressCountry: "EG",
    },
    sameAs: [
      company.social.linkedin,
      company.social.github,
      company.social.twitter,
      company.social.instagram,
    ],
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://mit-egy.vercel.app/#professional-service",
    name: "MIT.egy",
    description: "Web development, mobile app development, SaaS engineering, and DevOps services.",
    url: "https://mit-egy.vercel.app",
    logo: "https://mit-egy.vercel.app/logo.svg",
    image: "https://mit-egy.vercel.app/logo.svg",
    telephone: company.phone,
    email: company.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "18:00",
    },
    areaServed: ["EG", "SA", "AE", "QA", "JO", "TN"],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    })),
  };
}

export function blogPostingSchema(slug: string) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "MIT.egy",
      logo: {
        "@type": "ImageObject",
        url: "https://mit-egy.vercel.app/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mit-egy.vercel.app/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://mit-egy.vercel.app/#website",
    url: "https://mit-egy.vercel.app",
    name: "MIT.egy",
    description: company.description,
    publisher: {
      "@id": "https://mit-egy.vercel.app/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://mit-egy.vercel.app/projects?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
