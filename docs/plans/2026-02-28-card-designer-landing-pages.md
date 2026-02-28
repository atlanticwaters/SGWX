# Card Designer + Landing Page Creator Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build two standalone tools — a visual card style editor at `/card-designer` persisted to Sanity, and a landing page creator/manager at `/landing-pages` with dynamic public routes at `/<slug>`.

**Architecture:** Both features use Next.js server actions for Sanity mutations via a write-enabled client. Card styles are Sanity documents consumed by a `<StyledCard>` wrapper. Landing pages use the existing page builder block system with new template + vertical fields, rendered via a `[slug]` catch-all route.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Sanity CMS (GROQ), Framer Motion, server actions.

---

## Task 1: Create Sanity Write Client

The existing read clients don't have write tokens. We need a server-side write client for mutations.

**Files:**
- Create: `src/lib/sanity/write-client.ts`

**Step 1: Create the write client**

```typescript
// src/lib/sanity/write-client.ts
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity project configuration");
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-25",
  useCdn: false,
  token,
});
```

**Step 2: Add the env variable placeholder**

Add `SANITY_API_WRITE_TOKEN` to `.env.local` (create a write token in Sanity dashboard → Settings → API → Tokens → Add token with "Editor" permissions).

Note: The `.env.local` file should already exist. Add the line:
```
SANITY_API_WRITE_TOKEN=<your-token-here>
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: Clean compile (the client is only imported server-side, token may be undefined in dev but that's OK).

**Step 4: Commit**

```bash
git add src/lib/sanity/write-client.ts
git commit -m "feat: add Sanity write client for server-side mutations"
```

---

## Task 2: Create `cardStyle` Sanity Schema

**Files:**
- Create: `src/sanity/schemaTypes/documents/card-style.ts`
- Modify: `src/sanity/schemaTypes/index.ts` (add import + registration)
- Modify: `src/sanity/structure.ts` (add to sidebar)

**Step 1: Create the schema**

```typescript
// src/sanity/schemaTypes/documents/card-style.ts
import { defineType, defineField } from 'sanity'
import { SquareIcon } from '@sanity/icons'

