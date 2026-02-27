"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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

export default function ProcessHero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-sgwx-bg">
      <AnimationCanvas
        cameraPosition={[-10, 28, 90]}
        cameraFov={55}
        cameraFar={600}
        fogColor={0x141918}
        fogDensity={0.01}
      >
        <WaveBackground />
      </AnimationCanvas>
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green"
          {...fadeUp}
          transition={transition(0)}
          aria-hidden="true"
        >
          The Growth Sequence
        </motion.p>

        <motion.h1
          className="text-5xl font-bold tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0.1)}
        >
          Smart Content + Experiences
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.22)}
        >
          The ultimate growth partner &mdash; built for every stage of your
          brand&apos;s evolution.
        </motion.p>
      </div>
    </section>
  );
}
