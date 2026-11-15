"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteShell } from "@/components/shared/SiteShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { company } from "@/data/company";
import { allIndustries } from "@/data/projects";

const projectTypes = [
  "website",
  "webapp",
  "mobile",
  "ecommerce",
  "saas",
  "dashboard",
  "landing",
  "api",
];

export default function ContactPage() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: "new",
    projectType: "any",
    industry: "any",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }
      toast({
        title: dict.contact.form.success,
        description: "",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        requestType: "new",
        projectType: "any",
        industry: "any",
        message: "",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: dict.contact.form.error,
        description: message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {dict.contact.title}
          </h1>
          <p className="text-white/85">{dict.contact.subtitle}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
          {/* Contact info */}
          <aside className="space-y-4">
            <h2 className="font-heading text-xl font-bold text-brand-navy mb-2">
              {dict.contact.info.title}
            </h2>
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">{dict.contact.info.address}</p>
                    <p className="text-sm font-medium">{company.address.full}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">{dict.contact.info.phone}</p>
                    <a href={`tel:${company.phone}`} className="text-sm font-medium hover:text-brand-gold" dir="ltr">
                      {company.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">{dict.contact.info.whatsapp}</p>
                    <a
                      href={company.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-brand-gold"
                      dir="ltr"
                    >
                      {company.whatsapp}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">{dict.contact.info.email}</p>
                    <a href={`mailto:${company.email}`} className="text-sm font-medium hover:text-brand-gold">
                      {company.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-brand-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">{dict.contact.info.hours}</p>
                    <p className="text-sm font-medium">{dict.contact.info.hoursValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Form */}
          <div>
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="font-heading text-xl font-bold text-brand-navy mb-4">
                  {dict.contact.form.title}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-xs">
                        {dict.contact.form.name} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        maxLength={100}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs">
                        {dict.contact.form.email} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        maxLength={100}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-xs">
                        {dict.contact.form.phone} <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                        maxLength={20}
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <Label htmlFor="requestType" className="text-xs">
                        {dict.contact.form.requestType}
                      </Label>
                      <Select
                        value={form.requestType}
                        onValueChange={(v) => setForm({ ...form, requestType: v })}
                      >
                        <SelectTrigger id="requestType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">{dict.contact.form.requestTypes.new}</SelectItem>
                          <SelectItem value="existing">{dict.contact.form.requestTypes.existing}</SelectItem>
                          <SelectItem value="consultation">{dict.contact.form.requestTypes.consultation}</SelectItem>
                          <SelectItem value="partnership">{dict.contact.form.requestTypes.partnership}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectType" className="text-xs">
                        {dict.contact.form.projectType}
                      </Label>
                      <Select
                        value={form.projectType}
                        onValueChange={(v) => setForm({ ...form, projectType: v })}
                      >
                        <SelectTrigger id="projectType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">{dict.common.all}</SelectItem>
                          {projectTypes.map((t) => {
                            const label = dict.projectsPage.filters.typeOptions[t as keyof typeof dict.projectsPage.filters.typeOptions];
                            return (
                              <SelectItem key={t} value={t}>
                                {label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="industry" className="text-xs">
                        {dict.contact.form.industry}
                      </Label>
                      <Select
                        value={form.industry}
                        onValueChange={(v) => setForm({ ...form, industry: v })}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">{dict.common.all}</SelectItem>
                          {allIndustries.map((i) => (
                            <SelectItem key={i} value={i}>
                              {i.charAt(0).toUpperCase() + i.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs">
                      {dict.contact.form.message} <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={6}
                      maxLength={2000}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {form.message.length}/2000
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white"
                  >
                    {submitting ? (
                      dict.contact.form.sending
                    ) : (
                      <>
                        <Send className="h-4 w-4 me-2 rtl:rotate-180" aria-hidden="true" />
                        {dict.contact.form.submit}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
