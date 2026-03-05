import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import LogoWall from "./LogoWall";

interface CaseStudy {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  thumbnailUrl?: string;
}

interface ImpactSectionProps {
  eyebrow?: string;
  heading?: string;
  logoWallHeading?: string;
  logos?: { imageUrl: string; alt: string }[];
  caseStudies: CaseStudy[];
}

export default function ImpactSection({
  eyebrow = "Case Studies",
  heading = "Making An Impact",
  logoWallHeading,
  logos,
  caseStudies,
}: ImpactSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading eyebrow={eyebrow} heading={heading} size="medium" align="right" />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.slug} delay={0.1 + i * 0.08}>
              <CaseStudyCard
                category={study.category}
                title={study.title}
                description={study.shortDescription}
                href={`/work/${study.slug}`}
                thumbnailUrl={study.thumbnailUrl}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <LogoWall heading={logoWallHeading} logos={logos} />
        </AnimatedSection>
      </Container>
    </section>
  );
}
