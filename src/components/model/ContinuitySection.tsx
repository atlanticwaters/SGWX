import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContinuitySection() {
  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Continuity"
            heading="Flexibility Without the Friction."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            <p>
              The best part of our model is that knowledge sticks around.
              Leadership remains consistent, so you&apos;re not re-explaining
              your business every few months. We develop a living brief, a
              cohesive external share drive, and a communication protocol that
              keeps all the notes locked in one secure spot. As your needs
              evolve, we rotate specialists in and out without losing context or
              momentum.
            </p>
            <p>
              You get the continuity of a core team with the flexibility of a
              network. No chaos, no churn, just sustained progress.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
