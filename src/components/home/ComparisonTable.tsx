"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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

/* ═══════════════════════════════════════════════════════════════════════════
 *  Color schemes per card type
 * ═══════════════════════════════════════════════════════════════════════ */

type ColorScheme = "green" | "cyan" | "amber";

const COLOR_MAP: Record<ColorScheme, {
  border: string; titleText: string; rowBorder: string; rowBg: string;
  checkBg: string; checkText: string; bodyText: string; dimText: string;
  strokeBase: string; strokePeak: string; strokeEnd: string; glowColor: string;
  fillAccent: string; fillDark: string;
}> = {
  green: {
    border: "border-sgwx-green/60",
    titleText: "text-sgwx-green-bright",
    rowBorder: "border-sgwx-green/25",
    rowBg: "bg-sgwx-green/[0.06]",
    checkBg: "bg-sgwx-green/25",
    checkText: "text-sgwx-green-bright",
    bodyText: "text-sgwx-text",
    dimText: "text-sgwx-text-muted",
    strokeBase: "#4A7A58", strokePeak: "#9FDBB0", strokeEnd: "#6EA87F", glowColor: "#9FDBB0",
    fillAccent: "rgba(110,168,127,0.12)", fillDark: "#D4EEDA",
  },
  cyan: {
    border: "border-sgwx-cyan/40",
    titleText: "text-sgwx-cyan",
    rowBorder: "border-sgwx-cyan/15",
    rowBg: "bg-sgwx-blue/40",
    checkBg: "bg-sgwx-teal/60",
    checkText: "text-sgwx-cyan",
    bodyText: "text-sgwx-text-muted",
    dimText: "text-sgwx-text-dim",
    strokeBase: "#1E3540", strokePeak: "#799BA9", strokeEnd: "#1E3540", glowColor: "#799BA9",
    fillAccent: "rgba(121,155,169,0.12)", fillDark: "#2a4a58",
  },
  amber: {
    border: "border-sgwx-yellow/30",
    titleText: "text-sgwx-yellow",
    rowBorder: "border-sgwx-yellow/12",
    rowBg: "bg-[#1a1800]/40",
    checkBg: "bg-sgwx-yellow/15",
    checkText: "text-sgwx-yellow",
    bodyText: "text-sgwx-text-muted",
    dimText: "text-sgwx-text-dim",
    strokeBase: "#5c5520", strokePeak: "#d4c94a", strokeEnd: "#5c5520", glowColor: "#d4c94a",
    fillAccent: "rgba(212,201,74,0.10)", fillDark: "#4a4520",
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
 *  Animated Line-Draw Icons
 * ═══════════════════════════════════════════════════════════════════════ */

const drawEase = [0.16, 1, 0.3, 1] as const;

interface FillDef { d: string; colorKey: "surface" | "accent" | "highlight" }
interface StrokeDef { d: string }

function AnimatedIcon({
  fills,
  strokes,
  scheme,
}: {
  fills: FillDef[];
  strokes: StrokeDef[];
  scheme: ColorScheme;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = COLOR_MAP[scheme];

  const fillColors = { surface: "#1e2422", accent: c.fillAccent, highlight: c.fillDark };

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
          fill={fillColors[f.colorKey]}
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
          stroke={c.strokeBase}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1, stroke: [c.strokeBase, c.strokePeak, c.strokeEnd] } : {}}
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
          stroke={c.glowColor}
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
  { d: "m21.5 17.5 -6 -3.2V4.4l-4 -3.9 -4 3.9v9.9l-6 3.2 -1 3h22l-1 -3Z", colorKey: "surface" },
  { d: "M15.5 14.3V4.4l-4 -3.9v20h11l-1 -3 -6 -3.2Z", colorKey: "accent" },
  { d: "M3.5 16.4V8l1 -1 1 1v7.4", colorKey: "accent" },
  { d: "M17.5 15.4V8l1 -1 1 1v8.4", colorKey: "accent" },
  { d: "M9.5 20.5h4l1.5 3H8l1.5 -3Z", colorKey: "highlight" },
  { d: "m3.5 20.5 -1 2h4l-1 -2", colorKey: "highlight" },
  { d: "m17.5 20.5 -1 2h4l-1 -2", colorKey: "highlight" },
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
  return <AnimatedIcon fills={spacecraftFills} strokes={spacecraftStrokes} scheme="green" />;
}

// ── Store (Freelance Marketplace) ────────────────────────────────────────

const storeFills: FillDef[] = [
  { d: "M19.5 2.5h-16l-3 5h2v15h18v-15h2l-3 -5Z", colorKey: "surface" },
  { d: "M22.5 7.5V10L21 11.5 19.5 10l-2 1.5 -2 -1.5 -2 1.5 -2 -1.5 -2 1.5 -2 -1.5 -2 1.5 -2 -1.5L2 11.5 0.5 10V7.5h22Z", colorKey: "accent" },
  { d: "m13.5 13.5 -11 5h11v-5Z", colorKey: "accent" },
  { d: "M20.5 20.5h-18v2h18v-2Z", colorKey: "highlight" },
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
  return <AnimatedIcon fills={storeFills} strokes={storeStrokes} scheme="amber" />;
}

// ── Building (Traditional Agency) ────────────────────────────────────────

const buildingFills: FillDef[] = [
  { d: "M12.5 23.499h-11V7.99902l11 -3V23.499Z", colorKey: "surface" },
  { d: "M21.5 23.499h-7V7.49902l7 1V23.499Z", colorKey: "surface" },
  { d: "M12.5 4.99902 1.5 23.499h11V4.99902Z", colorKey: "accent" },
  { d: "m21.5 8.49902 -7 14.99998h7V8.49902Z", colorKey: "accent" },
  { d: "M3.5 7.45402v-4.955l5.5 1v2.454", colorKey: "highlight" },
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
  return <AnimatedIcon fills={buildingFills} strokes={buildingStrokes} scheme="cyan" />;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  Card component — shared between featured + side cards
 * ═══════════════════════════════════════════════════════════════════════ */

interface CardDef {
  title: string;
  rows: { label: string; value: string }[];
  isFeatured: boolean;
  scheme: ColorScheme;
  icon: React.ComponentType;
}

function ComparisonCard({ card }: { card: CardDef }) {
  const c = COLOR_MAP[card.scheme];

  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl border ${c.border} ${
        card.isFeatured ? "comparison-featured-card bg-sgwx-surface" : "bg-sgwx-surface/70"
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

      <div className={`flex items-center gap-3.5 px-5 pb-2 sm:px-6 ${card.isFeatured ? "pt-6 sm:pt-7" : "pt-5 sm:pt-6"}`}>
        <card.icon />
        <h3 className={`font-thin tracking-tight ${card.isFeatured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"} ${c.titleText}`}>
          {card.title}
        </h3>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-5 pt-1 sm:gap-2.5 sm:px-5 sm:pb-6">
        {card.rows.map((row) => (
          <div
            key={row.label}
            className={`rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 border ${c.rowBorder} ${c.rowBg}`}
          >
            <div className="flex items-start gap-2.5">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.checkBg} ${c.checkText}`}>
                ✓
              </span>
              <div className="min-w-0">
                <p className={`truncate text-sm font-semibold ${c.bodyText}`}>
                  {row.value.split(".")[0]}...
                </p>
                <p className={`mt-0.5 text-xs ${c.dimText}`}>
                  {row.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  Main Section
 *
 *  Layout (desktop): [Agency ← | ★ Sageworx ★ | → Freelance]
 *  Animation: side cards start behind center, slide out to left/right
 *  Hover: side cards scale up; Sageworx always stays largest + centered
 * ═══════════════════════════════════════════════════════════════════════ */

export default function ComparisonTable({
  eyebrow = "The Model Makes a Difference",
  heading = "Why Sageworx?",
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  cta = { label: "Explore Our Model", href: "/model" },
}: ComparisonTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<"left" | "right" | null>(null);

  const agencyCard: CardDef = {
    title: columns.agency,
    isFeatured: false,
    scheme: "cyan",
    icon: BuildingIcon,
    rows: rows.map((r) => ({ label: r.criteria, value: r.traditional })),
  };

  const sageworxCard: CardDef = {
    title: columns.sageworx,
    isFeatured: true,
    scheme: "green",
    icon: SpacecraftIcon,
    rows: rows.map((r) => ({ label: r.criteria, value: r.sageworx })),
  };

  const freelanceCard: CardDef = {
    title: columns.freelance,
    isFeatured: false,
    scheme: "amber",
    icon: StoreIcon,
    rows: rows.map((r) => ({ label: r.criteria, value: r.freelancers })),
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="comparison-bg-grid pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

      <Container>
        <AnimatedSection>
          <SectionHeading eyebrow={eyebrow} heading={heading} align="right" />
        </AnimatedSection>

        <div ref={containerRef} className="comparison-perspective mt-12 sm:mt-16">
          <motion.div
            className="comparison-deck"
            animate={{
              gridTemplateColumns:
                hoveredCard === "left"
                  ? "1.3fr 0.85fr 0.85fr"
                  : hoveredCard === "right"
                    ? "0.85fr 0.85fr 1.3fr"
                    : "0.85fr 1.3fr 0.85fr",
            }}
            transition={{ duration: 0.5, ease: drawEase }}
          >
            {/* Left — Agency (slides out from behind center to the left) */}
            <motion.div
              className="comparison-side-card comparison-side-left"
              initial={{ opacity: 0, x: "45%", scale: 0.78 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                      scale: hoveredCard === "left" ? 1.02 : 0.92,
                      y: hoveredCard === "left" ? -4 : 0,
                      filter:
                        hoveredCard === "left"
                          ? "brightness(1.15) contrast(1.1)"
                          : hoveredCard
                            ? "brightness(0.6) contrast(0.85)"
                            : "brightness(1) contrast(1)",
                    }
                  : {}
              }
              transition={{ duration: 0.5, ease: drawEase }}
              onMouseEnter={() => setHoveredCard("left")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ zIndex: hoveredCard === "left" ? 3 : 1 }}
            >
              <ComparisonCard card={agencyCard} />
            </motion.div>

            {/* Center — Sageworx (appears first, always on top when not hovering sides) */}
            <motion.div
              className="comparison-center-card"
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: hoveredCard ? 0.92 : 1.05,
                      filter: hoveredCard
                        ? "brightness(0.6) contrast(0.85)"
                        : "brightness(1) contrast(1)",
                    }
                  : {}
              }
              transition={{ duration: 0.5, ease: drawEase }}
              style={{ zIndex: hoveredCard ? 1 : 3 }}
            >
              <div className="comparison-glow pointer-events-none absolute -inset-8 -z-10 rounded-3xl" />
              <ComparisonCard card={sageworxCard} />
            </motion.div>

            {/* Right — Freelance (slides out from behind center to the right) */}
            <motion.div
              className="comparison-side-card comparison-side-right"
              initial={{ opacity: 0, x: "-45%", scale: 0.78 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                      scale: hoveredCard === "right" ? 1.02 : 0.92,
                      y: hoveredCard === "right" ? -4 : 0,
                      filter:
                        hoveredCard === "right"
                          ? "brightness(1.15) contrast(1.1)"
                          : hoveredCard
                            ? "brightness(0.6) contrast(0.85)"
                            : "brightness(1) contrast(1)",
                    }
                  : {}
              }
              transition={{ duration: 0.5, ease: drawEase }}
              onMouseEnter={() => setHoveredCard("right")}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ zIndex: hoveredCard === "right" ? 3 : 1 }}
            >
              <ComparisonCard card={freelanceCard} />
            </motion.div>
          </motion.div>
        </div>

        {/* Accessible sr-only table */}
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

        <AnimatedSection delay={0.6}>
          <div className="mt-10 text-center">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
