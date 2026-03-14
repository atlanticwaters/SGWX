"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogCard from "@/components/shared/BlogCard";

interface Spotlight {
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
}

interface SpotlightsGridProps {
  spotlights: Spotlight[];
}

export default function SpotlightsGrid({ spotlights }: SpotlightsGridProps) {
  const allTags = ["All", ...Array.from(new Set(spotlights.map((s) => s.tag)))];
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
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={`rounded-full border px-4 py-1.5 font-mono text-[14px] tracking-widest uppercase transition-all duration-200 ${
                activeTag === tag
                  ? "border-sgwx-green bg-sgwx-green text-sgwx-bg"
                  : "border-sgwx-border text-sgwx-text-muted hover:border-sgwx-green/40 hover:text-sgwx-green"
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
                description={post.excerpt}
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
