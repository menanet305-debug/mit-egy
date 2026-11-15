"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const Arrow = ArrowRight;
  const featured = getFeaturedProjects(6);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mb-3">
            {dict.featured.title}
          </h2>
          <p className="text-muted-foreground">{dict.featured.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white">
            <Link href="/projects">
              {dict.featured.viewAll}
              <Arrow className="h-4 w-4 ms-2 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
