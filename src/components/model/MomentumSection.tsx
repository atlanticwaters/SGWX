import SectionLayout from "@/components/ui/SectionLayout";
import type { InlineImage } from "@/components/ui/SectionLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

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
  align?: string;
  inlineImage?: InlineImage;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function MomentumSection({ eyebrow, heading, body, bullets, closing, align, inlineImage, backgroundUrl, overlayColor }: MomentumSectionProps) {
  const items = bullets ?? defaultBullets;
  const sectionAlign = (align as "left" | "right") ?? "left";
  const isRight = sectionAlign === "right";

  return (
    <SectionLayout
      align={sectionAlign}
      bgColor="default"
      backgroundUrl={backgroundUrl}
      overlayColor={overlayColor}
      inlineImage={inlineImage}
    >
      <AnimatedSection>
        <SectionHeading
          eyebrow={eyebrow ?? "Momentum"}
          heading={heading ?? "Built for Momentum."}
          align={sectionAlign}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <p className={`mt-8 max-w-3xl text-base leading-relaxed text-sgwx-text-muted md:text-lg ${isRight ? "ml-auto text-right" : ""}`}>
          {body ??
            "Speed is a byproduct of alignment, not the goal itself. Our model is designed to create and sustain momentum. By getting the right people in the room from the beginning, we eliminate the costly resets and circular debates that stall progress. The work doesn\u2019t just get done; it builds on itself."}
        </p>
      </AnimatedSection>

      <ul className={`mt-8 max-w-3xl space-y-4 ${isRight ? "ml-auto" : ""}`}>
        {items.map((bullet, i) => (
          <AnimatedSection key={bullet} delay={0.2 + i * 0.08}>
            <li className={`flex items-start gap-3 ${isRight ? "justify-end" : ""}`}>
              {isRight ? (
                <>
                  <span className="text-right text-base leading-relaxed text-sgwx-text md:text-lg">
                    {bullet}
                  </span>
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sgwx-green"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <>
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sgwx-green"
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed text-sgwx-text md:text-lg">
                    {bullet}
                  </span>
                </>
              )}
            </li>
          </AnimatedSection>
        ))}
      </ul>

      <AnimatedSection delay={0.5}>
        <p className={`mt-8 max-w-3xl text-base leading-relaxed text-sgwx-text-muted md:text-lg ${isRight ? "ml-auto text-right" : ""}`}>
          {closing ?? "This is about moving forward with intention, so every step takes you further."}
        </p>
      </AnimatedSection>
    </SectionLayout>
  );
}
