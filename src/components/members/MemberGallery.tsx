"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface GalleryMember {
  name: string;
  title: string;
  initials: string;
}

const galleryMembers: GalleryMember[] = [
  { name: "Marc Roberts", title: "Co-Founder | Creative Director", initials: "MR" },
  { name: "Pat Murphy", title: "Co-Founder | Executive Producer", initials: "PM" },
  { name: "Sara Ann MacFarlane", title: "Behavioral Scientist", initials: "SM" },
  { name: "Ann Marie Almariei", title: "Creative Director", initials: "AA" },
  { name: "James Petrossi", title: "Brand Strategist", initials: "JP" },
  { name: "Andrew Waters", title: "Art Director | AI Engineer", initials: "AW" },
  { name: "Elena Vargas", title: "UX Strategist", initials: "EV" },
  { name: "David Chen", title: "Technology Lead", initials: "DC" },
  { name: "Priya Sharma", title: "Content Strategist", initials: "PS" },
  { name: "Thomas Wright", title: "Production Director", initials: "TW" },
  { name: "Maya Johnson", title: "Social Media Strategist", initials: "MJ" },
  { name: "Carlos Rivera", title: "Motion Designer", initials: "CR" },
];

function AvatarCard({ member, index }: { member: GalleryMember; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection delay={0.1 + index * 0.08}>
      <div
        className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-sgwx-surface transition-all duration-300 hover:border-sgwx-green/30 hover:shadow-[0_0_30px_rgba(23,168,107,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sgwx-green"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        role="figure"
        aria-label={`${member.name}, ${member.title}`}
      >
        {/* Initials */}
        <div className="flex h-full items-center justify-center">
          <span className="text-3xl font-bold text-sgwx-text-dim transition-opacity duration-300 group-hover:opacity-30 md:text-4xl">
            {member.initials}
          </span>
        </div>

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

export default function MemberGallery() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="The Collective"
            heading="The Minds Behind Our Mission."
            centered
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {galleryMembers.map((member, i) => (
            <AvatarCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
