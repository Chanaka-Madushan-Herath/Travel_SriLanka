import type { Locale } from "./types";

export const locales: { id: Locale; label: string; htmlLang: string }[] = [
  { id: "fr", label: "Français", htmlLang: "fr" },
  { id: "es", label: "Español", htmlLang: "es" },
  { id: "en", label: "English", htmlLang: "en" },
  { id: "de", label: "Deutsch", htmlLang: "de" },
  { id: "ru", label: "Русский", htmlLang: "ru" },
  { id: "zh", label: "中文", htmlLang: "zh-CN" },
  { id: "ja", label: "日本語", htmlLang: "ja" },
];

const localeIds = new Set<string>(locales.map((item) => item.id));

export function isLocale(value: string | null): value is Locale {
  return value !== null && localeIds.has(value);
}

export function localeLabel(locale: Locale): string {
  return locales.find((item) => item.id === locale)?.label ?? locale;
}

export function htmlLang(locale: Locale): string {
  return locales.find((item) => item.id === locale)?.htmlLang ?? "en";
}
