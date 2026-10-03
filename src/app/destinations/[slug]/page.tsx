import { DestinationDetail } from "@/components/DestinationsView";
import { content } from "@/data/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return content.destinations.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = content.destinations.find((item) => item.slug === slug);
  return { title: place?.name.en ?? "Place", description: place?.summary.en };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DestinationDetail slug={slug} />;
}
