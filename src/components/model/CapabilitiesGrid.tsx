"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

const drawEase = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════════════════════════════════
 *  Color schemes per category
 * ═══════════════════════════════════════════════════════════════════════ */

type ColorScheme = "green" | "cyan" | "amber" | "violet";

const COLOR_MAP: Record<
  ColorScheme,
  {
    border: string;
    borderActive: string;
    titleText: string;
    rowBorder: string;
    rowBg: string;
    checkBg: string;
    checkText: string;
    bodyText: string;
    strokeBase: string;
    strokePeak: string;
    strokeEnd: string;
    glowColor: string;
    glowRgba: string;
    fillAccent: string;
    fillDark: string;
  }
> = {
  green: {
    border: "border-sgwx-green/40",
    borderActive: "border-sgwx-green/70",
    titleText: "text-sgwx-green-bright",
    rowBorder: "border-sgwx-green/20",
    rowBg: "bg-sgwx-green/[0.06]",
    checkBg: "bg-sgwx-green/25",
    checkText: "text-sgwx-green-bright",
    bodyText: "text-sgwx-text",
    strokeBase: "#4A7A58",
    strokePeak: "#9FDBB0",
    strokeEnd: "#6EA87F",
    glowColor: "#9FDBB0",
    glowRgba: "rgba(110,168,127,0.15)",
    fillAccent: "rgba(110,168,127,0.12)",
    fillDark: "#D4EEDA",
  },
  cyan: {
    border: "border-sgwx-cyan/30",
    borderActive: "border-sgwx-cyan/60",
    titleText: "text-sgwx-cyan",
    rowBorder: "border-sgwx-cyan/15",
    rowBg: "bg-sgwx-blue/30",
    checkBg: "bg-sgwx-teal/50",
    checkText: "text-sgwx-cyan",
    bodyText: "text-sgwx-text-muted",
    strokeBase: "#1E3540",
    strokePeak: "#799BA9",
    strokeEnd: "#1E3540",
    glowColor: "#799BA9",
    glowRgba: "rgba(121,155,169,0.12)",
    fillAccent: "rgba(121,155,169,0.12)",
    fillDark: "#2a4a58",
  },
  amber: {
    border: "border-sgwx-yellow/25",
    borderActive: "border-sgwx-yellow/55",
    titleText: "text-sgwx-yellow",
    rowBorder: "border-sgwx-yellow/12",
    rowBg: "bg-[#1a1800]/30",
    checkBg: "bg-sgwx-yellow/15",
    checkText: "text-sgwx-yellow",
    bodyText: "text-sgwx-text-muted",
    strokeBase: "#5c5520",
    strokePeak: "#d4c94a",
    strokeEnd: "#5c5520",
    glowColor: "#d4c94a",
    glowRgba: "rgba(212,201,74,0.10)",
    fillAccent: "rgba(212,201,74,0.10)",
    fillDark: "#4a4520",
  },
  violet: {
    border: "border-purple-500/25",
    borderActive: "border-purple-400/55",
    titleText: "text-purple-300",
    rowBorder: "border-purple-500/15",
    rowBg: "bg-purple-950/30",
    checkBg: "bg-purple-500/20",
    checkText: "text-purple-300",
    bodyText: "text-sgwx-text-muted",
    strokeBase: "#4a2d6e",
    strokePeak: "#b388f5",
    strokeEnd: "#6b3fa0",
    glowColor: "#b388f5",
    glowRgba: "rgba(139,92,246,0.10)",
    fillAccent: "rgba(139,92,246,0.10)",
    fillDark: "#6b3fa0",
  },
};

const TAB_SCHEMES: ColorScheme[] = ["green", "cyan", "amber", "violet"];

/* ═══════════════════════════════════════════════════════════════════════════
 *  Animated Line-Draw Icons
 * ═══════════════════════════════════════════════════════════════════════ */

