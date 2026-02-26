import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function JoinSection() {
  return (
    <section className="bg-sgwx-bg py-24 md:py-32">
      <Container>
        <AnimatedSection>
          <SectionHeading
            heading="Interested in Joining Sageworx?"
            subheading="Let&rsquo;s Take Off Together."
            centered
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mx-auto mt-8 max-w-2xl space-y-6 text-center text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            <p>
              While our network has traditionally been built on trust and
              personal endorsements, we are always looking to team with senior,
              independent, M-shaped leaders who are exceptional at their craft
              and believe in the power of collaboration.
            </p>
            <p>
              If you believe your work and mindset align with our mission,
              we&apos;d love to connect.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.24}>
          <div className="mt-10 flex justify-center">
            <Button href="/contact">Apply to Join</Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
