import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const defaultBullets = [
  "CMO-level perspective to guide the strategy",
  "Top-tier creative direction to elevate the work",
  "Executive Producer discipline to drive the execution",
];

interface MicroteamSectionProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  bullets?: string[];
  closing?: string;
}

export default function MicroteamSection({ eyebrow, heading, body, bullets, closing }: MicroteamSectionProps) {
  const items = bullets ?? defaultBullets;

  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Microteams"}
            heading={heading ?? "Small by Design. Senior by Default."}
            size="medium"
            align="right"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            {body ??
              "Our microteams are intentionally lean and deeply experienced. This isn\u2019t about saving money; it\u2019s about saving time and getting to better outcomes, faster. When every member of the team is a seasoned pro, you eliminate the endless review cycles and communication breakdowns that stifle creativity."}
          </p>
        </AnimatedSection>

        <ul className="mt-8 max-w-3xl space-y-4">
          {items.map((bullet, i) => (
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
            {closing ??
              "You\u2019re not managing vendors. You\u2019re collaborating with a single, unified team that takes ownership of the outcomes."}
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
