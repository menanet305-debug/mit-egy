"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteShell } from "@/components/shared/SiteShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Smartphone,
  ShoppingBag,
  Layers,
  Palette,
  Cloud,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const serviceIcons = [Code2, Smartphone, ShoppingBag, Layers, Palette, Cloud];

export default function ServicesPage() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const Arrow = ArrowRight;

  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">
            {dict.services.title}
          </h1>
          <p className="text-white/85 max-w-2xl mx-auto">{dict.services.subtitle}</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.services.list.map((service, i) => {
              const Icon = serviceIcons[i] ?? Code2;
              return (
                <Card key={i} className="group hover:border-brand-gold/40 hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6 md:p-7 flex flex-col h-full">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-navy text-brand-gold mb-4">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-brand-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="mt-4 self-start text-brand-navy hover:text-brand-gold group/btn p-0 h-auto"
                    >
                      <Link href="/contact">
                        {dict.services.learnMore}
                        <Arrow className="h-4 w-4 ms-1 group-hover/btn:translate-x-1 rtl:rotate-180 transition-transform" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy mb-3">
            {dict.cta.title}
          </h2>
          <p className="text-muted-foreground mb-5">{dict.cta.subtitle}</p>
          <Button asChild size="lg" className="bg-brand-success hover:bg-brand-success/90 text-white">
            <Link href="/contact">{dict.cta.button}</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
