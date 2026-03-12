"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface InlineImage {
  url: string;
  alt: string;
}

interface SectionLayoutProps {
  children: React.ReactNode;
  align?: "left" | "right";
  backgroundUrl?: string;
  overlayColor?: string;
  inlineImage?: InlineImage;
  bgColor?: "default" | "alt";
  className?: string;
  id?: string;
}

export default function SectionLayout({
  children,
  align = "left",
  backgroundUrl,
  overlayColor,
  inlineImage,
  bgColor = "default",
  className = "",
  id,
}: SectionLayoutProps) {
  const bg = bgColor === "alt" ? "bg-sgwx-bg-alt" : "bg-sgwx-bg";

  return (
    <section id={id} className={`relative overflow-hidden ${bg} py-16 md:py-24 ${className}`}>
      {backgroundUrl && (
        <SectionBackground
          src={backgroundUrl}
          overlayColor={overlayColor as OverlayColor}
        />
      )}
      <Container>
        {inlineImage?.url ? (
          <div
            className={`flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 ${
              align === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Copy column — 60% */}
            <div className="flex-1 min-w-0">{children}</div>

            {/* Image column — 40% */}
            <AnimatedSection delay={0.2} className="w-full lg:w-[40%] lg:shrink-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={inlineImage.url}
                  alt={inlineImage.alt}
                  fill
                  className="object-cover"
                  style={{
                    filter:
                      "brightness(0.9) contrast(1.05) saturate(0.85)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/40 via-transparent to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        ) : (
          children
        )}
      </Container>
    </section>
  );
}

export type { InlineImage };
