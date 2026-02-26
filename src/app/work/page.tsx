import type { Metadata } from "next";
import WorkHero from "@/components/work/WorkHero";
import CaseStudyGrid from "@/components/work/CaseStudyGrid";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real outcomes for real brands. Explore how Sageworx teams have delivered impact across industries.",
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <CaseStudyGrid />
    </>
  );
}
