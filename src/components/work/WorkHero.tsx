"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

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

export default function WorkHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-sgwx-bg">
      <AnimationCanvas
        cameraPosition={[0, 145, 210]}
        cameraFov={52}
        cameraFar={900}
        fogColor={0x0c0f0e}
        fogDensity={0.0075}
      >
        <CityBackground />
      </AnimationCanvas>
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="text-5xl font-bold tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0)}
        >
          Our Work
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.12)}
        >
          Real outcomes for real brands. Explore how Sageworx teams have
          delivered impact across industries.
        </motion.p>
      </div>
    </section>
  );
}
