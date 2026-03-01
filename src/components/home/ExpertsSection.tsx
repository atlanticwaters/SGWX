import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";
import SectionBackground from "@/components/ui/SectionBackground";

export default function ExpertsSection({ backgroundUrl, overlayColor }: { backgroundUrl?: string; overlayColor?: string }) {
  return (
    <section className="relative py-20 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            heading="Hand-Picked Experts"
            subheading="Put our robust network to work."
            size="display"
            align="right"
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-sgwx-text-muted md:ml-auto md:text-right">
            We assemble expert teams for the challenge at hand. Specialists in
            their craft who understand your category, your audience and your
            competitive signals.
          </p>

          <Card className="mt-8 max-w-2xl md:ml-auto">
            <h3 className="text-lg font-semibold text-sgwx-text">
              The Right Roles. The Right Teams.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
              We lead with the right mix of expertise, shaped around the work.
            </p>
          </Card>
        </AnimatedSection>
      </Container>
    </section>
  );
}
