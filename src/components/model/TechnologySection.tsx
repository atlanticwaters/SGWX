import SectionLayout from "@/components/ui/SectionLayout";
import type { InlineImage } from "@/components/ui/SectionLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const defaultParagraphs = [
  "Great talent uses the best tools. Our teams are fluent in the technology that matters, from AI-enhanced strategy, analytics and production to immersive experiential platforms.",
  "We believe technology is a powerful accelerator, but it\u2019s never the strategy itself. Our approach is simple: use technology to elevate the thinking, streamline the work, and deliver better results. Human judgment guides the way; technology helps us get there faster.",
];

interface TechnologySectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  align?: string;
  inlineImage?: InlineImage;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function TechnologySection({ eyebrow, heading, paragraphs, align, inlineImage, backgroundUrl, overlayColor }: TechnologySectionProps) {
  const paras = paragraphs ?? defaultParagraphs;
  const sectionAlign = (align as "left" | "right") ?? "right";
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
          eyebrow={eyebrow ?? "Technology"}
          heading={heading ?? "The Right Tools for the Job."}
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
