import { DestinationList, DestinationsQuery } from "@/components/DestinationsView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Places" };

export default function DestinationsPage() {
  return (
    <Suspense fallback={<DestinationList />}>
      <DestinationsQuery />
    </Suspense>
  );
}
