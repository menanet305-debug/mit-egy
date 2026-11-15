"use client";

import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mb-3">
            {dict.testimonials.title}
          </h2>
          <p className="text-muted-foreground">{dict.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-all flex flex-col"
            >
              <Quote className="h-8 w-8 text-brand-gold/30 mb-3" aria-hidden="true" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed flex-1 mb-4">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-brand-gold font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.city}, {t.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
