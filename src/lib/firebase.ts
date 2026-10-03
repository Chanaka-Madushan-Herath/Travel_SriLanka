import type { ContactMessage, Destination, FirebaseSettings, RemoteContent, RemoteReview, Review, Trip } from "./types";

export function firebaseReady(config?: FirebaseSettings): config is FirebaseSettings {
  return Boolean(config && config.apiKey.trim() && config.projectId.trim() && config.appId.trim());
}

async function getFirebaseApp(config: FirebaseSettings) {
  const { getApp, getApps, initializeApp } = await import("firebase/app");
  if (getApps().length) return getApp();
  return initializeApp({
    apiKey: config.apiKey.trim(),
    authDomain: config.authDomain.trim() || `${config.projectId.trim()}.firebaseapp.com`,
    projectId: config.projectId.trim(),
    appId: config.appId.trim(),
  });
}

export type NewMessage = Omit<ContactMessage, "id" | "createdAt">;

export async function submitRemoteMessage(config: FirebaseSettings, message: NewMessage): Promise<void> {
  const app = await getFirebaseApp(config);
  const { addDoc, collection, getFirestore, serverTimestamp } = await import("firebase/firestore");
  await addDoc(collection(getFirestore(app), "messages"), {
    name: message.name,
    email: message.email,
    phone: message.phone,
    subject: message.subject,
    message: message.message,
    trip: message.trip,
    createdAt: serverTimestamp(),
  });
}

export async function watchAdmin(
  config: FirebaseSettings,
  onChange: (email: string | null) => void,
): Promise<() => void> {
  const app = await getFirebaseApp(config);
  const { getAuth, onAuthStateChanged } = await import("firebase/auth");
  return onAuthStateChanged(getAuth(app), (user) => onChange(user?.email ?? null));
}

export async function signInAdmin(config: FirebaseSettings, email: string, password: string): Promise<void> {
  const app = await getFirebaseApp(config);
  const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
  await signInWithEmailAndPassword(getAuth(app), email.trim(), password);
}

export async function signOutAdmin(config: FirebaseSettings): Promise<void> {
  const app = await getFirebaseApp(config);
  const { getAuth, signOut } = await import("firebase/auth");
  await signOut(getAuth(app));
}

export async function fetchRemoteMessages(config: FirebaseSettings): Promise<ContactMessage[]> {
  const app = await getFirebaseApp(config);
  const { collection, getDocs, getFirestore, limit, orderBy, query } = await import("firebase/firestore");
  const snapshot = await getDocs(
    query(collection(getFirestore(app), "messages"), orderBy("createdAt", "desc"), limit(500)),
  );
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const created = data.createdAt && typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : null;
    return {
      id: doc.id,
      name: String(data.name ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phone ?? ""),
      subject: String(data.subject ?? ""),
      message: String(data.message ?? ""),
      trip: String(data.trip ?? ""),
      createdAt: created ? created.toISOString() : "",
    };
  });
}

/* ---------- Notes (reviews) ---------- */

export type NewReview = Omit<Review, "id" | "createdAt">;

function toRemoteReview(id: string, data: Record<string, unknown>): RemoteReview {
  const created = data.createdAt as { toDate?: () => Date } | null | undefined;
  const date = created && typeof created.toDate === "function" ? created.toDate() : null;
  const locale = typeof data.locale === "string" ? data.locale : "en";
  const targetType = data.targetType === "destination" || data.targetType === "trip" ? data.targetType : "site";
  return {
    id,
    name: String(data.name ?? ""),
    rating: Math.max(1, Math.min(5, Number(data.rating) || 5)),
    comment: String(data.comment ?? ""),
    locale: (locale in { en: 1, fr: 1, es: 1, de: 1, ru: 1, zh: 1, ja: 1 } ? locale : "en") as Review["locale"],
    targetType,
    targetSlug: String(data.targetSlug ?? ""),
    createdAt: date ? date.toISOString() : "",
    approved: data.approved === true,
  };
}

/** Anyone may submit a note. It stays hidden until the admin approves it. */
export async function submitRemoteReview(config: FirebaseSettings, review: NewReview): Promise<void> {
  const app = await getFirebaseApp(config);
  const { addDoc, collection, getFirestore, serverTimestamp } = await import("firebase/firestore");
  await addDoc(collection(getFirestore(app), "reviews"), {
    name: review.name,
    rating: review.rating,
    comment: review.comment,
    locale: review.locale,
    targetType: review.targetType,
    targetSlug: review.targetSlug,
    approved: false,
    createdAt: serverTimestamp(),
  });
}

/** Admin only: add a note that is visible straight away. */
export async function createApprovedReview(config: FirebaseSettings, review: NewReview): Promise<void> {
  const app = await getFirebaseApp(config);
  const { addDoc, collection, getFirestore, serverTimestamp } = await import("firebase/firestore");
  await addDoc(collection(getFirestore(app), "reviews"), {
    name: review.name,
    rating: review.rating,
    comment: review.comment,
    locale: review.locale,
    targetType: review.targetType,
    targetSlug: review.targetSlug,
    approved: true,
    createdAt: serverTimestamp(),
  });
}

/** Approved notes only. This is what visitors see. */
export async function fetchApprovedReviews(config: FirebaseSettings): Promise<Review[]> {
  const app = await getFirebaseApp(config);
  const { collection, getDocs, getFirestore, limit, query, where } = await import("firebase/firestore");
  const snapshot = await getDocs(
    query(collection(getFirestore(app), "reviews"), where("approved", "==", true), limit(300)),
  );
  return snapshot.docs
    .map((doc) => toRemoteReview(doc.id, doc.data()))
    .map((review): Review => {
      const { approved, ...rest } = review;
      void approved;
      return rest;
    });
}

