import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GrowthSection() {
  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="How We Grow"
            heading="Growth Fueled by Independent Masters of Their Craft."
            size="medium"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            <p>
              Over the past six years, that small group of 21 has grown into a
              network of over 100 specialists. This growth has been intentional,
              not accidental. From the beginning, Sageworx has actively sought
              out the best M-shaped professionals&mdash;people who are not only
              deeply skilled in one discipline but also highly proficient in
              others. Think creative director&ndash;sonic branding
              strategist&ndash;technologist. Or art director&ndash;NFT
              creator&ndash;social content strategist.
            </p>
            <p>
              Each new member is brought into the collective one by one, endorsed
              by at least one existing member and personally approved by both
              founders. Our vetting process is one part credential, three parts
              potential. We look for senior leaders who have a proven track
              record of innovation and a penchant for exploring new technologies,
              challenging old workflows, and finding new ways to make the work
              work better.
            </p>
            <p>
              This M-shaped talent delivers more innovative, integrated
              solutions&mdash;and sparks more serendipity from ideation to
              creation to activation.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
