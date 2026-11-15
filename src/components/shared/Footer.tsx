"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { company } from "@/data/company";
import { Code2, Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/projects", label: dict.nav.projects },
    { href: "/services", label: dict.nav.services },
    { href: "/about", label: dict.nav.about },
    { href: "/blog", label: dict.nav.blog },
    { href: "/contact", label: dict.nav.contact },
  ];

  const serviceLinks = dict.services.list.slice(0, 4).map((s) => s.title);

  return (
    <footer className="mt-auto bg-brand-navy text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                <Code2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-heading text-lg font-bold">
                MIT<span className="text-brand-gold">.egy</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">{dict.footer.about}</p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4 text-brand-gold">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4 text-brand-gold">
              {dict.footer.services}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((s, i) => (
                <li key={i}>
                  <Link
                    href="/services"
                    className="text-sm text-white/70 hover:text-brand-gold transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4 text-brand-gold">
              {dict.footer.contact}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-gold flex-shrink-0" aria-hidden="true" />
                <span>{company.address.full}</span>
              </li>
              <li>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-start gap-2 text-white/70 hover:text-brand-gold transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 text-brand-gold flex-shrink-0" aria-hidden="true" />
                  <span dir="ltr">{company.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-2 text-white/70 hover:text-brand-gold transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-brand-gold flex-shrink-0" aria-hidden="true" />
                  <span>{company.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <Clock className="h-4 w-4 mt-0.5 text-brand-gold flex-shrink-0" aria-hidden="true" />
                <span>{dict.contact.info.hoursValue}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-3 text-xs text-white/60">
          <p>
            © {dict.brand.name}. {dict.footer.rights}
          </p>
          <span aria-hidden="true" className="hidden md:inline">·</span>
          <p className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors underline underline-offset-2">
              {dict.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors underline underline-offset-2">
              {dict.footer.terms}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
