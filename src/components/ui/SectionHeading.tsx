type Size = "display" | "large" | "medium" | "small";

const headingSizes: Record<Size, string> = {
  display: "text-4xl font-light tracking-tight text-sgwx-text md:text-6xl lg:text-7xl",
  large: "text-3xl font-bold tracking-tight text-sgwx-text md:text-4xl lg:text-5xl",
  medium: "text-2xl font-semibold tracking-tight text-sgwx-text md:text-3xl",
  small: "text-xl font-semibold tracking-tight text-sgwx-text md:text-2xl",
};

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  centered?: boolean;
  size?: Size;
  className?: string;
}

export default function SectionHeading({ eyebrow, heading, subheading, centered = false, size = "large", className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
          {eyebrow}
        </p>
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
