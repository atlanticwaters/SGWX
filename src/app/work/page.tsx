import type { Metadata } from "next";
import WorkHero from "@/components/work/WorkHero";
import CaseStudyGrid from "@/components/work/CaseStudyGrid";
import { getAllCaseStudies, getSectionBackgroundBySlug } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real outcomes for real brands. Explore how Sageworx teams have delivered impact across industries.",
};

export default async function WorkPage() {
  const [caseStudies, heroBg] = await Promise.all([
    getAllCaseStudies(),
    getSectionBackgroundBySlug("geometric-architecture"),
  ]);

  return (
    <>
      <WorkHero count={caseStudies.length} backgroundUrl={heroBg?.imageUrl} overlayColor={heroBg?.overlayColor} />
      <CaseStudyGrid caseStudies={caseStudies} />
    </>
  );
}
