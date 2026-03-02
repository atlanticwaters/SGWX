"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";

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

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-end overflow-hidden">
      {/* Background animation — parallax */}
      <motion.div className="absolute inset-[-10%]" style={{ y: canvasY, scale: canvasScale }}>
        <AnimationCanvas
          cameraPosition={[-10, 28, 90]}
          cameraFov={55}
          cameraFar={600}
          fogColor={0x141918}
          fogDensity={0.01}
        >
          <WaveBackground />
        </AnimationCanvas>
      </motion.div>

      {/* Content — parallax fade */}
      <motion.div
        className="relative z-10 max-w-3xl px-6 pr-8 text-right md:pr-16 lg:pr-24"
        style={{ y: contentY, opacity: contentOpacity, marginTop: "-5vh" }}
      >
        <motion.h1
          className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-8xl"
          {...fadeUp}
          transition={transition(0)}
        >
          Go Further. Faster.
        </motion.h1>

        <motion.p
          className="ml-auto mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.12)}
        >
          We bring together seasoned marketing and creative experts—bespoke teams
          who understand your work, thrive on the challenge and deliver when it
          counts.
        </motion.p>

        <motion.p
          className="ml-auto mt-4 max-w-xl text-base text-sgwx-text-dim"
          {...fadeUp}
          transition={transition(0.24)}
        >
          No agency bloat. No freelancer roulette. Just proven pros, ready to work.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-end gap-4"
          {...fadeUp}
          transition={transition(0.36)}
        >
          <Button href="/model">How We Roll</Button>
          <Button href="/contact" variant="secondary">
            Let&apos;s Chat
          </Button>
        </motion.div>
      </motion.div>

      {/* HUD Status Bar */}
      <motion.div
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2"
        {...fadeUp}
        transition={transition(0.48)}
      >
        <div className="hidden items-center gap-6 font-mono text-[10px] tracking-widest uppercase sm:flex" aria-hidden="true">
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
