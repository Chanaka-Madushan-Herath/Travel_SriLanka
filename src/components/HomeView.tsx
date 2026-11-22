"use client";

import { usePageTitle, useSite } from "@/context/SiteContext";
import { sortByOrder, tx } from "@/lib/utils";
import Link from "next/link";
import { ContactDetails } from "./Footer";
import { DestinationCard } from "./DestinationCard";
import { StartBand } from "./InquiryForms";
import { TripCard } from "./TripCard";
import { Reveal, Stars } from "./ui";
import { HeroShow, MoodTiles, PhotoBand, StatsStrip } from "./Vibe";

export function HomeView() {
  const { t, settings, destinations, trips, reviews, locale } = useSite();
  usePageTitle();
  const places = sortByOrder(destinations.filter((place) => place.featured));
  const shownPlaces = (places.length ? places : sortByOrder(destinations)).slice(0, 4);
  const plans = sortByOrder(trips.filter((trip) => trip.featured));
  const shownPlans = plans.length ? plans : sortByOrder(trips);
  const leadNote = reviews[0];

  return (
    <>
      <HeroShow />

      <Reveal>
        <MoodTiles />
      </Reveal>

      <StatsStrip />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">{t.placesTitle}</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted">{t.placesLead}</p>
          </div>
          <Link href="/destinations" className="btn btn-ink">
            {t.backToPlaces} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {shownPlaces.map((place, index) => (
            <Reveal key={place.id} delay={(index % 2) * 120} className={index === 0 ? "md:col-span-2" : ""}>
              <DestinationCard place={place} featured={index === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Reveal className="rounded-[32px] border border-line bg-foam p-6 sm:p-10">
          <h2 className="font-display text-4xl">{t.seasonTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.seasonLead}</p>
          <ol className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12">
            {t.months.map((month, index) => (
              <Reveal as="li" key={month} delay={index * 45}>
                <span className={`month-pill block rounded-2xl px-2 py-3 text-center text-sm font-semibold ${toneClass(index)}`}>{month}</span>
              </Reveal>
            ))}
          </ol>
          <ul className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-lagoon" />
              {t.seasonSouthwest}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gold" />
              {t.seasonNortheast}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-line bg-paper" />
              {t.seasonShoulder}
            </li>
          </ul>
        </Reveal>
      </section>

      <PhotoBand />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">{t.tripsTitle}</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted">{t.tripsLead}</p>
          </div>
          <Link href="/trips" className="btn btn-ink">
            {t.nav.trips} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {shownPlans.map((trip, index) => (
            <Reveal key={trip.id} delay={(index % 2) * 120}>
              <TripCard trip={trip} />
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <StartBand />
      </Reveal>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal className="rounded-[32px] bg-foam p-7 sm:p-10">
          <h2 className="font-display text-4xl">{t.aboutTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed">{tx(settings.about, locale)}</p>
          {leadNote ? (
            <blockquote className="mt-8 rounded-2xl border-l-4 border-gold bg-gold-soft/50 p-5">
              <Stars value={leadNote.rating} label={t.stars} />
              <p className="font-display mt-3 text-xl leading-snug">“{leadNote.comment}”</p>
              <footer className="mt-2 text-sm text-muted">— {leadNote.name}</footer>
            </blockquote>
          ) : null}
          <Link href="/reviews" className="link-arrow mt-6 inline-block text-sm font-semibold text-clay">
            {t.seeAllReviews}
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <aside className="soft-lift h-full rounded-[32px] border border-line bg-foam p-7">
            <h2 className="font-display text-3xl">{t.nav.contact}</h2>
            <div className="mt-5">
              <ContactDetails />
            </div>
            <Link href="/contact" className="btn btn-lagoon mt-6">
              {t.nav.contact} <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </Reveal>
      </section>
    </>
  );
}

function toneClass(index: number) {
  if ([11, 0, 1, 2, 3].includes(index)) return "bg-lagoon text-foam";
  if ([4, 5, 6, 7, 8].includes(index)) return "bg-gold text-ink";
  return "border border-line bg-paper text-muted";
}
