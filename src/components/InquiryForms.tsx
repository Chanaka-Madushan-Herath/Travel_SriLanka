"use client";

import { PageHero } from "@/components/PageHero";
import { Field } from "@/components/ui";
import { usePageTitle, useSite } from "@/context/SiteContext";
import { firebaseReady, submitRemoteMessage } from "@/lib/firebase";
import { formsText, interestIds, stayIds, type FormsText, type InterestId, type StayId } from "@/lib/formsText";
import type { Pace, RegionId } from "@/lib/types";
import { isEmail, sortByOrder, tx, uid } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Entry = { name: string; email: string; phone: string; subject: string; message: string; trip: string };

const regionOrder: RegionId[] = ["cultural", "hills", "south", "east", "north"];
const paceOrder: Pace[] = ["relaxed", "moderate", "active"];

/** Sends a request the same way the contact form does: Firestore when it is set up, this browser otherwise. */
function useSender() {
  const { settings, addMessage } = useSite();
  const [busy, setBusy] = useState(false);

  async function send(entry: Entry): Promise<boolean> {
    const clean: Entry = {
      name: entry.name.trim().slice(0, 120),
      email: entry.email.trim().slice(0, 200),
      phone: entry.phone.trim().slice(0, 60),
      subject: entry.subject.trim().slice(0, 200),
      message: entry.message.trim().slice(0, 5000),
      trip: entry.trip.trim().slice(0, 200),
    };
    if (!firebaseReady(settings.firebase)) {
      addMessage({ id: uid("msg"), ...clean, createdAt: new Date().toISOString() });
      return true;
    }
    setBusy(true);
    try {
      await submitRemoteMessage(settings.firebase, clean);
      return true;
    } catch {
      return false;
    } finally {
      setBusy(false);
    }
  }

  return { send, busy };
}

function useForms(): { f: FormsText; en: FormsText } {
  const { locale } = useSite();
  return { f: formsText[locale], en: formsText.en };
}

function today() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function lines(rows: [string, string][]) {
  return rows
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-[28px] border border-line bg-foam p-5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3">
        <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-gold text-lg text-ink" aria-hidden="true">
          {n}
        </span>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      {children}
    </fieldset>
  );
}

function Chip({
  label,
  checked,
  onChange,
  type = "checkbox",
  name,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
  name?: string;
}) {
  return (
    <label
      className={`inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus-within:ring-2 focus-within:ring-lagoon focus-within:ring-offset-2 ${
        checked ? "border-lagoon bg-lagoon text-foam shadow-sm" : "border-line bg-paper/60 text-ink hover:border-lagoon"
      }`}
    >
      <input className="sr-only" type={type} name={name} checked={checked} onChange={onChange} />
      <span aria-hidden="true" className={`text-xs ${checked ? "opacity-100" : "opacity-40"}`}>
        {checked ? "✓" : "+"}
      </span>
      {label}
    </label>
  );
}

function Honeypot({ value, onChange }: { value: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="hidden" aria-hidden="true">
      <input type="checkbox" name="botcheck" checked={value} onChange={(event) => onChange(event.target.checked)} tabIndex={-1} />
    </div>
  );
}

function Success({ f, onAgain }: { f: FormsText; onAgain: () => void }) {
  const { t } = useSite();
  return (
    <div className="rounded-[28px] border border-line bg-foam p-8 text-center" role="status">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lagoon text-2xl text-foam" aria-hidden="true">
        ✓
      </span>
      <h2 className="font-display mt-4 text-3xl">{f.successTitle}</h2>
      <p className="mt-2 text-muted">{f.successBody}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" className="btn btn-ink" onClick={onAgain}>
          {f.sendAnother}
        </button>
        <Link href="/trips" className="btn btn-lagoon">
          {t.nav.trips}
        </Link>
      </div>
    </div>
  );
}

