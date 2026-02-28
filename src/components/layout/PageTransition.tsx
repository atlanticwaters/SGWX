"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────

const VARIANTS = ["logo", "glitch", "bars", "blur"] as const;
type TransitionVariant = (typeof VARIANTS)[number];

// ─── SGWX logo paths ────────────────────────────────────────────────────────

const logoPaths = [
  // S
  "M101.74,118.19c-4.5-9.86-6.78-20.62-6.78-31.98,0-1.8.08-3.57.19-5.34-.38-1.16-1.08-2.19-2.08-2.85-8.82-5.77-19.6-9.4-29.94-12.45-10.84-3.19-18.11-5.97-22.89-8.74-7.08-4.13-8.38-7.98-8.38-14.06,0-14.66,15.8-16.74,22.61-16.95.48-.02.94-.03,1.3-.02,12.17,0,22.08,3.64,33.13,12.18l.38.3c1.55,1.2,3.73,1.03,5.07-.41l12.58-13.42c.71-.77,1.09-1.81,1.03-2.86-.06-1.05-.55-2.05-1.35-2.73l-.42-.36C90.9,5.36,76.03,0,54.87,0c-6.18,0-12.11.69-17.63,2.05-1.2.29-2.35.61-3.47.96C13.3,9.29,1.08,24.48,1.08,43.62c0,8.08,1.71,14.92,5.23,20.9,4.34,7.42,11.57,13.48,22.12,18.53,5.97,2.87,13.25,5.54,22.27,8.17,26.53,7.81,30.81,13.69,30.81,24.76,0,20.79-22.49,22.41-29.38,22.41-11.84,0-22.88-2.36-38.32-13.86-.92-.68-2.09-.9-3.2-.61-1.12.3-1.85,1.13-2.33,2.19L.33,143.54c-.72,1.62-.25,3.57,1.13,4.64,13.68,10.62,30.8,16.01,50.89,16.01,27.27,0,48.44-10.56,56.46-29.7.6-1.44.46-3.06-.41-4.36-2.52-3.77-4.74-7.75-6.65-11.94Z",
  // G
  "M244.14,82.53h-58.31c-1.99,0-3.8,1.16-4.62,2.98l-8.22,18.11c-.56,1.23-.45,2.64.28,3.77.73,1.13,1.97,1.81,3.32,1.81h38.57c.93,0,1.69.76,1.69,1.69v18.36c0,.61-.3,1.15-.78,1.43-2.39,1.35-5.39,2.5-8.91,3.42-4.43,1.16-8.91,1.75-13.29,1.75-1.79,0-3.5-.07-5.08-.2-5.93-.46-11.68-1.79-17.08-3.94-2.42-.97-4.82-2.12-7.13-3.43-3.89-2.17-7.53-4.83-10.8-7.93-5.04-4.76-9.08-10.45-11.99-16.9-2.88-6.36-4.34-13.35-4.34-20.78s1.46-14.18,4.35-20.56c2.9-6.42,6.93-12.11,11.99-16.9,5.06-4.78,11.11-8.64,17.97-11.49,6.84-2.82,14.28-4.24,22.13-4.24,3.97,0,8.02.45,12.02,1.35.95.22,1.86.44,2.81.72,2.75.72,5.51,1.63,8.19,2.72.87.36,1.71.74,2.53,1.13,1.09.52,2.35.3,3.21-.54.85-.83,1.07-2.08.58-3.16l-12.15-26.73c-.98-2.16-3.02-3.63-5.37-3.93-4.01-.51-8.28-.76-12.73-.76-11.88,0-23.23,2.15-33.74,6.4-10.4,4.23-19.67,10.12-27.56,17.53-7.83,7.42-14.09,16.19-18.59,26.07-4.5,9.89-6.78,20.65-6.78,31.98s2.28,22.11,6.78,31.98c4.52,9.91,10.78,18.69,18.61,26.09,6.15,5.78,13.08,10.62,20.59,14.38,2.48,1.24,4.68,2.24,6.94,3.15,5.91,2.4,12.2,4.15,18.7,5.21,4.82.77,9.88,1.16,15.04,1.16,10.41,0,20.33-1.36,29.51-4.04,8.53-2.49,16.88-6.67,24.17-12.09,1.26-.94,2.02-2.46,2.02-4.07v-56.95c0-2.49-2.02-4.51-4.51-4.51Z",
  // W
  "M349.87,163.94h0c1.56,0,2.94-.89,3.58-2.31l49.99-110.47c.66-1.47.67-3.16,0-4.62l-12.39-27.5c-.55-1.22-1.73-1.98-3.07-1.99h0c-1.34,0-2.51.76-3.07,1.98l-33.53,73.7c-.56,1.24-2.51,1.24-3.07,0L308.03,4.15c-.82-1.8-2.62-2.96-4.6-2.96h-23.78c-1.34,0-2.58.67-3.31,1.8-.73,1.13-.83,2.53-.28,3.76l30.72,67.79c.4.89.4,1.91,0,2.79l-7.03,15.41c-.28.62-.85.99-1.53.99s-1.26-.37-1.54-.99L256.46,4.15c-.81-1.8-2.62-2.97-4.6-2.97h-23.84c-1.34,0-2.58.67-3.31,1.8-.73,1.13-.83,2.53-.28,3.76l70.36,154.87c.65,1.42,2.02,2.31,3.58,2.31h0c1.57,0,2.94-.89,3.58-2.32l21.09-46.53c.28-.62.35-.99,1.04-.99s.79.36,1.07.98l21.13,46.56c.65,1.42,2.02,2.31,3.58,2.31Z",
  // X
  "M499.65,158.06l-37.36-82.37c-.2-.44-.2-1.19,0-1.64l30.44-67.32c.55-1.22.45-2.62-.28-3.75-.73-1.13-1.96-1.8-3.31-1.8h-23.76c-1.98,0-3.79,1.16-4.6,2.97l-13.89,30.76c-.56,1.24-2.51,1.24-3.07,0l-13.99-30.76c-.82-1.8-2.63-2.97-4.6-2.97h-23.79c-1.34,0-2.58.67-3.31,1.8-.73,1.13-.83,2.53-.28,3.75l30.57,67.32c.2.44.2,1.19,0,1.64l-37.49,82.37c-.56,1.22-.45,2.63.28,3.75.73,1.13,1.96,1.8,3.31,1.8h23.9c1.99,0,3.79-1.17,4.61-2.98l20.7-45.62c.56-1.24,2.74-1.22,3.3.03l20.66,45.6c.81,1.81,2.62,2.98,4.61,2.98h23.79c1.34,0,2.58-.67,3.31-1.8.73-1.13.83-2.53.28-3.75Z",
];

