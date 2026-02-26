import type { Metadata } from "next";
import SpotlightsHero from "@/components/spotlights/SpotlightsHero";
import SpotlightsGrid from "@/components/spotlights/SpotlightsGrid";
import { getAllBlogPosts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Spotlights",
  description:
    "Insights, featured work, and perspectives from the Sageworx collective.",
};

export default async function SpotlightsPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
      <SpotlightsHero />
      <SpotlightsGrid spotlights={blogPosts} />
    </>
  );
}
