"use client";

import { defaultImages, scenes } from "@/components/PageHero";
import { useSite } from "@/context/SiteContext";
import { formsText } from "@/lib/formsText";
import type { ImageSlot, SiteSettings } from "@/lib/types";
import { vibeText } from "@/lib/vibeText";
import { useState } from "react";

type Spot = { key: ImageSlot | "heroImage"; label: string };

function looksLikeImageLink(value: string) {
  return /^(https?:)?\/\//i.test(value) || value.startsWith("/");
}

/** One photo spot: a preview, the link field and a reset button. */
function SpotField({
  label,
  value,
  fallback,
  onChange,
}: {
  label: string;
  value: string;
  fallback: string;
  onChange: (value: string) => void;
}) {
  const { locale } = useSite();
  const a = vibeText[locale].admin;
  const custom = value.trim();
  const shown = custom || fallback;
  const [broken, setBroken] = useState("");
  const bad = custom !== "" && !looksLikeImageLink(custom);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper/40">
      <div className="relative h-32 bg-[linear-gradient(150deg,#123f38_0%,#c9842a_120%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={shown}
          src={shown}
          alt=""
          loading="lazy"
          className={`h-full w-full object-cover ${broken === shown ? "hidden" : ""}`}
          onError={() => setBroken(shown)}
          onLoad={() => setBroken("")}
        />
        {custom ? null : (
          <span className="absolute left-2 top-2 rounded-full bg-lagoon-deep/75 px-2.5 py-0.5 text-[11px] font-semibold text-foam">{a.builtIn}</span>
        )}
      </div>
      <div className="grid gap-2 p-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">{label}</span>
          <input className="field" value={value} placeholder="https://…" onChange={(event) => onChange(event.target.value)} inputMode="url" autoComplete="off" />
        </label>
        {bad ? <p className="text-xs text-clay">{a.badLink}</p> : null}
        {!bad && custom && broken === shown ? <p className="text-xs text-clay">{a.broken}</p> : null}
        {custom ? (
          <button type="button" className="w-fit text-xs font-semibold text-lagoon underline" onClick={() => onChange("")}>
            {a.useDefault}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function ImagesSection({ draft, setDraft }: { draft: SiteSettings; setDraft: (next: SiteSettings) => void }) {
  const { t, locale } = useSite();
  const v = vibeText[locale];
  const f = formsText[locale];
  const a = v.admin;

  const groups: { title: string; spots: Spot[] }[] = [
    {
      title: a.slides,
      spots: [
        { key: "heroImage", label: v.themes.heritage.label },
        { key: "heroWildlife", label: v.themes.wildlife.label },
        { key: "heroBeach", label: v.themes.beach.label },
        { key: "heroMountains", label: v.themes.mountains.label },
      ],
    },
    {
      title: a.tiles,
      spots: [
        { key: "tileHeritage", label: v.themes.heritage.label },
        { key: "tileWildlife", label: v.themes.wildlife.label },
        { key: "tileBeach", label: v.themes.beach.label },
        { key: "tileMountains", label: v.themes.mountains.label },
      ],
    },
    {
      title: a.backgrounds,
      spots: [
        { key: "statsBg", label: a.stats },
        { key: "bandBg", label: a.band },
      ],
    },
    {
      title: a.pages,
      spots: [
        { key: "pageTrips", label: t.nav.trips },
        { key: "pagePlaces", label: t.nav.destinations },
        { key: "pageNotes", label: t.nav.reviews },
        { key: "pageContact", label: t.nav.contact },
        { key: "pageInquiry", label: f.inquiryTitle },
        { key: "pagePlan", label: f.planTitle },
      ],
    },
  ];

  function valueOf(key: Spot["key"]) {
    return key === "heroImage" ? draft.heroImage : (draft.images?.[key] ?? "");
  }

  function update(key: Spot["key"], value: string) {
    if (key === "heroImage") {
      setDraft({ ...draft, heroImage: value });
      return;
    }
    const images = { ...(draft.images ?? {}) };
    if (value.trim()) images[key] = value.trim();
    else delete images[key];
    setDraft({ ...draft, images });
  }

  return (
    <fieldset className="grid gap-6 rounded-[24px] border border-line p-5">
      <legend className="px-2 font-semibold">{a.title}</legend>
      <p className="-mt-2 text-sm text-muted">{a.help}</p>
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">{group.title}</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.spots.map((spot) => (
              <SpotField
                key={spot.key}
                label={spot.label}
                value={valueOf(spot.key)}
                fallback={spot.key === "heroImage" ? scenes.sigiriya : defaultImages[spot.key]}
                onChange={(value) => update(spot.key, value)}
              />
            ))}
          </div>
        </div>
      ))}
    </fieldset>
  );
}
