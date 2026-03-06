import type { Metadata } from "next";
import MembersHero from "@/components/members/MembersHero";
import OriginSection from "@/components/members/OriginSection";
import GrowthSection from "@/components/members/GrowthSection";
import FeaturedMembersSection from "@/components/members/FeaturedMembersSection";
import CollectiveStats from "@/components/members/CollectiveStats";
import MemberGallery from "@/components/members/MemberGallery";
import JoinSection from "@/components/members/JoinSection";
import { getFeaturedMembers, getAllMembers, getSectionBackgroundBySlug, getMembersPage } from "@/lib/sanity/queries";

const fallbackMeta = {
  title: "Our Members",
  description:
    "Meet 100+ seasoned experts, diverse thinkers, and award-winning senior leaders. A curated network with a shared passion for making the work work better.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMembersPage();
  return {
    title: data?.seo?.title ?? fallbackMeta.title,
    description: data?.seo?.description ?? fallbackMeta.description,
  };
}

export default async function MembersPage() {
  const [featuredMembers, allMembers, heroBg, data] = await Promise.all([
    getFeaturedMembers(),
    getAllMembers(),
    getSectionBackgroundBySlug("dark-mountain"),
    getMembersPage(),
  ]);

  return (
    <>
      <MembersHero
        backgroundUrl={heroBg?.imageUrl}
        overlayColor={heroBg?.overlayColor}
        heading={data?.heroHeading}
        body={data?.heroBody}
      />
      <OriginSection
        eyebrow={data?.originEyebrow}
        heading={data?.originHeading}
        paragraphs={data?.originParagraphs}
      />
      <GrowthSection
        eyebrow={data?.growthEyebrow}
        heading={data?.growthHeading}
        paragraphs={data?.growthParagraphs}
      />
      <FeaturedMembersSection members={featuredMembers} />
      <CollectiveStats
        eyebrow={data?.statsEyebrow}
        heading={data?.statsHeading}
        paragraphs={data?.statsParagraphs}
        stats={data?.statsItems}
      />
      <MemberGallery members={allMembers} />
      <JoinSection
        heading={data?.joinHeading}
        subheading={data?.joinSubheading}
        paragraphs={data?.joinParagraphs}
        cta={data?.joinCta}
      />
    </>
  );
}
