// Technologies we build on.
// NOTE: These are technology badges (not partnership claims) — they must not imply
// an official partnership or certification that we cannot publicly verify.
export interface Partner {
  id: string;
  name: string;
  description: string;
  logoText: string; // text-based logo for now
}

export const partners: Partner[] = [
  { id: "p1", name: "Vercel", description: "We deploy on", logoText: "▲ Vercel" },
  { id: "p2", name: "AWS", description: "We build on", logoText: "AWS" },
  { id: "p3", name: "Stripe", description: "We integrate", logoText: "Stripe" },
  { id: "p4", name: "GitHub", description: "We ship with", logoText: "GitHub" },
  { id: "p5", name: "Sanity", description: "We author in", logoText: "Sanity" },
  { id: "p6", name: "Egypt TIIDA", description: "Licensed Developer", logoText: "TIIDA" },
];
