import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CaseStudyCard from "@/components/shared/CaseStudyCard";

const caseStudies = [
  {
    category: "Pharma / HCP Engagement",
    title: "ZENPEP\u00AE Racing Game by Nestl\u00E9 Health Science",
    description:
      "Transforming complex clinical education into an interactive, competitive game experience for sales teams.",
    slug: "zenpep",
    tags: [
      "Game Design",
      "Pharma Education",
      "Interactive Learning",
      "Trade Show Engagements",
    ],
  },
  {
    category: "Sports Media / Brand & Product Identity",
    title: "New NFL Sunday Ticket\u00AE Logo for Businesses",
    description:
      "Reimagining the NFL Sunday Ticket\u00AE brand for the commercial streaming market.",
    slug: "nfl-sunday-ticket",
    tags: ["Brand Architecture", "Logo Design", "Product Identity Systems"],
  },
];

export { caseStudies };

export default function CaseStudyGrid() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.slug} delay={i * 0.1}>
              <CaseStudyCard
                category={study.category}
                title={study.title}
                description={study.description}
                href={`/work/${study.slug}`}
              />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
