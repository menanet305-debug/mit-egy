// Single-language site configuration (English only).
export type Locale = "en";

export const locales: Locale[] = ["en"];
export const defaultLocale: Locale = "en";
export const localeLabels: Record<Locale, string> = {
  en: "English",
};
export const localeDirs: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
};

export const STORAGE_KEY = "mit-lang";
