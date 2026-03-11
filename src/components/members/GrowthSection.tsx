import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const defaultParagraphs = [
  "Over the past six years, that small group of 21 has grown into a network of over 100 specialists. This growth has been intentional, not accidental. From the beginning, Sageworx has actively sought out the best M-shaped professionals\u2014people who are not only deeply skilled in one discipline but also highly proficient in others. Think creative director\u2013sonic branding strategist\u2013technologist. Or art director\u2013NFT creator\u2013social content strategist.",
  "Each new member is brought into the collective one by one, endorsed by at least one existing member and personally approved by both founders. Our vetting process is one part credential, three parts potential. We look for senior leaders who have a proven track record of innovation and a penchant for exploring new technologies, challenging old workflows, and finding new ways to make the work work better.",
  "This M-shaped talent delivers more innovative, integrated solutions\u2014and sparks more serendipity from ideation to creation to activation.",
];

interface GrowthSectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function GrowthSection({ eyebrow, heading, paragraphs, backgroundUrl, overlayColor }: GrowthSectionProps) {
  const paras = paragraphs ?? defaultParagraphs;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "How We've Grown"}
            heading={heading ?? "Growth Fueled by M-Shaped Makers and Marketers."}
            size="medium"
            align="right"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
