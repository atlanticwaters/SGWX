"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const AnimationCanvas = dynamic(
  () => import("@/components/animations/AnimationCanvas"),
  { ssr: false }
);
const CityBackground = dynamic(
  () => import("@/components/animations/CityBackground"),
  { ssr: false }
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as const,
  delay,
});

interface WorkHeroProps {
  count?: number;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function WorkHero({ count = 0, backgroundUrl, overlayColor }: WorkHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative flex min-h-[50vh] items-center justify-end overflow-hidden bg-sgwx-bg">
      <AnimationCanvas
        cameraPosition={[0, 145, 210]}
        cameraFov={52}
        cameraFar={900}
        fogColor={0x0c0f0e}
        fogDensity={0.0075}
      >
        <CityBackground />
      </AnimationCanvas>
      {backgroundUrl && (
        <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />
      )}
      <motion.div
        className="relative z-10 max-w-3xl px-6 pr-8 text-right md:pr-16 lg:pr-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.h1
          className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0)}
        >
          Our Work
        </motion.h1>

        <motion.p
          className="ml-auto mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.12)}
        >
          Real outcomes for real brands. Explore how Sageworx teams have
          delivered impact across industries.
        </motion.p>

        {/* HUD status line */}
        <motion.div
          className="mt-8 flex items-center justify-end gap-8 font-mono text-[10px] tracking-widest uppercase"
          {...fadeUp}
          transition={transition(0.24)}
        >
          <span className="text-sgwx-text-muted">
            Projects:{" "}
            <span className="text-sgwx-green">{count}</span>
          </span>
          <span
            className="h-px w-8 bg-sgwx-border"
            aria-hidden="true"
          />
          <span className="text-sgwx-text-muted">
            Status:{" "}
            <span className="text-sgwx-cyan">Active</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
