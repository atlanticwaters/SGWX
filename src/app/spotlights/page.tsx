import type { Metadata } from "next";
import SpotlightsHero from "@/components/spotlights/SpotlightsHero";
import SpotlightsGrid from "@/components/spotlights/SpotlightsGrid";
import { getAllBlogPosts, getSectionBackgroundBySlug, getSpotlightsPage } from "@/lib/sanity/queries";

const fallbackMeta = {
  title: "Spotlights",
  description:
    "Insights, featured work, and perspectives from the Sageworx collective.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSpotlightsPage();
  return {
    title: data?.seo?.title ?? fallbackMeta.title,
    description: data?.seo?.description ?? fallbackMeta.description,
  };
}

export default async function SpotlightsPage() {
  const [blogPosts, heroBg, data] = await Promise.all([
    getAllBlogPosts(),
    getSectionBackgroundBySlug("layered-terrain"),
    getSpotlightsPage(),
  ]);

  return (
    <>
      <SpotlightsHero
        backgroundUrl={heroBg?.imageUrl}
        overlayColor={heroBg?.overlayColor}
        heading={data?.heroHeading}
        subheading={data?.heroSubheading}
      />
      <SpotlightsGrid spotlights={blogPosts} />
    </>
  );
}
