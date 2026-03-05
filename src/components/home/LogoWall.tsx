const DEFAULT_LOGOS = ["Google", "Spotify", "Nike", "Polestar", "Airbnb", "Linear", "Vercel"];

interface LogoWallProps {
  heading?: string;
  // Sanity may return string arrays as plain strings or as objects with { value }
  logos?: (string | { value?: string })[];
}

export default function LogoWall({
  heading = "Trusted by ambitious brands and global leaders",
  logos = DEFAULT_LOGOS,
}: LogoWallProps) {
  return (
    <div className="mt-16">
      <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-widest text-sgwx-text-dim">
        {heading}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {logos.map((logo, i) => {
          const name = typeof logo === "string" ? logo : (logo as { value?: string }).value ?? "";
          return (
            <span
              key={name || i}
              className="text-lg font-semibold tracking-wide text-sgwx-text opacity-25 transition-opacity duration-300 hover:opacity-70"
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
