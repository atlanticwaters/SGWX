"use client";

interface LogoWallProps {
  heading?: string;
  logos?: { imageUrl?: string; alt: string }[];
  clientNames?: string[];
}

const defaultClientNames = [
  "EverPass Media",
  "First Horizon Bank",
  "Halo Dog Collars",
  "Kroger",
  "BBDO",
  "Edible",
  "The With Agency",
  "Allison & Partners",
  "Smurfit WestRock",
  "Green House Agency",
  "Tractor Supply Company",
  "The Coca-Cola Company",
  "Invivo Brands",
  "Seneca Resources",
  "PDA",
  "DotGlue",
  "Darla Moore School",
  "160over90",
  "The YAH Agency",
  "Mindstrong",
  "Wick",
  "Southern Culinary & Creative",
];

export default function LogoWall({
  heading = "Trusted by ambitious brands and global leaders",
  logos,
  clientNames,
}: LogoWallProps) {
  const names = clientNames ?? defaultClientNames;

  // If we have image logos, render them as a scrolling ticker
  if (logos && logos.length > 0) {
    const tickerLogos = [...logos, ...logos]; // duplicate for seamless loop
    return (
      <div className="mt-16">
        <p className="mb-6 text-center font-mono text-[14px] uppercase tracking-widest text-white">
          {heading}
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-sgwx-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-sgwx-bg to-transparent" />
          <div className="flex animate-[scrollTicker_40s_linear_infinite] items-center gap-12 hover:[animation-play-state:paused] md:gap-16">
            {tickerLogos.map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.imageUrl}
                alt={logo.alt}
                className="h-8 w-auto shrink-0 opacity-25 transition-opacity duration-300 hover:opacity-70"
              />
            ))}
          </div>
        </div>
        <style jsx global>{`
          @keyframes scrollTicker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    );
  }

  // Text-based scrolling ticker
  const tickerItems = [...names, ...names]; // duplicate for seamless loop

  return (
    <div className="mt-16">
      <p className="mb-6 text-center font-mono text-[14px] uppercase tracking-widest text-white">
        {heading}
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-sgwx-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-sgwx-bg to-transparent" />
        <div className="flex animate-[scrollTicker_40s_linear_infinite] gap-3 hover:[animation-play-state:paused]">
          {tickerItems.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 whitespace-nowrap rounded-full border border-sgwx-border-subtle px-4 py-1.5 text-xs text-sgwx-text-muted transition-colors hover:border-sgwx-green/30 hover:text-sgwx-text"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes scrollTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