/** Admin only: every note, approved or not. */
export async function fetchAllReviews(config: FirebaseSettings): Promise<RemoteReview[]> {
  const app = await getFirebaseApp(config);
  const { collection, getDocs, getFirestore, limit, orderBy, query } = await import("firebase/firestore");
  const snapshot = await getDocs(
    query(collection(getFirestore(app), "reviews"), orderBy("createdAt", "desc"), limit(500)),
  );
  return snapshot.docs.map((doc) => toRemoteReview(doc.id, doc.data()));
}

export async function setReviewApproved(config: FirebaseSettings, id: string, approved: boolean): Promise<void> {
  const app = await getFirebaseApp(config);
  const { doc, getFirestore, updateDoc } = await import("firebase/firestore");
  await updateDoc(doc(getFirestore(app), "reviews", id), { approved });
}

export async function deleteRemoteReview(config: FirebaseSettings, id: string): Promise<void> {
  const app = await getFirebaseApp(config);
  const { deleteDoc, doc, getFirestore } = await import("firebase/firestore");
  await deleteDoc(doc(getFirestore(app), "reviews", id));
}

/* ---------- Places and trip plans ---------- */

function isPlace(value: unknown): value is Destination {
  const item = value as Partial<Destination> | null;
  return Boolean(item && typeof item.id === "string" && typeof item.slug === "string" && item.name && typeof item.name === "object");
}

function isTrip(value: unknown): value is Trip {
  const item = value as Partial<Trip> | null;
  return Boolean(
    item && typeof item.id === "string" && typeof item.slug === "string" && item.title && typeof item.title === "object" && Array.isArray(item.itinerary),
  );
}

/** Firestore rejects `undefined`, so round-trip through JSON before writing. */
function plain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/**
 * Loads all places and trips. The `meta/content` document marks that the admin
 * has uploaded content; without it the site keeps using the built-in file.
 */
export async function fetchRemoteContent(config: FirebaseSettings): Promise<RemoteContent> {
  const app = await getFirebaseApp(config);
  const { collection, doc, getDoc, getDocs, getFirestore } = await import("firebase/firestore");
  const db = getFirestore(app);
  const marker = await getDoc(doc(db, "meta", "content"));
  if (!marker.exists()) return { active: false, destinations: [], trips: [] };
  const [places, trips] = await Promise.all([getDocs(collection(db, "places")), getDocs(collection(db, "trips"))]);
  return {
    active: true,
    destinations: places.docs.map((item) => ({ ...item.data(), id: item.id })).filter(isPlace),
    trips: trips.docs.map((item) => ({ ...item.data(), id: item.id })).filter(isTrip),
  };
}

export async function saveRemotePlace(config: FirebaseSettings, place: Destination): Promise<void> {
  const app = await getFirebaseApp(config);
  const { doc, getFirestore, setDoc } = await import("firebase/firestore");
  await setDoc(doc(getFirestore(app), "places", place.id), plain(place));
}

export async function saveRemoteTrip(config: FirebaseSettings, trip: Trip): Promise<void> {
  const app = await getFirebaseApp(config);
  const { doc, getFirestore, setDoc } = await import("firebase/firestore");
  await setDoc(doc(getFirestore(app), "trips", trip.id), plain(trip));
}

export async function deleteRemotePlace(config: FirebaseSettings, id: string): Promise<void> {
  const app = await getFirebaseApp(config);
  const { deleteDoc, doc, getFirestore } = await import("firebase/firestore");
  await deleteDoc(doc(getFirestore(app), "places", id));
}

export async function deleteRemoteTrip(config: FirebaseSettings, id: string): Promise<void> {
  const app = await getFirebaseApp(config);
  const { deleteDoc, doc, getFirestore } = await import("firebase/firestore");
  await deleteDoc(doc(getFirestore(app), "trips", id));
}

/** Replaces everything stored in Firestore with the given places and trips. */
export async function seedRemoteContent(config: FirebaseSettings, destinations: Destination[], trips: Trip[]): Promise<void> {
  const app = await getFirebaseApp(config);
  const { collection, doc, getDocs, getFirestore, serverTimestamp, writeBatch } = await import("firebase/firestore");
  const db = getFirestore(app);
  const [oldPlaces, oldTrips] = await Promise.all([getDocs(collection(db, "places")), getDocs(collection(db, "trips"))]);

  const writes: Array<(batch: ReturnType<typeof writeBatch>) => void> = [];
  const placeIds = new Set(destinations.map((place) => place.id));
  const tripIds = new Set(trips.map((trip) => trip.id));
  for (const place of destinations) writes.push((batch) => batch.set(doc(db, "places", place.id), plain(place)));
  for (const trip of trips) writes.push((batch) => batch.set(doc(db, "trips", trip.id), plain(trip)));
  for (const item of oldPlaces.docs) if (!placeIds.has(item.id)) writes.push((batch) => batch.delete(item.ref));
  for (const item of oldTrips.docs) if (!tripIds.has(item.id)) writes.push((batch) => batch.delete(item.ref));
  writes.push((batch) => batch.set(doc(db, "meta", "content"), { updatedAt: serverTimestamp() }));

  // A batch holds at most 500 writes.
  for (let start = 0; start < writes.length; start += 400) {
    const batch = writeBatch(db);
    for (const write of writes.slice(start, start + 400)) write(batch);
    await batch.commit();
  }
}

export async function deleteRemoteMessage(config: FirebaseSettings, id: string): Promise<void> {
  const app = await getFirebaseApp(config);
  const { deleteDoc, doc, getFirestore } = await import("firebase/firestore");
  await deleteDoc(doc(getFirestore(app), "messages", id));
}
