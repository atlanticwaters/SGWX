import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

const clients = [
  {
    num: "01",
    type: "Challenger Brands",
    pain: "Approval loops slow you down. Big agencies deliver decks instead of progress.",
    solution: "We clear the path and get to execution, quickly and thoughtfully.",
  },
  {
    num: "02",
    type: "Niche Agencies",
    pain: "A client needs something outside your wheelhouse. You either scramble or say no.",
    solution: "Expand your capabilities with fractional specialists, not added overhead.",
  },
  {
    num: "03",
    type: "Startups",
    pain: "Burn rate matters. Big hires come with big risks.",
    solution: "Senior leadership that scales as needed.",
  },
];

export default function ClientsSection({ backgroundUrl, overlayColor }: { backgroundUrl?: string; overlayColor?: string }) {
  return (
    <section className="relative bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Who We Serve"
            heading="Curated Partners For Your Business"
            size="large"
          />
        </AnimatedSection>

        <div className="mt-12 flex flex-col gap-4">
          {clients.map((client, i) => (
            <AnimatedSection key={client.type} delay={0.1 + i * 0.08}>
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
                  {/* Left column — heading + watermark */}
                  <div className="relative flex flex-col justify-center border-b border-sgwx-border-subtle pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                    <span
                      className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none font-mono text-[6rem] font-thin leading-none text-sgwx-green/5 lg:text-[8rem]"
                      aria-hidden="true"
                    >
                      {client.num}
                    </span>
                    <div className="relative">
                      <div className="mb-3 h-0.5 w-8 bg-sgwx-green" />
                      <h3 className="text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">
                        {client.type}
                      </h3>
                    </div>
                  </div>

                  {/* Right column — challenge + solution */}
                  <div className="divide-y divide-sgwx-border-subtle pt-5 lg:pl-8 lg:pt-0">
                    <div className="flex items-start gap-3 pb-4">
                      <svg className="mt-1 h-4 w-4 shrink-0 text-sgwx-text-dim" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <div>
                        <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-sgwx-text-dim">
                          The Pain Point
                        </p>
                        <p className="mt-1 text-base leading-relaxed text-sgwx-text-muted">
                          {client.pain}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-4">
                      <svg className="mt-1 h-4 w-4 shrink-0 text-sgwx-green" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h7M7 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div>
                        <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-sgwx-green">
                          The Sageworx Solution
                        </p>
                        <p className="mt-1 text-base font-medium leading-relaxed text-sgwx-text">
                          {client.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
