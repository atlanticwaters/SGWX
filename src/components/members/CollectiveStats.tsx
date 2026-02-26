"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Card from "@/components/ui/Card";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Fortune 500 Brands Served" },
  { value: 200, suffix: "+", label: "Major Awards Won" },
  { value: 90, suffix: "%", label: "With 15+ Years Experience" },
  { value: 12, suffix: "", label: "Languages Spoken" },
  { value: 300, suffix: "+", label: "Product Launches Supported" },
  { value: 25, suffix: "+", label: "Industries Represented" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const duration = 1600;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [value, hasAnimated]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function CollectiveStats() {
  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="By the Numbers"
            heading="A Network of Multi-disciplined Powerhouses."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            <p>
              Today, the Sageworx collective is a diverse group of independent
              consultants, boutique agency owners, and subject matter experts. We
              are former Chief Creative Officers, VPs of Marketing, and heads of
              production from the biggest names in the business. We are
              strategists, creatives, producers, and makers who have chosen
              independence but thrive on collaboration.
            </p>
            <p>
              We operate as a true collective&mdash;sharing business, challenging
              one another, and improving our craft together. This is our unfair
              advantage: a stable of award-winning, M-shaped specialists who are
              constantly sharing intelligence and learnings from across multiple
              industries and all over the world.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={0.18 + i * 0.08}>
              <Card hover={false} className="text-center">
                <p className="text-3xl font-bold text-sgwx-green-bright md:text-4xl lg:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-muted">
                  {stat.label}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
