const DEFAULT_LOGOS = ["Google", "Spotify", "Nike", "Polestar", "Airbnb", "Linear", "Vercel"];

interface LogoWallProps {
  heading?: string;
  logos?: string[];
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
        {logos.map((logo) => (
          <span
            key={logo}
            className="text-lg font-semibold tracking-wide text-sgwx-text opacity-25 transition-opacity duration-300 hover:opacity-70"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
