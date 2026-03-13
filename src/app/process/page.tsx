import type { Metadata } from "next";
import ProcessHero from "@/components/process/ProcessHero";
import ProcessIntro from "@/components/process/ProcessIntro";
import PrinciplesSection from "@/components/process/PrinciplesSection";
import SixStepsSection from "@/components/process/SixStepsSection";
import GovernanceSection from "@/components/process/GovernanceSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import StageNav from "@/components/process/StageNav";
import { getSectionBackgroundBySlug, getProcessPage } from "@/lib/sanity/queries";

export const revalidate = 60;

const fallbackMeta = {
  title: "Our Process",
  description:
    "The Operating System Behind the Work \u2014 a clear, six-step process designed to move senior teams from strategic clarity to creative execution.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProcessPage();
  return {
    title: data?.seo?.title ?? fallbackMeta.title,
    description: data?.seo?.description ?? fallbackMeta.description,
  };
}

export default async function ProcessPage() {
  const [fallbackBg, data] = await Promise.all([
    getSectionBackgroundBySlug("fluid-waves"),
    getProcessPage(),
  ]);
  const heroBg = data?.heroBackground ?? fallbackBg;

  return (
    <>
      <StageNav />
      <ProcessHero
        backgroundUrl={heroBg?.imageUrl}
        overlayColor={heroBg?.overlayColor}
        eyebrow={data?.heroEyebrow}
        heading={data?.heroHeading}
        body={data?.heroBody}
      />
      <ProcessIntro />
      <PrinciplesSection
        eyebrow={data?.principlesEyebrow}
        heading={data?.principlesHeading}
        cards={data?.principlesCards}
      />
      <SixStepsSection
        eyebrow={data?.sixStepsEyebrow}
        heading={data?.sixStepsHeading}
        steps={data?.sixStepsItems}
      />
      <GovernanceSection
        eyebrow={data?.governanceEyebrow}
        heading={data?.governanceHeading}
        bullets={data?.governanceBullets}
      />
      <FinalCtaSection
        heading={data?.closeHeading}
        primaryCta={data?.closeCta ? { label: data.closeCta.label, href: data.closeCta.href } : undefined}
      />
    </>
  );
}
