"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1] as const,
  delay,
});

export default function ModelHero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-sgwx-bg">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green"
          {...fadeUp}
          transition={transition(0)}
          aria-hidden="true"
        >
          The right team, ready from day one.
        </motion.p>

        <motion.h1
          className="text-5xl font-bold tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0.1)}
        >
          Stop Resetting. Start Building.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.22)}
        >
          The Sageworx model brings together senior, bespoke teams who already
          know how to work together. We skip the learning curve and get right to
          the work, delivering continuity and momentum without the overhead of a
          traditional agency.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          {...fadeUp}
          transition={transition(0.34)}
        >
          <Button href="/contact">Get Started</Button>
          <Button href="/work" variant="secondary">
            See Our Work
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
