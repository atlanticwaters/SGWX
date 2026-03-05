interface LogoWallProps {
  heading?: string;
  logos?: { imageUrl: string; alt: string }[];
}

export default function LogoWall({
  heading = "Trusted by ambitious brands and global leaders",
  logos,
}: LogoWallProps) {
  if (!logos || logos.length === 0) return null;

  return (
    <div className="mt-16">
      <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-widest text-sgwx-text-dim">
        {heading}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo, i) => (
          <img
            key={logo.alt || i}
            src={logo.imageUrl}
            alt={logo.alt}
            className="h-8 w-auto opacity-25 transition-opacity duration-300 hover:opacity-70"
          />
        ))}
      </div>
    </div>
  );
}