export const cardStyle = defineType({
  name: 'cardStyle',
  title: 'Card Style',
  type: 'document',
  icon: SquareIcon,
  preview: {
    select: { title: 'name' },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Display name (e.g. "Blog Card", "Case Study Card")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'borderRadius',
      type: 'string',
      title: 'Border Radius',
      options: {
        layout: 'radio',
        list: [
          { title: 'None', value: 'none' },
          { title: 'Large (lg)', value: 'lg' },
          { title: 'Extra Large (xl)', value: 'xl' },
          { title: '2XL (2xl)', value: '2xl' },
        ],
      },
      initialValue: '2xl',
    }),
    defineField({
      name: 'padding',
      type: 'string',
      title: 'Padding',
      options: {
        layout: 'radio',
        list: [
          { title: 'Compact', value: 'compact' },
          { title: 'Default', value: 'default' },
          { title: 'Spacious', value: 'spacious' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'hoverEffect',
      type: 'string',
      title: 'Hover Effect',
      options: {
        layout: 'radio',
        list: [
          { title: 'Glow', value: 'glow' },
          { title: 'Lift', value: 'lift' },
          { title: 'Border', value: 'border' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'glow',
    }),
    defineField({
      name: 'accentColor',
      type: 'string',
      title: 'Accent Color',
      options: {
        layout: 'radio',
        list: [
          { title: 'Green', value: 'green' },
          { title: 'Teal', value: 'teal' },
          { title: 'Cyan', value: 'cyan' },
          { title: 'Amber', value: 'amber' },
        ],
      },
      initialValue: 'green',
    }),
    defineField({
      name: 'showBorder',
      type: 'boolean',
      title: 'Show Border',
      initialValue: true,
    }),
    defineField({
      name: 'imageAspect',
      type: 'string',
      title: 'Image Aspect Ratio',
      options: {
        layout: 'radio',
        list: [
          { title: 'Video (16:9)', value: 'video' },
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Wide (16:10)', value: 'wide' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'backgroundStyle',
      type: 'string',
      title: 'Background Style',
      options: {
        layout: 'radio',
        list: [
          { title: 'Surface', value: 'surface' },
          { title: 'Surface Alt', value: 'surface-alt' },
          { title: 'Transparent', value: 'transparent' },
        ],
      },
      initialValue: 'surface',
    }),
  ],
})
```

**Step 2: Register in schema index**

In `src/sanity/schemaTypes/index.ts`:
- Add import: `import { cardStyle } from './documents/card-style'`
- Add `cardStyle,` after `testimonial,` in the schemaTypes array (line ~54)

**Step 3: Add to Studio structure**

In `src/sanity/structure.ts`:
- Add `'cardStyle'` to the `MANUALLY_ORGANIZED` array
- Add a new list item after "Section Backgrounds":
```typescript
S.documentTypeListItem('cardStyle').title('Card Styles'),
```

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 5: Commit**

```bash
git add src/sanity/schemaTypes/documents/card-style.ts src/sanity/schemaTypes/index.ts src/sanity/structure.ts
git commit -m "feat: add cardStyle Sanity schema for CMS-driven card design"
```

---

## Task 3: Enhance `landingPage` Sanity Schema

Add template, verticals, client name, and hero override fields to the existing schema.

**Files:**
- Modify: `src/sanity/schemaTypes/documents/landing-page.ts`

**Step 1: Add the new fields**

Insert these fields after the existing `campaign` field (after line 42) and before the `status` field:

```typescript
defineField({
  name: 'clientName',
  type: 'string',
  title: 'Client Name',
  description: 'The prospect/client this page targets',
}),
defineField({
  name: 'template',
  type: 'string',
  title: 'Template',
  options: {
    layout: 'radio',
    list: [
      { title: 'Bold Hero', value: 'bold-hero' },
      { title: 'Minimal', value: 'minimal' },
      { title: 'Services Showcase', value: 'services-showcase' },
    ],
  },
  initialValue: 'bold-hero',
}),
defineField({
  name: 'verticals',
  type: 'array',
  title: 'Industry Verticals',
  description: 'Up to 3 verticals to filter content (case studies, posts, testimonials)',
  of: [{ type: 'string' }],
  options: {
    list: [
      { title: 'Healthcare', value: 'Healthcare' },
      { title: 'Automotive', value: 'Automotive' },
      { title: 'Sports', value: 'Sports' },
      { title: 'Technology', value: 'Technology' },
      { title: 'Finance', value: 'Finance' },
      { title: 'Retail', value: 'Retail' },
      { title: 'CPG', value: 'CPG' },
      { title: 'Entertainment', value: 'Entertainment' },
      { title: 'Education', value: 'Education' },
      { title: 'Real Estate', value: 'Real Estate' },
    ],
  },
  validation: (rule) => rule.max(3),
}),
defineField({
  name: 'heroHeading',
  type: 'string',
  title: 'Hero Heading',
  description: 'Custom hero heading (defaults to client name if empty)',
}),
defineField({
  name: 'heroSubheading',
  type: 'text',
  title: 'Hero Subheading',
  rows: 3,
}),
defineField({
  name: 'ctaLabel',
  type: 'string',
  title: 'CTA Label',
  initialValue: "Let's Talk",
}),
defineField({
  name: 'ctaHref',
  type: 'string',
  title: 'CTA Link',
  initialValue: '/contact',
}),
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/sanity/schemaTypes/documents/landing-page.ts
git commit -m "feat: enhance landingPage schema with template, verticals, hero overrides"
```

---

## Task 4: Add Queries + Types for Card Styles and Landing Pages

**Files:**
- Modify: `src/lib/sanity/queries.ts`

**Step 1: Add types and query functions**

Append to `src/lib/sanity/queries.ts` after the existing code:

```typescript
// ─── Card Style Types & Queries ──────────────────────────────────────────────

export interface CardStyleItem {
  _id: string;
  name: string;
  slug: string;
  borderRadius: string;
  padding: string;
  hoverEffect: string;
  accentColor: string;
  showBorder: boolean;
  imageAspect: string;
  backgroundStyle: string;
}

export async function getAllCardStyles(): Promise<CardStyleItem[]> {
  if (!client) return [];
  return client.fetch<CardStyleItem[]>(
    `*[_type == "cardStyle"] | order(name asc) {
      _id, name, "slug": slug.current,
      borderRadius, padding, hoverEffect, accentColor,
      showBorder, imageAspect, backgroundStyle
    }`
  );
}

export async function getCardStyleBySlug(slug: string): Promise<CardStyleItem | null> {
  if (!client) return null;
  return client.fetch<CardStyleItem | null>(
    `*[_type == "cardStyle" && slug.current == $slug][0] {
      _id, name, "slug": slug.current,
      borderRadius, padding, hoverEffect, accentColor,
      showBorder, imageAspect, backgroundStyle
    }`,
    { slug }
  );
}

// ─── Landing Page Types & Queries ────────────────────────────────────────────

export interface LandingPageListItem {
  _id: string;
  title: string;
  slug: string;
  clientName?: string;
  template?: string;
  verticals?: string[];
  status: string;
  campaign?: string;
}

export interface LandingPageDetail extends LandingPageListItem {
  heroHeading?: string;
  heroSubheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export async function getAllLandingPages(): Promise<LandingPageListItem[]> {
  if (!client) return [];
  return client.fetch<LandingPageListItem[]>(
    `*[_type == "landingPage"] | order(_createdAt desc) {
      _id, title, "slug": slug.current, clientName, template,
      verticals, status, campaign
    }`
  );
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPageDetail | null> {
  if (!client) return null;
  return client.fetch<LandingPageDetail | null>(
    `*[_type == "landingPage" && slug.current == $slug && status == "active"][0] {
      _id, title, "slug": slug.current, clientName, template,
      verticals, status, campaign,
      heroHeading, heroSubheading, ctaLabel, ctaHref
    }`,
    { slug }
  );
}

export async function getLandingPageForEdit(id: string): Promise<LandingPageDetail | null> {
  if (!client) return null;
  return client.fetch<LandingPageDetail | null>(
    `*[_type == "landingPage" && _id == $id][0] {
      _id, title, "slug": slug.current, clientName, template,
      verticals, status, campaign,
      heroHeading, heroSubheading, ctaLabel, ctaHref
    }`,
    { id }
  );
}

export async function getActiveLandingPageSlugs(): Promise<string[]> {
  if (!client) return [];
  return client.fetch<string[]>(
    `*[_type == "landingPage" && status == "active" && defined(slug.current)].slug.current`
  );
}

// ─── Vertical-Filtered Content Queries ───────────────────────────────────────

export async function getCaseStudiesByVerticals(verticals: string[]): Promise<CaseStudyListItem[]> {
  if (!client || verticals.length === 0) return [];
  const raw = await client.fetch<
    (Omit<CaseStudyListItem, "thumbnailUrl"> & { thumbnail?: SanityImageSource })[]
  >(
    `*[_type == "caseStudy" && category in $verticals] | order(order asc) {
      _id, title, "slug": slug.current, client, category, year, tags, shortDescription, thumbnail, order
    }`,
    { verticals }
  );
  return raw.map((cs) => ({
    _id: cs._id,
    title: cs.title,
    slug: cs.slug,
    client: cs.client,
    category: cs.category,
    year: cs.year,
    tags: cs.tags,
    shortDescription: cs.shortDescription,
    thumbnailUrl: cs.thumbnail
      ? urlFor(cs.thumbnail).width(800).quality(75).auto("format").url()
      : undefined,
    order: cs.order,
  }));
}

export async function getBlogPostsByVerticals(verticals: string[]): Promise<BlogPostListItem[]> {
  if (!client || verticals.length === 0) return [];
  return client.fetch<BlogPostListItem[]>(
    `*[_type == "blogPost" && tag in $verticals] | order(publishedAt desc)[0...6] {
      _id, title, "slug": slug.current, tag, excerpt, publishedAt
    }`,
    { verticals }
  );
}

export interface TestimonialItem {
  _id: string;
  quote: string;
  authorName: string;
  role?: string;
  company?: string;
}

export async function getTestimonialsByVerticals(verticals: string[]): Promise<TestimonialItem[]> {
  if (!client || verticals.length === 0) return [];
  return client.fetch<TestimonialItem[]>(
    `*[_type == "testimonial" && company in $verticals] {
      _id, quote, authorName, role, company
    }`,
    { verticals }
  );
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/lib/sanity/queries.ts
git commit -m "feat: add queries for card styles, landing pages, and vertical-filtered content"
```

---

## Task 5: Create Server Actions for Sanity Mutations

**Files:**
- Create: `src/app/actions/sanity.ts`

**Step 1: Create the server actions file**

```typescript
// src/app/actions/sanity.ts
"use server";

import { writeClient } from "@/lib/sanity/write-client";
import { revalidatePath } from "next/cache";

// ─── Card Style Actions ──────────────────────────────────────────────────────

interface CardStyleData {
  name: string;
  slug: string;
  borderRadius: string;
  padding: string;
  hoverEffect: string;
  accentColor: string;
  showBorder: boolean;
  imageAspect: string;
  backgroundStyle: string;
}

export async function upsertCardStyle(data: CardStyleData, existingId?: string) {
  const doc = {
    _type: "cardStyle" as const,
    name: data.name,
    slug: { _type: "slug" as const, current: data.slug },
    borderRadius: data.borderRadius,
    padding: data.padding,
    hoverEffect: data.hoverEffect,
    accentColor: data.accentColor,
    showBorder: data.showBorder,
    imageAspect: data.imageAspect,
    backgroundStyle: data.backgroundStyle,
  };

  if (existingId) {
    await writeClient.patch(existingId).set(doc).commit();
  } else {
    await writeClient.create(doc);
  }

  revalidatePath("/card-designer");
}

export async function deleteCardStyle(id: string) {
  await writeClient.delete(id);
  revalidatePath("/card-designer");
}

// ─── Landing Page Actions ────────────────────────────────────────────────────

interface LandingPageData {
  title: string;
  slug: string;
  clientName: string;
  template: string;
  verticals: string[];
  heroHeading?: string;
  heroSubheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  campaign?: string;
}

export async function createLandingPage(data: LandingPageData) {
  const doc = {
    _type: "landingPage" as const,
    title: data.title,
    slug: { _type: "slug" as const, current: data.slug },
    clientName: data.clientName,
    template: data.template,
    verticals: data.verticals,
    status: "draft",
    heroHeading: data.heroHeading || undefined,
    heroSubheading: data.heroSubheading || undefined,
    ctaLabel: data.ctaLabel || "Let's Talk",
    ctaHref: data.ctaHref || "/contact",
    campaign: data.campaign || undefined,
    content: [],
  };

  const result = await writeClient.create(doc);
  revalidatePath("/landing-pages");
  revalidatePath(`/${data.slug}`);
  return result._id;
}

export async function updateLandingPage(id: string, data: Partial<LandingPageData>) {
  const patch: Record<string, unknown> = {};
  if (data.title !== undefined) patch.title = data.title;
  if (data.slug !== undefined) patch.slug = { _type: "slug", current: data.slug };
  if (data.clientName !== undefined) patch.clientName = data.clientName;
  if (data.template !== undefined) patch.template = data.template;
  if (data.verticals !== undefined) patch.verticals = data.verticals;
  if (data.heroHeading !== undefined) patch.heroHeading = data.heroHeading;
  if (data.heroSubheading !== undefined) patch.heroSubheading = data.heroSubheading;
  if (data.ctaLabel !== undefined) patch.ctaLabel = data.ctaLabel;
  if (data.ctaHref !== undefined) patch.ctaHref = data.ctaHref;
  if (data.campaign !== undefined) patch.campaign = data.campaign;

  await writeClient.patch(id).set(patch).commit();
  revalidatePath("/landing-pages");
  if (data.slug) revalidatePath(`/${data.slug}`);
}

export async function toggleLandingPageStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === "active" ? "draft" : "active";
  await writeClient.patch(id).set({ status: newStatus }).commit();
  revalidatePath("/landing-pages");
}

export async function deleteLandingPage(id: string) {
  await writeClient.delete(id);
  revalidatePath("/landing-pages");
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/app/actions/sanity.ts
git commit -m "feat: add server actions for card style and landing page CRUD"
```

---

## Task 6: Build `<StyledCard>` Component

The reusable component that reads card style config and maps it to Tailwind classes.

**Files:**
- Create: `src/components/ui/StyledCard.tsx`

**Step 1: Create the component**

```typescript
// src/components/ui/StyledCard.tsx
import type { CardStyleItem } from "@/lib/sanity/queries";

const RADIUS_MAP: Record<string, string> = {
  none: "rounded-none",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const PADDING_MAP: Record<string, string> = {
  compact: "p-3",
  default: "p-6",
  spacious: "p-8",
};

const BG_MAP: Record<string, string> = {
  surface: "bg-sgwx-surface",
  "surface-alt": "bg-sgwx-bg-alt",
  transparent: "bg-transparent",
};

const ACCENT_BORDER_MAP: Record<string, string> = {
  green: "hover:border-sgwx-green/30",
  teal: "hover:border-sgwx-teal/30",
  cyan: "hover:border-sgwx-cyan/30",
  amber: "hover:border-sgwx-yellow/30",
};

const HOVER_MAP: Record<string, string> = {
  glow: "transition-all duration-300 hover:bg-sgwx-surface-hover hover:shadow-[0_0_30px_rgba(110,168,127,0.08)]",
  lift: "transition-all duration-300 hover:bg-sgwx-surface-hover hover:-translate-y-1",
  border: "transition-all duration-300 hover:bg-sgwx-surface-hover",
  none: "",
};

const IMAGE_ASPECT_MAP: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  none: "",
};

interface StyledCardProps {
  style: CardStyleItem;
  children: React.ReactNode;
  className?: string;
  imagePlaceholder?: boolean;
}

export default function StyledCard({ style, children, className = "", imagePlaceholder = false }: StyledCardProps) {
  const radius = RADIUS_MAP[style.borderRadius] || RADIUS_MAP["2xl"];
  const padding = PADDING_MAP[style.padding] || PADDING_MAP["default"];
  const bg = BG_MAP[style.backgroundStyle] || BG_MAP["surface"];
  const border = style.showBorder ? "border border-sgwx-border" : "";
  const accentBorder = ACCENT_BORDER_MAP[style.accentColor] || ACCENT_BORDER_MAP["green"];
  const hover = HOVER_MAP[style.hoverEffect] || "";
  const hoverBorder = style.hoverEffect !== "none" ? accentBorder : "";
  const imageAspect = IMAGE_ASPECT_MAP[style.imageAspect] || "";

  return (
    <div className={`${radius} ${padding} ${bg} ${border} ${hover} ${hoverBorder} ${className}`}>
      {imagePlaceholder && imageAspect && (
        <div className={`mb-4 ${imageAspect} rounded-lg bg-sgwx-bg`} />
      )}
      {children}
    </div>
  );
}

export { RADIUS_MAP, PADDING_MAP, BG_MAP, ACCENT_BORDER_MAP, HOVER_MAP, IMAGE_ASPECT_MAP };
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/components/ui/StyledCard.tsx
git commit -m "feat: add StyledCard component with CMS-driven style mapping"
```

---

## Task 7: Build Card Designer Page

**Files:**
- Create: `src/app/card-designer/page.tsx`
- Create: `src/app/card-designer/CardDesignerClient.tsx`

**Step 1: Create server page**

```typescript
// src/app/card-designer/page.tsx
import type { Metadata } from "next";
import { getAllCardStyles } from "@/lib/sanity/queries";
import CardDesignerClient from "./CardDesignerClient";

export const metadata: Metadata = {
  title: "Card Designer",
  description: "Visual card style editor — adjust and save card component styles.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CardDesignerPage() {
  const styles = await getAllCardStyles();
  return <CardDesignerClient initialStyles={styles} />;
}
```

**Step 2: Create client component**

This is a large client component. It has:
- Left sidebar: list of saved styles + "New Style" button
- Right panel: live preview card + control form
- Save/delete actions via server actions

```typescript
// src/app/card-designer/CardDesignerClient.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StyledCard, {
  RADIUS_MAP,
  PADDING_MAP,
  BG_MAP,
  HOVER_MAP,
  IMAGE_ASPECT_MAP,
} from "@/components/ui/StyledCard";
import { upsertCardStyle, deleteCardStyle } from "@/app/actions/sanity";
import type { CardStyleItem } from "@/lib/sanity/queries";

const DEFAULT_STYLE: Omit<CardStyleItem, "_id" | "name" | "slug"> = {
  borderRadius: "2xl",
  padding: "default",
  hoverEffect: "glow",
  accentColor: "green",
  showBorder: true,
  imageAspect: "none",
  backgroundStyle: "surface",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

function RadioGroup({ label, value, onChange, options }: RadioGroupProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
              value === opt.value
                ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-green"
                : "border-sgwx-border bg-sgwx-surface text-sgwx-text-muted hover:border-sgwx-green/30"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function CardDesignerClient({ initialStyles }: { initialStyles: CardStyleItem[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [styles, setStyles] = useState(initialStyles);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState(DEFAULT_STYLE);

  const selectedStyle = styles.find((s) => s._id === selectedId);

  function loadStyle(style: CardStyleItem) {
    setSelectedId(style._id);
    setName(style.name);
    setCurrent({
      borderRadius: style.borderRadius || "2xl",
      padding: style.padding || "default",
      hoverEffect: style.hoverEffect || "glow",
      accentColor: style.accentColor || "green",
      showBorder: style.showBorder ?? true,
      imageAspect: style.imageAspect || "none",
      backgroundStyle: style.backgroundStyle || "surface",
    });
  }

  function resetToNew() {
    setSelectedId(null);
    setName("");
    setCurrent(DEFAULT_STYLE);
  }

  function handleSave() {
    if (!name.trim()) return;
    const slug = slugify(name);
    startTransition(async () => {
      await upsertCardStyle(
        { name, slug, ...current },
        selectedId || undefined
      );
      router.refresh();
    });
  }

  function handleDelete() {
    if (!selectedId) return;
    if (!confirm("Delete this card style?")) return;
    startTransition(async () => {
      await deleteCardStyle(selectedId);
      resetToNew();
      router.refresh();
    });
  }

  // Build a preview CardStyleItem from current state
  const previewStyle: CardStyleItem = {
    _id: selectedId || "preview",
    name: name || "Preview",
    slug: slugify(name || "preview"),
    ...current,
  };

  return (
    <div className="min-h-screen bg-sgwx-bg pt-8">
      <Container>
        <h1 className="text-4xl font-thin tracking-tight text-sgwx-text">
          Card Designer
        </h1>
        <p className="mt-2 text-sgwx-text-muted">
          Adjust card styles visually and save them to the design system.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* ── Sidebar: Saved Styles ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Saved Styles
              </h2>
              <button
                onClick={resetToNew}
                className="text-xs text-sgwx-green hover:text-sgwx-green-bright"
              >
                + New
              </button>
            </div>
            {styles.map((style) => (
              <button
                key={style._id}
                onClick={() => loadStyle(style)}
                className={`block w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                  selectedId === style._id
                    ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-text"
                    : "border-sgwx-border bg-sgwx-surface text-sgwx-text-muted hover:border-sgwx-green/30"
                }`}
              >
                {style.name}
                <span className="block font-mono text-[10px] text-sgwx-text-dim">
                  {style.slug}
                </span>
              </button>
            ))}
            {styles.length === 0 && (
              <p className="text-xs text-sgwx-text-dim">No saved styles yet.</p>
            )}
          </div>

          {/* ── Main: Preview + Controls ── */}
          <div className="space-y-8">
            {/* Name input */}
            <div>
              <label className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Style Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Blog Card"
                className="mt-2 block w-full max-w-md rounded-lg border border-sgwx-border bg-sgwx-surface px-4 py-2 text-sm text-sgwx-text placeholder:text-sgwx-text-dim focus:border-sgwx-green focus:outline-none"
              />
            </div>

            {/* Live Preview */}
            <div>
              <h2 className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Live Preview
              </h2>
              <div className="max-w-sm">
                <StyledCard style={previewStyle} imagePlaceholder>
                  <Badge variant="neutral">Category</Badge>
                  <h3 className="mt-3 text-lg font-semibold text-sgwx-text">
                    Card Title
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                    This is a preview of your card style with sample content to
                    show how it looks with real text.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sgwx-green">
                    Read More <span aria-hidden="true">&rarr;</span>
                  </span>
                </StyledCard>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <RadioGroup
                label="Border Radius"
                value={current.borderRadius}
                onChange={(v) => setCurrent((c) => ({ ...c, borderRadius: v }))}
                options={[
                  { label: "None", value: "none" },
                  { label: "Large", value: "lg" },
                  { label: "XL", value: "xl" },
                  { label: "2XL", value: "2xl" },
                ]}
              />
              <RadioGroup
                label="Padding"
                value={current.padding}
                onChange={(v) => setCurrent((c) => ({ ...c, padding: v }))}
                options={[
                  { label: "Compact", value: "compact" },
                  { label: "Default", value: "default" },
                  { label: "Spacious", value: "spacious" },
                ]}
              />
              <RadioGroup
                label="Hover Effect"
                value={current.hoverEffect}
                onChange={(v) => setCurrent((c) => ({ ...c, hoverEffect: v }))}
                options={[
                  { label: "Glow", value: "glow" },
                  { label: "Lift", value: "lift" },
                  { label: "Border", value: "border" },
                  { label: "None", value: "none" },
                ]}
              />
              <RadioGroup
                label="Accent Color"
                value={current.accentColor}
                onChange={(v) => setCurrent((c) => ({ ...c, accentColor: v }))}
                options={[
                  { label: "Green", value: "green" },
                  { label: "Teal", value: "teal" },
                  { label: "Cyan", value: "cyan" },
                  { label: "Amber", value: "amber" },
                ]}
              />
              <RadioGroup
                label="Image Aspect"
                value={current.imageAspect}
                onChange={(v) => setCurrent((c) => ({ ...c, imageAspect: v }))}
                options={[
                  { label: "Video (16:9)", value: "video" },
                  { label: "Square", value: "square" },
                  { label: "Wide (16:10)", value: "wide" },
                  { label: "None", value: "none" },
                ]}
              />
              <RadioGroup
                label="Background"
                value={current.backgroundStyle}
                onChange={(v) => setCurrent((c) => ({ ...c, backgroundStyle: v }))}
                options={[
                  { label: "Surface", value: "surface" },
                  { label: "Surface Alt", value: "surface-alt" },
                  { label: "Transparent", value: "transparent" },
                ]}
              />
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                  Show Border
                </span>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => ({ ...c, showBorder: !c.showBorder }))}
                  className={`flex h-8 w-14 items-center rounded-full border transition-colors ${
                    current.showBorder
                      ? "border-sgwx-green bg-sgwx-green/20 justify-end"
                      : "border-sgwx-border bg-sgwx-surface justify-start"
                  }`}
                >
                  <span className={`mx-1 h-5 w-5 rounded-full transition-colors ${
                    current.showBorder ? "bg-sgwx-green" : "bg-sgwx-text-dim"
                  }`} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 border-t border-sgwx-border pt-6">
              <button
                onClick={handleSave}
                disabled={isPending || !name.trim()}
                className="rounded-lg bg-sgwx-green px-6 py-2 text-sm font-medium text-sgwx-bg transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {isPending ? "Saving..." : selectedId ? "Update Style" : "Save Style"}
              </button>
              {selectedId && (
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-40"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 4: Commit**

```bash
git add src/app/card-designer/
git commit -m "feat: build card designer page with live preview and Sanity persistence"
```

---

## Task 8: Build Landing Page Templates

Create the three template components that render landing page content.

**Files:**
- Create: `src/components/landing-pages/BoldHeroTemplate.tsx`
- Create: `src/components/landing-pages/MinimalTemplate.tsx`
- Create: `src/components/landing-pages/ServicesShowcaseTemplate.tsx`

**Step 1: Create Bold Hero template**

```typescript
// src/components/landing-pages/BoldHeroTemplate.tsx
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { LandingPageDetail, CaseStudyListItem, TestimonialItem } from "@/lib/sanity/queries";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

interface BoldHeroTemplateProps {
  page: LandingPageDetail;
  caseStudies: CaseStudyListItem[];
  testimonials: TestimonialItem[];
}

export default function BoldHeroTemplate({ page, caseStudies, testimonials }: BoldHeroTemplateProps) {
  const heading = page.heroHeading || `Built for ${page.clientName || "You"}`;
  const subheading = page.heroSubheading || "See how Sageworx delivers results in your industry.";

  return (
    <div className="bg-sgwx-bg">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-sgwx-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-sgwx-green/5 via-transparent to-sgwx-teal/5" />
        <Container>
          <motion.div className="max-w-3xl" {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {page.clientName && (
              <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Prepared for {page.clientName}
              </p>
            )}
            <h1 className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl lg:text-7xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted md:text-xl">
              {subheading}
            </p>
            <div className="mt-10">
              <Button href={page.ctaHref || "/contact"}>
                {page.ctaLabel || "Let's Talk"}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Stats */}
      {page.verticals && page.verticals.length > 0 && (
        <section className="border-t border-sgwx-border py-16">
          <Container>
            <AnimatedSection>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card hover={false}>
                  <p className="font-mono text-3xl font-thin text-sgwx-green">{caseStudies.length}+</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Projects in your verticals</p>
                </Card>
                <Card hover={false}>
                  <p className="font-mono text-3xl font-thin text-sgwx-green">100+</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Senior experts in our network</p>
                </Card>
                <Card hover={false}>
                  <p className="font-mono text-3xl font-thin text-sgwx-green">24h</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Average team assembly time</p>
                </Card>
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Relevant Work
              </p>
              <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
                Results in Your Industry
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {caseStudies.slice(0, 4).map((cs) => (
                  <CaseStudyCard
                    key={cs._id}
                    category={cs.category}
                    title={cs.title}
                    description={cs.shortDescription}
                    href={`/work/${cs.slug}`}
                    thumbnailUrl={cs.thumbnailUrl}
                  />
                ))}
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <blockquote className="max-w-3xl">
                <p className="text-xl font-light italic leading-relaxed text-sgwx-text md:text-2xl">
                  &ldquo;{testimonials[0].quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="text-sm text-sgwx-text">{testimonials[0].authorName}</p>
                  {testimonials[0].role && (
                    <p className="mt-0.5 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                      {testimonials[0].role}{testimonials[0].company ? ` — ${testimonials[0].company}` : ""}
                    </p>
                  )}
                </footer>
              </blockquote>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
                Ready to go further, faster?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sgwx-text-muted">
                Let&apos;s build a team around your next challenge.
              </p>
              <div className="mt-8">
                <Button href={page.ctaHref || "/contact"}>
                  {page.ctaLabel || "Let's Talk"}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
```

**Step 2: Create Minimal template**

```typescript
// src/components/landing-pages/MinimalTemplate.tsx
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { LandingPageDetail, BlogPostListItem, TestimonialItem } from "@/lib/sanity/queries";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

interface MinimalTemplateProps {
  page: LandingPageDetail;
  blogPosts: BlogPostListItem[];
  testimonials: TestimonialItem[];
}

export default function MinimalTemplate({ page, blogPosts, testimonials }: MinimalTemplateProps) {
  const heading = page.heroHeading || page.clientName || "Go Further. Faster.";
  const subheading = page.heroSubheading || "We bring together seasoned experts — bespoke teams who understand your work, thrive on the challenge, and deliver when it counts.";

  return (
    <div className="bg-sgwx-bg">
      {/* Hero */}
      <section className="flex min-h-[60vh] items-center py-20">
        <Container>
          <motion.div className="max-w-2xl" {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {page.clientName && (
              <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                For {page.clientName}
              </p>
            )}
            <h1 className="text-4xl font-thin tracking-tight text-sgwx-text md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-sgwx-text-muted">
              {subheading}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Value Prop Split */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                  The Sageworx Difference
                </p>
                <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text">
                  Stop resetting. Start building.
                </h2>
                <p className="mt-4 text-sgwx-text-muted leading-relaxed">
                  Traditional agencies spin up junior teams per project. Freelancers leave you managing chaos. Sageworx brings together senior, bespoke teams who already know how to work together.
                </p>
              </div>
              <div className="space-y-4">
                {["Skip the learning curve", "Senior talent from day one", "Continuity without overhead"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-sgwx-border p-4">
                    <span className="mt-0.5 text-sgwx-green">&#10003;</span>
                    <span className="text-sm text-sgwx-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {testimonials.slice(0, 2).map((t) => (
                  <Card key={t._id} hover={false}>
                    <p className="text-sm italic leading-relaxed text-sgwx-text-muted">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-4 text-sm font-medium text-sgwx-text">{t.authorName}</p>
                    {t.role && (
                      <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                        {t.role}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="border-t border-sgwx-border py-20">
          <Container>
            <AnimatedSection>
              <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Insights
              </p>
              <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text">
                Thinking in Your Space
              </h2>
              <div className="mt-8 space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <a
                    key={post._id}
                    href={`/spotlights/${post.slug}`}
                    className="block rounded-lg border border-sgwx-border p-6 transition-colors hover:border-sgwx-green/30 hover:bg-sgwx-surface"
                  >
                    <span className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                      {post.tag}
                    </span>
                    <h3 className="mt-1 text-lg font-normal text-sgwx-text">{post.title}</h3>
                    <p className="mt-2 text-sm text-sgwx-text-muted">{post.excerpt}</p>
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-3xl font-thin tracking-tight text-sgwx-text">
              Let&apos;s talk about what&apos;s next.
            </h2>
            <div className="mt-8">
              <Button href={page.ctaHref || "/contact"}>
                {page.ctaLabel || "Let's Talk"}
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
```

**Step 3: Create Services Showcase template**

```typescript
// src/components/landing-pages/ServicesShowcaseTemplate.tsx
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { LandingPageDetail, CaseStudyListItem } from "@/lib/sanity/queries";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const SERVICES = [
  { title: "Brand Strategy", desc: "Position, message, and differentiate your brand in a crowded market." },
  { title: "Content & Creative", desc: "Campaigns, assets, and storytelling that move people to act." },
  { title: "Digital Experience", desc: "Websites, apps, and platforms built for conversion and scale." },
  { title: "Growth Marketing", desc: "Data-driven acquisition, retention, and lifecycle marketing." },
  { title: "Research & Insights", desc: "Customer research, competitive analysis, and market intelligence." },
  { title: "Production & Operations", desc: "Efficient workflows, tooling, and delivery at scale." },
];

const COMPARISON = [
  { criteria: "Team seniority", traditional: "Junior-heavy", freelancers: "Varies", sageworx: "100% Senior" },
  { criteria: "Ramp time", traditional: "4-8 weeks", freelancers: "1-2 weeks", sageworx: "Days" },
  { criteria: "Team continuity", traditional: "Low", freelancers: "None", sageworx: "High" },
  { criteria: "Overhead cost", traditional: "High", freelancers: "Low", sageworx: "Moderate" },
  { criteria: "Strategic depth", traditional: "Siloed", freelancers: "Limited", sageworx: "Integrated" },
];

interface ServicesShowcaseTemplateProps {
  page: LandingPageDetail;
  caseStudies: CaseStudyListItem[];
}

export default function ServicesShowcaseTemplate({ page, caseStudies }: ServicesShowcaseTemplateProps) {
  const heading = page.heroHeading || "Full-Service, Senior-Led, Built to Deliver";
  const subheading = page.heroSubheading || "The services you need, the talent you deserve.";

  return (
    <div className="bg-sgwx-bg">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sgwx-teal/5 via-transparent to-sgwx-green/5" />
        <Container>
          <motion.div className="max-w-3xl" {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {page.clientName && (
              <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                Services for {page.clientName}
              </p>
            )}
            <h1 className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted">
              {subheading}
            </p>
            <div className="mt-10">
              <Button href={page.ctaHref || "/contact"}>
                {page.ctaLabel || "Let's Talk"}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
              Capabilities
            </p>
            <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
              What We Bring
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((svc) => (
                <Card key={svc.title}>
                  <h3 className="text-lg font-semibold text-sgwx-text">{svc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">{svc.desc}</p>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
              Why Sageworx
            </p>
            <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text">
              How We Compare
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sgwx-border text-left">
                    <th className="py-3 pr-6 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Criteria</th>
                    <th className="py-3 pr-6 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Traditional Agency</th>
                    <th className="py-3 pr-6 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Freelancers</th>
                    <th className="py-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Sageworx</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.criteria} className="border-b border-sgwx-border-subtle">
                      <td className="py-3 pr-6 text-sgwx-text">{row.criteria}</td>
                      <td className="py-3 pr-6 text-sgwx-text-muted">{row.traditional}</td>
                      <td className="py-3 pr-6 text-sgwx-text-muted">{row.freelancers}</td>
                      <td className="py-3 font-medium text-sgwx-green">{row.sageworx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
                Ready to see the difference?
              </h2>
              <div className="mt-8">
                <Button href={page.ctaHref || "/contact"}>
                  {page.ctaLabel || "Let's Talk"}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
```

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 5: Commit**

```bash
git add src/components/landing-pages/
git commit -m "feat: add three landing page templates (bold-hero, minimal, services-showcase)"
```

---

## Task 9: Build Landing Page Dashboard

**Files:**
- Create: `src/app/landing-pages/page.tsx`
- Create: `src/app/landing-pages/LandingPagesClient.tsx`

**Step 1: Create server page**

```typescript
// src/app/landing-pages/page.tsx
import type { Metadata } from "next";
import { getAllLandingPages } from "@/lib/sanity/queries";
import LandingPagesClient from "./LandingPagesClient";

export const metadata: Metadata = {
  title: "Landing Pages",
  description: "Create and manage prospect landing pages.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LandingPagesPage() {
  const pages = await getAllLandingPages();
  return <LandingPagesClient initialPages={pages} />;
}
```

**Step 2: Create client component**

This is the main dashboard with page list + creation wizard. It includes:
- Table of existing landing pages with status badges and action buttons
- "New Landing Page" wizard with template picker, client name/slug inputs, and vertical selector

```typescript
// src/app/landing-pages/LandingPagesClient.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  createLandingPage,
  updateLandingPage,
  toggleLandingPageStatus,
  deleteLandingPage,
} from "@/app/actions/sanity";
import type { LandingPageListItem } from "@/lib/sanity/queries";

const TEMPLATES = [
  {
    value: "bold-hero",
    label: "Bold Hero",
    desc: "Full-bleed hero, stats, case studies, CTA",
  },
  {
    value: "minimal",
    label: "Minimal",
    desc: "Clean text, value prop, testimonials, insights",
  },
  {
    value: "services-showcase",
    label: "Services Showcase",
    desc: "Services grid, comparison table, CTA",
  },
];

const VERTICALS = [
  "Healthcare", "Automotive", "Sports", "Technology", "Finance",
  "Retail", "CPG", "Entertainment", "Education", "Real Estate",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function LandingPagesClient({ initialPages }: { initialPages: LandingPageListItem[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showWizard, setShowWizard] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Wizard state
  const [template, setTemplate] = useState("bold-hero");
  const [clientName, setClientName] = useState("");
  const [slug, setSlug] = useState("");
  const [verticals, setVerticals] = useState<string[]>([]);
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");

  function resetWizard() {
    setTemplate("bold-hero");
    setClientName("");
    setSlug("");
    setVerticals([]);
    setHeroHeading("");
    setHeroSubheading("");
    setShowWizard(false);
    setEditId(null);
  }

  function toggleVertical(v: string) {
    setVerticals((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : prev.length < 3 ? [...prev, v] : prev
    );
  }

  function handleCreate() {
    if (!clientName.trim() || !slug.trim()) return;
    startTransition(async () => {
      await createLandingPage({
        title: `${clientName} Landing Page`,
        slug,
        clientName,
        template,
        verticals,
        heroHeading: heroHeading || undefined,
        heroSubheading: heroSubheading || undefined,
      });
      resetWizard();
      router.refresh();
    });
  }

  function handleToggle(page: LandingPageListItem) {
    startTransition(async () => {
      await toggleLandingPageStatus(page._id, page.status);
      router.refresh();
    });
  }

  function handleDelete(page: LandingPageListItem) {
    if (!confirm(`Delete "${page.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteLandingPage(page._id);
      router.refresh();
    });
  }

  function handleEdit(page: LandingPageListItem) {
    setEditId(page._id);
    setClientName(page.clientName || "");
    setSlug(page.slug);
    setTemplate(page.template || "bold-hero");
    setVerticals(page.verticals || []);
    setShowWizard(true);
  }

  function handleUpdate() {
    if (!editId || !clientName.trim() || !slug.trim()) return;
    startTransition(async () => {
      await updateLandingPage(editId, {
        title: `${clientName} Landing Page`,
        slug,
        clientName,
        template,
        verticals,
        heroHeading: heroHeading || undefined,
        heroSubheading: heroSubheading || undefined,
      });
      resetWizard();
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-sgwx-bg pt-8">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-thin tracking-tight text-sgwx-text">
              Landing Pages
            </h1>
            <p className="mt-2 text-sgwx-text-muted">
              Create and manage prospect-facing landing pages.
            </p>
          </div>
          <button
            onClick={() => { resetWizard(); setShowWizard(true); }}
            className="rounded-lg bg-sgwx-green px-4 py-2 text-sm font-medium text-sgwx-bg transition-opacity hover:opacity-90"
          >
            + New
          </button>
        </div>

        {/* ── Pages Table ── */}
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sgwx-border text-left">
                <th className="py-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Slug</th>
                <th className="py-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Client</th>
                <th className="py-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Template</th>
                <th className="py-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Verticals</th>
                <th className="py-3 pr-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Status</th>
                <th className="py-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialPages.map((page) => (
                <tr key={page._id} className="border-b border-sgwx-border-subtle">
                  <td className="py-3 pr-4">
                    <a
                      href={`/${page.slug}`}
                      className="text-sgwx-green hover:text-sgwx-green-bright"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      /{page.slug}
                    </a>
                  </td>
                  <td className="py-3 pr-4 text-sgwx-text">{page.clientName || "—"}</td>
                  <td className="py-3 pr-4 text-sgwx-text-muted">{page.template || "—"}</td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-1">
                      {(page.verticals || []).map((v) => (
                        <span key={v} className="rounded-full border border-sgwx-border px-2 py-0.5 text-[10px] text-sgwx-text-muted">
                          {v}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={page.status === "active" ? "green" : "neutral"}>
                      {page.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(page)}
                        disabled={isPending}
                        className="text-xs text-sgwx-text-muted hover:text-sgwx-text"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggle(page)}
                        disabled={isPending}
                        className="text-xs text-sgwx-text-muted hover:text-sgwx-text"
                      >
                        {page.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(page)}
                        disabled={isPending}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {initialPages.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sgwx-text-dim">
                    No landing pages yet. Click &quot;+ New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Creation Wizard ── */}
        {showWizard && (
          <div className="mt-10 rounded-2xl border border-sgwx-border bg-sgwx-surface p-8">
            <h2 className="text-2xl font-thin text-sgwx-text">
              {editId ? "Edit Landing Page" : "New Landing Page"}
            </h2>

            {/* Template Selection */}
            <div className="mt-8">
              <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                1. Choose Template
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTemplate(t.value)}
                    className={`rounded-lg border p-4 text-left transition-colors ${
                      template === t.value
                        ? "border-sgwx-green bg-sgwx-green/10"
                        : "border-sgwx-border hover:border-sgwx-green/30"
                    }`}
                  >
                    <p className="font-semibold text-sgwx-text">{t.label}</p>
                    <p className="mt-1 text-xs text-sgwx-text-muted">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Client + Slug */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                  2. Client Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (!editId) setSlug(slugify(e.target.value));
                  }}
                  placeholder="e.g. Coca-Cola"
                  className="mt-2 block w-full rounded-lg border border-sgwx-border bg-sgwx-bg px-4 py-2 text-sm text-sgwx-text placeholder:text-sgwx-text-dim focus:border-sgwx-green focus:outline-none"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                  URL Slug
                </label>
                <div className="mt-2 flex items-center rounded-lg border border-sgwx-border bg-sgwx-bg">
                  <span className="pl-4 text-sm text-sgwx-text-dim">sgwx.vercel.app/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    className="flex-1 bg-transparent px-1 py-2 text-sm text-sgwx-text focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Verticals */}
            <div className="mt-8">
              <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                3. Industry Verticals (up to 3)
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {VERTICALS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => toggleVertical(v)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      verticals.includes(v)
                        ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-green"
                        : "border-sgwx-border text-sgwx-text-muted hover:border-sgwx-green/30"
                    } ${!verticals.includes(v) && verticals.length >= 3 ? "opacity-30 cursor-not-allowed" : ""}`}
                    disabled={!verticals.includes(v) && verticals.length >= 3}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Overrides (optional) */}
            <div className="mt-8">
              <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                Hero Overrides (optional)
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  value={heroHeading}
                  onChange={(e) => setHeroHeading(e.target.value)}
                  placeholder="Custom hero heading"
                  className="rounded-lg border border-sgwx-border bg-sgwx-bg px-4 py-2 text-sm text-sgwx-text placeholder:text-sgwx-text-dim focus:border-sgwx-green focus:outline-none"
                />
                <input
                  type="text"
                  value={heroSubheading}
                  onChange={(e) => setHeroSubheading(e.target.value)}
                  placeholder="Custom hero subheading"
                  className="rounded-lg border border-sgwx-border bg-sgwx-bg px-4 py-2 text-sm text-sgwx-text placeholder:text-sgwx-text-dim focus:border-sgwx-green focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={editId ? handleUpdate : handleCreate}
                disabled={isPending || !clientName.trim() || !slug.trim()}
                className="rounded-lg bg-sgwx-green px-6 py-2 text-sm font-medium text-sgwx-bg transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                {isPending ? "Saving..." : editId ? "Update" : "Create Landing Page"}
              </button>
              <button
                onClick={resetWizard}
                className="rounded-lg border border-sgwx-border px-4 py-2 text-sm text-sgwx-text-muted hover:text-sgwx-text"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 4: Commit**

```bash
git add src/app/landing-pages/
git commit -m "feat: build landing page dashboard with creation wizard and management actions"
```

---

## Task 10: Build Dynamic `[slug]` Route for Landing Pages

**Files:**
- Create: `src/app/[slug]/page.tsx`

**Step 1: Create the dynamic route**

This route catches all top-level slugs, queries Sanity for an active landing page, and renders the appropriate template. If no match is found, it returns 404.

Important: This must NOT conflict with existing static routes (model, process, members, work, spotlights, studio, style-guide, animations, card-designer, landing-pages, work-placeholders).

```typescript
// src/app/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getLandingPageBySlug,
  getActiveLandingPageSlugs,
  getCaseStudiesByVerticals,
  getBlogPostsByVerticals,
  getTestimonialsByVerticals,
} from "@/lib/sanity/queries";
import BoldHeroTemplate from "@/components/landing-pages/BoldHeroTemplate";
import MinimalTemplate from "@/components/landing-pages/MinimalTemplate";
import ServicesShowcaseTemplate from "@/components/landing-pages/ServicesShowcaseTemplate";

// Static routes that must NOT be handled by this catch-all
const RESERVED_SLUGS = [
  "model", "process", "members", "work", "spotlights", "studio",
  "style-guide", "animations", "card-designer", "landing-pages",
  "work-placeholders", "api", "admin",
];

export async function generateStaticParams() {
  const slugs = await getActiveLandingPageSlugs();
  return slugs
    .filter((slug) => !RESERVED_SLUGS.includes(slug))
    .map((slug) => ({ slug }));
}

interface LandingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.includes(slug)) return {};
  const page = await getLandingPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.clientName ? `${page.clientName} — Sageworx` : page.title,
    description: page.heroSubheading || `Custom landing page for ${page.clientName || slug}`,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug)) {
    notFound();
  }

  const page = await getLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const verticals = page.verticals || [];

  // Fetch content filtered by verticals
  const [caseStudies, blogPosts, testimonials] = await Promise.all([
    getCaseStudiesByVerticals(verticals),
    getBlogPostsByVerticals(verticals),
    getTestimonialsByVerticals(verticals),
  ]);

  switch (page.template) {
    case "minimal":
      return <MinimalTemplate page={page} blogPosts={blogPosts} testimonials={testimonials} />;
    case "services-showcase":
      return <ServicesShowcaseTemplate page={page} caseStudies={caseStudies} />;
    case "bold-hero":
    default:
      return <BoldHeroTemplate page={page} caseStudies={caseStudies} testimonials={testimonials} />;
  }
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/app/[slug]/
git commit -m "feat: add dynamic [slug] route for public landing pages with template rendering"
```

---

## Task 11: Deploy Schema and Verify Build

**Step 1: Deploy updated schemas to Sanity cloud**

Run: `npx sanity@latest schema deploy`

This pushes the new `cardStyle` schema and enhanced `landingPage` schema to the Sanity API.

**Step 2: Verify full build**

Run: `npx tsc --noEmit`
Expected: Clean compile.

Run: `npm run build` (or `next build`)
Expected: Successful build. The `[slug]` route should appear in the build output as a dynamic route.

**Step 3: Commit any adjustments**

If the build reveals issues, fix them and commit.

**Step 4: Final commit + push**

```bash
git push
```

---

## Verification Checklist

- [ ] `/card-designer` loads with empty state, allows creating a new card style
- [ ] Changing controls updates the live preview instantly
- [ ] Saving writes the card style to Sanity (visible in `/studio`)
- [ ] Loading a saved style populates all controls correctly
- [ ] Deleting a card style removes it from the list
- [ ] `/landing-pages` loads with empty state and "+ New" button
- [ ] Creating a landing page with template + client + verticals succeeds
- [ ] New landing page appears in the table with correct status
- [ ] Toggle Active/Draft works correctly
- [ ] Delete removes the page after confirmation
- [ ] `/<slug>` renders the correct template for active landing pages
- [ ] Case studies, blog posts, and testimonials filter by selected verticals
- [ ] Inactive or non-existent slugs return 404
- [ ] Reserved slugs (model, process, etc.) are not intercepted by `[slug]`
- [ ] `npx tsc --noEmit` passes
- [ ] `next build` completes successfully
