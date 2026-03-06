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
import { getAllCaseStudies, getAllBlogPosts, getSectionBackgrounds, getMembersForStrip, getHomepage } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Sageworx | Go Further. Faster.",
  description:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts. No agency bloat. No freelancer roulette.",
};

export default async function Home() {
  const [caseStudies, blogPosts, backgrounds, members, homepage] = await Promise.all([
    getAllCaseStudies(),
    getAllBlogPosts(),
    getSectionBackgrounds(),
    getMembersForStrip(),
    getHomepage(),
  ]);

  // Build a slug -> { imageUrl, overlayColor } lookup for easy assignment
  const bg = Object.fromEntries(
    backgrounds.map((b) => [b.slug, { imageUrl: b.imageUrl, overlayColor: b.overlayColor }])
  );

  // Use featured case studies from CMS if configured, otherwise fall back to all
  const displayStudies = homepage?.featuredCaseStudies?.length
    ? homepage.featuredCaseStudies
    : caseStudies;
  const displayCount = homepage?.caseStudyDisplayCount ?? 4;

  return (
    <>
      <HeroSection
        heading={homepage?.heroHeading}
        paragraph1={homepage?.heroParagraph1}
        paragraph2={homepage?.heroParagraph2}
        primaryCta={homepage?.heroPrimaryCta}
        secondaryCta={homepage?.heroSecondaryCta}
      />
      <ChangingGameSection
        heading={homepage?.changingGameHeading}
        cards={homepage?.changingGameCards}
        backgroundUrl={bg["dark-foliage"]?.imageUrl}
        overlayColor={bg["dark-foliage"]?.overlayColor}
      />
      <ComparisonTable
        eyebrow={homepage?.comparisonEyebrow}
        heading={homepage?.comparisonHeading}
        columns={homepage?.comparisonColumns}
        rows={homepage?.comparisonRows}
        cta={homepage?.comparisonCta}
      />
      <SectionDivider />
      <ImpactSection
        eyebrow={homepage?.impactEyebrow}
        heading={homepage?.impactHeading}
        logoWallHeading={homepage?.logoWallHeading}
        logos={homepage?.logos}
        caseStudies={displayStudies.slice(0, displayCount)}
      />
      <ClientsSection
        eyebrow={homepage?.clientsEyebrow}
        heading={homepage?.clientsHeading}
        segments={homepage?.clientSegments}
        backgroundUrl={bg["geometric-architecture"]?.imageUrl}
        overlayColor={bg["geometric-architecture"]?.overlayColor}
      />
      <ExpertsSection
        eyebrow={homepage?.expertsEyebrow}
        heading={homepage?.expertsHeading}
        subheading={homepage?.expertsSubheading}
        members={members}
        backgroundUrl={bg["spiral-geometry"]?.imageUrl}
        overlayColor={bg["spiral-geometry"]?.overlayColor}
      />
      <SectionDivider />
      <ProcessSection
        eyebrow={homepage?.processEyebrow}
        heading={homepage?.processHeading}
        subheading={homepage?.processSubheading}
        stages={homepage?.processStages}
        footerLink={homepage?.processFooterLink}
        backgroundUrl={bg["fluid-waves"]?.imageUrl}
        overlayColor={bg["fluid-waves"]?.overlayColor}
      />
      <SectionDivider />
      <SpotlightsSection
        eyebrow={homepage?.spotlightsEyebrow}
        heading={homepage?.spotlightsHeading}
        cta={homepage?.spotlightsCta}
        posts={blogPosts}
        backgroundUrl={bg["dark-mountain"]?.imageUrl}
        overlayColor={bg["dark-mountain"]?.overlayColor}
      />
      <FinalCtaSection
        heading={homepage?.finalCtaHeading}
        primaryCta={homepage?.finalCtaPrimaryCta}
        secondaryCta={homepage?.finalCtaSecondaryCta}
        backgroundUrl={bg["abstract-curves"]?.imageUrl}
        overlayColor={bg["abstract-curves"]?.overlayColor}
      />
    </>
  );
}
