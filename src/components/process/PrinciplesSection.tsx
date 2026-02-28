import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function PrinciplesSection() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Principles"
            heading="Designed to Move You Forward. Faster."
            subheading="Our process and systems are designed for work without the re-work. Strategy, creative, and production aligned early. Fewer handoffs. Decisions and learnings are documented to reduce rework and repeat spend."
            size="display"
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* M-Shaped Senior Talent */}
          <AnimatedSection delay={0.1}>
            <Card hover={false} className="h-full">
              <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-widest text-sgwx-green">
                M-Shaped Talent
              </p>
              <h3 className="text-xl font-normal tracking-tight text-sgwx-text md:text-2xl">
                Built Around M-Shaped Senior Talent
              </h3>
              <div className="mt-4 space-y-4">
                <p className="text-sm leading-relaxed text-sgwx-text-muted">
                  Our members average 15&ndash;20 years in their discipline,
                  with agency and in-house leadership backgrounds&mdash;and the
                  range to operate confidently beyond a single specialty.
                </p>
                <p className="text-sm leading-relaxed text-sgwx-text-muted">
                  Deep expertise where it matters most, with meaningful fluency
                  across adjacent disciplines. Our teams think beyond single
                  roles&mdash;connecting strategy, creative, technology, and
                  production from day one.
                </p>
                <p className="text-sm leading-relaxed text-sgwx-text-muted">
                  M-shaped talent means you&apos;re not just hiring for one
                  lane. You&apos;re gaining leaders who can go deep, see around
                  corners, and collaborate across the full scope of the work.
                </p>
              </div>
            </Card>
          </AnimatedSection>

          {/* Structured to Flex */}
          <AnimatedSection delay={0.18}>
            <Card hover={false} className="h-full">
              <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-widest text-sgwx-green">
                Flex Structure
              </p>
              <h3 className="text-xl font-normal tracking-tight text-sgwx-text md:text-2xl">
                Structured to Flex
              </h3>
              <div className="mt-4 space-y-4">
                <p className="text-sm leading-relaxed text-sgwx-text-muted">
                  Leadership stays consistent, providing continuity, context,
                  and accountability throughout the engagement. Specialists
                  rotate in as needed based on the work&mdash;not org
                  charts&mdash;allowing the team to flex without friction. Scope
                  adapts as priorities evolve, without resetting momentum or
                  re-onboarding a new group.
                </p>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
