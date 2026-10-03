import { TripDetail } from "@/components/TripsView";
import { content } from "@/data/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return content.trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trip = content.trips.find((item) => item.slug === slug);
  return { title: trip?.title.en ?? "Trip plan", description: trip?.summary.en };
}

export default async function TripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <TripDetail slug={slug} />;
}
