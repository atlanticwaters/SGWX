# Section Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a shared SectionLayout wrapper so 7 content sections support Sanity-toggleable left/right alignment and optional inline images.

**Architecture:** Hybrid wrapper approach — a `SectionLayout` component handles the outer shell (section tag, background, container, optional 2-column grid), while each section keeps its unique content as children. Sanity schemas get `align` and `inlineImage` fields per section group.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Sanity CMS, Framer Motion

---

### Task 1: Create `SectionLayout` wrapper component

**Files:**
- Create: `src/components/ui/SectionLayout.tsx`

**Step 1: Create the component**

```tsx
"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface InlineImage {
  url: string;
  alt: string;
}

interface SectionLayoutProps {
  children: React.ReactNode;
  align?: "left" | "right";
  backgroundUrl?: string;
  overlayColor?: string;
  inlineImage?: InlineImage;
  bgColor?: "default" | "alt";
  className?: string;
  id?: string;
}

export default function SectionLayout({
  children,
  align = "left",
  backgroundUrl,
  overlayColor,
  inlineImage,
  bgColor = "default",
  className = "",
  id,
}: SectionLayoutProps) {
  const bg = bgColor === "alt" ? "bg-sgwx-bg-alt" : "bg-sgwx-bg";

  return (
    <section id={id} className={`relative overflow-hidden ${bg} py-16 md:py-24 ${className}`}>
      {backgroundUrl && (
        <SectionBackground
          src={backgroundUrl}
          overlayColor={overlayColor as OverlayColor}
        />
      )}
      <Container>
        {inlineImage?.url ? (
          <div
            className={`flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 ${
              align === "right" ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Copy column — 60% */}
            <div className="flex-1 min-w-0">{children}</div>

            {/* Image column — 40% */}
            <AnimatedSection delay={0.2} className="w-full lg:w-[40%] lg:shrink-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={inlineImage.url}
                  alt={inlineImage.alt}
                  fill
                  className="object-cover"
                  style={{
                    filter:
                      "brightness(0.9) contrast(1.05) saturate(0.85)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/40 via-transparent to-transparent" />
              </div>
            </AnimatedSection>
          </div>
        ) : (
          children
        )}
      </Container>
    </section>
  );
}

export type { InlineImage };
```

**Step 2: Verify build**

Run: `npx next build 2>&1 | grep -E "Compiled|error|Error" | head -5`
Expected: `Compiled successfully`

**Step 3: Commit**

```bash
git add src/components/ui/SectionLayout.tsx
git commit -m "feat: add SectionLayout wrapper component for toggleable alignment + inline images"
```

---

### Task 2: Add Sanity schema fields to model-page

**Files:**
- Modify: `src/sanity/schemaTypes/documents/model-page.ts`

**Step 1: Add align + inlineImage fields to each of the 5 section groups**

For each group (rightTeam, microteams, momentum, continuity, technology), add two fields right after the existing background field:

```ts
// Add after each {sectionName}Background field:
defineField({
  name: '{sectionName}Align',
  type: 'string',
  title: 'Alignment',
  description: 'Left or right align the content',
  group: '{groupName}',
  options: {
    list: [
      { title: 'Left', value: 'left' },
      { title: 'Right', value: 'right' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  initialValue: '{defaultValue}',  // see defaults below
}),
defineField({
  name: '{sectionName}InlineImage',
  type: 'image',
  title: 'Inline Image',
  description: 'Optional image displayed alongside the copy block',
  group: '{groupName}',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    }),
  ],
}),
```

**Field names and defaults:**

| Group | Align Field | Default | InlineImage Field |
|-------|------------|---------|-------------------|
| rightTeam | `rightTeamAlign` | `'right'` | `rightTeamInlineImage` |
| microteams | `microteamsAlign` | `'right'` | `microteamsInlineImage` |
| momentum | `momentumAlign` | `'left'` | `momentumInlineImage` |
| continuity | `continuityAlign` | `'left'` | `continuityInlineImage` |
| technology | `technologyAlign` | `'right'` | `technologyInlineImage` |

**Step 2: Verify build**

Run: `npx next build 2>&1 | grep -E "Compiled|error|Error" | head -5`
Expected: `Compiled successfully`

**Step 3: Commit**

```bash
git add src/sanity/schemaTypes/documents/model-page.ts
git commit -m "feat: add align and inlineImage fields to model page schema"
```

---

### Task 3: Add Sanity schema fields to members-page

**Files:**
- Modify: `src/sanity/schemaTypes/documents/members-page.ts`

**Step 1: Add align + inlineImage fields to growth and join groups**

Same pattern as Task 2.

| Group | Align Field | Default | InlineImage Field |
|-------|------------|---------|-------------------|
| growth | `growthAlign` | `'right'` | `growthInlineImage` |
| join | `joinAlign` | `'left'` | `joinInlineImage` |

**Step 2: Verify build**

Run: `npx next build 2>&1 | grep -E "Compiled|error|Error" | head -5`
Expected: `Compiled successfully`

**Step 3: Commit**

```bash
git add src/sanity/schemaTypes/documents/members-page.ts
git commit -m "feat: add align and inlineImage fields to members page schema"
```

---

### Task 4: Update GROQ queries and TypeScript types

**Files:**
- Modify: `src/lib/sanity/queries.ts`

**Step 1: Add types to `ModelPageData` interface (~line 525)**

Add after each section's existing fields:

```ts
rightTeamAlign?: string;
rightTeamInlineImage?: { url: string; alt: string };
// ... repeat for microteams, momentum, continuity, technology
```

Full additions:
```ts
rightTeamAlign?: string;
rightTeamInlineImage?: { url: string; alt: string };
microteamsAlign?: string;
microteamsInlineImage?: { url: string; alt: string };
momentumAlign?: string;
momentumInlineImage?: { url: string; alt: string };
continuityAlign?: string;
continuityInlineImage?: { url: string; alt: string };
technologyAlign?: string;
technologyInlineImage?: { url: string; alt: string };
```

**Step 2: Add types to `MembersPageData` interface (~line 656)**

```ts
growthAlign?: string;
growthInlineImage?: { url: string; alt: string };
joinAlign?: string;
joinInlineImage?: { url: string; alt: string };
```

**Step 3: Create an inline image GROQ projection helper**

Add near the existing `SECTION_BG` helper:

```ts
const INLINE_IMG = (field: string) =>
  `"${field}": ${field} { "url": asset->url + "?w=800&q=80&auto=format", "alt": alt }`;
