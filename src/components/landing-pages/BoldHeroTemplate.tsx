"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { LandingPageDetail, CaseStudyListItem, TestimonialItem } from "@/lib/sanity/queries";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

interface BoldHeroTemplateProps {
  page: LandingPageDetail;
  caseStudies: CaseStudyListItem[];
  testimonials: TestimonialItem[];
}

export default function BoldHeroTemplate({ page, caseStudies, testimonials }: BoldHeroTemplateProps) {
  const heading = page.heroHeading || `Built for ${page.clientName || "You"}`;
  const subheading = page.heroSubheading || "See how Sageworx delivers results in your industry.";

  return (
    <div className="bg-sgwx-bg">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-sgwx-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-sgwx-green/5 via-transparent to-sgwx-teal/5" />
        <Container>
          <motion.div className="max-w-3xl" {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {page.clientName && (
              <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Prepared for {page.clientName}
              </p>
            )}
            <h1 className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl">
              {subheading}
            </p>
            <div className="mt-10">
              <Button href={page.ctaHref || "/contact"}>
                {page.ctaLabel || "Let's Talk"}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      {page.verticals && page.verticals.length > 0 && (
        <section className="border-t border-sgwx-border py-16">
          <Container>
            <AnimatedSection>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card hover={false}>
                  <p className="font-mono text-3xl font-thin text-sgwx-green">{caseStudies.length}+</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Projects in your verticals</p>
                </Card>
                <Card hover={false}>
                  <p className="font-mono text-3xl font-thin text-sgwx-green">100+</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Senior experts in our network</p>
                </Card>
                <Card hover={false}>
                  <p className="font-mono text-3xl font-thin text-sgwx-green">24h</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Average team assembly time</p>
                </Card>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Relevant Work
              </p>
              <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
                Results in Your Industry
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {caseStudies.slice(0, 4).map((cs) => (
                  <CaseStudyCard
                    key={cs._id}
                    category={cs.category}
                    title={cs.title}
                    description={cs.shortDescription}
                    href={`/work/${cs.slug}`}
                    thumbnailUrl={cs.thumbnailUrl}
                  />
                ))}
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <blockquote className="max-w-3xl">
                <p className="text-xl font-light italic leading-relaxed text-sgwx-text md:text-2xl">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-sm text-sgwx-text">{testimonials[0].authorName}</p>
                  {testimonials[0].role && (
                    <p className="mt-0.5 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                      {testimonials[0].role}{testimonials[0].company ? ` — ${testimonials[0].company}` : ""}
                    </p>
                  )}
                </footer>
              </blockquote>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
                Ready to go further, faster?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sgwx-text-muted">
                Let&apos;s build a team around your next challenge.
              </p>
              <div className="mt-8">
                <Button href={page.ctaHref || "/contact"}>
                  {page.ctaLabel || "Let's Talk"}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
