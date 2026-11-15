"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteShell } from "@/components/shared/SiteShell";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import {
  projects,
  allTechStacks,
  allIndustries,
  type ProjectType,
  type ProjectStatus,
} from "@/data/projects";

const PROJECT_TYPES: ProjectType[] = [
  "website",
  "webapp",
  "mobile",
  "ecommerce",
  "saas",
  "dashboard",
  "landing",
  "api",
];

const PROJECT_STATUSES: ProjectStatus[] = ["completed", "ongoing", "maintenance"];
const TEAM_OPTIONS = ["1", "3", "5", "10"];
const PAGE_SIZE = 9;

function ProjectsContent() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const searchParams = useSearchParams();

  // Initial state derived directly from searchParams (no setState-in-effect)
  const [types, setTypesState] = useState<ProjectType[]>(() => {
    const t = searchParams.get("type");
    return t && PROJECT_TYPES.includes(t as ProjectType) ? [t as ProjectType] : [];
  });
  const [statuses, setStatusesState] = useState<ProjectStatus[]>([]);
  const [techStack, setTechStackState] = useState<string>("any");
  const [industry, setIndustryState] = useState<string>(() => searchParams.get("industry") ?? "any");
  const [teamMin, setTeamMinState] = useState<string>("1");
  const [sort, setSortState] = useState<string>("newest");
  const [page, setPage] = useState(1);

  // Filter setters that also reset page to 1
  const setTypes = (v: ProjectType[] | ((prev: ProjectType[]) => ProjectType[])) => {
    setTypesState(v);
    setPage(1);
  };
  const setStatuses = (v: ProjectStatus[] | ((prev: ProjectStatus[]) => ProjectStatus[])) => {
    setStatusesState(v);
    setPage(1);
  };
  const setTechStack = (v: string) => {
    setTechStackState(v);
    setPage(1);
  };
  const setIndustry = (v: string) => {
    setIndustryState(v);
    setPage(1);
  };
  const setTeamMin = (v: string) => {
    setTeamMinState(v);
    setPage(1);
  };
  const setSort = (v: string) => {
    setSortState(v);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      if (types.length > 0 && !types.includes(p.type)) return false;
      if (statuses.length > 0 && !statuses.includes(p.status)) return false;
      if (techStack !== "any" && !p.techStack.includes(techStack)) return false;
      if (industry !== "any" && p.industry !== industry) return false;
      if (parseInt(teamMin, 10) > p.teamSize) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "durationLong":
          return b.durationWeeks - a.durationWeeks;
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return list;
  }, [types, statuses, techStack, industry, teamMin, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleType = (t: ProjectType) => {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };
  const toggleStatus = (s: ProjectStatus) => {
    setStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const clearFilters = () => {
    setTypes([]);
    setStatuses([]);
    setTechStack("any");
    setIndustry("any");
    setTeamMin("1");
    setSort("newest");
  };

  const hasActiveFilters =
    types.length > 0 ||
    statuses.length > 0 ||
    techStack !== "any" ||
    industry !== "any" ||
    teamMin !== "1";

  return (
    <SiteShell>
      <section className="bg-brand-navy text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {dict.projectsPage.title}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">{dict.projectsPage.subtitle}</p>
        </div>
      </section>

      <div className="border-b border-border bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            {dict.projectsPage.note}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-6 bg-background border border-border rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-brand-navy flex items-center gap-2">
                <Filter className="h-4 w-4" aria-hidden="true" />
                {dict.projectsPage.filters.title}
              </h2>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs h-7 text-muted-foreground hover:text-brand-navy"
                >
                  <X className="h-3 w-3 me-1" aria-hidden="true" />
                  {dict.projectsPage.filters.clear}
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                {dict.projectsPage.filters.type}
              </h3>
              <div className="space-y-2">
                {PROJECT_TYPES.map((t) => {
                  const label = dict.projectsPage.filters.typeOptions[t];
                  return (
                    <div key={t} className="flex items-center gap-2">
                      <Checkbox
                        id={`type-${t}`}
                        checked={types.includes(t)}
                        onCheckedChange={() => toggleType(t)}
                      />
                      <Label htmlFor={`type-${t}`} className="text-sm cursor-pointer font-normal">
                        {label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                {dict.projectsPage.filters.status}
              </h3>
              <div className="space-y-2">
                {PROJECT_STATUSES.map((s) => {
                  const label = dict.projectsPage.filters.statusOptions[s];
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <Checkbox
                        id={`status-${s}`}
                        checked={statuses.includes(s)}
                        onCheckedChange={() => toggleStatus(s)}
                      />
                      <Label htmlFor={`status-${s}`} className="text-sm cursor-pointer font-normal">
                        {label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                {dict.projectsPage.filters.techStack}
              </h3>
              <Select value={techStack} onValueChange={setTechStack}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={dict.common.all} />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="any">{dict.common.all}</SelectItem>
                  {allTechStacks.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                {dict.projectsPage.filters.industry}
              </h3>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={dict.common.all} />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="any">{dict.common.all}</SelectItem>
                  {allIndustries.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i.charAt(0).toUpperCase() + i.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase text-muted-foreground">
                {dict.projectsPage.filters.teamSize}
              </h3>
              <Select value={teamMin} onValueChange={setTeamMin}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {dict.projectsPage.filters.teamOptions[t as keyof typeof dict.projectsPage.filters.teamOptions]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </aside>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                {dict.projectsPage.results
                  .replace("{shown}", String(pageItems.length))
                  .replace("{total}", String(filtered.length))}
              </p>
              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm text-muted-foreground whitespace-nowrap">
                  {dict.projectsPage.sort.label}:
                </Label>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger id="sort" className="w-48 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">{dict.projectsPage.sort.newest}</SelectItem>
                    <SelectItem value="durationLong">{dict.projectsPage.sort.durationLong}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {pageItems.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-xl">
                <p className="text-muted-foreground">{dict.projectsPage.noResults}</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  {dict.projectsPage.filters.clear}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {pageItems.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  {dict.common.previous}
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? "default" : "outline"}
                      size="sm"
                      className={`h-9 w-9 p-0 ${
                        page === i + 1 ? "bg-brand-navy text-white hover:bg-brand-navy/90" : ""
                      }`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  {dict.common.next}
                </Button>
              </div>
            )}

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                {types.map((t) => (
                  <Badge key={`t-${t}`} variant="secondary" className="gap-1">
                    {dict.projectsPage.filters.typeOptions[t]}
                    <button onClick={() => toggleType(t)} aria-label="remove">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {statuses.map((s) => (
                  <Badge key={`s-${s}`} variant="secondary" className="gap-1">
                    {dict.projectsPage.filters.statusOptions[s]}
                    <button onClick={() => toggleStatus(s)} aria-label="remove">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectsContent />
    </Suspense>
  );
}
