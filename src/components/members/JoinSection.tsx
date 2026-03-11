import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const defaultParagraphs = [
  "While our network has traditionally been built upon personal endorsements, we are always open to team with seasoned leaders who are exceptional at their craft and believe in the power of collaboration.",
  "If you believe your work and mindset align with our mission, we\u2019d love to connect.",
];

interface JoinSectionProps {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  cta?: { label: string; href: string };
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function JoinSection({ heading, subheading, paragraphs, cta, backgroundUrl, overlayColor }: JoinSectionProps) {
  const paras = paragraphs ?? defaultParagraphs;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg py-24 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            heading={heading ?? "Interested in Joining Sageworx?"}
            subheading={subheading ?? "Let\u2019s Take Off Together."}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mx-auto mt-8 max-w-2xl space-y-6 text-center text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.24}>
          <div className="mt-10 flex justify-center">
            <Button href={cta?.href ?? "/contact"}>
              {cta?.label ?? "Apply to Join"}
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
