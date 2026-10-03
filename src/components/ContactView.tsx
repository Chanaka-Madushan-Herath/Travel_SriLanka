"use client";

import { ContactDetails } from "@/components/Footer";
import { Field } from "@/components/ui";
import { usePageTitle, useSite } from "@/context/SiteContext";
import { firebaseReady, submitRemoteMessage } from "@/lib/firebase";
import { isEmail, tx, uid } from "@/lib/utils";
import { useState } from "react";

export function ContactView() {
  const { t, settings, trips, locale, addMessage } = useSite();
  usePageTitle(t.nav.contact);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [trip, setTrip] = useState("");
  const [botcheck, setBotcheck] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    if (botcheck) {
      setStatus("sent");
      return;
    }
    if (!name.trim() || !isEmail(email) || !message.trim()) {
      setStatus("error");
      return;
    }
    const entry = {
      name: name.trim().slice(0, 120),
      email: email.trim().slice(0, 200),
      phone: phone.trim().slice(0, 60),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
      trip: trip.slice(0, 200),
    };
    if (firebaseReady(settings.firebase)) {
      setBusy(true);
      try {
        await submitRemoteMessage(settings.firebase, entry);
      } catch {
        setBusy(false);
        setStatus("error");
        return;
      }
      setBusy(false);
    } else {
      addMessage({ id: uid("msg"), ...entry, createdAt: new Date().toISOString() });
    }
    setStatus("sent");
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    setTrip("");
    setBotcheck(false);
  }

  return (
    <div>
      <header className="bg-lagoon-deep text-foam">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="font-display text-5xl">{t.contactTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-foam/75">{t.contactLead}</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-foam p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.yourName}>
              <input className="field" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
            </Field>
            <Field label={t.yourEmail}>
              <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
            </Field>
            <Field label={t.yourPhone}>
              <input className="field" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
            </Field>
            <Field label={t.yourSubject}>
              <input className="field" value={subject} onChange={(event) => setSubject(event.target.value)} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label={t.tripInterest}>
              <select className="field" value={trip} onChange={(event) => setTrip(event.target.value)}>
                <option value="">{t.noTrip}</option>
                {trips.map((item) => (
                  <option key={item.id} value={tx(item.title, "en")}>
                    {tx(item.title, locale)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label={t.yourMessage}>
              <textarea className="field min-h-40" value={message} onChange={(event) => setMessage(event.target.value)} required />
            </Field>
          </div>
          <div className="hidden" aria-hidden="true">
            <input type="checkbox" name="botcheck" checked={botcheck} onChange={(event) => setBotcheck(event.target.checked)} tabIndex={-1} />
          </div>
          {status === "sent" ? <p className="mt-4 text-lagoon">{t.contactSuccess}</p> : null}
          {status === "error" ? <p className="mt-4 text-clay">{t.contactError}</p> : null}
          <button className="btn btn-lagoon mt-5" type="submit" disabled={busy}>
            {t.send}
          </button>
        </form>
        <aside className="rounded-[28px] bg-foam p-6">
          <h2 className="font-display text-3xl">{tx(settings.siteName, locale)}</h2>
          <p className="mt-3 text-muted">{tx(settings.about, locale)}</p>
          <div className="mt-6">
            <ContactDetails />
          </div>
        </aside>
      </div>
    </div>
  );
}
