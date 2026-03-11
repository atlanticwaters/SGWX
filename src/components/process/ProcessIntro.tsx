"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProcessIntro() {
  return (
    <section className="relative bg-sgwx-bg py-20 md:py-28">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />
      <Container>
        <AnimatedSection>
          <div className="max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed text-sgwx-text-muted md:text-xl">
              This isn&rsquo;t a rigid methodology or consulting theater. It&rsquo;s a practical
              system built for speed and creativity, born from decades of experience inside top
              agencies, brands, and fast-moving startups&mdash;designed to reduce friction,
              accelerate decisions, and protect momentum.
            </p>
            <motion.p
              className="text-base leading-relaxed text-sgwx-text md:text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Every project has a senior lead who is accountable for outcomes&mdash;not just for
              coordinating meetings.
            </motion.p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
