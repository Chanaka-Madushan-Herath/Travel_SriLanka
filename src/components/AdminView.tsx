"use client";

import { Field } from "@/components/ui";
import { usePageTitle, useSite } from "@/context/SiteContext";
import { blankDay, blankDestination, blankTrip, emptyText } from "@/lib/blank";
import {
  createApprovedReview,
  deleteRemoteMessage,
  deleteRemotePlace,
  deleteRemoteReview,
  deleteRemoteTrip,
  fetchAllReviews,
  fetchRemoteMessages,
  firebaseReady,
  saveRemotePlace,
  saveRemoteTrip,
  seedRemoteContent,
  setReviewApproved,
  signInAdmin,
  signOutAdmin,
  watchAdmin,
} from "@/lib/firebase";
import { firebaseText } from "@/lib/firebaseText";
import { locales } from "@/lib/locales";
import { parseDatabase, toContentFile } from "@/lib/storage";
import type { ContactMessage, Destination, FirebaseSettings, ItineraryDay, L10n, L10nList, Locale, Pace, RegionId, RemoteReview, ReviewTarget, Trip } from "@/lib/types";
import { downloadText, formatDate, linesToList, listToLines, slugify, tx, uid } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

function toLinesState(list: L10nList): Record<Locale, string> {
  return {
    en: listToLines(list.en ?? []),
    fr: listToLines(list.fr ?? []),
    es: listToLines(list.es ?? []),
    de: listToLines(list.de ?? []),
    ru: listToLines(list.ru ?? []),
    zh: listToLines(list.zh ?? []),
    ja: listToLines(list.ja ?? []),
  };
}

function fromLinesState(state: Record<Locale, string>): L10nList {
  return {
    en: linesToList(state.en),
    fr: linesToList(state.fr),
    es: linesToList(state.es),
    de: linesToList(state.de),
    ru: linesToList(state.ru),
    zh: linesToList(state.zh),
    ja: linesToList(state.ja),
  };
}

const emptyFirebase: FirebaseSettings = { apiKey: "", authDomain: "", projectId: "", appId: "" };

const copy: Record<Locale, { name: string; slug: string; days: string; price: string }> = {
  en: { name: "Add an English name.", slug: "That slug is already used.", days: "Add at least one day.", price: "Enter a guide fare." },
  fr: { name: "Ajoutez un nom en anglais.", slug: "Ce slug est déjà utilisé.", days: "Ajoutez au moins un jour.", price: "Indiquez un tarif." },
  es: { name: "Añada un nombre en inglés.", slug: "Ese slug ya se usa.", days: "Añada al menos un día.", price: "Indique una tarifa." },
  de: { name: "Fügen Sie einen englischen Namen hinzu.", slug: "Dieser Slug wird schon verwendet.", days: "Fügen Sie mindestens einen Tag hinzu.", price: "Geben Sie einen Richtpreis ein." },
  ru: { name: "Добавьте английское название.", slug: "Такой slug уже используется.", days: "Добавьте хотя бы один день.", price: "Укажите ориентир цены." },
  zh: { name: "请填写英文名称。", slug: "这个 slug 已被使用。", days: "至少添加一天。", price: "请填写参考费用。" },
  ja: { name: "英語の名前を入れてください。", slug: "その slug は既に使われています。", days: "少なくとも一日追加してください。", price: "目安料金を入れてください。" },
};

export function AdminView() {
  const { t, hydrated, settings } = useSite();
  usePageTitle(t.adminTitle);

  if (!hydrated) return <div className="min-h-[40vh]" />;

  // With Firebase configured, the desk is protected by the Firebase admin sign-in.
  // Without it nothing here can change the live site, so the desk simply opens.
  if (firebaseReady(settings.firebase)) {
    const config = settings.firebase;
    return (
      <FirebaseGate config={config} frame>
        {() => <Desk onLogout={() => signOutAdmin(config).catch(() => undefined)} />}
      </FirebaseGate>
    );
  }

  return <Desk />;
}

