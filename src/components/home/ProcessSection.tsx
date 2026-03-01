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

const stages = [
  {
    num: "01",
    title: "Launch",
    id: "launch",
    desc: "Brand foundation + market entry. Strategic and visual infrastructure to compete from day one.",
    accent: "green" as const,
    deepFieldVariant: 1 as const,
  },
  {
    num: "02",
    title: "Engage",
    id: "engage",
    desc: "Content + experiences that connect. Campaigns, video, interactive \u2014 the work that moves people to act.",
    accent: "cyan" as const,
    deepFieldVariant: 3 as const,
  },
  {
    num: "03",
    title: "Mobilize",
    id: "mobilize",
    desc: "Building communities + amplifying reach. Turning customers into advocates and audiences into movements.",
    accent: "green" as const,
    deepFieldVariant: 5 as const,
  },
  {
    num: "04",
    title: "Transform",
    id: "transform",
    desc: "Internal alignment + organizational evolution. When the mission shifts to culture, we engineer the change.",
    accent: "cyan" as const,
    deepFieldVariant: 6 as const,
  },
];

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

function StageCard({ stage }: { stage: (typeof stages)[number] }) {
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
            width: "800px",
            height: "800px",
            transform: "translate(-50%, -50%) scale(1.5)",
            transformOrigin: "center center",
          }}
        >
          <DeepFieldCanvas variant={stage.deepFieldVariant} size={800} />
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
        {stage.num}
      </div>

      {/* Content */}
      <div className="relative z-[2] flex flex-1 flex-col p-6">
        {/* Stage label */}
        <p
          className="font-mono text-[10px] font-medium uppercase tracking-widest transition-colors duration-500"
          style={{ color: hovered ? colors.labelBright : colors.label }}
        >
          stage {stage.num}
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
          {stage.desc}
        </p>

        {/* Explore link — reveals on hover */}
        <div
          className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
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

export default function ProcessSection({
  backgroundUrl,
  overlayColor,
}: {
  backgroundUrl?: string;
  overlayColor?: string;
}) {
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
            eyebrow="Our Process"
            heading="The Growth Sequence"
            subheading="Smart content + experiences built for every stage of your brand\u2019s evolution."
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <AnimatedSection key={stage.num} delay={0.08 + i * 0.08}>
              <StageCard stage={stage} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-10 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-sgwx-green transition-colors hover:text-sgwx-green-bright"
            >
              Explore the full sequence
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
