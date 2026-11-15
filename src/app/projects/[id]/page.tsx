"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteShell } from "@/components/shared/SiteShell";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Tag,
  Calendar,
  Building2,
  Layers,
  Globe,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";
import { getProjectById, getSimilarProjects } from "@/data/projects";
import { company } from "@/data/company";
import { formatDate } from "@/lib/format";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = getProjectById(id);
  const locale = useLocale();
  const dict = getDictionary(locale);
  const Back = ArrowLeft;

  const [activeImage, setActiveImage] = useState(0);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  if (!project) {
    return (
      <SiteShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-6">Project not found.</p>
          <Button asChild>
            <Link href="/projects">{dict.projectDetail.backToProjects}</Link>
          </Button>
        </div>
      </SiteShell>
    );
  }

  const similar = getSimilarProjects(project, 3);
  const typeKey = project.type as keyof typeof dict.projectsPage.filters.typeOptions;
  const statusKey = project.status as keyof typeof dict.projectCard.status;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello, I'm interested in ${project.title} (${project.id}).\nName: ${contactName}\nPhone: ${contactPhone}\nMessage: ${contactMessage}`;
    const url = `${company.whatsappLink}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const specs = [
    { icon: Tag, label: dict.projectDetail.specs.type, value: dict.projectsPage.filters.typeOptions[typeKey] },
    { icon: CheckCircle2, label: dict.projectDetail.specs.status, value: dict.projectCard.status[statusKey] },
    { icon: Clock, label: dict.projectDetail.specs.duration, value: `${project.durationWeeks} weeks` },
    { icon: Users, label: dict.projectDetail.specs.teamSize, value: `${project.teamSize} developers` },
    { icon: Building2, label: dict.projectDetail.specs.industry, value: project.industry.charAt(0).toUpperCase() + project.industry.slice(1) },
    { icon: Users, label: dict.projectDetail.specs.client, value: project.client },
    { icon: Calendar, label: dict.projectDetail.specs.yearCompleted, value: String(project.yearCompleted) },
    { icon: Layers, label: dict.projectDetail.specs.pages, value: String(project.pagesScreens) },
    { icon: Globe, label: dict.projectDetail.specs.languages, value: project.languagesSupported.length > 0 ? project.languagesSupported.join(", ") : "—" },
  ];

  return (
    <SiteShell>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-navy"
          >
            <Back className="h-4 w-4" aria-hidden="true" />
            {dict.projectDetail.backToProjects}
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-brand-navy py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            {/* Main image */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
              <Image
                src={project.images[activeImage]}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-white">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-brand-gold text-brand-navy">
                  {dict.projectsPage.filters.typeOptions[typeKey]}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white">
                  {dict.projectCard.status[statusKey]}
                </Badge>
              </div>
              <p className="text-white/70 text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {project.location.city}, {project.location.country}
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                      activeImage === i ? "border-brand-gold" : "border-transparent opacity-60"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} ${i + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Main content */}
          <div className="space-y-10">
            {/* Overview */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-brand-navy mb-4">
                {dict.projectDetail.overview}
              </h2>
              <p className="text-foreground/85 leading-relaxed">{project.description}</p>
              <p className="mt-3 text-sm text-muted-foreground bg-muted/50 border border-border rounded-lg px-4 py-3">
                {dict.projectDetail.note}
              </p>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-brand-navy mb-4">
                {dict.projectDetail.specifications}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
                  >
                    <s.icon className="h-4 w-4 text-brand-gold flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-semibold text-brand-navy truncate">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech stack */}
            <section>
              <h2 className="font-heading text-xl font-bold text-brand-navy mb-3">
                {dict.projectDetail.specs.techStack}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <Badge key={t} variant="secondary" className="text-sm py-1.5 px-3">
                    {t}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="font-heading text-xl font-bold text-brand-navy mb-3">
                {dict.projectDetail.specs.features}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Contact card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{dict.projectDetail.contactAgent}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <a href={`tel:${company.phone}`} className="flex items-center gap-2 text-sm hover:text-brand-gold">
                    <Phone className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                    <span dir="ltr">{company.phone}</span>
                  </a>
                  <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-sm hover:text-brand-gold">
                    <MessageCircle className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                    {company.email}
                  </a>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-3 pt-3 border-t border-border">
                  <p className="text-sm font-semibold">{dict.projectDetail.contactForm.title}</p>
                  <div>
                    <Label htmlFor="name" className="text-xs">
                      {dict.projectDetail.contactForm.name}
                    </Label>
                    <Input
                      id="name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs">
                      {dict.projectDetail.contactForm.phone}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                      maxLength={20}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs">
                      {dict.projectDetail.contactForm.message}
                    </Label>
                    <Textarea
                      id="message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={3}
                      maxLength={1000}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-brand-success hover:bg-brand-success/90 text-white">
                    <MessageCircle className="h-4 w-4 me-2" aria-hidden="true" />
                    {dict.projectDetail.contactForm.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{dict.projectDetail.additionalInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{dict.projectDetail.info.projectId}</span>
                  <span className="font-mono text-xs">{project.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{dict.projectDetail.info.publishedAt}</span>
                  <span>{formatDate(project.createdAt, locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{dict.projectDetail.info.engagement}</span>
                  <span>
                    {project.engagement === "direct"
                      ? dict.projectDetail.info.engagementDirect
                      : dict.projectDetail.info.engagementAgency}
                  </span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Similar projects */}
        {similar.length > 0 && (
          <section className="mt-14 pt-10 border-t border-border">
            <h2 className="font-heading text-2xl font-bold text-brand-navy mb-6">
              {dict.projectDetail.similarProjects}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
