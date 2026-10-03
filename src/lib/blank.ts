import type { Destination, ItineraryDay, L10n, L10nList, Trip } from "./types";
import { uid } from "./utils";

export const emptyText = (): L10n => ({ en: "", fr: "", es: "", de: "", ru: "", zh: "", ja: "" });
export const emptyList = (): L10nList => ({
  en: [],
  fr: [],
  es: [],
  de: [],
  ru: [],
  zh: [],
  ja: [],
});

export function blankDay(): ItineraryDay {
  return { title: emptyText(), detail: emptyText(), stay: emptyText() };
}

export function blankDestination(order: number): Destination {
  return {
    id: uid("place"),
    slug: "",
    region: "cultural",
    name: emptyText(),
    summary: emptyText(),
    description: emptyText(),
    bestTime: emptyText(),
    gettingThere: emptyText(),
    highlights: emptyList(),
    image: "",
    featured: false,
    order,
  };
}

export function blankTrip(order: number): Trip {
  return {
    id: uid("trip"),
    slug: "",
    title: emptyText(),
    summary: emptyText(),
    description: emptyText(),
    durationDays: 3,
    priceFromUsd: 0,
    pace: "moderate",
    groupSize: emptyText(),
    bestMonths: emptyText(),
    includes: emptyList(),
    excludes: emptyList(),
    itinerary: [blankDay()],
    destinationSlugs: [],
    image: "",
    featured: false,
    order,
  };
}
