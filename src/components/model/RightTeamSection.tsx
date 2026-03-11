import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const defaultParagraphs = [
  "You\u2019ve felt the friction of a team that isn\u2019t on the same page. The hit-or-miss results from a freelance marketplace. The junior-heavy agency that learns on your dime. Sageworx was built to fix that.",
  "We don\u2019t just bring together experts; we activate cohesive work teams. Specialists who know your industry, speak your language, and have a shared history of working together effectively. It\u2019s not just about the right skills, it\u2019s about the right team chemistry, ready to spark new ideas from the start.",
  "Our capabilities are organized to support you at every stage of growth.",
];

interface RightTeamSectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function RightTeamSection({ eyebrow, heading, paragraphs, backgroundUrl, overlayColor }: RightTeamSectionProps) {
  const paras = paragraphs ?? defaultParagraphs;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "The Right Team"}
            heading={heading ?? "The Right Team Makes All the Difference."}
            size="display"
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
