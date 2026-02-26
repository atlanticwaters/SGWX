interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({ eyebrow, heading, subheading, centered = false, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
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
