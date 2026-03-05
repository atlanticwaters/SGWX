"use client";

import { useMemo } from "react";
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
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  members: StripMember[];
  backgroundUrl?: string;
  overlayColor?: string;
}

/** Interleave featured and non-featured so they alternate */
function interleaveMembers(members: StripMember[]): StripMember[] {
  const featured = members.filter((m) => m.isFeatured);
  const regular = members.filter((m) => !m.isFeatured);
  const result: StripMember[] = [];
  let fi = 0, ri = 0;
  // Pattern: featured, regular, regular, featured, regular, regular...
  while (fi < featured.length || ri < regular.length) {
    if (fi < featured.length) result.push(featured[fi++]);
    if (ri < regular.length) result.push(regular[ri++]);
    if (ri < regular.length) result.push(regular[ri++]);
  }
  return result;
}

function MemberCard({ member }: { member: StripMember }) {
  return (
    <Link
      href={`/members/${member.slug}`}
      className="group relative shrink-0 overflow-hidden rounded-2xl"
      style={{ width: "clamp(200px, 22vw, 280px)" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sgwx-surface">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            className="object-cover transition-all duration-700 [filter:grayscale(1)_contrast(1.12)_brightness(0.88)] group-hover:scale-105 group-hover:[filter:grayscale(0)_contrast(1.05)_brightness(0.95)_saturate(1.1)]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-thin text-sgwx-text-dim">
              {member.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
          </div>
        )}

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 md:from-black/70 md:via-transparent md:opacity-0 md:group-hover:opacity-100" />

        {/* Featured indicator */}
        {member.isFeatured && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-sgwx-bg/60 px-2 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sgwx-green" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-sgwx-green">Featured</span>
          </div>
        )}

        {/* Info overlay */}
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
  );
}

export default function ExpertsSection({
  eyebrow = "The Collective",
  heading = "Hand-Picked Experts",
  subheading = "We assemble expert teams for the challenge at hand.",
  members,
  backgroundUrl,
  overlayColor,
}: ExpertsSectionProps) {
  const shuffled = useMemo(() => interleaveMembers(members), [members]);

  // Duplicate the list for seamless looping
  const loopItems = useMemo(() => [...shuffled, ...shuffled], [shuffled]);

  return (
    <section className="relative py-20 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as "sage" | "steel" | "teal" | "amber" | "carbon"} />}

      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subheading={subheading}
            size="display"
          />
        </AnimatedSection>
      </Container>

      <AnimatedSection delay={0.15}>
        <div className="group/strip mt-12 overflow-hidden">
          <div
            className="flex gap-4 md:gap-5"
            style={{
              animation: `experts-scroll ${shuffled.length * 4}s linear infinite`,
              width: "max-content",
            }}
          >
            {loopItems.map((member, i) => (
              <MemberCard key={`${member._id}-${i}`} member={member} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes experts-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .group\\/strip:hover > div {
            animation-play-state: paused;
          }
        `}</style>
      </AnimatedSection>
    </section>
  );
}
