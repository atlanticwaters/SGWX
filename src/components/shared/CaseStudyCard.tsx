import Link from "next/link";
import Image from "next/image";

interface CaseStudyCardProps {
  category: string;
  title: string;
  description: string;
  href: string;
  thumbnailUrl?: string;
}

export default function CaseStudyCard({
  category,
  title,
  description,
  href,
  thumbnailUrl,
}: CaseStudyCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-sgwx-border bg-sgwx-surface transition-all duration-300 hover:border-sgwx-green/40 hover:shadow-[0_0_32px_rgba(110,168,127,0.08)]"
    >
      {/* Thumbnail — 16:10 aspect ratio */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              filter: "brightness(0.88) contrast(1.08) saturate(0.85)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0a1f18 0%, #021a14 50%, #042a3d 100%)",
            }}
          />
        )}
        {/* Category badge overlaid bottom-left */}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full border border-sgwx-green/30 bg-sgwx-bg/80 px-3 py-0.5 font-mono text-[10px] tracking-widest uppercase text-sgwx-green backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="p-6">
        <h3 className="text-xl font-normal tracking-tight text-sgwx-text">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
          {description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-widest uppercase text-sgwx-green transition-colors group-hover:text-sgwx-green-bright">
          View Case Study
          <span
            className="transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
