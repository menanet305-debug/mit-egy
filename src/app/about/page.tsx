"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteShell } from "@/components/shared/SiteShell";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Rocket, Globe } from "lucide-react";
import { company } from "@/data/company";

export default function AboutPage() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  const galleryImages = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&fm=webp&q=70",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop&fm=webp&q=70",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&fm=webp&q=70",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&fm=webp&q=70",
  ];

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative isolate bg-brand-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop&fm=webp&q=70"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">
            {dict.about.heroTitle}
          </h1>
          <p className="text-white/85 max-w-2xl mx-auto">{dict.about.heroSubtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                {dict.about.story.title}
              </h2>
              <p className="text-foreground/85 leading-relaxed">{dict.about.story.body}</p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop&fm=webp&q=70"
                alt="MIT.egy team workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-brand-gold/30">
              <CardContent className="p-6 md:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold mb-4">
                  <Eye className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-2">
                  {dict.about.vision.title}
                </h3>
                <p className="text-sm text-foreground/85 leading-relaxed">{dict.about.vision.body}</p>
              </CardContent>
            </Card>
            <Card className="border-brand-gold/30">
              <CardContent className="p-6 md:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold mb-4">
                  <Target className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-2">
                  {dict.about.mission.title}
                </h3>
                <p className="text-sm text-foreground/85 leading-relaxed">{dict.about.mission.body}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">
            {dict.about.stats.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {company.stats.map((stat, i) => {
              const labelKey = stat.labelKey.split(".")[1] as keyof typeof dict.stats;
              return (
                <div key={i} className="text-center">
                  <div className="font-heading text-3xl md:text-4xl font-bold text-brand-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/70 uppercase tracking-wide">
                    {dict.stats[labelKey]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy mb-2">
              {dict.about.gallery.title}
            </h2>
            <p className="text-muted-foreground">{dict.about.gallery.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <Image
                  src={src}
                  alt={`${dict.about.gallery.title} ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
