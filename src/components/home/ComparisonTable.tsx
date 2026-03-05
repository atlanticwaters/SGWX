"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const DEFAULT_ROWS = [
  {
    criteria: "The Talent",
    traditional: "Junior-heavy. You fund the learning curve.",
    freelancers: "Hit-or-miss. A reset every time.",
    sageworx: "Senior specialists with category fluency.",
  },
  {
    criteria: "The Workflow",
    traditional: "Long onboarding. Longer timelines.",
    freelancers: "Quick kickoff. Constant realignment.",
    sageworx: "Clean start with no churn.",
  },
  {
    criteria: "The Cost",
    traditional: "High overhead. Hidden fees.",
    freelancers: "Unpredictable commitment and constant training.",
    sageworx: "Lean by design. Zero budget bloat.",
  },
];

const DEFAULT_COLUMNS = {
  criteria: "Criteria",
  agency: "Traditional Agency",
  freelance: "Freelance Marketplace",
  sageworx: "Sageworx Protocol",
};

interface ComparisonTableProps {
  eyebrow?: string;
  heading?: string;
  columns?: { criteria: string; agency: string; freelance: string; sageworx: string };
  rows?: { criteria: string; traditional: string; freelancers: string; sageworx: string }[];
  cta?: { label: string; href: string };
}

interface CardData {
  title: string;
  rows: { label: string; value: string }[];
  isFeatured: boolean;
}

/*
 * Multi-phase scroll choreography per card.
 *
 * scrollYProgress keyframes:
 *   0.00 = section top hits viewport bottom (entering)
 *   0.08 = cards begin to appear
 *   0.20 = cards face the viewer, still stacked
 *   0.38 = fully fanned out in 3D positions (dramatic moment)
 *   0.55 = hold the fanned pose
 *   0.70 = cards normalize — all scale to 1.0, rotation flattens, full opacity
 *   1.00 = cards flat and equal, content fully readable
 *
 * Each property array must match the shared `SCROLL_KEYS` length.
 */
const SCROLL_KEYS = [0, 0.08, 0.20, 0.38, 0.55, 0.70, 1.0];

interface CardTrajectory {
  rotateY: number[];
  rotateX: number[];
  rotateZ: number[];
  x: number[];
  y: number[];
  scale: number[];
  opacity: number[];
}

const CARD_TRAJECTORIES: CardTrajectory[] = [
  // ── Sageworx (featured) ──────────────────────────────────
  // Rises first, fans left, scales up, then normalizes
  {
    rotateY:  [0,   0,   2,   22,   22,   6,   0],
    rotateX:  [35,  35,  8,   0,    -1,   0,   0],
    rotateZ:  [4,   4,   1,   0,    0,    0,   0],
    x:        [0,   0,   0,  -20,  -20,  -4,   0],
    y:        [120, 120, 30,  0,   -4,    0,   0],
    scale:    [0.85, 0.85, 0.95, 1.06, 1.06, 1.0, 1.0],
    opacity:  [0,   0.2, 0.8, 1,    1,    1,   1],
  },
  // ── Freelance (middle) ───────────────────────────────────
  // Rises later, stays centre, then scales up to match
  {
    rotateY:  [0,   0,   0,   8,    8,    2,   0],
    rotateX:  [35,  35,  14,  0,    0,    0,   0],
    rotateZ:  [-2,  -2,  -1,  0,    0,    0,   0],
    x:        [0,   0,   0,   0,    0,    0,   0],
    y:        [140, 140, 60,  0,    2,    0,   0],
    scale:    [0.85, 0.85, 0.90, 0.94, 0.94, 1.0, 1.0],
    opacity:  [0,   0,   0.5, 1,    1,    1,   1],
  },
  // ── Traditional (back) ───────────────────────────────────
  // Rises last, fans right, recedes, then scales up to match
  {
    rotateY:  [0,   0,   -2,  -12,  -12,  -3,  0],
    rotateX:  [35,  35,  18,  2,    2,    0,   0],
    rotateZ:  [-4,  -4,  -2,  0,    0,    0,   0],
    x:        [0,   0,   0,   20,   20,   4,   0],
    y:        [160, 160, 90,  8,    10,   0,   0],
    scale:    [0.85, 0.85, 0.88, 0.90, 0.90, 1.0, 1.0],
    opacity:  [0,   0,   0.3, 0.85, 0.85, 1,   1],
  },
];

/* ─── Scroll-driven transforms hook ─────────────────────────────────────── */

