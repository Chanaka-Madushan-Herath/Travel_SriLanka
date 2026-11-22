import { PlanTripQuery, PlanTripView } from "@/components/InquiryForms";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Plan your own trip" };

export default function PlanYourTripPage() {
  return (
    <Suspense fallback={<PlanTripView />}>
      <PlanTripQuery />
    </Suspense>
  );
}
