"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { GalleryImage } from "@/lib/sanity/queries";

/* ── Single parallax image ─────────────────────────────────────────────────── */

function ParallaxImage({
  src,
  alt,
  aspect,
  speed = 0.12,
}: {
  src: string;
  alt: string;
  aspect: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: aspect }}>
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1400px"
          className="object-cover"
          style={{ filter: "brightness(0.92) contrast(1.05) saturate(0.9)" }}
        />
      </motion.div>
    </div>
  );
}

/* ── Gallery layout ────────────────────────────────────────────────────────── */

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
      <motion.div
        key={`fw-${i}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <ParallaxImage
          src={images[i].url}
          alt={images[i].alt || title}
          aspect="16/9"
          speed={0.08}
        />
      </motion.div>
    );
    i++;

    // 2-column pair
    if (i < images.length) {
      const pair = images.slice(i, i + 2);
      blocks.push(
        <div key={`pair-${i}`} className="grid grid-cols-1 gap-1 md:grid-cols-2">
          {pair.map((img, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: j * 0.1,
              }}
            >
              <ParallaxImage
                src={img.url}
                alt={img.alt || title}
                aspect="4/3"
                speed={0.1}
              />
            </motion.div>
          ))}
        </div>
      );
      i += pair.length;
    }
  }

  return <div className="flex flex-col gap-1">{blocks}</div>;
}
