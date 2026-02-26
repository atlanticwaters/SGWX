# Sageworx (SGWX) Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the full Sageworx marketing website from the copy deck, with Sanity CMS for content management, Three.js background animations, and iterative art direction.

**Architecture:** Next.js 15 App Router with TypeScript, Tailwind CSS v4, Sanity v3 headless CMS, and @react-three/fiber for porting existing Three.js animations to React. Pages: Home, Model, Process, Members, Work/Impact, Spotlights (blog). Content is authored in Sanity Studio and fetched via GROQ queries. The site is statically generated with ISR for CMS updates.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Sanity v3, @react-three/fiber, @react-three/drei, Framer Motion, next-sanity

---

## Phase 1: Project Foundation

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `.env.local.example`

**Step 1: Scaffold Next.js with TypeScript and Tailwind**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack
```

**Step 2: Install core dependencies**

Run:
```bash
npm install framer-motion @react-three/fiber @react-three/drei three
npm install -D @types/three
```

**Step 3: Configure Tailwind with project color palette**

Update `src/app/globals.css` to define the SGWX design tokens:

```css
@import "tailwindcss";

@theme {
  /* Core palette derived from animation files */
  --color-sgwx-bg: #030d0a;
  --color-sgwx-bg-alt: #021a14;
  --color-sgwx-surface: #0a1f18;
  --color-sgwx-surface-hover: #0d2b22;
  --color-sgwx-border: #143d2e;
  --color-sgwx-border-subtle: #0a2a1e;

  /* Greens */
  --color-sgwx-green: #17a86b;
  --color-sgwx-green-bright: #30ff88;
  --color-sgwx-green-muted: #0d6b4a;
  --color-sgwx-green-pale: #e6ffbb;

  /* Teals / Blues */
  --color-sgwx-teal: #0a4f5e;
  --color-sgwx-blue: #042a3d;
  --color-sgwx-cyan: #88eeff;

  /* Yellows / Accents */
  --color-sgwx-yellow: #d4c94a;
  --color-sgwx-yellow-pale: #f0e97a;
  --color-sgwx-gold: #d4e840;

  /* Text */
  --color-sgwx-text: #e8f5ee;
  --color-sgwx-text-muted: #8aab9a;
  --color-sgwx-text-dim: #4a6b5a;

  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
  --font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Spacing */
  --spacing-section: 6rem;
  --spacing-section-sm: 4rem;
}
```

**Step 4: Set up base layout**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sageworx | Go Further. Faster.",
  description:
    "We bring together seasoned marketing and creative experts—bespoke teams who understand your work, thrive on the challenge and deliver when it counts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-sgwx-bg text-sgwx-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 5: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts on localhost:3000 with no errors

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with Tailwind and core dependencies"
```

---

### Task 2: Set Up Sanity CMS

**Files:**
- Create: `sanity/` directory with full Sanity Studio configuration
- Create: `sanity.config.ts`, `sanity.cli.ts`
- Create: `src/lib/sanity/client.ts`, `src/lib/sanity/image.ts`
- Modify: `package.json` (add sanity dependencies)

**Step 1: Install Sanity dependencies**

Run:
```bash
npm install next-sanity @sanity/image-url @sanity/vision sanity @portabletext/react
```

**Step 2: Create Sanity project**

Run:
```bash
npx sanity@latest init --env .env.local --create-project "Sageworx" --dataset production
```

Follow prompts. Select "Clean project with no predefined schema types."

**Step 3: Create Sanity client utility**

Create `src/lib/sanity/client.ts`:

```ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-02-25",
  useCdn: process.env.NODE_ENV === "production",
});
```

Create `src/lib/sanity/image.ts`:

```ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
```

**Step 4: Create `.env.local.example`**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Step 5: Verify Sanity Studio runs**

Run: `npx sanity dev`
Expected: Studio opens at localhost:3333

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: set up Sanity CMS with client utilities"
```

---

### Task 3: Sanity Schemas — Pages & Core Types

**Files:**
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity/schemaTypes/documents/page.ts`
- Create: `sanity/schemaTypes/documents/caseStudy.ts`
- Create: `sanity/schemaTypes/documents/member.ts`
- Create: `sanity/schemaTypes/documents/blogPost.ts`
- Create: `sanity/schemaTypes/documents/siteSettings.ts`
- Create: `sanity/schemaTypes/objects/portableText.ts`
- Create: `sanity/schemaTypes/objects/cta.ts`
- Create: `sanity/schemaTypes/objects/testimonial.ts`
- Create: `sanity/schemaTypes/objects/seo.ts`

