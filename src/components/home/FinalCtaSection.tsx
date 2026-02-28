import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import SectionBackground from "@/components/ui/SectionBackground";

export default function FinalCtaSection({ backgroundUrl }: { backgroundUrl?: string }) {
  return (
    <section className="relative py-24 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} />}
      <Container>
        <AnimatedSection>
          <div className="ml-auto max-w-3xl text-right">
            <h2 className="text-3xl font-normal tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
              Ready to move forward faster?
            </h2>
            <div className="mt-10 flex items-center justify-end gap-4">
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
