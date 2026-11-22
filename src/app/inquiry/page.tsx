import { TourInquiryQuery, TourInquiryView } from "@/components/InquiryForms";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Tour inquiry" };

export default function InquiryPage() {
  return (
    <Suspense fallback={<TourInquiryView />}>
      <TourInquiryQuery />
    </Suspense>
  );
}
