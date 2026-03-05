# Homepage CMS Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make all homepage content editable through a Sanity CMS singleton document, replacing all hardcoded text strings while preserving existing animations and layout.

**Architecture:** A `homepage` singleton document in Sanity with named object fields per section. The page server component fetches the homepage document and passes section data as props. Each section component gains CMS props and uses them instead of hardcoded strings. Existing `callToAction`, `comparisonRow`, and `processStage` object types are reused.

**Tech Stack:** Sanity v3 schema, GROQ queries, Next.js App Router server components, TypeScript

---

### Task 1: Create the `homepage` Sanity schema

**Files:**
- Create: `src/sanity/schemaTypes/documents/homepage.ts`

**Step 1: Create the schema file**

```typescript
import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'changingGame', title: 'Changing Game' },
    { name: 'comparison', title: 'Comparison Table' },
    { name: 'clients', title: 'Client Segments' },
    { name: 'experts', title: 'Experts' },
    { name: 'process', title: 'Process' },
    { name: 'impact', title: 'Impact / Case Studies' },
    { name: 'spotlights', title: 'Spotlights' },
    { name: 'finalCta', title: 'Final CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── SEO ────────────────────────────────────────────────
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'seo',
    }),

    // ── Hero ───────────────────────────────────────────────
    defineField({
      name: 'heroHeading',
      type: 'string',
      title: 'Heading',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroParagraph1',
      type: 'text',
      title: 'Primary Paragraph',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroParagraph2',
      type: 'text',
      title: 'Secondary Paragraph',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCta',
      type: 'callToAction',
      title: 'Primary CTA',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCta',
      type: 'callToAction',
      title: 'Secondary CTA',
      group: 'hero',
    }),

    // ── Changing Game ──────────────────────────────────────
    defineField({
      name: 'changingGameHeading',
      type: 'string',
      title: 'Heading',
      group: 'changingGame',
    }),
    defineField({
      name: 'changingGameCards',
      type: 'array',
      title: 'Cards',
      group: 'changingGame',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'string', title: 'Heading' }),
            defineField({ name: 'body', type: 'text', title: 'Body', rows: 3 }),
          ],
          preview: {
            select: { title: 'heading' },
          },
        },
      ],
    }),

    // ── Comparison Table ───────────────────────────────────
    defineField({
      name: 'comparisonEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'comparison',
    }),
    defineField({
      name: 'comparisonHeading',
      type: 'string',
      title: 'Heading',
      group: 'comparison',
    }),
    defineField({
      name: 'comparisonColumns',
      type: 'object',
      title: 'Column Headers',
      group: 'comparison',
      fields: [
        defineField({ name: 'criteria', type: 'string', title: 'Criteria Column' }),
        defineField({ name: 'agency', type: 'string', title: 'Agency Column' }),
        defineField({ name: 'freelance', type: 'string', title: 'Freelance Column' }),
        defineField({ name: 'sageworx', type: 'string', title: 'Sageworx Column' }),
      ],
    }),
    defineField({
      name: 'comparisonRows',
      type: 'array',
      title: 'Rows',
      group: 'comparison',
      of: [{ type: 'comparisonRow' }],
    }),
    defineField({
      name: 'comparisonCta',
      type: 'callToAction',
      title: 'CTA Button',
      group: 'comparison',
    }),

    // ── Client Segments ────────────────────────────────────
    defineField({
      name: 'clientsEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'clients',
    }),
    defineField({
      name: 'clientsHeading',
      type: 'string',
      title: 'Heading',
      group: 'clients',
    }),
    defineField({
      name: 'clientSegments',
      type: 'array',
      title: 'Client Segments',
      group: 'clients',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'type', type: 'string', title: 'Client Type' }),
            defineField({ name: 'painPoint', type: 'text', title: 'Pain Point', rows: 2 }),
            defineField({ name: 'solution', type: 'text', title: 'Sageworx Solution', rows: 2 }),
          ],
          preview: {
            select: { title: 'type' },
          },
        },
      ],
    }),

    // ── Experts ────────────────────────────────────────────
    defineField({
      name: 'expertsEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'experts',
    }),
    defineField({
      name: 'expertsHeading',
      type: 'string',
      title: 'Heading',
      group: 'experts',
    }),
    defineField({
      name: 'expertsSubheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
      group: 'experts',
    }),

    // ── Process ────────────────────────────────────────────
    defineField({
      name: 'processEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'process',
    }),
    defineField({
      name: 'processHeading',
      type: 'string',
      title: 'Heading',
      group: 'process',
    }),
    defineField({
      name: 'processSubheading',
      type: 'text',
      title: 'Subheading',
      rows: 2,
      group: 'process',
    }),
    defineField({
      name: 'processStages',
      type: 'array',
      title: 'Stages',
      group: 'process',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', type: 'string', title: 'Number (e.g. "01")' }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'id', type: 'string', title: 'Anchor ID (e.g. "launch")' }),
            defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
            defineField({
              name: 'accent',
              type: 'string',
              title: 'Accent Color',
              options: { list: ['green', 'cyan'], layout: 'radio' },
              initialValue: 'green',
            }),
          ],
          preview: {
            select: { number: 'number', title: 'title' },
            prepare({ number, title }) {
              return { title: `${number} — ${title}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'processFooterLink',
      type: 'callToAction',
      title: 'Footer Link',
      group: 'process',
    }),

    // ── Impact / Case Studies ──────────────────────────────
    defineField({
      name: 'impactEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'impact',
    }),
    defineField({
      name: 'impactHeading',
      type: 'string',
      title: 'Heading',
      group: 'impact',
    }),
    defineField({
      name: 'logoWallHeading',
      type: 'string',
      title: 'Logo Wall Heading',
      group: 'impact',
    }),
    defineField({
      name: 'logos',
      type: 'array',
      title: 'Logo Names',
      group: 'impact',
      of: [{ type: 'string' }],
    }),

    // ── Spotlights ─────────────────────────────────────────
    defineField({
      name: 'spotlightsEyebrow',
      type: 'string',
      title: 'Eyebrow',
      group: 'spotlights',
    }),
    defineField({
      name: 'spotlightsHeading',
      type: 'text',
      title: 'Heading',
      rows: 3,
      group: 'spotlights',
    }),
    defineField({
      name: 'spotlightsCta',
      type: 'callToAction',
      title: 'CTA Button',
      group: 'spotlights',
    }),

    // ── Final CTA ──────────────────────────────────────────
    defineField({
      name: 'finalCtaHeading',
      type: 'string',
      title: 'Heading',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaPrimaryCta',
      type: 'callToAction',
      title: 'Primary CTA',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaSecondaryCta',
      type: 'callToAction',
      title: 'Secondary CTA',
      group: 'finalCta',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
```

**Step 2: Commit**

```bash
git add src/sanity/schemaTypes/documents/homepage.ts
git commit -m "feat: add homepage singleton Sanity schema"
```

---

### Task 2: Register schema and add to Studio structure

**Files:**
- Modify: `src/sanity/schemaTypes/index.ts`
- Modify: `src/sanity/structure.ts`

**Step 1: Add to schema index**

In `src/sanity/schemaTypes/index.ts`, add the import and include in the array:

```typescript
// Add import after existing document imports:
import { homepage } from './documents/homepage'

// Add to schemaTypes array after siteSettings:
homepage,
```

**Step 2: Add to Studio structure as singleton**

In `src/sanity/structure.ts`:

1. Add `'homepage'` to the `SINGLETONS` array:
```typescript
const SINGLETONS = ['siteSettings', 'homepage']
```

2. Add `'homepage'` to the `MANUALLY_ORGANIZED` array (it inherits from SINGLETONS spread, so just adding to SINGLETONS is enough — but verify).

3. Add the homepage singleton list item right after Site Settings:
```typescript
S.listItem()
  .title('Homepage')
  .child(
    S.document()
      .schemaType('homepage')
      .documentId('homepage')
      .title('Homepage')
  ),
```

**Step 3: Verify** — Run `npm run dev` and open `/studio`. Confirm "Homepage" appears in the sidebar and the form loads with all field groups.

**Step 4: Commit**

```bash
git add src/sanity/schemaTypes/index.ts src/sanity/structure.ts
git commit -m "feat: register homepage schema and add to Studio structure"
```

---

### Task 3: Create seed script for homepage content

**Files:**
- Create: `scripts/seed-homepage.mjs`

**Step 1: Write the seed script**

This script populates the homepage singleton with the exact content currently hardcoded in the section components. Uses the Sanity write client.

```javascript
import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2026-02-25",
  useCdn: false,
});

