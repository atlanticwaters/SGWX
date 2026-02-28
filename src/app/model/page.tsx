import type { Metadata } from "next";
import ModelHero from "@/components/model/ModelHero";
import RightTeamSection from "@/components/model/RightTeamSection";
import CapabilitiesGrid from "@/components/model/CapabilitiesGrid";
import MicroteamSection from "@/components/model/MicroteamSection";
import MomentumSection from "@/components/model/MomentumSection";
import IcpSection from "@/components/model/IcpSection";
import ContinuitySection from "@/components/model/ContinuitySection";
import TechnologySection from "@/components/model/TechnologySection";
import FitSection from "@/components/model/FitSection";
import { getSectionBackgroundBySlug } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Our Model",
  description:
    "Senior, bespoke teams who already know how to work together. The Sageworx model delivers continuity and momentum without the overhead of a traditional agency.",
};

export default async function ModelPage() {
  const heroBg = await getSectionBackgroundBySlug("spiral-geometry");

  return (
    <>
      <ModelHero backgroundUrl={heroBg?.imageUrl} overlayColor={heroBg?.overlayColor} />
      <RightTeamSection />
      <CapabilitiesGrid />
      <MicroteamSection />
      <MomentumSection />
      <IcpSection />
      <ContinuitySection />
      <TechnologySection />
      <FitSection />
    </>
  );
}
