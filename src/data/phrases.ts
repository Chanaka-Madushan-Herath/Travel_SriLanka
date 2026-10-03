import type { L10n, L10nList } from "@/lib/types";
import { phraseRows } from "./phraseRows";

export function localize(en: string): L10n {
  const row = phraseRows[en];
  if (!row) return { en, fr: en, es: en, de: en, ru: en, zh: en, ja: en };
  const [fr, es, de, ru, zh, ja] = row;
  return { en, fr, es, de, ru, zh, ja };
}

export function localizeList(items: string[]): L10nList {
  const rows = items.map((item) => localize(item));
  return {
    en: items,
    fr: rows.map((row) => row.fr),
    es: rows.map((row) => row.es),
    de: rows.map((row) => row.de),
    ru: rows.map((row) => row.ru),
    zh: rows.map((row) => row.zh),
    ja: rows.map((row) => row.ja),
  };
}
