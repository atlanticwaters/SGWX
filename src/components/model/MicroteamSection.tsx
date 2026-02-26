import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const bullets = [
  "CMO-level perspective to guide the strategy",
  "Top-tier creative direction to elevate the work",
  "Executive Producer discipline to drive the execution",
];

export default function MicroteamSection() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Microteams"
            heading="Small by Design. Senior by Default."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            Our microteams are intentionally lean and deeply experienced. This
            isn&apos;t about saving money; it&apos;s about saving time and
            getting to better outcomes, faster. When every member of the team is
            a seasoned pro, you eliminate the endless review cycles and
            communication breakdowns that stifle creativity.
          </p>
        </AnimatedSection>

        <ul className="mt-8 max-w-3xl space-y-4">
          {bullets.map((bullet, i) => (
            <AnimatedSection key={bullet} delay={0.2 + i * 0.08}>
              <li className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sgwx-green"
                  aria-hidden="true"
                />
                <span className="text-base leading-relaxed text-sgwx-text md:text-lg">
                  {bullet}
                </span>
              </li>
            </AnimatedSection>
          ))}
        </ul>

        <AnimatedSection delay={0.5}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            You&apos;re not managing vendors. You&apos;re collaborating with a
            single, unified team that takes ownership of the outcomes.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
