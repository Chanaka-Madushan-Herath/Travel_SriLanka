import { TripList, TripsQuery } from "@/components/TripsView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Trip plans" };

export default function TripsPage() {
  return (
    <Suspense fallback={<TripList />}>
      <TripsQuery />
    </Suspense>
  );
}