// ─── Shared constants ───────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const;

const BRAND = {
  bg: "#0c0f0e",
  green: "#6EA87F",
  greenBright: "#9FDBB0",
  neon: "#30ff88",
  cyan: "#0E2030",
  steel: "#799BA9",
  steelDark: "#1E3540",
  paper: "#F0F4F2",
} as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── 1. Logo Draw (original) ────────────────────────────────────────────────

function LogoTransition() {
  return (
    <>
      <motion.svg
        viewBox="0 0 500 164.19"
        className="w-48 md:w-64"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.15, ease }}
      >
        {logoPaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#17a86b"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{
              pathLength: 1,
              fillOpacity: 1,
              stroke: ["#17a86b", "#30ff88", "#f9f9f9"],
            }}
            transition={{
              pathLength: { duration: 0.4, delay: 0.2 + i * 0.06, ease },
              fillOpacity: { duration: 0.15, delay: 0.45 + i * 0.06, ease: "easeOut" },
              stroke: { duration: 0.5, delay: 0.2 + i * 0.06, ease: "easeOut" },
            }}
            style={{ fill: "#f9f9f9" }}
          />
        ))}
        {logoPaths.map((d, i) => (
          <motion.path
            key={`glow-${i}`}
            d={d}
            fill="none"
            stroke="#30ff88"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
            transition={{
              pathLength: { duration: 0.4, delay: 0.2 + i * 0.06, ease },
              opacity: { duration: 0.6, delay: 0.2 + i * 0.06, ease: "easeInOut" },
            }}
            style={{ filter: "blur(6px)" }}
          />
        ))}
      </motion.svg>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, delay: 0.25, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(48,255,136,0.08) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

// ─── 2. Pixelated Digital Glitch ────────────────────────────────────────────

