// Blog posts — card-level data only (no article body or authors).
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&h=600&fit=crop&fm=webp&q=70`;

export const blogPosts: BlogPost[] = [
  {
    slug: "guide-to-buying-your-first-saas-build",
    title: "The Complete Guide to Buying Your First Custom SaaS Build",
    excerpt:
      "Everything founders need to know before signing a contract for a custom SaaS platform — from scoping, to contracts, to deployment, to maintenance.",
    coverImage: img("1551288049-bebda4e38f71"),
    publishedAt: "2024-11-12",
    readingMinutes: 8,
    tags: ["saas", "founders", "contracts"],
  },
  {
    slug: "best-markets-for-software-startups-2024",
    title: "Best Markets for Software Startups in MENA 2024",
    excerpt:
      "We analyzed 100+ projects delivered across MENA, Europe, and North America. Here are the markets where software startups are growing fastest.",
    coverImage: img("1460925895917-afdab827c52f"),
    publishedAt: "2024-10-28",
    readingMinutes: 7,
    tags: ["markets", "startups", "mena"],
  },
  {
    slug: "how-to-evaluate-your-software-vendor",
    title: "How to Evaluate a Software Vendor in 5 Questions",
    excerpt:
      "Before signing any contract, ask these 5 questions. They will tell you 90% of what you need to know about a vendor.",
    coverImage: img("1556761175-4b46a572b786"),
    publishedAt: "2024-10-10",
    readingMinutes: 5,
    tags: ["vendors", "evaluation", "contracts"],
  },
  {
    slug: "shipping-mobile-apps-fast",
    title: "How We Ship Cross-Platform Mobile Apps in 8 Weeks",
    excerpt:
      "A behind-the-scenes look at our mobile app delivery process — from kickoff call to App Store and Play Store launch.",
    coverImage: img("1559028012-481c04fa702d"),
    publishedAt: "2024-09-22",
    readingMinutes: 6,
    tags: ["mobile", "process", "delivery"],
  },
];
