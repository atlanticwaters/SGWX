import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CaseStudyHero from "@/components/work/CaseStudyHero";
import ParallaxGallery from "@/components/work/ParallaxGallery";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
  getAdjacentCaseStudies,
} from "@/lib/sanity/queries";
import type { SanityBlock } from "@/lib/sanity/queries";

export const revalidate = 60;

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
  const [study, adjacent] = await Promise.all([
    getCaseStudyBySlug(slug),
    getAdjacentCaseStudies(slug),
  ]);

  if (!study) {
    notFound();
  }

  const paragraphs = study.longDescription
    ? blocksToText(study.longDescription)
    : [];

  return (
    <article className="bg-sgwx-bg">
      {/* ── Hero image with parallax ── */}
      <CaseStudyHero imageUrl={study.heroImageUrl} title={study.title} />

      {/* ── Title + metadata ── */}
      <section className="mx-auto max-w-[1520px] px-6 md:px-9">
        <AnimatedSection>
          <div className="py-12 md:py-16">
            {/* Title */}
            <h1 className="text-4xl font-normal tracking-tight text-sgwx-text md:text-5xl lg:text-6xl">
              {study.title}
            </h1>

            {/* Description */}
            {paragraphs.length > 0 && (
              <div className="mt-6 max-w-3xl space-y-4">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-sgwx-text-muted md:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Metadata row */}
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-sgwx-border-subtle pt-8">
              {study.client && (
                <div>
                  <dt className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">Client</dt>
                  <dd className="mt-1 text-sm text-sgwx-text">{study.client}</dd>
                </div>
              )}
              {study.year && (
                <div>
                  <dt className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">Year</dt>
                  <dd className="mt-1 text-sm text-sgwx-text">{study.year}</dd>
                </div>
              )}
              <div>
                <dt className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">Category</dt>
                <dd className="mt-1 text-sm text-sgwx-text">{study.category}</dd>
              </div>
              {study.tags && study.tags.length > 0 && (
                <div>
                  <dt className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">Services</dt>
                  <dd className="mt-1 text-sm text-sgwx-text-muted">
                    {study.tags.join(", ")}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Parallax image gallery ── */}
      {study.galleryImages && study.galleryImages.length > 0 && (
        <section className="mx-auto max-w-[1520px] px-6 pb-1 md:px-9">
          <ParallaxGallery images={study.galleryImages} title={study.title} />
        </section>
      )}

      {/* ── Testimonial ── */}
      {study.testimonial && (
        <section className="mx-auto max-w-[1520px] px-6 md:px-9">
          <AnimatedSection delay={0.15}>
            <div className="border-t border-sgwx-border-subtle py-16 md:py-20">
              <div className="max-w-3xl">
                <blockquote>
                  <p className="text-xl font-light italic leading-relaxed text-sgwx-text md:text-2xl">
                    &ldquo;{study.testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-6">
                    <p className="text-sm text-sgwx-text">
                      {study.testimonial.author}
                    </p>
                    <p className="mt-0.5 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                      {study.testimonial.role}
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </AnimatedSection>
        </section>
      )}

      {/* ── Next / Previous project ── */}
      {(adjacent.prev || adjacent.next) && (
        <nav aria-label="Project navigation">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {adjacent.prev ? (
              <Link
                href={`/work/${adjacent.prev.slug}`}
                className="group relative overflow-hidden border-t border-sgwx-border-subtle md:border-r"
              >
                <div className="relative aspect-[16/9]">
                  {adjacent.prev.thumbnailUrl ? (
                    <Image
                      src={adjacent.prev.thumbnailUrl}
                      fill
                      alt={adjacent.prev.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.4) saturate(0.6)" }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-sgwx-surface" />
                  )}
                  <div className="absolute inset-0 bg-sgwx-bg/30" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                    Previous Project
                  </p>
                  <p className="mt-2 text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">
                    {adjacent.prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
            {adjacent.next ? (
              <Link
                href={`/work/${adjacent.next.slug}`}
                className="group relative overflow-hidden border-t border-sgwx-border-subtle"
              >
                <div className="relative aspect-[16/9]">
                  {adjacent.next.thumbnailUrl ? (
                    <Image
                      src={adjacent.next.thumbnailUrl}
                      fill
                      alt={adjacent.next.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ filter: "brightness(0.4) saturate(0.6)" }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-sgwx-surface" />
                  )}
                  <div className="absolute inset-0 bg-sgwx-bg/30" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-right md:p-10">
                  <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                    Next Project
                  </p>
                  <p className="mt-2 text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">
                    {adjacent.next.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