function GlitchTransition() {
  const glitchData = useMemo(() => {
    const rand = seededRandom(Date.now());
    const colors = [BRAND.neon, BRAND.greenBright, BRAND.cyan, BRAND.steel, BRAND.paper, BRAND.green];

    // Random pixel blocks
    const pixels = Array.from({ length: 50 }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      w: rand() * 8 + 2,
      h: rand() * 4 + 1,
      color: colors[Math.floor(rand() * colors.length)],
      delay: rand() * 0.3,
      duration: rand() * 0.15 + 0.05,
    }));

    // Horizontal scanline slices that jitter
    const scanlines = Array.from({ length: 6 }, (_, i) => ({
      y: 10 + rand() * 80,
      height: rand() * 6 + 2,
      offset: (rand() > 0.5 ? 1 : -1) * (rand() * 15 + 5),
      delay: rand() * 0.2 + 0.1,
    }));

    // Glitch text fragments
    const fragments = ["SG", "WX", "SGWX", ">>", "//", "0x"];
    const textBits = Array.from({ length: 8 }, () => ({
      text: fragments[Math.floor(rand() * fragments.length)],
      x: rand() * 80 + 10,
      y: rand() * 80 + 10,
      delay: rand() * 0.4 + 0.1,
      color: colors[Math.floor(rand() * colors.length)],
    }));

    return { pixels, scanlines, textBits };
  }, []);

  return (
    <>
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Random pixel blocks */}
      {glitchData.pixels.map((px, i) => (
        <motion.div
          key={`px-${i}`}
          className="absolute"
          style={{
            left: `${px.x}%`,
            top: `${px.y}%`,
            width: `${px.w}vw`,
            height: `${px.h}vh`,
            backgroundColor: px.color,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            scaleX: [0, 1, 1, 0],
          }}
          transition={{
            duration: px.duration,
            delay: px.delay,
            repeat: 2,
            repeatDelay: px.duration * 0.5,
          }}
        />
      ))}

      {/* Horizontal glitch slices — strips that jerk sideways */}
      {glitchData.scanlines.map((sl, i) => (
        <motion.div
          key={`sl-${i}`}
          className="absolute left-0 right-0"
          style={{
            top: `${sl.y}%`,
            height: `${sl.height}vh`,
            backgroundColor: BRAND.bg,
            borderTop: `1px solid ${BRAND.neon}`,
            borderBottom: `1px solid ${BRAND.green}`,
            opacity: 0.7,
          }}
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: [0, sl.offset, -sl.offset * 0.6, sl.offset * 0.3, 0],
            opacity: [0, 0.8, 0.8, 0.6, 0],
          }}
          transition={{
            duration: 0.4,
            delay: sl.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glitch text fragments */}
      {glitchData.textBits.map((t, i) => (
        <motion.span
          key={`txt-${i}`}
          className="absolute font-mono text-xs md:text-sm font-bold tracking-widest pointer-events-none select-none"
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
            color: t.color,
            textShadow: `0 0 8px ${t.color}`,
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [-10, 0, 4, -6],
          }}
          transition={{
            duration: 0.2,
            delay: t.delay,
            repeat: 1,
            repeatDelay: 0.1,
          }}
        >
          {t.text}
        </motion.span>
      ))}

      {/* Central SGWX with heavy glitch */}
      <div className="relative z-20">
        {/* Red/cyan chromatic aberration layers */}
        <motion.div
          className="absolute inset-0"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [0, -3, 4, -2, 0], opacity: [0, 0.6, 0.4, 0.6, 0] }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 500 164.19" className="w-48 md:w-64">
            {logoPaths.map((d, i) => (
              <path key={i} d={d} fill="rgba(0,255,200,0.4)" />
            ))}
          </svg>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [0, 3, -4, 2, 0], opacity: [0, 0.5, 0.3, 0.5, 0] }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 500 164.19" className="w-48 md:w-64">
            {logoPaths.map((d, i) => (
              <path key={i} d={d} fill="rgba(255,50,80,0.3)" />
            ))}
          </svg>
        </motion.div>

        {/* Main logo — sliced and reassembled */}
        <motion.svg
          viewBox="0 0 500 164.19"
          className="w-48 md:w-64 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          {logoPaths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill={BRAND.paper}
              initial={{ opacity: 0, x: (i % 2 === 0 ? -1 : 1) * 20 }}
              animate={{
                opacity: [0, 1, 0.6, 1],
                x: [(i % 2 === 0 ? -1 : 1) * 20, 0, (i % 2 === 0 ? 1 : -1) * 4, 0],
              }}
              transition={{
                duration: 0.35,
                delay: 0.15 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </motion.svg>
      </div>

      {/* Full-screen flash */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0, 0.08, 0] }}
        transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
        style={{ backgroundColor: BRAND.neon }}
      />
    </>
  );
}

// ─── 3. Color Bars ──────────────────────────────────────────────────────────

const BAR_COLORS = [
  BRAND.steelDark,
  BRAND.cyan,
  BRAND.steel,
  BRAND.green,
  BRAND.greenBright,
  BRAND.neon,
  BRAND.paper,
  BRAND.greenBright,
  BRAND.green,
  BRAND.steel,
  BRAND.steelDark,
];

