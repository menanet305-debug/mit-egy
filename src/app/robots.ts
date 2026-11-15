import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://mit-egy.vercel.app/sitemap.xml",
    host: "https://mit-egy.vercel.app",
  };
}
