// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  country: string;
  rating: number; // 1-5
  text: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Mohammed Al-Rashid",
    role: "CEO",
    company: "PayStream Inc.",
    city: "Dubai",
    country: "UAE",
    rating: 5,
    text: "MIT.egy delivered our payment orchestration platform on time, on budget, and beyond spec. Their engineering rigor is unmatched in the region. We've now worked with them on three follow-up projects.",
  },
  {
    id: "t2",
    name: "Sarah Mansour",
    role: "Founder",
    company: "Maza Fashion",
    city: "Cairo",
    country: "Egypt",
    rating: 5,
    text: "Our sales grew noticeably after launching the new Maza storefront. The team understood fashion retail deeply and the attention to detail was superb.",
  },
  {
    id: "t3",
    name: "Dr. Khaled Al-Harbi",
    role: "COO",
    company: "Tabib Health",
    city: "Riyadh",
    country: "Saudi Arabia",
    rating: 5,
    text: "The Tabib app we built with MIT.egy now serves patients across a growing clinic network with reliable daily appointment booking. Reliability has been outstanding — we've never had a single P0 outage in 8 months.",
  },
  {
    id: "t4",
    name: "Elena Schmidt",
    role: "Creative Director",
    company: "Nordic Studio",
    city: "Berlin",
    country: "Germany",
    rating: 5,
    text: "We hired MIT.egy to build our agency portfolio and they delivered a fast, polished site with top-tier motion design. They 'get' design.",
  },
  {
    id: "t5",
    name: "Yasmine Trabelsi",
    role: "Co-founder",
    company: "Skillex",
    city: "Tunis",
    country: "Tunisia",
    rating: 5,
    text: "We needed to validate our marketplace thesis in 9 weeks with a focused MVP. MIT.egy hit the deadline exactly and the product was so solid we raised our seed round on it.",
  },
];
