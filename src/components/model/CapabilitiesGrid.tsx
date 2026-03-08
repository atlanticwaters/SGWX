"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
    dimText: string;
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
    dimText: "text-sgwx-text-muted",
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
    dimText: "text-sgwx-text-dim",
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
    dimText: "text-sgwx-text-dim",
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
    dimText: "text-sgwx-text-dim",
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
  isActive,
}: {
  fills: FillDef[];
  strokes: StrokeDef[];
  scheme: ColorScheme;
  isActive: boolean;
}) {
  const c = COLOR_MAP[scheme];

  const fillColors = {
    surface: "#1e2422",
    accent: c.fillAccent,
    highlight: c.fillDark,
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="44"
      height="44"
      className="shrink-0"
      aria-hidden="true"
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.88 }}
      transition={{ duration: 0.35, delay: 0.05, ease: drawEase }}
    >
      {fills.map((f, i) => (
        <motion.path
          key={`f${i}`}
          d={f.d}
          fill={fillColors[f.colorKey]}
          animate={isActive ? { opacity: 1 } : { opacity: 0.3 }}
          transition={{
            duration: 0.25,
            delay: isActive ? 0.15 + i * 0.04 : 0,
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
          animate={
            isActive
              ? {
                  pathLength: 1,
                  stroke: [c.strokeBase, c.strokePeak, c.strokeEnd],
                }
              : { pathLength: 1, stroke: c.strokeBase }
          }
          transition={{
            pathLength: {
              duration: 0.5,
              delay: isActive ? 0.12 + i * 0.04 : 0,
              ease: drawEase,
            },
            stroke: {
              duration: 0.6,
              delay: isActive ? 0.12 + i * 0.04 : 0,
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
          animate={
            isActive
              ? { pathLength: 1, opacity: [0, 0.5, 0] }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: {
              duration: 0.5,
              delay: isActive ? 0.12 + i * 0.04 : 0,
              ease: drawEase,
            },
            opacity: {
              duration: 0.55,
              delay: isActive ? 0.12 + i * 0.04 : 0,
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
 *  Capability item type (title + description)
 * ═══════════════════════════════════════════════════════════════════════ */

interface CapabilityItem {
  title: string;
  description: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  Capability Card — styled like the comparison table cards
 * ═══════════════════════════════════════════════════════════════════════ */

function CapabilityCard({
  label,
  items,
  scheme,
  iconIndex,
  isActive,
}: {
  label: string;
  items: CapabilityItem[];
  scheme: ColorScheme;
  iconIndex: number;
  isActive: boolean;
}) {
  const c = COLOR_MAP[scheme];
  const icon = CATEGORY_ICONS[iconIndex % CATEGORY_ICONS.length];

  return (
    <div
      className={`capabilities-card relative overflow-hidden rounded-2xl border ${c.borderActive} bg-sgwx-surface/80 backdrop-blur-sm`}
      style={{
        boxShadow: `0 0 30px ${c.glowRgba}, 0 4px 24px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-0.5"
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
        <div className="flex items-center gap-3.5 px-5 pt-5 pb-2 sm:px-6 sm:pt-6">
          <AnimatedIcon
            fills={icon.fills}
            strokes={icon.strokes}
            scheme={scheme}
            isActive={isActive}
          />
          <h3
            className={`text-xl font-thin tracking-tight sm:text-2xl ${c.titleText}`}
          >
            {label}
          </h3>
        </div>
      )}

      {/* Item rows — 3-column grid for landscape layout */}
      <div
        className={`grid grid-cols-3 gap-2 px-4 pb-5 sm:gap-2.5 sm:px-5 sm:pb-6 ${
          label ? "pt-1" : "pt-5"
        }`}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl border px-3.5 py-3 sm:px-4 sm:py-3 ${c.rowBorder} ${c.rowBg}`}
          >
            <div className="flex items-start gap-2">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${c.checkBg} ${c.checkText}`}
              >
                &#10003;
              </span>
              <div className="min-w-0">
                <p className={`text-sm font-semibold leading-snug ${c.bodyText}`}>
                  {item.title}
                </p>
                {item.description && (
                  <p className={`mt-1 text-xs leading-relaxed ${c.dimText}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 *  Default data — with descriptions
 * ═══════════════════════════════════════════════════════════════════════ */

interface TabData {
  id: string;
  label: string;
  items: CapabilityItem[];
}

const defaultTabs: TabData[] = [
  {
    id: "launch",
    label: "Launch",
    items: [
      {
        title: "Brand Strategy & Architecture",
        description:
          "Define your brand's DNA — positioning, architecture, and competitive moat — so every touchpoint tells the same story.",
      },
      {
        title: "Brand Identity & Visual Design",
        description:
          "Craft a visual system — logo, color, type, and motion — that's instantly recognizable and built to scale.",
      },
      {
        title: "Brand Positioning & Messaging",
        description:
          "Distill what makes you different into sharp, ownable language that cuts through category noise.",
      },
      {
        title: "Marketing Strategy & Planning",
        description:
          "Map the channels, cadence, and KPIs that turn budget into measurable growth from day one.",
      },
      {
        title: "Brand Messaging & Copywriting",
        description:
          "Write the headlines, taglines, and narrative frameworks that make audiences lean in.",
      },
      {
        title: "Product Launch & MVP Development",
        description:
          "Ship a focused first version fast — validated by real users, not assumptions — so you learn before you scale.",
      },
    ],
  },
  {
    id: "engage",
    label: "Engage",
    items: [
      {
        title: "Marketing Campaigns & Activation",
        description:
          "Orchestrate multi-channel campaigns that move from awareness to action with clear conversion paths.",
      },
      {
        title: "Content Marketing & Strategy",
        description:
          "Build an editorial engine — blogs, video, social — that earns attention and compounds organic reach over time.",
      },
      {
        title: "Gamification & Interactive Experiences",
        description:
          "Design reward loops, challenges, and interactive moments that turn passive viewers into active participants.",
      },
      {
        title: "Experiential Marketing & Events",
        description:
          "Create immersive in-person and virtual experiences that forge emotional connections at scale.",
      },
      {
        title: "Brand Activations",
        description:
          "Launch bold, moment-driven activations — pop-ups, stunts, partnerships — that generate buzz and earned media.",
      },
      {
        title: "Audience Engagement Strategies",
        description:
          "Develop personalized engagement playbooks that deepen relationships across every stage of the funnel.",
      },
    ],
  },
  {
    id: "mobilize",
    label: "Mobilize",
    items: [
      {
        title: "Community Building & Management",
        description:
          "Stand up owned communities — forums, Discord, private groups — where your most loyal customers become advocates.",
      },
      {
        title: "Loyalty Programs & Membership Strategy",
        description:
          "Design tiered reward systems that increase retention, lifetime value, and genuine brand affinity.",
      },
      {
        title: "Brand Ambassador Programs",
        description:
          "Recruit, equip, and activate real customers as credible brand voices who amplify your message organically.",
      },
      {
        title: "Influencer Marketing & Partnerships",
        description:
          "Identify and partner with creators who authentically align with your brand for measurable reach and trust.",
      },
      {
        title: "Creator & Content Partnerships",
        description:
          "Co-create content with established creators, blending their audience trust with your brand narrative.",
      },
      {
        title: "Social Media & Digital Amplification",
        description:
          "Execute platform-native social strategies — paid, organic, and viral — that expand your digital footprint.",
      },
    ],
  },
  {
    id: "transform",
    label: "Transform",
    items: [
      {
        title: "Organizational Change & Alignment",
        description:
          "Align leadership, teams, and culture around a shared vision so strategic pivots stick, not stall.",
      },
      {
        title: "Sales Training & Sales Enablement",
        description:
          "Arm your sales team with messaging, decks, and playbooks that shorten cycles and increase win rates.",
      },
      {
        title: "Employee Engagement & Training Workshops",
        description:
          "Run hands-on workshops and internal events that upskill teams and turn employees into brand champions.",
      },
      {
        title: "AI Strategy & Marketing Automation",
        description:
          "Integrate AI tools and automation workflows that multiply output without multiplying headcount.",
      },
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

/** Convert legacy string[] items to CapabilityItem[] */
function normalizeTabs(
  tabs: { id: string; label: string; items: string[] }[]
): TabData[] {
  return tabs.map((t) => ({
    id: t.id,
    label: t.label,
    items: t.items.map((item) => ({ title: item, description: "" })),
  }));
}

export default function CapabilitiesGrid({
  eyebrow,
  tabs,
  backgroundUrl,
  overlayColor,
}: CapabilitiesGridProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Always use defaultTabs (which include descriptions) until Sanity schema is updated
  // with the new { title, description } item format.
  const capTabs = defaultTabs;

  const handleTabChange = (newIndex: number) => {
    setActiveTab(newIndex);
  };

  // Each card is 820px wide (landscape) with 28px gap.
  // We translate the track so the active card centers in the viewport.
  const cardWidth = 820;
  const gap = 28;
  const trackWidth = capTabs.length * cardWidth + (capTabs.length - 1) * gap;

  // Center offset: we want the center of the active card at 50% of the container.
  // Card center = activeTab * (cardWidth + gap) + cardWidth / 2
  // We want that at trackContainer / 2, but since we use % based on the track,
  // we just translate in px.
  const activeCardCenter =
    activeTab * (cardWidth + gap) + cardWidth / 2;

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
      <div className="capabilities-bg-grid pointer-events-none absolute inset-0 z-1 overflow-hidden" />

      <Container className="relative z-2">
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
                  onClick={() => handleTabChange(i)}
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
                    handleTabChange(next);
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

      </Container>

        {/* All cards in a horizontal track — full viewport width, slides to center active */}
        <div className="relative z-2 mt-10 overflow-hidden py-6">
          <motion.div
            className="flex items-start"
            style={{ gap, width: trackWidth }}
            animate={{
              x: `calc(50vw - ${activeCardCenter}px)`,
            }}
            transition={{ duration: 0.6, ease: drawEase }}
          >
            {capTabs.map((tab, i) => {
              const scheme = TAB_SCHEMES[i % TAB_SCHEMES.length];
              const colors = COLOR_MAP[scheme];
              const isActive = activeTab === i;

              return (
                <motion.div
                  key={tab.id}
                  className="shrink-0 cursor-pointer"
                  style={{ width: cardWidth }}
                  animate={{
                    scale: isActive ? 1.02 : 0.92,
                    opacity: isActive ? 1 : 0.45,
                    filter: isActive
                      ? "brightness(1) contrast(1)"
                      : "brightness(0.65) contrast(0.9)",
                  }}
                  transition={{ duration: 0.5, ease: drawEase }}
                  onClick={() => handleTabChange(i)}
                  role="tabpanel"
                  id={`tabpanel-${tab.id}`}
                  aria-labelledby={`tab-${tab.id}`}
                >
                  {/* Glow behind active card */}
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
                        style={{
                          background: `radial-gradient(ellipse at center, ${colors.glowRgba} 0%, transparent 70%)`,
                          filter: "blur(24px)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                    <CapabilityCard
                      label={tab.label}
                      items={tab.items}
                      scheme={scheme}
                      iconIndex={i}
                      isActive={isActive}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
    </section>
  );
}
