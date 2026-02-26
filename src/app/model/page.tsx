import ModelHero from "@/components/model/ModelHero";
import RightTeamSection from "@/components/model/RightTeamSection";
import CapabilitiesGrid from "@/components/model/CapabilitiesGrid";
import MicroteamSection from "@/components/model/MicroteamSection";
import MomentumSection from "@/components/model/MomentumSection";
import IcpSection from "@/components/model/IcpSection";
import ContinuitySection from "@/components/model/ContinuitySection";
import TechnologySection from "@/components/model/TechnologySection";
import FitSection from "@/components/model/FitSection";

export default function ModelPage() {
  return (
    <>
      <ModelHero />
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