**Step 1: Create the siteSettings document schema**

```ts
// sanity/schemaTypes/documents/siteSettings.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Site Title" }),
    defineField({ name: "description", type: "text", title: "Site Description" }),
    defineField({
      name: "navigation",
      type: "array",
      title: "Main Navigation",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({ name: "isCta", type: "boolean", title: "Is CTA?" }),
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      type: "object",
      fields: [
        defineField({ name: "copyright", type: "string" }),
        defineField({
          name: "socialLinks",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "platform", type: "string" }),
                defineField({ name: "url", type: "url" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
});
```

**Step 2: Create the member document schema**

```ts
// sanity/schemaTypes/documents/member.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Full Name", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "name" } }),
    defineField({ name: "title", type: "string", title: "Title / Specialties" }),
    defineField({ name: "mantra", type: "string", title: "Mantra" }),
    defineField({ name: "characterMetaphor", type: "string", title: "Character Metaphor" }),
    defineField({ name: "bio", type: "text", title: "Bio" }),
    defineField({ name: "favoriteTools", type: "string", title: "Favorite Tools" }),
    defineField({ name: "photo", type: "image", title: "Photo", options: { hotspot: true } }),
    defineField({ name: "link", type: "object", fields: [
      defineField({ name: "label", type: "string" }),
      defineField({ name: "url", type: "url" }),
    ]}),
    defineField({ name: "isFeatured", type: "boolean", title: "Featured Member?" }),
    defineField({ name: "order", type: "number", title: "Display Order" }),
  ],
});
```

**Step 3: Create the caseStudy document schema**

```ts
// sanity/schemaTypes/documents/caseStudy.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "client", type: "string", title: "Client Name" }),
    defineField({ name: "category", type: "string", title: "Category" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "shortDescription", type: "text", title: "Short Description (100 words)" }),
    defineField({ name: "longDescription", type: "array", of: [{ type: "block" }], title: "Long Description" }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "testimonial", type: "object", fields: [
      defineField({ name: "quote", type: "text" }),
      defineField({ name: "author", type: "string" }),
      defineField({ name: "role", type: "string" }),
    ]}),
    defineField({ name: "order", type: "number" }),
  ],
});
```

**Step 4: Create the blogPost document schema**

```ts
// sanity/schemaTypes/documents/blogPost.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Post (Spotlight)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "tag", type: "string", title: "Tag (e.g., Featured Work, Insights, Process)" }),
    defineField({ name: "excerpt", type: "text", title: "Short Description" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }, { type: "image" }], title: "Body" }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
});
```

**Step 5: Create shared object schemas (cta, testimonial, seo)**

```ts
// sanity/schemaTypes/objects/cta.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({ name: "href", type: "string" }),
    defineField({ name: "variant", type: "string", options: { list: ["primary", "secondary", "ghost"] } }),
  ],
});

// sanity/schemaTypes/objects/testimonial.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", type: "text" }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "company", type: "string" }),
  ],
});

// sanity/schemaTypes/objects/seo.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", type: "string" }),
    defineField({ name: "metaDescription", type: "text" }),
    defineField({ name: "ogImage", type: "image" }),
  ],
});
```

**Step 6: Register all schemas**

```ts
// sanity/schemaTypes/index.ts
import siteSettings from "./documents/siteSettings";
import member from "./documents/member";
import caseStudy from "./documents/caseStudy";
import blogPost from "./documents/blogPost";
import cta from "./objects/cta";
import testimonial from "./objects/testimonial";
import seo from "./objects/seo";

export const schemaTypes = [siteSettings, member, caseStudy, blogPost, cta, testimonial, seo];
```

**Step 7: Verify schemas load in Sanity Studio**

