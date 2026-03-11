import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Container from "@/components/ui/Container";
import { getMemberBySlug, getMemberSlugs } from "@/lib/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getMemberSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface MemberPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) return {};
  return {
    title: `${member.name} — Sageworx`,
    description: member.bio || `${member.name}, ${member.title} at Sageworx`,
  };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-sgwx-bg py-24 md:py-32">
      <Container>
        {/* Back link */}
        <AnimatedSection>
          <Link
            href="/members"
            className="group inline-flex items-center gap-2 text-sm text-sgwx-text-muted transition-colors hover:text-sgwx-green"
          >
            <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
            Back to Members
          </Link>
        </AnimatedSection>

        {/* Hero layout */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[400px_1fr] lg:gap-16">
          {/* Photo column */}
          <AnimatedSection delay={0.05}>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-sgwx-surface">
              {member.photoUrl ? (
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  priority
                  className="object-cover"
                  style={{ filter: "brightness(0.9) contrast(1.05) saturate(0.85)" }}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-8xl font-bold text-sgwx-text-dim">
                    {getInitials(member.name)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/60 via-transparent to-transparent" />
            </div>
          </AnimatedSection>

          {/* Info column */}
          <div>
            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl font-normal tracking-tight text-sgwx-text md:text-5xl">
                {member.name}
              </h1>
              <p className="mt-2 font-mono text-sm tracking-widest uppercase text-sgwx-green">
                {member.title}
              </p>
            </AnimatedSection>

            {/* Mantra */}
            {member.mantra && (
              <AnimatedSection delay={0.15}>
                <blockquote className="mt-8 border-l-2 border-sgwx-green/30 pl-6">
                  <p className="text-lg italic leading-relaxed text-sgwx-text-muted">
                    &ldquo;{member.mantra}&rdquo;
                  </p>
                </blockquote>
              </AnimatedSection>
            )}

            {/* Character Metaphor */}
            {member.characterMetaphor && (
              <AnimatedSection delay={0.2}>
                <div className="mt-8">
                  <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                    Character Metaphor
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-sgwx-text">
                    {member.characterMetaphor}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Bio */}
            {member.bio && (
              <AnimatedSection delay={0.25}>
                <div className="mt-8">
                  <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                    About
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-sgwx-text-muted">
                    {member.bio}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Details grid */}
            <AnimatedSection delay={0.3}>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {member.favoriteTools && (
                  <div>
                    <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                      Favorite Tools
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                      {member.favoriteTools}
                    </p>
                  </div>
                )}

                {member.link?.url && (
                  <div>
                    <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                      Connect
                    </p>
                    <Link
                      href={member.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-sgwx-text transition-colors hover:text-sgwx-green"
                    >
                      {member.link.label || "View Profile"}
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </article>
  );
}
