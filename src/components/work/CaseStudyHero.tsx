"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CaseStudyHero({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 0.85]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[16/9]"
    >
      {imageUrl ? (
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: imageScale }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "brightness(0.75) contrast(1.1) saturate(0.85)" }}
          />
        </motion.div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a1f18 0%, #021a14 50%, #042a3d 100%)",
          }}
        />
      )}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to top, rgba(12,15,14,1) 0%, rgba(12,15,14,0.4) 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
