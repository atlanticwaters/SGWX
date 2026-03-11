import type { Metadata } from "next";
import MembersHero from "@/components/members/MembersHero";
import OriginSection from "@/components/members/OriginSection";
import GrowthSection from "@/components/members/GrowthSection";
import FeaturedMembersSection from "@/components/members/FeaturedMembersSection";
import CollectiveStats from "@/components/members/CollectiveStats";
import MemberGallery from "@/components/members/MemberGallery";
import JoinSection from "@/components/members/JoinSection";
import { getFeaturedMembers, getAllMembers, getSectionBackgroundBySlug, getMembersPage, getMemberBySlug } from "@/lib/sanity/queries";

export const revalidate = 60;

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
  const [featuredMembers, allMembers, fallbackBg, data, pat, marc, originBg, growthBg, featuredBg, statsBg, joinBg] = await Promise.all([
    getFeaturedMembers(),
    getAllMembers(),
    getSectionBackgroundBySlug("dark-mountain"),
    getMembersPage(),
    getMemberBySlug("patrick-conreaux"),
    getMemberBySlug("marc-calamia"),
    getSectionBackgroundBySlug("collaborative-workspace"),
    getSectionBackgroundBySlug("creative-workshop"),
    getSectionBackgroundBySlug("sage-leaves"),
    getSectionBackgroundBySlug("digital-mesh"),
    getSectionBackgroundBySlug("joyful-creator"),
  ]);
  const heroBg = data?.heroBackground ?? fallbackBg;
  const founders = [pat, marc]
    .filter(Boolean)
    .map((m) => ({ name: m!.name, slug: m!.slug, title: m!.title, photoUrl: m!.photoUrl }));

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
        founders={founders}
        backgroundUrl={originBg?.imageUrl}
        overlayColor={originBg?.overlayColor}
      />
      <GrowthSection
        eyebrow={data?.growthEyebrow}
        heading={data?.growthHeading}
        paragraphs={data?.growthParagraphs}
        backgroundUrl={growthBg?.imageUrl}
        overlayColor={growthBg?.overlayColor}
      />
      <FeaturedMembersSection
        members={featuredMembers}
        backgroundUrl={featuredBg?.imageUrl}
        overlayColor={featuredBg?.overlayColor}
      />
      <CollectiveStats
        eyebrow={data?.statsEyebrow}
        heading={data?.statsHeading}
        paragraphs={data?.statsParagraphs}
        stats={data?.statsItems}
        backgroundUrl={statsBg?.imageUrl}
        overlayColor={statsBg?.overlayColor}
      />
      <MemberGallery members={allMembers} />
      <JoinSection
        heading={data?.joinHeading}
        subheading={data?.joinSubheading}
        paragraphs={data?.joinParagraphs}
        cta={data?.joinCta}
        backgroundUrl={joinBg?.imageUrl}
        overlayColor={joinBg?.overlayColor}
      />
    </>
  );
}
