import Image from "next/image";
import Link from "next/link";

const defaultFooterLinks = [
  { label: "Model", href: "/model" },
  { label: "Members", href: "/members" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "Spotlights", href: "/spotlights" },
];

interface FooterProps {
  links?: { label: string; href: string }[];
  copyright?: string;
}

export default function Footer({ links, copyright }: FooterProps) {
  const footerLinks = links ?? defaultFooterLinks;

  return (
    <footer className="relative overflow-hidden border-t border-sgwx-border-subtle">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/SGWX-Spaceman.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "brightness(0.2) saturate(0.6)" }}
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/90 via-sgwx-bg/60 to-sgwx-bg/80" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="flex items-center gap-4">
          <Image
            src="/sgwx-white.svg"
            alt="Sageworx"
            width={100}
            height={33}
          />
          <p className="text-sm text-sgwx-text-dim">
            {copyright ?? `\u00A9 ${new Date().getFullYear()} Sageworx, LLC.`}
          </p>
        </div>
        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-sgwx-text-dim transition-colors hover:text-sgwx-text-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 text-sgwx-text-dim">
          {/* Social icons - placeholder for now */}
        </div>
      </div>
    </footer>
  );
}
