import MembersHero from "@/components/members/MembersHero";
import OriginSection from "@/components/members/OriginSection";
import GrowthSection from "@/components/members/GrowthSection";
import FeaturedMembersSection from "@/components/members/FeaturedMembersSection";
import CollectiveStats from "@/components/members/CollectiveStats";
import MemberGallery from "@/components/members/MemberGallery";
import JoinSection from "@/components/members/JoinSection";

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
