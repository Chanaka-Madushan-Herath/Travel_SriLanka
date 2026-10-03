"use client";

import { useSite } from "@/context/SiteContext";
import { firebaseReady, submitRemoteReview } from "@/lib/firebase";
import { firebaseText } from "@/lib/firebaseText";
import { locales } from "@/lib/locales";
import { sendToInbox } from "@/lib/email";
import type { ReviewTarget } from "@/lib/types";
import { formatDate, tx, uid } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Field, Stars } from "./ui";

export function ReviewSection({
  targetType,
  targetSlug,
  heading,
}: {
  targetType?: ReviewTarget;
  targetSlug?: string;
  heading?: string;
}) {
  const site = useSite();
  const { t, reviews, locale } = site;
  const visible = useMemo(
    () =>
      reviews.filter((review) => {
        if (!targetType) return true;
        return review.targetType === targetType && review.targetSlug === targetSlug;
      }),
    [reviews, targetType, targetSlug],
  );

  return (
    <section className="mt-14">
      <h2 className="font-display text-3xl">{heading || t.onThisPage}</h2>
      {visible.length === 0 ? <p className="mt-4 text-muted">{t.reviewEmpty}</p> : null}
      <ul className="mt-6 grid gap-4">
        {visible.map((review) => (
          <li key={review.id} className="rounded-[24px] border border-line bg-foam p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{review.name}</p>
              <Stars value={review.rating} label={t.stars} />
            </div>
            <p className="mt-3 leading-relaxed">{review.comment}</p>
            <p className="mt-3 text-sm text-muted">
              {formatDate(review.createdAt, locale)}
              {" · "}
              {labelFor(review.targetType, review.targetSlug, site)}
            </p>
          </li>
        ))}
      </ul>
      <ReviewForm initialType={targetType || "destination"} initialSlug={targetSlug || ""} />
    </section>
  );
}

function labelFor(
  type: ReviewTarget,
  slug: string,
  site: ReturnType<typeof useSite>,
) {
  if (type === "destination") {
    const place = site.destinations.find((item) => item.slug === slug);
    return place ? tx(place.name, site.locale) : slug;
  }
  if (type === "trip") {
    const trip = site.trips.find((item) => item.slug === slug);
    return trip ? tx(trip.title, site.locale) : slug;
  }
  return site.t.reviewSite;
}

function ReviewForm({ initialType, initialSlug }: { initialType: ReviewTarget; initialSlug: string }) {
  const { t, locale, destinations, trips, settings, addReview } = useSite();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [targetType, setTargetType] = useState<ReviewTarget>(initialType);
  const [targetSlug, setTargetSlug] = useState(initialSlug);
  const [noteLocale, setNoteLocale] = useState(locale);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "emailed" | "pending">("idle");
  const [error, setError] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const ft = firebaseText[locale];

  const options =
    targetType === "destination"
      ? destinations.map((place) => ({ slug: place.slug, label: tx(place.name, locale) }))
      : targetType === "trip"
        ? trips.map((trip) => ({ slug: trip.slug, label: tx(trip.title, locale) }))
        : [];

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (botcheck) {
      setStatus("saved");
      setName("");
      setComment("");
      return;
    }
    if (!name.trim() || !comment.trim()) {
      setError(t.required);
      return;
    }
    if ((targetType === "destination" || targetType === "trip") && !targetSlug) {
      setError(t.required);
      return;
    }
    setError("");
    setStatus("saving");
    const review = {
      id: uid("note"),
      name: name.trim(),
      comment: comment.trim(),
      rating,
      locale: noteLocale,
      targetType,
      targetSlug: targetType === "site" ? "" : targetSlug,
      createdAt: new Date().toISOString(),
    };
    const firebaseConfig = settings.firebase;
    const useFirestore = firebaseReady(firebaseConfig);
    if (useFirestore) {
      try {
        await submitRemoteReview(firebaseConfig, {
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          locale: review.locale,
          targetType: review.targetType,
          targetSlug: review.targetSlug,
        });
      } catch {
        setError(ft.reviewSendError);
        setStatus("idle");
        return;
      }
    } else {
      addReview(review);
    }
    const mailed = await sendToInbox(settings, {
      subject: `New note for ${tx(settings.siteName, "en")} from ${review.name}`,
      name: review.name,
      message: review.comment,
      extra: {
        rating: String(review.rating),
        about: `${review.targetType} ${review.targetSlug}`.trim(),
        language: review.locale,
      },
      botcheck,
    });
    setName("");
    setComment("");
    setBotcheck(false);
    setStatus(useFirestore ? "pending" : mailed.ok && mailed.mode === "web3forms" ? "emailed" : "saved");
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-[28px] border border-line bg-foam p-5 sm:p-6">
      <h3 className="font-display text-2xl">{t.writeReview}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={t.reviewName}>
          <input className="field" value={name} onChange={(event) => setName(event.target.value)} required />
        </Field>
        <Field label={t.reviewRating}>
          <select className="field" value={rating} onChange={(event) => setRating(Number(event.target.value))}>
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.reviewTarget}>
          <select
            className="field"
            value={targetType}
            onChange={(event) => {
              const next = event.target.value as ReviewTarget;
              setTargetType(next);
              setTargetSlug("");
            }}
          >
            <option value="destination">{t.nav.destinations}</option>
            <option value="trip">{t.nav.trips}</option>
          </select>
        </Field>
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
        <Field label={t.language}>
          <select className="field" value={noteLocale} onChange={(event) => setNoteLocale(event.target.value as typeof noteLocale)}>
            {locales.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="mt-4">
        <Field label={t.reviewComment}>
          <textarea className="field min-h-32" value={comment} onChange={(event) => setComment(event.target.value)} required />
        </Field>
      </div>
      <div className="hidden" aria-hidden="true">
        <input type="checkbox" name="botcheck" checked={botcheck} onChange={(event) => setBotcheck(event.target.checked)} tabIndex={-1} />
      </div>
      {error ? <p className="mt-3 text-sm text-clay">{error}</p> : null}
      {status === "saved" ? <p className="mt-3 text-sm text-lagoon">{t.reviewThanks} {t.reviewLocal}</p> : null}
      {status === "pending" ? <p className="mt-3 text-sm text-lagoon">{ft.reviewPending}</p> : null}
      {status === "emailed" ? <p className="mt-3 text-sm text-lagoon">{t.reviewEmailed}</p> : null}
      <button className="btn btn-lagoon mt-5" type="submit" disabled={status === "saving"}>
        {status === "saving" ? t.sending : t.send}
      </button>
    </form>
  );
}