Run: `npx sanity dev`
Expected: All document types appear in the Studio sidebar

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: add Sanity CMS schemas for all content types"
```

---

### Task 4: Art Direction Consultation

**Important:** Before building any UI components, consult the `art-director` agent to establish the visual design system. Provide it with:

1. The animation color palette (from `_assets/animations/`)
2. The copy deck visual descriptions
3. The brand positioning: dark, sophisticated, tech-forward, organic/network motifs
4. The icon style: Streamline Cyber (green #55850d, pale green #e6ffbb on white)

**Expected outputs from art direction:**
- Finalized color palette with semantic naming
- Typography scale and font pairings
- Spacing/sizing scale
- Component style guidelines (buttons, cards, sections)
- Animation/motion guidelines
- Responsive breakpoints and layout approach

**Step 1:** Run art-director agent with the animation files and copy deck as reference
**Step 2:** Document the design system decisions
**Step 3:** Update Tailwind config with finalized design tokens

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: establish design system tokens from art direction"
```

---

## Phase 2: Core UI Components

### Task 5: Layout Components — Header & Footer

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Build the Header component**

Header requirements from copy deck:
- Sageworx logo with animated "online" indicator
- Nav links: /model, /members, /process, /work, /spotlights
- CTA button: "Let's Chat!"
- Dark background, sticky, glassmorphism effect
- Mobile hamburger menu

```tsx
// src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";

const navItems = [
  { label: "Model", href: "/model" },
  { label: "Members", href: "/members" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "Spotlights", href: "/spotlights" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-sgwx-border-subtle bg-sgwx-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-sgwx-text">
            Sageworx
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-sgwx-green/30 bg-sgwx-green/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-sgwx-green">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sgwx-green" />
            Online
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-sgwx-text-muted transition-colors hover:text-sgwx-text"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-sgwx-green bg-sgwx-green/10 px-5 py-2 text-sm font-medium text-sgwx-green transition-all hover:bg-sgwx-green/20"
          >
            Let&apos;s Chat!
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-sgwx-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && <MobileNav items={navItems} onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
```

**Step 2: Build the MobileNav component**

```tsx
// src/components/layout/MobileNav.tsx
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
```

**Step 3: Build the Footer component**

```tsx
// src/components/layout/Footer.tsx
import Link from "next/link";

const footerLinks = [
  { label: "Model", href: "/model" },
  { label: "Members", href: "/members" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "Spotlights", href: "/spotlights" },
];

export default function Footer() {
  return (
    <footer className="border-t border-sgwx-border-subtle bg-sgwx-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <p className="text-sm text-sgwx-text-dim">
          &copy; {new Date().getFullYear()} Sageworx, LLC.
        </p>
        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-sgwx-text-dim transition-colors hover:text-sgwx-text-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Social icons placeholder */}
        <div className="flex gap-4 text-sgwx-text-dim">
          {/* Add social icon SVGs here */}
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Wire layout components into `layout.tsx`**

**Step 5: Verify header/footer render on dev server**

Run: `npm run dev`
Expected: Header with nav and footer visible on all pages

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Header, MobileNav, and Footer layout components"
```

---

### Task 6: Shared UI Primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/AnimatedSection.tsx`

**Step 1: Build Button component**

Variants: primary (green filled), secondary (green outline), ghost (text only)

```tsx
// src/components/ui/Button.tsx
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-sgwx-green text-sgwx-bg font-semibold hover:bg-sgwx-green-bright transition-colors",
  secondary:
    "border border-sgwx-green text-sgwx-green hover:bg-sgwx-green/10 transition-colors",
  ghost:
    "text-sgwx-text-muted hover:text-sgwx-text transition-colors",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button">) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide uppercase ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
```

**Step 2: Build SectionHeading component**

```tsx
// src/components/ui/SectionHeading.tsx
interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  className?: string;
}

export default function SectionHeading({ heading, subheading, className = "" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-4 text-lg leading-relaxed text-sgwx-text-muted md:text-xl">
          {subheading}
        </p>
      )}
    </div>
  );
}
```

**Step 3: Build Card, Badge, Container, and AnimatedSection**

- `Card`: Dark surface card with border, hover state, optional icon
- `Badge`: Small pill/tag component for categories
- `Container`: Max-width wrapper with padding
- `AnimatedSection`: Framer Motion wrapper for scroll-triggered fade-in

**Step 4: Verify all components render correctly**

