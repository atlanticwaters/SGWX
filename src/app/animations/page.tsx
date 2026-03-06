import type { Metadata } from "next";
import AnimationsShowcase from "./AnimationsShowcase";
import { getAnimationsPage } from "@/lib/sanity/queries";

export const revalidate = 60;

const fallbackMeta = {
  title: "Animations Showcase",
  description: "SGWX 3D animation library — preview all available background animations.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAnimationsPage();
  return {
    title: data?.seo?.title ?? fallbackMeta.title,
    description: data?.seo?.description ?? fallbackMeta.description,
    robots: { index: false, follow: false },
  };
}

export default async function AnimationsPage() {
  const data = await getAnimationsPage();

  return (
    <AnimationsShowcase
      headerHeading={data?.headerHeading}
      headerSubheading={data?.headerSubheading}
      threeAnimations={data?.threeAnimations}
      deepFields={data?.deepFields}
    />
  );
}
