"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface MobileNavProps {
  items: { label: string; href: string }[];
  onClose: () => void;
}

export default function MobileNav({ items, onClose }: MobileNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border-t border-sgwx-border-subtle bg-sgwx-bg/95 backdrop-blur-xl lg:hidden"
    >
      <nav className="flex flex-col gap-1 px-6 py-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-lg px-4 py-3 text-base text-sgwx-text-muted transition-colors hover:bg-sgwx-surface hover:text-sgwx-text"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={onClose}
          className="mt-2 rounded-full border border-sgwx-green bg-sgwx-green/10 px-5 py-3 text-center text-sm font-medium text-sgwx-green"
        >
          Let&apos;s Chat!
        </Link>
      </nav>
    </motion.div>
  );
}
