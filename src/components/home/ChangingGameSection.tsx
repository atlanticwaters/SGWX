"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

const drawEase = [0.16, 1, 0.3, 1] as const;

// ─── Scale Icon (animated line-draw) ─────────────────────────────────────────

const scaleFills = [
  { d: "M15.5 20.5h-2v-2l-2 -1 -2 1v2h-2l-0.5 3h9l-0.5 -3Z", color: "#1e2422" },
  { d: "m4.5 17 -4 -2.5h8l-4 2.5Z", color: "#1e2422" },
  { d: "m18.5 13 -4 -2.5h8l-4 2.5Z", color: "#1e2422" },
  { d: "M11.5 5.5 10 4 11.5 0.5 13 4l-1.5 1.5Z", color: "#1e2422" },
  { d: "M7.3 22 7 23.5h9l-0.2 -1.5H7.3Z", color: "#D4EEDA" },
];

const scaleStrokes = [
  { d: "m3 9 17 -5", cap: true },
  { d: "M11.5 5.5v12", cap: true },
  { d: "M4.5 8.59998V14.5", cap: false },
  { d: "M18.5 4.40002V10.5", cap: false },
  { d: "m4.5 17 -4 -2.5h8l-4 2.5Z", cap: false },
  { d: "m18.5 13 -4 -2.5h8l-4 2.5Z", cap: false },
  { d: "M15.5 20.5h-8l-0.5 3h9l-0.5 -3Z", cap: true },
  { d: "M9.5 20.5v-2l2 -1 2 1v2", cap: false },
  { d: "M11.5 5.5 10 4 11.5 0.5 13 4l-1.5 1.5Z", cap: true },
];

function ScaleIcon() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.1, ease: drawEase }}
    >
      {/* Fill shapes — fade in after strokes draw */}
      {scaleFills.map((f, i) => (
        <motion.path
          key={`fill-${i}`}
          d={f.d}
          fill={f.color}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.25, delay: 0.55 + i * 0.04, ease: "easeOut" }}
        />
      ))}

      {/* Stroke paths — line-draw animation */}
      {scaleStrokes.map((s, i) => (
        <motion.path
          key={`stroke-${i}`}
          d={s.d}
          fill="none"
          stroke="#4A7A58"
          strokeWidth="1"
          strokeLinecap={s.cap ? "round" : undefined}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? {
            pathLength: 1,
            stroke: ["#4A7A58", "#6EA87F", "#4A7A58"],
          } : {}}
          transition={{
            pathLength: { duration: 0.5, delay: 0.15 + i * 0.05, ease: drawEase },
            stroke: { duration: 0.7, delay: 0.15 + i * 0.05, ease: "easeOut" },
          }}
        />
      ))}

      {/* Glow layer — traces the strokes with blur */}
      {scaleStrokes.map((s, i) => (
        <motion.path
          key={`glow-${i}`}
          d={s.d}
          fill="none"
          stroke="#6EA87F"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: [0, 0.5, 0] } : {}}
          transition={{
            pathLength: { duration: 0.5, delay: 0.15 + i * 0.05, ease: drawEase },
            opacity: { duration: 0.6, delay: 0.15 + i * 0.05, ease: "easeInOut" },
          }}
          style={{ filter: "blur(4px)" }}
        />
      ))}
    </motion.svg>
  );
}

// ─── Wave Icon (animated line-draw) ──────────────────────────────────────────

const waveFills = [
  { d: "m21.5 18 -10 5.5 -10 -5.5V7l10 -5.5 10 5.5v11Z", color: "#1e2422" },
  { d: "M19.385 16.663 11.5 21l-7.885 -4.337L1.5 18l10 5.5 10 -5.5 -2.115 -1.337Z", color: "#D4EEDA" },
];

const waveStrokes = [
  { d: "M3.5 12.5H5L6.5 10l2 6.5 2 -10.5L13 19l2 -9 1.5 6 1.5 -3.5h1.5" },
  { d: "m21.5 18 -10 5.5 -10 -5.5V7l10 -5.5 10 5.5v11Z" },
];

function WaveIcon() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.1, ease: drawEase }}
    >
      {/* Fill shapes — fade in after strokes draw */}
      {waveFills.map((f, i) => (
        <motion.path
          key={`fill-${i}`}
          d={f.d}
          fill={f.color}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.25, delay: 0.5 + i * 0.06, ease: "easeOut" }}
        />
      ))}

      {/* Stroke paths — line-draw animation */}
      {waveStrokes.map((s, i) => (
        <motion.path
          key={`stroke-${i}`}
          d={s.d}
          fill="none"
          stroke="#4A7A58"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? {
            pathLength: 1,
            stroke: ["#4A7A58", "#6EA87F", "#4A7A58"],
          } : {}}
          transition={{
            pathLength: { duration: 0.6, delay: 0.15 + i * 0.12, ease: drawEase },
            stroke: { duration: 0.8, delay: 0.15 + i * 0.12, ease: "easeOut" },
          }}
        />
      ))}

      {/* Glow layer */}
      {waveStrokes.map((s, i) => (
        <motion.path
          key={`glow-${i}`}
          d={s.d}
          fill="none"
          stroke="#6EA87F"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: [0, 0.5, 0] } : {}}
          transition={{
            pathLength: { duration: 0.6, delay: 0.15 + i * 0.12, ease: drawEase },
            opacity: { duration: 0.7, delay: 0.15 + i * 0.12, ease: "easeInOut" },
          }}
          style={{ filter: "blur(4px)" }}
        />
      ))}
    </motion.svg>
  );
}

export default function ChangingGameSection({ backgroundUrl, overlayColor }: { backgroundUrl?: string; overlayColor?: string }) {
  return (
    <section className="relative bg-sgwx-bg-alt py-20 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"} />}
      <Container>
        <AnimatedSection>
          <SectionHeading heading="The Rules Are Changing. Tilt Them In Your Favor." size="display" />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <Card>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-sgwx-green/20 bg-sgwx-green/10">
                <ScaleIcon />
              </div>
              <h3 className="text-lg font-semibold text-sgwx-text">
                Brands have been stuck choosing between two extremes.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                A traditional agency weighed down by static layers. Or a loose
                collection of freelancers who are never quite on the same page.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.18}>
            <Card>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-sgwx-green/20 bg-sgwx-green/10">
                <WaveIcon />
              </div>
              <h3 className="text-lg font-semibold text-sgwx-text">
                The market moves too fast for the first option. Your needs are
                too important for the second.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                Technology isn&apos;t the strategy. People are. The best teams
                understand which tools elevate the work.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
