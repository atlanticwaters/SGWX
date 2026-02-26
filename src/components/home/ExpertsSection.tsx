"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";

function DotGrid() {
  // Create a decorative grid of pulsing green dots
  const dots = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
    opacity: 0.2 + Math.random() * 0.6,
  }));

  return (
    <div className="grid grid-cols-6 gap-3" aria-hidden="true">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="h-2.5 w-2.5 rounded-full bg-sgwx-green"
          animate={{
            opacity: [dot.opacity * 0.3, dot.opacity, dot.opacity * 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ExpertsSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Text content */}
          <AnimatedSection>
            <SectionHeading
              heading="Hand-Picked Experts"
              subheading="Put our robust network to work."
              size="display"
            />
            <p className="mt-6 text-base leading-relaxed text-sgwx-text-muted">
              We assemble expert teams for the challenge at hand. Specialists in
              their craft who understand your category, your audience and your
              competitive signals.
            </p>

            <Card className="mt-8">
              <h3 className="text-lg font-semibold text-sgwx-text">
                The Right Roles. The Right Teams.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                We lead with the right mix of expertise, shaped around the work.
              </p>
            </Card>
          </AnimatedSection>

          {/* Right: Dot grid visualization */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-center rounded-2xl border border-sgwx-border bg-sgwx-surface/50 p-6 md:p-12">
              <DotGrid />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
