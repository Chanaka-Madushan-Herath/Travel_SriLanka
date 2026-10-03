"use client";

import { useSite } from "@/context/SiteContext";
import type { Trip } from "@/lib/types";
import { formatUsd, tx } from "@/lib/utils";
import Link from "next/link";
import { tripHref } from "@/lib/links";
import { Photo } from "./ui";

export function TripCard({ trip }: { trip: Trip }) {
  const { locale, t } = useSite();
  const title = tx(trip.title, locale);
  const href = tripHref(trip.slug);

  return (
    <article className="card-lift overflow-hidden rounded-[28px] border border-line bg-foam">
      <Link href={href} className="relative block">
        <span className="img-zoom">
          <Photo src={trip.image} alt={title} className="h-52 w-full object-cover" />
        </span>
        <span className="absolute left-4 top-4 rounded-full bg-foam/95 px-3 py-1 text-sm font-semibold text-ink shadow-sm backdrop-blur">
          {trip.durationDays} {t.days}
        </span>
      </Link>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-lagoon">{t.paces[trip.pace]}</p>
        <h3 className="font-display mt-2 text-3xl leading-tight">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="mt-3 text-muted">{tx(trip.summary, locale)}</p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <p>
            <span className="block text-xs uppercase tracking-[0.14em] text-muted">{t.guideFare}</span>
            <span className="font-display text-2xl">{formatUsd(trip.priceFromUsd, locale)}</span>
            <span className="mt-1 block text-xs text-muted">{t.perPerson}</span>
          </p>
          <Link href={href} className="btn btn-ink">
            {t.viewPlan}
          </Link>
        </div>
      </div>
    </article>
  );
}
