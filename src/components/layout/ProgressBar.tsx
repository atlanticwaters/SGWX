"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Page order used to compute a progress-aware gradient.
 * Earlier pages lean green; later pages shift toward cyan/blue.
 */
const PAGE_ORDER = ["/", "/model", "/members", "/process", "/work", "/spotlights"];

function getGradient(pathname: string) {
  // Find the page index (default to 0 for unknown pages)
  let idx = PAGE_ORDER.findIndex(
    (p) => p === pathname || (p !== "/" && pathname.startsWith(p)),
  );
  if (idx === -1) idx = 0;

  const t = PAGE_ORDER.length > 1 ? idx / (PAGE_ORDER.length - 1) : 0;

  // Hue shifts from 145 (green) → 185 (cyan-blue) across pages
  const hueStart = Math.round(145 + t * 30); // 145 → 175
  const hueEnd = Math.round(165 + t * 25); // 165 → 190

  return `linear-gradient(to right, hsl(${hueStart}, 80%, 50%), hsl(${hueEnd}, 75%, 55%))`;
}

export default function ProgressBar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: getGradient(pathname),
      }}
    />
  );
}
