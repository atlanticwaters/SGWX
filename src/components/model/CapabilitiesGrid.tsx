"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

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

interface CapabilitiesGridProps {
  eyebrow?: string;
  tabs?: { id: string; label: string; items: string[] }[];
}

export default function CapabilitiesGrid({ eyebrow, tabs }: CapabilitiesGridProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const capTabs = tabs ?? defaultTabs;

  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <p className="mb-6 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
            {eyebrow ?? "Capabilities"}
          </p>

          {/* Tab navigation */}
          <nav
            role="tablist"
            aria-label="Capabilities categories"
            className="flex flex-wrap gap-2"
          >
            {capTabs.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === i}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === i ? 0 : -1}
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
                  activeTab === i
                    ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-green shadow-[0_0_20px_rgba(110,168,127,0.18)]"
                    : "border-sgwx-border bg-sgwx-surface text-sgwx-text-muted hover:border-sgwx-green/30 hover:text-sgwx-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </AnimatedSection>

        {/* Tab panels */}
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
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {capTabs[activeTab].items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.04 + i * 0.06,
                    }}
                    className="flex items-start gap-3 rounded-xl border border-sgwx-border bg-sgwx-surface p-4 transition-all duration-300 hover:border-sgwx-green/30 hover:bg-sgwx-surface-hover hover:shadow-[0_0_30px_rgba(110,168,127,0.08)]"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sgwx-green/10 text-sgwx-green"
                      aria-hidden="true"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="5" cy="5" r="3" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="text-sm leading-snug text-sgwx-text">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
