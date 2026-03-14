"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";

const defaultNavItems = [
  { label: "Model", href: "/model" },
  { label: "Members", href: "/members" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "Spotlights", href: "/spotlights" },
];

interface HeaderProps {
  navItems?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
}

export default function Header({ navItems, ctaLabel, ctaHref }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const items = navItems ?? defaultNavItems;
  const cta = { label: ctaLabel ?? "Let\u2019s Chat!", href: ctaHref ?? "/contact" };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-sgwx-border-subtle bg-sgwx-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/sgwx-white.svg"
            alt="Sageworx"
            width={120}
            height={40}
            priority
          />
          <span className="flex items-center gap-1.5 font-mono text-[14px] tracking-widest uppercase text-sgwx-green/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sgwx-green-bright" />
            Online
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 text-sm tracking-wide transition-colors ${
                  isActive ? "text-sgwx-text" : "text-sgwx-text-muted hover:text-sgwx-text"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 bg-sgwx-green" />
                )}
              </Link>
            );
          })}
          <Link
            href={cta.href}
            className="rounded-full border border-sgwx-green text-sgwx-green px-5 py-2 font-mono text-[14px] tracking-widest uppercase transition-all hover:bg-sgwx-green/10"
          >
            {cta.label}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-sgwx-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && <MobileNav items={items} ctaLabel={cta.label} ctaHref={cta.href} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
