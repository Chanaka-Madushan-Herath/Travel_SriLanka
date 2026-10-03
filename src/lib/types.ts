export type Locale = "en" | "fr" | "es" | "de" | "ru" | "zh" | "ja";

export type L10n = Record<Locale, string>;

export type L10nList = Record<Locale, string[]>;

export type RegionId = "cultural" | "hills" | "south" | "east" | "north";

export type Pace = "relaxed" | "moderate" | "active";

export type ReviewTarget = "site" | "destination" | "trip";

export type Destination = {
  id: string;
  slug: string;
  region: RegionId;
  name: L10n;
  summary: L10n;
  description: L10n;
  bestTime: L10n;
  gettingThere: L10n;
  highlights: L10nList;
  image: string;
  featured: boolean;
  order: number;
};

export type ItineraryDay = {
  title: L10n;
  detail: L10n;
  stay: L10n;
};

export type Trip = {
  id: string;
  slug: string;
  title: L10n;
  summary: L10n;
  description: L10n;
  durationDays: number;
  priceFromUsd: number;
  pace: Pace;
  groupSize: L10n;
  bestMonths: L10n;
  includes: L10nList;
  excludes: L10nList;
  itinerary: ItineraryDay[];
  destinationSlugs: string[];
  image: string;
  featured: boolean;
  order: number;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  locale: Locale;
  targetType: ReviewTarget;
  targetSlug: string;
  createdAt: string;
};

/**
 * Places and trip plans stored in Firestore. `active` is false until the
 * admin has uploaded content, in which case the site file is used instead.
 */
export type RemoteContent = {
  active: boolean;
  destinations: Destination[];
  trips: Trip[];
};

/** A note stored in Firestore. Only approved notes are shown to visitors. */
export type RemoteReview = Review & { approved: boolean };

export type FirebaseSettings = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  trip: string;
  createdAt: string;
};

export type SiteSettings = {
  siteName: L10n;
  tagline: L10n;
  heroKicker: L10n;
  heroTitle: L10n;
  heroSubtitle: L10n;
  about: L10n;
  heroImage: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: L10n;
  hours: L10n;
  mapQuery: string;
  instagram: string;
  facebook: string;
  web3formsKey: string;
  firebase?: FirebaseSettings;
};

export type Database = {
  settings: SiteSettings;
  destinations: Destination[];
  trips: Trip[];
  reviews: Review[];
};

export type ReviewStore = {
  extra: Review[];
  hiddenIds: string[];
};

export type ContentDraft = {
  settings: SiteSettings;
  destinations: Destination[];
  trips: Trip[];
};
