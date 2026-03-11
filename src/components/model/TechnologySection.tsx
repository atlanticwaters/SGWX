import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const defaultParagraphs = [
  "Great talent uses the best tools. Our teams are fluent in the technology that matters, from AI-enhanced strategy, analytics and production to immersive experiential platforms.",
  "We believe technology is a powerful accelerator, but it\u2019s never the strategy itself. Our approach is simple: use technology to elevate the thinking, streamline the work, and deliver better results. Human judgment guides the way; technology helps us get there faster.",
];

interface TechnologySectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function TechnologySection({ eyebrow, heading, paragraphs, backgroundUrl, overlayColor }: TechnologySectionProps) {
  const paras = paragraphs ?? defaultParagraphs;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Technology"}
            heading={heading ?? "The Right Tools for the Job."}
            align="right"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 ml-auto max-w-3xl space-y-6 text-right text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
