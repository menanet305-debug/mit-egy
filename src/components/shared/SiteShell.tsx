"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}
