const logos = ["Google", "Spotify", "Nike", "Polestar", "Airbnb", "Linear", "Vercel"];

export default function LogoWall() {
  return (
    <div className="mt-16">
      <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-widest text-sgwx-text-dim">
        Trusted by ambitious brands and global leaders
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
