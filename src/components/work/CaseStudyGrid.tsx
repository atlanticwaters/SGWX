import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CaseStudyCard from "@/components/shared/CaseStudyCard";

interface CaseStudy {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  tags: string[];
}

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.slug} delay={i * 0.1}>
              <CaseStudyCard
                category={study.category}
                title={study.title}
                description={study.shortDescription}
                href={`/work/${study.slug}`}
              />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
