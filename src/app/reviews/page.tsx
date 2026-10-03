import { ReviewsView } from "@/components/ReviewsView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notes" };

export default function ReviewsPage() {
  return <ReviewsView />;
}
