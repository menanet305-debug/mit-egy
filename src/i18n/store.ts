"use client";

import type { Locale } from "./config";

// Single-language site (English only).
// useLocale always returns "en" — kept as a hook so existing call sites
// don't need to change. No localStorage, no sync, no hydration concerns.
export function useLocale(): Locale {
  return "en";
}

export function setLocale(_locale: Locale): void {
  // No-op: site is English-only.
}

export const currentLocale: Locale = "en";
