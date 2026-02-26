# Sageworx (SGWX) Design System
**Art Direction by the SGWX Art Director Agent**
**Version:** 1.0 — February 2026

---

## 1. Design Pillars

These five words govern every visual decision on the site. When in doubt, return to them.

| Pillar | Meaning |
|---|---|
| **Sovereign** | Dark, authoritative, self-assured. Never desperate or salesy. |
| **Organic-Technical** | Network motifs (nodes, pulses, mycelium) live inside a rigorous grid. Nature and code coexist. |
| **Legible** | Sophisticated darkness never sacrifices readability. Contrast and hierarchy are mandatory. |
| **Kinetic** | Motion is not decoration. It communicates aliveness — the network is alive, the team is active. |
| **Editorial** | Copy-forward. Typography does heavy lifting. White space is expensive and intentional. |

---

## 2. Color System

### 2.1 Palette Validation and Additions

The existing Tailwind tokens are sound. The following additions and semantic aliases are required.

**Add to `globals.css` `@theme` block:**

```css
@theme {
  /* ── Existing tokens (validated) ────────────────────────────── */
  --color-sgwx-bg:             #030d0a;   /* page background */
  --color-sgwx-bg-alt:         #021a14;   /* alternate section bg */
  --color-sgwx-surface:        #0a1f18;   /* card / panel surface */
  --color-sgwx-surface-hover:  #0d2b22;   /* card hover state */
  --color-sgwx-border:         #143d2e;   /* visible borders */
  --color-sgwx-border-subtle:  #0a2a1e;   /* hairline / divider borders */

  --color-sgwx-green:          #17a86b;   /* primary accent */
  --color-sgwx-green-bright:   #30ff88;   /* CTA hover, pulse highlights */
  --color-sgwx-green-muted:    #0d6b4a;   /* deep/ambient green */
  --color-sgwx-green-pale:     #e6ffbb;   /* icon fills, light accents */

  --color-sgwx-teal:           #0a4f5e;   /* secondary cool accent */
  --color-sgwx-blue:           #042a3d;   /* deep blue surfaces */
  --color-sgwx-cyan:           #88eeff;   /* highlight / HUD accent */

  --color-sgwx-yellow:         #d4c94a;   /* warm accent, gold nodes */
  --color-sgwx-yellow-pale:    #f0e97a;   /* pale yellow highlight */
  --color-sgwx-gold:           #d4e840;   /* gold-lime (Agriculture district) */

  --color-sgwx-text:           #e8f5ee;   /* primary body text */
  --color-sgwx-text-muted:     #8aab9a;   /* secondary / supporting text */
  --color-sgwx-text-dim:       #4a6b5a;   /* placeholder, disabled, footnote */

  /* ── NEW: Semantic / UI tokens ───────────────────────────────── */
  --color-sgwx-overlay:        rgba(3, 13, 10, 0.72);   /* modal/drawer backdrop */
  --color-sgwx-scrim:          rgba(3, 13, 10, 0.55);   /* section overlay scrim */
  --color-sgwx-green-glow:     rgba(23, 168, 107, 0.18); /* glow halo around CTAs */
  --color-sgwx-green-glow-strong: rgba(48, 255, 136, 0.28); /* hover glow state */

  /* ── NEW: Status / HUD tokens ────────────────────────────────── */
  --color-sgwx-status-online:  #30ff88;   /* pulsing online dot */
  --color-sgwx-status-active:  #88eeff;   /* network active indicator */
  --color-sgwx-status-dim:     #0d6b4a;   /* inactive / standby */

  /* ── NEW: Comparison table tokens ───────────────────────────── */
  --color-sgwx-highlight-col:  #0a2318;   /* highlighted column bg (Sageworx) */
  --color-sgwx-check:          #30ff88;   /* checkmark / positive indicator */
  --color-sgwx-cross:          #4a6b5a;   /* negative / N/A indicator */

  /* ── Typography ─────────────────────────────────────────────── */
  --font-sans:    'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;
  --font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* ── Spacing anchors ─────────────────────────────────────────── */
  --spacing-section:    6rem;   /* 96px — major section vertical padding */
  --spacing-section-sm: 4rem;   /* 64px — compact section padding */
}
```

### 2.2 Color Usage Rules

