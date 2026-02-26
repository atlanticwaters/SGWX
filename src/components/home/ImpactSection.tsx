import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import LogoWall from "./LogoWall";

const caseStudies = [
  {
    category: "Pharma / HCP Engagement",
    title: "ZENPEP\u00AE Racing Game by Nestl\u00E9 Health Science",
    description:
      "Transforming complex clinical education into an interactive, competitive game experience for sales teams.",
    href: "/work/zenpep",
  },
  {
    category: "Sports Media / Brand & Product Identity",
    title: "New NFL Sunday Ticket\u00AE Logo for Businesses",
    description:
      "Reimagining the NFL Sunday Ticket\u00AE brand for the commercial streaming market.",
    href: "/work/nfl-sunday-ticket",
  },
];

export default function ImpactSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading heading="Making An Impact" centered />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.href} delay={0.1 + i * 0.08}>
              <CaseStudyCard {...study} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <LogoWall />
        </AnimatedSection>
      </Container>
    </section>
  );
}