```

**Step 4: Update model page GROQ query**

Add to the getModelPage query alongside existing fields:

```
rightTeamAlign, ${INLINE_IMG("rightTeamInlineImage")},
microteamsAlign, ${INLINE_IMG("microteamsInlineImage")},
momentumAlign, ${INLINE_IMG("momentumInlineImage")},
continuityAlign, ${INLINE_IMG("continuityInlineImage")},
technologyAlign, ${INLINE_IMG("technologyInlineImage")},
```

**Step 5: Update members page GROQ query**

Add to getMembersPage query:

```
growthAlign, ${INLINE_IMG("growthInlineImage")},
joinAlign, ${INLINE_IMG("joinInlineImage")},
```

**Step 6: Verify build**

Run: `npx next build 2>&1 | grep -E "Compiled|error|Error" | head -5`
Expected: `Compiled successfully`

**Step 7: Commit**

```bash
git add src/lib/sanity/queries.ts
git commit -m "feat: add align and inlineImage fields to GROQ queries and types"
```

---

### Task 5: Refactor model page sections (5 components)

**Files:**
- Modify: `src/components/model/RightTeamSection.tsx`
- Modify: `src/components/model/MicroteamSection.tsx`
- Modify: `src/components/model/TechnologySection.tsx`
- Modify: `src/components/model/ContinuitySection.tsx`
- Modify: `src/components/model/MomentumSection.tsx`

**Step 1: Refactor each component**

For each component, apply this pattern:

1. Remove imports: `Container`, `SectionBackground`, `OverlayColor`
2. Add import: `SectionLayout` and `InlineImage` from `@/components/ui/SectionLayout`
3. Add props: `align?: string`, `inlineImage?: { url: string; alt: string }`
4. Replace the outer `<section>` + `SectionBackground` + `Container` with `<SectionLayout>`
5. Make text alignment dynamic: `${isRight ? "ml-auto text-right" : ""}` where `isRight = (align ?? defaultAlign) === "right"`

**Example — TechnologySection (simplest, good template):**

Before: wraps content in `<section>` + `SectionBackground` + `Container`
After:

```tsx
import SectionLayout from "@/components/ui/SectionLayout";
import type { InlineImage } from "@/components/ui/SectionLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

// ... defaultParagraphs stays the same ...

