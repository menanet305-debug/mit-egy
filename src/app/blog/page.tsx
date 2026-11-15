"use client";

import Image from "next/image";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteShell } from "@/components/shared/SiteShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/format";

export default function BlogPage() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">
            {dict.blog.title}
          </h1>
          <p className="text-white/85 max-w-2xl mx-auto">{dict.blog.subtitle}</p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden flex flex-col h-full">
                <div className="block relative aspect-[16/9] bg-muted">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-brand-navy mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      {formatDate(post.publishedAt, locale)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {dict.blog.minRead.replace("{n}", String(post.readingMinutes))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
