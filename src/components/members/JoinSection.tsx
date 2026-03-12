import SectionLayout from "@/components/ui/SectionLayout";
import type { InlineImage } from "@/components/ui/SectionLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

const defaultParagraphs = [
  "While our network has traditionally been built upon personal endorsements, we are always open to team with seasoned leaders who are exceptional at their craft and believe in the power of collaboration.",
  "If you believe your work and mindset align with our mission, we\u2019d love to connect.",
];

interface JoinSectionProps {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  cta?: { label: string; href: string };
  align?: string;
  inlineImage?: InlineImage;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function JoinSection({ heading, subheading, paragraphs, cta, align, inlineImage, backgroundUrl, overlayColor }: JoinSectionProps) {
  const paras = paragraphs ?? defaultParagraphs;
  const sectionAlign = (align as "left" | "right") ?? "left";
  const isRight = sectionAlign === "right";

  return (
    <SectionLayout
      align={sectionAlign}
      bgColor="default"
      backgroundUrl={backgroundUrl}
      overlayColor={overlayColor}
      inlineImage={inlineImage}
      className="py-24 md:py-32"
    >
      <AnimatedSection>
        <SectionHeading
          heading={heading ?? "Interested in Joining Sageworx?"}
          subheading={subheading ?? "Let\u2019s Take Off Together."}
          align={sectionAlign}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <div className={`mt-8 max-w-2xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg ${isRight ? "ml-auto text-right" : "text-left"}`}>
          {paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.24}>
        <div className={`mt-10 flex ${isRight ? "justify-end" : "justify-start"}`}>
          <Button href={cta?.href ?? "/contact"}>
            {cta?.label ?? "Apply to Join"}
          </Button>
        </div>
      </AnimatedSection>
    </SectionLayout>
  );
}
