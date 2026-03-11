"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { LandingPageDetail, BlogPostListItem, TestimonialItem } from "@/lib/sanity/queries";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

interface MinimalTemplateProps {
  page: LandingPageDetail;
  blogPosts: BlogPostListItem[];
  testimonials: TestimonialItem[];
}

export default function MinimalTemplate({ page, blogPosts, testimonials }: MinimalTemplateProps) {
  const heading = page.heroHeading || page.clientName || "Go Further. Faster.";
  const subheading = page.heroSubheading || "We bring together seasoned experts — bespoke teams who understand your work, thrive on the challenge, and deliver when it counts.";

  return (
    <div className="bg-sgwx-bg">
      {/* Hero */}
      <section className="flex min-h-[60vh] items-center py-20">
        <Container>
          <motion.div className="max-w-2xl" {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {page.clientName && (
              <p className="mb-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                For {page.clientName}
              </p>
            )}
            <h1 className="text-4xl font-thin tracking-tight text-sgwx-text md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sgwx-text-muted">
              {subheading}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Value Prop Split */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                  The Sageworx Difference
                </p>
                <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text">
                  Stop resetting. Start building.
                </h2>
                <p className="mt-4 text-sgwx-text-muted leading-relaxed">
                  Traditional agencies spin up junior teams per project. Freelancers leave you managing chaos. Sageworx brings together senior, bespoke teams who already know how to work together.
                </p>
              </div>
              <div className="space-y-4">
                {["Skip the learning curve", "Senior talent from day one", "Continuity without overhead"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-sgwx-border p-4">
                    <span className="mt-0.5 text-sgwx-green">&#10003;</span>
                    <span className="text-sm text-sgwx-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {testimonials.slice(0, 2).map((t) => (
                  <Card key={t._id} hover={false}>
                    <p className="text-sm italic leading-relaxed text-sgwx-text-muted">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-4 text-sm font-medium text-sgwx-text">{t.authorName}</p>
                    {t.role && (
                      <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                        {t.role}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Insights
              </p>
              <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text">
                Thinking in Your Space
              </h2>
              <div className="mt-8 space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <a
                    key={post._id}
                    href={`/spotlights/${post.slug}`}
                    className="block rounded-lg border border-sgwx-border p-6 transition-colors hover:border-sgwx-green/30 hover:bg-sgwx-surface"
                  >
                    <span className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                      {post.tag}
                    </span>
                    <h3 className="mt-1 text-lg font-normal text-sgwx-text">{post.title}</h3>
                    <p className="mt-2 text-sm text-sgwx-text-muted">{post.excerpt}</p>
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-3xl font-thin tracking-tight text-sgwx-text">
              Let&apos;s talk about what&apos;s next.
            </h2>
            <div className="mt-8">
              <Button href={page.ctaHref || "/contact"}>
                {page.ctaLabel || "Let's Talk"}
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