Create a temporary `/dev` page that renders each component. Visually verify.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add shared UI primitives (Button, Card, SectionHeading, etc.)"
```

---

### Task 7: Three.js Background Animation Component

**Files:**
- Create: `src/components/animations/NetworkBackground.tsx`
- Create: `src/components/animations/WaveBackground.tsx`
- Create: `src/components/animations/AnimationCanvas.tsx`

Port the existing `_assets/animations/sgwx_animations_4.html` (Mycelium network) as the primary background animation. This is the most refined version with:
- 160 nodes with organic drift
- Dynamic edge connections with color gradients
- Travelling light pulses along edges
- Ambient glow blobs
- Mouse parallax
- Vignette + grain overlays

**Step 1: Create the AnimationCanvas wrapper**

```tsx
// src/components/animations/AnimationCanvas.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface AnimationCanvasProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimationCanvas({ children, className = "" }: AnimationCanvasProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 90], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#020e09", 0, 200]} />
          {children}
        </Suspense>
      </Canvas>
      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(2,8,6,0.55) 65%, rgba(1,5,3,0.92) 100%)",
        }}
      />
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
```

**Step 2: Port the Mycelium network animation to R3F**

Convert the Three.js nodes, edges, pulses, and glow blobs from `sgwx_animations_4.html` into React Three Fiber components using `useFrame` for animation loop.

Key elements to port:
- `NetworkNodes` — Points with custom shader material for pulsing green/gold nodes
- `NetworkEdges` — LineSegments with dynamic vertex connections
- `NetworkPulses` — Points traveling along edges
- `GlowBlobs` — Large ambient glow points

**Step 3: Create a page-level hero wrapper**

```tsx
// Usage example in a page:
<div className="relative min-h-screen">
  <AnimationCanvas>
    <NetworkBackground />
  </AnimationCanvas>
  <div className="relative z-10">
    {/* Page content goes here */}
  </div>
</div>
```

**Step 4: Verify animation renders on the home page**

Run: `npm run dev`
Expected: Animated network background visible behind page content

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: port Three.js mycelium network animation to React Three Fiber"
```

---

## Phase 3: Home Page

### Task 8: Home Section 1 — Hero

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Modify: `src/app/page.tsx`

**Content from copy deck:**
- H1: "Go Further. Faster."
- Subhead: "We bring together seasoned marketing and creative experts..."
- Tagline: "No agency bloat. No freelancer roulette. Just proven pros, ready to work."
- CTA: "HOW WE ROLL" → /model
- System indicators: STATUS: ONLINE / NETWORK: ACTIVE
- Scroll indicator

**Step 1: Build the HeroSection component**

Full-viewport height with network animation background, centered content, animated text reveal, status indicators at bottom, scroll indicator.

**Step 2: Add entrance animations with Framer Motion**

Staggered text reveal (heading → subhead → tagline → CTA → indicators).

**Step 3: Wire into `page.tsx`**

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Home hero section with animated text and network background"
```

---

### Task 9: Home Section 2 — The Changing Game

**Files:**
- Create: `src/components/home/ChangingGameSection.tsx`

**Content from copy deck:**
- H1: "The Rules Are Changing. Tilt Them In Your Favor."
- Two cards with icons (scales of justice → `Business-Scale-2`, pulse line → `Wave-Hexagon`)
- Card 1: "Brands have been stuck choosing between two extremes."
- Card 2: "The market moves too fast for the first option."

**Step 1: Build ChangingGameSection with two icon cards**

Use the SVG icons from `_assets/icons/`. Scroll-triggered fade-in animation.

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Home changing game section with icon cards"
```

---

### Task 10: Home Section 2a — Comparison Table

**Files:**
- Create: `src/components/home/ComparisonTable.tsx`

**Content from copy deck:**
Three-column comparison: Traditional Agency vs Freelance Marketplace vs Sageworx Protocol.
Rows: The Talent, The Workflow, The Cost.
Sageworx column highlighted with checkmarks.

**Step 1: Build responsive comparison table**

Desktop: Full 3-column table. Mobile: Stacked cards or horizontal scroll.

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Home comparison table section"
```

---

### Task 11: Home Section 3 — Our Clients (ICP Cards)

**Files:**
- Create: `src/components/home/ClientsSection.tsx`

**Content:**
- H1: "Curated Partners For Your Business"
- Three ICP cards: Challenger Brands, Niche Agencies, Startups
- Each with pain point + Sageworx solution

**Step 1: Build ClientsSection with three cards**

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Home clients ICP section"
```

