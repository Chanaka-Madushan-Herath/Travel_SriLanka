"use client";

import { DestinationCard } from "@/components/DestinationCard";
import { ReviewSection } from "@/components/ReviewSection";
import { TripCard } from "@/components/TripCard";
import { DetailSkeleton, Photo, Reveal } from "@/components/ui";
import { usePageTitle, useSite } from "@/context/SiteContext";
import type { RegionId } from "@/lib/types";
import { sortByOrder, tx, txList } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function DestinationsQuery() {
  const slug = useSearchParams().get("slug");
  if (slug) return <DestinationDetail slug={slug} />;
  return <DestinationList />;
}

export function DestinationList() {
  const { t, destinations, locale } = useSite();
  usePageTitle(t.nav.destinations);
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [query, setQuery] = useState("");
  const regions: RegionId[] = ["cultural", "hills", "south", "east", "north"];
  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sortByOrder(destinations).filter((place) => {
      if (region !== "all" && place.region !== region) return false;
      if (!needle) return true;
      return [place.slug, ...Object.values(place.name), ...Object.values(place.summary)]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [destinations, query, region]);

  return (
    <div>
      <header className="relative overflow-hidden bg-lagoon-deep text-foam">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-orb hero-orb-gold" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <p className="hero-rise text-xs uppercase tracking-[0.2em] text-gold">{txName(locale)}</p>
          <h1 className="hero-rise font-display mt-3 max-w-3xl text-5xl" style={{ "--d": "100ms" } as React.CSSProperties}>
            {t.placesTitle}
          </h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg text-foam/75" style={{ "--d": "220ms" } as React.CSSProperties}>
            {t.placesLead}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="block md:max-w-sm md:flex-1">
            <span className="sr-only">{t.searchPlaces}</span>
            <input className="field" value={query} placeholder={t.searchPlaces} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={region === "all"} onClick={() => setRegion("all")}>
              {t.allRegions}
            </FilterButton>
            {regions.map((item) => (
              <FilterButton key={item} active={region === item} onClick={() => setRegion(item)}>
                {t.regions[item]}
              </FilterButton>
            ))}
          </div>
        </div>
        {items.length === 0 ? <p className="mt-10 text-muted">{t.noMatches}</p> : null}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map((place, index) => {
            const featured = index === 0 && region === "all" && !query;
            return (
              <Reveal key={place.id} delay={(index % 2) * 100} className={featured ? "md:col-span-2" : ""}>
                <DestinationCard place={place} featured={featured} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function txName(locale: string) {
  const names: Record<string, string> = {
    en: "Sri Lanka",
    fr: "Sri Lanka",
    es: "Sri Lanka",
    de: "Sri Lanka",
    ru: "Шри-Ланка",
    zh: "斯里兰卡",
    ja: "スリランカ",
  };
  return names[locale] ?? "Sri Lanka";
}

export function DestinationDetail({ slug }: { slug: string }) {
  const { destinations, trips, locale, t, contentLoading } = useSite();
  const place = destinations.find((item) => item.slug === slug);
  const name = place ? tx(place.name, locale) : t.missingPlace;
  usePageTitle(name);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!place && contentLoading) return <DetailSkeleton />;

  if (!place) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-display text-4xl">{t.missingPlace}</h1>
        <Link href="/destinations" className="mt-6 inline-block text-lagoon">
          {t.backToPlaces}
        </Link>
      </div>
    );
  }

  const related = sortByOrder(trips.filter((trip) => trip.destinationSlugs.includes(place.slug)));

  return (
    <article>
      <div className="kenburns">
        <Photo src={place.image} alt={name} className="h-[46vh] min-h-72 w-full object-cover" />
      </div>
      <div className="mx-auto max-w-3xl px-5 py-10">
        <Link href="/destinations" className="text-sm font-semibold text-lagoon">
          {t.backToPlaces}
        </Link>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-lagoon">{t.regions[place.region]}</p>
        <h1 className="font-display mt-2 text-5xl">{name}</h1>
        <p className="mt-4 text-xl text-muted">{tx(place.summary, locale)}</p>
        <p className="mt-6 text-lg leading-relaxed">{tx(place.description, locale)}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Info title={t.bestTime} body={tx(place.bestTime, locale)} />
          <Info title={t.gettingThere} body={tx(place.gettingThere, locale)} />
        </div>
        <h2 className="font-display mt-10 text-3xl">{t.highlights}</h2>
        <ul className="mt-4 grid gap-2">
          {txList(place.highlights, locale).map((item, index) => (
            <Reveal as="li" key={item} delay={index * 70}>
              <span className="soft-lift block rounded-2xl border border-line bg-foam px-4 py-3">{item}</span>
            </Reveal>
          ))}
        </ul>
        {related.length ? (
          <>
            <h2 className="font-display mt-12 text-3xl">{t.relatedPlans}</h2>
            <div className="mt-5 grid gap-5">
              {related.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </>
        ) : null}
        <ReviewSection targetType="destination" targetSlug={place.slug} />
      </div>
    </article>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="soft-lift rounded-[24px] bg-foam p-5">
      <h2 className="text-xs uppercase tracking-[0.16em] text-muted">{title}</h2>
      <p className="mt-2 leading-relaxed">{body}</p>
    </div>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`chip rounded-full px-3 py-2 text-sm ${active ? "bg-lagoon-deep text-foam" : "bg-foam text-ink"}`}
    >
      {children}
    </button>
  );
}
