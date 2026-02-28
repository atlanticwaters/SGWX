# Design: Card Design System + Landing Page Creator

**Date:** 2026-02-28
**Status:** Approved

---

## Overview

Two standalone tools for the SGWX team:

1. **Card Design System** (`/card-designer`) — visual editor for card component styles, persisted to Sanity CMS, consumed by a reusable `<StyledCard>` component.
2. **Landing Page Creator** (`/landing-pages`) — creation/management dashboard for prospect-facing landing pages with template selection, vertical-based content filtering, and custom URL slugs. Public pages served at `/<slug>`.

---

## Feature 1: Card Design System

### Sanity Schema — `cardStyle`

New document type:

```
cardStyle
├── name (string, required) — e.g. "Blog Card", "Case Study Card"
├── slug (slug, required)
├── borderRadius ("none" | "lg" | "xl" | "2xl")
├── padding ("compact" | "default" | "spacious")
├── hoverEffect ("glow" | "lift" | "border" | "none")
├── accentColor ("green" | "teal" | "cyan" | "amber")
├── showBorder (boolean, default true)
├── imageAspect ("video" | "square" | "wide" | "none")
├── backgroundStyle ("surface" | "surface-alt" | "transparent")
```

### Route: `/card-designer`

**Layout:**
- Left panel: saved card styles list (fetched from Sanity)
- Right panel: live preview + controls

**Controls:** Select dropdowns and toggles that update local React state. Preview card re-renders in real time.

**Save:** "Save" button calls a server action that creates or updates the Sanity document.

### Consuming Styles — `<StyledCard>`

```tsx
<StyledCard slug="blog-card">
  {/* card content */}
</StyledCard>
```

The component fetches card style config by slug and maps Sanity values to Tailwind classes:
- `padding: "compact"` → `p-3`
- `padding: "default"` → `p-6`
- `padding: "spacious"` → `p-8`
- `borderRadius: "2xl"` → `rounded-2xl`
- `hoverEffect: "glow"` → green box-shadow on hover
- `hoverEffect: "lift"` → `-translate-y-1` on hover
- etc.

---

## Feature 2: Landing Page Creator

### Enhanced Sanity Schema — `landingPage`

Update the existing `landingPage` document type with new fields:

```
landingPage (enhanced)
├── title (string, required) — "Coca-Cola Pitch"
├── slug (slug, required) — "coke" → /coke
├── clientName (string) — "Coca-Cola"
├── template ("bold-hero" | "minimal" | "services-showcase")
├── verticals (array of strings, max 3)
├── status ("draft" | "active" | "archived")
├── campaign (string) — tracking label
├── heroHeading (string) — custom hero text override
├── heroSubheading (text)
├── ctaLabel (string, default "Let's Talk")
├── ctaHref (string, default "/contact")
├── content (array of page builder blocks) — deep customization via Studio
├── seo (seo object)
```

### Predefined Verticals

Healthcare, Automotive, Sports, Technology, Finance, Retail, CPG, Entertainment, Education, Real Estate

### Route: `/landing-pages` (Dashboard)

**Header:** "Landing Pages" title + "+ New" button

**Existing Pages Table:**
| Slug | Client | Template | Status | Actions |
|------|--------|----------|--------|---------|
| /coke | Coca-Cola | Bold Hero | Active | Edit · Toggle · Delete |

**Actions:**
- **Edit:** Opens edit modal (change client name, slug, verticals, template, hero overrides)
- **Toggle:** Flips status between active/draft (active pages are publicly visible)
- **Delete:** Confirmation dialog, then removes from Sanity

**"+ New" Wizard:**
1. Pick template — 3 visual cards with template previews
2. Enter client name + URL slug
3. Select up to 3 verticals from tag picker
4. "Create" → server action creates Sanity doc → redirects to live page

### Route: `/[slug]` (Public Landing Pages)

**Dynamic catch-all** at `src/app/[slug]/page.tsx`:
- Queries Sanity: `*[_type == "landingPage" && slug.current == $slug && status == "active"][0]`
- No match → `notFound()`
- Renders the template component based on `template` field

### Templates

**Bold Hero:**
- Full-bleed hero (client name + custom heading)
- Stats grid (3 metrics)
- Case study cards filtered by verticals
- CTA banner

**Minimal:**
- Clean text-only hero
- Content split (value prop + image)
- Testimonials filtered by verticals
- CTA banner

**Services Showcase:**
- Hero with background image
- Feature cards (services relevant to verticals)
- Comparison table (Sageworx vs traditional vs freelancers)
- CTA banner

### Vertical Content Filtering (GROQ)

```groq
// Case studies matching selected verticals
*[_type == "caseStudy" && category in $verticals] | order(order asc)

// Blog posts matching selected verticals
*[_type == "blogPost" && tag in $verticals] | order(publishedAt desc)[0...3]

// Testimonials from companies in those industries
*[_type == "testimonial" && company in $verticals]
```

---

## Shared Infrastructure

### Server Actions

Both features use Next.js server actions for Sanity mutations:
- `src/app/actions/sanity.ts` — shared CRUD helpers using Sanity's write client
- `createDocument()`, `updateDocument()`, `deleteDocument()`, `toggleStatus()`

### Route Conflict Prevention

The `[slug]` catch-all must not conflict with existing static routes. The page component checks that the slug matches a `landingPage` doc with `status == "active"` before rendering — otherwise returns `notFound()`.

---

## File Structure

```
src/
├── app/
│   ├── card-designer/
│   │   ├── page.tsx          (server: fetch card styles)
│   │   └── CardDesignerClient.tsx (client: editor UI)
│   ├── landing-pages/
│   │   ├── page.tsx          (server: fetch landing pages)
│   │   └── LandingPagesClient.tsx (client: dashboard + wizard)
│   ├── [slug]/
│   │   └── page.tsx          (server: render landing page by slug)
│   └── actions/
│       └── sanity.ts         (server actions for mutations)
├── components/
│   ├── ui/
│   │   └── StyledCard.tsx    (reusable styled card wrapper)
│   ├── landing-pages/
│   │   ├── BoldHeroTemplate.tsx
│   │   ├── MinimalTemplate.tsx
│   │   ├── ServicesShowcaseTemplate.tsx
│   │   └── LandingPageRenderer.tsx
│   └── card-designer/
│       ├── CardPreview.tsx
│       └── CardControls.tsx
├── sanity/
│   └── schemaTypes/
│       └── documents/
│           └── card-style.ts  (new schema)
│           └── landing-page.ts (enhanced)
└── lib/
    └── sanity/
        └── queries.ts        (new queries for card styles + landing pages)
```
