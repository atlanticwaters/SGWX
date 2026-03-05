"use client";

import { motion, useScroll, useTransform, useInView, type MotionValue } from "framer-motion";
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
  icon: React.ComponentType;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  Animated Line-Draw Icons
 *  Pattern: fill shapes fade in → stroke paths draw → glow layer traces
 * ═══════════════════════════════════════════════════════════════════════ */

const drawEase = [0.16, 1, 0.3, 1] as const;

interface FillDef { d: string; color: string }
interface StrokeDef { d: string }

function AnimatedIcon({
  fills,
  strokes,
  isFeatured = false,
}: {
  fills: FillDef[];
  strokes: StrokeDef[];
  isFeatured?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const strokeBase = isFeatured ? "#4A7A58" : "#2e3634";
  const strokePeak = isFeatured ? "#9FDBB0" : "#4A7A58";
  const strokeEnd = isFeatured ? "#6EA87F" : "#2e3634";
  const glowColor = isFeatured ? "#9FDBB0" : "#4A7A58";

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="48"
      height="48"
      className="shrink-0"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, delay: 0.05, ease: drawEase }}
    >
      {fills.map((f, i) => (
        <motion.path
          key={`f${i}`}
          d={f.d}
          fill={f.color}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.25, delay: 0.5 + i * 0.04, ease: "easeOut" }}
        />
      ))}
      {strokes.map((s, i) => (
        <motion.path
          key={`s${i}`}
          d={s.d}
          fill="none"
          stroke={strokeBase}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1, stroke: [strokeBase, strokePeak, strokeEnd] } : {}}
          transition={{
            pathLength: { duration: 0.5, delay: 0.12 + i * 0.04, ease: drawEase },
            stroke: { duration: 0.6, delay: 0.12 + i * 0.04, ease: "easeOut" },
          }}
        />
      ))}
      {strokes.map((s, i) => (
        <motion.path
          key={`g${i}`}
          d={s.d}
          fill="none"
          stroke={glowColor}
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: [0, 0.5, 0] } : {}}
          transition={{
            pathLength: { duration: 0.5, delay: 0.12 + i * 0.04, ease: drawEase },
            opacity: { duration: 0.55, delay: 0.12 + i * 0.04, ease: "easeInOut" },
          }}
          style={{ filter: "blur(4px)" }}
        />
      ))}
    </motion.svg>
  );
}

// ── Spacecraft (Sageworx) ────────────────────────────────────────────────

const spacecraftFills: FillDef[] = [
  { d: "m21.5 17.5 -6 -3.2V4.4l-4 -3.9 -4 3.9v9.9l-6 3.2 -1 3h22l-1 -3Z", color: "#1e2422" },
  { d: "M15.5 14.3V4.4l-4 -3.9v20h11l-1 -3 -6 -3.2Z", color: "rgba(110,168,127,0.12)" },
  { d: "M3.5 16.4V8l1 -1 1 1v7.4", color: "rgba(159,219,176,0.15)" },
  { d: "M17.5 15.4V8l1 -1 1 1v8.4", color: "rgba(159,219,176,0.15)" },
  { d: "M9.5 20.5h4l1.5 3H8l1.5 -3Z", color: "#D4EEDA" },
  { d: "m3.5 20.5 -1 2h4l-1 -2", color: "#D4EEDA" },
  { d: "m17.5 20.5 -1 2h4l-1 -2", color: "#D4EEDA" },
];

const spacecraftStrokes: StrokeDef[] = [
  { d: "m13.5 13.2002 8 4.3 1 3H0.5l1 -3 8 -4.3" },
  { d: "M13.5 20.5v-13l-2 -2 -2 2v13" },
  { d: "M15.5 14.3V4.4l-4 -3.9 -4 3.9v9.9" },
  { d: "M3.5 16.4V8l1 -1 1 1v7.4" },
  { d: "M17.5 15.4V8l1 -1 1 1v8.4" },
  { d: "M9.5 20.5h4l1.5 3H8l1.5 -3Z" },
  { d: "m3.5 20.5 -1 2h4l-1 -2" },
  { d: "m17.5 20.5 -1 2h4l-1 -2" },
  { d: "M11.5 18.5v5" },
  { d: "M11.5 8.5v1" },
];

function SpacecraftIcon() {
  return <AnimatedIcon fills={spacecraftFills} strokes={spacecraftStrokes} isFeatured />;
}

// ── Store (Freelance Marketplace) ────────────────────────────────────────

