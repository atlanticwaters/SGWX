import type { Metadata } from "next";
import ModelHero from "@/components/model/ModelHero";
import RightTeamSection from "@/components/model/RightTeamSection";
import CapabilitiesGrid from "@/components/model/CapabilitiesGrid";
import MicroteamSection from "@/components/model/MicroteamSection";
import MomentumSection from "@/components/model/MomentumSection";
import IcpSection from "@/components/model/IcpSection";
import ContinuitySection from "@/components/model/ContinuitySection";
import TechnologySection from "@/components/model/TechnologySection";
import FitSection from "@/components/model/FitSection";
import { getSectionBackgroundBySlug, getModelPage } from "@/lib/sanity/queries";

export const revalidate = 60;

const fallbackMeta = {
  title: "Our Model",
  description:
    "Senior, bespoke teams who already know how to work together. The Sageworx model delivers continuity and momentum without the overhead of a traditional agency.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getModelPage();
  return {
    title: data?.seo?.title ?? fallbackMeta.title,
    description: data?.seo?.description ?? fallbackMeta.description,
  };
}

export default async function ModelPage() {
  const [fallbackBg, capBg, data] = await Promise.all([
    getSectionBackgroundBySlug("spiral-geometry"),
    getSectionBackgroundBySlug("abstract-curves"),
    getModelPage(),
  ]);
  const heroBg = data?.heroBackground ?? fallbackBg;

  return (
    <>
      <ModelHero
        backgroundUrl={heroBg?.imageUrl}
        overlayColor={heroBg?.overlayColor}
        eyebrow={data?.heroEyebrow}
        heading={data?.heroHeading}
        body={data?.heroBody}
        primaryCta={data?.heroPrimaryCta}
        secondaryCta={data?.heroSecondaryCta}
      />
      <RightTeamSection
        eyebrow={data?.rightTeamEyebrow}
        heading={data?.rightTeamHeading}
        paragraphs={data?.rightTeamParagraphs}
      />
      <CapabilitiesGrid
        eyebrow={data?.capabilitiesEyebrow}
        tabs={data?.capabilitiesTabs}
        backgroundUrl={capBg?.imageUrl}
        overlayColor={capBg?.overlayColor}
      />
      <MicroteamSection
        eyebrow={data?.microteamsEyebrow}
        heading={data?.microteamsHeading}
        body={data?.microteamsBody}
        bullets={data?.microteamsBullets}
        closing={data?.microteamsClosing}
      />
      <MomentumSection
        eyebrow={data?.momentumEyebrow}
        heading={data?.momentumHeading}
        body={data?.momentumBody}
        bullets={data?.momentumBullets}
        closing={data?.momentumClosing}
      />
      <IcpSection
        eyebrow={data?.icpEyebrow}
        heading={data?.icpHeading}
        subheading={data?.icpSubheading}
        cards={data?.icpCards}
      />
      <ContinuitySection
        eyebrow={data?.continuityEyebrow}
        heading={data?.continuityHeading}
        paragraphs={data?.continuityParagraphs}
      />
      <TechnologySection
        eyebrow={data?.technologyEyebrow}
        heading={data?.technologyHeading}
        paragraphs={data?.technologyParagraphs}
      />
      <FitSection
        eyebrow={data?.fitEyebrow}
        heading={data?.fitHeading}
        subheading={data?.fitSubheading}
        goodItems={data?.fitGoodItems}
        notItems={data?.fitNotItems}
        closing={data?.fitClosing}
        ctas={data?.fitCtas}
      />
    </>
  );
}
