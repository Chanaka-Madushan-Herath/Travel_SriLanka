"use client";

import { useSite } from "@/context/SiteContext";
import { mapHref, phoneHref, tx, whatsappHref } from "@/lib/utils";
import Link from "next/link";

export function ContactDetails({ tone = "paper" }: { tone?: "paper" | "inverse" }) {
  const { settings, locale, t } = useSite();
  const muted = tone === "inverse" ? "text-foam/75" : "text-muted";
  const whatsapp = whatsappHref(settings.whatsapp);
  const items = [
    settings.address ? { label: t.address, value: tx(settings.address, locale) } : null,
    settings.phone ? { label: t.phone, value: settings.phone, href: phoneHref(settings.phone) } : null,
    settings.email ? { label: t.email, value: settings.email, href: `mailto:${settings.email}` } : null,
    settings.hours ? { label: t.hours, value: tx(settings.hours, locale) } : null,
    whatsapp ? { label: t.whatsapp, value: settings.whatsapp, href: whatsapp } : null,
  ].filter((item): item is { label: string; value: string; href?: string } => Boolean(item && item.value));

  return (
    <div>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item.label}>
            <p className={`text-xs uppercase tracking-[0.16em] ${muted}`}>{item.label}</p>
            {item.href ? (
              <a href={item.href} className="mt-1 inline-block font-medium hover:underline">
                {item.value}
              </a>
            ) : (
              <p className="mt-1 font-medium">{item.value}</p>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {settings.mapQuery ? (
          <a className="underline" href={mapHref(settings.mapQuery)} target="_blank" rel="noreferrer">
            {t.map}
          </a>
        ) : null}
        {settings.instagram ? (
          <a className="underline" href={settings.instagram} target="_blank" rel="noreferrer">
            {t.instagram}
          </a>
        ) : null}
        {settings.facebook ? (
          <a className="underline" href={settings.facebook} target="_blank" rel="noreferrer">
            {t.facebook}
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function Footer() {
  const { t, settings, locale } = useSite();
  return (
    <footer className="mt-16 border-t border-line bg-lagoon-deep text-foam">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{tx(settings.siteName, locale)}</p>
          <p className="mt-3 max-w-sm text-foam/75">{t.footerNote}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-gold">{t.nav.contact}</p>
          <div className="mt-4">
            <ContactDetails tone="inverse" />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-gold">{t.nav.home}</p>
          <ul className="mt-4 grid gap-2">
            <li><Link href="/destinations">{t.nav.destinations}</Link></li>
            <li><Link href="/trips">{t.nav.trips}</Link></li>
            <li><Link href="/reviews">{t.nav.reviews}</Link></li>
            <li><Link href="/contact">{t.nav.contact}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-sm text-foam/60">
        {t.rights} · {new Date().getFullYear()}
      </div>
    </footer>
  );
}
