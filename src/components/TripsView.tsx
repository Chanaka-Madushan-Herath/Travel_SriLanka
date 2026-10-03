"use client";

import { DestinationCard } from "@/components/DestinationCard";
import { ReviewSection } from "@/components/ReviewSection";
import { TripCard } from "@/components/TripCard";
import { DetailSkeleton, Photo, Reveal } from "@/components/ui";
import { usePageTitle, useSite } from "@/context/SiteContext";
import { formatUsd, sortByOrder, tx, txList } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function TripsQuery() {
  const slug = useSearchParams().get("slug");
  if (slug) return <TripDetail slug={slug} />;
  return <TripList />;
}

export function TripList() {
  const { t, trips } = useSite();
  usePageTitle(t.nav.trips);
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sortByOrder(trips).filter((trip) => {
      if (!needle) return true;
      return [trip.slug, ...Object.values(trip.title), ...Object.values(trip.summary)].join(" ").toLowerCase().includes(needle);
    });
  }, [query, trips]);

  return (
    <div>
      <header className="relative overflow-hidden bg-lagoon-deep text-foam">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-orb hero-orb-gold" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <h1 className="hero-rise font-display max-w-3xl text-5xl">{t.tripsTitle}</h1>
          <p className="hero-rise mt-4 max-w-2xl text-lg text-foam/75" style={{ "--d": "140ms" } as React.CSSProperties}>
            {t.tripsLead}
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <label className="block max-w-sm">
          <span className="sr-only">{t.searchTrips}</span>
          <input className="field" value={query} placeholder={t.searchTrips} onChange={(event) => setQuery(event.target.value)} />
        </label>
        {items.length === 0 ? <p className="mt-10 text-muted">{t.noMatches}</p> : null}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map((trip, index) => (
            <Reveal key={trip.id} delay={(index % 2) * 100}>
              <TripCard trip={trip} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TripDetail({ slug }: { slug: string }) {
  const { trips, destinations, locale, t, contentLoading } = useSite();
  const trip = trips.find((item) => item.slug === slug);
  const title = trip ? tx(trip.title, locale) : t.missingTrip;
  usePageTitle(title);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!trip && contentLoading) return <DetailSkeleton />;

  if (!trip) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="font-display text-4xl">{t.missingTrip}</h1>
        <Link href="/trips" className="mt-6 inline-block text-lagoon">
          {t.backToTrips}
        </Link>
      </div>
    );
  }

  const places = trip.destinationSlugs
    .map((item) => destinations.find((place) => place.slug === item))
    .filter((place) => place !== undefined);

  return (
    <article>
      <div className="kenburns">
        <Photo src={trip.image} alt={title} className="h-[42vh] min-h-64 w-full object-cover" />
      </div>
      <div className="mx-auto max-w-3xl px-5 py-10">
        <Link href="/trips" className="text-sm font-semibold text-lagoon">
          {t.backToTrips}
        </Link>
        <h1 className="font-display mt-6 text-5xl">{title}</h1>
        <p className="mt-4 text-xl text-muted">{tx(trip.summary, locale)}</p>
        <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label={t.days} value={String(trip.durationDays)} />
          <Stat label={t.guideFare} value={formatUsd(trip.priceFromUsd, locale)} />
          <Stat label={t.pace} value={t.paces[trip.pace]} />
          <Stat label={t.group} value={tx(trip.groupSize, locale)} />
        </dl>
        <p className="mt-3 text-sm text-muted">{t.perPerson}</p>
        <p className="mt-6 text-lg leading-relaxed">{tx(trip.description, locale)}</p>
        <p className="mt-4 rounded-2xl bg-gold-soft px-4 py-3 text-sm">
          {t.bestTime}: {tx(trip.bestMonths, locale)}
        </p>
        <h2 className="font-display mt-12 text-3xl">{t.itinerary}</h2>
        <ol className="mt-5 grid gap-4">
          {trip.itinerary.map((day, index) => (
            <Reveal as="li" key={`${trip.id}-${index}`}>
              <div className="soft-lift rounded-[24px] border border-line bg-foam p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-gold">
                  {t.day} {index + 1}
                </p>
                <h3 className="font-display mt-1 text-2xl">{tx(day.title, locale)}</h3>
                <p className="mt-2 leading-relaxed">{tx(day.detail, locale)}</p>
                <p className="mt-3 text-sm text-muted">
                  {t.stay}: {tx(day.stay, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ListCard title={t.includes} items={txList(trip.includes, locale)} />
          <ListCard title={t.notIncluded} items={txList(trip.excludes, locale)} />
        </div>
        {places.length ? (
          <>
            <h2 className="font-display mt-12 text-3xl">{t.linkedPlaces}</h2>
            <div className="mt-5 grid gap-5">
              {places.map((place) => (
                <DestinationCard key={place.id} place={place} />
              ))}
            </div>
          </>
        ) : null}
        <ReviewSection targetType="trip" targetSlug={trip.slug} />
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-foam p-4">
      <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="font-display mt-1 text-2xl">{value}</dd>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] bg-foam p-5">
      <h3 className="font-display text-2xl">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
