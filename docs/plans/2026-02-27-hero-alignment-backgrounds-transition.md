# Hero Alignment, Background Images, and Logo Page Transition

**Date:** 2026-02-27
**Status:** Approved

## Problem

1. All sub-page hero sections use centered text — looks generic, breaks the editorial left/right rhythm established by the home hero
2. Sub-page heroes have plain `bg-sgwx-bg` backgrounds — no atmosphere, no visual differentiation
3. Page transition shows plain "Sageworx / Loading" text — misses an opportunity to reinforce brand identity

## Design

### 1. Hero Alignment — Alternate Left/Right

Replace `text-center` + `justify-center` with directional alignment matching the home hero pattern.

| Page | Align | Background Slug | Overlay |
|------|-------|----------------|---------|
| Model | Left | `spiral-geometry` | `teal` |
| Process | Right | `fluid-waves` | `sage` |
| Members | Left | `dark-mountain` | `carbon` |
| Work | Right | `geometric-architecture` | `steel` |
| Spotlights | Left | `layered-terrain` | `steel` |

Each hero fetches its background via `getSectionBackgroundBySlug()` and renders `<SectionBackground>` with the appropriate overlay color.

ProcessClosing section also de-centered to left-align.

### 2. Page Transition — Animated SVG Logo

Replace "Sageworx / Loading" with the actual SGWX SVG wordmark, animated:

1. Screen wipes up (existing clip-path)
2. Logo letters (S, G, W, X) draw on via staggered `pathLength` animation with green stroke
3. Fill fades in after stroke completes
4. Green glow pulse via `drop-shadow` filter
5. Overlay fades out (existing)

Transition time extended from 600ms to 800ms to give the animation room.

### 3. Implementation Steps

1. Convert each hero to left/right aligned layout
2. Add SectionBackground + overlayColor to each hero
3. Make hero pages async (server components) that fetch background data
4. Rebuild PageTransition with inline SVG motion.path animations
5. De-center ProcessClosing
6. TypeScript verify
