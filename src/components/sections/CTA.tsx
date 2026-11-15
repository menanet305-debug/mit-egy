"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Rocket } from "lucide-react";

export function CTA() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const Arrow = ArrowRight;

  return (
    <section className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-gradient opacity-90" aria-hidden="true" />
      <div className="absolute -top-24 -end-24 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-24 -start-24 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl" aria-hidden="true" />
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gold text-brand-navy mb-5">
            <Rocket className="h-7 w-7" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            {dict.cta.title}
          </h2>
          <p className="text-white/80 mb-7">{dict.cta.subtitle}</p>
          <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy font-semibold">
            <Link href="/contact">
              {dict.cta.button}
              <Arrow className="h-4 w-4 ms-2 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
