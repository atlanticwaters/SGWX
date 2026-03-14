"use client";

import { useMemo, useRef, useCallback, useState, useEffect } from "react";
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
          <p className="text-lg font-light tracking-tight text-white md:text-xl">
            {member.name}
          </p>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-sgwx-green">
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
  heading = "Hand-Picked Experts.",
  subheading = "We assemble expert teams for the challenge at hand.",
  members,
  backgroundUrl,
  overlayColor,
}: ExpertsSectionProps) {
  const shuffled = useMemo(() => interleaveMembers(members), [members]);

  // Triple the list so we can seamlessly wrap
  const loopItems = useMemo(() => [...shuffled, ...shuffled, ...shuffled], [shuffled]);

  // ── Scroll refs & state ─────────────────────────────────────
  const stripRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, hasMoved: false });
  const pausedRef = useRef(false);

  // ── rAF continuous scroll with wraparound ───────────────────
  useEffect(() => {
    const el = stripRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // Width of one set of members (1/3 of total since we tripled)
    const getSetWidth = () => inner.scrollWidth / 3;

    // Start in the middle set so we can scroll in either direction
    const initialOffset = getSetWidth();
    el.scrollLeft = initialOffset;

    let rafId: number;
    let lastTime: number | null = null;
    const speed = 0.2; // px per ms (≈12px/s)

    const tick = (time: number) => {
      if (lastTime !== null && !pausedRef.current) {
        const dt = time - lastTime;
        el.scrollLeft += speed * dt;

        // Wraparound: when we've scrolled past the 2nd set, jump back by one set width
        const setW = getSetWidth();
        if (el.scrollLeft >= setW * 2) {
          el.scrollLeft -= setW;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += setW;
        }
      }
      lastTime = time;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [shuffled]);

  // ── Pause on hover ──────────────────────────────────────────
  const onMouseEnter = useCallback(() => { pausedRef.current = true; }, []);
  const onMouseLeave = useCallback(() => { if (!isDragging) pausedRef.current = false; }, [isDragging]);

  // ── Drag-to-scroll ─────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = stripRef.current;
    if (!el) return;
    setIsDragging(true);
    pausedRef.current = true;
    el.setPointerCapture(e.pointerId);
    dragState.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      hasMoved: false,
    };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !stripRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.hasMoved = true;
    stripRef.current.scrollLeft = dragState.current.scrollLeft - dx;
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    pausedRef.current = false;
  }, []);

  // Block link navigation when the user was dragging
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragState.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

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
        <div
          ref={stripRef}
          className={`mt-12 overflow-x-auto ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          <div
            ref={innerRef}
            className="flex gap-4 md:gap-5"
            style={{ width: "max-content" }}
          >
            {loopItems.map((member, i) => (
              <MemberCard key={`${member._id}-${i}`} member={member} />
            ))}
          </div>
        </div>

        <style>{`
          [style*="scrollbar-width"]::-webkit-scrollbar { display: none; }
        `}</style>
      </AnimatedSection>
    </section>
  );
}
