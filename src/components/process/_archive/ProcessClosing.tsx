"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const defaultStageWords = [
  { text: "launch", color: "text-sgwx-green" },
  { text: "engage", color: "text-sgwx-cyan" },
  { text: "mobilize", color: "text-sgwx-green" },
  { text: "transform", color: "text-sgwx-cyan" },
];

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ProcessClosingProps {
  stageWords?: { text: string; color: string }[];
  wordmark?: string;
  tagline?: string;
  cta?: { label: string; href: string };
}

export default function ProcessClosing({ stageWords, wordmark, tagline, cta }: ProcessClosingProps) {
  const words = stageWords ?? defaultStageWords;

  return (
    <section
      id="process-closing"
      className="relative flex min-h-[80vh] flex-col justify-center bg-sgwx-bg-alt px-8 py-24 md:px-16 lg:px-24"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />

      <motion.div
        className="mb-16 flex flex-wrap gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20%" }}
        transition={{ staggerChildren: 0.15 }}
      >
        {words.map((word) => (
          <motion.span
            key={word.text}
            className={`text-2xl font-thin tracking-widest ${word.color}`}
            variants={itemVariant}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {word.text}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="mb-4 text-4xl font-black tracking-[0.15em] text-sgwx-text md:text-5xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        {wordmark ?? "SAGEWORX"}
      </motion.div>

      <motion.p
        className="mb-14 text-sm tracking-[0.2em] text-sgwx-text-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        {tagline ?? "Emerge. Engage. Evolve."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      >
        <Button href={cta?.href ?? "/contact"}>
          {cta?.label ?? "Activate Your Team"}
        </Button>
      </motion.div>
    </section>
  );
}
