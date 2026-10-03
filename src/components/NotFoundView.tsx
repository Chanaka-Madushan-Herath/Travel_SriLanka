"use client";

import { usePageTitle, useSite } from "@/context/SiteContext";
import Link from "next/link";

export function NotFoundView() {
  const { t } = useSite();
  usePageTitle(t.notFoundTitle);

  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="font-display text-5xl">{t.notFoundTitle}</h1>
      <p className="mt-4 text-lg text-muted">{t.notFoundBody}</p>
      <Link href="/" className="btn btn-lagoon mt-8">
        {t.backHome}
      </Link>
    </div>
  );
}
