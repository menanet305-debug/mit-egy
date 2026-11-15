import type { Metadata } from "next";
import { SiteShell } from "@/components/shared/SiteShell";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the MIT.egy website and our services. Last updated: November 2026.",
};


export default function TermsPage() {
  const lastUpdated = "November 15, 2026";

  return (
    <SiteShell>
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Legal
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-navy mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>

          <div className="space-y-10 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                1. Acceptance of These Terms
              </h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the
                website operated by {company.fullName} (&ldquo;MIT.egy&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo;), including browsing our portfolio, reading our blog, using our
                on-site chat assistant, and submitting the contact form. By using this website
                you agree to these Terms. If you do not agree, please stop using the site.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                2. Our Services
              </h2>
              <p>
                MIT.egy designs and builds software — websites, web applications, mobile
                applications, e-commerce platforms, and SaaS products. Anything described on this
                website (including portfolio examples and stated timelines) is presented for
                information purposes. A binding engagement begins only when both parties sign a
                written proposal or contract, which may include its own terms that take
                precedence over these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                3. Acceptable Use
              </h2>
              <ul className="list-disc ms-6 space-y-2">
                <li>Do not submit false, misleading, or fraudulent inquiries.</li>
                <li>
                  Do not attempt to disrupt, overload, probe, or gain unauthorized access to the
                  website or its infrastructure.
                </li>
                <li>
                  Do not use automated tools to scrape, spam, or flood our contact form or chat
                  assistant.
                </li>
              </ul>
              <p className="mt-3">
                We rate-limit and monitor form submissions to protect the service. Abuse may
                result in blocked access.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                4. Intellectual Property
              </h2>
              <p>
                The content of this website — text, design, code, and branding — is the property
                of MIT.egy or its licensors and is protected by applicable copyright laws. You
                may view and share links to it, but you may not reproduce or reuse substantial
                parts of it without written permission. Client names and project details are
                shared for portfolio purposes; rights in delivered work are governed by each
                client&apos;s contract.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                5. Portfolio and Case Studies
              </h2>
              <p>
                Portfolio entries describe work we have delivered and may use representative
                imagery. Figures such as project duration and team size reflect typical
                engagements; results vary by project. Nothing on this website is a guarantee of
                identical outcomes for future engagements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                This website is provided &ldquo;as is&rdquo; without warranties of any kind. To
                the maximum extent permitted by law, MIT.egy is not liable for indirect or
                consequential damages arising from use of, or inability to use, this website.
                Nothing in these Terms limits liability that cannot be limited under applicable
                law, including Egyptian Consumer Protection Law (Law No. 181 of 2018) where it
                applies.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                7. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the Arab Republic of Egypt. Any dispute
                arising from use of this website shall be subject to the exclusive jurisdiction
                of the competent courts of Cairo, unless a signed client contract states
                otherwise.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                8. Changes
              </h2>
              <p>
                We may update these Terms from time to time. Continued use of the website after
                changes are posted constitutes acceptance of the updated Terms. The
                &ldquo;last updated&rdquo; date above always reflects the current version.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-brand-navy mb-3">
                9. Contact
              </h2>
              <p>
                Questions about these Terms? Write to us at{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="text-brand-navy font-medium underline underline-offset-2"
                >
                  {company.email}
                </a>{" "}
                or call{" "}
                <a
                  href={`tel:${company.phone}`}
                  className="text-brand-navy font-medium underline underline-offset-2"
                  dir="ltr"
                >
                  {company.phone}
                </a>
                . {company.fullName} · {company.address.full}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
