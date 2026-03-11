import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const defaultBullets = [
  "Strategic decisions stick",
  "Creative systems become reusable assets",
  "Every sprint delivers real, measurable progress",
];

interface MomentumSectionProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  bullets?: string[];
  closing?: string;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function MomentumSection({ eyebrow, heading, body, bullets, closing, backgroundUrl, overlayColor }: MomentumSectionProps) {
  const items = bullets ?? defaultBullets;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Momentum"}
            heading={heading ?? "Built for Momentum."}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            {body ??
              "Speed is a byproduct of alignment, not the goal itself. Our model is designed to create and sustain momentum. By getting the right people in the room from the beginning, we eliminate the costly resets and circular debates that stall progress. The work doesn\u2019t just get done; it builds on itself."}
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
            {closing ?? "This is about moving forward with intention, so every step takes you further."}
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
