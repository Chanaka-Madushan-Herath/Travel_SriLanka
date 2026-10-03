"use client";

import { dictionary, type Dictionary } from "@/lib/dictionary";
import {
  clearDraft,
  LOCALE_KEY,
  publishedContent,
  readDraft,
  readMessages,
  readRemoteCache,
  readReviewStore,
  reviewStoreFromList,
  visibleReviews,
  writeDraft,
  writeMessages,
  writeRemoteCache,
  writeReviewStore,
} from "@/lib/storage";
import type {
  ContactMessage,
  ContentDraft,
  Database,
  Destination,
  Locale,
  RemoteContent,
  Review,
  ReviewStore,
  SiteSettings,
  Trip,
} from "@/lib/types";
import { fetchApprovedReviews, fetchRemoteContent, firebaseReady } from "@/lib/firebase";
import { htmlLang, isLocale } from "@/lib/locales";
import { tx } from "@/lib/utils";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type SiteContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  settings: SiteSettings;
  destinations: Destination[];
  trips: Trip[];
  /** Where places and trips come from: Firestore once the admin has uploaded them, otherwise the site file. */
  contentSource: "firestore" | "site";
  /** True while Firestore content is still loading for the first time (so a missing page is not an error yet). */
  contentLoading: boolean;
  /** Fetches places and trips from Firestore again. Resolves to null when Firebase is off or the request failed. */
  reloadContent: () => Promise<RemoteContent | null>;
  /** Everything visitors see: published notes plus approved notes from Firestore. */
  reviews: Review[];
  /** Notes kept in the site file and this browser (not Firestore). */
  localReviews: Review[];
  refreshRemoteReviews: () => void;
  usingDraft: boolean;
  hydrated: boolean;
  saveContent: (draft: ContentDraft) => void;
  importBackup: (database: Database) => void;
  clearDraftOnly: () => void;
  resetLocal: () => void;
  addReview: (review: Review) => void;
  hideReview: (id: string) => void;
  messages: ContactMessage[];
  addMessage: (message: ContactMessage) => void;
  deleteMessage: (id: string) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const published = useMemo(() => publishedContent(), []);
  const [locale, setLocaleState] = useState<Locale>("en");
  const [draft, setDraft] = useState<ContentDraft | null>(null);
  const [reviewStore, setReviewStore] = useState<ReviewStore>({ extra: [], hiddenIds: [] });
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [remoteReviews, setRemoteReviews] = useState<Review[]>([]);
  const [remoteTick, setRemoteTick] = useState(0);
  const [remoteContent, setRemoteContent] = useState<RemoteContent | null>(null);
  const [contentStatus, setContentStatus] = useState<"idle" | "ready" | "error">("idle");

  useEffect(() => {
    const storedLocale = localStorage.getItem(LOCALE_KEY);
    if (isLocale(storedLocale)) setLocaleState(storedLocale);
    setRemoteContent(readRemoteCache());
    setDraft(readDraft());
    setReviewStore(readReviewStore());
    setMessages(readMessages());
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
    document.documentElement.dataset.locale = locale;
    if (!hydrated) return;
    localStorage.setItem(LOCALE_KEY, locale);
  }, [locale, hydrated]);

  const settings = draft?.settings ?? published.settings;
  const localReviews = visibleReviews(published.reviews, reviewStore);

  const firebase = settings.firebase;
  const firebaseKey = firebaseReady(firebase) ? `${firebase.projectId}|${firebase.apiKey}|${firebase.appId}` : "";

  // Places and trips: Firestore wins once it has been filled; otherwise the draft or site file is used.
  const remote = firebaseKey && remoteContent?.active ? remoteContent : null;
  const destinations = remote ? remote.destinations : (draft?.destinations ?? published.destinations);
  const trips = remote ? remote.trips : (draft?.trips ?? published.trips);
  const contentLoading = Boolean(firebaseKey) && contentStatus === "idle" && !remoteContent;

  const reloadContent = useCallback(async (): Promise<RemoteContent | null> => {
    if (!firebaseKey || !firebaseReady(firebase)) return null;
    try {
      const next = await fetchRemoteContent(firebase);
      setRemoteContent(next);
      writeRemoteCache(next);
      setContentStatus("ready");
      return next;
    } catch {
      setContentStatus("error");
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  useEffect(() => {
    if (!hydrated) return;
    if (!firebaseKey) {
      setContentStatus("idle");
      return;
    }
    void reloadContent();
  }, [hydrated, firebaseKey, reloadContent]);

  useEffect(() => {
    if (!hydrated || !firebaseKey || !firebaseReady(firebase)) {
      setRemoteReviews([]);
      return;
    }
    let cancelled = false;
    fetchApprovedReviews(firebase)
      .then((list) => {
        if (!cancelled) setRemoteReviews(list);
      })
      .catch(() => {
        if (!cancelled) setRemoteReviews([]);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, firebaseKey, remoteTick]);

  const reviews = useMemo(() => {
    if (!remoteReviews.length) return localReviews;
    const merged = new Map(localReviews.map((review) => [review.id, review]));
    for (const review of remoteReviews) merged.set(review.id, review);
    return [...merged.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [localReviews, remoteReviews]);

  const value = useMemo<SiteContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: dictionary[locale],
      settings,
      destinations,
      trips,
      contentSource: remote ? "firestore" : "site",
      contentLoading,
      reloadContent,
      reviews,
      localReviews,
      refreshRemoteReviews: () => setRemoteTick((value) => value + 1),
      usingDraft: draft !== null,
      hydrated,
      saveContent: (next) => {
        writeDraft(next);
        setDraft(structuredClone(next));
      },
      importBackup: (database) => {
        const next = {
          settings: database.settings,
          destinations: database.destinations,
          trips: database.trips,
        };
        writeDraft(next);
        setDraft(next);
        const store = reviewStoreFromList(published.reviews, database.reviews);
        writeReviewStore(store);
        setReviewStore(store);
      },
      clearDraftOnly: () => {
        clearDraft();
        setDraft(null);
      },
      resetLocal: () => {
        clearDraft();
        setDraft(null);
        const empty = { extra: [], hiddenIds: [] };
        writeReviewStore(empty);
        setReviewStore(empty);
      },
      addReview: (review) => {
        setReviewStore((current) => {
          const next = { ...current, extra: [review, ...current.extra.filter((item) => item.id !== review.id)] };
          writeReviewStore(next);
          return next;
        });
      },
      hideReview: (id) => {
        setReviewStore((current) => {
          const next = {
            extra: current.extra.filter((item) => item.id !== id),
            hiddenIds: current.hiddenIds.includes(id) ? current.hiddenIds : [...current.hiddenIds, id],
          };
          writeReviewStore(next);
          return next;
        });
      },
      messages,
      addMessage: (message) => {
        setMessages((current) => {
          const next = [message, ...current.filter((item) => item.id !== message.id)];
          writeMessages(next);
          return next;
        });
      },
      deleteMessage: (id) => {
        setMessages((current) => {
          const next = current.filter((item) => item.id !== id);
          writeMessages(next);
          return next;
        });
      },
    }),
    [locale, settings, destinations, trips, remote, contentLoading, reloadContent, reviews, localReviews, messages, draft, hydrated, published.reviews],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteContextValue {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used within SiteProvider");
  return value;
}

export function usePageTitle(title?: string) {
  const { settings, locale } = useSite();
  useEffect(() => {
    const name = tx(settings.siteName, locale);
    document.title = title ? `${title} · ${name}` : name;
  }, [title, settings, locale]);
}
