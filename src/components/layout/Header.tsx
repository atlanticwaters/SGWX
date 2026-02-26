"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";

const navItems = [
  { label: "Model", href: "/model" },
  { label: "Members", href: "/members" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "Spotlights", href: "/spotlights" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-sgwx-border-subtle bg-sgwx-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-sgwx-text">
            Sageworx
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-sgwx-green/30 bg-sgwx-green/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-sgwx-green">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sgwx-green-bright" />
            Online
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-sgwx-text-muted transition-colors hover:text-sgwx-text"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-sgwx-green bg-sgwx-green/10 px-5 py-2 text-sm font-medium text-sgwx-green transition-all hover:bg-sgwx-green/20"
          >
            Let&apos;s Chat!
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
        {mobileOpen && <MobileNav items={navItems} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
