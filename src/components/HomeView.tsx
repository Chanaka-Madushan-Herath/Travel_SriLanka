"use client";

import { usePageTitle, useSite } from "@/context/SiteContext";
import { sortByOrder, tx } from "@/lib/utils";
import Link from "next/link";
import { ContactDetails } from "./Footer";
import { DestinationCard } from "./DestinationCard";
import { TripCard } from "./TripCard";
import { Photo, Reveal, Stars, Tilt } from "./ui";

function delay(ms: number) {
  return { "--d": `${ms}ms` } as React.CSSProperties;
}

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
      <section className="relative bg-lagoon-deep text-foam">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-orb hero-orb-gold" />
          <span className="hero-orb hero-orb-teal" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-5 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="hero-rise text-xs uppercase tracking-[0.22em] text-gold">{tx(settings.heroKicker, locale)}</p>
            <h1 className="hero-rise font-display mt-4 text-5xl leading-[1.02] sm:text-6xl" style={delay(120)}>
              {tx(settings.heroTitle, locale)}
            </h1>
            <p className="hero-rise mt-6 max-w-xl text-lg text-foam/80" style={delay(260)}>
              {tx(settings.heroSubtitle, locale)}
            </p>
            <div className="hero-rise mt-8 flex flex-wrap gap-3" style={delay(400)}>
              <Link className="btn btn-gold" href="/trips">
                {t.heroPrimary}
              </Link>
              <Link className="btn btn-line" href="/destinations">
                {t.heroSecondary}
              </Link>
            </div>
          </div>
          <div className="hero-pop lg:col-span-6" style={delay(250)}>
            <Tilt>
              <div className="relative">
                <div className="kenburns rounded-[32px] shadow-2xl shadow-black/40">
                  <Photo
                    src={settings.heroImage}
                    alt={tx(settings.siteName, locale)}
                    className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
                  />
                </div>
                <div className="float-slow mt-4 rounded-[24px] bg-foam p-5 text-ink sm:absolute sm:-bottom-8 sm:-left-6 sm:mt-0 sm:max-w-xs sm:shadow-xl">
                  <p className="text-xs uppercase tracking-[0.16em] text-lagoon">{tx(settings.siteName, locale)}</p>
                  <p className="font-display mt-2 text-2xl leading-tight">{tx(settings.tagline, locale)}</p>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4 pt-20">
        <Reveal>
          <h2 className="font-display text-4xl">{t.seasonTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.seasonLead}</p>
        </Reveal>
        <ol className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12">
          {t.months.map((month, index) => (
            <Reveal as="li" key={month} delay={index * 45}>
              <span className={`month-pill block rounded-2xl px-2 py-3 text-center text-sm font-semibold ${toneClass(index)}`}>
                {month}
              </span>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={200}>
          <ul className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-lagoon" />
              {t.seasonSouthwest}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-gold" />
              {t.seasonNortheast}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-line bg-foam" />
              {t.seasonShoulder}
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl">{t.placesTitle}</h2>
            <p className="mt-3 max-w-2xl text-muted">{t.placesLead}</p>
          </div>
          <Link href="/destinations" className="link-arrow text-sm font-semibold text-lagoon">
            {t.backToPlaces}
          </Link>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {shownPlaces.map((place, index) => (
            <Reveal key={place.id} delay={(index % 2) * 120} className={index === 0 ? "md:col-span-2" : ""}>
              <DestinationCard place={place} featured={index === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <Reveal>
          <h2 className="font-display text-4xl">{t.tripsTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{t.tripsLead}</p>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {shownPlans.map((trip, index) => (
            <Reveal key={trip.id} delay={(index % 2) * 120}>
              <TripCard trip={trip} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-16 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal className="rounded-[32px] bg-foam p-7 sm:p-10">
          <h2 className="font-display text-4xl">{t.aboutTitle}</h2>
          <p className="mt-4 text-lg leading-relaxed">{tx(settings.about, locale)}</p>
          {leadNote ? (
            <blockquote className="mt-8 border-l-4 border-gold pl-4">
              <Stars value={leadNote.rating} label={t.stars} />
              <p className="mt-3 text-lg">{leadNote.comment}</p>
              <footer className="mt-2 text-sm text-muted">{leadNote.name}</footer>
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
          </aside>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <Reveal className="relative overflow-hidden rounded-[32px] bg-lagoon-deep px-6 py-10 text-foam sm:px-10">
          <div className="hero-bg" aria-hidden="true">
            <span className="hero-orb hero-orb-gold" />
          </div>
          <div className="relative">
            <h2 className="font-display max-w-xl text-4xl">{t.contactBandTitle}</h2>
            <p className="mt-3 max-w-xl text-foam/75">{t.contactBandBody}</p>
            <Link href="/contact" className="btn btn-gold mt-6">
              {t.nav.contact}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function toneClass(index: number) {
  if ([11, 0, 1, 2, 3].includes(index)) return "bg-lagoon text-foam";
  if ([4, 5, 6, 7, 8].includes(index)) return "bg-gold text-ink";
  return "border border-line bg-foam text-muted";
}
