"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CaseStudyCard from "@/components/shared/CaseStudyCard";

interface CaseStudy {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  tags: string[];
  thumbnailUrl?: string;
}

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  const [active, setActive] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(caseStudies.map((cs) => cs.category)));
    return ["All", ...cats];
  }, [caseStudies]);

  const filtered =
    active === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.category === active);

  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        {/* Filter bar */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
            {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-1.5 font-mono text-[14px] tracking-widest uppercase transition-all duration-200 ${
                  active === cat
                    ? "border-sgwx-green bg-sgwx-green text-sgwx-bg"
                    : "border-sgwx-border text-sgwx-text-muted hover:border-sgwx-green/40 hover:text-sgwx-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
          {filtered.map((study, i) => (
            <AnimatedSection key={study.slug} delay={i * 0.1}>
              <CaseStudyCard
                category={study.category}
                title={study.title}
                description={study.shortDescription}
                href={`/work/${study.slug}`}
                thumbnailUrl={study.thumbnailUrl}
              />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
