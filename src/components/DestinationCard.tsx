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
      <Link href={href} className="img-zoom h-full">
        <Photo src={place.image} alt={name} className={`h-64 w-full object-cover ${featured ? "md:h-full md:min-h-80" : ""}`} />
      </Link>
      <div className="flex flex-col p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-lagoon">{t.regions[place.region]}</p>
        <h3 className="font-display mt-2 text-3xl leading-tight">
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
