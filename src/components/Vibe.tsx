"use client";

import { useSite } from "@/context/SiteContext";
import { placeHref } from "@/lib/links";
import { tx } from "@/lib/utils";
import { themeIds, vibeText, type ThemeId } from "@/lib/vibeText";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { InquiryButtons } from "./InquiryForms";
import { Cover, scenes, useImage } from "./PageHero";

const tilePlaces: Record<ThemeId, string> = { heritage: "sigiriya", wildlife: "yala", beach: "mirissa", mountains: "ella" };

const SLIDE_MS = 6500;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/* Home hero                                                           */
/* ------------------------------------------------------------------ */

export function HeroShow() {
  const { t, settings, locale } = useSite();
  const v = vibeText[locale];
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % themeIds.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active, reduced, paused]);

  const theme = themeIds[active];
  const slides: Record<ThemeId, string> = {
    heritage: settings.heroImage.trim() || scenes.sigiriya,
    wildlife: useImage("heroWildlife"),
    beach: useImage("heroBeach"),
    mountains: useImage("heroMountains"),
  };

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-lagoon-deep text-foam"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {themeIds.map((id, index) => (
          <div key={id} className={`hero-slide ${index === active ? "is-active" : ""}`}>
            <Cover key={slides[id]} src={slides[id]} eager={index === 0} className="hero-slide-img" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(9,24,21,0.78)_0%,rgba(9,24,21,0.35)_50%,rgba(9,24,21,0)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(9,24,21,0.8),transparent)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-10 pt-16 lg:pt-20">
        <p className="hero-rise inline-flex w-fit items-center gap-2 rounded-full border border-foam/25 bg-foam/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
          {tx(settings.heroKicker, locale)}
        </p>
        <h1 className="hero-rise font-display mt-5 max-w-3xl text-4xl leading-[1.04] drop-shadow-lg sm:text-6xl lg:text-7xl" style={{ "--d": "120ms" } as React.CSSProperties}>
          {tx(settings.heroTitle, locale)}
        </h1>
        <p className="hero-rise mt-6 max-w-xl text-lg text-foam/85" style={{ "--d": "240ms" } as React.CSSProperties}>
          {tx(settings.heroSubtitle, locale)}
        </p>

        <div key={theme} className="theme-swap mt-7 max-w-xl" aria-live="polite">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{v.themes[theme].label}</p>
          <p className="font-display mt-1 text-2xl sm:text-3xl">{v.themes[theme].title}</p>
        </div>

        <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ "--d": "360ms" } as React.CSSProperties}>
          <Link className="btn btn-ink" href="/trips">
            {t.heroPrimary}
          </Link>
          <InquiryButtons />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label={v.mosaicKicker}>
          {themeIds.map((id, index) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={index === active}
              onClick={() => setActive(index)}
              className={`theme-tab group relative overflow-hidden rounded-2xl border px-4 py-3 text-left backdrop-blur transition ${
                index === active ? "border-gold/70 bg-foam/15" : "border-foam/15 bg-foam/5 hover:bg-foam/10"
              }`}
            >
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">0{index + 1}</span>
              <span className="mt-0.5 block font-semibold">{v.themes[id].label}</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-foam/10">
                {index === active && !reduced ? (
                  <span key={`${active}-${paused}`} className={`theme-progress block h-full bg-gold ${paused ? "is-paused" : ""}`} style={{ animationDuration: `${SLIDE_MS}ms` }} />
                ) : null}
                {index === active && reduced ? <span className="block h-full w-full bg-gold" /> : null}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 hidden items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-foam/60 sm:flex" aria-hidden="true">
          <span className="scroll-dot" /> {v.scroll}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Four moods                                                          */
/* ------------------------------------------------------------------ */

export function MoodTiles() {
  const { locale, destinations } = useSite();
  const v = vibeText[locale];
  const tileImages: Record<ThemeId, string> = {
    heritage: useImage("tileHeritage"),
    wildlife: useImage("tileWildlife"),
    beach: useImage("tileBeach"),
    mountains: useImage("tileMountains"),
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">{v.mosaicKicker}</p>
      <h2 className="font-display mt-2 text-4xl sm:text-5xl">{v.mosaicTitle}</h2>
      <p className="mt-3 max-w-2xl text-lg text-muted">{v.mosaicLead}</p>
      <div className="mt-10 grid auto-rows-[260px] gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
        {themeIds.map((id, index) => {
          const target = tilePlaces[id];
          const href = destinations.some((place) => place.slug === target) ? placeHref(target) : "/destinations";
          const span = index === 0 ? "lg:col-span-2 lg:row-span-2" : index === 1 ? "lg:row-span-2" : "";
          return (
            <Link
              key={id}
              href={href}
              className={`mood-tile group relative isolate overflow-hidden rounded-[28px] text-foam ${span}`}
            >
              <Cover key={tileImages[id]} src={tileImages[id]} className="mood-img -z-10" />
              <span className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(9,24,21,0.92)_0%,rgba(9,24,21,0.35)_45%,rgba(9,24,21,0.05)_100%)]" />
              <span className="absolute left-5 top-5 rounded-full bg-foam/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                {v.themes[id].label}
              </span>
              <span className="absolute inset-x-0 bottom-0 p-6">
                <span className={`font-display block leading-tight ${index > 1 ? "text-2xl" : "text-3xl"}`}>{v.themes[id].title}</span>
                <span className={`mood-copy mt-2 block max-w-md text-sm text-foam/80 ${index > 1 ? "lg:hidden" : ""}`}>{v.themes[id].tagline}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  {v.explore}
                  <span className="mood-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Numbers                                                             */
/* ------------------------------------------------------------------ */

function CountUp({ to, format }: { to: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setValue(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);
  return <span ref={ref}>{format(value)}</span>;
}

export function StatsStrip() {
  const { locale, destinations, trips } = useSite();
  const v = vibeText[locale];
  const nf = new Intl.NumberFormat(locale === "zh" ? "zh-CN" : locale);
  const background = useImage("statsBg");
  const stats = [
    { n: 8, label: v.statUnesco },
    { n: 1340, label: v.statCoast },
    { n: 2524, label: v.statPeak },
    { n: destinations.length, label: v.statPlaces },
    { n: trips.length, label: v.statRoutes },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-lagoon-deep text-foam">
      <Cover key={background} src={background} className="-z-10 opacity-25" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,40,36,0.95),rgba(16,40,36,0.75))]" />
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-5 py-14 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l-2 border-gold/60 pl-4">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="font-display block text-4xl text-gold sm:text-5xl">
                <CountUp to={stat.n} format={(n) => nf.format(n)} />
              </span>
              <span className="mt-1 block text-sm text-foam/75">{stat.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full-width photo band                                               */
/* ------------------------------------------------------------------ */

export function PhotoBand() {
  const { locale } = useSite();
  const v = vibeText[locale];
  const background = useImage("bandBg");
  return (
    <section className="photo-band relative isolate overflow-hidden text-foam" style={{ "--band": `url("${background.replace(/"/g, "%22")}")` } as React.CSSProperties}>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,24,21,0.35),rgba(9,24,21,0.8))]" />
      <div className="mx-auto max-w-6xl px-5 py-28 text-center sm:py-36">
        <h2 className="font-display mx-auto max-w-3xl text-4xl leading-tight drop-shadow-lg sm:text-6xl">{v.bandTitle}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-foam/85">{v.bandBody}</p>
        <div className="mt-8 flex justify-center">
          <InquiryButtons />
        </div>
      </div>
    </section>
  );
}

