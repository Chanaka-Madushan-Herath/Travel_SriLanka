"use client";

import { ReviewSection } from "@/components/ReviewSection";
import { usePageTitle, useSite } from "@/context/SiteContext";

export function ReviewsView() {
  const { t } = useSite();
  usePageTitle(t.nav.reviews);

  return (
    <div>
      <header className="bg-lagoon-deep text-foam">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-5xl">{t.reviewsTitle}</h1>
          <p className="mt-4 text-lg text-foam/75">{t.reviewsPageLead}</p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-5 py-10">
        <ReviewSection heading={t.reviewsTitle} />
      </div>
    </div>
  );
}
