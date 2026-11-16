"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import { allIndustries } from "@/data/projects";
import { company } from "@/data/company";

// Local, optimized WebP (112 KB) — was a remote Unsplash JPEG served on every visit.
const heroImage = "/images/hero-workspace.webp";

export function Hero() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const router = useRouter();
  const Arrow = ArrowRight;

  const [type, setType] = useState("any");
  const [industry, setIndustry] = useState("any");

  const projectTypes = [
    { value: "any", label: dict.hero.anyType },
    { value: "website", label: dict.projectsPage.filters.typeOptions.website },
    { value: "webapp", label: dict.projectsPage.filters.typeOptions.webapp },
    { value: "mobile", label: dict.projectsPage.filters.typeOptions.mobile },
    { value: "ecommerce", label: dict.projectsPage.filters.typeOptions.ecommerce },
    { value: "saas", label: dict.projectsPage.filters.typeOptions.saas },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type !== "any") params.set("type", type);
    if (industry !== "any") params.set("industry", industry);
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="" /* decorative: the section text carries the meaning */
          fill
          priority
          loading="eager"
          sizes="100vw"
          quality={80}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm mb-6 animate-fade-in-up">
            <span className="h-2 w-2 rounded-full bg-brand-success animate-pulse" aria-hidden="true" />
            {company.fullName} · Since {company.foundedYear}
          </p>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 animate-fade-in-up">
            {dict.hero.title}
          </h1>

          <p className="text-base md:text-lg text-white/85 max-w-2xl mb-8 animate-fade-in-up">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up">
            <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-semibold">
              <a href="/projects">
                {dict.hero.ctaPrimary}
                <Arrow className="h-4 w-4 ms-2 rtl:rotate-180" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="/contact">{dict.hero.ctaSecondary}</a>
            </Button>
          </div>

          {/* Quick search */}
          <form
            onSubmit={handleSearch}
            className="rounded-xl bg-white/95 backdrop-blur-md p-3 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-white text-brand-navy" aria-label={dict.hero.searchType}>
                  <SelectValue placeholder={dict.hero.searchType} />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="bg-white text-brand-navy" aria-label={dict.hero.searchIndustry}>
                  <SelectValue placeholder={dict.hero.searchIndustry} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{dict.hero.anyIndustry}</SelectItem>
                  {allIndustries.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="submit"
                size="icon"
                className="bg-brand-navy hover:bg-brand-navy/90 text-brand-gold flex-shrink-0"
                aria-label={dict.hero.search}
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
