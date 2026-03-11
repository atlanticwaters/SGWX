import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

interface FinalCtaSectionProps {
  heading?: string;
  primaryCta?: { label: string; href: string };
}

export default function FinalCtaSection({
  heading = "Ready to move forward faster?",
  primaryCta = { label: "Let\u2019s Chat", href: "/contact" },
}: FinalCtaSectionProps) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Spaceman background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/SGWX-Spaceman.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "brightness(0.3) saturate(0.7)" }}
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/60 via-sgwx-bg/30 to-sgwx-bg/50" />
      </div>
      <Container>
        <AnimatedSection>
          <div className="ml-auto max-w-3xl text-right">
            <h2 className="text-3xl font-normal tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
              {heading}
            </h2>
            <div className="mt-10 flex items-center justify-end gap-4">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