function BarsTransition() {
  const barCount = BAR_COLORS.length;

  return (
    <>
      {/* Color bars sliding in from top */}
      <div className="absolute inset-0 flex">
        {BAR_COLORS.map((color, i) => (
          <motion.div
            key={i}
            className="h-full"
            style={{
              flex: 1,
              backgroundColor: color,
            }}
            initial={{ scaleY: 0, transformOrigin: i % 2 === 0 ? "top" : "bottom" }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.25,
              delay: 0.05 + i * 0.025,
              ease,
            }}
          />
        ))}
      </div>

      {/* White noise grain overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0.08, 0.12, 0.05] }}
        transition={{ duration: 0.6, delay: 0.2, ease: "linear" }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Horizontal divider line sweeping down */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${BRAND.paper}, transparent)`,
          boxShadow: `0 0 20px ${BRAND.neon}, 0 0 60px ${BRAND.green}`,
        }}
        initial={{ top: "-2px" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Center: SGWX rendered in the bar aesthetic */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.8] }}
        transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
      >
        <motion.svg
          viewBox="0 0 500 164.19"
          className="w-48 md:w-64"
          initial={{ scaleX: 0.8, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease }}
        >
          {logoPaths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill={BRAND.bg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.3 + i * 0.04 }}
            />
          ))}
        </motion.svg>
      </motion.div>

      {/* Bottom color bar strip — like a TV test pattern footer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ height: "8vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.6] }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[BRAND.bg, BRAND.paper, BRAND.bg, BRAND.steelDark, BRAND.bg, BRAND.neon, BRAND.bg].map(
          (c, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: c }} />
          )
        )}
      </motion.div>
    </>
  );
}

// ─── 4. Blur Transition ─────────────────────────────────────────────────────

function BlurTransition() {
  const orbData = useMemo(() => {
    const rand = seededRandom(Date.now());
    const colors = [
      `rgba(110,168,127,0.25)`,   // sage
      `rgba(48,255,136,0.15)`,    // neon
      `rgba(159,219,176,0.2)`,    // bright green
      `rgba(121,155,169,0.2)`,    // steel blue
      `rgba(30,53,64,0.3)`,       // steel dark
    ];
    return Array.from({ length: 5 }, () => ({
      x1: rand() * 60 + 20,
      y1: rand() * 60 + 20,
      x2: rand() * 60 + 20,
      y2: rand() * 60 + 20,
      size: rand() * 30 + 15,
      color: colors[Math.floor(rand() * colors.length)],
      delay: rand() * 0.2,
    }));
  }, []);

  return (
    <>
      {/* Frosted glass backdrop — the main blur effect */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: BRAND.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0"
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: ["blur(0px)", "blur(30px)", "blur(20px)"] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Floating color orbs */}
      {orbData.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${orb.size}vmin`,
            height: `${orb.size}vmin`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          initial={{
            left: `${orb.x1}%`,
            top: `${orb.y1}%`,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            left: `${orb.x2}%`,
            top: `${orb.y2}%`,
            scale: [0, 1.2, 1],
            opacity: [0, 0.8, 0.6],
          }}
          transition={{
            duration: 0.6,
            delay: orb.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      {/* Central logo — softly emerges from the blur */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
        animate={{
          opacity: [0, 1, 1],
          scale: [1.1, 1, 1],
          filter: ["blur(20px)", "blur(0px)", "blur(0px)"],
        }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
      >
        <svg viewBox="0 0 500 164.19" className="w-48 md:w-64">
          {logoPaths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill={BRAND.paper}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.25 + i * 0.05 }}
            />
          ))}
        </svg>

        {/* Soft glow behind logo */}
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.4] }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse 60% 80% at 50% 50%, rgba(48,255,136,0.12) 0%, transparent 60%)`,
            filter: "blur(30px)",
          }}
        />
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(12,15,14,0.5) 100%)",
        }}
      />
    </>
  );
}

// ─── Shared overlay wrapper ─────────────────────────────────────────────────

const overlayVariants = {
  logo: {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0% 0)" },
    exit: { opacity: 0 },
    transition: {
      clipPath: { duration: 0.35, ease },
      opacity: { duration: 0.25, delay: 0.15, ease: [0.4, 0, 1, 1] },
    },
  },
  glitch: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      opacity: { duration: 0.08 },
    },
  },
  bars: {
    initial: { opacity: 1, clipPath: "inset(100% 0 0 0)" },
    animate: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
    exit: { opacity: 0 },
    transition: {
      clipPath: { duration: 0.3, ease },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  blur: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, filter: "blur(10px)" },
    transition: {
      opacity: { duration: 0.25 },
      filter: { duration: 0.3 },
    },
  },
};

// ─── Main Component ─────────────────────────────────────────────────────────

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);
  const [variant, setVariant] = useState<TransitionVariant>("logo");

  const handleRouteChange = useCallback(() => {
    const pick = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
    setVariant(pick);
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setDisplayPath(pathname);
    }, 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== displayPath) {
      handleRouteChange();
    }
  }, [pathname, displayPath, handleRouteChange]);

  const ov = overlayVariants[variant];

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key={`page-transition-${variant}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-sgwx-bg overflow-hidden"
          initial={ov.initial}
          animate={ov.animate}
          exit={ov.exit}
          transition={ov.transition as never}
        >
          {variant === "logo" && <LogoTransition />}
          {variant === "glitch" && <GlitchTransition />}
          {variant === "bars" && <BarsTransition />}
          {variant === "blur" && <BlurTransition />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
