import { content } from "@/data/content";
import type { ContactMessage, ContentDraft, Database, RemoteContent, Review, ReviewStore } from "./types";

export const DRAFT_KEY = "ceylon-trails-draft-v1";
export const REVIEWS_KEY = "ceylon-trails-reviews-v1";
export const MESSAGES_KEY = "ceylon-trails-messages-v1";
export const LOCALE_KEY = "ceylon-trails-locale";
const emptyReviews = (): ReviewStore => ({ extra: [], hiddenIds: [] });

export function publishedContent(): Database {
  return structuredClone(content);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function parseDraft(value: unknown): ContentDraft | null {
  if (!isRecord(value)) return null;
  if (!isRecord(value.settings)) return null;
  if (!Array.isArray(value.destinations) || !Array.isArray(value.trips)) return null;
  if (typeof value.settings.web3formsKey !== "string") return null;
  // Older drafts and backups carried a desk password. It is no longer used, so drop it.
  delete value.settings.adminPassword;
  return value as ContentDraft;
}

export function parseDatabase(value: unknown): Database | null {
  const draft = parseDraft(value);
  if (!draft || !isRecord(value) || !Array.isArray(value.reviews)) return null;
  return value as Database;
}

export function readDraft(): ContentDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return parseDraft(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeDraft(draft: ContentDraft): void {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
}

export function readReviewStore(): ReviewStore {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) return emptyReviews();
    const parsed = JSON.parse(raw) as Partial<ReviewStore>;
    return {
      extra: Array.isArray(parsed.extra) ? (parsed.extra as Review[]) : [],
      hiddenIds: Array.isArray(parsed.hiddenIds) ? parsed.hiddenIds.filter((id) => typeof id === "string") : [],
    };
  } catch {
    return emptyReviews();
  }
}

export function writeReviewStore(store: ReviewStore): void {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(store));
}

export function readMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ContactMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.id === "string" && typeof item.message === "string");
  } catch {
    return [];
  }
}

export function writeMessages(messages: ContactMessage[]): void {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export const REMOTE_CONTENT_KEY = "ceylon-trails-remote-v1";

/** The last places and trips loaded from Firestore, so the next visit renders at once. */
export function readRemoteCache(): RemoteContent | null {
  try {
    const raw = localStorage.getItem(REMOTE_CONTENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<RemoteContent>;
    if (!parsed || !Array.isArray(parsed.destinations) || !Array.isArray(parsed.trips)) return null;
    return { active: parsed.active === true, destinations: parsed.destinations, trips: parsed.trips };
  } catch {
    return null;
  }
}

export function writeRemoteCache(content: RemoteContent): void {
  try {
    localStorage.setItem(REMOTE_CONTENT_KEY, JSON.stringify(content));
  } catch {
    // Storage may be full or blocked; the cache is only a speed-up.
  }
}

export function visibleReviews(published: Review[], store: ReviewStore): Review[] {
  const extrasById = new Map(store.extra.filter((review) => review?.id).map((review) => [review.id, review]));
  const hidden = new Set(store.hiddenIds);
  const merged = new Map<string, Review>();

  for (const review of published) {
    if (hidden.has(review.id)) continue;
    merged.set(review.id, extrasById.get(review.id) ?? review);
  }

  for (const review of store.extra) {
    if (!review?.id || hidden.has(review.id)) continue;
    merged.set(review.id, review);
  }

  return [...merged.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function reviewStoreFromList(published: Review[], nextReviews: Review[]): ReviewStore {
  const publishedById = new Map(published.map((review) => [review.id, JSON.stringify(review)]));
  const nextIds = new Set(nextReviews.map((review) => review.id));
  return {
    hiddenIds: published.filter((review) => !nextIds.has(review.id)).map((review) => review.id),
    extra: nextReviews.filter((review) => publishedById.get(review.id) !== JSON.stringify(review)),
  };
}

export function toContentFile(database: Database): string {
  return `import type { Database } from "@/lib/types";\n\nexport const content = ${JSON.stringify(database, null, 2)} satisfies Database;\n`;
}
