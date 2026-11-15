import type { Metadata } from "next";
import { Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { company } from "@/data/company";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mit-egy.vercel.app"),
  title: {
    default: "MIT.egy — Web Development & Software Engineering Studio",
    template: "%s | MIT.egy",
  },
  description:
    "MIT.egy is a Cairo-based software engineering studio. We build websites, web apps, mobile apps, and SaaS platforms for clients worldwide. 100+ projects delivered.",
  authors: [{ name: "MIT.egy Team" }],
  creator: "MIT.egy",
  publisher: "MIT.egy",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "MIT.egy — Web Development & Software Engineering Studio",
    description:
      "We design, build, and ship professional websites, web apps, mobile apps, and SaaS platforms. 100+ projects delivered worldwide.",
    url: "https://mit-egy.vercel.app",
    siteName: "MIT.egy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIT.egy — Web Development & Software Engineering",
    description:
      "We design, build, and ship professional websites, web apps, mobile apps, and SaaS platforms. 100+ projects delivered worldwide.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${playfair.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