interface TechnologySectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  align?: string;
  inlineImage?: InlineImage;
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function TechnologySection({ eyebrow, heading, paragraphs, align, inlineImage, backgroundUrl, overlayColor }: TechnologySectionProps) {
  const paras = paragraphs ?? defaultParagraphs;
  const sectionAlign = (align as "left" | "right") ?? "right";
  const isRight = sectionAlign === "right";

  return (
    <SectionLayout
      align={sectionAlign}
      bgColor="alt"
      backgroundUrl={backgroundUrl}
      overlayColor={overlayColor}
      inlineImage={inlineImage}
    >
      <AnimatedSection>
        <SectionHeading
          eyebrow={eyebrow ?? "Technology"}
          heading={heading ?? "The Right Tools for the Job."}
          align={sectionAlign}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.12}>
        <div className={`mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg ${isRight ? "ml-auto text-right" : ""}`}>
          {paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </AnimatedSection>
    </SectionLayout>
  );
}
```

**Apply the same pattern to all 5 components.** Key differences per component:

- **RightTeamSection**: `bgColor="alt"`, default align `"right"`, `size="display"` on heading
- **MicroteamSection**: `bgColor="alt"`, default align `"right"`, has bullets list + closing paragraph as additional children. Bullet dot position flips based on `isRight`.
- **MomentumSection**: `bgColor="default"`, default align `"left"`, has bullets list
- **ContinuitySection**: `bgColor="alt"`, default align `"left"`
- **TechnologySection**: `bgColor="alt"`, default align `"right"`

**Step 2: Verify build**

Run: `npx next build 2>&1 | grep -E "Compiled|error|Error" | head -5`
Expected: `Compiled successfully`

**Step 3: Commit**

```bash
git add src/components/model/RightTeamSection.tsx src/components/model/MicroteamSection.tsx src/components/model/TechnologySection.tsx src/components/model/ContinuitySection.tsx src/components/model/MomentumSection.tsx
git commit -m "refactor: model page sections use SectionLayout wrapper"
```

---

### Task 6: Refactor members page sections (2 components)

**Files:**
- Modify: `src/components/members/GrowthSection.tsx`
- Modify: `src/components/members/JoinSection.tsx`

**Step 1: Refactor each component**

Same pattern as Task 5.

- **GrowthSection**: `bgColor="default"`, default align `"right"`, `size="medium"` on heading
- **JoinSection**: `bgColor="default"`, default align `"left"`, has CTA button as additional child. Keep `py-24 md:py-32` padding by passing `className="py-24 md:py-32"` to SectionLayout (override the default py-16 md:py-24).

**Step 2: Verify build**

Run: `npx next build 2>&1 | grep -E "Compiled|error|Error" | head -5`
Expected: `Compiled successfully`

**Step 3: Commit**

```bash
git add src/components/members/GrowthSection.tsx src/components/members/JoinSection.tsx
git commit -m "refactor: members page sections use SectionLayout wrapper"
```

---

### Task 7: Update page components to pass new props

**Files:**
- Modify: `src/app/model/page.tsx`
- Modify: `src/app/members/page.tsx`

**Step 1: Update model page**

Pass `align` and `inlineImage` from Sanity data to each of the 5 refactored sections:

```tsx
<TechnologySection
  eyebrow={data?.technologyEyebrow}
  heading={data?.technologyHeading}
  paragraphs={data?.technologyParagraphs}
  align={data?.technologyAlign}
  inlineImage={data?.technologyInlineImage}
  backgroundUrl={data?.technologyBackground?.imageUrl}
  overlayColor={data?.technologyBackground?.overlayColor}
/>
```

Repeat for all 5 sections.

**Step 2: Update members page**

Pass `align` and `inlineImage` to GrowthSection and JoinSection:

```tsx
<GrowthSection
  eyebrow={data?.growthEyebrow}
  heading={data?.growthHeading}
  paragraphs={data?.growthParagraphs}
  align={data?.growthAlign}
  inlineImage={data?.growthInlineImage}
  backgroundUrl={growthBg?.imageUrl}
  overlayColor={growthBg?.overlayColor}
/>
```

**Step 3: Verify build**

Run: `npx next build 2>&1 | grep -E "Compiled|error|Error" | head -5`
Expected: `Compiled successfully`

**Step 4: Commit**

```bash
git add src/app/model/page.tsx src/app/members/page.tsx
git commit -m "feat: pass align and inlineImage props from Sanity to section components"
```

---

### Task 8: Deploy schema and verify in Studio

**Step 1: Deploy schema to Sanity cloud**

Run: `npx sanity@latest schema deploy`
Expected: Schema deployed successfully

**Step 2: Verify in Sanity Studio**

Open `/studio` and check:
- Each section group in Model Page and Members Page shows Alignment radio buttons
- Each section group shows Inline Image upload field
- Toggling alignment and saving works

**Step 3: Commit any final adjustments**

```bash
git add -A
git commit -m "chore: deploy schema with align and inlineImage fields"
```
