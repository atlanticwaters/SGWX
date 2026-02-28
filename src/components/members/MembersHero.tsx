"use client";

import { motion } from "framer-motion";
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

interface MembersHeroProps {
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function MembersHero({ backgroundUrl, overlayColor }: MembersHeroProps) {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-sgwx-bg">
      {backgroundUrl && (
        <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />
      )}
      <div className="relative z-10 max-w-3xl px-6 pl-8 md:pl-16 lg:pl-24" style={{ marginTop: "-5vh" }}>
        <motion.h1
          className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl"
          {...fadeUp}
          transition={transition(0)}
        >
          100+ Stories. One Mission.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl"
          {...fadeUp}
          transition={transition(0.15)}
        >
          Meet the minds behind the mission. A curated network of seasoned
          experts, diverse thinkers, and award-winning senior leaders&mdash;each
          with a unique story, a distinct point of view, and a shared passion
          for making the work work better.
        </motion.p>
      </div>
    </section>
  );
}
