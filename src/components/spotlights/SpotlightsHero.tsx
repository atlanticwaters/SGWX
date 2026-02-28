"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as const,
  delay,
});

export default function SpotlightsHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-sgwx-bg">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0)}
        >
          Spotlights
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.12)}
        >
          Insights, featured work, and perspectives from the Sageworx
          collective.
        </motion.p>
      </div>
    </section>
  );
}