const homepage = {
  _id: "homepage",
  _type: "homepage",

  // ── Hero ─────────────────────────────────────────────────
  heroHeading: "Go Further. Faster.",
  heroParagraph1:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts.",
  heroParagraph2:
    "No agency bloat. No freelancer roulette. Just proven pros, ready to work.",
  heroPrimaryCta: { _type: "callToAction", label: "How We Roll", href: "/model", variant: "primary" },
  heroSecondaryCta: { _type: "callToAction", label: "Let\u2019s Chat", href: "/contact", variant: "secondary" },

  // ── Changing Game ────────────────────────────────────────
  changingGameHeading: "The Rules Are Changing. Tilt Them In Your Favor.",
  changingGameCards: [
    {
      _key: "card1",
      _type: "object",
      heading: "Brands have been stuck choosing between two extremes.",
      body: "A traditional agency weighed down by static layers. Or a loose collection of freelancers who are never quite on the same page.",
    },
    {
      _key: "card2",
      _type: "object",
      heading:
        "The market moves too fast for the first option. Your needs are too important for the second.",
      body: "Technology isn\u2019t the strategy. People are. The best teams understand which tools elevate the work.",
    },
  ],

  // ── Comparison Table ─────────────────────────────────────
  comparisonEyebrow: "The Model Makes a Difference",
  comparisonHeading: "Why Sageworx?",
  comparisonColumns: {
    _type: "object",
    criteria: "Criteria",
    agency: "Traditional Agency",
    freelance: "Freelance Marketplace",
    sageworx: "Sageworx Protocol",
  },
  comparisonRows: [
    {
      _key: "row1",
      _type: "comparisonRow",
      criteria: "The Talent",
      traditional: "Junior-heavy. You fund the learning curve.",
      freelancers: "Hit-or-miss. A reset every time.",
      sageworx: "Senior specialists with category fluency.",
    },
    {
      _key: "row2",
      _type: "comparisonRow",
      criteria: "The Workflow",
      traditional: "Long onboarding. Longer timelines.",
      freelancers: "Quick kickoff. Constant realignment.",
      sageworx: "Clean start with no churn.",
    },
    {
      _key: "row3",
      _type: "comparisonRow",
      criteria: "The Cost",
      traditional: "High overhead. Hidden fees.",
      freelancers: "Unpredictable commitment and constant training.",
      sageworx: "Lean by design. Zero budget bloat.",
    },
  ],
  comparisonCta: { _type: "callToAction", label: "Explore Our Model", href: "/model", variant: "primary" },

  // ── Client Segments ──────────────────────────────────────
  clientsEyebrow: "Who We Serve",
  clientsHeading: "Curated Partners For Your Business",
  clientSegments: [
    {
      _key: "seg1",
      _type: "object",
      type: "Challenger Brands",
      painPoint:
        "Approval loops slow you down. Big agencies deliver decks instead of progress.",
      solution:
        "We clear the path and get to execution, quickly and thoughtfully.",
    },
    {
      _key: "seg2",
      _type: "object",
      type: "Niche Agencies",
      painPoint:
        "A client needs something outside your wheelhouse. You either scramble or say no.",
      solution:
        "Expand your capabilities with fractional specialists, not added overhead.",
    },
    {
      _key: "seg3",
      _type: "object",
      type: "Startups",
      painPoint: "Burn rate matters. Big hires come with big risks.",
      solution: "Senior leadership that scales as needed.",
    },
  ],

  // ── Experts ──────────────────────────────────────────────
  expertsEyebrow: "The Collective",
  expertsHeading: "Hand-Picked Experts",
  expertsSubheading:
    "We assemble expert teams for the challenge at hand.",

  // ── Process ──────────────────────────────────────────────
  processEyebrow: "Our Process",
  processHeading: "The Growth Sequence",
  processSubheading:
    "Smart content + experiences built for every stage of your brand\u2019s evolution.",
  processStages: [
    {
      _key: "stage1",
      _type: "object",
      number: "01",
      title: "Launch",
      id: "launch",
      description:
        "Brand foundation + market entry. Strategic and visual infrastructure to compete from day one.",
      accent: "green",
    },
    {
      _key: "stage2",
      _type: "object",
      number: "02",
      title: "Engage",
      id: "engage",
      description:
        "Content + experiences that connect. Campaigns, video, interactive \u2014 the work that moves people to act.",
      accent: "cyan",
    },
    {
      _key: "stage3",
      _type: "object",
      number: "03",
      title: "Mobilize",
      id: "mobilize",
      description:
        "Building communities + amplifying reach. Turning customers into advocates and audiences into movements.",
      accent: "green",
    },
    {
      _key: "stage4",
      _type: "object",
      number: "04",
      title: "Transform",
      id: "transform",
      description:
        "Internal alignment + organizational evolution. When the mission shifts to culture, we engineer the change.",
      accent: "cyan",
    },
  ],
  processFooterLink: {
    _type: "callToAction",
    label: "Explore the full sequence",
    href: "/process",
    variant: "ghost",
  },

  // ── Impact ───────────────────────────────────────────────
  impactEyebrow: "Case Studies",
  impactHeading: "Making An Impact",
  logoWallHeading: "Trusted by ambitious brands and global leaders",
  logos: [
    { _key: "l1", _type: "string" },
  ],

  // ── Spotlights ───────────────────────────────────────────
  spotlightsEyebrow: "Spotlights",
  spotlightsHeading:
    "Every project is an opportunity to push boundaries, challenge conventions, and make a mark.",
  spotlightsCta: {
    _type: "callToAction",
    label: "More Spotlights",
    href: "/spotlights",
    variant: "secondary",
  },

  // ── Final CTA ────────────────────────────────────────────
  finalCtaHeading: "Ready to move forward faster?",
  finalCtaPrimaryCta: {
    _type: "callToAction",
    label: "Activate Your Team",
    href: "/contact",
    variant: "primary",
  },
  finalCtaSecondaryCta: {
    _type: "callToAction",
    label: "Meet Our Members",
    href: "/members",
    variant: "secondary",
  },
};

