"use client";

import { ReviewSection } from "@/components/ReviewSection";
import { PageHero } from "@/components/PageHero";
import { usePageTitle, useSite } from "@/context/SiteContext";

export function ReviewsView() {
  const { t } = useSite();
  usePageTitle(t.nav.reviews);

  return (
    <div>
      <PageHero slot="pageNotes" kicker={t.nav.reviews} title={t.reviewsTitle} lead={t.reviewsPageLead} narrow />
      <div className="mx-auto max-w-3xl px-5 py-10">
        <ReviewSection heading={t.reviewsTitle} />
      </div>
    </div>
  );
}
