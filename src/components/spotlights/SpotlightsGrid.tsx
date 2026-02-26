"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogCard from "@/components/shared/BlogCard";

const spotlights = [
  {
    tag: "Featured Work",
    title: "ZENPEP\u00AE Racing Game",
    description:
      "How we turned clinical education into an engaging competitive game.",
    slug: "zenpep-racing-game",
  },
  {
    tag: "Insights",
    title: "The End of the AOR Model",
    description:
      "Why brands are moving away from agency of record relationships.",
    slug: "end-of-aor-model",
  },
  {
    tag: "Process",
    title: "Building Teams That Scale",
    description:
      "Our approach to assembling the right talent for every challenge.",
    slug: "building-teams-that-scale",
  },
];

const filterTags = ["All", "Featured Work", "Insights", "Process"];

export { spotlights };

export default function SpotlightsGrid() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? spotlights
      : spotlights.filter((post) => post.tag === activeTag);

  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        {/* Tag filter */}
        <div className="mb-10 flex flex-wrap gap-3">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`rounded-full border px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all ${
                activeTag === tag
                  ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-green"
                  : "border-sgwx-border bg-sgwx-surface text-sgwx-text-muted hover:border-sgwx-green/30 hover:text-sgwx-text"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <BlogCard
                tag={post.tag}
                title={post.title}
                description={post.description}
                href={`/spotlights/${post.slug}`}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sgwx-text-muted">
            No posts match that filter.
          </p>
        )}
      </Container>
    </section>
  );
}
