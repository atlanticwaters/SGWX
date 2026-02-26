import HeroSection from "@/components/home/HeroSection";
import ChangingGameSection from "@/components/home/ChangingGameSection";
import ComparisonTable from "@/components/home/ComparisonTable";
import ClientsSection from "@/components/home/ClientsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ChangingGameSection />
      <ComparisonTable />
      <ClientsSection />
    </>
  );
}
