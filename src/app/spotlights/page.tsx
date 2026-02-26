import type { Metadata } from "next";
import SpotlightsHero from "@/components/spotlights/SpotlightsHero";
import SpotlightsGrid from "@/components/spotlights/SpotlightsGrid";

export const metadata: Metadata = {
  title: "Spotlights",
  description:
    "Insights, featured work, and perspectives from the Sageworx collective.",
};

export default function SpotlightsPage() {
  return (
    <>
      <SpotlightsHero />
      <SpotlightsGrid />
    </>
  );
}