---

### Task 12: Home Section 4 — Hand-Picked Experts

**Files:**
- Create: `src/components/home/ExpertsSection.tsx`

**Content:**
- H1: "Hand-Picked Experts"
- Subhead: "Put our robust network to work."
- Animated green dot visualization
- Inset box: "The Right Roles. The Right Teams."

**Step 1: Build ExpertsSection with animated dot bar visual**

Use a vertical animated particle effect alongside text content.

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Home hand-picked experts section"
```

---

### Task 13: Home Section 5 — Process Steps

**Files:**
- Create: `src/components/home/ProcessSection.tsx`
- Create: `src/components/home/ProcessStep.tsx`

**Content:**
- H1: "How The Work Gets Done"
- 6 steps in a grid: Immersion & Brief, Build The Team, Shape Direction, Create & Refine, Capture Learnings, Evolve & Scale
- Each has number, title, description, output label

**Step 1: Build 6-step grid layout with numbered cards**

**Step 2: Add staggered scroll-in animation**

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Home process steps section"
```

---

### Task 14: Home Section 6 — Impact (Case Studies + Logo Wall)

**Files:**
- Create: `src/components/home/ImpactSection.tsx`
- Create: `src/components/home/LogoWall.tsx`
- Create: `src/components/shared/CaseStudyCard.tsx`

**Content:**
- H1: "Making An Impact"
- Two case study cards (ZENPEP, NFL Sunday Ticket)
- Logo wall: Google, Spotify, Nike, Polestar, Airbnb, Linear, Vercel

**Step 1: Build case study cards**

Fetch from Sanity CMS. Display category badge, title, short description, CTA.

**Step 2: Build logo wall with grayscale logos, hover to color**

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Home impact section with case studies and logo wall"
```

---

### Task 15: Home Section 7 — Spotlights (Blog Posts)

**Files:**
- Create: `src/components/home/SpotlightsSection.tsx`
- Create: `src/components/shared/BlogCard.tsx`

**Content:**
- H1: "Every project is an opportunity to push boundaries..."
- 3-column blog post cards with thumbnail, tag, headline, description, CTA
- "MORE SPOTLIGHTS" CTA

**Step 1: Build blog card and spotlights grid**

Fetch from Sanity CMS blogPosts.

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Home spotlights blog section"
```

---

### Task 16: Home Section 8 — Final CTA

**Files:**
- Create: `src/components/home/FinalCtaSection.tsx`

**Content:**
- H1: "Ready to move forward faster?"
- Primary CTA: "ACTIVATE YOUR TEAM"
- Secondary CTA: "MEET OUR MEMBERS"

**Step 1: Build centered CTA section**

**Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Home final CTA section"
```

---

## Phase 4: Model Page

### Task 17: Model Page — All Sections

**Files:**
- Create: `src/app/model/page.tsx`
- Create: `src/components/model/ModelHero.tsx`
- Create: `src/components/model/RightTeamSection.tsx`
- Create: `src/components/model/CapabilitiesGrid.tsx`
- Create: `src/components/model/MicroteamSection.tsx`
- Create: `src/components/model/MomentumSection.tsx`
- Create: `src/components/model/IcpSection.tsx`
- Create: `src/components/model/ContinuitySection.tsx`
- Create: `src/components/model/TechnologySection.tsx`
- Create: `src/components/model/FitSection.tsx`

**Key interactive element:** The Capabilities Grid (Section 2) is a tabbed interface with 4 tabs: Launch, Engage, Mobilize, Transform. Each tab reveals a list of capabilities.

**Step 1: Build ModelHero**
- H1: "Stop Resetting. Start Building."
- Subhead: "The Sageworx model brings together senior, bespoke teams..."
- Tagline: "The right team, ready from day one."

**Step 2: Build CapabilitiesGrid with tab interface**
- 4 tabs: Launch, Engage, Mobilize, Transform
- Each tab shows 4-6 capability bullet points
- Animated tab transition

**Step 3: Build remaining sections**
- MicroteamSection: "Small by Design. Senior by Default."
- MomentumSection: "Built for Momentum."
- IcpSection: 3 audience cards (Startups, SMBs, Agencies) with testimonials
- ContinuitySection: "Flexibility Without the Friction."
- TechnologySection: "The Right Tools for the Job."
- FitSection: "Let's Be Direct." with fit/not-fit lists

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Model page with all sections and capabilities grid"
```

