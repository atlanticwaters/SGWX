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
    <footer className="relative overflow-hidden">
      {/* Spaceman background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/SGWX-Spaceman.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ filter: "brightness(0.35) saturate(0.7)" }}
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/70 via-sgwx-bg/40 to-sgwx-bg/50" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-end gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 md:order-first">
          <Image
            src="/sgwx-white.svg"
            alt="Sageworx"
            width={100}
            height={33}
          />
          <p className="text-sm text-sgwx-text-muted">
            {copyright ?? `\u00A9 ${new Date().getFullYear()} Sageworx, LLC.`}
          </p>
        </div>
        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-sgwx-text-muted transition-colors hover:text-sgwx-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
