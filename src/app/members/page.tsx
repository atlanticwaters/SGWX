import type { Metadata } from "next";
import MembersHero from "@/components/members/MembersHero";
import OriginSection from "@/components/members/OriginSection";
import GrowthSection from "@/components/members/GrowthSection";
import FeaturedMembersSection from "@/components/members/FeaturedMembersSection";
import CollectiveStats from "@/components/members/CollectiveStats";
import MemberGallery from "@/components/members/MemberGallery";
import JoinSection from "@/components/members/JoinSection";

export const metadata: Metadata = {
  title: "Our Members",
  description:
    "Meet 100+ seasoned experts, diverse thinkers, and award-winning senior leaders. A curated network with a shared passion for making the work work better.",
};

export default function MembersPage() {
  return (
    <>
      <MembersHero />
      <OriginSection />
      <GrowthSection />
      <FeaturedMembersSection />
      <CollectiveStats />
      <MemberGallery />
      <JoinSection />
    </>
  );
}
