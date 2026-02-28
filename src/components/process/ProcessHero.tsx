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
const WaveBackground = dynamic(
  () => import("@/components/animations/WaveBackground"),
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

interface ProcessHeroProps {
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function ProcessHero({ backgroundUrl, overlayColor }: ProcessHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[80vh] items-center justify-end overflow-hidden bg-sgwx-bg">
      <AnimationCanvas
        cameraPosition={[-10, 28, 90]}
        cameraFov={55}
        cameraFar={600}
        fogColor={0x141918}
        fogDensity={0.01}
      >
        <WaveBackground />
      </AnimationCanvas>
      {backgroundUrl && (
        <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />
      )}
      <motion.div
        className="relative z-10 max-w-3xl px-6 pr-8 text-right md:pr-16 lg:pr-24"
        style={{ y: contentY, opacity: contentOpacity, marginTop: "-5vh" }}
      >
        <motion.p
          className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green"
          {...fadeUp}
          transition={transition(0)}
          aria-hidden="true"
        >
          The Growth Sequence
        </motion.p>

        <motion.h1
          className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0.1)}
        >
          Smart Content + Experiences
        </motion.h1>

        <motion.p
          className="ml-auto mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.22)}
        >
          The ultimate growth partner &mdash; built for every stage of your
          brand&apos;s evolution.
        </motion.p>
      </motion.div>
    </section>
  );
}
