"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface PrincipleCard {
  badge: string;
  title: string;
  paragraphs: string[];
}

const defaultCards: PrincipleCard[] = [
  {
    badge: "Speed & Clarity",
    title: "Designed to Move You Forward. Faster.",
    paragraphs: [
      "Our process and systems are designed for work without the re-work. Strategy, creative, and production aligned early. Fewer handoffs. Decisions and learnings are documented to reduce rework and repeat spend.",
    ],
  },
  {
    badge: "M-Shaped Talent",
    title: "Built Around M\u2011Shaped Senior Talent.",
    paragraphs: [
      "Our members average 15\u201320 years in their discipline, with agency and in\u2011house leadership backgrounds\u2014and the range to operate confidently beyond a single specialty.",
      "Deep expertise where it matters most, with meaningful fluency across adjacent disciplines. Our teams think beyond single roles\u2014connecting strategy, creative, technology, and production from day one.",
      "M\u2011shaped talent means you\u2019re not just hiring for one lane. You\u2019re gaining leaders who can go deep, see around corners, and collaborate across the full scope of the work.",
    ],
  },
  {
    badge: "Flex Structure",
    title: "Structured to Flex.",
    paragraphs: [
      "Leadership stays consistent, providing continuity, context, and accountability throughout the engagement. Specialists rotate in as needed based on the work\u2014not org charts\u2014allowing the team to flex without friction. Scope adapts as priorities evolve, without resetting momentum or re-onboarding a new group.",
    ],
  },
];

const COLORS = [
  { border: "border-sgwx-green/25", bg: "bg-sgwx-green/[0.08]" },
  { border: "border-sgwx-cyan/25", bg: "bg-sgwx-cyan/[0.08]" },
  { border: "border-purple-400/20", bg: "bg-purple-500/[0.08]" },
];

interface PrinciplesSectionProps {
  eyebrow?: string;
  heading?: string;
  cards?: PrincipleCard[];
}

export default function PrinciplesSection({ eyebrow, heading, cards }: PrinciplesSectionProps) {
  const allCards = cards ?? defaultCards;

  return (
    <section id="principles" className="relative bg-sgwx-bg-alt py-20 md:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "The Principles"}
            heading={heading ?? "Designed to Move You Forward. Faster."}
            size="display"
          />
        </AnimatedSection>

        <div className="mt-14 space-y-6">
          {allCards.map((card, i) => {
            const colors = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={card.badge}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border ${colors.border} ${colors.bg} p-6 md:p-8`}
              >
                <p className="mb-3 font-mono text-[14px] font-medium uppercase tracking-widest text-sgwx-green">
                  {card.badge}
                </p>
                <h3 className="text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">
                  {card.title}
                </h3>
                <div className="mt-4 space-y-4">
                  {card.paragraphs.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-sgwx-text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
