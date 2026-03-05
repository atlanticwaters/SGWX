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

/* ─── Card data ─────────────────────────────────────────────────────────── */

interface CardData {
  title: string;
  rows: { label: string; value: string }[];
  isFeatured: boolean;
}

/*
 * Per-card scroll trajectory.
 * start  = stacked state (cards overlapping, flat, centered)
 * end    = fanned-out 3D state
 *
 * scrollYProgress mapping:
 *   0.0  = section top hits viewport bottom
 *   ~0.3 = section roughly centred → cards fully fanned
 *   1.0  = section bottom hits viewport top
 */
const CARD_TRAJECTORIES: {
  rotateY: number[];
  rotateX: number[];
  translateX: number[];
  translateZ: number[];
  y: number[];
  opacity: number[];
}[] = [
  // Sageworx — fans to the left, rotates to face right, comes forward
  { rotateY: [0, 18], rotateX: [6, 0], translateX: [0, -8], translateZ: [0, 60], y: [60, 0], opacity: [0, 1] },
  // Freelance — stays centre, slight tilt
  { rotateY: [0, 6], rotateX: [6, 0], translateX: [0, 0], translateZ: [0, 0], y: [80, 0], opacity: [0, 1] },
  // Traditional — fans to the right, recedes
  { rotateY: [0, -8], rotateX: [6, 0], translateX: [0, 8], translateZ: [0, -40], y: [100, 0], opacity: [0, 1] },
];

/* ─── Scroll-driven card ────────────────────────────────────────────────── */

function useCardTransforms(progress: MotionValue<number>, index: number) {
  const t = CARD_TRAJECTORIES[index];
  // Cards fan out between 0 → 0.35 of the scroll range, then hold
  const range = [0, 0.35];

  const rotateY = useTransform(progress, range, t.rotateY);
  const rotateX = useTransform(progress, range, t.rotateX);
  const x = useTransform(progress, range, t.translateX);
  const z = useTransform(progress, range, t.translateZ);
  const y = useTransform(progress, range, t.y);
  const opacity = useTransform(progress, range, t.opacity);

  return { rotateY, rotateX, x, z, y, opacity };
}

function ComparisonCard({
  card,
  index,
  scrollProgress,
}: {
  card: CardData;
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const { rotateY, rotateX, x, z, y, opacity } = useCardTransforms(scrollProgress, index);

  return (
    <motion.div
      className="comparison-card relative"
      style={{ rotateY, rotateX, x, z, y, opacity }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-shadow duration-500 ${
          card.isFeatured
            ? "border-sgwx-green/50 bg-sgwx-surface/95 shadow-[0_0_40px_rgba(110,168,127,0.15),0_0_80px_rgba(110,168,127,0.05)]"
            : "border-sgwx-border bg-sgwx-surface/80"
        }`}
      >
        {/* Top accent bar for featured card */}
        {card.isFeatured && (
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sgwx-green/40 via-sgwx-green to-sgwx-green/40" />
        )}

        {/* Card Header */}
        <div className={`px-5 pb-3 pt-5 sm:px-6 sm:pt-6 ${card.isFeatured ? "pt-6 sm:pt-7" : ""}`}>
          <h3
            className={`text-lg font-bold uppercase tracking-wider sm:text-xl ${
              card.isFeatured ? "text-sgwx-green" : "text-sgwx-text"
            }`}
          >
            {card.title}
          </h3>
        </div>

        {/* Row Items */}
        <div className="flex flex-col gap-2 px-4 pb-5 sm:gap-2.5 sm:px-5 sm:pb-6">
          {card.rows.map((row) => (
            <div
              key={row.label}
              className={`rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 ${
                card.isFeatured
                  ? "border border-sgwx-green/20 bg-sgwx-highlight-col"
                  : "border border-sgwx-border-subtle bg-sgwx-bg-alt/60"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                    card.isFeatured
                      ? "bg-sgwx-green/20 text-sgwx-check"
                      : "bg-sgwx-border text-sgwx-text-dim"
                  }`}
                >
                  ✓
                </span>
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-semibold ${
                      card.isFeatured ? "text-sgwx-text" : "text-sgwx-text-muted"
                    }`}
                  >
                    {row.value.split(".")[0]}...
                  </p>
                  <p className="mt-0.5 text-xs text-sgwx-text-dim">{row.value}</p>
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

  // Track scroll progress of the entire section through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Build card data: Sageworx first (left on desktop, top on mobile)
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
