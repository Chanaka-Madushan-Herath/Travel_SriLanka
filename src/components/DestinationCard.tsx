"use client";

import { useSite } from "@/context/SiteContext";
import type { Destination } from "@/lib/types";
import { tx } from "@/lib/utils";
import Link from "next/link";
import { placeHref } from "@/lib/links";
import { Photo } from "./ui";

export function DestinationCard({ place, featured = false }: { place: Destination; featured?: boolean }) {
  const { locale, t } = useSite();
  const name = tx(place.name, locale);
  const href = placeHref(place.slug);

  return (
    <article className={`card-lift overflow-hidden rounded-[28px] border border-line bg-foam ${featured ? "md:grid md:grid-cols-2" : ""}`}>
      <Link href={href} className="img-zoom relative h-full">
        <Photo src={place.image} alt={name} className={`h-64 w-full object-cover ${featured ? "md:h-full md:min-h-80" : ""}`} />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(9,24,21,0.45),transparent)]" aria-hidden="true" />
        <span className="absolute left-4 top-4 rounded-full bg-lagoon-deep/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foam backdrop-blur">
          {t.regions[place.region]}
        </span>
      </Link>
      <div className="flex flex-col p-5 sm:p-6">
        <h3 className="font-display text-3xl leading-tight">
          <Link href={href}>{name}</Link>
        </h3>
        <p className="mt-3 text-muted">{tx(place.summary, locale)}</p>
        <Link href={href} className="link-arrow mt-5 text-sm font-semibold text-clay">
          {t.readPlace}
        </Link>
      </div>
    </article>
  );
}
