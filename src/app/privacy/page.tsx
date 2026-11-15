import type { Metadata } from "next";
import { SiteShell } from "@/components/shared/SiteShell";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MIT.egy collects, uses, and protects your personal data. Last updated: November 2026.",
};


export default function PrivacyPage() {
  const lastUpdated = "November 15, 2026";

  return (
    <SiteShell>
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Legal
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

          <div className="space-y-10 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                1. Who We Are
              </h2>
              <p>
                {company.fullName} (&ldquo;MIT.egy&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a
                software engineering studio based in Cairo, Egypt. This policy explains what
                personal data we collect through this website, why we collect it, and the choices
                you have. You can reach us at any time at{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-brand-navy font-medium underline underline-offset-2"
                >
                  {company.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                2. Data We Collect
              </h2>
              <p className="mb-3">We collect only what you choose to give us:</p>
              <ul className="list-disc ms-6 space-y-2">
                <li>
                  <strong>Contact form data</strong> — your name, email address, phone number, and
                  project details, sent only when you submit the form on our Contact page.
                </li>
                <li>
                  <strong>Chatbot conversations</strong> — messages you type into our on-site
                  assistant. The assistant answers common questions and can hand the conversation
                  over to WhatsApp if you ask to talk to a human.
                </li>
                <li>
                  <strong>Basic technical data</strong> — anonymized request information (such as
                  page path and timestamp) needed to serve the site, keep it secure, and protect
                  against abuse.
                </li>
              </ul>
              <p className="mt-3">
                We do not run advertising trackers, and we do not sell or share your data with
                third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                3. How We Use Your Data
              </h2>
              <ul className="list-disc ms-6 space-y-2">
                <li>To respond to your project inquiries and provide quotes.</li>
                <li>To operate and secure the website (rate limiting, spam prevention).</li>
                <li>To comply with legal obligations where applicable.</li>
              </ul>
              <p className="mt-3">
                Our contact form is protected against abuse (rate limiting and request
                validation). We retain inquiry messages only as long as needed to handle your
                request, unless retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                4. Third-Party Services
              </h2>
              <p>
                We use a small number of processors to operate this site: an email delivery
                provider (to route contact-form messages to our team) and our hosting platform.
                If you choose to continue a conversation on WhatsApp, that conversation is
                governed by WhatsApp&apos;s own terms and privacy policy. Portfolio images are
                served from a public image CDN.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                5. Your Rights
              </h2>
              <p>
                You may ask us at any time to access, correct, or delete the personal data we
                hold about you, or to stop contacting you. Send your request to{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-brand-navy font-medium underline underline-offset-2"
                >
                  {company.email}
                </a>{" "}
                and we will respond within a reasonable period, in line with Egypt&apos;s Personal
                Data Protection Law (Law No. 151 of 2020) and, where applicable, the GDPR.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this policy from time to time. The &ldquo;last updated&rdquo; date
                at the top of this page always reflects the current version, and material changes
                will be highlighted on this page.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                7. Contact
              </h2>
              <p>
                {company.fullName} · {company.address.full} ·{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-brand-navy font-medium underline underline-offset-2"
                >
                  {company.email}
                </a>{" "}
                ·{" "}
                <a
                  href={`tel:${company.phone}`}
                  className="text-brand-navy font-medium underline underline-offset-2"
                  dir="ltr"
                >
                  {company.phone}
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
