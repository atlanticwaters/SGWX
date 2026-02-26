import type { Metadata } from "next";
import WorkHero from "@/components/work/WorkHero";
import CaseStudyGrid from "@/components/work/CaseStudyGrid";
import { getAllCaseStudies } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real outcomes for real brands. Explore how Sageworx teams have delivered impact across industries.",
};

export default async function WorkPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <WorkHero />
      <CaseStudyGrid caseStudies={caseStudies} />
    </>
  );
}