**Do:**
- Use `sgwx-bg` (#030d0a) as the default page background on all pages
- Use `sgwx-surface` (#0a1f18) for all card and panel backgrounds
- Use `sgwx-green` (#17a86b) as the single primary action color
- Use `sgwx-green-bright` (#30ff88) only on hover states and live animation pulses — never at rest
- Use `sgwx-cyan` (#88eeff) and `sgwx-yellow` (#d4c94a) as secondary accents in animations and the comparison table only
- Use `sgwx-green-pale` (#e6ffbb) for Streamline Cyber icon fills at all sizes

**Do not:**
- Use `sgwx-green-bright` (#30ff88) as a static text or background color — it reads neon and cheap at rest
- Mix cyan and yellow in the same UI component without the animation context to justify both
- Place `sgwx-text` (#e8f5ee) text on `sgwx-surface` without testing contrast — the pairing passes AA at body sizes but must be verified at small sizes (below 14px)
- Use white (#ffffff) anywhere. The warmest text is `sgwx-text` (#e8f5ee)

### 2.3 Contrast Reference

| Foreground | Background | Ratio | WCAG |
|---|---|---|---|
| `#e8f5ee` text on `#030d0a` bg | — | ~17:1 | AAA |
| `#e8f5ee` text on `#0a1f18` surface | — | ~12:1 | AAA |
| `#8aab9a` muted on `#030d0a` | — | ~7:1 | AA |
| `#8aab9a` muted on `#0a1f18` | — | ~5:1 | AA (body) |
| `#17a86b` green on `#030d0a` | — | ~5.2:1 | AA |
| `#4a6b5a` dim on `#030d0a` | — | ~2.8:1 | Fails — use only for decorative/non-essential text |

`sgwx-text-dim` (#4a6b5a) fails WCAG at body sizes. Restrict it to decorative labels, footnotes, and meta text that is non-essential. Never use it for navigation, body copy, or actionable text.

---

## 3. Typography System

### 3.1 Font Stack

**Display + Body: Inter**
The entire site runs Inter. It is geometric, neutral, and scales from 10px caption labels to 96px hero displays without personality clashes.

**Monospace: JetBrains Mono**
Used exclusively for HUD elements, status indicators, code labels, step numbers, and any text that references the "protocol" / system metaphor.

### 3.2 Type Scale

All values use Tailwind v4 utility classes. Responsive variants are required at the breakpoints shown.

| Role | Class | Size | Weight | Tracking | Leading | Font |
|---|---|---|---|---|---|---|
| **Hero H1** | `text-6xl md:text-7xl lg:text-8xl` | 60–96px | `font-bold` (700) | `tracking-tight` (-0.02em) | `leading-none` | sans |
| **Page H1** | `text-5xl md:text-6xl` | 48–60px | `font-bold` (700) | `tracking-tight` | `leading-tight` (1.1) | sans |
| **Section H2** | `text-3xl md:text-4xl lg:text-5xl` | 30–48px | `font-bold` (700) | `tracking-tight` | `leading-tight` | sans |
| **Card H3** | `text-xl md:text-2xl` | 20–24px | `font-semibold` (600) | `tracking-normal` | `leading-snug` (1.3) | sans |
| **H4 (label heading)** | `text-base md:text-lg` | 16–18px | `font-semibold` (600) | `tracking-wide` (0.04em) | `leading-snug` | sans |
| **H5 (component title)** | `text-sm` | 14px | `font-semibold` (600) | `tracking-wider` (0.08em) | `leading-normal` | sans |
| **H6 (micro label)** | `text-xs` | 12px | `font-medium` (500) | `tracking-widest` (0.12em) | `leading-normal` | mono |
| **Body Large** | `text-lg md:text-xl` | 18–20px | `font-normal` (400) | `tracking-normal` | `leading-relaxed` (1.65) | sans |
| **Body** | `text-base` | 16px | `font-normal` (400) | `tracking-normal` | `leading-relaxed` (1.65) | sans |
| **Body Small** | `text-sm` | 14px | `font-normal` (400) | `tracking-normal` | `leading-relaxed` | sans |
| **Caption / Meta** | `text-xs` | 12px | `font-normal` (400) | `tracking-wide` | `leading-normal` | sans or mono |
| **Nav Links** | `text-sm` | 14px | `font-normal` (400) | `tracking-wide` (0.04em) | — | sans |
| **CTA Labels** | `text-sm` | 14px | `font-semibold` (600) | `tracking-widest` (0.12em) | — | sans |
| **HUD / Status** | `text-[10px]` | 10px | `font-medium` (500) | `tracking-widest` (0.16em) | — | mono |
| **Step Numbers** | `text-sm` | 14px | `font-medium` (500) | `tracking-widest` | — | mono |

### 3.3 Typography Rules

**Hero H1 treatment:**
The hero headline "Go Further. Faster." and page-level H1s should be set in `font-bold`, `tracking-tight`. Never use a display weight heavier than 700 — Inter Bold is the ceiling.

**Uppercase usage:**
Uppercase (`uppercase` class) is reserved for: CTA button labels, HUD/status indicators, badge/tag text, nav labels, and section eyebrow labels. Never uppercase body copy or H2 headings.

**Mono usage:**
JetBrains Mono appears only in: status indicators, step numbers (01, 02...), code-adjacent labels, badge text with a "protocol" feel, and the "NETWORK: ACTIVE / STATUS: ONLINE" HUD elements.

**Hierarchy rule:**
Every content block must have exactly one element at the top of the visual hierarchy. Do not set two adjacent elements at the same visual weight.

**Color in type:**
- H1/H2 on dark backgrounds: `text-sgwx-text` (#e8f5ee)
- Subheadings and supporting copy: `text-sgwx-text-muted` (#8aab9a)
- Accent text (emphasized words, inline callouts): `text-sgwx-green` (#17a86b)
- HUD / status labels: `text-sgwx-green` or `text-sgwx-cyan` depending on context
- Dim meta text (dates, footnotes): `text-sgwx-text-dim` (#4a6b5a) — non-essential only

---

## 4. Spacing System

### 4.1 Base Scale

Tailwind's default 4px base scale is used. The following named values define the major structural rhythm:

| Token | Value | Usage |
|---|---|---|
| `spacing-section` (96px) | `py-24` | Full-width section vertical padding (desktop) |
| `spacing-section-sm` (64px) | `py-16` | Section padding on mobile |
| `px-6` (24px) | — | Horizontal edge gutter (mobile) |
| `px-8` (32px) | — | Horizontal edge gutter (tablet) |
| `px-12` (48px) | — | Horizontal edge gutter (desktop) |
| Card padding | `p-6` or `p-8` | Internal card padding |
| Component gap | `gap-4` to `gap-6` | Gap between inline components |
| Section gap | `gap-8` to `gap-12` | Gap between section elements |

### 4.2 Max-Width and Container

```
max-w-7xl (1280px) — primary content container for all sections
max-w-5xl (1024px) — narrow prose content (process steps, body copy blocks)
max-w-3xl (768px)  — section headings and subheadings, constrained for readability
```

**The container class pattern:**
```html
<div class="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
```

### 4.3 Section Spacing Pattern

Every page section follows this vertical rhythm:

```html
<section class="py-16 md:py-24 bg-sgwx-bg">        <!-- or bg-sgwx-bg-alt for alternating -->
  <div class="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
    <!-- Section eyebrow (optional) -->
    <p class="mb-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Category Label</p>
    <!-- Section heading -->
    <h2 class="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-sgwx-text max-w-3xl">
      Section Heading
    </h2>
    <!-- Section subheading (optional) -->
    <p class="mb-12 text-lg md:text-xl leading-relaxed text-sgwx-text-muted max-w-2xl">
      Supporting subhead copy.
    </p>
    <!-- Section content grid -->
    ...
  </div>
</section>
```

**Alternating section backgrounds:**
Alternate between `bg-sgwx-bg` (#030d0a) and `bg-sgwx-bg-alt` (#021a14) across consecutive sections. Never place `bg-sgwx-surface` (#0a1f18) as a full-width section background — it is for cards and panels only.

---

## 5. Component Design Guidelines

### 5.1 Buttons

Three variants. All buttons use `rounded-full`, `uppercase`, `tracking-widest`, and `font-semibold`. No square or slightly-rounded buttons — the pill shape is mandatory for this brand.

**Primary Button**
The main call-to-action. Used once per major section. The green fill reads as the energy source of the page.

```html
<button class="
  inline-flex items-center justify-center gap-2
  rounded-full
  bg-sgwx-green
  px-7 py-3
  text-sm font-semibold tracking-widest uppercase
  text-sgwx-bg
  transition-all duration-200
  hover:bg-sgwx-green-bright
  hover:shadow-[0_0_24px_rgba(48,255,136,0.35)]
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sgwx-green
">
  Activate Your Team
</button>
```

Note: The `text-sgwx-bg` on the primary button uses the near-black background color as the text color. This achieves maximum contrast (roughly 17:1) against the green fill.

**Secondary Button**
Border + transparent fill. Used for secondary actions alongside a primary CTA.

```html
<button class="
  inline-flex items-center justify-center gap-2
  rounded-full
  border border-sgwx-green
  px-7 py-3
  text-sm font-semibold tracking-widest uppercase
  text-sgwx-green
  transition-all duration-200
  hover:bg-sgwx-green/10
  hover:shadow-[0_0_16px_rgba(23,168,107,0.2)]
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sgwx-green
">
  Meet Our Members
</button>
```

**Ghost Button**
Text only. Used for tertiary/inline actions ("Learn more", "View all").

```html
<button class="
  inline-flex items-center justify-center gap-1.5
  text-sm font-semibold tracking-widest uppercase
  text-sgwx-text-muted
  transition-colors duration-150
  hover:text-sgwx-green
  group
">
  View All
  <span class="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
</button>
```

**Nav CTA (header pill)**
A lighter treatment for the header CTA. Not uppercase — slightly warmer and more approachable than the hero CTAs.

```html
<a class="
  rounded-full
  border border-sgwx-green
  bg-sgwx-green/10
  px-5 py-2
  text-sm font-medium
  text-sgwx-green
  transition-all duration-200
  hover:bg-sgwx-green/20
  hover:shadow-[0_0_12px_rgba(23,168,107,0.2)]
">
  Let's Chat!
</a>
```

### 5.2 Cards

**Base Content Card**
The workhorse card used for ICP cards, process cards, and general content blocks.

```html
<div class="
  rounded-2xl
  border border-sgwx-border
  bg-sgwx-surface
  p-6 md:p-8
  transition-all duration-300
  hover:border-sgwx-green/40
  hover:bg-sgwx-surface-hover
  hover:shadow-[0_0_32px_rgba(23,168,107,0.08)]
">
  <!-- Icon (optional) -->
  <!-- Heading -->
  <!-- Body -->
</div>
```

**Icon Card** (for "Changing Game" section with Streamline Cyber icons)
The icon sits in a contained square above the heading. Icon background is a subtle green tint.

```html
<div class="
  rounded-2xl
  border border-sgwx-border
  bg-sgwx-surface
  p-8
  group
  transition-all duration-300
  hover:border-sgwx-green/40
  hover:bg-sgwx-surface-hover
">
  <div class="
    mb-6
    inline-flex items-center justify-center
    h-12 w-12
    rounded-xl
    bg-sgwx-green/10
    border border-sgwx-green/20
  ">
    <!-- SVG icon (32×32, stroke: #55850d, fill: #e6ffbb on fills) -->
  </div>
  <h3 class="mb-3 text-xl font-semibold tracking-normal text-sgwx-text">Card Heading</h3>
  <p class="text-base leading-relaxed text-sgwx-text-muted">Card body copy.</p>
</div>
```

Icon sizing within cards: render Streamline Cyber SVGs at 32×32. Do not resize the stroke weight — the 1px stroke is intentional and calibrated for the icon's visual language.

**Member Card** (Featured member profile — "Ocean's 11" style)
Full-bleed photo treatment with overlay gradient. Horizontal layout on desktop.

```html
<div class="
  rounded-2xl
  border border-sgwx-border
  bg-sgwx-surface
  overflow-hidden
  grid grid-cols-1 md:grid-cols-[280px_1fr]
">
  <!-- Photo column -->
  <div class="relative aspect-[3/4] md:aspect-auto">
    <!-- next/image, object-cover -->
    <!-- Photo treatment: see Section 8 -->
  </div>
  <!-- Content column -->
  <div class="p-8 flex flex-col gap-4">
    <p class="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Character Metaphor</p>
    <h3 class="text-2xl font-bold tracking-tight text-sgwx-text">Member Name</h3>
    <p class="text-sm tracking-wide text-sgwx-text-muted">Title / Specialties</p>
    <blockquote class="border-l-2 border-sgwx-green pl-4 italic text-sgwx-text-muted text-base">
      "Mantra"
    </blockquote>
    <p class="text-sm leading-relaxed text-sgwx-text-muted">Bio copy.</p>
    <p class="text-xs font-mono text-sgwx-text-dim">FAVORITE TOOLS: Tool1, Tool2</p>
  </div>
</div>
```

**Case Study Card**
Thumbnail with hover zoom, category badge, headline, excerpt.

```html
<div class="
  group
  rounded-2xl
  border border-sgwx-border
  bg-sgwx-surface
  overflow-hidden
  transition-all duration-300
  hover:border-sgwx-green/40
">
  <div class="relative aspect-video overflow-hidden">
    <!-- Thumbnail image with group-hover:scale-105 transition-transform duration-500 -->
  </div>
  <div class="p-6">
    <p class="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Category</p>
    <h3 class="mb-2 text-xl font-semibold text-sgwx-text">Case Study Title</h3>
    <p class="mb-4 text-sm leading-relaxed text-sgwx-text-muted">Short description.</p>
    <!-- Ghost button CTA -->
  </div>
</div>
```

**Blog / Spotlight Card**
Same structure as Case Study Card. The tag text is the visual differentiator from case studies.

**Process Step Card** (numbered 01–06)
No image. Number is displayed large in mono, dimmed, as a background element.

```html
<div class="
  relative
  rounded-2xl
  border border-sgwx-border-subtle
  bg-sgwx-surface
  p-6 md:p-8
  overflow-hidden
  transition-all duration-300
  hover:border-sgwx-border
">
  <!-- Background number (decorative) -->
  <span class="
    absolute -top-2 -right-2
    font-mono text-7xl font-bold
    text-sgwx-green/6
    select-none pointer-events-none
    leading-none
  ">01</span>
  <!-- Step number label -->
  <p class="mb-4 font-mono text-xs tracking-widest uppercase text-sgwx-green">Step 01</p>
  <h3 class="mb-3 text-lg font-semibold text-sgwx-text">Step Title</h3>
  <p class="text-sm leading-relaxed text-sgwx-text-muted">Step description.</p>
  <p class="mt-4 text-xs font-mono text-sgwx-text-dim">OUTPUT: Deliverable Name</p>
</div>
```

### 5.3 Comparison Table

The three-column comparison table (Traditional Agency / Freelance Marketplace / Sageworx) is a signature component.

**Layout rules:**
- Desktop: Full three-column table. Sageworx column is visually highlighted with a different background and a subtle top border accent in `sgwx-green`.
- Mobile: Vertical stack. Show only the Sageworx column by default with an option to toggle the others, or use horizontal scroll with sticky first column.

**Column highlight (Sageworx column):**
```css
/* The highlighted column gets: */
background: var(--color-sgwx-highlight-col);   /* #0a2318 */
border-top: 2px solid var(--color-sgwx-green); /* #17a86b */
```

**Cell content:**
- Positive indicator: `✓` in `text-sgwx-check` (#30ff88) — or an SVG checkmark
- Negative indicator: `—` in `text-sgwx-cross` (#4a6b5a)
- Row headers: `text-sm font-medium text-sgwx-text-muted`
- Column headers: `text-sm font-semibold tracking-widest uppercase text-sgwx-text`
- The Sageworx column header uses `text-sgwx-green font-bold`

**Table border treatment:**
- Row dividers: `border-b border-sgwx-border-subtle`
- No vertical column dividers — use column background color distinction instead
- Table outer border: `border border-sgwx-border rounded-2xl overflow-hidden`

### 5.4 Header / Navigation

```
Position: fixed top-0, full-width, z-50
Background: bg-sgwx-bg/80 backdrop-blur-xl
Border: border-b border-sgwx-border-subtle
Height: 64px (py-4 with logo/nav at 36px tall)
```

**Logo treatment:**
The wordmark "Sageworx" in `text-sgwx-text font-bold text-xl tracking-tight`, followed by the ONLINE status pill. This pill is a core brand element on every page.

```html
<span class="
  inline-flex items-center gap-1.5
  rounded-full
  border border-sgwx-green/30
  bg-sgwx-green/10
  px-2.5 py-0.5
  font-mono text-[10px] tracking-widest uppercase
  text-sgwx-green
">
  <span class="h-1.5 w-1.5 rounded-full bg-sgwx-green-bright animate-pulse"></span>
  Online
</span>
```

**Nav link active state:**
Active page nav link: `text-sgwx-text font-medium` with a subtle 1px `border-b border-sgwx-green` underline offset by 2px.

**Scroll behavior:**
On scroll past 80px, add `shadow-[0_1px_0_rgba(20,61,46,0.8)]` to reinforce the separation from page content.

### 5.5 Status Indicators / HUD Elements

These are a signature brand element. Treat them with care — they must read as functional system readouts, not decorative badges.

**Core HUD pattern:**
```html
<div class="flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase">
  <span class="flex items-center gap-2 text-sgwx-text-muted">
    STATUS:
    <span class="flex items-center gap-1.5 text-sgwx-green">
      <span class="h-1.5 w-1.5 rounded-full bg-sgwx-green-bright animate-pulse"></span>
      ONLINE
    </span>
  </span>
  <span class="flex items-center gap-2 text-sgwx-text-muted">
    NETWORK:
    <span class="text-sgwx-cyan">ACTIVE</span>
  </span>
</div>
```

**HUD element rules:**
- Always monospace (`font-mono`)
- Always uppercase (`uppercase`)
- Always smallest text size (`text-[10px]`)
- Always `tracking-widest`
- The pulsing dot is `sgwx-green-bright` (#30ff88), not `sgwx-green` (#17a86b)
- "NETWORK: ACTIVE" uses `sgwx-cyan` (#88eeff) — the one place cyan appears in UI text
- Use HUD elements at the hero bottom, in the header, and at the footer — not inside content cards

**Progress / draw bar** (used in the Wireframe City animation, translatable to UI):
```html
<div class="h-px w-44 bg-sgwx-border overflow-hidden rounded-full">
  <div class="h-full bg-sgwx-green transition-all duration-300" style="width: 65%"></div>
</div>
```

### 5.6 Badges and Tags

Used for case study categories, blog post tags, and capability labels.

```html
<!-- Category badge (green) -->
<span class="
  inline-block
  rounded-full
  border border-sgwx-green/30
  bg-sgwx-green/10
  px-3 py-0.5
  font-mono text-[10px] tracking-widest uppercase
  text-sgwx-green
">Category</span>

<!-- Neutral tag -->
<span class="
  inline-block
  rounded-full
  border border-sgwx-border
  bg-sgwx-surface
  px-3 py-0.5
  font-mono text-[10px] tracking-widest uppercase
  text-sgwx-text-muted
">Tag</span>
```

---

## 6. Layout and Grid

### 6.1 Grid System

**Desktop:** 12-column grid with 24px gutters, contained within `max-w-7xl`.

Common column splits:
- 2-column equal: `grid grid-cols-1 md:grid-cols-2 gap-6`
- 3-column equal: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- 2+1 asymmetric (text + visual): `grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center`
- Process grid (6-step): `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Member gallery: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`

### 6.2 Breakpoints

Tailwind's default breakpoints are used without modification:

| Name | Min-width | Use case |
|---|---|---|
| (base) | 0px | Mobile portrait |
| `sm` | 640px | Mobile landscape, 2-col grid start |
| `md` | 768px | Tablet — layout shifts activate |
| `lg` | 1024px | Desktop — full multi-column layouts |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Large monitors — cap at `max-w-7xl` |

### 6.3 Responsive Strategy

**Mobile-first.** All base styles are mobile. Progressive enhancement via `md:`, `lg:` prefixes.

**Critical responsive rules:**
- Hero H1: Starts at `text-5xl` on mobile, reaches `text-8xl` at `lg:`. Never smaller than 48px.
- Section padding: `py-16` on mobile, `py-24` on `md:+`.
- Navigation: Full desktop nav hidden below `lg:`. Hamburger menu at `lg:hidden`.
- Comparison table: Horizontal scroll (`overflow-x-auto`) on mobile. The Sageworx column should remain visible.
- Animation canvas: Reduce particle counts by 40% on mobile (detect via `window.innerWidth < 768`).
- Cards: Single column on mobile, grid at `md:+`.

---

## 7. Animation and Motion

### 7.1 Three.js Background Animations

**Page assignments:**
| Page | Animation | File reference |
|---|---|---|
| Home (hero) | Mycelium Network | `sgwx_animations_4.html` |
| Process | Wave Field (low angle) | `sgwx_animations_5.html` or `6.html` |
| Work / Impact | Wireframe City | `sgwx_animations_1.html` or `8.html` |
| Members | Mycelium variant or Network | `sgwx_animations_4.html` (reduced) |
| Model | Network variant | `sgwx_animations_4.html` (reduced) |

**Animation overlay stack (always applied over the Three.js canvas):**

```
Layer 1: Three.js canvas (absolute, inset-0, z-0)
Layer 2: Vignette overlay (z-10)
Layer 3: Film grain overlay (z-11)
Layer 4: Page content (relative, z-10 or higher)
```

**Vignette CSS (exact values from animation files):**
```css
background: radial-gradient(
  ellipse at 50% 50%,
  transparent 30%,
  rgba(2, 8, 6, 0.55) 65%,
  rgba(1, 5, 3, 0.92) 100%
);
```

**Film grain CSS (exact values):**
```css
opacity: 0.045;
mix-blend-mode: screen;
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
background-size: 200px 200px;
```

**Performance rules:**
- All Three.js animation components must be loaded with `next/dynamic` + `{ ssr: false }`.
- On mobile (`< 768px`): reduce `NODE_COUNT` from 160 to 80, `PULSE_COUNT` from 40 to 20.
- On reduced-motion preference (`prefers-reduced-motion: reduce`): stop the animation loop, freeze at a static frame. Do not remove the background — frozen particles are still atmospheric.

### 7.2 Framer Motion — Page Interactions

**Default entrance animation (scroll-triggered):**
```tsx
const fadeUp = {
  initial:   { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};
```

**Stagger children pattern (for card grids):**
```tsx
const container = {
  whileInView: { transition: { staggerChildren: 0.08 } }
};
const item = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};
```

**Hero text stagger (for H1 → subhead → CTA sequence):**
```tsx
// Stagger delay: 0ms, 120ms, 240ms, 360ms, 480ms
// Duration per element: 700ms
// Easing: [0.16, 1, 0.3, 1] — fast in, soft landing
```

**Easing reference:**
Always use `[0.16, 1, 0.3, 1]` (expo-out feel) for entrances. Never use `linear` or the default ease for UI motion. For exit/out animations: `[0.4, 0, 1, 1]` (ease-in).

### 7.3 Hover States

All hover transitions use `duration-200` or `duration-300`. Never exceed 400ms for a hover response.

**Card hover:** Border color shift + bg tint + subtle glow shadow. No scale transform on cards — they should feel solid, not bouncy.

**Button hover:** Background color shift (primary) or border fill (secondary) + glow shadow. No scale.

**Nav link hover:** Color shift only (`text-sgwx-text-muted` → `text-sgwx-text`). No underline animation.

**Image hover (case study thumbnails):** Subtle `scale-105` on the inner image only (not the card container), over `duration-500`. The card itself does not scale.

### 7.4 Page Transitions

Keep page transitions minimal. A simple opacity fade (300ms, ease-in-out) at the page level via Framer Motion's `AnimatePresence` is sufficient. Avoid slide transitions — they fight with the animated backgrounds.

### 7.5 The Pulsing Dot

The `animate-pulse` class on the ONLINE indicator dot is a key brand signature. Tailwind's default `pulse` animation is acceptable. Do not replace it with a custom animation unless the timing is `2s ease-in-out infinite`.

### 7.6 Animated Counters (Member Stats Section)

Counters animate from 0 to their target value when scrolled into view. Duration: 1.5s, easing: ease-out. Trigger on `whileInView` with `once: true`.

---

## 8. Visual Texture

### 8.1 Grain Overlay

Applied over every Three.js animation background. Also apply a lighter grain texture over hero sections that use a static gradient background (no Three.js canvas), using:

```css
opacity: 0.03;   /* lighter than the animation grain */
mix-blend-mode: screen;
```

Do not apply grain over card surfaces or content sections. Grain is a background-level treatment only.

### 8.2 Glow Effects

Ambient glow is used to suggest depth and energy. It should never be the primary design element — it is atmospheric.

**CTA button glow (on hover):**
```css
box-shadow: 0 0 24px rgba(48, 255, 136, 0.35);
```

**Card hover glow (subtle):**
```css
box-shadow: 0 0 32px rgba(23, 168, 107, 0.08);
```

**Section accent glow (used sparingly — one per page):**
A large, soft radial gradient placed behind a hero heading or a featured stat block:
```css
background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(23, 168, 107, 0.12) 0%, transparent 70%);
```

### 8.3 Borders and Depth

The border system creates the depth hierarchy on dark backgrounds. Cards stack above the page using three signals: background step (`sgwx-bg` → `sgwx-surface`), visible border, and hover glow.

- Page background: no border
- Cards at rest: `border-sgwx-border` (#143d2e)
- Cards on hover: `border-sgwx-green/40`
- Dividers / hairlines: `border-sgwx-border-subtle` (#0a2a1e)
- Never use `border-white` or full-opacity colored borders

### 8.4 Fog / Atmospheric Depth in Three.js

The animations use `FogExp2` (exponential fog) to fade distant elements into the background color. This creates the atmospheric depth that is core to the brand. When compositing page content over animations, ensure the content is visually "above" the fog — not swallowed by it. Position content overlays with sufficient contrast against both the dark background and any partially-visible animation elements.

---

## 9. Photography and Image Treatment

### 9.1 Member Headshots

The "Ocean's 11"-style character introductions require confident, editorial headshot treatment. Placeholder direction while real photography is pending:

**Aspect ratio:** Portrait, approximately 3:4 or 4:5.

**Color treatment:**
Apply a CSS/filter treatment that integrates headshots into the dark palette:
```css
/* Applied via a pseudo-element or the next/image wrapper div */
filter: contrast(1.05) brightness(0.92) saturate(0.85);
```
Additionally, overlay a gradient over the bottom of the headshot to blend into the card surface:
```css
background: linear-gradient(to top, #0a1f18 0%, transparent 40%);
```

**No circular crops.** Member headshots are rectangular, edge-to-edge within their card column.

**No white-background studio portraits.** Headshots should have dark, neutral, or environmental backgrounds. If studio shots with light backgrounds are unavoidable, apply a mix-blend-mode overlay.

### 9.2 Case Study Thumbnails

Aspect ratio: 16:9. Apply the same `contrast(1.05) brightness(0.92) saturate(0.85)` filter treatment. Case study images should feel dark and intentional, not lifted from a bright marketing library.

Hover state: The inner image scales to `scale-105` over 500ms. The card container maintains its border/background without scaling.

### 9.3 Logo Wall (Client Logos)

Logo treatment:
- At rest: `filter: brightness(0) invert(1)` with `opacity-25` — renders logos as white silhouettes at low opacity. Reads as a ghost list.
- On hover: `opacity-70` with no filter — allows the logo's natural color to show through against the dark background. Transition: 300ms.

Logos must be SVG or high-resolution PNG. No JPG logos.

### 9.4 Blog / Spotlight Thumbnails

Aspect ratio: 16:9. Apply the same filter treatment as case study thumbnails. If imagery is not available, use a dark gradient tile using the animation color palette as the background, with a subtle grain texture.

**Placeholder tile pattern:**
```css
background: linear-gradient(135deg, #0a1f18 0%, #021a14 50%, #042a3d 100%);
```
With the grain overlay at `opacity: 0.06`.

---

## 10. Icon Treatment

### 10.1 Streamline Cyber Icon Set

Icons use the Streamline Cyber style: outlined geometry with:
- Stroke color: `#55850d` (dark sage green)
- Fill color on accent shapes: `#e6ffbb` (pale green — `sgwx-green-pale`)
- White fill on base shapes: `#ffffff` — note this will need to be adapted on the dark background

**Dark background adaptation:**
On the dark site background, the original icon fill (`#ffffff`) becomes too stark. Apply the following adaptation:
- Replace white fills with `#0a1f18` (surface color) or remove fills entirely
- Keep stroke color at `#55850d` or increase to `#17a86b` (sgwx-green) for better contrast
- Keep pale green fills (`#e6ffbb`) — they read well on dark

**Icon container:** Always place icons inside a container that provides visual separation from the card background:
```html
<div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sgwx-green/10 border border-sgwx-green/20">
  <!-- SVG at 24×24 or 32×32 -->
</div>
```

**Icon sizes:**
- In-card icons: 24px (Streamline default) to 32px
- Section accent icons: 48px
- Navigation icons: 20px
- HUD/status icons: 12–16px

---

## 11. Section-by-Section Visual Direction

### Home Hero
- Full viewport height (`min-h-screen`)
- Mycelium Network animation behind content
- Centered content, vertically centered with slight upward offset (~45% from top)
- H1 "Go Further. Faster." at maximum size (`text-6xl md:text-7xl lg:text-8xl`)
- Subheading in `text-sgwx-text-muted`, max-w-2xl, centered
- Two CTAs side by side: Primary + Secondary
- HUD status bar fixed at bottom center of hero section, above scroll indicator
- Scroll indicator: thin vertical line, 40px tall, with a downward-traveling white dot animation

### Home — Changing Game
- `bg-sgwx-bg-alt` section background
- Large heading left-aligned, subhead in muted
- Two icon cards in a 2-column grid below the heading
- Cards use the Icon Card pattern from Section 5.2

### Home — Comparison Table
- `bg-sgwx-bg` (same as page bg — the table itself provides visual differentiation)
- Table centered within `max-w-4xl`
- Sageworx column highlighted — green top border accent

### Home — ICP Cards (Our Clients)
- `bg-sgwx-bg-alt`
- Three cards in a 3-column grid
- Each card uses the Base Content Card pattern
- No icons — text-forward

### Home — Hand-Picked Experts
- `bg-sgwx-bg`
- Split layout: Text content left (~50%), animated dot visualization right (~50%)
- The dot visualization is a vertical column of staggered green dots that animate in sequence — evokes the network concept without the full Three.js canvas

### Home — Process Steps
- `bg-sgwx-bg-alt`
- 6-card grid (2 columns on tablet, 3 on desktop)
- Uses Process Step Card from Section 5.2
- Staggered entrance animation

### Home — Impact (Case Studies + Logo Wall)
- `bg-sgwx-bg`
- 2-column case study card grid
- Logo wall below — single row on desktop, 2 rows on mobile

### Home — Spotlights
- `bg-sgwx-bg-alt`
- 3-column blog card grid
- "More Spotlights" ghost CTA below

### Home — Final CTA
- `bg-sgwx-bg`
- Centered, generous vertical padding (`py-32`)
- Section accent glow behind heading
- H2 + two buttons side by side

### Members Page — Featured Member Cards
- Full-width cards, stacked vertically
- Horizontal layout (photo left, content right) on desktop
- The character metaphor label in mono green is the first visual element the eye hits after the photo

### Process Page — Six Steps
- Consider a vertical scroll-driven approach: as the user scrolls, each step animates in with a left-to-right draw line connecting to the next step. This echoes the wireframe city's progressive construction reveal.
- Step number in mono, large, with `text-sgwx-green/8` opacity creating a watermark behind the card

---

## 12. Do's and Don'ts

### Do
- Use the dark, near-black background palette as the baseline for everything
- Let the animation do the atmospheric heavy lifting — content sits in front of it, clean and legible
- Use Inter Bold at large display sizes — it has enough personality at scale
- Keep the mono font strictly for protocol/system/status contexts
- Use `rounded-full` for buttons and status pills; `rounded-2xl` for cards and panels
- Apply additive blending and glow only where it echoes the Three.js animation style
- Give headings room — generous line-height and tracking-tight at large sizes
- Test every text/background pairing for WCAG AA compliance before shipping

### Do Not
- Use rounded-md or rounded-lg for buttons — the pill shape is mandatory
- Apply bright greens (`sgwx-green-bright`) to static text or resting UI elements
- Use white (#ffffff) anywhere on the page — always `sgwx-text` (#e8f5ee) as the lightest value
- Place text directly over animation canvases without a scrim or vignette between them
- Animate cards with scale transforms on hover — they should feel solid
- Use multiple font families — Inter and JetBrains Mono only
- Apply film grain to content areas — grain is a background-only treatment
- Use the comparison table's cyan or yellow colors outside of their designated animation/table contexts
- Set body copy or headings in uppercase — uppercase is reserved for labels, badges, CTAs, and HUD text
- Use `sgwx-text-dim` (#4a6b5a) for any text that conveys essential meaning

---

## 13. Tailwind CSS — Updated `globals.css`

The final `globals.css` with all additions:

```css
@import "tailwindcss";

@theme {
  /* ── Backgrounds ─────────────────────────────────────────────── */
  --color-sgwx-bg:             #030d0a;
  --color-sgwx-bg-alt:         #021a14;
  --color-sgwx-surface:        #0a1f18;
  --color-sgwx-surface-hover:  #0d2b22;
  --color-sgwx-border:         #143d2e;
  --color-sgwx-border-subtle:  #0a2a1e;

  /* ── Greens ──────────────────────────────────────────────────── */
  --color-sgwx-green:          #17a86b;
  --color-sgwx-green-bright:   #30ff88;
  --color-sgwx-green-muted:    #0d6b4a;
  --color-sgwx-green-pale:     #e6ffbb;

  /* ── Teals / Blues ───────────────────────────────────────────── */
  --color-sgwx-teal:           #0a4f5e;
  --color-sgwx-blue:           #042a3d;
  --color-sgwx-cyan:           #88eeff;

  /* ── Yellows / Accents ───────────────────────────────────────── */
  --color-sgwx-yellow:         #d4c94a;
  --color-sgwx-yellow-pale:    #f0e97a;
  --color-sgwx-gold:           #d4e840;

  /* ── Text ────────────────────────────────────────────────────── */
  --color-sgwx-text:           #e8f5ee;
  --color-sgwx-text-muted:     #8aab9a;
  --color-sgwx-text-dim:       #4a6b5a;

  /* ── UI Semantic ─────────────────────────────────────────────── */
  --color-sgwx-overlay:        rgba(3, 13, 10, 0.72);
  --color-sgwx-scrim:          rgba(3, 13, 10, 0.55);
  --color-sgwx-green-glow:     rgba(23, 168, 107, 0.18);
  --color-sgwx-green-glow-strong: rgba(48, 255, 136, 0.28);
  --color-sgwx-highlight-col:  #0a2318;
  --color-sgwx-check:          #30ff88;
  --color-sgwx-cross:          #4a6b5a;

  /* ── Status / HUD ─────────────────────────────────────────────── */
  --color-sgwx-status-online:  #30ff88;
  --color-sgwx-status-active:  #88eeff;
  --color-sgwx-status-dim:     #0d6b4a;

  /* ── Typography ──────────────────────────────────────────────── */
  --font-sans:    'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', monospace;
  --font-display: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* ── Spacing ─────────────────────────────────────────────────── */
  --spacing-section:    6rem;
  --spacing-section-sm: 4rem;
}

/* ── Base styles ─────────────────────────────────────────────────── */
@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  ::selection {
    background-color: rgba(23, 168, 107, 0.3);
    color: #e8f5ee;
  }

  /* Custom scrollbar (webkit) */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #030d0a;
  }
  ::-webkit-scrollbar-thumb {
    background: #143d2e;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #17a86b;
  }
}
```

---

## 14. Quick Reference — Most-Used Patterns

```
Page bg:         bg-sgwx-bg
Alt section bg:  bg-sgwx-bg-alt
Card bg:         bg-sgwx-surface
Card hover:      bg-sgwx-surface-hover
Primary border:  border-sgwx-border
Subtle border:   border-sgwx-border-subtle

Primary text:    text-sgwx-text
Muted text:      text-sgwx-text-muted
Dim text:        text-sgwx-text-dim (decorative only)

Green accent:    text-sgwx-green / bg-sgwx-green
Green hover:     text-sgwx-green-bright / bg-sgwx-green-bright
Cyan HUD:        text-sgwx-cyan
Yellow/gold:     animation contexts only

Button pill:     rounded-full
Cards/panels:    rounded-2xl
Status pills:    rounded-full

Hero font:       text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight
Section H2:      text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight
Body:            text-base leading-relaxed
Labels/HUD:      font-mono text-[10px] tracking-widest uppercase

Entrance anim:   opacity 0→1, y 24→0, 600ms, [0.16, 1, 0.3, 1]
Stagger:         0.08s per child
Hover transition: duration-200 or duration-300
```
