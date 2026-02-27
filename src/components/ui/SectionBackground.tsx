import Image from "next/image";

interface SectionBackgroundProps {
  src: string;
  alt?: string;
}

/**
 * Renders a full-bleed background image with a programmatic color grade
 * that matches the SGWX brand palette (Sage / Steel Blue / Carbon).
 *
 * The grade is achieved in three layers:
 * 1. The source image, heavily darkened & desaturated via CSS filter
 * 2. A color overlay using Sage/Carbon tones with mix-blend-mode
 * 3. A vignette gradient to feather the edges
 */
export default function SectionBackground({ src, alt = "" }: SectionBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base image — darkened & desaturated */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{
          filter: "brightness(0.18) contrast(1.15) saturate(0.25)",
        }}
        quality={75}
      />
      {/* Brand color overlay — Sage/Carbon tint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(110,168,127,0.12) 0%, rgba(57,63,62,0.18) 50%, rgba(121,155,169,0.08) 100%)",
          mixBlendMode: "color",
        }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(12,15,14,0.5) 70%, rgba(12,15,14,0.85) 100%)",
        }}
      />
    </div>
  );
}
