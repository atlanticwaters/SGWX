import SectionLayout from "@/components/ui/SectionLayout";
import type { InlineImage } from "@/components/ui/SectionLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const defaultParagraphs = [
  "You\u2019ve felt the friction of a team that isn\u2019t on the same page. The hit-or-miss results from a freelance marketplace. The junior-heavy agency that learns on your dime. Sageworx was built to fix that.",
  "We don\u2019t just bring together experts; we activate cohesive work teams. Specialists who know your industry, speak your language, and have a shared history of working together effectively. It\u2019s not just about the right skills, it\u2019s about the right team chemistry, ready to spark new ideas from the start.",
  "Our capabilities are organized to support you at every stage of growth.",
];

interface RightTeamSectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  align?: string;
  inlineImage?: InlineImage;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function RightTeamSection({ eyebrow, heading, paragraphs, align, inlineImage, backgroundUrl, overlayColor }: RightTeamSectionProps) {
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
          eyebrow={eyebrow ?? "The Right Team"}
          heading={heading ?? "The Right Team Makes All the Difference."}
          size="display"
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
