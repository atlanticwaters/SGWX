import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getCaseStudyBySlug, getCaseStudySlugs } from "@/lib/sanity/queries";
import type { SanityBlock } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

function blocksToText(blocks: SanityBlock[]): string[] {
  return blocks.map((block) =>
    block.children.map((c) => c.text).join("")
  );
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const paragraphs = study.longDescription
    ? blocksToText(study.longDescription)
    : [];

  return (
    <article className="bg-sgwx-bg py-16 md:py-24">
      <Container className="max-w-3xl">
        {/* Back link */}
        <AnimatedSection>
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Work
          </Link>
        </AnimatedSection>

        {/* Category badge */}
        <AnimatedSection delay={0.05}>
          <Badge className="mt-6">{study.category}</Badge>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={0.1}>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-sgwx-text md:text-5xl">
            {study.title}
          </h1>
        </AnimatedSection>

        {/* Tags */}
        <AnimatedSection delay={0.15}>
          <div className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </AnimatedSection>

        {/* Thumbnail placeholder */}
        <AnimatedSection delay={0.2}>
          <div className="mt-10 aspect-video rounded-2xl bg-sgwx-bg-alt" />
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection delay={0.25}>
          <div className="mt-10 space-y-6">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-sgwx-text-muted md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>

        {/* Testimonial */}
        {study.testimonial && (
          <AnimatedSection delay={0.3}>
            <blockquote className="mt-12 border-l-2 border-sgwx-green/40 pl-6">
              <p className="text-base italic leading-relaxed text-sgwx-text-muted">
                &ldquo;{study.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-sgwx-text-dim">
                &mdash; {study.testimonial.author}, {study.testimonial.role}
              </footer>
            </blockquote>
          </AnimatedSection>
        )}

        {/* CTA */}
        <AnimatedSection delay={0.35}>
          <div className="mt-16 border-t border-sgwx-border pt-10 text-center">
            <p className="mb-6 text-lg text-sgwx-text-muted">
              Ready to see more of our work?
            </p>
            <Button href="/work" variant="secondary">
              View All Case Studies
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </article>
  );
}
