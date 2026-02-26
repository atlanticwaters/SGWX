import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/sanity/queries";
import type { SanityBlock } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface SpotlightDetailPageProps {
  params: Promise<{ slug: string }>;
}

function blocksToText(blocks: SanityBlock[]): string[] {
  return blocks.map((block) =>
    block.children.map((c) => c.text).join("")
  );
}

export default async function SpotlightDetailPage({
  params,
}: SpotlightDetailPageProps) {
  const { slug } = await params;
  const spotlight = await getBlogPostBySlug(slug);

  if (!spotlight) {
    notFound();
  }

  const paragraphs = spotlight.body ? blocksToText(spotlight.body) : [];

  return (
    <article className="bg-sgwx-bg py-16 md:py-24">
      <Container className="max-w-3xl">
        {/* Back link */}
        <AnimatedSection>
          <Link
            href="/spotlights"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Spotlights
          </Link>
        </AnimatedSection>

        {/* Tag badge */}
        <AnimatedSection delay={0.05}>
          <Badge variant="neutral" className="mt-6">
            {spotlight.tag}
          </Badge>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={0.1}>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-sgwx-text md:text-5xl">
            {spotlight.title}
          </h1>
        </AnimatedSection>

        {/* Thumbnail placeholder */}
        <AnimatedSection delay={0.15}>
          <div className="mt-10 aspect-video rounded-2xl bg-sgwx-bg-alt" />
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection delay={0.2}>
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

        {/* Back CTA */}
        <AnimatedSection delay={0.25}>
          <div className="mt-16 border-t border-sgwx-border pt-10">
            <Link
              href="/spotlights"
              className="inline-flex items-center gap-2 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
            >
              <span aria-hidden="true">&larr;</span>
              Back to all Spotlights
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </article>
  );
}