function Travellers({
  f,
  arrival,
  setArrival,
  flexible,
  setFlexible,
  adults,
  setAdults,
  kids,
  setKids,
  children,
}: {
  f: FormsText;
  arrival: string;
  setArrival: (value: string) => void;
  flexible: boolean;
  setFlexible: (value: boolean) => void;
  adults: number;
  setAdults: (value: number) => void;
  kids: number;
  setKids: (value: number) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {children}
      <Field label={f.arrival}>
        <input className="field" type="date" min={today()} value={arrival} onChange={(event) => setArrival(event.target.value)} />
      </Field>
      <label className="flex items-center gap-2 self-end pb-3 text-sm">
        <input type="checkbox" className="h-4 w-4 accent-[#17685c]" checked={flexible} onChange={(event) => setFlexible(event.target.checked)} />
        {f.flexible}
      </label>
      <Field label={f.adults}>
        <input className="field" type="number" min={1} max={50} value={adults} onChange={(event) => setAdults(Math.max(1, Number(event.target.value) || 1))} />
      </Field>
      <Field label={f.children}>
        <input className="field" type="number" min={0} max={50} value={kids} onChange={(event) => setKids(Math.max(0, Number(event.target.value) || 0))} />
      </Field>
    </div>
  );
}

function AboutYou({
  f,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  country,
  setCountry,
}: {
  f: FormsText;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
}) {
  const { t } = useSite();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label={`${t.yourName} *`}>
        <input className="field" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
      </Field>
      <Field label={`${t.yourEmail} *`}>
        <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
      </Field>
      <Field label={t.yourPhone}>
        <input className="field" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
      </Field>
      <Field label={f.country}>
        <input className="field" value={country} onChange={(event) => setCountry(event.target.value)} autoComplete="country-name" />
      </Field>
    </div>
  );
}

function travellersText(adults: number, kids: number) {
  return `${adults} adult${adults === 1 ? "" : "s"}${kids ? `, ${kids} child${kids === 1 ? "" : "ren"}` : ""}`;
}

function arrivalText(arrival: string, flexible: boolean) {
  if (!arrival) return flexible ? "flexible" : "";
  return flexible ? `${arrival} (flexible)` : arrival;
}

/* ------------------------------------------------------------------ */
/* Tour inquiry                                                        */
/* ------------------------------------------------------------------ */

export function TourInquiryQuery() {
  const slug = useSearchParams().get("trip") ?? "";
  return <TourInquiryView initialTrip={slug} />;
}

