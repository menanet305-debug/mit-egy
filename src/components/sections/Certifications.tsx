"use client";

import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { partners } from "@/data/partners";

export function Certifications() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  return (
    <section className="py-14 md:py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy mb-2">
            {dict.certifications.title}
          </h2>
          <p className="text-sm text-muted-foreground">{dict.certifications.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((p) => (
            <div
              key={p.id}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-background rounded-lg border border-border hover:border-brand-gold/40 hover:shadow-sm transition-all"
            >
              <div className="font-heading font-bold text-base text-brand-navy">{p.logoText}</div>
              <div className="text-[10px] text-muted-foreground text-center">{p.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
