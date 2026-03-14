"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

const DeepFieldCanvas = dynamic(
  () => import("@/components/animations/DeepFieldCanvas"),
  { ssr: false }
);

interface ProcessStage {
  number: string;
  title: string;
  id: string;
  description: string;
  output?: string;
  accent: "green" | "cyan";
}

const DEFAULT_STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "Immersion & Brief",
    id: "immersion",
    description: "We define the problem, align on goals, and set success markers.",
    output: "Mission Brief",
    accent: "green",
  },
  {
    number: "02",
    title: "Build The Team",
    id: "build-team",
    description: "We assemble the right mix of seasoned talent for category expertise.",
    output: "Purpose Built Team",
    accent: "cyan",
  },
  {
    number: "03",
    title: "Shape The Direction",
    id: "shape-direction",
    description: "We convert the brief into clear avenues for strategic and creative exploration.",
    output: "Strategic Roadmap",
    accent: "green",
  },
  {
    number: "04",
    title: "Create & Refine",
    id: "create-refine",
    description: "Work unfolds in focused sprints. Strategy, creative, and production operate as one.",
    output: "Accelerated Progress",
    accent: "cyan",
  },
  {
    number: "05",
    title: "Capture Learnings",
    id: "capture-learnings",
    description: "Insights, decisions, and learnings inform the work now and the work to come.",
    output: "Shared Knowledge",
    accent: "green",
  },
  {
    number: "06",
    title: "Evolve & Scale",
    id: "evolve-scale",
    description: "Leadership stays consistent. Specialists come in as needed. You get continuity without long-term overhead.",
    output: "Sustained Momentum",
    accent: "cyan",
  },
];

const DEEP_FIELD_VARIANTS = [1, 3, 5, 6] as const;

const accentColors = {
  green: {
    label: "#6EA87F",
    labelBright: "#9FDBB0",
    border: "rgba(110,168,127,0.4)",
    glow: "rgba(110,168,127,0.1)",
    stroke: "rgba(110,168,127,0.15)",
    strokeHover: "rgba(159,219,176,0.3)",
  },
  cyan: {
    label: "#88EEFF",
    labelBright: "#AAFFFF",
    border: "rgba(136,238,255,0.4)",
    glow: "rgba(136,238,255,0.1)",
    stroke: "rgba(136,238,255,0.15)",
    strokeHover: "rgba(170,255,255,0.3)",
  },
};

function StageCard({ stage, deepFieldVariant }: { stage: ProcessStage; deepFieldVariant: 1 | 3 | 5 | 6 }) {
  const [hovered, setHovered] = useState(false);
  const colors = accentColors[stage.accent];

  return (
    <Link
      href={`/process#${stage.id}`}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-sgwx-border bg-sgwx-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? colors.border : undefined,
        boxShadow: hovered ? `0 0 40px ${colors.glow}` : undefined,
        transition:
          "border-color 0.5s, box-shadow 0.6s",
      }}
    >
      {/* Deep Field canvas background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700"
        style={{ opacity: hovered ? 0.5 : 0.2 }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "400px",
            height: "400px",
            transform: "translate(-50%, -50%) scale(3)",
            transformOrigin: "center center",
          }}
        >
          <DeepFieldCanvas variant={deepFieldVariant} size={400} />
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
        style={{
          background: hovered
            ? "linear-gradient(180deg, rgba(22,28,25,0.5) 0%, rgba(22,28,25,0.3) 50%, rgba(22,28,25,0.6) 100%)"
            : "linear-gradient(180deg, rgba(22,28,25,0.7) 0%, rgba(22,28,25,0.5) 50%, rgba(22,28,25,0.7) 100%)",
        }}
      />

      {/* Watermark number */}
      <div
        className="pointer-events-none absolute z-[1] select-none text-[clamp(7rem,14vw,9rem)] font-black leading-none text-transparent"
        style={{
          bottom: "-1.5rem",
          right: "-1rem",
          WebkitTextStroke: `1.5px ${hovered ? colors.strokeHover : colors.stroke}`,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), -webkit-text-stroke 0.5s",
        }}
      >
        {stage.number}
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-1 flex-col p-6">
        {/* Stage label */}
        <p
          className="font-mono text-[14px] font-medium uppercase tracking-widest transition-colors duration-500"
          style={{ color: hovered ? colors.labelBright : colors.label }}
        >
          stage {stage.number}
        </p>

        {/* Title */}
        <h3
          className="mt-3 text-2xl font-thin tracking-tight transition-colors duration-500"
          style={{ color: hovered ? "#f0f4f2" : "#e8ece9" }}
        >
          {stage.title}
        </h3>

        {/* Description */}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-sgwx-text-muted">
          {stage.description}
        </p>

        {/* Output */}
        {stage.output && (
          <p
            className="mt-3 font-mono text-[14px] uppercase tracking-widest transition-colors duration-500"
            style={{ color: hovered ? colors.labelBright : colors.label }}
          >
            Output:{" "}
            <span className="text-sgwx-text-muted">{stage.output}</span>
          </p>
        )}

        {/* Explore link — reveals on hover */}
        <div
          className="mt-4 flex items-center gap-1.5 font-mono text-[14px] uppercase tracking-widest"
          style={{
            color: colors.label,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Explore stage
          <svg
            className="h-3 w-3"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h6M7 4l2 2-2 2" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

interface ProcessSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  stages?: ProcessStage[];
  footerLink?: { label: string; href: string };
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function ProcessSection({
  eyebrow = "Our Process",
  heading = "How The Work Gets Done.",
  subheading = "A clear, flexible process built for speed and follow-through.",
  stages = DEFAULT_STAGES,
  footerLink = { label: "Explore the full sequence", href: "/process" },
  backgroundUrl,
  overlayColor,
}: ProcessSectionProps) {
  return (
    <section className="relative bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && (
        <SectionBackground
          src={backgroundUrl}
          overlayColor={
            overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"
          }
        />
      )}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subheading={subheading}
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage, i) => (
            <AnimatedSection key={stage.number} delay={0.08 + i * 0.08}>
              <StageCard stage={stage} deepFieldVariant={DEEP_FIELD_VARIANTS[i % DEEP_FIELD_VARIANTS.length]} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-10 text-center">
            <Link
              href={footerLink.href}
              className="inline-flex items-center gap-2 text-sm tracking-wide text-sgwx-green transition-colors hover:text-sgwx-green-bright"
            >
              {footerLink.label}
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 10h10M11 6l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
