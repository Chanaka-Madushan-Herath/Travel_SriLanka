"use client";

import { useSite } from "@/context/SiteContext";
import type { Trip } from "@/lib/types";
import { tx } from "@/lib/utils";
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
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(9,24,21,0.45),transparent)]" aria-hidden="true" />
        <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-sm font-semibold text-ink shadow-sm">
          {trip.durationDays} {t.days}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-lagoon-deep/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foam backdrop-blur">
          {t.paces[trip.pace]}
        </span>
      </Link>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-lagoon">
          {t.bestTime}: {tx(trip.bestMonths, locale)}
        </p>
        <h3 className="font-display mt-2 text-3xl leading-tight">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="mt-3 text-muted">{tx(trip.summary, locale)}</p>
        <div className="mt-5 flex justify-end">
          <Link href={href} className="btn btn-ink">
            {t.viewPlan}
          </Link>
        </div>
      </div>
    </article>
  );
}