function useCardTransforms(progress: MotionValue<number>, index: number) {
  const t = CARD_TRAJECTORIES[index];

  const rotateY = useTransform(progress, SCROLL_KEYS, t.rotateY);
  const rotateX = useTransform(progress, SCROLL_KEYS, t.rotateX);
  const rotateZ = useTransform(progress, SCROLL_KEYS, t.rotateZ);
  const x       = useTransform(progress, SCROLL_KEYS, t.x);
  const y       = useTransform(progress, SCROLL_KEYS, t.y);
  const scale   = useTransform(progress, SCROLL_KEYS, t.scale);
  const opacity = useTransform(progress, SCROLL_KEYS, t.opacity);

  return { rotateY, rotateX, rotateZ, x, y, scale, opacity };
}

/* ─── Individual 3D Card ────────────────────────────────────────────────── */

function ComparisonCard({
  card,
  index,
  scrollProgress,
}: {
  card: CardData;
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const { rotateY, rotateX, rotateZ, x, y, scale, opacity } = useCardTransforms(scrollProgress, index);

  return (
    <motion.div
      className="comparison-card relative"
      style={{ rotateY, rotateX, rotateZ, x, y, scale, opacity }}
    >
      {/* Radial glow behind the Sageworx card */}
      {card.isFeatured && (
        <div className="comparison-glow pointer-events-none absolute -inset-8 -z-10 rounded-3xl opacity-0" />
      )}

      <div
        className={`relative overflow-hidden rounded-2xl border ${
          card.isFeatured
            ? "comparison-featured-card border-sgwx-green/60 bg-sgwx-surface"
            : "border-sgwx-border/60 bg-sgwx-surface/70"
        }`}
      >
        {/* Animated edge glow for featured card */}
        {card.isFeatured && (
          <>
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sgwx-green-bright to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sgwx-green/30 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-sgwx-green/30 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-sgwx-green/30 to-transparent" />
          </>
        )}

        {/* Card Header */}
        <div className={`px-5 pb-2 sm:px-6 ${card.isFeatured ? "pt-6 sm:pt-7" : "pt-5 sm:pt-6"}`}>
          <h3
            className={`font-bold uppercase tracking-wider ${
              card.isFeatured
                ? "text-xl text-sgwx-green-bright sm:text-2xl"
                : "text-lg text-sgwx-text/70 sm:text-xl"
            }`}
          >
            {card.title}
          </h3>
        </div>

        {/* Row Items */}
        <div className="flex flex-col gap-2 px-4 pb-5 pt-1 sm:gap-2.5 sm:px-5 sm:pb-6">
          {card.rows.map((row) => (
            <div
              key={row.label}
              className={`rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 ${
                card.isFeatured
                  ? "border border-sgwx-green/25 bg-sgwx-green/[0.06]"
                  : "border border-sgwx-border-subtle/60 bg-sgwx-bg-alt/40"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    card.isFeatured
                      ? "bg-sgwx-green/25 text-sgwx-green-bright"
                      : "bg-sgwx-border/60 text-sgwx-text-dim"
                  }`}
                >
                  ✓
                </span>
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-semibold ${
                      card.isFeatured ? "text-sgwx-text" : "text-sgwx-text-muted/80"
                    }`}
                  >
                    {row.value.split(".")[0]}...
                  </p>
                  <p className={`mt-0.5 text-xs ${card.isFeatured ? "text-sgwx-text-muted" : "text-sgwx-text-dim"}`}>
                    {row.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────── */

export default function ComparisonTable({
  eyebrow = "The Model Makes a Difference",
  heading = "Why Sageworx?",
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  cta = { label: "Explore Our Model", href: "/model" },
}: ComparisonTableProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cards: CardData[] = [
    {
      title: columns.sageworx,
      isFeatured: true,
      rows: rows.map((r) => ({ label: r.criteria, value: r.sageworx })),
    },
    {
      title: columns.freelance,
      isFeatured: false,
      rows: rows.map((r) => ({ label: r.criteria, value: r.freelancers })),
    },
    {
      title: columns.agency,
      isFeatured: false,
      rows: rows.map((r) => ({ label: r.criteria, value: r.traditional })),
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading eyebrow={eyebrow} heading={heading} align="right" />
        </AnimatedSection>

        {/* 3D Card Container */}
        <div className="comparison-perspective mt-12 sm:mt-16">
          <div className="comparison-cards-grid">
            {cards.map((card, i) => (
              <ComparisonCard
                key={card.title}
                card={card}
                index={i}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Accessible sr-only table for screen readers */}
        <table className="sr-only">
          <caption>Comparison of Sageworx Protocol vs Traditional Agency and Freelance Marketplace</caption>
          <thead>
            <tr>
              <th>{columns.criteria}</th>
              <th>{columns.agency}</th>
              <th>{columns.freelance}</th>
              <th>{columns.sageworx}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.criteria}>
                <td>{row.criteria}</td>
                <td>{row.traditional}</td>
                <td>{row.freelancers}</td>
                <td>{row.sageworx}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <AnimatedSection delay={0.5}>
          <div className="mt-10 text-center">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
