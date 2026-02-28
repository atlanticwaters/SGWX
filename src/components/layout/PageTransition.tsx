"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  const handleRouteChange = useCallback(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setDisplayPath(pathname);
    }, 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== displayPath) {
      handleRouteChange();
    }
  }, [pathname, displayPath, handleRouteChange]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="page-transition"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sgwx-bg"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0 }}
          transition={{
            clipPath: {
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            },
            opacity: {
              duration: 0.3,
              delay: 0.2,
              ease: [0.4, 0, 1, 1],
            },
          }}
        >
          <p className="text-2xl font-bold tracking-tight text-sgwx-text">
            Sageworx
          </p>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-muted">
            <span
              className="h-1.5 w-1.5 rounded-full bg-sgwx-green-bright animate-pulse"
              aria-hidden="true"
            />
            Loading
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
