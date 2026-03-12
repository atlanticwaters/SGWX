# Section Layout: Toggleable Alignment + Inline Media

**Date:** 2026-03-11
**Status:** Approved
**Approach:** Hybrid — shared SectionLayout wrapper + per-section unique content

## Problem

Many sections across the site follow a common pattern (heading + body copy + optional background image) but alignment is hardcoded per component. The client wants to toggle left/right alignment from Sanity Studio and optionally place a photo or graphic alongside the copy block.

## Design

### 1. SectionLayout Wrapper Component

**File:** `src/components/ui/SectionLayout.tsx`

A shared wrapper that handles:
- `<section>` tag with padding, bg color, overflow-hidden
- `SectionBackground` (parallax bg image + overlay)
- `Container` with relative z-10
- Optional 2-column grid when `inlineImage` is present

**Props:**
- `align`: `"left" | "right"` — controls text alignment and image placement
- `backgroundUrl?`: string — parallax background image
- `overlayColor?`: string — overlay color for background
- `inlineImage?`: `{ url: string; alt: string }` — optional image alongside copy
- `bgColor?`: `"default" | "alt"` — maps to `bg-sgwx-bg` or `bg-sgwx-bg-alt`
- `children`: React.ReactNode — the unique section content

**Layout behavior:**

| Inline Image | Align | Result |
|---|---|---|
| No | Either | Single column, full-width children inside Container |
| Yes | left | `[copy 60%] [image 40%]` — image on right |
| Yes | right | `[image 40%] [copy 60%]` — image on left |

On mobile: stacks vertically (image above copy).

Image rendering: rounded corners, object-cover, same filter treatment as site photos (brightness 0.9, contrast 1.05, saturate 0.85).

### 2. Sanity Schema Changes

**New fields per section group** on existing page schemas:

Each section gets two new fields in its group:
- `{sectionName}Align` — string, radio buttons: "left" / "right", default varies per section
- `{sectionName}InlineImage` — image with alt text, optional

**Affected schemas:**

| Schema | Section Groups |
|---|---|
| `model-page.ts` | rightTeam, microteams, technology, continuity, momentum |
| Members page schema | growth, join |

**GROQ query updates:** Add inline image URL projection using `urlFor().width(800).quality(80).auto("format").url()` pattern + align field.

### 3. Component Refactoring (7 sections)

Each section delegates layout to SectionLayout and keeps its unique content as children.

**Prime candidates (simple prose):**
- `RightTeamSection` (model) — default right
- `MicroteamSection` (model) — default right, has bullets + closing
- `TechnologySection` (model) — default right
- `ContinuitySection` (model) — default left
- `MomentumSection` (model) — default left, has bullets
- `GrowthSection` (members) — default right
- `JoinSection` (members) — default left, has CTA button

**Refactoring pattern:**
- Remove: `<section>`, `SectionBackground`, `Container` from each component
- Add: `<SectionLayout align={align} ...>` wrapping the unique content
- Pass `align` prop through to `SectionHeading` and text alignment classes
- Text alignment (`ml-auto text-right` vs default) driven by `align` prop

**Children handle:** SectionHeading, body text, bullets, CTAs, closing paragraphs — anything unique to the section.

**SectionLayout never touches content.** It only provides the structural shell and optional image grid.

## Not In Scope

- Complex grid sections (CollectiveStats, CapabilitiesGrid, ComparisonTable, etc.)
- Hero sections
- Sections with carousels or interactive elements (ExpertsSection, SixStepsSection)
- FitSection (two-panel layout doesn't naturally flip)
- IcpSection (card stack with testimonials — too complex)

## Implementation Sequence

1. Create `SectionLayout` wrapper component
2. Create Sanity `sectionLayout` shared fields or add fields directly to schemas
3. Update GROQ queries for model-page and members page
4. Refactor model page sections (5 sections): RightTeam, Microteams, Technology, Continuity, Momentum
5. Refactor members page sections (2 sections): Growth, Join
6. Update page components to pass new props
7. Deploy schema to Sanity cloud
8. Test alignment toggle and inline image in Studio
