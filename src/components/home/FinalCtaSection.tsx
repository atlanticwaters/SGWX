import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function FinalCtaSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
              Ready to move forward faster?
            </h2>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button href="/contact">Activate Your Team</Button>
              <Button href="/members" variant="secondary">
                Meet Our Members
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
