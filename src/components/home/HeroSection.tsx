"use client";

import { motion } from "framer-motion";
import AnimationCanvas from "@/components/animations/AnimationCanvas";
import NetworkBackground from "@/components/animations/NetworkBackground";
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

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background animation */}
      <AnimationCanvas>
        <NetworkBackground />
      </AnimationCanvas>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center" style={{ marginTop: "-5vh" }}>
        <motion.h1
          className="text-6xl font-bold tracking-tight text-sgwx-text md:text-7xl lg:text-8xl"
          {...fadeUp}
          transition={transition(0)}
        >
          Go Further. Faster.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.12)}
        >
          We bring together seasoned marketing and creative experts—bespoke teams
          who understand your work, thrive on the challenge and deliver when it
          counts.
        </motion.p>

        <motion.p
          className="mx-auto mt-4 max-w-xl text-base text-sgwx-text-dim"
          {...fadeUp}
          transition={transition(0.24)}
        >
          No agency bloat. No freelancer roulette. Just proven pros, ready to work.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          {...fadeUp}
          transition={transition(0.36)}
        >
          <Button href="/model">How We Roll</Button>
          <Button href="/contact" variant="secondary">
            Let&apos;s Chat
          </Button>
        </motion.div>
      </div>

      {/* HUD Status Bar */}
      <motion.div
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2"
        {...fadeUp}
        transition={transition(0.48)}
      >
        <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase" aria-hidden="true">
          <span className="flex items-center gap-2 text-sgwx-text-muted">
            STATUS:
            <span className="flex items-center gap-1.5 text-sgwx-green">
              <span className="h-1.5 w-1.5 rounded-full bg-sgwx-green-bright animate-pulse" />
              ONLINE
            </span>
          </span>
          <span className="flex items-center gap-2 text-sgwx-text-muted">
            NETWORK:
            <span className="text-sgwx-cyan">ACTIVE</span>
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="relative h-10 w-px bg-sgwx-border">
          <motion.div
            className="absolute left-0 h-2 w-px bg-sgwx-text"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
