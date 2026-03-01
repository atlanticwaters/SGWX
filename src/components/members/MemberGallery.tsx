"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface GalleryMember {
  name: string;
  title: string;
  photoUrl?: string;
}

interface MemberGalleryProps {
  members: GalleryMember[];
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

function AvatarCard({ member, index }: { member: GalleryMember; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection delay={0.1 + index * 0.08}>
      <div
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-sgwx-surface transition-all duration-300 hover:border-sgwx-green/30 hover:shadow-[0_0_30px_rgba(110,168,127,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sgwx-green"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        role="figure"
        aria-label={`${member.name}, ${member.title}`}
      >
        {/* Photo or Initials */}
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ filter: "brightness(0.85) contrast(1.05) saturate(0.8)" }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-3xl font-bold text-sgwx-text-dim transition-opacity duration-300 group-hover:opacity-30 md:text-4xl">
              {getInitials(member.name)}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-sgwx-bg/85 px-3 text-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm font-semibold text-sgwx-text">{member.name}</p>
          <p className="mt-1 font-mono text-[9px] tracking-widest uppercase text-sgwx-green">
            {member.title}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function MemberGallery({ members }: MemberGalleryProps) {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="The Collective"
            heading="The Minds Behind Our Mission."
            align="right"
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {members.map((member, i) => (
            <AvatarCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
