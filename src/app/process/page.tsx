import ProcessHero from "@/components/process/ProcessHero";
import PrinciplesSection from "@/components/process/PrinciplesSection";
import SixStepsSection from "@/components/process/SixStepsSection";
import GovernanceSection from "@/components/process/GovernanceSection";
import ProcessFitSection from "@/components/process/ProcessFitSection";
import ProcessCloseSection from "@/components/process/ProcessCloseSection";

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <PrinciplesSection />
      <SixStepsSection />
      <GovernanceSection />
      <ProcessFitSection />
      <ProcessCloseSection />
    </>
  );
}
