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

export default function ProcessHero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-sgwx-bg">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green"
          {...fadeUp}
          transition={transition(0)}
          aria-hidden="true"
        >
          Our Process
        </motion.p>

        <motion.h1
          className="text-5xl font-bold tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0.1)}
        >
          The Operating System Behind the Work.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.22)}
        >
          A clear, six-step process designed to move senior teams from strategic
          clarity to creative execution, without the usual drag.
        </motion.p>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-sgwx-text-muted"
          {...fadeUp}
          transition={transition(0.3)}
        >
          This isn&apos;t a rigid methodology or consulting theater. It&apos;s a
          practical system built for speed and creativity, born from decades of
          experience inside top agencies, brands, and fast-moving
          startups&mdash;designed to reduce friction, accelerate decisions, and
          protect momentum.
        </motion.p>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-sgwx-text-dim italic"
          {...fadeUp}
          transition={transition(0.38)}
        >
          Every project has a senior lead who is accountable for
          outcomes&mdash;not just for coordinating meetings.
        </motion.p>
      </div>
    </section>
  );
}
