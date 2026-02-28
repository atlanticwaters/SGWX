import type { Metadata } from "next";
import { getAllLandingPages } from "@/lib/sanity/queries";
import LandingPagesClient from "./LandingPagesClient";

export const metadata: Metadata = {
  title: "Landing Pages",
  description: "Create and manage prospect landing pages.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LandingPagesPage() {
  const pages = await getAllLandingPages();
  return <LandingPagesClient initialPages={pages} />;
}
