import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function RightTeamSection() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="The Right Team"
            heading="The Right Team Makes All the Difference."
            size="display"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            <p>
              You&apos;ve felt the friction of a team that isn&apos;t on the same
              page. The hit-or-miss results from a freelance marketplace. The
              junior-heavy agency that learns on your dime. Sageworx was built to
              fix that.
            </p>
            <p>
              We don&apos;t just bring together experts; we activate cohesive work
              teams. Specialists who know your industry, speak your language, and
              have a shared history of working together effectively. It&apos;s not
              just about the right skills, it&apos;s about the right team
              chemistry, ready to spark new ideas from the start.
            </p>
            <p>
              Our capabilities are organized to support you at every stage of
              growth.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
