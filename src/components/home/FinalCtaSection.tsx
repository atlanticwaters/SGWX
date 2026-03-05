import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import SectionBackground from "@/components/ui/SectionBackground";

interface FinalCtaSectionProps {
  heading?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function FinalCtaSection({
  heading = "Ready to move forward faster?",
  primaryCta = { label: "Activate Your Team", href: "/contact" },
  secondaryCta = { label: "Meet Our Members", href: "/members" },
  backgroundUrl,
  overlayColor,
}: FinalCtaSectionProps) {
  return (
    <section className="relative py-24 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"} />}
      <Container>
        <AnimatedSection>
          <div className="ml-auto max-w-3xl text-right">
            <h2 className="text-3xl font-normal tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <div className="mt-10 flex items-center justify-end gap-4">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
              <Button href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
