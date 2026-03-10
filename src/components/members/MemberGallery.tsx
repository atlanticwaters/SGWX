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
const SWAP_INTERVAL = 2800; // ms between swaps
const FADE_DURATION = 600; // ms for crossfade

/* ─── Cell component — crossfading member photos ─── */

function PhotoCell({
  members,
  startIndex,
  swapTick,
  frozen,
  onHover,
  onLeave,
}: {
  members: GalleryMember[];
  startIndex: number;
  swapTick: number;
  frozen: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  // Track current and previous member for crossfade
  const [current, setCurrent] = useState(startIndex % members.length);
  const [prev, setPrev] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const frozenRef = useRef(frozen);
  frozenRef.current = frozen;

  useEffect(() => {
    if (frozenRef.current || swapTick === 0) return;
    // Pick a random member different from current
    let next: number;
    do {
      next = Math.floor(Math.random() * members.length);
    } while (next === current && members.length > 1);

    setPrev(current);
    setCurrent(next);
    setFading(true);

    const timer = setTimeout(() => {
      setFading(false);
      setPrev(null);
    }, FADE_DURATION);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapTick]);

  const member = members[current];
  const prevMember = prev !== null ? members[prev] : null;

  if (!member) return null;

  const photoStyle = {
    filter: frozen
      ? "brightness(0.9) contrast(1.05) saturate(1)"
      : "brightness(0.85) contrast(1.1) grayscale(1)",
    transition: `filter ${FADE_DURATION}ms ease`,
  };

  const card = (
    <div
      className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-sgwx-surface"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="figure"
      aria-label={`${member.name}, ${member.title}`}
    >
      {/* Previous image (fading out) */}
      {prevMember?.photoUrl && fading && (
        <Image
          src={prevMember.photoUrl}
          alt=""
          fill
          className="object-cover transition-opacity duration-[600ms]"
          style={{ ...photoStyle, opacity: 0 }}
          sizes="(max-width: 640px) 50vw, 20vw"
        />
      )}

      {/* Current image (fading in) */}
      {member.photoUrl ? (
        <Image
          src={member.photoUrl}
          alt={member.name}
          fill
          className={`object-cover transition-opacity duration-[600ms] ${fading ? "opacity-0 animate-[fadeIn_600ms_ease_forwards]" : "opacity-100"}`}
          style={photoStyle}
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

  // Each cell gets a stable starting index
  const cellStarts = useRef<number[]>([]);
  if (cellStarts.current.length === 0) {
    const indices: number[] = [];
    for (let i = 0; i < TOTAL_CELLS; i++) {
      indices.push(i % Math.max(photoMembers.length, 1));
    }
    // Shuffle so it's not just sequential
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    cellStarts.current = indices;
  }

  // Staggered swap ticks — one random cell swaps per interval
  const [swapTicks, setSwapTicks] = useState<number[]>(
    new Array(TOTAL_CELLS).fill(0)
  );
  const [frozenCell, setFrozenCell] = useState<number | null>(null);

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

  // Build cells: photo slots + one message block
  const photoCellIndices: number[] = [];
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (i !== MESSAGE_CELL) photoCellIndices.push(i);
  }

  return (
    <section className="bg-sgwx-bg py-16 md:py-24">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
                startIndex={cellStarts.current[i]}
                swapTick={swapTicks[i]}
                frozen={frozenCell === i}
                onHover={() => handleHover(i)}
                onLeave={handleLeave}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
