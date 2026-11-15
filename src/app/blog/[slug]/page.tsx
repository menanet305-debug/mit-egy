"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteShell } from "@/components/shared/SiteShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/format";

// Simple markdown-to-html renderer (subset)
function renderMarkdown(md: string): string {
  let html = md;
  // Headings
  html = html.replace(/^# (.+)$/gm, '<h1 class="font-heading text-2xl font-bold text-brand-navy mt-6 mb-3">$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="font-heading text-xl font-semibold text-brand-navy mt-5 mb-2">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="font-heading text-lg font-semibold text-brand-navy mt-4 mb-2">$1</h3>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-5 list-disc">$1</li>');
  // Paragraphs
  html = html
    .split(/\n\n+/)
    .map((block) => {
      if (block.startsWith("<h") || block.startsWith("<li")) return block;
      return `<p class="text-foreground/85 leading-relaxed mb-3">${block.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
  // Wrap consecutive <li>
  html = html.replace(/(<li[^>]*>.*?<\/li>(\s*))+/gs, (m) => `<ul class="space-y-1 mb-3">${m}</ul>`);
  return html;
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);
  const locale = useLocale();
  const dict = getDictionary(locale);
  const Back = ArrowLeft;
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <SiteShell>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-6">Article not found.</p>
          <Button asChild>
            <Link href="/blog">{dict.blog.back}</Link>
          </Button>
        </div>
      </SiteShell>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <SiteShell>
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-navy"
          >
            <Back className="h-4 w-4" aria-hidden="true" />
            {dict.blog.back}
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="bg-brand-navy text-white py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((t) => (
              <Badge key={t} variant="outline" className="border-white/30 text-white">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            {post.title}
          </h1>
          <p className="text-white/85 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.publishedAt, locale)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {dict.blog.minRead.replace("{n}", String(post.readingMinutes))}
            </span>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl -mt-8 relative z-10">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Body */}
      <article className="container mx-auto px-4 md:px-6 max-w-3xl py-12">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-brand-gold font-semibold">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm">{post.author}</p>
            <p className="text-xs text-muted-foreground">{post.authorRole}</p>
          </div>
        </div>

        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Share */}
        <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{dict.blog.sharePost}</p>
          <Button variant="outline" size="sm" onClick={handleShare}>
            {copied ? "✓ Copied" : "Copy link"}
          </Button>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="font-heading text-xl font-bold text-brand-navy mb-4">
              More from our blog
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <Card key={p.slug} className="overflow-hidden">
                  <Link href={`/blog/${p.slug}`} className="block relative aspect-[16/9] bg-muted">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="400px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <CardContent className="p-4">
                    <h3 className="font-heading text-sm font-semibold text-brand-navy line-clamp-2">
                      <Link href={`/blog/${p.slug}`} className="hover:text-brand-gold">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(p.publishedAt, locale)} ·{" "}
                      {dict.blog.minRead.replace("{n}", String(p.readingMinutes))}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
