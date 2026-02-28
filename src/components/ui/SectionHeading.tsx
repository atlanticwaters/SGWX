type Size = "display" | "large" | "medium" | "small";
type Align = "left" | "right";

const headingSizes: Record<Size, string> = {
  display: "text-4xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl",
  large: "text-3xl font-normal tracking-tight text-sgwx-text md:text-4xl lg:text-5xl",
  medium: "text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl",
  small: "text-xl font-normal tracking-tight text-sgwx-text md:text-2xl",
};

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: Align;
  size?: Size;
  className?: string;
}

export default function SectionHeading({ eyebrow, heading, subheading, align = "left", size = "large", className = "" }: SectionHeadingProps) {
  const isRight = align === "right";

  return (
    <div className={`max-w-3xl ${isRight ? "ml-auto text-right" : ""} ${className}`}>
      {eyebrow && (
        <p className="mb-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
          {eyebrow}
        </p>
      )}
      {eyebrow && (
        <div className={`mb-5 h-0.5 w-8 bg-sgwx-green ${isRight ? "ml-auto" : ""}`} />
      )}
      <h2 className={headingSizes[size]}>
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 text-lg leading-relaxed text-sgwx-text-muted md:text-xl">
          {subheading}
        </p>
      )}
    </div>
  );
}
