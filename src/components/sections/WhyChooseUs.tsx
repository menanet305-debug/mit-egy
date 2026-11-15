"use client";

import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { Award, ShieldCheck, Headset } from "lucide-react";

const iconMap = [Award, ShieldCheck, Headset];

export function WhyChooseUs() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mb-3">
            {dict.whyUs.title}
          </h2>
          <p className="text-muted-foreground">{dict.whyUs.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dict.whyUs.items.map((item, i) => {
            const Icon = iconMap[i] ?? Award;
            return (
              <div
                key={i}
                className="text-center p-6 bg-background rounded-xl border border-border hover:border-brand-gold/40 hover:shadow-md transition-all"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-navy text-brand-gold mb-4">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-brand-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
