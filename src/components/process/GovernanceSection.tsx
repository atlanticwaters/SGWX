"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";

const defaultBullets = [
  "Sageworx contracts, insures, and stands behind the work; our members are vetted, contracted, and governed under a single engagement.",
  "AI is used to accelerate early drafts and analysis; judgment, direction, and final decisions remain human-led.",
  "We do not train models on proprietary client data, and we follow client-specific security and compliance requirements. AI tools are applied in a controlled, task-specific manner, aligned to each client\u2019s legal, security, and regulatory standards, with clear boundaries around data handling, access, and usage throughout the engagement.",
  "You pay for active senior expertise\u2014not bench time, training, or layers.",
];

const CARD_COLORS = [
  {
    border: "border-sgwx-green/25",
    bg: "bg-sgwx-green/[0.12]",
    badge: "text-sgwx-green-bright",
    icon: "text-sgwx-green-bright",
  },
  {
    border: "border-sgwx-cyan/25",
    bg: "bg-sgwx-cyan/[0.12]",
    badge: "text-sgwx-cyan",
    icon: "text-sgwx-cyan",
  },
  {
    border: "border-purple-400/20",
    bg: "bg-purple-500/[0.12]",
    badge: "text-purple-300",
    icon: "text-purple-300",
  },
  {
    border: "border-sgwx-green/25",
    bg: "bg-sgwx-green/[0.12]",
    badge: "text-sgwx-green-bright",
    icon: "text-sgwx-green-bright",
  },
];

const BADGES = [
  "Accountability",
  "Human-Led AI",
  "Data & Compliance",
  "Value-Based Pricing",
];

interface GovernanceSectionProps {
  eyebrow?: string;
  heading?: string;
  bullets?: string[];
}

export default function GovernanceSection({ eyebrow, heading, bullets }: GovernanceSectionProps) {
  const items = bullets ?? defaultBullets;

  return (
    <section id="governance" className="relative bg-sgwx-bg-alt py-20 md:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Governance & Risk"}
            heading={heading ?? "Built for Real-World Constraints"}
            align="right"
          />
        </AnimatedSection>

        <div className="mt-12 space-y-6">
          {items.map((item, i) => {
            const colors = CARD_COLORS[i % CARD_COLORS.length];
            const badge = BADGES[i % BADGES.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 backdrop-blur-sm md:p-8`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
                  {/* Left — badge + icon */}
                  <div className="flex shrink-0 items-start gap-3 md:w-[240px]">
                    <svg
                      className={`mt-0.5 h-5 w-5 shrink-0 ${colors.icon}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 2L3 6v6c0 4.5 3 7 7 10 4-3 7-5.5 7-10V6l-7-4z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 10l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className={`font-mono text-[14px] font-medium uppercase tracking-widest ${colors.badge}`}>
                      {badge}
                    </p>
                  </div>

                  {/* Right — body */}
                  <p className="flex-1 text-sm leading-relaxed text-sgwx-text-muted">
                    {item}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection delay={0.1 + items.length * 0.08}>
          <div className="mt-6 text-right">
            <Link
              href="/ai-policy"
              className="inline-flex items-center gap-2 font-mono text-[14px] tracking-widest uppercase text-sgwx-green transition-colors hover:text-sgwx-green-bright"
            >
              AI Policy for More
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
