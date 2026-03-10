"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface GalleryMember {
  name: string;
  slug?: string;
  title: string;
  photoUrl?: string;
  isFeatured?: boolean;
}

interface MemberGalleryProps {
  members: GalleryMember[];
  heading?: string;
  subheading?: string;
}

/* ─── Constants ─── */

const COLS = 5;
const ROWS = 3;
// Message block spans 2 cols, so total grid items = COLS * ROWS - 1
const TOTAL_CELLS = COLS * ROWS - 1;
// The message block starts at row 1, col 3 (right-aligned, spans cols 3-4)
const MESSAGE_CELL = Math.floor(ROWS / 2) * COLS + (COLS - 2); // row 1, col 3
const SWAP_INTERVAL = 1800; // ms between swaps
const FADE_DURATION = 800; // ms for exit animation
const FADE_IN_DELAY = 300; // ms delay before new image fades in
const FADE_IN_DURATION = 600; // ms for enter animation

/* ─── Cell component — crossfading member photos ─── */

function PhotoCell({
  members,
  memberIndex,
  swapTick,
  frozen,
  onHover,
  onLeave,
  onSwap,
}: {
  members: GalleryMember[];
  memberIndex: number;
  swapTick: number;
  frozen: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSwap: (oldIdx: number) => number;
}) {
  const [current, setCurrent] = useState(memberIndex);
  const [prev, setPrev] = useState<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const frozenRef = useRef(frozen);
  frozenRef.current = frozen;
  const currentRef = useRef(current);
  currentRef.current = current;

  useEffect(() => {
    if (frozenRef.current || swapTick === 0) return;
    const next = onSwap(currentRef.current);
    if (next === currentRef.current) return;

    // Phase 1: exit — old image scales up to 120% and fades out
    setPrev(currentRef.current);
    setPhase("exiting");

    // Phase 2: after delay, swap in new image
    const enterTimer = setTimeout(() => {
      setCurrent(next);
      currentRef.current = next;
      setPhase("entering");
    }, FADE_IN_DELAY);

    // Phase 3: clean up
    const doneTimer = setTimeout(() => {
      setPhase("idle");
      setPrev(null);
    }, FADE_IN_DELAY + FADE_IN_DURATION);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapTick]);

  const member = members[current];
  const prevMember = prev !== null ? members[prev] : null;

  if (!member) return null;

  const baseFilter = frozen
    ? "brightness(0.9) contrast(1.05) saturate(1)"
    : "brightness(0.85) contrast(1.1) grayscale(1)";

  const card = (
    <div
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-sgwx-surface"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="figure"
      aria-label={`${member.name}, ${member.title}`}
    >
      {/* Exiting image — scales up to 120% and fades out */}
      {prevMember?.photoUrl && (phase === "exiting" || phase === "entering") && (
        <Image
          src={prevMember.photoUrl}
          alt=""
          fill
          className="object-cover"
          style={{
            filter: baseFilter,
            animation: `cellFadeOut ${FADE_DURATION}ms ease forwards`,
          }}
          sizes="(max-width: 640px) 50vw, 20vw"
        />
      )}

      {/* Current image — fades in at normal scale */}
      {member.photoUrl ? (
        <Image
          src={member.photoUrl}
          alt={member.name}
          fill
          className="object-cover"
          style={{
            filter: baseFilter,
            transition: `filter ${FADE_DURATION}ms ease`,
            ...(phase === "entering"
              ? { animation: `cellFadeIn ${FADE_IN_DURATION}ms ease forwards` }
              : phase === "exiting"
                ? { opacity: 1, transform: "scale(1)" }
                : { opacity: 1, transform: "scale(1)" }),
          }}
          sizes="(max-width: 640px) 50vw, 20vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className="text-2xl font-bold text-sgwx-text-dim">
            {member.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 3)}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-sgwx-bg/90 via-sgwx-bg/40 to-transparent px-3 pb-4 text-center transition-opacity duration-300 ${
          frozen ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm font-semibold text-sgwx-text">{member.name}</p>
        {member.title && (
          <p className="mt-0.5 font-mono text-[9px] tracking-widest uppercase text-sgwx-green">
            {member.title}
          </p>
        )}
      </div>
    </div>
  );

  if (member.isFeatured && member.slug) {
    return (
      <Link href={`/members/${member.slug}`} className="block">
        {card}
      </Link>
    );
  }

  return card;
}

/* ─── Main Gallery ─── */

export default function MemberGallery({
  members,
  heading = "Fueled by independent masters of their craft",
  subheading = "We curate specialized teams tailored to your industry, your audiences, and your evolving mission.",
}: MemberGalleryProps) {
  // Only use members with photos
  const photoMembers = members.filter((m) => m.photoUrl);

  // Track which member index is displayed in each cell to prevent duplicates
  const cellMembersRef = useRef<number[]>([]);
  if (cellMembersRef.current.length === 0) {
    // Assign unique starting members to each cell (no duplicates)
    const indices: number[] = [];
    const pool = Array.from({ length: photoMembers.length }, (_, i) => i);
    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (let i = 0; i < TOTAL_CELLS; i++) {
      indices.push(pool[i % pool.length]);
    }
    cellMembersRef.current = indices;
  }

  // Staggered swap ticks — one random cell swaps per interval
  const [swapTicks, setSwapTicks] = useState<number[]>(
    new Array(TOTAL_CELLS).fill(0)
  );
  const [frozenCell, setFrozenCell] = useState<number | null>(null);

  // Callback for a cell to get a new member index that isn't shown anywhere else
  const handleSwap = useCallback(
    (cellIndex: number, oldMemberIdx: number): number => {
      const inUse = new Set(cellMembersRef.current);
      // Build candidates: members not currently displayed
      const candidates: number[] = [];
      for (let i = 0; i < photoMembers.length; i++) {
        if (!inUse.has(i) || (i === oldMemberIdx && inUse.has(i))) {
          // Allow members not in use; exclude the current one for this cell
          if (i !== oldMemberIdx && !inUse.has(i)) {
            candidates.push(i);
          }
        }
      }
      // If no unique candidates (fewer members than cells), fall back to any different member
      let next: number;
      if (candidates.length > 0) {
        next = candidates[Math.floor(Math.random() * candidates.length)];
      } else {
        do {
          next = Math.floor(Math.random() * photoMembers.length);
        } while (next === oldMemberIdx && photoMembers.length > 1);
      }
      // Update tracking
      cellMembersRef.current[cellIndex] = next;
      return next;
    },
    [photoMembers.length]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapTicks((prev) => {
        const next = [...prev];
        // Pick a random non-message, non-frozen cell to swap
        let cell: number;
        let attempts = 0;
        do {
          cell = Math.floor(Math.random() * TOTAL_CELLS);
          attempts++;
        } while ((cell === MESSAGE_CELL || cell === frozenCell) && attempts < 20);

        if (cell !== MESSAGE_CELL && cell !== frozenCell) {
          next[cell] = prev[cell] + 1;
        }
        return next;
      });
    }, SWAP_INTERVAL);

    return () => clearInterval(interval);
  }, [frozenCell]);

  const handleHover = useCallback((i: number) => setFrozenCell(i), []);
  const handleLeave = useCallback(() => setFrozenCell(null), []);

  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <style jsx global>{`
        @keyframes cellFadeIn {
          from { opacity: 0; transform: scale(1); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes cellFadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(1.2); }
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Grid: 5 cols x 3 rows on desktop, 3 cols on tablet, 2 cols on mobile */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-4">
          {Array.from({ length: TOTAL_CELLS }, (_, i) => {
            if (i === MESSAGE_CELL) {
              // Message block — spans 2 columns
              return (
                <div
                  key="message"
                  className="relative col-span-2 flex aspect-[2/1] flex-col justify-center rounded-2xl bg-sgwx-green/90 px-6 sm:px-8 lg:aspect-auto"
                >
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/70">
                    The Collective
                  </p>
                  <h2 className="mt-2 text-xl font-thin leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl">
                    {heading}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    {subheading}
                  </p>
                </div>
              );
            }

            return (
              <PhotoCell
                key={i}
                members={photoMembers}
                memberIndex={cellMembersRef.current[i]}
                swapTick={swapTicks[i]}
                frozen={frozenCell === i}
                onHover={() => handleHover(i)}
                onLeave={handleLeave}
                onSwap={(oldIdx) => handleSwap(i, oldIdx)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
