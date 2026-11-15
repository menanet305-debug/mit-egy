// Team members
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  github?: string;
}

export const team: TeamMember[] = [
  {
    id: "ahmed-khaled",
    name: "Ahmed Khaled",
    role: "Founder & CEO",
    bio: "Software architect with 14 years building fintech and SaaS platforms. Ex-Senior Engineer at Booking.com. Holds MSc in Computer Science from Cairo University.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
    github: "#",
  },
  {
    id: "salma-nabil",
    name: "Salma Nabil",
    role: "CTO & Tech Lead",
    bio: "Full-stack engineer specializing in Next.js, TypeScript, and cloud architecture. Speaker at React Conf 2023. AWS Solutions Architect Professional certified.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
    github: "#",
  },
  {
    id: "khaled-mostafa",
    name: "Khaled Mostafa",
    role: "Backend Lead",
    bio: "Distributed systems engineer with deep expertise in PostgreSQL, Redis, and microservices. Built payment rails processing $1B+ annually.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
    github: "#",
  },
  {
    id: "mona-adel",
    name: "Mona Adel",
    role: "Product Manager",
    bio: "Product leader who shipped 30+ products from idea to scale. Ex-Product Manager at Swvl. Certified Scrum Product Owner.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
  },
  {
    id: "yousef-hassan",
    name: "Yousef Hassan",
    role: "Mobile Lead",
    bio: "React Native and Flutter specialist with 25+ apps shipped to App Store and Play Store. Expert in offline-first architectures and real-time sync.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
    github: "#",
  },
  {
    id: "nour-ibrahim",
    name: "Nour Ibrahim",
    role: "Design Lead",
    bio: "Product designer with a background in cognitive science. Specializes in motion-rich, accessibility-first interfaces. Builds design systems that scale from solo to enterprise.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
  },
  {
    id: "omar-farouk",
    name: "Omar Farouk",
    role: "DevOps Engineer",
    bio: "Kubernetes and Terraform wizard. Migrated 8 clients from VMs to K8s with zero downtime. AWS and GCP certified.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
  },
  {
    id: "layla-mahmoud",
    name: "Layla Mahmoud",
    role: "QA Lead",
    bio: "Test automation engineer who built our CI pipeline catching 99.4% of bugs pre-prod. ISTQB Advanced certified.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&fm=webp&q=70",
    linkedin: "#",
  },
];
