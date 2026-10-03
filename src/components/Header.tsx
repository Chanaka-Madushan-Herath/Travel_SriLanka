"use client";

import { locales } from "@/lib/locales";
import type { Locale } from "@/lib/types";
import { tx } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";

const links = [
  { href: "/", key: "home" },
  { href: "/destinations", key: "destinations" },
  { href: "/trips", key: "trips" },
  { href: "/reviews", key: "reviews" },
  { href: "/contact", key: "contact" },
] as const;

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function Header() {
  const { t, locale, settings } = useSite();
  const pathname = normalize(usePathname() || "/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Mark />
          <span>
            <span className="block font-display text-xl leading-none">{tx(settings.siteName, locale)}</span>
            <span className="mt-1 hidden text-xs text-muted sm:block">{tx(settings.tagline, locale)}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active ? "text-lagoon" : "text-ink/80 hover:text-ink"}`}
                aria-current={active ? "page" : undefined}
              >
                {t.nav[link.key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-full border border-line px-3 py-2 text-sm lg:hidden"
            aria-expanded={open}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.nav.closeMenu : t.nav.openMenu}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="menu-in border-t border-line px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="grid gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block text-lg" onClick={() => setOpen(false)}>
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale, t } = useSite();
  return (
    <select
      aria-label={t.langLabel}
      value={locale}
      onChange={(event) => setLocale(event.target.value as Locale)}
      className="rounded-full border border-line bg-foam px-3 py-2 text-sm text-ink"
    >
      {locales.map((item) => (
        <option key={item.id} value={item.id}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

function Mark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className="logo-mark h-11 w-11">
      <rect width="64" height="64" rx="16" fill="#102824" />
      <path d="M10 46c8-14 14-22 22-22s14 8 22 22" stroke="#c9842a" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 46V30l8-12 8 12v16" stroke="#fffdf8" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="16" r="3" fill="#c9842a" />
    </svg>
  );
}
