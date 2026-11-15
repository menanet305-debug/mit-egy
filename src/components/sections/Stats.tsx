"use client";

import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { company } from "@/data/company";

export function Stats() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  return (
    <section className="bg-brand-navy text-white py-12 border-y border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {company.stats.map((stat, i) => {
            const labelKey = stat.labelKey.split(".")[1] as keyof typeof dict.stats;
            return (
              <div
                key={i}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gold mb-1">
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
  );
}