interface FillDef {
  d: string;
  colorKey: "surface" | "accent" | "highlight";
}
interface StrokeDef {
  d: string;
}

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
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const c = COLOR_MAP[scheme];

  const fillColors = {
    surface: "#1e2422",
    accent: c.fillAccent,
    highlight: c.fillDark,
  };

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="44"
      height="44"
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
          transition={{
            duration: 0.25,
            delay: 0.5 + i * 0.04,
            ease: "easeOut",
          }}
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
          animate={
            inView
              ? {
                  pathLength: 1,
                  stroke: [c.strokeBase, c.strokePeak, c.strokeEnd],
                }
              : {}
          }
          transition={{
            pathLength: {
              duration: 0.5,
              delay: 0.12 + i * 0.04,
              ease: drawEase,
            },
            stroke: {
              duration: 0.6,
              delay: 0.12 + i * 0.04,
              ease: "easeOut",
            },
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
            pathLength: {
              duration: 0.5,
              delay: 0.12 + i * 0.04,
              ease: drawEase,
            },
            opacity: {
              duration: 0.55,
              delay: 0.12 + i * 0.04,
              ease: "easeInOut",
            },
          }}
          style={{ filter: "blur(4px)" }}
        />
      ))}
    </motion.svg>
  );
}

// Rocket — Launch
const rocketFills: FillDef[] = [
  {
    d: "m21.5 17.5 -6 -3.2V4.4l-4 -3.9 -4 3.9v9.9l-6 3.2 -1 3h22l-1 -3Z",
    colorKey: "surface",
  },
  {
    d: "M15.5 14.3V4.4l-4 -3.9v20h11l-1 -3 -6 -3.2Z",
    colorKey: "accent",
  },
  { d: "M9.5 20.5h4l1.5 3H8l1.5 -3Z", colorKey: "highlight" },
];
const rocketStrokes: StrokeDef[] = [
  { d: "m13.5 13.2002 8 4.3 1 3H0.5l1 -3 8 -4.3" },
  { d: "M13.5 20.5v-13l-2 -2 -2 2v13" },
  { d: "M15.5 14.3V4.4l-4 -3.9 -4 3.9v9.9" },
  { d: "M3.5 16.4V8l1 -1 1 1v7.4" },
  { d: "M17.5 15.4V8l1 -1 1 1v8.4" },
  { d: "M9.5 20.5h4l1.5 3H8l1.5 -3Z" },
  { d: "M11.5 18.5v5" },
  { d: "M11.5 8.5v1" },
];