---

## Phase 5: Process Page

### Task 18: Process Page — All Sections

**Files:**
- Create: `src/app/process/page.tsx`
- Create: `src/components/process/ProcessHero.tsx`
- Create: `src/components/process/PrinciplesSection.tsx`
- Create: `src/components/process/SixStepsSection.tsx`
- Create: `src/components/process/StepCard.tsx`
- Create: `src/components/process/GovernanceSection.tsx`
- Create: `src/components/process/ProcessFitSection.tsx`
- Create: `src/components/process/ProcessCloseSection.tsx`

**Key feature:** The Six Steps section (01-06) is the centerpiece. Each step has:
- What's Happening
- Why It Matters
- What You Get

Design as an interactive accordion or scroll-driven reveal.

**Step 1: Build ProcessHero**
- H1: "The Operating System Behind the Work."

**Step 2: Build PrinciplesSection**
- "Designed to Move You Forward. Faster."
- M-shaped talent explanation
- "Structured to Flex" content

**Step 3: Build SixStepsSection with interactive step cards**
- Numbered 01-06
- Expandable/interactive accordion or scroll-linked progression
- Use Wave background animation for this page

**Step 4: Build GovernanceSection and ProcessFitSection**

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Process page with six-step interactive walkthrough"
```

---

## Phase 6: Members Page

### Task 19: Members Page — All Sections

**Files:**
- Create: `src/app/members/page.tsx`
- Create: `src/components/members/MembersHero.tsx`
- Create: `src/components/members/OriginSection.tsx`
- Create: `src/components/members/GrowthSection.tsx`
- Create: `src/components/members/FeaturedMemberCard.tsx`
- Create: `src/components/members/FeaturedMembersSection.tsx`
- Create: `src/components/members/CollectiveStats.tsx`
- Create: `src/components/members/MemberGallery.tsx`
- Create: `src/components/members/JoinSection.tsx`

**Step 1: Build MembersHero**
- H1: "100+ Stories. One Mission."

**Step 2: Build OriginSection**
- "From Two Friends to a Global Network."
- Narrative about Marc and Pat founding story

**Step 3: Build FeaturedMembersSection**
- Rotating showcase of 4-5 member profile cards
- Each with: name, title, mantra, bio, photo, favorite tools, link
- "Ocean's 11"-style character introductions
- Fetch from Sanity CMS (isFeatured: true)

**Step 4: Build CollectiveStats**
- Animated counters for key stats (Fortune 500 brands, awards, years experience, etc.)

**Step 5: Build MemberGallery**
- Dynamic grid of member headshots with hover/click for detail
- Fetch all members from Sanity CMS

**Step 6: Build JoinSection**
- "Interested in Joining Sageworx?"
- CTA for prospective members

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Members page with featured profiles and gallery"
```

---

## Phase 7: Work / Impact Page

### Task 20: Work Page — Case Studies

**Files:**
- Create: `src/app/work/page.tsx`
- Create: `src/app/work/[slug]/page.tsx`
- Create: `src/components/work/WorkHero.tsx`
- Create: `src/components/work/CaseStudyGrid.tsx`
- Create: `src/components/work/CaseStudyDetail.tsx`

**Step 1: Build work listing page**
- Fetch all case studies from Sanity
- Display as a grid of case study cards

**Step 2: Build individual case study detail page**
- Dynamic route: `/work/[slug]`
- Full case study with hero image, long description, testimonial, tags

**Step 3: Seed Sanity with ZENPEP and NFLST case studies**

