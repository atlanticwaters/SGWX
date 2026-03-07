import type { Metadata } from "next";
import WorkHero from "@/components/work/WorkHero";
import CaseStudyGrid from "@/components/work/CaseStudyGrid";
import { getAllCaseStudies, getSectionBackgroundBySlug, getWorkPage } from "@/lib/sanity/queries";

export const revalidate = 60;

const fallbackMeta = {
  title: "Our Work",
  description:
    "Real outcomes for real brands. Explore how Sageworx teams have delivered impact across industries.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWorkPage();
  return {
    title: data?.seo?.title ?? fallbackMeta.title,
    description: data?.seo?.description ?? fallbackMeta.description,
  };
}

export default async function WorkPage() {
  const [caseStudies, fallbackBg, data] = await Promise.all([
    getAllCaseStudies(),
    getSectionBackgroundBySlug("geometric-architecture"),
    getWorkPage(),
  ]);
  const heroBg = data?.heroBackground ?? fallbackBg;

  return (
    <>
      <WorkHero
        count={caseStudies.length}
        backgroundUrl={heroBg?.imageUrl}
        overlayColor={heroBg?.overlayColor}
        heading={data?.heroHeading}
        subheading={data?.heroSubheading}
        projectsLabel={data?.heroProjectsLabel}
        statusLabel={data?.heroStatusLabel}
        statusValue={data?.heroStatusValue}
      />
      <CaseStudyGrid caseStudies={caseStudies} />
    </>
  );
}
