import type { Metadata } from "next";
import MembersHero from "@/components/members/MembersHero";
import OriginSection from "@/components/members/OriginSection";
import GrowthSection from "@/components/members/GrowthSection";
import FeaturedMembersSection from "@/components/members/FeaturedMembersSection";
import CollectiveStats from "@/components/members/CollectiveStats";
import MemberGallery from "@/components/members/MemberGallery";
import JoinSection from "@/components/members/JoinSection";
import { getFeaturedMembers, getAllMembers, getSectionBackgroundBySlug } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Our Members",
  description:
    "Meet 100+ seasoned experts, diverse thinkers, and award-winning senior leaders. A curated network with a shared passion for making the work work better.",
};

export default async function MembersPage() {
  const [featuredMembers, allMembers, heroBg] = await Promise.all([
    getFeaturedMembers(),
    getAllMembers(),
    getSectionBackgroundBySlug("dark-mountain"),
  ]);

  return (
    <>
      <MembersHero backgroundUrl={heroBg?.imageUrl} overlayColor={heroBg?.overlayColor} />
      <OriginSection />
      <GrowthSection />
      <FeaturedMembersSection members={featuredMembers} />
      <CollectiveStats />
      <MemberGallery members={allMembers} />
      <JoinSection />
    </>
  );
}
