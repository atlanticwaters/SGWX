import type { Metadata } from "next";
import SpotlightsHero from "@/components/spotlights/SpotlightsHero";
import SpotlightsGrid from "@/components/spotlights/SpotlightsGrid";
import { getAllBlogPosts, getSectionBackgroundBySlug } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Spotlights",
  description:
    "Insights, featured work, and perspectives from the Sageworx collective.",
};

export default async function SpotlightsPage() {
  const [blogPosts, heroBg] = await Promise.all([
    getAllBlogPosts(),
    getSectionBackgroundBySlug("layered-terrain"),
  ]);

  return (
    <>
      <SpotlightsHero backgroundUrl={heroBg?.imageUrl} overlayColor={heroBg?.overlayColor} />
      <SpotlightsGrid spotlights={blogPosts} />
    </>
  );
}
