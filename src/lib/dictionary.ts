import type { Pace, RegionId } from "./types";
import { dictionaryEast } from "./dictionaryEast";
import { dictionaryLocales } from "./dictionaryLocales";

const { fr, es, de } = dictionaryLocales;
const { ru, zh, ja } = dictionaryEast;

export type Dictionary = {
  skip: string;
  backToTop: string;
  nav: {
    home: string;
    destinations: string;
    trips: string;
    reviews: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  langLabel: string;
  heroPrimary: string;
  heroSecondary: string;
  seasonTitle: string;
  seasonLead: string;
  seasonSouthwest: string;
  seasonNortheast: string;
  seasonShoulder: string;
  months: string[];
  placesTitle: string;
  placesLead: string;
  tripsTitle: string;
  tripsLead: string;
  reviewsTitle: string;
  reviewsLead: string;
  seeAllReviews: string;
  aboutTitle: string;
  contactBandTitle: string;
  contactBandBody: string;
  readPlace: string;
  viewPlan: string;
  days: string;
  from: string;
  perPerson: string;
  guideFare: string;
  bestTime: string;
  gettingThere: string;
  highlights: string;
  includes: string;
  notIncluded: string;
  itinerary: string;
  stay: string;
  pace: string;
  group: string;
  linkedPlaces: string;
  relatedPlans: string;
  backToPlaces: string;
  backToTrips: string;
  allRegions: string;
  searchPlaces: string;
  searchTrips: string;
  noMatches: string;
  missingPlace: string;
  missingTrip: string;
  regions: Record<RegionId, string>;
  paces: Record<Pace, string>;
  onThisPage: string;
  writeReview: string;
  reviewName: string;
  reviewComment: string;
  reviewRating: string;
  reviewTarget: string;
  reviewSite: string;
  reviewThanks: string;
  reviewEmailed: string;
  reviewLocal: string;
  reviewEmpty: string;
  reviewsPageLead: string;
  send: string;
  sending: string;
  required: string;
  contactTitle: string;
  contactLead: string;
  contactSuccess: string;
  messagesEmpty: string;
  contactError: string;
  contactNeedInbox: string;
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  yourSubject: string;
  yourMessage: string;
  tripInterest: string;
  noTrip: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  map: string;
  instagram: string;
  facebook: string;
  footerNote: string;
  rights: string;
  manageSite: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  adminTitle: string;
  adminLead: string;
  adminPassword: string;
  adminEnter: string;
  adminBadPassword: string;
  adminLogout: string;
  adminDraft: string;
  adminDownload: string;
  adminBackup: string;
  adminReset: string;
  adminImport: string;
  adminSaved: string;
  adminViewSite: string;
  tabSite: string;
  tabPlaces: string;
  tabTrips: string;
  tabReviews: string;
  tabMessages: string;
  addPlace: string;
  addTrip: string;
  addReview: string;
  save: string;
  edit: string;
  nameLabel: string;
  cancel: string;
  delete: string;
  confirmDelete: string;
  featured: string;
  order: string;
  slug: string;
  imageUrl: string;
  region: string;
  duration: string;
  price: string;
  destinationLinks: string;
  addDay: string;
  removeDay: string;
  day: string;
  linesHint: string;
  publicEmail: string;
  web3formsKey: string;
  web3formsHelp: string;
  newPassword: string;
  passwordHint: string;
  summary: string;
  description: string;
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  about: string;
  tagline: string;
  siteName: string;
  mapQuery: string;
  heroImage: string;
  importOk: string;
  importBad: string;
  resetConfirm: string;
  noReviewsAdmin: string;
  previewBanner: string;
  clearPreview: string;
  titleField: string;
  detailField: string;
  groupSize: string;
  bestMonths: string;
  language: string;
  commentOn: string;
  stars: string;
};

export const dictionary: Record<"en" | "fr" | "es" | "de" | "ru" | "zh" | "ja", Dictionary> = {
  en: {
    skip: "Skip to content",
    backToTop: "Back to top",
    nav: {
      home: "Home",
      destinations: "Places",
      trips: "Trip plans",
      reviews: "Notes",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    langLabel: "Language",
    heroPrimary: "See trip plans",
    heroSecondary: "Browse places",
    seasonTitle: "When the island is kind",
    seasonLead: "Sri Lanka has two coasts and two dry seasons. Pick the shore that is awake.",
    seasonSouthwest: "South & west coast, hill country",
    seasonNortheast: "East coast & north",
    seasonShoulder: "Shoulder months — mixed, still workable",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    placesTitle: "Places with a reason to stay",
    placesLead: "Not a catalogue of everything on the island. These are the stops the trip plans are built around.",
    tripsTitle: "Routes you can actually follow",
    tripsLead: "Day by day, with the nights named. Fares are a guide for a private car and a mid-range stay, not a live quote.",
    reviewsTitle: "Notes from the road",
    reviewsLead: "A few traveller notes, plus anything left on this browser.",
    seeAllReviews: "All notes",
    aboutTitle: "A small planning desk",
    contactBandTitle: "Tell us the dates. We will shape the route.",
    contactBandBody: "Write with how you travel, who is coming, and whether you want trains, wildlife, or quiet water.",
    readPlace: "Read the place",
    viewPlan: "Open the plan",
    days: "days",
    from: "From",
    perPerson: "per person, twin share",
    guideFare: "Guide fare",
    bestTime: "Best time",
    gettingThere: "Getting there",
    highlights: "Worth the stop",
    includes: "Included",
    notIncluded: "Not included",
    itinerary: "Day by day",
    stay: "Night",
    pace: "Pace",
    group: "Group",
    linkedPlaces: "Places on this route",
    relatedPlans: "Plans that pass through",
    backToPlaces: "All places",
    backToTrips: "All trip plans",
    allRegions: "All regions",
    searchPlaces: "Search places",
    searchTrips: "Search trip plans",
    noMatches: "Nothing matches that filter.",
    missingPlace: "That place is not on the map yet.",
    missingTrip: "That trip plan is not published.",
    regions: {
      cultural: "Cultural Triangle",
      hills: "Hill country",
      south: "South coast",
      east: "East coast",
      north: "North",
    },
    paces: { relaxed: "Relaxed", moderate: "Moderate", active: "Active" },
    onThisPage: "Notes on this page",
    writeReview: "Leave a note",
    reviewName: "Your name",
    reviewComment: "What should the next traveller know?",
    reviewRating: "Rating",
    reviewTarget: "About",
    reviewSite: "The studio",
    reviewThanks: "Saved on this browser.",
    reviewEmailed: "Saved here, and a copy was sent to the studio inbox.",
    reviewLocal: "Shown on this device. Connect Web3Forms in the desk if you also want these notes by email.",
    reviewEmpty: "No notes yet for this page.",
    reviewsPageLead: "Road notes from travellers. New notes stay on this browser, and a copy can be emailed to the studio.",
    send: "Send",
    sending: "Sending",
    required: "Please fill the required fields.",
    contactTitle: "Write to the desk",
    contactLead: "Dates, pace, and the kind of nights you want. We read every message and reply personally.",
    contactSuccess: "Thank you. Your message was sent and we will reply soon.",
    messagesEmpty: "No messages yet.",
    contactError: "The message could not be sent. Try again in a moment.",
    contactNeedInbox: "The inbox is not connected yet. Add a Web3Forms access key in the admin desk.",
    yourName: "Name",
    yourEmail: "Email",
    yourPhone: "Phone",
    yourSubject: "Subject",
    yourMessage: "Message",
    tripInterest: "Trip of interest",
    noTrip: "Not sure yet",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Hours",
    whatsapp: "WhatsApp",
    map: "Open map",
    instagram: "Instagram",
    facebook: "Facebook",
    footerNote: "Routes, seasons, and practical notes for travelling Sri Lanka without the rush.",
    rights: "Ceylon Trails",
    manageSite: "Manage site",
    notFoundTitle: "This path is not on the map",
    notFoundBody: "The page is missing. The places and trip plans are still where we left them.",
    backHome: "Back to the start",
    adminTitle: "Studio desk",
    adminLead: "Edit trips, places, and the details visitors see. Changes stay in this browser until you publish them.",
    adminPassword: "Password",
    adminEnter: "Enter",
    adminBadPassword: "That password does not match.",
    adminLogout: "Lock desk",
    adminDraft: "Unpublished edits are stored in this browser.",
    adminDownload: "Download content.ts",
    adminBackup: "Download backup JSON",
    adminReset: "Discard local edits",
    adminImport: "Import JSON",
    adminSaved: "Saved in this browser.",
    adminViewSite: "View site",
    tabSite: "Site details",
    tabPlaces: "Places",
    tabTrips: "Trip plans",
    tabReviews: "Notes",
    tabMessages: "Messages",
    addPlace: "Add place",
    addTrip: "Add trip plan",
    addReview: "Add a published note",
    save: "Save",
    edit: "Edit",
    nameLabel: "Name",
    cancel: "Cancel",
    delete: "Delete",
    confirmDelete: "Delete this item?",
    featured: "Featured on the home page",
    order: "Order",
    slug: "Slug",
    imageUrl: "Image URL",
    region: "Region",
    duration: "Days",
    price: "Guide fare (USD)",
    destinationLinks: "Place slugs, comma separated",
    addDay: "Add day",
    removeDay: "Remove day",
    day: "Day",
    linesHint: "One item per line.",
    publicEmail: "Public email",
    web3formsKey: "Web3Forms access key",
    web3formsHelp:
      "Create a free key at web3forms.com with your personal email. Paste it here. The contact form sends straight to that inbox. The key is meant to live in the public site.",
    newPassword: "Desk password",
    passwordHint: "This lock is stored in the site file. It keeps casual visitors out. It is not server authentication.",
    summary: "Summary",
    description: "Description",
    heroKicker: "Hero kicker",
    heroTitle: "Hero title",
    heroSubtitle: "Hero subtitle",
    about: "About",
    tagline: "Tagline",
    siteName: "Site name",
    mapQuery: "Map search",
    heroImage: "Hero image URL",
    importOk: "Backup imported into this browser.",
    importBad: "That file is not a Ceylon Trails backup.",
    resetConfirm: "Discard unpublished edits and notes saved in this browser?",
    noReviewsAdmin: "No notes to show.",
    previewBanner: "You are seeing unpublished edits saved in this browser.",
    clearPreview: "Show published version",
    titleField: "Title",
    detailField: "Detail",
    groupSize: "Group size",
    bestMonths: "Best months",
    language: "Language of the note",
    commentOn: "Attach to",
    stars: "stars",
  },
  fr,
  es,
  de,
  ru,
  zh,
  ja,
};
