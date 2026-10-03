import type { Locale } from "./types";

export function tx(value: Partial<Record<Locale, string>> | undefined, locale: Locale): string {
  if (!value) return "";
  const picked = value[locale]?.trim();
  return picked || value.en || "";
}

export function txList(value: Partial<Record<Locale, string[]>> | undefined, locale: Locale): string[] {
  if (!value) return [];
  const picked = value[locale]?.map((item) => item.trim()).filter(Boolean);
  if (picked && picked.length) return picked;
  return value.en ?? [];
}

export function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug;
}

export function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-3)}`;
}

export function localeTag(locale: Locale): string {
  const tags: Record<Locale, string> = {
    en: "en-GB",
    fr: "fr-FR",
    es: "es-ES",
    de: "de-DE",
    ru: "ru-RU",
    zh: "zh-CN",
    ja: "ja-JP",
  };
  return tags[locale];
}

export function formatUsd(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTag(locale), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(localeTag(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function sortByOrder<T extends { order: number; name?: unknown; title?: unknown }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export function mapHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function listToLines(value: string[]): string {
  return value.join("\n");
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function downloadText(filename: string, contents: string, type = "text/plain"): void {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function photo(file: string, width = 1800): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}
