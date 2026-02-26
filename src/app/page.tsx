import HeroSection from "@/components/home/HeroSection";
import ChangingGameSection from "@/components/home/ChangingGameSection";
import ComparisonTable from "@/components/home/ComparisonTable";
import ClientsSection from "@/components/home/ClientsSection";
import ExpertsSection from "@/components/home/ExpertsSection";
import ProcessSection from "@/components/home/ProcessSection";
import ImpactSection from "@/components/home/ImpactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ChangingGameSection />
      <ComparisonTable />
      <ClientsSection />
      <ExpertsSection />
      <ProcessSection />
      <ImpactSection />
    </>
  );
}
