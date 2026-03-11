"use client";

import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const AnimationCanvas = dynamic(
  () => import("@/components/animations/AnimationCanvas"),
  { ssr: false }
);
const NetworkBackground = dynamic(
  () => import("@/components/animations/NetworkBackground"),
  { ssr: false }
);

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
      <AnimationCanvas
        cameraPosition={[0, 0, 90]}
        cameraFov={58}
        fogDensity={0.015}
      >
        <NetworkBackground />
      </AnimationCanvas>
      <Container>
        <AnimatedSection>
          <div className="relative z-10 ml-auto max-w-3xl text-right">
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
