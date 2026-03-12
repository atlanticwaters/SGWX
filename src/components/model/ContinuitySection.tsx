import SectionLayout from "@/components/ui/SectionLayout";
import type { InlineImage } from "@/components/ui/SectionLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const defaultParagraphs = [
  "The best part of our model is that knowledge sticks around. Leadership remains consistent, so you\u2019re not re-explaining your business every few months. We develop a living brief, a cohesive external share drive, and a communication protocol that keeps all the notes locked in one secure spot. As your needs evolve, we rotate specialists in and out without losing context or momentum.",
  "You get the continuity of a core team with the flexibility of a network. No chaos, no churn, just sustained progress.",
];

interface ContinuitySectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  align?: string;
  inlineImage?: InlineImage;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function ContinuitySection({ eyebrow, heading, paragraphs, align, inlineImage, backgroundUrl, overlayColor }: ContinuitySectionProps) {
  const paras = paragraphs ?? defaultParagraphs;
  const sectionAlign = (align as "left" | "right") ?? "left";
  const isRight = sectionAlign === "right";

  return (
    <SectionLayout
      align={sectionAlign}
      bgColor="alt"
      backgroundUrl={backgroundUrl}
      overlayColor={overlayColor}
      inlineImage={inlineImage}
    >
      <AnimatedSection>
        <SectionHeading
          eyebrow={eyebrow ?? "Continuity"}
          heading={heading ?? "Flexibility Without the Friction."}
          align={sectionAlign}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <div className={`mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg ${isRight ? "ml-auto text-right" : ""}`}>
          {paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </AnimatedSection>
    </SectionLayout>
  );
}
