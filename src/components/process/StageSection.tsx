"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface StageData {
  id: string;
  number: string;
  name: string;
  accent: "green" | "cyan";
  focus: string;
  services: string[];
  proof: {
    client: string;
    description: string;
    result: string;
  };
  glowPosition: "bottom-right" | "top-left" | "right-center" | "bottom-left";
}

const glowPositionClasses: Record<StageData["glowPosition"], string> = {
  "bottom-right": "-right-[10%] -bottom-[10%]",
  "top-left": "-left-[10%] -top-[10%]",
  "right-center": "right-[10%] top-[20%]",
  "bottom-left": "left-[20%] -bottom-[5%]",
};

const accentStyles = {
  green: {
    label: "text-sgwx-green",
    marker: "bg-sgwx-green",
    result: "text-sgwx-green",
    glow: "bg-sgwx-green",
    tagHover: "hover:border-sgwx-green/60 hover:bg-sgwx-green/[0.08]",
    numeralStroke: "rgba(23, 168, 107, 0.06)",
  },
  cyan: {
    label: "text-sgwx-cyan",
    marker: "bg-sgwx-cyan",
    result: "text-sgwx-cyan",
    glow: "bg-sgwx-cyan",
    tagHover: "hover:border-sgwx-cyan/60 hover:bg-sgwx-cyan/[0.08]",
    numeralStroke: "rgba(136, 238, 255, 0.06)",
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function StageSection({
  id,
  number,
  name,
  accent,
  focus,
  services,
  proof,
  glowPosition,
}: StageData) {
  const sectionRef = useRef<HTMLElement>(null);
  const colors = accentStyles[accent];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative flex min-h-screen items-center overflow-hidden py-24"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />

      {/* Ambient glow */}
      <div
        className={`pointer-events-none absolute h-[500px] w-[500px] rounded-full opacity-[0.06] blur-[120px] ${colors.glow} ${glowPositionClasses[glowPosition]}`}
      />

      {/* Sideways label */}
      <motion.div
        className="absolute left-12 top-1/2 origin-center -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] font-medium tracking-[0.4em] uppercase text-sgwx-text-dim max-md:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-35%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        stage {number} &mdash; {name}
      </motion.div>

      {/* Large outlined numeral — centering wrapper */}
      <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 max-md:right-[-1rem]">
        <motion.div
          className="pointer-events-none select-none text-[clamp(15rem,25vw,22rem)] font-black leading-none text-transparent max-md:text-[10rem]"
          style={{
            WebkitTextStroke: `2px ${colors.numeralStroke}`,
            y: numeralY,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-35%" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {number}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 ml-[clamp(6rem,12vw,10rem)] max-w-[720px] max-md:mx-8 max-md:ml-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-35%" }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {/* Stage label */}
        <motion.div
          className={`mb-4 font-mono text-[10px] font-medium tracking-widest uppercase ${colors.label}`}
          variants={itemVariant}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          stage {number}
        </motion.div>

        {/* Stage name — thin weight for contrast */}
        <motion.h2
          className="mb-6 text-[clamp(3rem,6vw,4.5rem)] font-thin leading-[1.1] text-sgwx-text"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h2>

        {/* Focus text */}
        <motion.p
          className="mb-12 max-w-[560px] text-lg font-light leading-relaxed text-sgwx-text-muted"
          variants={itemVariant}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {focus}
        </motion.p>

        {/* Service tags */}
        <motion.div
          className="mb-12 flex flex-wrap gap-2 gap-x-3"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {services.map((service) => (
            <motion.span
              key={service}
              className={`rounded-sm border border-sgwx-border bg-sgwx-surface px-4 py-2 text-sm text-sgwx-text transition-colors duration-300 ${colors.tagHover}`}
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {service}
            </motion.span>
          ))}
        </motion.div>

        {/* Proof point */}
        <motion.div
          className="flex items-start gap-4 border-t border-sgwx-border pt-8"
          variants={itemVariant}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`mt-[0.55rem] h-1.5 w-1.5 min-w-[6px] rounded-full ${colors.marker}`}
          />
          <div className="text-sm leading-relaxed text-sgwx-text-muted">
            <span className="font-medium text-sgwx-text">{proof.client}</span>
            <br />
            {proof.description}
            <span className={`mt-1 block text-xs tracking-wider ${colors.result}`}>
              {proof.result}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
