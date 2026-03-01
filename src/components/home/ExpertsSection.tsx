"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

interface StripMember {
  _id: string;
  name: string;
  slug: string;
  title: string;
  mantra: string;
  photoUrl?: string;
  isFeatured: boolean;
}

interface ExpertsSectionProps {
  members: StripMember[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function ExpertsSection({ members, backgroundUrl, overlayColor }: ExpertsSectionProps) {
  return (
    <section className="relative py-20 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"} />}

      {/* Heading — inside Container */}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="The Collective"
            heading="Hand-Picked Experts"
            subheading="We assemble expert teams for the challenge at hand."
            size="display"
          />
        </AnimatedSection>
      </Container>

      {/* Horizontal scroll strip — breaks out of Container to reach right edge */}
      <AnimatedSection delay={0.15}>
        <div
          className="mt-12 flex gap-4 overflow-x-auto px-[max(1rem,calc((100vw-72rem)/2+1rem))] pb-4 md:gap-5"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {members.map((member) => (
            <Link
              key={member._id}
              href={`/members/${member.slug}`}
              className="group relative shrink-0 overflow-hidden rounded-2xl"
              style={{
                width: "clamp(200px, 22vw, 280px)",
                scrollSnapAlign: "start",
              }}
            >
              {/* Portrait */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-sgwx-surface">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    style={{
                      filter: "grayscale(1) contrast(1.12) brightness(0.88)",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLImageElement).style.filter = "grayscale(0) contrast(1.05) brightness(0.95) saturate(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLImageElement).style.filter = "grayscale(1) contrast(1.12) brightness(0.88)";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-4xl font-thin text-sgwx-text-dim">
                      {member.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}

                {/* Gradient scrim — always present, stronger on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 md:from-black/70 md:via-transparent md:opacity-0 md:group-hover:opacity-100" />

                {/* Featured indicator */}
                {member.isFeatured && (
                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-sgwx-bg/60 px-2 py-1 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sgwx-green" />
                    <span className="font-mono text-[8px] uppercase tracking-widest text-sgwx-green">Featured</span>
                  </div>
                )}

                {/* Info overlay — visible on mobile, animates in on desktop hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-0 p-4 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <p className="text-base font-light tracking-tight text-white md:text-lg">
                    {member.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-sgwx-green">
                    {member.title}
                  </p>
                  {member.mantra && (
                    <p className="mt-2 hidden text-xs italic leading-relaxed text-white/60 md:line-clamp-2 md:group-hover:block">
                      &ldquo;{member.mantra}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
