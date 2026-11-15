// Currency formatting helpers
import type { Currency } from "@/data/projects";
import type { Locale } from "@/i18n/config";

export function formatCurrency(
  amount: number,
  currency: Currency,
  locale: Locale
): string {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
  };
  const currencySymbol: Record<Currency, string> = {
    USD: "$",
    EGP: "EGP",
    EUR: "€",
    SAR: "SAR",
  };
  try {
    return new Intl.NumberFormat(localeMap[locale], {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currencySymbol[currency]} ${amount.toLocaleString()}`;
  }
}

export function formatNumber(n: number, locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
  };
  return new Intl.NumberFormat(localeMap[locale]).format(n);
}

export function formatDate(iso: string, locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    en: "en-US",
  };
  try {
    return new Intl.DateTimeFormat(localeMap[locale], {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
