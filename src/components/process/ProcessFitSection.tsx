import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";

const goodFit = [
  "You need senior expertise without long-term overhead",
  "You value speed, clarity, and follow-through",
  "You want teams who integrate, not perform",
];

const notFit = [
  "You\u2019re primarily looking for decks, frameworks, or performative deliverables rather than forward motion and real execution",
  "You require constant staffing changes, repeated onboarding, or junior-heavy teams that reset context and slow progress",
  "You\u2019re optimizing for optics, signaling, or internal theater over measurable outcomes and sustained momentum",
];

export default function ProcessFitSection() {
  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Fit Check"
            heading="Is This Right for You?"
            centered
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Good fit */}
          <AnimatedSection delay={0.1}>
            <Card hover={false} className="h-full">
              <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-check">
                We&apos;re A Good Fit If
              </p>
              <ul className="space-y-3">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-sgwx-check"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 10l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed text-sgwx-text">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedSection>

          {/* Not a fit */}
          <AnimatedSection delay={0.18}>
            <Card hover={false} className="h-full">
              <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-cross">
                Not a Fit If
              </p>
              <ul className="space-y-3">
                {notFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-sgwx-cross"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 6l8 8M14 6l-8 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed text-sgwx-text">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
