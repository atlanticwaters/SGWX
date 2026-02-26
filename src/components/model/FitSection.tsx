import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

const goodFit = [
  "Tired of managing a roster of disconnected freelancers",
  "Looking to scale your team\u2019s capabilities without adding headcount",
  "An agency needing to fill a capability gap for a key client",
  "Frustrated with the bloat and slow pace of traditional agencies",
];

const notFit = [
  "Looking for the lowest-cost execution or junior support",
  "Expecting to fully outsource the work with minimal involvement",
  "Optimizing for sheer volume over strategic impact",
];

export default function FitSection() {
  return (
    <section className="bg-sgwx-bg py-24 md:py-32">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Fit Check"
            heading="Let\u2019s Be Direct."
            subheading="The Sageworx model works best when there\u2019s a true partnership. We\u2019re a strong fit if you value senior judgment, strategic clarity, and close collaboration."
            centered
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Good fit */}
          <AnimatedSection delay={0.1}>
            <Card hover={false} className="h-full">
              <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-check">
                You&apos;ll feel right at home if you&apos;re:
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
                We&apos;re probably not the right solution if you&apos;re:
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

        {/* Closing + CTAs */}
        <AnimatedSection delay={0.28}>
          <div className="mt-12 text-center">
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-sgwx-text-muted md:text-lg">
              If you&apos;re looking for alignment, intentionality, and outcomes
              that last, we&apos;ll work extremely well together.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact">Ready to Take Action?</Button>
              <Button href="/work" variant="secondary">
                Check Out Our Work
              </Button>
              <Button href="/members" variant="ghost">
                Meet Our Members
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