export function TourInquiryView({ initialTrip = "" }: { initialTrip?: string }) {
  const { t, trips, locale } = useSite();
  const { f, en } = useForms();
  usePageTitle(f.inquiryTitle);
  const { send, busy } = useSender();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [trip, setTrip] = useState(initialTrip);
  const [arrival, setArrival] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [questions, setQuestions] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => setTrip(initialTrip), [initialTrip]);

  const ordered = sortByOrder(trips);
  const chosen = trips.find((item) => item.slug === trip);

  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setArrival("");
    setFlexible(false);
    setAdults(2);
    setKids(0);
    setQuestions("");
    setError("");
    setSent(false);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (botcheck) return setSent(true);
    if (!name.trim() || !isEmail(email)) return setError(f.errorRequired);
    setError("");
    const tripName = chosen ? tx(chosen.title, "en") : en.notSure;
    const message = [
      `${en.inquiryTitle}`,
      lines([
        [en.tripLabel, tripName],
        [en.arrival, arrivalText(arrival, flexible)],
        ["Travellers", travellersText(adults, kids)],
        [en.country, country],
        ["Language", locale],
      ]),
      questions.trim() ? `${en.questionsLabel}:\n${questions.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
    const ok = await send({ name, email, phone, subject: `${en.inquiryTitle}: ${tripName}`, message, trip: chosen ? tripName : "" });
    if (!ok) return setError(f.errorSend);
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <PageHero slot="pageInquiry" kicker={f.ctaKicker} title={f.inquiryTitle} lead={f.inquiryLead} narrow />
      <div className="mx-auto max-w-4xl px-5 py-10">
        {sent ? (
          <Success f={f} onAgain={reset} />
        ) : (
          <form onSubmit={onSubmit} className="grid gap-6" noValidate>
            <Step n={1} title={f.stepTrip}>
              <Travellers
                f={f}
                arrival={arrival}
                setArrival={setArrival}
                flexible={flexible}
                setFlexible={setFlexible}
                adults={adults}
                setAdults={setAdults}
                kids={kids}
                setKids={setKids}
              >
                <div className="sm:col-span-2">
                  <Field label={f.tripLabel}>
                    <select className="field" value={trip} onChange={(event) => setTrip(event.target.value)}>
                      <option value="">{f.notSure}</option>
                      {ordered.map((item) => (
                        <option key={item.id} value={item.slug}>
                          {tx(item.title, locale)} · {item.durationDays} {t.days}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {chosen ? <p className="mt-2 text-sm text-muted">{tx(chosen.summary, locale)}</p> : null}
                </div>
              </Travellers>
            </Step>
            <Step n={2} title={f.stepAbout}>
              <AboutYou f={f} name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} country={country} setCountry={setCountry} />
              <div className="mt-4">
                <Field label={f.questionsLabel}>
                  <textarea className="field min-h-36" value={questions} placeholder={f.questionsPh} onChange={(event) => setQuestions(event.target.value)} />
                </Field>
              </div>
            </Step>
            <Honeypot value={botcheck} onChange={setBotcheck} />
            <SubmitRow label={f.sendInquiry} busy={busy} error={error} sending={t.sending} />
          </form>
        )}
      </div>
    </div>
  );
}

function SubmitRow({ label, busy, error, sending }: { label: string; busy: boolean; error: string; sending: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button className="btn btn-gold px-7 py-4 text-base" type="submit" disabled={busy}>
        {busy ? sending : label} <span aria-hidden="true">→</span>
      </button>
      {error ? (
        <p className="text-clay" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Plan your own trip                                                  */
/* ------------------------------------------------------------------ */

export function PlanTripQuery() {
  const params = useSearchParams();
  return <PlanTripView fromTrip={params.get("trip") ?? ""} fromPlace={params.get("place") ?? ""} />;
}

export function PlanTripView({ fromTrip = "", fromPlace = "" }: { fromTrip?: string; fromPlace?: string }) {
  const { t, trips, destinations, locale } = useSite();
  const { f, en } = useForms();
  usePageTitle(f.planTitle);
  const { send, busy } = useSender();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [arrival, setArrival] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [days, setDays] = useState(10);
  const [places, setPlaces] = useState<string[]>([]);
  const [otherPlaceOn, setOtherPlaceOn] = useState(false);
  const [otherPlace, setOtherPlace] = useState("");
  const [interests, setInterests] = useState<InterestId[]>([]);
  const [otherInterestOn, setOtherInterestOn] = useState(false);
  const [otherInterest, setOtherInterest] = useState("");
  const [stay, setStay] = useState<StayId>("comfort");
  const [pace, setPace] = useState<Pace>("moderate");
  const [prefs, setPrefs] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const baseTrip = trips.find((item) => item.slug === fromTrip);

  // Start from a trip plan ("Change it to suit you") or a place, once the content is loaded.
  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current) return;
    if (baseTrip) {
      seeded.current = true;
      setPlaces(baseTrip.destinationSlugs.filter((slug) => destinations.some((place) => place.slug === slug)));
      setDays(baseTrip.durationDays);
      setPace(baseTrip.pace);
    } else if (fromPlace && destinations.some((place) => place.slug === fromPlace)) {
      seeded.current = true;
      setPlaces([fromPlace]);
    }
  }, [baseTrip, fromPlace, destinations]);

  const groups = useMemo(() => {
    const sorted = sortByOrder(destinations);
    return regionOrder
      .map((region) => ({ region, items: sorted.filter((place) => place.region === region) }))
      .filter((group) => group.items.length);
  }, [destinations]);

  function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
  }

  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setArrival("");
    setFlexible(false);
    setAdults(2);
    setKids(0);
    setDays(10);
    setPlaces([]);
    setOtherPlaceOn(false);
    setOtherPlace("");
    setInterests([]);
    setOtherInterestOn(false);
    setOtherInterest("");
    setStay("comfort");
    setPace("moderate");
    setPrefs("");
    setError("");
    setSent(false);
  }

  const placeCount = places.length + (otherPlaceOn && otherPlace.trim() ? 1 : 0);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (botcheck) return setSent(true);
    if (!name.trim() || !isEmail(email)) return setError(f.errorRequired);
    if (placeCount === 0) return setError(f.errorPlaces);
    setError("");

    const placeNames = places
      .map((slug) => destinations.find((place) => place.slug === slug))
      .filter((place) => place !== undefined)
      .map((place) => tx(place.name, "en"));
    if (otherPlaceOn && otherPlace.trim()) placeNames.push(`${en.otherPlace}: ${otherPlace.trim()}`);
    const interestNames = interests.map((id) => en.interests[id]);
    if (otherInterestOn && otherInterest.trim()) interestNames.push(`${en.otherInterest}: ${otherInterest.trim()}`);

    const message = [
      en.planTitle,
      lines([
        [en.daysLabel, String(days)],
        [en.arrival, arrivalText(arrival, flexible)],
        ["Travellers", travellersText(adults, kids)],
        ["Started from", baseTrip ? tx(baseTrip.title, "en") : ""],
        [en.country, country],
        ["Language", locale],
      ]),
      `${en.placesLabel}:\n${placeNames.map((item) => `- ${item}`).join("\n")}`,
      lines([
        [en.interestsLabel, interestNames.join(", ")],
        [en.stayLabel, en.stays[stay]],
        [t.pace, formsPace(pace)],
      ]),
      prefs.trim() ? `${en.prefsLabel}:\n${prefs.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const ok = await send({
      name,
      email,
      phone,
      subject: `${en.planTitle}: ${days} days`,
      message,
      trip: baseTrip ? `Custom, from ${tx(baseTrip.title, "en")}` : "Custom trip",
    });
    if (!ok) return setError(f.errorSend);
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <PageHero slot="pagePlan" kicker={f.ctaKicker} title={f.planTitle} lead={f.planLead} narrow />
      <div className="mx-auto max-w-4xl px-5 py-10">
        {sent ? (
          <Success f={f} onAgain={reset} />
        ) : (
          <form onSubmit={onSubmit} className="grid gap-6" noValidate>
            <Step n={1} title={f.stepTrip}>
              <Travellers
                f={f}
                arrival={arrival}
                setArrival={setArrival}
                flexible={flexible}
                setFlexible={setFlexible}
                adults={adults}
                setAdults={setAdults}
                kids={kids}
                setKids={setKids}
              >
                <Field label={f.daysLabel}>
                  <input className="field" type="number" min={1} max={60} value={days} onChange={(event) => setDays(Math.min(60, Math.max(1, Number(event.target.value) || 1)))} />
                </Field>
                <div className="hidden sm:block" />
              </Travellers>
            </Step>

            <Step n={2} title={f.stepPlaces}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">{f.placesLabel}</p>
                <p className="text-sm text-muted">
                  {placeCount ? (
                    <span className="rounded-full bg-gold-soft px-3 py-1 font-semibold text-ink">
                      {placeCount} {f.selected}
                    </span>
                  ) : (
                    f.placesHint
                  )}
                </p>
              </div>
              <div className="mt-4 grid gap-5">
                {groups.map((group) => (
                  <div key={group.region}>
                    <p className="text-xs uppercase tracking-[0.18em] text-lagoon">{t.regions[group.region]}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((place) => (
                        <Chip key={place.id} label={tx(place.name, locale)} checked={places.includes(place.slug)} onChange={() => setPlaces(toggle(places, place.slug))} />
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Chip label={f.otherPlace} checked={otherPlaceOn} onChange={() => setOtherPlaceOn(!otherPlaceOn)} />
                  </div>
                  {otherPlaceOn ? (
                    <div className="mt-3">
                      <Field label={f.otherPlace}>
                        <input className="field" value={otherPlace} placeholder={f.otherPlacePh} onChange={(event) => setOtherPlace(event.target.value)} autoFocus />
                      </Field>
                    </div>
                  ) : null}
                </div>
              </div>
            </Step>

            <Step n={3} title={f.stepStyle}>
              <p className="font-medium">{f.interestsLabel}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {interestIds.map((id) => (
                  <Chip key={id} label={f.interests[id]} checked={interests.includes(id)} onChange={() => setInterests(toggle(interests, id))} />
                ))}
                <Chip label={f.otherInterest} checked={otherInterestOn} onChange={() => setOtherInterestOn(!otherInterestOn)} />
              </div>
              {otherInterestOn ? (
                <div className="mt-3">
                  <Field label={f.otherInterest}>
                    <input className="field" value={otherInterest} placeholder={f.otherInterestPh} onChange={(event) => setOtherInterest(event.target.value)} autoFocus />
                  </Field>
                </div>
              ) : null}

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-medium">{f.stayLabel}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {stayIds.map((id) => (
                      <Chip key={id} type="radio" name="stay" label={f.stays[id]} checked={stay === id} onChange={() => setStay(id)} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium">{t.pace}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {paceOrder.map((id) => (
                      <Chip key={id} type="radio" name="pace" label={t.paces[id]} checked={pace === id} onChange={() => setPace(id)} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Field label={f.prefsLabel}>
                  <textarea className="field min-h-32" value={prefs} placeholder={f.prefsPh} onChange={(event) => setPrefs(event.target.value)} />
                </Field>
              </div>
            </Step>

            <Step n={4} title={f.stepAbout}>
              <AboutYou f={f} name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} country={country} setCountry={setCountry} />
            </Step>

            <Honeypot value={botcheck} onChange={setBotcheck} />
            <SubmitRow label={f.sendPlan} busy={busy} error={error} sending={t.sending} />
          </form>
        )}
      </div>
    </div>
  );
}

function formsPace(pace: Pace) {
  return { relaxed: "Relaxed", moderate: "Moderate", active: "Active" }[pace];
}

/* ------------------------------------------------------------------ */
/* Buttons and the home-page band                                      */
/* ------------------------------------------------------------------ */

export function InquiryButtons({ tone = "dark", tripSlug }: { tone?: "dark" | "light"; tripSlug?: string }) {
  const { f } = useForms();
  const q = tripSlug ? `?trip=${encodeURIComponent(tripSlug)}` : "";
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={`/inquiry/${q}`} className="btn btn-gold cta-glow">
        <span aria-hidden="true">✉</span> {tripSlug ? f.askThisTour : f.inquiryCta}
      </Link>
      <Link href={`/plan-your-trip/${q}`} className={`btn ${tone === "dark" ? "btn-line" : "btn-lagoon"}`}>
        <span aria-hidden="true">✦</span> {tripSlug ? f.customiseTour : f.planCta}
      </Link>
    </div>
  );
}

export function StartBand() {
  const { f } = useForms();
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <p className="text-xs uppercase tracking-[0.22em] text-clay">{f.ctaKicker}</p>
      <h2 className="font-display mt-2 text-4xl">{f.ctaTitle}</h2>
      <p className="mt-3 max-w-2xl text-muted">{f.ctaLead}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <StartCard href="/inquiry/" icon="✉" title={f.inquiryCta} body={f.inquiryCardBody} tone="lagoon" />
        <StartCard href="/plan-your-trip/" icon="✦" title={f.planCta} body={f.planCardBody} tone="gold" />
      </div>
    </section>
  );
}

function StartCard({ href, icon, title, body, tone }: { href: string; icon: string; title: string; body: string; tone: "lagoon" | "gold" }) {
  const dark = tone === "lagoon";
  return (
    <Link
      href={href}
      className={`start-card group relative block overflow-hidden rounded-[32px] p-7 sm:p-9 ${dark ? "bg-lagoon-deep text-foam" : "bg-gold text-ink"}`}
    >
      <span className="hero-bg" aria-hidden="true">
        <span className={`hero-orb ${dark ? "hero-orb-gold" : "hero-orb-teal"}`} />
      </span>
      <span className="relative flex items-start justify-between gap-4">
        <span>
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${dark ? "bg-foam/10 text-gold" : "bg-ink/10"}`} aria-hidden="true">
            {icon}
          </span>
          <span className="font-display mt-5 block text-3xl">{title}</span>
          <span className={`mt-2 block max-w-sm ${dark ? "text-foam/75" : "text-ink/75"}`}>{body}</span>
        </span>
        <span
          className={`start-arrow mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl ${dark ? "bg-gold text-ink" : "bg-ink text-foam"}`}
          aria-hidden="true"
        >
          →
        </span>
      </span>
    </Link>
  );
}
