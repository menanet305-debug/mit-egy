"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/store";
import { getDictionary } from "@/i18n/get-dictionary";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { MessageCircle, X, Send, MessageSquare } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

interface QuickReply {
  q: string;
  a: string;
}

// Tokenize for overlap scoring
function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function scoreFaq(query: string, faq: FaqItem): number {
  const q = query.toLowerCase().trim();
  const fq = faq.q.toLowerCase();
  const fa = faq.a.toLowerCase();
  let score = 0;

  // Exact substring in question → +10
  if (fq.includes(q) && q.length > 3) score += 10;
  // Substring in answer → +5
  if (fa.includes(q) && q.length > 3) score += 5;

  // Token overlap → +2 per token exact, +1 for partial
  const queryTokens = new Set(tokenize(q));
  const qTokens = new Set(tokenize(faq.q));
  const aTokens = new Set(tokenize(fa));
  for (const t of queryTokens) {
    if (qTokens.has(t)) score += 2;
    else if (aTokens.has(t)) score += 1;
  }

  return score;
}

function searchFaq(query: string, faqs: FaqItem[]): QuickReply[] {
  if (!query.trim()) return [];
  const scored = faqs
    .map((f) => ({ faq: f, score: scoreFaq(query, f) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return scored.map((s) => ({ q: s.faq.q, a: s.faq.a }));
}

export function Chatbot() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const faqs = dict.faq.questions as FaqItem[];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [handoffTriggered, setHandoffTriggered] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize greeting when chat opens (lazy init pattern, no setState in effect)
  const handleOpen = (nextOpen: boolean) => {
    if (nextOpen && messages.length === 0) {
      setMessages([{ role: "bot", text: dict.chatbot.welcome }]);
    }
    setOpen(nextOpen);
  };

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const positionClass = "right-4 bottom-4";
  const panelPositionClass = "right-0";

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);

    // Simulate thinking + search
    setTimeout(() => {
      setTyping(false);
      const results = searchFaq(text, faqs);

      if (results.length === 0) {
        // Hand off to WhatsApp
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: dict.chatbot.handoff },
        ]);
        setHandoffTriggered(true);
        setTimeout(() => {
          if (typeof window !== "undefined") {
            const waUrl = `${company.whatsappLink}?text=${encodeURIComponent(
              text
            )}`;
            window.open(waUrl, "_blank", "noopener,noreferrer");
          }
        }, 1500);
      } else if (results.length === 1) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: results[0].a },
        ]);
      } else {
        // Multiple matches: quick-reply chips
        const chipsText = results.map((r, i) => `${i + 1}. ${r.q}`).join("\n");
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: chipsText },
        ]);
        // Store last results for chip clicks
        setQuickReplies(results);
      }
    }, 700);
  };

  const handleChipClick = (q: string, a: string) => {
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setTyping(true);
    setQuickReplies([]);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: a }]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn("fixed z-50", positionClass)} dir="ltr">
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => handleOpen(true)}
          aria-label={dict.chatbot.open}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-brand-navy text-brand-gold shadow-lg hover:bg-brand-navy/90 hover:scale-105 transition-all"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className={cn(
            "fixed bottom-4 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col",
            "max-h-[80vh] animate-fade-in",
            panelPositionClass
          )}
          style={{ right: "1rem" } as React.CSSProperties}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-brand-navy text-white">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
                <MessageSquare className="h-4 w-4 text-brand-gold" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="font-heading font-semibold text-sm">{dict.chatbot.title}</p>
                <p className="text-[10px] text-white/70">MIT.egy</p>
              </div>
            </div>
            <button
              onClick={() => handleOpen(false)}
              aria-label={dict.chatbot.close}
              className="text-white/70 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30 custom-scrollbar"
            style={{ maxHeight: "50vh" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap",
                    msg.role === "user"
                      ? "bg-brand-navy text-white rounded-br-sm"
                      : "bg-white border border-border text-foreground rounded-bl-sm"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-xl rounded-bl-sm px-3 py-3 flex gap-1">
                  <span className="typing-dot h-2 w-2 rounded-full bg-brand-gold" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-brand-gold" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-brand-gold" />
                </div>
              </div>
            )}

            {/* Quick reply chips */}
            {quickReplies.length > 1 &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "bot" &&
              !typing && (
                <div className="flex flex-wrap gap-2 justify-start mt-1">
                  {quickReplies.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => handleChipClick(r.q, r.a)}
                      className="text-xs px-2.5 py-1.5 rounded-full bg-white border border-brand-gold/40 text-brand-navy hover:bg-brand-gold hover:text-white transition-colors"
                    >
                      {r.q.length > 50 ? r.q.slice(0, 50) + "…" : r.q}
                    </button>
                  ))}
                </div>
              )}

            {/* WhatsApp handoff button */}
            {handoffTriggered && (
              <div className="flex justify-start">
                <a
                  href={`${company.whatsappLink}?text=${encodeURIComponent("Hello MIT.egy team")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-success text-white text-xs font-semibold hover:bg-brand-success/90"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {dict.chatbot.openWhatsApp}
                </a>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex items-center gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={dict.chatbot.placeholder}
              aria-label={dict.chatbot.placeholder}
              className="flex-1 min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              maxLength={500}
            />
            <button
              onClick={handleSend}
              aria-label={dict.chatbot.placeholder}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand-navy text-brand-gold hover:bg-brand-navy/90 flex-shrink-0"
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
