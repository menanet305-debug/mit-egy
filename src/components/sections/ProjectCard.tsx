"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Clock, Users } from "lucide-react";
import { type Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const Arrow = ArrowRight;

  const statusKey = project.status as keyof typeof dict.projectCard.status;
  const typeKey = project.type as keyof typeof dict.projectsPage.filters.typeOptions;

  return (
    <Card className="group overflow-hidden border-border hover:border-brand-gold/40 hover:shadow-lg transition-all flex flex-col h-full">
      {/* Image */}
      <Link href={`/projects/${project.id}`} className="block relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <Badge
          className={`absolute top-3 left-3 ${
            project.status === "completed"
              ? "bg-brand-success text-white"
              : project.status === "ongoing"
              ? "bg-brand-warning text-white"
              : "bg-brand-navy text-white"
          }`}
        >
          {dict.projectCard.status[statusKey]}
        </Badge>
        <Badge
          variant="outline"
          className="absolute top-3 right-3 bg-white/90 text-brand-navy capitalize"
        >
          {dict.projectsPage.filters.typeOptions[typeKey]}
        </Badge>
      </Link>

      {/* Content */}
      <CardContent className="p-4 flex-1 flex flex-col">
        <Link href={`/projects/${project.id}`} className="block">
          <h3 className="font-heading text-base font-semibold text-brand-navy line-clamp-2 mb-1 group-hover:text-brand-gold transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-3">
          {project.location.city}, {project.location.country} · {project.client}
        </p>

        {/* Quick specs */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3 mt-auto">
          <div className="flex flex-col items-start">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {dict.projectsPage.filters.duration.replace("(weeks)", "").trim()}
            </span>
            <span className="font-semibold">
              {project.durationWeeks}w
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" aria-hidden="true" />
              {dict.projectsPage.filters.teamSize}
            </span>
            <span className="font-semibold">{project.teamSize}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-full text-brand-navy hover:text-brand-gold hover:bg-muted/50 group/btn"
        >
          <Link href={`/projects/${project.id}`}>
            {dict.projectCard.viewDetails}
            <Arrow className="h-4 w-4 ms-1 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
