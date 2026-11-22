"use client";

import { useSite } from "@/context/SiteContext";
import type { ImageSlot } from "@/lib/types";
import { photo } from "@/lib/utils";
import { useState } from "react";

/* Photos from Wikimedia Commons, same source as the rest of the site. */
export const scenes = {
  sigiriya: photo("Sigiriya Fortress, Sri Lanka.jpg", 2000),
  leopard: photo("Srilankan leopard in Yala National Park.jpg", 2000),
  unawatuna: photo("Unawatuna beach.jpg", 2000),
  nineArch: photo("Nine Arch Bridge Ella.jpg", 2000),
  elephant: photo("Sri Lankan Elephant.jpg", 1400),
  elephants: photo("Elephants at Minneriya National Park.jpg", 2000),
  stupa: photo("Ruwanwelisaya.jpg", 1400),
  tea: photo("Tea plantation near Kandy, Sri Lanka.jpg", 2000),
};

/** The built-in photo for each spot, used when the admin leaves it empty. */
export const defaultImages: Record<ImageSlot, string> = {
  heroWildlife: scenes.leopard,
  heroBeach: scenes.unawatuna,
  heroMountains: scenes.nineArch,
  tileHeritage: scenes.stupa,
  tileWildlife: scenes.elephant,
  tileBeach: scenes.unawatuna,
  tileMountains: scenes.tea,
  statsBg: scenes.elephants,
  bandBg: scenes.elephants,
  pageTrips: scenes.nineArch,
  pagePlaces: scenes.unawatuna,
  pageNotes: scenes.elephants,
  pageContact: scenes.tea,
  pageInquiry: scenes.leopard,
  pagePlan: scenes.sigiriya,
};

/** The admin's image for a spot, or the built-in one. */
export function useImage(slot: ImageSlot): string {
  const { settings } = useSite();
  return settings.images?.[slot]?.trim() || defaultImages[slot];
}

/** A full-bleed photo that quietly falls back to the brand gradient if it fails to load. */
export function Cover({ src, className = "", eager = false }: { src: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`absolute inset-0 bg-[linear-gradient(150deg,#123f38_0%,#c9842a_120%)] ${className}`} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Photo header for inner pages                                        */
/* ------------------------------------------------------------------ */

export function PageHero({
  slot,
  kicker,
  title,
  lead,
  children,
  narrow = false,
}: {
  slot: ImageSlot;
  kicker?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  narrow?: boolean;
}) {
  const image = useImage(slot);
  return (
    <header className="relative isolate overflow-hidden bg-lagoon-deep text-foam">
      <div className="kenburns absolute inset-0 -z-10" aria-hidden="true">
        <Cover key={image} src={image} eager />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(9,24,21,0.85)_0%,rgba(9,24,21,0.45)_55%,rgba(9,24,21,0.1)_100%)]" aria-hidden="true" />
      <div className={`relative mx-auto px-5 py-20 sm:py-28 ${narrow ? "max-w-4xl" : "max-w-6xl"}`}>
        {kicker ? (
          <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-foam/25 bg-foam/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur">
            {kicker}
          </p>
        ) : null}
        <h1 className="hero-rise font-display mt-4 max-w-3xl text-5xl leading-[1.05] drop-shadow-lg sm:text-6xl" style={{ "--d": "100ms" } as React.CSSProperties}>
          {title}
        </h1>
        {lead ? (
          <p className="hero-rise mt-5 max-w-2xl text-lg text-foam/85" style={{ "--d": "200ms" } as React.CSSProperties}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="hero-rise mt-8" style={{ "--d": "300ms" } as React.CSSProperties}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
