import { content } from "@/data/content";

/**
 * The site is a static export, so only places and trips that were in the site
 * file at build time have their own page. Anything added later (for example in
 * Firestore) is opened through the query-string page instead.
 */
export function placeHref(slug: string): string {
  return content.destinations.some((place) => place.slug === slug)
    ? `/destinations/${slug}`
    : `/destinations/?slug=${encodeURIComponent(slug)}`;
}

export function tripHref(slug: string): string {
  return content.trips.some((trip) => trip.slug === slug) ? `/trips/${slug}` : `/trips/?slug=${encodeURIComponent(slug)}`;
}
