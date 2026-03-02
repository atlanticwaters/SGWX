"use client";

import Image from "next/image";
import type { GalleryImage } from "@/lib/sanity/queries";

/* ── Single image (parallax temporarily stripped for mobile debugging) ──── */

function GalleryImageBlock({
  src,
  alt,
  aspect,
}: {
  src: string;
  alt: string;
  aspect: string;
}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1400px"
        className="object-cover"
        style={{ filter: "brightness(0.92) contrast(1.05) saturate(0.9)" }}
      />
    </div>
  );
}

/* ── Gallery layout ────────────────────────────────────────────────────── */

export default function ParallaxGallery({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  if (images.length === 0) return null;

  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < images.length) {
    // Full-width image
    blocks.push(
      <div key={`fw-${i}`}>
        <GalleryImageBlock
          src={images[i].url}
          alt={images[i].alt || title}
          aspect="16/9"
        />
      </div>
    );
    i++;

    // 2-column pair
    if (i < images.length) {
      const pair = images.slice(i, i + 2);
      blocks.push(
        <div key={`pair-${i}`} className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {pair.map((img, j) => (
            <div key={j}>
              <GalleryImageBlock
                src={img.url}
                alt={img.alt || title}
                aspect="4/3"
              />
            </div>
          ))}
        </div>
      );
      i += pair.length;
    }
  }

  return <div className="flex flex-col gap-1">{blocks}</div>;
}
