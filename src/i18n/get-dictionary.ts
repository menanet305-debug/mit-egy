import { en } from "./dictionaries/en";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

// Single-language site: always returns the English dictionary.
export function getDictionary(_locale?: Locale): Dictionary {
  return en;
}

export type { Dictionary };