Use the copy deck content to create initial case study entries.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Work page with case study listings and detail views"
```

---

## Phase 8: Spotlights (Blog)

### Task 21: Spotlights Page — Blog Listing & Detail

**Files:**
- Create: `src/app/spotlights/page.tsx`
- Create: `src/app/spotlights/[slug]/page.tsx`
- Create: `src/components/spotlights/SpotlightsGrid.tsx`
- Create: `src/components/spotlights/SpotlightDetail.tsx`

**Step 1: Build spotlights listing page**
- Fetch all blog posts from Sanity
- 3-column grid with BlogCard components
- Filter by tag

**Step 2: Build individual spotlight detail page**
- Dynamic route: `/spotlights/[slug]`
- Portable text rendering for body content

**Step 3: Seed Sanity with sample spotlight posts from copy deck**

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Spotlights blog listing and detail pages"
```

---

## Phase 9: Additional Animations

### Task 22: Port Additional Background Animations

**Files:**
- Modify: `src/components/animations/WaveBackground.tsx`
- Create: `src/components/animations/CityBackground.tsx`

**Step 1: Port Wave Field animation (sgwx_animations_5/6)**
For use on Process page or other inner pages. Wave particle grid with height-driven color.

**Step 2: Port Wireframe City animation (sgwx_animations_1)**
For use on Work page or about section. Progressive construction reveal.

**Step 3: Assign animations to pages**
- Home: Mycelium Network (sgwx_animations_4)
- Process: Wave Field (sgwx_animations_6)
- Work: Wireframe City (sgwx_animations_1)
- Other pages: Network or Wave variants

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: port wave and city background animations"
```

---

## Phase 10: Polish & Launch Prep

### Task 23: SEO, Metadata & Open Graph

**Files:**
- Modify: All `page.tsx` files to add metadata exports
- Create: `src/app/opengraph-image.tsx` (or static OG image)
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Step 1: Add metadata to each page**
Use Next.js `generateMetadata` for dynamic pages (case studies, spotlights).

**Step 2: Generate sitemap and robots.txt**

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add SEO metadata, sitemap, and robots.txt"
```

---

### Task 24: Performance Optimization

**Step 1: Lazy load Three.js animations**
Use `next/dynamic` with `ssr: false` for all animation components to avoid SSR issues.

**Step 2: Image optimization**
Ensure all images use `next/image` with proper sizing and formats.

**Step 3: Lighthouse audit**
Run: `npx lighthouse http://localhost:3000 --output html`
Target: 90+ on all scores.

**Step 4: Commit**

```bash
git add -A
git commit -m "perf: optimize loading, images, and lighthouse scores"
```

---

### Task 25: Responsive Design Pass

**Step 1: Test all pages at mobile (375px), tablet (768px), desktop (1280px+)**

**Step 2: Fix any layout issues**

Focus areas:
- Header mobile menu
- Comparison table mobile layout
- Member gallery grid
- Process steps layout
- Animation performance on mobile (reduce particle counts)

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: responsive design adjustments across all pages"
```

---

### Task 26: Sanity Content Seeding

**Step 1: Create seed script or manually enter all copy deck content into Sanity**

Priority content:
- Site settings (nav, footer)
- 2 case studies (ZENPEP, NFLST)
- 4 featured members (Sara, AMA, James, Andrew)
- 3 blog posts (from spotlights section)

**Step 2: Verify all pages render with real Sanity content**

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: seed Sanity CMS with initial content from copy deck"
```

---

### Task 27: Final Review & Deploy

**Step 1: Full site walkthrough**
- All pages load correctly
- All animations render
- All links work
- CMS content displays
- Mobile responsive

**Step 2: Set up Vercel deployment**
Run: `npx vercel`

**Step 3: Configure environment variables in Vercel**
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET

**Step 4: Deploy**

Run: `npx vercel --prod`

**Step 5: Final commit**

```bash
git add -A
git commit -m "chore: finalize for production deployment"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-4 | Project foundation (Next.js, Sanity, design tokens, art direction) |
| 2 | 5-7 | Core UI components (layout, primitives, animation system) |
| 3 | 8-16 | Home page (all 8 sections + hero) |
| 4 | 17 | Model page (8 sections + capabilities grid) |
| 5 | 18 | Process page (6-step walkthrough) |
| 6 | 19 | Members page (profiles + gallery) |
| 7 | 20 | Work/Impact page (case studies) |
| 8 | 21 | Spotlights/Blog (listing + detail) |
| 9 | 22 | Additional animations |
| 10 | 23-27 | Polish, SEO, performance, content, deploy |

**Total tasks: 27**
