import type { Metadata } from "next";
import StyleGuideClient from "./StyleGuideClient";
import { getStyleGuidePage } from "@/lib/sanity/queries";

export const revalidate = 60;

const fallbackMeta = {
  title: "Style Guide",
  description: "SGWX Design System — tokens, components, and patterns.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStyleGuidePage();
  return {
    title: data?.seo?.title ?? fallbackMeta.title,
    description: data?.seo?.description ?? fallbackMeta.description,
    robots: { index: false, follow: false },
  };
}

export default async function StyleGuidePage() {
  const data = await getStyleGuidePage();

  return (
    <StyleGuideClient
      headerHeading={data?.headerHeading}
      headerSubheading={data?.headerSubheading}
      sectionDescriptions={data?.sectionDescriptions}
    />
  );
}
