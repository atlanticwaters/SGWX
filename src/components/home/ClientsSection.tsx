"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

const DeepFieldCanvas = dynamic(
  () => import("@/components/animations/DeepFieldCanvas"),
  { ssr: false }
);

const DEFAULT_SEGMENTS = [
  {
    type: "Challenger Brands",
    painPoint: "Approval loops slow you down. Big agencies deliver decks instead of progress.",
    solution: "We clear the path and get to execution, quickly and thoughtfully.",
  },
  {
    type: "Niche Agencies",
    painPoint: "A client needs something outside your wheelhouse. You either scramble or say no.",
    solution: "Expand your capabilities with fractional specialists, not added overhead.",
  },
  {
    type: "Startups",
    painPoint: "Burn rate matters. Big hires come with big risks.",
    solution: "Senior leadership that scales as needed.",
  },
];

const DEEP_FIELD_VARIANTS = [1, 4, 6] as const;

interface ClientSegment {
  type: string;
  painPoint: string;
  solution: string;
}

function ClientCard({
  client,
  deepFieldVariant,
}: {
  client: ClientSegment;
  deepFieldVariant: 1 | 3 | 4 | 5 | 6;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-sgwx-border bg-sgwx-surface transition-all duration-500 hover:border-sgwx-green/40 hover:shadow-[0_0_40px_rgba(110,168,127,0.1)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.5s",
      }}
    >
      {/* Deep Field ambient background — square canvas scaled to cover the wide card */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700"
        style={{ opacity: hovered ? 0.55 : 0.3 }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: "400px",
            height: "400px",
            transform: "translate(-50%, -50%) scaleX(5)",
            transformOrigin: "center center",
          }}
        >
          <DeepFieldCanvas variant={deepFieldVariant} size={400} />
        </div>
      </div>

      {/* Gradient overlay for readability — lighter so animation shows through */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "linear-gradient(to right, rgba(22,28,25,0.7) 0%, rgba(22,28,25,0.4) 40%, rgba(22,28,25,0.15) 100%)" }} />

      {/* Content */}
      <div className="relative z-[2] grid grid-cols-1 p-6 lg:grid-cols-[280px_1fr] lg:gap-6">
        {/* Left column — heading (fixed width for consistency) */}
        <div className="flex flex-col justify-center border-b border-sgwx-border-subtle pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          <div>
            <div
              className="mb-3 h-0.5 w-8 transition-all duration-500"
              style={{
                backgroundColor: hovered ? "#6EA87F" : "#4A7A58",
                width: hovered ? "3rem" : "2rem",
              }}
            />
            <h3
              className="text-3xl font-thin tracking-tight transition-colors duration-500 md:text-4xl"
              style={{ color: hovered ? "#9FDBB0" : "#e8ece9" }}
            >
              {client.type}
            </h3>
          </div>
        </div>

        {/* Right column — challenge + solution */}
        <div className="divide-y divide-sgwx-border-subtle pt-5 lg:pt-0">
          <div className="flex items-start gap-3 pb-4">
            <svg className="mt-1.5 h-4 w-4 shrink-0 text-sgwx-text-dim" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-sgwx-text-dim">
                The Pain Point
              </p>
              <p
                className="mt-1 text-lg font-medium leading-relaxed transition-colors duration-500"
                style={{ color: hovered ? "#e8ece9" : "#96a29b" }}
              >
                {client.painPoint}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-4">
            <svg
              className="mt-1.5 h-4 w-4 shrink-0 transition-colors duration-500"
              style={{ color: hovered ? "#9FDBB0" : "#6EA87F" }}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3 8h7M7 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p
                className="font-mono text-[10px] font-medium uppercase tracking-widest transition-colors duration-500"
                style={{ color: hovered ? "#9FDBB0" : "#6EA87F" }}
              >
                The Sageworx Solution
              </p>
              <p
                className="mt-1 text-base font-medium leading-relaxed transition-colors duration-500"
                style={{ color: hovered ? "#e8ece9" : "#c0c8c3" }}
              >
                {client.solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ClientsSectionProps {
  eyebrow?: string;
  heading?: string;
  segments?: ClientSegment[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function ClientsSection({
  eyebrow = "Who We Serve",
  heading = "Curated Partners For Your Business",
  segments = DEFAULT_SEGMENTS,
  backgroundUrl,
  overlayColor,
}: ClientsSectionProps) {
  return (
    <section className="relative bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            size="large"
          />
        </AnimatedSection>

        <div className="mt-12 flex flex-col gap-4">
          {segments.map((segment, i) => (
            <AnimatedSection key={segment.type} delay={0.1 + i * 0.08}>
              <ClientCard client={segment} deepFieldVariant={DEEP_FIELD_VARIANTS[i % DEEP_FIELD_VARIANTS.length]} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
