"use client";

import { SiteShell } from "@/components/shared/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { FeaturedProjects as FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Certifications } from "@/components/sections/Certifications";
import { JsonLd } from "@/components/shared/JsonLd";
import { useLocale } from "@/i18n/store";

export default function Home() {
  const locale = useLocale();
  return (
    <SiteShell>
      <JsonLd type="home" locale={locale} />
      <Hero />
      <Stats />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      <Certifications />
    </SiteShell>
  );
}
