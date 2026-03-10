"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
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

interface ModelHeroProps {
  backgroundUrl?: string;
  overlayColor?: string;
  eyebrow?: string;
  heading?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function ModelHero({
  backgroundUrl,
  overlayColor,
  eyebrow,
  heading,
  body,
  primaryCta,
  secondaryCta,
}: ModelHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[80vh] items-center overflow-hidden bg-sgwx-bg">
      {backgroundUrl && (
        <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />
      )}
      <motion.div
        className="relative z-10 max-w-3xl px-6 pl-8 md:pl-16 lg:pl-24"
        style={{ y: contentY, opacity: contentOpacity, marginTop: "-5vh" }}
      >
        <motion.p
          className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green"
          {...fadeUp}
          transition={transition(0)}
          aria-hidden="true"
        >
          {eyebrow ?? "The right team, ready from day one."}
        </motion.p>

        <motion.h1
          className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0.1)}
        >
          {heading ?? "Stop Resetting. Start Accelerating."}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.22)}
        >
          {body ??
            "The Sageworx model brings together seasoned teams who already know how to work together, and understand your industry and audience. We skip the learning curve and get right to the work, delivering continuity and momentum without the overhead of a traditional agency."}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          {...fadeUp}
          transition={transition(0.34)}
        >
          <Button href={primaryCta?.href ?? "/contact"}>
            {primaryCta?.label ?? "Get Started"}
          </Button>
          <Button href={secondaryCta?.href ?? "/work"} variant="secondary">
            {secondaryCta?.label ?? "See Our Work"}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
