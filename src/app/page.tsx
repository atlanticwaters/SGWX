import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ChangingGameSection from "@/components/home/ChangingGameSection";
import ComparisonTable from "@/components/home/ComparisonTable";
import ClientsSection from "@/components/home/ClientsSection";
import ExpertsSection from "@/components/home/ExpertsSection";
import ProcessSection from "@/components/home/ProcessSection";
import ImpactSection from "@/components/home/ImpactSection";
import SpotlightsSection from "@/components/home/SpotlightsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { getAllCaseStudies, getAllBlogPosts, getSectionBackgrounds } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Sageworx | Go Further. Faster.",
  description:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts. No agency bloat. No freelancer roulette.",
};

export default async function Home() {
  const [caseStudies, blogPosts, backgrounds] = await Promise.all([
    getAllCaseStudies(),
    getAllBlogPosts(),
    getSectionBackgrounds(),
  ]);

  // Build a slug -> imageUrl lookup for easy assignment
  const bg = Object.fromEntries(backgrounds.map((b) => [b.slug, b.imageUrl]));

  return (
    <>
      <HeroSection />
      <ChangingGameSection backgroundUrl={bg["dark-foliage"]} />
      <ComparisonTable />
      <SectionDivider />
      <ClientsSection backgroundUrl={bg["geometric-architecture"]} />
      <ExpertsSection backgroundUrl={bg["spiral-geometry"]} />
      <SectionDivider />
      <ProcessSection backgroundUrl={bg["fluid-waves"]} />
      <ImpactSection caseStudies={caseStudies} />
      <SectionDivider />
      <SpotlightsSection posts={blogPosts} backgroundUrl={bg["dark-mountain"]} />
      <FinalCtaSection backgroundUrl={bg["abstract-curves"]} />
    </>
  );
}
