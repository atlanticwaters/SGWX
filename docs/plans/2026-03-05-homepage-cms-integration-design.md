# Homepage CMS Integration Design

**Date:** 2026-03-05
**Status:** Approved

## Goal

Make all homepage content editable through Sanity CMS by creating a dedicated homepage singleton document. Preserve all existing animations, layouts, and component structure.

## Architecture Decision

**Approach:** Dedicated homepage singleton with named fields per section.

**Why:** The homepage sections have bespoke animations (DeepFieldCanvas, SVG line-draw, parallax, Three.js wave background) tightly coupled to their layouts. A modular page builder would require reimplementing these as generic block renderers. A singleton preserves design fidelity while making all content editable.

## Schema: `homepage` Singleton

```
homepage (singleton)
├── seo                          # reuse existing seo object
├── hero
│   ├── heading                  # "Go Further. Faster."
│   ├── paragraph1               # first body paragraph
│   ├── paragraph2               # second body paragraph
│   ├── primaryCta               # callToAction object
│   └── secondaryCta             # callToAction object
│
├── changingGame
│   ├── heading                  # "The Rules Are Changing..."
│   ├── cards[]                  # array of { heading, body }
│   └── background               # ref → sectionBackground
│
├── comparison
│   ├── eyebrow                  # "The Model Makes a Difference"
│   ├── heading                  # "Why Sageworx?"
│   ├── columnHeaders            # { criteria, agency, freelance, sageworx }
│   ├── rows[]                   # reuse existing comparisonRow objects
│   └── cta                      # callToAction
│
├── clients
│   ├── eyebrow                  # "Who We Serve"
│   ├── heading                  # "Curated Partners..."
│   ├── segments[]               # { type, painPoint, solution }
│   └── background               # ref → sectionBackground
│
├── experts
│   ├── eyebrow                  # "The Collective"
│   ├── heading                  # "Hand-Picked Experts"
│   ├── subheading               # text
│   └── background               # ref → sectionBackground
│
├── process
│   ├── eyebrow                  # "Our Process"
│   ├── heading                  # "The Growth Sequence"
│   ├── subheading               # text
│   ├── stages[]                 # reuse existing processStage objects
│   ├── footerLink               # callToAction
│   └── background               # ref → sectionBackground
│
├── impact
│   ├── eyebrow                  # "Case Studies"
│   ├── heading                  # "Making An Impact"
│   ├── logoWallHeading          # "Trusted by ambitious brands..."
│   └── logos[]                  # array of strings
│
├── spotlights
│   ├── eyebrow                  # "Spotlights"
│   ├── heading                  # long quote text
│   ├── cta                      # callToAction
│   └── background               # ref → sectionBackground
│
└── finalCta
    ├── heading                  # "Ready to move forward faster?"
    ├── primaryCta               # callToAction
    ├── secondaryCta             # callToAction
    └── background               # ref → sectionBackground
```

## Changes Required

| Layer | Change |
|-------|--------|
| Sanity schema | New `homepage.ts` document type (singleton) |
| Sanity structure | Add homepage singleton to Studio sidebar |
| Query layer | New `getHomepage()` query in `queries.ts` |
| `src/app/page.tsx` | Fetch homepage doc, pass section data as props |
| Section components | Add props for CMS content, replace hardcoded strings |
| Seed script | New `seed-homepage.mjs` with current hardcoded content |

## What Stays the Same

- All animations (DeepFieldCanvas, SVG line-draw, parallax, wave background)
- Section order (fixed in page.tsx)
- Component structure and styling
- Members, case studies, blog posts queries (already CMS-driven)
- SectionDivider (purely visual, no content)

## Existing Reusable Schema Objects

- `callToAction` — buttons with label, href, variant
- `comparisonRow` — table rows with criteria, agency, freelance, sageworx columns
- `processStage` — process steps with number, name, focus, services, accent
- `seo` — meta tags
- `sectionBackground` — reference type for background images with overlay colors