function Desk({ onLogout }: { onLogout?: () => void }) {
  const site = useSite();
  const { t, settings, destinations, trips, localReviews: reviews, messages, saveContent, resetLocal, importBackup, hideReview, addReview, deleteMessage } = site;
  const [tab, setTab] = useState<"site" | "places" | "trips" | "reviews" | "messages">("site");
  const [notice, setNotice] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [placeDraft, setPlaceDraft] = useState<Destination | null>(null);
  const [tripDraft, setTripDraft] = useState<Trip | null>(null);
  const ft = firebaseText[site.locale];
  const fbConfig = firebaseReady(settings.firebase) ? settings.firebase : null;

  function flash(message: string) {
    setNotice(message);
  }

  /**
   * Runs a change against Firestore. If places and trips have never been
   * uploaded, everything currently shown is uploaded first so nothing is lost.
   */
  async function remoteRun(action: (config: FirebaseSettings) => Promise<void>, after?: () => void) {
    if (!fbConfig) return;
    try {
      const current = await site.reloadContent();
      if (!current) throw new Error("load");
      if (!current.active) await seedRemoteContent(fbConfig, destinations, trips);
      await action(fbConfig);
      await site.reloadContent();
      flash(ft.contentSaved);
      after?.();
    } catch (caught) {
      const code = errorCode(caught);
      flash(code ? `${ft.contentError} (${code})` : ft.contentError);
    }
  }

  /** With Firebase set up, places and trips need the Firebase admin sign-in as well. */
  function gated(node: React.ReactNode) {
    if (!fbConfig) return node;
    return (
      <FirebaseGate config={fbConfig} title={ft.contentSignIn}>
        {() => (
          <>
            <ContentBar config={fbConfig} onFlash={flash} />
            {node}
          </>
        )}
      </FirebaseGate>
    );
  }

  function snapshot() {
    return { settings, destinations, trips, reviews };
  }

  const editingPlace = placeDraft;
  const editingTrip = tripDraft;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl">{t.adminTitle}</h1>
          <p className="mt-3 max-w-2xl text-muted">{t.adminLead}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-ink" href="/">
            {t.adminViewSite}
          </Link>
          {onLogout ? (
            <button className="btn btn-ink" type="button" onClick={onLogout}>
              {t.adminLogout}
            </button>
          ) : null}
        </div>
      </div>
      <p className="mt-4 text-sm text-lagoon">{t.adminDraft}</p>
      {!fbConfig ? <p className="mt-3 rounded-2xl bg-gold-soft px-4 py-3 text-sm">{ft.deskOpenNote}</p> : null}
      {notice ? <p className="mt-3 rounded-2xl bg-gold-soft px-4 py-3 text-sm">{notice}</p> : null}
      <div className="mt-6 flex flex-wrap gap-2">
        <button className="btn btn-ink" type="button" onClick={() => downloadText("content.ts", toContentFile(snapshot()), "text/typescript")}>
          {t.adminDownload}
        </button>
        <button
          className="btn btn-ink"
          type="button"
          onClick={() => downloadText("ceylon-trails-backup.json", JSON.stringify(snapshot(), null, 2), "application/json")}
        >
          {t.adminBackup}
        </button>
        <label className="btn btn-ink cursor-pointer">
          {t.adminImport}
          <input
            className="sr-only"
            type="file"
            accept="application/json,.json"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              try {
                const parsed = parseDatabase(JSON.parse(await file.text()));
                if (!parsed) {
                  flash(t.importBad);
                  return;
                }
                importBackup(parsed);
                setPlaceDraft(null);
                setTripDraft(null);
                setFormKey((value) => value + 1);
                flash(t.importOk);
              } catch {
                flash(t.importBad);
              }
            }}
          />
        </label>
        <button
          className="btn btn-ink"
          type="button"
          onClick={() => {
            if (confirm(t.resetConfirm)) {
              resetLocal();
              setPlaceDraft(null);
              setTripDraft(null);
              setFormKey((value) => value + 1);
              flash(t.clearPreview);
            }
          }}
        >
          {t.adminReset}
        </button>
      </div>
      <div className="mt-8 flex flex-wrap gap-2" role="tablist">
        {(
          [
            ["site", t.tabSite],
            ["places", t.tabPlaces],
            ["trips", t.tabTrips],
            ["reviews", t.tabReviews],
            ["messages", messages.length ? `${t.tabMessages} (${messages.length})` : t.tabMessages],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`rounded-full px-4 py-2 ${tab === id ? "bg-lagoon-deep text-foam" : "bg-foam"}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "site" ? (
        <SiteForm
          key={formKey}
          onSave={(next) => {
            saveContent({ settings: next, destinations, trips });
            flash(t.adminSaved);
          }}
        />
      ) : null}

      {tab === "places" ? gated(
        <section className="mt-8">
          <button
            className="btn btn-lagoon"
            type="button"
            onClick={() => setPlaceDraft(blankDestination(destinations.length + 1))}
          >
            {t.addPlace}
          </button>
          <ul className="mt-5 grid gap-3">
            {destinations
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((place) => (
                <li key={place.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-foam px-4 py-3">
                  <span>
                    {tx(place.name, site.locale) || place.slug || place.id}
                    <span className="ml-2 text-sm text-muted">{place.slug}</span>
                  </span>
                  <span className="flex gap-2">
                    <button className="btn btn-ink" type="button" onClick={() => setPlaceDraft(place)}>
                      {t.edit}
                    </button>
                    <button
                      className="btn btn-clay"
                      type="button"
                      onClick={() => {
                        if (!confirm(t.confirmDelete)) return;
                        if (fbConfig) {
                          void remoteRun((config) => deleteRemotePlace(config, place.id), () => {
                            if (placeDraft?.id === place.id) setPlaceDraft(null);
                          });
                          return;
                        }
                        saveContent({ settings, destinations: destinations.filter((item) => item.id !== place.id), trips });
                        if (placeDraft?.id === place.id) setPlaceDraft(null);
                      }}
                    >
                      {t.delete}
                    </button>
                  </span>
                </li>
              ))}
          </ul>
          {editingPlace ? (
            <PlaceEditor
              key={editingPlace.id}
              initial={editingPlace}
              others={destinations}
              onCancel={() => setPlaceDraft(null)}
              onSave={(place) => {
                if (fbConfig) {
                  void remoteRun((config) => saveRemotePlace(config, place), () => setPlaceDraft(null));
                  return;
                }
                const exists = destinations.some((item) => item.id === place.id);
                saveContent({
                  settings,
                  destinations: exists ? destinations.map((item) => (item.id === place.id ? place : item)) : [...destinations, place],
                  trips,
                });
                flash(t.adminSaved);
                setPlaceDraft(null);
              }}
            />
          ) : null}
        </section>,
      ) : null}

      {tab === "trips" ? gated(
        <section className="mt-8">
          <button
            className="btn btn-lagoon"
            type="button"
            onClick={() => setTripDraft(blankTrip(trips.length + 1))}
          >
            {t.addTrip}
          </button>
          <ul className="mt-5 grid gap-3">
            {trips
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((trip) => (
                <li key={trip.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-foam px-4 py-3">
                  <span>
                    {tx(trip.title, site.locale) || trip.slug || trip.id}
                    <span className="ml-2 text-sm text-muted">
                      {trip.durationDays} {t.days}
                    </span>
                  </span>
                  <span className="flex gap-2">
                    <button className="btn btn-ink" type="button" onClick={() => setTripDraft(trip)}>
                      {t.edit}
                    </button>
                    <button
                      className="btn btn-clay"
                      type="button"
                      onClick={() => {
                        if (!confirm(t.confirmDelete)) return;
                        if (fbConfig) {
                          void remoteRun((config) => deleteRemoteTrip(config, trip.id), () => {
                            if (tripDraft?.id === trip.id) setTripDraft(null);
                          });
                          return;
                        }
                        saveContent({ settings, destinations, trips: trips.filter((item) => item.id !== trip.id) });
                        if (tripDraft?.id === trip.id) setTripDraft(null);
                      }}
                    >
                      {t.delete}
                    </button>
                  </span>
                </li>
              ))}
          </ul>
          {editingTrip ? (
            <TripEditor
              key={editingTrip.id}
              initial={editingTrip}
              others={trips}
              onCancel={() => setTripDraft(null)}
              onSave={(trip) => {
                if (fbConfig) {
                  void remoteRun((config) => saveRemoteTrip(config, trip), () => setTripDraft(null));
                  return;
                }
                const exists = trips.some((item) => item.id === trip.id);
                saveContent({
                  settings,
                  destinations,
                  trips: exists ? trips.map((item) => (item.id === trip.id ? trip : item)) : [...trips, trip],
                });
                flash(t.adminSaved);
                setTripDraft(null);
              }}
            />
          ) : null}
        </section>,
      ) : null}

      {tab === "reviews" && firebaseReady(settings.firebase) ? <RemoteNotesDesk config={settings.firebase} /> : null}

      {tab === "reviews" ? (
        <ReviewDesk
          onCreate={(review) => {
            addReview(review);
            flash(t.adminSaved);
          }}
          onDelete={(id) => {
            if (!confirm(t.confirmDelete)) return;
            hideReview(id);
          }}
        />
      ) : null}

      {tab === "messages" ? <MessageDesk onDelete={deleteMessage} /> : null}
    </div>
  );
}

/** Tells the admin whether places and trips are live in Firestore, and uploads them on request. */
function ContentBar({ config, onFlash }: { config: FirebaseSettings; onFlash: (message: string) => void }) {
  const { locale, contentSource, destinations, trips, reloadContent } = useSite();
  const ft = firebaseText[locale];
  const [busy, setBusy] = useState(false);
  const live = contentSource === "firestore";

  async function upload() {
    if (!confirm(`${ft.uploadAll}?`)) return;
    setBusy(true);
    try {
      await seedRemoteContent(config, destinations, trips);
      await reloadContent();
      onFlash(ft.contentUploaded);
    } catch (caught) {
      const code = errorCode(caught);
      onFlash(code ? `${ft.contentError} (${code})` : ft.contentError);
    }
    setBusy(false);
  }

  return (
    <div className={`mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm ${live ? "bg-lagoon text-foam" : "bg-gold-soft text-ink"}`}>
      <p className="max-w-3xl">{live ? ft.contentLive : ft.contentNotLive}</p>
      <button className={`btn ${live ? "btn-line" : "btn-lagoon"}`} type="button" onClick={upload} disabled={busy}>
        {ft.uploadAll}
      </button>
    </div>
  );
}

function MessageDesk({ onDelete }: { onDelete: (id: string) => void }) {
  const { messages, settings, locale } = useSite();
  const ft = firebaseText[locale];

  if (firebaseReady(settings.firebase)) return <RemoteMessageDesk config={settings.firebase} />;

  return (
    <section className="mt-8">
      <p className="mb-4 rounded-2xl bg-gold-soft px-4 py-3 text-sm">{ft.notConfigured}</p>
      <MessageList items={messages} onDelete={onDelete} />
    </section>
  );
}

function errorCode(caught: unknown) {
  return caught instanceof Error && "code" in caught ? String((caught as { code: unknown }).code) : "";
}

/** Shows the Firebase sign-in form until the admin is signed in, then renders its children. */
function FirebaseGate({
  config,
  title,
  frame = false,
  children,
}: {
  config: FirebaseSettings;
  title?: string;
  /** Wrap the loading and sign-in states in the full-page desk heading. */
  frame?: boolean;
  children: (admin: string) => React.ReactNode;
}) {
  const { t, locale } = useSite();
  const ft = firebaseText[locale];
  const [admin, setAdmin] = useState<string | null | undefined>(undefined);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    watchAdmin(config, setAdmin)
      .then((unsubscribe) => {
        if (cancelled) unsubscribe();
        else stop = unsubscribe;
      })
      .catch(() => setAdmin(null));
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [config]);

  const shell = (node: React.ReactNode) =>
    frame ? (
      <div className="mx-auto max-w-md px-5 py-20">
        <h1 className="font-display text-4xl">{t.adminTitle}</h1>
        <p className="mt-3 text-muted">{t.adminLead}</p>
        {node}
      </div>
    ) : (
      node
    );

  if (admin === undefined) return shell(<div className="mt-8 h-10 w-48 animate-pulse rounded-full bg-line" aria-busy="true" />);

  if (!admin) {
    return shell(
      <form
        className="mt-8 grid max-w-md gap-4 rounded-[24px] border border-line bg-foam p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          try {
            await signInAdmin(config, email, password);
            setPassword("");
          } catch (caught) {
            const code = errorCode(caught);
            setError(code ? `${ft.signInError} (${code})` : ft.signInError);
          }
        }}
      >
        <h3 className="font-display text-2xl">{title ?? (frame ? ft.deskSignIn : ft.signInTitle)}</h3>
        <p className="text-sm text-muted">{ft.signInHelp}</p>
        <Field label={t.yourEmail}>
          <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required />
        </Field>
        <Field label={t.adminPassword}>
          <input className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </Field>
        {error ? <p className="text-clay">{error}</p> : null}
        <button className="btn btn-lagoon w-fit" type="submit">
          {t.adminEnter}
        </button>
      </form>,
    );
  }

  return <>{children(admin)}</>;
}

function RemoteMessageDesk({ config }: { config: FirebaseSettings }) {
  return <FirebaseGate config={config}>{(admin) => <RemoteMessages config={config} admin={admin} />}</FirebaseGate>;
}

function RemoteMessages({ config, admin }: { config: FirebaseSettings; admin: string }) {
  const { locale } = useSite();
  const ft = firebaseText[locale];
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setItems(await fetchRemoteMessages(config));
    } catch (caught) {
      const code = errorCode(caught);
      setError(code ? `${ft.loadError} (${code})` : ft.loadError);
    }
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    fetchRemoteMessages(config)
      .then((list) => {
        if (!cancelled) setItems(list);
      })
      .catch((caught) => {
        if (cancelled) return;
        const code = errorCode(caught);
        setError(code ? `${ft.loadError} (${code})` : ft.loadError);
      });
    return () => {
      cancelled = true;
    };
  }, [config, ft.loadError]);

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted">{admin}</span>
        <button className="btn" type="button" onClick={load} disabled={loading}>
          {ft.refresh}
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            setItems([]);
            signOutAdmin(config).catch(() => undefined);
          }}
        >
          {ft.signOut}
        </button>
      </div>
      {error ? <p className="mb-4 text-clay">{error}</p> : null}
      <MessageList
        items={items}
        onDelete={async (id) => {
          try {
            await deleteRemoteMessage(config, id);
            setItems((current) => current.filter((item) => item.id !== id));
          } catch {
            setError(ft.loadError);
          }
        }}
      />
    </section>
  );
}

/** Visitor notes stored in Firestore: approve, hide, delete, or add one yourself. */
function RemoteNotesDesk({ config }: { config: FirebaseSettings }) {
  return <FirebaseGate config={config}>{(admin) => <RemoteNotes config={config} admin={admin} />}</FirebaseGate>;
}

function RemoteNotes({ config, admin }: { config: FirebaseSettings; admin: string }) {
  const { t, locale, destinations, trips, refreshRemoteReviews } = useSite();
  const ft = firebaseText[locale];
  const [items, setItems] = useState<RemoteReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [noteLocale, setNoteLocale] = useState<Locale>(locale);
  const [targetType, setTargetType] = useState<ReviewTarget>("destination");
  const [targetSlug, setTargetSlug] = useState("");
  const options =
    targetType === "destination"
      ? destinations.map((place) => ({ slug: place.slug, label: tx(place.name, locale) }))
      : trips.map((trip) => ({ slug: trip.slug, label: tx(trip.title, locale) }));

  async function load() {
    setLoading(true);
    setError("");
    try {
      setItems(await fetchAllReviews(config));
    } catch (caught) {
      const code = errorCode(caught);
      setError(code ? `${ft.loadError} (${code})` : ft.loadError);
    }
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    fetchAllReviews(config)
      .then((list) => {
        if (!cancelled) setItems(list);
      })
      .catch((caught) => {
        if (cancelled) return;
        const code = errorCode(caught);
        setError(code ? `${ft.loadError} (${code})` : ft.loadError);
      });
    return () => {
      cancelled = true;
    };
  }, [config, ft.loadError]);

  async function run(action: () => Promise<void>) {
    setError("");
    try {
      await action();
      setItems(await fetchAllReviews(config));
      refreshRemoteReviews();
    } catch (caught) {
      const code = errorCode(caught);
      setError(code ? `${ft.loadError} (${code})` : ft.loadError);
    }
  }

  const pending = items.filter((item) => !item.approved).length;

  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl">
        {ft.notesTitle}
        {pending ? ` Â· ${pending} ${ft.pending.toLowerCase()}` : ""}
      </h2>
      <p className="mt-2 text-sm text-muted">{ft.notesHelp}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted">{admin}</span>
        <button className="btn" type="button" onClick={load} disabled={loading}>
          {ft.refresh}
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => {
            setItems([]);
            signOutAdmin(config).catch(() => undefined);
          }}
        >
          {ft.signOut}
        </button>
      </div>
      {error ? <p className="mt-4 text-clay">{error}</p> : null}

      <form
        className="mt-6 grid gap-4 rounded-[28px] border border-line bg-foam p-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim() || !comment.trim()) return;
          if (targetType !== "site" && !targetSlug) return;
          void run(async () => {
            await createApprovedReview(config, {
              name: name.trim().slice(0, 120),
              comment: comment.trim().slice(0, 2000),
              rating: Math.max(1, Math.min(5, Math.round(rating) || 5)),
              locale: noteLocale,
              targetType,
              targetSlug: targetType === "site" ? "" : targetSlug,
            });
            setName("");
            setComment("");
          });
        }}
      >
        <h3 className="font-display text-xl">{t.addReview}</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t.reviewName}>
            <input className="field" value={name} maxLength={120} onChange={(event) => setName(event.target.value)} required />
          </Field>
          <Field label={t.reviewRating}>
            <input className="field" type="number" min={1} max={5} value={rating} onChange={(event) => setRating(Number(event.target.value))} />
          </Field>
          <Field label={t.language}>
            <select className="field" value={noteLocale} onChange={(event) => setNoteLocale(event.target.value as Locale)}>
              {locales.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t.reviewTarget}>
            <select
              className="field"
              value={targetType}
              onChange={(event) => {
                setTargetType(event.target.value as ReviewTarget);
                setTargetSlug("");
              }}
            >
              <option value="destination">{t.nav.destinations}</option>
              <option value="trip">{t.nav.trips}</option>
            </select>
          </Field>
        </div>
        {targetType !== "site" ? (
          <Field label={t.commentOn}>
            <select className="field" value={targetSlug} onChange={(event) => setTargetSlug(event.target.value)} required>
              <option value="">{t.noTrip}</option>
              {options.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
        <Field label={t.reviewComment}>
          <textarea className="field min-h-24" value={comment} maxLength={2000} onChange={(event) => setComment(event.target.value)} required />
        </Field>
        <button className="btn btn-lagoon w-fit" type="submit">
          {t.save}
        </button>
      </form>

      {items.length === 0 ? <p className="mt-6 text-muted">{ft.notesEmpty}</p> : null}
      <ul className="mt-6 grid gap-3">
        {items.map((review) => (
          <li key={review.id} className="rounded-2xl bg-foam p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {review.name} Â· {review.rating}/5
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${review.approved ? "bg-lagoon text-foam" : "bg-gold-soft text-ink"}`}
                >
                  {review.approved ? ft.approved : ft.pending}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`btn ${review.approved ? "btn-ink" : "btn-lagoon"}`}
                  type="button"
                  onClick={() => void run(() => setReviewApproved(config, review.id, !review.approved))}
                >
                  {review.approved ? ft.unapprove : ft.approve}
                </button>
                <button
                  className="btn btn-clay"
                  type="button"
                  onClick={() => {
                    if (confirm(t.confirmDelete)) void run(() => deleteRemoteReview(config, review.id));
                  }}
                >
                  {t.delete}
                </button>
              </div>
            </div>
            <p className="mt-2">{review.comment}</p>
            <p className="mt-2 text-sm text-muted">
              {formatDate(review.createdAt, locale)} Â· {review.targetType} {review.targetSlug}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MessageList({ items, onDelete }: { items: ContactMessage[]; onDelete: (id: string) => void }) {
  const { t, locale } = useSite();

  return (
    <div>
      {items.length === 0 ? <p className="text-muted">{t.messagesEmpty}</p> : null}
      <ul className="grid gap-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-[24px] border border-line bg-foam p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted">{formatDate(item.createdAt, locale)}</p>
              </div>
              <button
                className="btn btn-clay"
                type="button"
                onClick={() => {
                  if (confirm(t.confirmDelete)) onDelete(item.id);
                }}
              >
                {t.delete}
              </button>
            </div>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">{t.email}</dt>
                <dd>
                  <a className="underline" href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                </dd>
              </div>
              {item.phone ? (
                <div>
                  <dt className="text-muted">{t.phone}</dt>
                  <dd>
                    <a className="underline" href={`tel:${item.phone}`}>
                      {item.phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {item.subject ? (
                <div>
                  <dt className="text-muted">{t.yourSubject}</dt>
                  <dd>{item.subject}</dd>
                </div>
              ) : null}
              {item.trip ? (
                <div>
                  <dt className="text-muted">{t.tripInterest}</dt>
                  <dd>{item.trip}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-4 whitespace-pre-wrap leading-relaxed">{item.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SiteForm({ onSave }: { onSave: (settings: ReturnType<typeof useSite>["settings"]) => void }) {
  const { settings, t, locale } = useSite();
  const [draft, setDraft] = useState(settings);
  const [lang, setLang] = useState<Locale>(locale);

  return (
    <form
      className="mt-8 grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <LangTabs value={lang} onChange={setLang} />
      <div className="grid gap-4 md:grid-cols-2">
        <L10nField label={t.siteName} value={draft.siteName} lang={lang} onChange={(siteName) => setDraft({ ...draft, siteName })} />
        <L10nField label={t.tagline} value={draft.tagline} lang={lang} onChange={(tagline) => setDraft({ ...draft, tagline })} />
        <L10nField label={t.heroKicker} value={draft.heroKicker} lang={lang} onChange={(heroKicker) => setDraft({ ...draft, heroKicker })} />
        <L10nField label={t.heroTitle} value={draft.heroTitle} lang={lang} onChange={(heroTitle) => setDraft({ ...draft, heroTitle })} />
      </div>
      <L10nField label={t.heroSubtitle} value={draft.heroSubtitle} lang={lang} area onChange={(heroSubtitle) => setDraft({ ...draft, heroSubtitle })} />
      <L10nField label={t.about} value={draft.about} lang={lang} area onChange={(about) => setDraft({ ...draft, about })} />
      <L10nField label={t.address} value={draft.address} lang={lang} onChange={(address) => setDraft({ ...draft, address })} />
      <L10nField label={t.hours} value={draft.hours} lang={lang} onChange={(hours) => setDraft({ ...draft, hours })} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.publicEmail}>
          <input className="field" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
        </Field>
        <Field label={t.phone}>
          <input className="field" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
        </Field>
        <Field label={t.whatsapp}>
          <input className="field" value={draft.whatsapp} onChange={(event) => setDraft({ ...draft, whatsapp: event.target.value })} />
        </Field>
        <Field label={t.mapQuery}>
          <input className="field" value={draft.mapQuery} onChange={(event) => setDraft({ ...draft, mapQuery: event.target.value })} />
        </Field>
        <Field label={t.instagram}>
          <input className="field" value={draft.instagram} onChange={(event) => setDraft({ ...draft, instagram: event.target.value })} />
        </Field>
        <Field label={t.facebook}>
          <input className="field" value={draft.facebook} onChange={(event) => setDraft({ ...draft, facebook: event.target.value })} />
        </Field>
      </div>
      <Field label={t.heroImage}>
        <input className="field" value={draft.heroImage} onChange={(event) => setDraft({ ...draft, heroImage: event.target.value })} />
      </Field>
      <Field label={t.web3formsKey} hint={t.web3formsHelp}>
        <input className="field" value={draft.web3formsKey} onChange={(event) => setDraft({ ...draft, web3formsKey: event.target.value.trim() })} />
      </Field>
      <fieldset className="grid gap-4 rounded-[24px] border border-line p-5">
        <legend className="px-2 font-semibold">{firebaseText[locale].sectionTitle}</legend>
        <p className="text-sm text-muted">{firebaseText[locale].help}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {(["apiKey", "authDomain", "projectId", "appId"] as const).map((key) => (
            <Field key={key} label={key}>
              <input
                className="field"
                value={(draft.firebase ?? emptyFirebase)[key]}
                onChange={(event) =>
                  setDraft({ ...draft, firebase: { ...(draft.firebase ?? emptyFirebase), [key]: event.target.value.trim() } })
                }
                autoComplete="off"
              />
            </Field>
          ))}
        </div>
      </fieldset>
      <button className="btn btn-lagoon w-fit" type="submit">
        {t.save}
      </button>
    </form>
  );
}

function PlaceEditor({
  initial,
  others,
  onSave,
  onCancel,
}: {
  initial: Destination;
  others: Destination[];
  onSave: (place: Destination) => void;
  onCancel: () => void;
}) {
  const { t, locale } = useSite();
  const [place, setPlace] = useState(initial);
  const [lang, setLang] = useState<Locale>(locale);
  const [highlights, setHighlights] = useState(() => toLinesState(initial.highlights));
  const [error, setError] = useState("");

  return (
    <form
      className="mt-6 grid gap-4 rounded-[28px] border border-line bg-foam p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (!place.name.en.trim()) {
          setError(copy[locale].name);
          return;
        }
        const slug = place.slug.trim() || slugify(place.name.en) || uid("place");
        if (others.some((item) => item.slug === slug && item.id !== place.id)) {
          setError(copy[locale].slug);
          return;
        }
        onSave({
          ...place,
          slug,
          order: Number(place.order) || 0,
          highlights: fromLinesState(highlights),
        });
      }}
    >
      <LangTabs value={lang} onChange={setLang} />
      <div className="grid gap-4 md:grid-cols-2">
        <L10nField label={t.nameLabel} value={place.name} lang={lang} onChange={(name) => setPlace({ ...place, name })} />
        <Field label={t.slug}>
          <input className="field" value={place.slug} onChange={(event) => setPlace({ ...place, slug: event.target.value })} />
        </Field>
        {place.slug ? (
          <Link className="text-sm text-lagoon" href={`/destinations/?slug=${place.slug}`}>
            {t.readPlace}
          </Link>
        ) : null}
        <Field label={t.region}>
          <select className="field" value={place.region} onChange={(event) => setPlace({ ...place, region: event.target.value as RegionId })}>
            {(Object.keys(t.regions) as RegionId[]).map((region) => (
              <option key={region} value={region}>
                {t.regions[region]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.order}>
          <input className="field" type="number" value={place.order} onChange={(event) => setPlace({ ...place, order: Number(event.target.value) })} />
        </Field>
      </div>
      <L10nField label={t.summary} value={place.summary} lang={lang} area onChange={(summary) => setPlace({ ...place, summary })} />
      <L10nField label={t.description} value={place.description} lang={lang} area onChange={(description) => setPlace({ ...place, description })} />
      <L10nField label={t.bestTime} value={place.bestTime} lang={lang} area onChange={(bestTime) => setPlace({ ...place, bestTime })} />
      <L10nField label={t.gettingThere} value={place.gettingThere} lang={lang} area onChange={(gettingThere) => setPlace({ ...place, gettingThere })} />
      <Field label={t.highlights} hint={t.linesHint}>
        <textarea className="field min-h-28" value={highlights[lang]} onChange={(event) => setHighlights({ ...highlights, [lang]: event.target.value })} />
      </Field>
      <Field label={t.imageUrl}>
        <input className="field" value={place.image} onChange={(event) => setPlace({ ...place, image: event.target.value })} />
      </Field>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={place.featured} onChange={(event) => setPlace({ ...place, featured: event.target.checked })} />
        {t.featured}
      </label>
      {error ? <p className="text-sm text-clay">{error}</p> : null}
      <div className="flex gap-2">
        <button className="btn btn-lagoon" type="submit">
          {t.save}
        </button>
        <button className="btn btn-ink" type="button" onClick={onCancel}>
          {t.cancel}
        </button>
      </div>
    </form>
  );
}

function TripEditor({
  initial,
  others,
  onSave,
  onCancel,
}: {
  initial: Trip;
  others: Trip[];
  onSave: (trip: Trip) => void;
  onCancel: () => void;
}) {
  const { t, locale } = useSite();
  const [trip, setTrip] = useState(initial);
  const [lang, setLang] = useState<Locale>(locale);
  const [includes, setIncludes] = useState(() => toLinesState(initial.includes));
  const [excludes, setExcludes] = useState(() => toLinesState(initial.excludes));
  const [links, setLinks] = useState(initial.destinationSlugs.join(", "));
  const [error, setError] = useState("");

  function updateDay(index: number, day: ItineraryDay) {
    setTrip({ ...trip, itinerary: trip.itinerary.map((item, itemIndex) => (itemIndex === index ? day : item)) });
  }

  return (
    <form
      className="mt-6 grid gap-4 rounded-[28px] border border-line bg-foam p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (!trip.title.en.trim()) {
          setError(copy[locale].name);
          return;
        }
        if (!Number.isFinite(trip.priceFromUsd) || trip.priceFromUsd < 0) {
          setError(copy[locale].price);
          return;
        }
        if (trip.itinerary.length === 0) {
          setError(copy[locale].days);
          return;
        }
        const slug = trip.slug.trim() || slugify(trip.title.en) || uid("trip");
        if (others.some((item) => item.slug === slug && item.id !== trip.id)) {
          setError(copy[locale].slug);
          return;
        }
        onSave({
          ...trip,
          slug,
          durationDays: Math.max(1, Number(trip.durationDays) || trip.itinerary.length),
          priceFromUsd: Number(trip.priceFromUsd) || 0,
          order: Number(trip.order) || 0,
          includes: fromLinesState(includes),
          excludes: fromLinesState(excludes),
          destinationSlugs: links
            .split(",")
            .map((item) => slugify(item.trim()))
            .filter(Boolean),
        });
      }}
    >
      <LangTabs value={lang} onChange={setLang} />
      <div className="grid gap-4 md:grid-cols-2">
        <L10nField label={t.titleField} value={trip.title} lang={lang} onChange={(title) => setTrip({ ...trip, title })} />
        <Field label={t.slug}>
          <input className="field" value={trip.slug} onChange={(event) => setTrip({ ...trip, slug: event.target.value })} />
        </Field>
        {trip.slug ? (
          <Link className="text-sm text-lagoon" href={`/trips/?slug=${trip.slug}`}>
            {t.viewPlan}
          </Link>
        ) : null}
        <Field label={t.duration}>
          <input className="field" type="number" min={1} value={trip.durationDays} onChange={(event) => setTrip({ ...trip, durationDays: Number(event.target.value) })} />
        </Field>
        <Field label={t.price}>
          <input className="field" type="number" min={0} value={trip.priceFromUsd} onChange={(event) => setTrip({ ...trip, priceFromUsd: Number(event.target.value) })} />
        </Field>
        <Field label={t.pace}>
          <select className="field" value={trip.pace} onChange={(event) => setTrip({ ...trip, pace: event.target.value as Pace })}>
            {(Object.keys(t.paces) as Pace[]).map((pace) => (
              <option key={pace} value={pace}>
                {t.paces[pace]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.order}>
          <input className="field" type="number" value={trip.order} onChange={(event) => setTrip({ ...trip, order: Number(event.target.value) })} />
        </Field>
      </div>
      <L10nField label={t.summary} value={trip.summary} lang={lang} area onChange={(summary) => setTrip({ ...trip, summary })} />
      <L10nField label={t.description} value={trip.description} lang={lang} area onChange={(description) => setTrip({ ...trip, description })} />
      <L10nField label={t.groupSize} value={trip.groupSize} lang={lang} onChange={(groupSize) => setTrip({ ...trip, groupSize })} />
      <L10nField label={t.bestMonths} value={trip.bestMonths} lang={lang} onChange={(bestMonths) => setTrip({ ...trip, bestMonths })} />
      <Field label={t.includes} hint={t.linesHint}>
        <textarea className="field min-h-28" value={includes[lang]} onChange={(event) => setIncludes({ ...includes, [lang]: event.target.value })} />
      </Field>
      <Field label={t.notIncluded} hint={t.linesHint}>
        <textarea className="field min-h-28" value={excludes[lang]} onChange={(event) => setExcludes({ ...excludes, [lang]: event.target.value })} />
      </Field>
      <Field label={t.destinationLinks}>
        <input className="field" value={links} onChange={(event) => setLinks(event.target.value)} />
      </Field>
      <Field label={t.imageUrl}>
        <input className="field" value={trip.image} onChange={(event) => setTrip({ ...trip, image: event.target.value })} />
      </Field>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={trip.featured} onChange={(event) => setTrip({ ...trip, featured: event.target.checked })} />
        {t.featured}
      </label>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl">{t.itinerary}</h3>
        <button className="btn btn-ink" type="button" onClick={() => setTrip({ ...trip, itinerary: [...trip.itinerary, blankDay()] })}>
          {t.addDay}
        </button>
      </div>
      {trip.itinerary.map((day, index) => (
        <fieldset key={`${trip.id}-day-${index}`} className="grid gap-3 rounded-2xl border border-line p-4">
          <legend className="px-2">
            {t.day} {index + 1}
          </legend>
          <L10nField label={t.titleField} value={day.title} lang={lang} onChange={(title) => updateDay(index, { ...day, title })} />
          <L10nField label={t.detailField} value={day.detail} lang={lang} area onChange={(detail) => updateDay(index, { ...day, detail })} />
          <L10nField label={t.stay} value={day.stay} lang={lang} onChange={(stay) => updateDay(index, { ...day, stay })} />
          {trip.itinerary.length > 1 ? (
            <button
              className="btn btn-ink w-fit"
              type="button"
              onClick={() => setTrip({ ...trip, itinerary: trip.itinerary.filter((_, itemIndex) => itemIndex !== index) })}
            >
              {t.removeDay}
            </button>
          ) : null}
        </fieldset>
      ))}
      {error ? <p className="text-sm text-clay">{error}</p> : null}
      <div className="flex gap-2">
        <button className="btn btn-lagoon" type="submit">
          {t.save}
        </button>
        <button className="btn btn-ink" type="button" onClick={onCancel}>
          {t.cancel}
        </button>
      </div>
    </form>
  );
}

function ReviewDesk({
  onCreate,
  onDelete,
}: {
  onCreate: (review: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    locale: Locale;
    targetType: ReviewTarget;
    targetSlug: string;
    createdAt: string;
  }) => void;
  onDelete: (id: string) => void;
}) {
  const { t, localReviews: reviews, locale, destinations, trips } = useSite();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [noteLocale, setNoteLocale] = useState<Locale>(locale);
  const [targetType, setTargetType] = useState<ReviewTarget>("destination");
  const [targetSlug, setTargetSlug] = useState("");
  const options =
    targetType === "destination"
      ? destinations.map((place) => ({ slug: place.slug, label: tx(place.name, locale) }))
      : trips.map((trip) => ({ slug: trip.slug, label: tx(trip.title, locale) }));

  return (
    <section className="mt-8">
      <form
        className="grid gap-4 rounded-[28px] border border-line bg-foam p-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim() || !comment.trim()) return;
          onCreate({
            id: uid("note"),
            name: name.trim(),
            comment: comment.trim(),
            rating,
            locale: noteLocale,
            targetType,
            targetSlug: targetType === "site" ? "" : targetSlug,
            createdAt: new Date().toISOString(),
          });
          setName("");
          setComment("");
        }}
      >
        <h2 className="font-display text-2xl">{t.addReview}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t.reviewName}>
            <input className="field" value={name} onChange={(event) => setName(event.target.value)} required />
          </Field>
          <Field label={t.reviewRating}>
            <input className="field" type="number" min={1} max={5} value={rating} onChange={(event) => setRating(Number(event.target.value))} />
          </Field>
          <Field label={t.language}>
            <select className="field" value={noteLocale} onChange={(event) => setNoteLocale(event.target.value as Locale)}>
              {locales.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t.reviewTarget}>
            <select
              className="field"
              value={targetType}
              onChange={(event) => {
                setTargetType(event.target.value as ReviewTarget);
                setTargetSlug("");
              }}
            >
              <option value="destination">{t.nav.destinations}</option>
              <option value="trip">{t.nav.trips}</option>
            </select>
          </Field>
        </div>
        {targetType !== "site" ? (
          <Field label={t.commentOn}>
            <select className="field" value={targetSlug} onChange={(event) => setTargetSlug(event.target.value)} required>
              <option value="">{t.noTrip}</option>
              {options.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        ) : null}
        <Field label={t.reviewComment}>
          <textarea className="field min-h-28" value={comment} onChange={(event) => setComment(event.target.value)} required />
        </Field>
        <button className="btn btn-lagoon w-fit" type="submit">
          {t.save}
        </button>
      </form>
      {reviews.length === 0 ? <p className="mt-6 text-muted">{t.noReviewsAdmin}</p> : null}
      <ul className="mt-6 grid gap-3">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-2xl bg-foam p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold">
                {review.name} · {review.rating}/5
              </p>
              <button className="btn btn-clay" type="button" onClick={() => onDelete(review.id)}>
                {t.delete}
              </button>
            </div>
            <p className="mt-2">{review.comment}</p>
            <p className="mt-2 text-sm text-muted">
              {formatDate(review.createdAt, locale)} · {review.targetType} {review.targetSlug}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LangTabs({ value, onChange }: { value: Locale; onChange: (locale: Locale) => void }) {
  const { t } = useSite();
  return (
    <label className="block max-w-xs">
      <span className="mb-1.5 block text-sm font-medium">{t.langLabel}</span>
      <select className="field" value={value} onChange={(event) => onChange(event.target.value as Locale)}>
        {locales.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function L10nField({
  label,
  value,
  lang,
  onChange,
  area = false,
}: {
  label: string;
  value: L10n;
  lang: Locale;
  onChange: (value: L10n) => void;
  area?: boolean;
}) {
  const current = value?.[lang] ?? "";
  return (
    <Field label={`${label} · ${lang.toUpperCase()}`}>
      {area ? (
        <textarea className="field min-h-28" value={current} onChange={(event) => onChange({ ...emptyText(), ...value, [lang]: event.target.value })} />
      ) : (
        <input className="field" value={current} onChange={(event) => onChange({ ...emptyText(), ...value, [lang]: event.target.value })} />
      )}
    </Field>
  );
}
