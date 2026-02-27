import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

const clients = [
  {
    type: "Challenger Brands",
    pain: "Approval loops slow you down. Big agencies deliver decks instead of progress.",
    solution: "We clear the path and get to execution, quickly and thoughtfully.",
  },
  {
    type: "Niche Agencies",
    pain: "A client needs something outside your wheelhouse. You either scramble or say no.",
    solution: "Expand your capabilities with fractional specialists, not added overhead.",
  },
  {
    type: "Startups",
    pain: "Burn rate matters. Big hires come with big risks.",
    solution: "Senior leadership that scales as needed.",
  },
];

export default function ClientsSection({ backgroundUrl }: { backgroundUrl?: string }) {
  return (
    <section className="relative bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            heading="Curated Partners For Your Business"
            size="medium"
            centered
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <AnimatedSection key={client.type} delay={0.1 + i * 0.08}>
              <Card className="flex h-full flex-col">
                <Badge>{client.type}</Badge>

                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-widest text-sgwx-text-dim">
                    The Pain Point
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                    {client.pain}
                  </p>
                </div>

                <div className="my-4 h-px bg-sgwx-border-subtle" />

                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-sgwx-green">
                    The Sageworx Solution
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-sgwx-text">
                    {client.solution}
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
