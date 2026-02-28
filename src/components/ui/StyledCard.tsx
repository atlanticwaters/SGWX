import type { CardStyleItem } from "@/lib/sanity/queries";

const RADIUS_MAP: Record<string, string> = {
  none: "rounded-none",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const PADDING_MAP: Record<string, string> = {
  compact: "p-3",
  default: "p-6",
  spacious: "p-8",
};

const BG_MAP: Record<string, string> = {
  surface: "bg-sgwx-surface",
  "surface-alt": "bg-sgwx-bg-alt",
  transparent: "bg-transparent",
};

const ACCENT_BORDER_MAP: Record<string, string> = {
  green: "hover:border-sgwx-green/30",
  teal: "hover:border-sgwx-teal/30",
  cyan: "hover:border-sgwx-cyan/30",
  amber: "hover:border-sgwx-yellow/30",
};

const HOVER_MAP: Record<string, string> = {
  glow: "transition-all duration-300 hover:bg-sgwx-surface-hover hover:shadow-[0_0_30px_rgba(110,168,127,0.08)]",
  lift: "transition-all duration-300 hover:bg-sgwx-surface-hover hover:-translate-y-1",
  border: "transition-all duration-300 hover:bg-sgwx-surface-hover",
  none: "",
};

const IMAGE_ASPECT_MAP: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  none: "",
};

interface StyledCardProps {
  style: CardStyleItem;
  children: React.ReactNode;
  className?: string;
  imagePlaceholder?: boolean;
}

export default function StyledCard({ style, children, className = "", imagePlaceholder = false }: StyledCardProps) {
  const radius = RADIUS_MAP[style.borderRadius] || RADIUS_MAP["2xl"];
  const padding = PADDING_MAP[style.padding] || PADDING_MAP["default"];
  const bg = BG_MAP[style.backgroundStyle] || BG_MAP["surface"];
  const border = style.showBorder ? "border border-sgwx-border" : "";
  const accentBorder = ACCENT_BORDER_MAP[style.accentColor] || ACCENT_BORDER_MAP["green"];
  const hover = HOVER_MAP[style.hoverEffect] || "";
  const hoverBorder = style.hoverEffect !== "none" ? accentBorder : "";
  const imageAspect = IMAGE_ASPECT_MAP[style.imageAspect] || "";

  return (
    <div className={`${radius} ${padding} ${bg} ${border} ${hover} ${hoverBorder} ${className}`}>
      {imagePlaceholder && imageAspect && (
        <div className={`mb-4 ${imageAspect} rounded-lg bg-sgwx-bg`} />
      )}
      {children}
    </div>
  );
}

export { RADIUS_MAP, PADDING_MAP, BG_MAP, ACCENT_BORDER_MAP, HOVER_MAP, IMAGE_ASPECT_MAP };
