import { AdminView } from "@/components/AdminView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desk",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminView />;
}
