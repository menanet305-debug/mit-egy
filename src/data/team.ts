// Team roles — shown without personal names on the About page.
export interface TeamRole {
  id: string;
  role: string;
  bio: string;
  image: string;
}

export const teamRoles: TeamRole[] = [
  {
    id: "software-architecture",
    role: "Software Architecture",
    bio: "Seasoned architects with 14+ years building fintech and SaaS platforms. Every project starts with a technical architecture decision, not a template.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&fm=webp&q=70",
  },
  {
    id: "fullstack-engineering",
    role: "Full-Stack Engineering",
    bio: "Full-stack engineers specializing in Next.js, TypeScript, and cloud architecture. Certified cloud architects on every engagement.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&fm=webp&q=70",
  },
  {
    id: "backend-engineering",
    role: "Backend & Data Engineering",
    bio: "Distributed systems engineers with deep expertise in PostgreSQL, Redis, and microservices. We build backends that stay fast under load.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop&fm=webp&q=70",
  },
  {
    id: "product-management",
    role: "Product Management",
    bio: "Product leaders who have shipped 30+ products from idea to scale. Certified Scrum Product Owners keep scope honest and delivery predictable.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop&fm=webp&q=70",
  },
  {
    id: "mobile-engineering",
    role: "Mobile Engineering",
    bio: "React Native and Flutter specialists with 25+ apps shipped to the App Store and Play Store. Experts in offline-first architectures and real-time sync.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop&fm=webp&q=70",
  },
  {
    id: "product-design",
    role: "Product Design",
    bio: "Product designers with a background in cognitive science. Motion-rich, accessibility-first interfaces. Design systems that scale from solo to enterprise.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop&fm=webp&q=70",
  },
  {
    id: "devops",
    role: "DevOps & Cloud",
    bio: "Kubernetes and Terraform specialists. We migrate clients from VMs to K8s with zero downtime. AWS and GCP certified engineers.",
    image: "https://images.unsplash.com/photo-1667372393114-3d12c62b73ab?w=400&h=400&fit=crop&fm=webp&q=70",
  },
  {
    id: "quality-assurance",
    role: "Quality Assurance",
    bio: "Test automation engineers who built our CI pipeline catching bugs pre-prod. ISTQB Advanced certified QA on every project.",
    image: "https://images.unsplash.com/photo-1523474253041-331fe518076e?w=400&h=400&fit=crop&fm=webp&q=70",
  },
];
