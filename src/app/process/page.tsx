import type { Metadata } from "next";
import ProcessHero from "@/components/process/ProcessHero";
import PrinciplesSection from "@/components/process/PrinciplesSection";
import SixStepsSection from "@/components/process/SixStepsSection";
import GovernanceSection from "@/components/process/GovernanceSection";
import ProcessFitSection from "@/components/process/ProcessFitSection";
import ProcessCloseSection from "@/components/process/ProcessCloseSection";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "A clear, six-step process designed to move senior teams from strategic clarity to creative execution, without the usual drag.",
};

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