const storeFills: FillDef[] = [
  { d: "M19.5 2.5h-16l-3 5h2v15h18v-15h2l-3 -5Z", color: "#1e2422" },
  { d: "M22.5 7.5V10L21 11.5 19.5 10l-2 1.5 -2 -1.5 -2 1.5 -2 -1.5 -2 1.5 -2 -1.5 -2 1.5 -2 -1.5L2 11.5 0.5 10V7.5h22Z", color: "rgba(74,87,84,0.25)" },
  { d: "m13.5 13.5 -11 5h11v-5Z", color: "rgba(74,87,84,0.15)" },
  { d: "M20.5 20.5h-18v2h18v-2Z", color: "#2e3634" },
];

const storeStrokes: StrokeDef[] = [
  { d: "M22.5 7.5H0.5l3 -5h16l3 5Z" },
  { d: "M20.5 13.5v9h-18v-9" },
  { d: "M0.5 22.5h22" },
  { d: "M2.5 18.5h11" },
  { d: "M13.5 22.5v-9" },
  { d: "M15.5 18.5v-3" },
  { d: "m3.5 7.5 3 -5" },
  { d: "m7.5 7.5 2 -5" },
  { d: "M11.5 7.5v-5" },
  { d: "m19.5 7.5 -3 -5" },
  { d: "m15.5 7.5 -2 -5" },
  { d: "m11.5 10 -2 1.5 -2 -1.5 -2 1.5 -2 -1.5L2 11.5 0.5 10V7.5" },
  { d: "m11.5 10 2 1.5 2 -1.5 2 1.5 2 -1.5 1.5 1.5 1.5 -1.5V7.5" },
  { d: "M3.5 10V7.5" },
  { d: "M7.5 10V7.5" },
  { d: "M11.5 10V7.5" },
  { d: "M15.5 9.986V7.5" },
  { d: "M19.5 10V7.5" },
];

function StoreIcon() {
  return <AnimatedIcon fills={storeFills} strokes={storeStrokes} />;
}

// ── Building (Traditional Agency) ────────────────────────────────────────

const buildingFills: FillDef[] = [
  { d: "M12.5 23.499h-11V7.99902l11 -3V23.499Z", color: "#1e2422" },
  { d: "M21.5 23.499h-7V7.49902l7 1V23.499Z", color: "#1e2422" },
  { d: "M12.5 4.99902 1.5 23.499h11V4.99902Z", color: "rgba(74,87,84,0.15)" },
  { d: "m21.5 8.49902 -7 14.99998h7V8.49902Z", color: "rgba(74,87,84,0.15)" },
  { d: "M3.5 7.45402v-4.955l5.5 1v2.454", color: "#2e3634" },
];

const buildingStrokes: StrokeDef[] = [
  { d: "M12.5 23.499h-11V7.99902l11 -3V23.499Z" },
  { d: "M21.5 23.499h-7V7.49902l7 1V23.499Z" },
  { d: "M16.5 10.499h3" },
  { d: "M16.5 12.499h3" },
  { d: "M16.5 14.499h3" },
  { d: "M16.5 16.499h3" },
  { d: "M16.5 18.499h3" },
  { d: "M3.5 12.499h7" },
  { d: "M4.5 9.49902h6" },
  { d: "M3.5 15.499h7" },
  { d: "M3.5 18.499h7" },
  { d: "M8.5 20.499h-3v3h3v-3Z" },
  { d: "M19.5 20.499h-3v3h3v-3Z" },
  { d: "M0.5 23.499h23" },
  { d: "M3.5 7.45402v-4.955l5.5 1v2.454" },
  { d: "M7.5 3.22602V0.499023" },
];

function BuildingIcon() {
  return <AnimatedIcon fills={buildingFills} strokes={buildingStrokes} />;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  Scroll-driven 3D card choreography
 * ═══════════════════════════════════════════════════════════════════════ */

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
  const Icon = card.icon;

  return (
    <motion.div
      className="comparison-card relative"
      style={{ rotateY, rotateX, rotateZ, x, y, scale, opacity }}
    >
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
        {card.isFeatured && (
          <>
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sgwx-green-bright to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sgwx-green/30 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-sgwx-green/30 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-sgwx-green/30 to-transparent" />
          </>
        )}

        {/* Card Header with Icon */}
        <div className={`flex items-center gap-3.5 px-5 pb-2 sm:px-6 ${card.isFeatured ? "pt-6 sm:pt-7" : "pt-5 sm:pt-6"}`}>
          <Icon />
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
      icon: SpacecraftIcon,
      rows: rows.map((r) => ({ label: r.criteria, value: r.sageworx })),
    },
    {
      title: columns.freelance,
      isFeatured: false,
      icon: StoreIcon,
      rows: rows.map((r) => ({ label: r.criteria, value: r.freelancers })),
    },
    {
      title: columns.agency,
      isFeatured: false,
      icon: BuildingIcon,
      rows: rows.map((r) => ({ label: r.criteria, value: r.traditional })),
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24">
      {/* Background grid animation */}
      <div className="comparison-bg-grid pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

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
