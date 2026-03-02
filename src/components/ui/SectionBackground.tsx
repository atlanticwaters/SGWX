"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type OverlayColor = "sage" | "steel" | "teal" | "amber" | "carbon";

const OVERLAY_GRADIENTS: Record<OverlayColor, string> = {
  sage: "linear-gradient(135deg, rgba(110,168,127,0.14) 0%, rgba(57,63,62,0.18) 50%, rgba(121,155,169,0.08) 100%)",
  steel: "linear-gradient(135deg, rgba(121,155,169,0.16) 0%, rgba(4,42,61,0.20) 50%, rgba(10,79,94,0.10) 100%)",
  teal: "linear-gradient(135deg, rgba(10,79,94,0.18) 0%, rgba(4,42,61,0.22) 50%, rgba(13,107,74,0.10) 100%)",
  amber: "linear-gradient(135deg, rgba(212,201,74,0.14) 0%, rgba(180,140,30,0.10) 50%, rgba(60,50,10,0.12) 100%)",
  carbon: "linear-gradient(135deg, rgba(12,15,14,0.08) 0%, rgba(20,28,24,0.06) 50%, rgba(12,15,14,0.08) 100%)",
};

const GLOW_GRADIENTS: Record<OverlayColor, string> = {
  sage: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(110,168,127,0.07) 0%, transparent 70%)",
  steel: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(121,155,169,0.07) 0%, transparent 70%)",
  teal: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(10,79,94,0.09) 0%, transparent 70%)",
  amber: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,201,74,0.06) 0%, transparent 70%)",
  carbon: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,28,24,0.05) 0%, transparent 70%)",
};

interface SectionBackgroundProps {
  src: string;
  alt?: string;
  overlayColor?: OverlayColor;
}

/**
 * Renders a full-bleed background image with parallax scrolling,
 * a programmatic color grade, and a cinematic reveal animation.
 */
export default function SectionBackground({ src, alt = "", overlayColor = "sage" }: SectionBackgroundProps) {
  const color = OVERLAY_GRADIENTS[overlayColor] ? overlayColor : "sage";
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background moves slower than scroll — creates depth
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Base image — parallax + scale + reveal animation */}
      <motion.div
        className="absolute inset-[-15%] animate-[bgReveal_1.8s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            filter: "brightness(0.35) contrast(1.1) saturate(0.3)",
          }}
          quality={75}
        />
      </motion.div>
      {/* Brand color overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: OVERLAY_GRADIENTS[color],
          mixBlendMode: "color",
        }}
      />
      {/* Top radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: GLOW_GRADIENTS[color],
        }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(12,15,14,0.35) 70%, rgba(12,15,14,0.65) 100%)",
        }}
      />
    </div>
  );
}

export type { OverlayColor };
