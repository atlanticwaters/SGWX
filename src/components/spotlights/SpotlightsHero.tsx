"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as const,
  delay,
});

interface SpotlightsHeroProps {
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function SpotlightsHero({ backgroundUrl, overlayColor }: SpotlightsHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center overflow-hidden bg-sgwx-bg">
      {backgroundUrl && (
        <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />
      )}
      <motion.div
        className="relative z-10 max-w-3xl px-6 pl-8 md:pl-16 lg:pl-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.h1
          className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0)}
        >
          Spotlights
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.12)}
        >
          Insights, featured work, and perspectives from the Sageworx
          collective.
        </motion.p>
      </motion.div>
    </section>
  );
}