// Signal — Engage
const signalFills: FillDef[] = [
  { d: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z", colorKey: "surface" },
  { d: "M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z", colorKey: "highlight" },
];
const signalStrokes: StrokeDef[] = [
  { d: "M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" },
  { d: "M8.46 8.46a5 5 0 0 0 0 7.08" },
  { d: "M15.54 8.46a5 5 0 0 1 0 7.08" },
  { d: "M5.64 5.64a9 9 0 0 0 0 12.73" },
  { d: "M18.36 5.64a9 9 0 0 1 0 12.73" },
  { d: "M3.51 3.51a12 12 0 0 0 0 16.97" },
  { d: "M20.49 3.51a12 12 0 0 1 0 16.97" },
];

// Network — Mobilize
const networkFills: FillDef[] = [
  { d: "M10 2a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z", colorKey: "surface" },
  { d: "M2 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z", colorKey: "surface" },
  { d: "M18 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z", colorKey: "surface" },
  { d: "M6 20a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z", colorKey: "surface" },
  { d: "M14 20a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z", colorKey: "surface" },
  { d: "M9 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z", colorKey: "highlight" },
];
const networkStrokes: StrokeDef[] = [
  { d: "M12 7v1" },
  { d: "M6 12h2.5" },
  { d: "M15.5 12H18" },
  { d: "M9 18.5l1.5-5" },
  { d: "M13.5 13.5L15 18.5" },
  { d: "M12 4v3" },
  { d: "M9 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" },
  { d: "M10 2a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" },
  { d: "M2 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" },
  { d: "M18 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" },
  { d: "M6 20a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" },
  { d: "M14 20a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" },
];

// Lightning/Gear — Transform
const transformFills: FillDef[] = [
  { d: "M10.5 2l-1 4.5h5l-1-4.5h-3Z", colorKey: "surface" },
  {
    d: "M5.5 5.5l2 3.5h9l2-3.5a10 10 0 0 0-13 0Z",
    colorKey: "accent",
  },
  { d: "M13 11l-2 5 4-2.5-2 5.5 4-3-2 5", colorKey: "highlight" },
];
const transformStrokes: StrokeDef[] = [
  { d: "M12 2v2" },
  { d: "M4.93 4.93l1.41 1.41" },
  { d: "M19.07 4.93l-1.41 1.41" },
  { d: "M2 12h2" },
  { d: "M20 12h2" },
  { d: "M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" },
  { d: "M13 10l-3 7 5-3-3 7" },
  { d: "M8 12a4 4 0 0 1 4-4" },
  { d: "M16 12a4 4 0 0 1-4 4" },
];

const CATEGORY_ICONS: {
  fills: FillDef[];
  strokes: StrokeDef[];
}[] = [
  { fills: rocketFills, strokes: rocketStrokes },
  { fills: signalFills, strokes: signalStrokes },
  { fills: networkFills, strokes: networkStrokes },
  { fills: transformFills, strokes: transformStrokes },
];

/* ═══════════════════════════════════════════════════════════════════════════
 *  Capability Card — styled like the comparison table cards
 * ═══════════════════════════════════════════════════════════════════════ */

function CapabilityCard({
  label,
  items,
  scheme,
  iconIndex,
}: {
  label: string;
  items: string[];
  scheme: ColorScheme;
  iconIndex: number;
}) {
  const c = COLOR_MAP[scheme];
  const icon = CATEGORY_ICONS[iconIndex % CATEGORY_ICONS.length];

  return (
    <div
      className={`capabilities-card relative h-full overflow-hidden rounded-2xl border ${c.borderActive} bg-sgwx-surface/80 backdrop-blur-sm`}
      style={{
        boxShadow: `0 0 30px ${c.glowRgba}, 0 4px 24px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${c.glowColor}50, transparent)`,
        }}
      />
      {/* Side glow lines */}
      <div
        className="absolute inset-y-0 left-0 w-px"
        style={{
          background: `linear-gradient(to bottom, transparent, ${c.glowColor}20, transparent)`,
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-px"
        style={{
          background: `linear-gradient(to bottom, transparent, ${c.glowColor}20, transparent)`,
        }}
      />

      {/* Header with icon and title */}
      {label && (
        <div className="flex items-center gap-3.5 px-5 pt-6 pb-2 sm:px-6 sm:pt-7">
          <AnimatedIcon
            fills={icon.fills}
            strokes={icon.strokes}
            scheme={scheme}
          />
          <h3
            className={`text-xl font-thin tracking-tight sm:text-2xl ${c.titleText}`}
          >
            {label}
          </h3>
        </div>
      )}

      {/* Item rows */}
      <div
        className={`flex flex-col gap-2 px-4 pb-5 sm:gap-2.5 sm:px-5 sm:pb-6 ${
          label ? "pt-1" : "pt-5"
        }`}
      >
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.35,
              ease: drawEase,
              delay: 0.06 + i * 0.05,
            }}
            className={`rounded-xl border px-3.5 py-3 sm:px-4 sm:py-3.5 ${c.rowBorder} ${c.rowBg}`}
          >
            <div className="flex items-start gap-2.5">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.checkBg} ${c.checkText}`}
              >
                &#10003;
              </span>
              <span className={`text-sm leading-snug ${c.bodyText}`}>
                {item}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  Default data
 * ═══════════════════════════════════════════════════════════════════════ */

const defaultTabs = [
  {
    id: "launch",
    label: "Launch",
    items: [
      "Brand Strategy & Architecture",
      "Brand Identity & Visual Design",
      "Brand Positioning & Messaging",
      "Marketing Strategy & Planning",
      "Brand Messaging & Copywriting",
      "Product Launch & MVP Development",
    ],
  },
  {
    id: "engage",
    label: "Engage",
    items: [
      "Marketing Campaigns & Activation",
      "Content Marketing & Strategy",
      "Gamification & Interactive Experiences",
      "Experiential Marketing & Events",
      "Brand Activations",
      "Audience Engagement Strategies",
    ],
  },
  {
    id: "mobilize",
    label: "Mobilize",
    items: [
      "Community Building & Management",
      "Loyalty Programs & Membership Strategy",
      "Brand Ambassador Programs",
      "Influencer Marketing & Partnerships",
      "Creator & Content Partnerships",
      "Social Media & Digital Amplification",
    ],
  },
  {
    id: "transform",
    label: "Transform",
    items: [
      "Organizational Change & Alignment",
      "Sales Training & Sales Enablement",
      "Employee Engagement, Internal Events & Training Workshops",
      "AI Strategy & Marketing Automation",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
 *  Main Section
 * ═══════════════════════════════════════════════════════════════════════ */

interface CapabilitiesGridProps {
  eyebrow?: string;
  tabs?: { id: string; label: string; items: string[] }[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function CapabilitiesGrid({
  eyebrow,
  tabs,
  backgroundUrl,
  overlayColor,
}: CapabilitiesGridProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const capTabs = tabs ?? defaultTabs;
  const activeScheme = TAB_SCHEMES[activeTab % TAB_SCHEMES.length];
  const activeColors = COLOR_MAP[activeScheme];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Animated background image */}
      {backgroundUrl && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-[-10%]"
            animate={{
              scale: [1, 1.04, 1],
              y: ["0%", "1.5%", "0%"],
            }}
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image
              src={backgroundUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{
                filter: "brightness(0.18) contrast(1.1) saturate(0.2)",
              }}
              quality={75}
            />
          </motion.div>
          {/* Color overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                overlayColor === "teal"
                  ? "linear-gradient(135deg, rgba(10,79,94,0.18) 0%, rgba(4,42,61,0.22) 50%, rgba(13,107,74,0.10) 100%)"
                  : overlayColor === "steel"
                    ? "linear-gradient(135deg, rgba(121,155,169,0.16) 0%, rgba(4,42,61,0.20) 50%, rgba(10,79,94,0.10) 100%)"
                    : "linear-gradient(135deg, rgba(110,168,127,0.14) 0%, rgba(57,63,62,0.18) 50%, rgba(121,155,169,0.08) 100%)",
              mixBlendMode: "color",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(110,168,127,0.06) 0%, transparent 70%)",
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(12,15,14,0.5) 65%, rgba(12,15,14,0.85) 100%)",
            }}
          />
        </div>
      )}

      {/* Subtle grid pattern */}
      <div className="capabilities-bg-grid pointer-events-none absolute inset-0 z-[1] overflow-hidden" />

      <Container className="relative z-[2]">
        <AnimatedSection>
          <p className="mb-6 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
            {eyebrow ?? "Capabilities"}
          </p>

          {/* Pill tab navigation */}
          <nav
            role="tablist"
            aria-label="Capabilities categories"
            className="flex flex-wrap gap-2"
          >
            {capTabs.map((tab, i) => {
              const scheme = TAB_SCHEMES[i % TAB_SCHEMES.length];
              const c = COLOR_MAP[scheme];
              const isActive = activeTab === i;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(i)}
                  onKeyDown={(e) => {
                    let next = i;
                    if (e.key === "ArrowRight") {
                      next = (i + 1) % capTabs.length;
                    } else if (e.key === "ArrowLeft") {
                      next = (i - 1 + capTabs.length) % capTabs.length;
                    } else {
                      return;
                    }
                    e.preventDefault();
                    setActiveTab(next);
                    tabRefs.current[next]?.focus();
                  }}
                  className={`rounded-full border px-5 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? `${c.borderActive} ${c.titleText} bg-sgwx-surface/60`
                      : "border-sgwx-border bg-sgwx-surface/40 text-sgwx-text-muted hover:border-sgwx-green/30 hover:text-sgwx-text"
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: `0 0 18px ${c.glowRgba}`,
                        }
                      : undefined
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </AnimatedSection>

        {/* Card panel — shows active category as a featured card */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={capTabs[activeTab].id}
              role="tabpanel"
              id={`tabpanel-${capTabs[activeTab].id}`}
              aria-labelledby={`tab-${capTabs[activeTab].id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: drawEase }}
              className="mx-auto max-w-2xl"
            >
              {/* Glow behind the card */}
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
                  style={{
                    background: `radial-gradient(ellipse at center, ${activeColors.glowRgba} 0%, ${activeColors.glowRgba.replace(/[\d.]+\)$/, "0.04)")} 50%, transparent 70%)`,
                    filter: "blur(24px)",
                  }}
                />
                <CapabilityCard
                  label={capTabs[activeTab].label}
                  items={capTabs[activeTab].items}
                  scheme={activeScheme}
                  iconIndex={activeTab}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
