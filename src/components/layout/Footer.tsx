"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const AnimationCanvas = dynamic(
  () => import("@/components/animations/AnimationCanvas"),
  { ssr: false }
);
const FooterNetwork = dynamic(
  () => import("@/components/animations/FooterNetwork"),
  { ssr: false }
);

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
      <AnimationCanvas
        cameraPosition={[0, 0, 80]}
        cameraFov={85}
        cameraFar={500}
        fogColor={0x080e12}
        fogDensity={0.004}
        vignette="linear-gradient(to right, rgba(12,15,14,0.7) 0%, transparent 8%, transparent 88%, rgba(12,15,14,0.8) 100%), linear-gradient(to bottom, rgba(12,15,14,0.5) 0%, transparent 25%, transparent 75%, rgba(12,15,14,0.5) 100%)"
      >
        <FooterNetwork />
      </AnimationCanvas>
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-end gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
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
              className="font-mono text-[13px] tracking-widest uppercase text-sgwx-cyan transition-colors hover:text-sgwx-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