async function seed() {
  console.log("Seeding homepage document...");
  // For the logos array, Sanity string arrays need just plain strings
  homepage.logos = ["Google", "Spotify", "Nike", "Polestar", "Airbnb", "Linear", "Vercel"];

  await client.createOrReplace(homepage);
  console.log("Homepage seeded successfully!");
}

seed().catch(console.error);
```

**Step 2: Run the seed script**

```bash
node scripts/seed-homepage.mjs
```

Expected: "Homepage seeded successfully!"

**Step 3: Verify in Studio** — Open `/studio`, click "Homepage", confirm all fields are populated with the correct content across all groups/tabs.

**Step 4: Commit**

```bash
git add scripts/seed-homepage.mjs
git commit -m "feat: add homepage seed script with current hardcoded content"
```

---

### Task 4: Add `getHomepage()` query and types

**Files:**
- Modify: `src/lib/sanity/queries.ts`

**Step 1: Add the HomepageData interface and query**

Add at the end of the types section in `queries.ts`:

```typescript
// ─── Homepage Types ─────────────────────────────────────────────────────────

export interface HomepageCta {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

export interface HomepageData {
  // Hero
  heroHeading: string;
  heroParagraph1: string;
  heroParagraph2: string;
  heroPrimaryCta: HomepageCta;
  heroSecondaryCta: HomepageCta;
  // Changing Game
  changingGameHeading: string;
  changingGameCards: { heading: string; body: string }[];
  // Comparison
  comparisonEyebrow: string;
  comparisonHeading: string;
  comparisonColumns: { criteria: string; agency: string; freelance: string; sageworx: string };
  comparisonRows: { criteria: string; traditional: string; freelancers: string; sageworx: string }[];
  comparisonCta: HomepageCta;
  // Clients
  clientsEyebrow: string;
  clientsHeading: string;
  clientSegments: { type: string; painPoint: string; solution: string }[];
  // Experts
  expertsEyebrow: string;
  expertsHeading: string;
  expertsSubheading: string;
  // Process
  processEyebrow: string;
  processHeading: string;
  processSubheading: string;
  processStages: { number: string; title: string; id: string; description: string; accent: "green" | "cyan" }[];
  processFooterLink: HomepageCta;
  // Impact
  impactEyebrow: string;
  impactHeading: string;
  logoWallHeading: string;
  logos: string[];
  // Spotlights
  spotlightsEyebrow: string;
  spotlightsHeading: string;
  spotlightsCta: HomepageCta;
  // Final CTA
  finalCtaHeading: string;
  finalCtaPrimaryCta: HomepageCta;
  finalCtaSecondaryCta: HomepageCta;
  // SEO
  seo?: { title?: string; description?: string; noIndex?: boolean };
}
```

Add the fetcher function:

```typescript
export async function getHomepage(): Promise<HomepageData | null> {
  if (!client) return null;
  return client.fetch<HomepageData | null>(
    `*[_type == "homepage" && _id == "homepage"][0] {
      heroHeading, heroParagraph1, heroParagraph2,
      heroPrimaryCta { label, href, variant },
      heroSecondaryCta { label, href, variant },
      changingGameHeading,
      changingGameCards[] { heading, body },
      comparisonEyebrow, comparisonHeading,
      comparisonColumns { criteria, agency, freelance, sageworx },
      comparisonRows[] { criteria, traditional, freelancers, sageworx },
      comparisonCta { label, href, variant },
      clientsEyebrow, clientsHeading,
      clientSegments[] { type, painPoint, solution },
      expertsEyebrow, expertsHeading, expertsSubheading,
      processEyebrow, processHeading, processSubheading,
      processStages[] { number, title, id, description, accent },
      processFooterLink { label, href, variant },
      impactEyebrow, impactHeading, logoWallHeading, logos,
      spotlightsEyebrow, spotlightsHeading,
      spotlightsCta { label, href, variant },
      finalCtaHeading,
      finalCtaPrimaryCta { label, href, variant },
      finalCtaSecondaryCta { label, href, variant },
      seo { title, description, noIndex }
    }`
  );
}
```

**Step 2: Commit**

```bash
git add src/lib/sanity/queries.ts
git commit -m "feat: add getHomepage query and HomepageData types"
```

---

### Task 5: Update `src/app/page.tsx` to fetch and distribute homepage data

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Update the page component**

- Import `getHomepage` and `HomepageData` from queries
- Add `getHomepage()` to the `Promise.all` call
- Pass section-specific slices to each component as props
- Use `homepage.seo` for metadata if available (or keep static fallback)

The updated `page.tsx` should:

```typescript
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ChangingGameSection from "@/components/home/ChangingGameSection";
import ComparisonTable from "@/components/home/ComparisonTable";
import ClientsSection from "@/components/home/ClientsSection";
import ExpertsSection from "@/components/home/ExpertsSection";
import ProcessSection from "@/components/home/ProcessSection";
import ImpactSection from "@/components/home/ImpactSection";
import SpotlightsSection from "@/components/home/SpotlightsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import SectionDivider from "@/components/ui/SectionDivider";
import { getAllCaseStudies, getAllBlogPosts, getSectionBackgrounds, getMembersForStrip, getHomepage } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Sageworx | Go Further. Faster.",
  description:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts. No agency bloat. No freelancer roulette.",
};

