import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function TechnologySection() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Technology"
            heading="The Right Tools for the Job."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            <p>
              Great talent uses the best tools. Our teams are fluent in the
              technology that matters, from AI-enhanced strategy, analytics and
              production to immersive experiential platforms.
            </p>
            <p>
              We believe technology is a powerful accelerator, but it&apos;s
              never the strategy itself. Our approach is simple: use technology
              to elevate the thinking, streamline the work, and deliver better
              results. Human judgment guides the way; technology helps us get
              there faster.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
