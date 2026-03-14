"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface MobileNavProps {
  items: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  onClose: () => void;
}

export default function MobileNav({ items, ctaLabel, ctaHref, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border-t border-sgwx-border-subtle bg-sgwx-bg/95 backdrop-blur-xl lg:hidden"
    >
      <nav className="flex flex-col gap-1 px-6 py-4">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`relative rounded-lg px-4 py-3 text-base transition-colors ${
                isActive
                  ? "text-sgwx-text bg-sgwx-surface"
                  : "text-sgwx-text-muted hover:bg-sgwx-surface hover:text-sgwx-text"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 bg-sgwx-green" />
              )}
              {item.label}
            </Link>
          );
        })}
        <Link
          href={ctaHref ?? "/contact"}
          onClick={onClose}
          className="mt-2 rounded-full border border-sgwx-green px-5 py-3 text-center font-mono text-[14px] tracking-widest uppercase text-sgwx-green transition-all hover:bg-sgwx-green/10"
        >
          {ctaLabel ?? "Let\u2019s Chat!"}
        </Link>
      </nav>
    </motion.div>
  );
}