export default async function Home() {
  const [caseStudies, blogPosts, backgrounds, members, homepage] = await Promise.all([
    getAllCaseStudies(),
    getAllBlogPosts(),
    getSectionBackgrounds(),
    getMembersForStrip(),
    getHomepage(),
  ]);

  const bg = Object.fromEntries(
    backgrounds.map((b) => [b.slug, { imageUrl: b.imageUrl, overlayColor: b.overlayColor }])
  );

  return (
    <>
      <HeroSection
        heading={homepage?.heroHeading}
        paragraph1={homepage?.heroParagraph1}
        paragraph2={homepage?.heroParagraph2}
        primaryCta={homepage?.heroPrimaryCta}
        secondaryCta={homepage?.heroSecondaryCta}
      />
      <ChangingGameSection
        heading={homepage?.changingGameHeading}
        cards={homepage?.changingGameCards}
        backgroundUrl={bg["dark-foliage"]?.imageUrl}
        overlayColor={bg["dark-foliage"]?.overlayColor}
      />
      <ComparisonTable
        eyebrow={homepage?.comparisonEyebrow}
        heading={homepage?.comparisonHeading}
        columns={homepage?.comparisonColumns}
        rows={homepage?.comparisonRows}
        cta={homepage?.comparisonCta}
      />
      <SectionDivider />
      <ClientsSection
        eyebrow={homepage?.clientsEyebrow}
        heading={homepage?.clientsHeading}
        segments={homepage?.clientSegments}
        backgroundUrl={bg["geometric-architecture"]?.imageUrl}
        overlayColor={bg["geometric-architecture"]?.overlayColor}
      />
      <ExpertsSection
        eyebrow={homepage?.expertsEyebrow}
        heading={homepage?.expertsHeading}
        subheading={homepage?.expertsSubheading}
        members={members}
        backgroundUrl={bg["spiral-geometry"]?.imageUrl}
        overlayColor={bg["spiral-geometry"]?.overlayColor}
      />
      <SectionDivider />
      <ProcessSection
        eyebrow={homepage?.processEyebrow}
        heading={homepage?.processHeading}
        subheading={homepage?.processSubheading}
        stages={homepage?.processStages}
        footerLink={homepage?.processFooterLink}
        backgroundUrl={bg["fluid-waves"]?.imageUrl}
        overlayColor={bg["fluid-waves"]?.overlayColor}
      />
      <ImpactSection
        eyebrow={homepage?.impactEyebrow}
        heading={homepage?.impactHeading}
        logoWallHeading={homepage?.logoWallHeading}
        logos={homepage?.logos}
        caseStudies={caseStudies}
      />
      <SectionDivider />
      <SpotlightsSection
        eyebrow={homepage?.spotlightsEyebrow}
        heading={homepage?.spotlightsHeading}
        cta={homepage?.spotlightsCta}
        posts={blogPosts}
        backgroundUrl={bg["dark-mountain"]?.imageUrl}
        overlayColor={bg["dark-mountain"]?.overlayColor}
      />
      <FinalCtaSection
        heading={homepage?.finalCtaHeading}
        primaryCta={homepage?.finalCtaPrimaryCta}
        secondaryCta={homepage?.finalCtaSecondaryCta}
        backgroundUrl={bg["abstract-curves"]?.imageUrl}
        overlayColor={bg["abstract-curves"]?.overlayColor}
      />
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire homepage data from Sanity to section components"
```

---

### Task 6: Update HeroSection to accept CMS props

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

**Step 1: Add props interface and use CMS data with hardcoded fallbacks**

Add to the component:

```typescript
interface HeroSectionProps {
  heading?: string;
  paragraph1?: string;
  paragraph2?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function HeroSection({
  heading = "Go Further. Faster.",
  paragraph1 = "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts.",
  paragraph2 = "No agency bloat. No freelancer roulette. Just proven pros, ready to work.",
  primaryCta = { label: "How We Roll", href: "/model" },
  secondaryCta = { label: "Let\u2019s Chat", href: "/contact" },
}: HeroSectionProps) {
```

Replace all hardcoded strings in JSX with prop references:
- `"Go Further. Faster."` → `{heading}`
- Both paragraphs → `{paragraph1}`, `{paragraph2}`
- Button labels/hrefs → `{primaryCta.label}`, `{primaryCta.href}`, etc.

Note: The HUD status bar text ("STATUS:", "ONLINE", "NETWORK:", "ACTIVE") is decorative/thematic and can stay hardcoded — it's not editorial content.

**Step 2: Commit**

```bash
git add src/components/home/HeroSection.tsx
git commit -m "feat: make HeroSection content CMS-driven"
```

---

### Task 7: Update ChangingGameSection to accept CMS props

**Files:**
- Modify: `src/components/home/ChangingGameSection.tsx`

**Step 1: Add props and use them**

```typescript
interface ChangingGameCard {
  heading: string;
  body: string;
}

interface ChangingGameSectionProps {
  heading?: string;
  cards?: ChangingGameCard[];
  backgroundUrl?: string;
  overlayColor?: string;
}
```

Use `heading` prop in `SectionHeading`, iterate over `cards` array instead of hardcoded JSX. The SVG icons (ScaleIcon, WaveIcon) stay hardcoded — they're visual assets, not content. Assign icons by card index (first card gets ScaleIcon, second gets WaveIcon; extra cards get no icon).

Fallback: keep current hardcoded values as defaults.

**Step 2: Commit**

```bash
git add src/components/home/ChangingGameSection.tsx
git commit -m "feat: make ChangingGameSection content CMS-driven"
```

---

### Task 8: Update ComparisonTable to accept CMS props

**Files:**
- Modify: `src/components/home/ComparisonTable.tsx`

**Step 1: Add props**

```typescript
interface ComparisonRow {
  criteria: string;
  traditional: string;
  freelancers: string;
  sageworx: string;
}

interface ComparisonTableProps {
  eyebrow?: string;
  heading?: string;
  columns?: { criteria: string; agency: string; freelance: string; sageworx: string };
  rows?: ComparisonRow[];
  cta?: { label: string; href: string };
}
```

Replace hardcoded `rows` array and all header strings with props. Use existing hardcoded values as defaults.

Note: The `comparisonRow` Sanity object uses field names `traditional` and `freelancers`, while the current component uses `agency` and `freelance`. The component should accept the Sanity field names.

**Step 2: Commit**

```bash
git add src/components/home/ComparisonTable.tsx
git commit -m "feat: make ComparisonTable content CMS-driven"
```

---

### Task 9: Update ClientsSection to accept CMS props

**Files:**
- Modify: `src/components/home/ClientsSection.tsx`

**Step 1: Add props**

```typescript
interface ClientSegment {
  type: string;
  painPoint: string;
  solution: string;
}

interface ClientsSectionProps {
  eyebrow?: string;
  heading?: string;
  segments?: ClientSegment[];
  backgroundUrl?: string;
  overlayColor?: string;
}
```

Iterate over `segments` prop instead of hardcoded `clients` array. The `deepFieldVariant` per card stays derived by index (variants cycle through `[1, 4, 6]` or similar).

**Step 2: Commit**

```bash
git add src/components/home/ClientsSection.tsx
git commit -m "feat: make ClientsSection content CMS-driven"
```

---

### Task 10: Update ExpertsSection to accept CMS props

**Files:**
- Modify: `src/components/home/ExpertsSection.tsx`

**Step 1: Add eyebrow/heading/subheading props**

```typescript
interface ExpertsSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  members: StripMember[];
  backgroundUrl?: string;
  overlayColor?: string;
}
```

Pass the three text props to `SectionHeading` instead of hardcoded strings. Members are already CMS-driven.

**Step 2: Commit**

```bash
git add src/components/home/ExpertsSection.tsx
git commit -m "feat: make ExpertsSection headings CMS-driven"
```

---

### Task 11: Update ProcessSection to accept CMS props

**Files:**
- Modify: `src/components/home/ProcessSection.tsx`

**Step 1: Add props**

```typescript
interface ProcessStage {
  number: string;
  title: string;
  id: string;
  description: string;
  accent: "green" | "cyan";
}

interface ProcessSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  stages?: ProcessStage[];
  footerLink?: { label: string; href: string };
  backgroundUrl?: string;
  overlayColor?: string;
}
```

Iterate over `stages` prop instead of hardcoded array. The `deepFieldVariant` per stage can be derived by index (cycle through `[1, 3, 5, 6]`). The `accentColors` lookup map stays in the component — it's styling, not content.

Use `footerLink` prop for the bottom link.

**Step 2: Commit**

```bash
git add src/components/home/ProcessSection.tsx
git commit -m "feat: make ProcessSection content CMS-driven"
```

---

### Task 12: Update ImpactSection and LogoWall to accept CMS props

**Files:**
- Modify: `src/components/home/ImpactSection.tsx`
- Modify: `src/components/home/LogoWall.tsx`

**Step 1: Update ImpactSection props**

```typescript
interface ImpactSectionProps {
  eyebrow?: string;
  heading?: string;
  logoWallHeading?: string;
  logos?: string[];
  caseStudies: CaseStudy[];
}
```

Pass `logoWallHeading` and `logos` to `LogoWall`.

**Step 2: Update LogoWall to accept props**

```typescript
interface LogoWallProps {
  heading?: string;
  logos?: string[];
}

export default function LogoWall({
  heading = "Trusted by ambitious brands and global leaders",
  logos: logoList = ["Google", "Spotify", "Nike", "Polestar", "Airbnb", "Linear", "Vercel"],
}: LogoWallProps) {
```

**Step 3: Commit**

```bash
git add src/components/home/ImpactSection.tsx src/components/home/LogoWall.tsx
git commit -m "feat: make ImpactSection and LogoWall content CMS-driven"
```

---

### Task 13: Update SpotlightsSection to accept CMS props

**Files:**
- Modify: `src/components/home/SpotlightsSection.tsx`

**Step 1: Add CMS props**

```typescript
interface SpotlightsSectionProps {
  eyebrow?: string;
  heading?: string;
  cta?: { label: string; href: string; variant?: string };
  posts: Post[];
  backgroundUrl?: string;
  overlayColor?: string;
}
```

Use `eyebrow`, `heading` in `SectionHeading`. Use `cta.label` and `cta.href` for the button.

**Step 2: Commit**

```bash
git add src/components/home/SpotlightsSection.tsx
git commit -m "feat: make SpotlightsSection content CMS-driven"
```

---

### Task 14: Update FinalCtaSection to accept CMS props

**Files:**
- Modify: `src/components/home/FinalCtaSection.tsx`

**Step 1: Add CMS props**

```typescript
interface FinalCtaSectionProps {
  heading?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundUrl?: string;
  overlayColor?: string;
}
```

Replace hardcoded heading and button text/hrefs with props.

**Step 2: Commit**

```bash
git add src/components/home/FinalCtaSection.tsx
git commit -m "feat: make FinalCtaSection content CMS-driven"
```

---

### Task 15: End-to-end verification

**Step 1: Run the dev server**

```bash
npm run dev
```

**Step 2: Verify the homepage** — Visit `http://localhost:3000`. All content should render identically to before (because seed data matches hardcoded values).

**Step 3: Verify Studio editing** — Go to `/studio` → Homepage. Change a heading (e.g., hero heading to "Go Further. Way Faster."). Save. Reload the homepage. Confirm the change appears.

**Step 4: Verify fallbacks** — Temporarily delete the homepage document in Studio. Reload the homepage. Confirm it still renders with hardcoded fallback values (no crashes).

**Step 5: Build check**

```bash
npm run build
```

Confirm no TypeScript errors or build failures.

**Step 6: Final commit**

If any fixes were needed, commit them. Then:

```bash
git add -A
git commit -m "feat: homepage fully CMS-driven via Sanity singleton"
```
