"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Step {
  num: string;
  title: string;
  whatsHappening: string;
  whyItMatters: string;
  whatYouGet: string;
}

const defaultSteps: Step[] = [
  {
    num: "01",
    title: "Immersion & Brief",
    whatsHappening: "The problem is pressure-tested, constraints are surfaced early, and success markers are agreed upon.",
    whyItMatters: "Most wasted spend traces back to a weak brief.",
    whatYouGet: "A living Project Brief that aligns teams, leadership, and execution from day one. The north star for the engagement\u2014defining targets, constraints, and success markers at launch. Revisited at every stage to course-correct, validate progress against real-world signals, and adapt intelligently as conditions change without losing sight of the objective.",
  },
  {
    num: "02",
    title: "Curating The Team",
    whatsHappening: "A purpose-built team is assembled based on category fluency and role fit\u2014not availability.",
    whyItMatters: "Teams win projects, not logos.",
    whatYouGet: "A category-fluent team ready to work immediately. An M-shaped team that can orient quickly, challenge assumptions, and move into execution without a learning curve\u2014aligned to the brief, fluent in your space, and ready to contribute from day one.",
  },
  {
    num: "03",
    title: "Shaping The Direction",
    whatsHappening: "Insights are converted into clear strategic and creative lanes before production begins.",
    whyItMatters: "Speed without direction is just motion.",
    whatYouGet: "A strategic roadmap that guides execution. A clear set of strategic and creative lanes tied directly to the Project Brief\u2014outlining priorities, tradeoffs, and sequencing so teams can move forward with confidence, make faster decisions, and stay aligned as the work accelerates.",
  },
  {
    num: "04",
    title: "Creation & Refinement",
    whatsHappening: "Work unfolds in focused sprints where strategy, creative, and production operate as one.",
    whyItMatters: "Momentum compounds when teams move together.",
    whatYouGet: "Accelerated progress without surprise pivots. A disciplined sprint rhythm anchored to the Project Brief, where work is reviewed against targets in real time, assumptions are tested early, and adjustments are made deliberately\u2014keeping momentum high while avoiding late-stage corrections or wasted effort.",
  },
  {
    num: "05",
    title: "Capturing Key Learnings",
    whatsHappening: "Decisions, insights, and learnings are captured as the work unfolds.",
    whyItMatters: "Most teams relearn the same lessons repeatedly.",
    whatYouGet: "A shared intelligence library that strengthens future work. A durable record of decisions, insights, and performance signals tied back to the Project Brief\u2014so future initiatives start smarter, move faster, and build on what actually happened, not what was assumed.",
  },
  {
    num: "06",
    title: "Evolution & Scale",
    whatsHappening: "Leadership remains consistent while specialists rotate in as needed.",
    whyItMatters: "Growth shouldn\u2019t require reinvention every quarter.",
    whatYouGet: "Sustained momentum without long-term overhead. A durable operating rhythm where leadership continuity preserves context, M-shaped specialists plug in as needed, and the Project Brief evolves into a living reference\u2014allowing you to scale effort up or down while staying aligned to real goals, real performance, and what comes next.",
  },
];

const expandVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 },
};

interface SixStepsSectionProps {
  eyebrow?: string;
  heading?: string;
  steps?: Step[];
}

export default function SixStepsSection({ eyebrow, heading, steps }: SixStepsSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const allSteps = steps ?? defaultSteps;

  const toggleStep = (index: number) => {
    setActiveStep((prev) => (prev === index ? -1 : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowDown") {
      next = (index + 1) % allSteps.length;
    } else if (e.key === "ArrowUp") {
      next = (index - 1 + allSteps.length) % allSteps.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = allSteps.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    buttonRefs.current[next]?.focus();
  };

  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "The Process"}
            heading={heading ?? "Six Steps. No Wasted Motion."}
            align="right"
          />
        </AnimatedSection>

        <div className="mx-auto mt-12 max-w-4xl">
          {allSteps.map((step, i) => {
            const isActive = activeStep === i;
            const panelId = `step-panel-${step.num}`;
            const triggerId = `step-trigger-${step.num}`;

            return (
              <AnimatedSection key={step.num} delay={0.1 + i * 0.08}>
                <div
                  className={`border-b border-sgwx-border transition-colors ${
                    isActive ? "border-sgwx-green/30" : ""
                  }`}
                >
                  <button
                    ref={(el) => { buttonRefs.current[i] = el; }}
                    id={triggerId}
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => toggleStep(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-sgwx-surface/30 md:gap-6 md:py-6"
                  >
                    <span className="font-mono text-sm tracking-widest text-sgwx-green md:text-base">
                      {step.num}
                    </span>
                    <span
                      className={`flex-1 text-xl font-normal tracking-tight md:text-2xl lg:text-3xl ${
                        isActive ? "text-sgwx-text" : "text-sgwx-text-muted"
                      } transition-colors`}
                    >
                      {step.title}
                    </span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-sgwx-green transition-transform duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 8l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={expandVariants}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 pb-6 pl-8 md:grid-cols-3 md:pl-14">
                          <div>
                            <p className="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                              What&apos;s Happening
                            </p>
                            <p className="text-sm leading-relaxed text-sgwx-text-muted">
                              {step.whatsHappening}
                            </p>
                          </div>
                          <div>
                            <p className="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                              Why It Matters
                            </p>
                            <p className="text-sm leading-relaxed text-sgwx-text-muted">
                              {step.whyItMatters}
                            </p>
                          </div>
                          <div>
                            <p className="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                              What You Get
                            </p>
                            <p className="text-sm leading-relaxed text-sgwx-text-muted">
                              {step.whatYouGet}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
