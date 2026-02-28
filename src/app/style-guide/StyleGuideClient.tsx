"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Container from "@/components/ui/Container";
import SectionDivider from "@/components/ui/SectionDivider";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const colorGroups = [
  {
    label: "Backgrounds",
    colors: [
      { name: "sgwx-bg", value: "#030d0a", className: "bg-sgwx-bg" },
      { name: "sgwx-bg-alt", value: "#021a14", className: "bg-sgwx-bg-alt" },
      { name: "sgwx-surface", value: "#0a1f18", className: "bg-sgwx-surface" },
      { name: "sgwx-surface-hover", value: "#0d2b22", className: "bg-sgwx-surface-hover" },
    ],
  },
  {
    label: "Borders",
    colors: [
      { name: "sgwx-border", value: "#143d2e", className: "bg-sgwx-border" },
      { name: "sgwx-border-subtle", value: "#0a2a1e", className: "bg-sgwx-border-subtle" },
    ],
  },
  {
    label: "Greens",
    colors: [
      { name: "sgwx-green", value: "#17a86b", className: "bg-sgwx-green" },
      { name: "sgwx-green-bright", value: "#30ff88", className: "bg-sgwx-green-bright" },
      { name: "sgwx-green-muted", value: "#0d6b4a", className: "bg-sgwx-green-muted" },
      { name: "sgwx-green-pale", value: "#e6ffbb", className: "bg-sgwx-green-pale" },
    ],
  },
  {
    label: "Teals / Blues",
    colors: [
      { name: "sgwx-teal", value: "#0a4f5e", className: "bg-sgwx-teal" },
      { name: "sgwx-blue", value: "#042a3d", className: "bg-sgwx-blue" },
      { name: "sgwx-cyan", value: "#88eeff", className: "bg-sgwx-cyan" },
    ],
  },
  {
    label: "Yellows / Accents",
    colors: [
      { name: "sgwx-yellow", value: "#d4c94a", className: "bg-sgwx-yellow" },
      { name: "sgwx-yellow-pale", value: "#f0e97a", className: "bg-sgwx-yellow-pale" },
      { name: "sgwx-gold", value: "#d4e840", className: "bg-sgwx-gold" },
    ],
  },
  {
    label: "Text",
    colors: [
      { name: "sgwx-text", value: "#e8f5ee", className: "bg-sgwx-text" },
      { name: "sgwx-text-muted", value: "#8aab9a", className: "bg-sgwx-text-muted" },
      { name: "sgwx-text-dim", value: "#4a6b5a", className: "bg-sgwx-text-dim" },
    ],
  },
  {
    label: "Status / HUD",
    colors: [
      { name: "sgwx-status-online", value: "#30ff88", className: "bg-sgwx-status-online" },
      { name: "sgwx-status-active", value: "#88eeff", className: "bg-sgwx-status-active" },
      { name: "sgwx-status-dim", value: "#0d6b4a", className: "bg-sgwx-status-dim" },
    ],
  },
  {
    label: "Table / Comparison",
    colors: [
      { name: "sgwx-highlight-col", value: "#0a2318", className: "bg-sgwx-highlight-col" },
      { name: "sgwx-check", value: "#30ff88", className: "bg-sgwx-check" },
      { name: "sgwx-cross", value: "#4a6b5a", className: "bg-sgwx-cross" },
    ],
  },
];

const glows = [
  { name: "sgwx-overlay", value: "rgba(3,13,10,0.72)", css: "background: rgba(3,13,10,0.72)" },
  { name: "sgwx-scrim", value: "rgba(3,13,10,0.55)", css: "background: rgba(3,13,10,0.55)" },
  { name: "sgwx-green-glow", value: "rgba(23,168,107,0.18)", css: "background: rgba(23,168,107,0.18)" },
  { name: "sgwx-green-glow-strong", value: "rgba(48,255,136,0.28)", css: "background: rgba(48,255,136,0.28)" },
];

const typeSamples = [
  { label: "Display (7xl)", className: "text-4xl font-thin tracking-tight text-white md:text-6xl lg:text-7xl", text: "Go Further. Faster." },
  { label: "Display (6xl)", className: "text-3xl font-thin tracking-tight text-white md:text-5xl lg:text-6xl", text: "Strategic Precision" },
  { label: "Heading (5xl)", className: "text-3xl font-normal tracking-tight text-white md:text-4xl lg:text-5xl", text: "Stop Resetting. Start Building." },
  { label: "Heading (4xl)", className: "text-2xl font-normal tracking-tight text-white md:text-3xl lg:text-4xl", text: "Momentum Compounds" },
  { label: "Heading (3xl)", className: "text-xl font-normal tracking-tight text-white md:text-2xl lg:text-3xl", text: "Built for Real-World Constraints" },
  { label: "Heading (2xl)", className: "text-lg font-normal tracking-tight text-white md:text-xl lg:text-2xl", text: "Structured to Flex" },
  { label: "Heading (1xl)", className: "text-base font-normal tracking-tight text-white md:text-lg lg:text-xl", text: "Category Fluency Matters" },
  { label: "Body Large", className: "text-lg leading-relaxed text-white md:text-xl", text: "A clear, flexible process built for speed and follow-through. Senior teams aligned from day one." },
  { label: "Body Default", className: "text-sm leading-relaxed text-white", text: "Deep expertise where it matters most, with meaningful fluency across adjacent disciplines. Our teams think beyond single roles." },
  { label: "Body Small", className: "text-xs leading-relaxed text-white", text: "Contracted, governed, and insured under a single engagement. AI tools applied in a controlled, task-specific manner." },
  { label: "Eyebrow / Label", className: "font-mono text-[10px] tracking-widest uppercase text-sgwx-yellow-pale", text: "The Growth Sequence" },
  { label: "Mono Small", className: "font-mono text-xs uppercase tracking-widest text-[#a8c4d1]", text: "Output: Sustained Momentum" },
  { label: "Link", className: "text-sm text-sgwx-green underline underline-offset-2 decoration-sgwx-green/40 hover:text-sgwx-green-bright hover:decoration-sgwx-green-bright transition-colors", text: "View Case Study \u2192" },
  { label: "Metadata", className: "font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim", text: "Client \u00b7 2025 \u00b7 Brand Strategy" },
];

const weightSamples = [
  { label: "Thin (100)", className: "font-thin", weight: 100 },
  { label: "Light (300)", className: "font-light", weight: 300 },
  { label: "Normal (400)", className: "font-normal", weight: 400 },
  { label: "Medium (500)", className: "font-medium", weight: 500 },
  { label: "Semibold (600)", className: "font-semibold", weight: 600 },
  { label: "Bold (700)", className: "font-bold", weight: 700 },
  { label: "Black (900)", className: "font-black", weight: 900 },
];

/* ─── Section Shell ────────────────────────────────────────────────────────── */

function GuideSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 md:py-20">
      <Container>
        <div className="mb-10 border-b border-sgwx-border pb-4">
          <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">{id}</p>
          <h2 className="mt-2 text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">{title}</h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

/* ─── Color Swatch ─────────────────────────────────────────────────────────── */

function Swatch({ name, value, className }: { name: string; value: string; className: string }) {
  const [copied, setCopied] = useState(false);
  const isLight = ["#e8f5ee", "#e6ffbb", "#f0e97a", "#d4e840", "#d4c94a", "#88eeff", "#30ff88", "#8aab9a"].includes(value);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="group text-left"
    >
      <div
        className={`${className} h-20 rounded-lg border border-sgwx-border transition-transform duration-200 group-hover:scale-105 flex items-end p-2`}
      >
        <span className={`font-mono text-[9px] ${isLight ? "text-sgwx-bg" : "text-white/40"}`}>
          {copied ? "Copied!" : value}
        </span>
      </div>
      <p className="mt-2 text-xs text-sgwx-text-muted truncate">{name}</p>
    </button>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function StyleGuideClient() {
  return (
    <div className="min-h-screen bg-sgwx-bg">
      {/* ═══ Header ═══ */}
      <div className="border-b border-sgwx-border bg-sgwx-bg-alt py-16 md:py-24">
        <Container>
          <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Design System</p>
          <h1 className="mt-3 text-4xl font-thin tracking-tight text-sgwx-text md:text-5xl lg:text-6xl">
            SGWX Style Guide
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted">
            Every color, component, and typographic token in the Sageworx design system.
            Click any swatch to copy its value.
          </p>
          <nav className="mt-8 flex flex-wrap gap-3">
            {[
              ["colors", "Colors"],
              ["typography", "Typography"],
              ["buttons", "Buttons"],
              ["cards", "Cards"],
              ["badges", "Badges"],
              ["headings", "Section Headings"],
              ["dividers", "Dividers"],
              ["glows", "Glows & Overlays"],
              ["overlays", "Overlay Colors"],
              ["animations", "Animations"],
              ["process", "Process Accents"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-sgwx-border bg-sgwx-surface px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-muted transition-colors hover:border-sgwx-green/40 hover:text-sgwx-green"
              >
                {label}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {/* ═══ Colors ═══ */}
      <GuideSection id="colors" title="Color Palette">
        <div className="space-y-12">
          {colorGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">
                {group.label}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.colors.map((c) => (
                  <Swatch key={c.name} {...c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Glows & Overlays ═══ */}
      <GuideSection id="glows" title="Glows & Overlays">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {glows.map((g) => (
            <div key={g.name}>
              <div
                className="flex h-28 items-end rounded-lg border border-sgwx-border p-3"
                style={{ [g.css.split(":")[0]]: g.css.split(": ")[1] }}
              >
                <span className="font-mono text-[9px] text-white/50">{g.value}</span>
              </div>
              <p className="mt-2 text-xs text-sgwx-text-muted">{g.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">
            Glow Effect (box-shadow)
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex h-28 w-40 items-center justify-center rounded-2xl border border-sgwx-green/30 bg-sgwx-surface shadow-[0_0_30px_rgba(23,168,107,0.08)]">
              <span className="text-xs text-sgwx-text-muted">Subtle</span>
            </div>
            <div className="flex h-28 w-40 items-center justify-center rounded-2xl border border-sgwx-green/30 bg-sgwx-surface shadow-[0_0_24px_rgba(48,255,136,0.28)]">
              <span className="text-xs text-sgwx-text-muted">Strong</span>
            </div>
          </div>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Overlay Colors ═══ */}
      <GuideSection id="overlays" title="Overlay Colors">
        <p className="mb-6 text-sm text-sgwx-text-muted">
          CMS-controlled color tints applied over section background images via the SectionBackground component.
          Each variant shifts the color grade while preserving the darkened, desaturated base treatment.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {(["sage", "steel", "teal", "amber", "carbon"] as OverlayColor[]).map((color) => (
            <div key={color} className="relative h-48 overflow-hidden rounded-xl border border-sgwx-border">
              <SectionBackground
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=60"
                overlayColor={color}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sgwx-bg/80 to-transparent p-3">
                <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">{color}</p>
                <p className="mt-0.5 text-xs text-sgwx-text-muted">overlayColor=&quot;{color}&quot;</p>
              </div>
            </div>
          ))}
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Typography ═══ */}
      <GuideSection id="typography" title="Typography">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">Sans (Inter)</h3>
            <p className="text-4xl font-normal text-sgwx-text">ABCDEFGHIJKLM</p>
            <p className="text-4xl font-normal text-sgwx-text">nopqrstuvwxyz</p>
            <p className="mt-2 text-4xl font-normal text-sgwx-text">0123456789</p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">Mono (JetBrains Mono)</h3>
            <p className="font-mono text-4xl font-normal text-sgwx-text">ABCDEFGHIJKLM</p>
            <p className="font-mono text-4xl font-normal text-sgwx-text">nopqrstuvwxyz</p>
            <p className="mt-2 font-mono text-4xl font-normal text-sgwx-text">0123456789</p>
          </div>
        </div>

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">Font Weights (Inter)</h3>
        <div className="mb-12 space-y-3">
          {weightSamples.map((w) => (
            <div key={w.weight} className="flex items-baseline gap-6">
              <span className="w-40 shrink-0 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">{w.label}</span>
              <span className={`text-3xl text-sgwx-text ${w.className}`}>Sageworx</span>
            </div>
          ))}
        </div>

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">Type Scale</h3>
        <div className="space-y-8">
          {typeSamples.map((t) => (
            <div key={t.label}>
              <p className="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">{t.label}</p>
              <p className={t.className}>{t.text}</p>
            </div>
          ))}
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Buttons ═══ */}
      <GuideSection id="buttons" title="Buttons">
        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">Variants</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">As Links</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#">Primary Link</Button>
              <Button href="#" variant="secondary">Secondary Link</Button>
              <Button href="#" variant="ghost">Ghost Link</Button>
            </div>
          </div>
          <div className="rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
            <h3 className="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Specs</h3>
            <ul className="space-y-1 text-sm text-sgwx-text-muted">
              <li><span className="text-sgwx-text">Shape:</span> rounded-full</li>
              <li><span className="text-sgwx-text">Padding:</span> px-6 py-3</li>
              <li><span className="text-sgwx-text">Text:</span> text-sm, uppercase, tracking-widest</li>
              <li><span className="text-sgwx-text">Primary glow:</span> 0 0 24px rgba(48,255,136,0.28) on hover</li>
            </ul>
          </div>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Cards ═══ */}
      <GuideSection id="cards" title="Cards">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Hover Card (default)</p>
            <Card>
              <h3 className="text-lg font-semibold text-sgwx-text">Card Title</h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                Hover over this card to see the border glow, background shift, and shadow effect.
              </p>
            </Card>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Static Card (hover=false)</p>
            <Card hover={false}>
              <h3 className="text-lg font-semibold text-sgwx-text">Card Title</h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                This card has no hover effects. Used for informational panels and content blocks.
              </p>
            </Card>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Card with Badge</p>
            <Card>
              <Badge className="mb-4">M-Shaped Talent</Badge>
              <h3 className="text-lg font-semibold text-sgwx-text">Card Title</h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                Cards often include badges for categorization.
              </p>
            </Card>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
          <h3 className="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Specs</h3>
          <ul className="space-y-1 text-sm text-sgwx-text-muted">
            <li><span className="text-sgwx-text">Border:</span> border-sgwx-border &rarr; border-sgwx-green/30 on hover</li>
            <li><span className="text-sgwx-text">Background:</span> bg-sgwx-surface &rarr; bg-sgwx-surface-hover on hover</li>
            <li><span className="text-sgwx-text">Radius:</span> rounded-2xl</li>
            <li><span className="text-sgwx-text">Padding:</span> p-6</li>
            <li><span className="text-sgwx-text">Shadow:</span> 0 0 30px rgba(23,168,107,0.08) on hover</li>
          </ul>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Badges ═══ */}
      <GuideSection id="badges" title="Badges">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-center">
            <Badge>Green Badge</Badge>
            <p className="mt-2 font-mono text-[10px] text-sgwx-text-dim">variant=&quot;green&quot;</p>
          </div>
          <div className="text-center">
            <Badge variant="neutral">Neutral Badge</Badge>
            <p className="mt-2 font-mono text-[10px] text-sgwx-text-dim">variant=&quot;neutral&quot;</p>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
          <h3 className="mb-2 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Specs</h3>
          <ul className="space-y-1 text-sm text-sgwx-text-muted">
            <li><span className="text-sgwx-text">Shape:</span> rounded-full, border</li>
            <li><span className="text-sgwx-text">Text:</span> font-mono, 10px, uppercase, tracking-widest</li>
            <li><span className="text-sgwx-text">Padding:</span> px-3 py-0.5</li>
          </ul>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Section Headings ═══ */}
      <GuideSection id="headings" title="Section Headings">
        <div className="space-y-12">
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Display Size</p>
            <SectionHeading
              eyebrow="Eyebrow Label"
              heading="Display Heading Style"
              subheading="This is the display size used for hero-level section headings. Font-light weight with tight tracking."
              size="display"
            />
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Large Size (default)</p>
            <SectionHeading
              eyebrow="Eyebrow Label"
              heading="Large Heading Style"
              subheading="This is the large size, the default for most section headings. Bold weight with tight tracking."
              size="large"
            />
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Medium Size</p>
            <SectionHeading
              eyebrow="Eyebrow Label"
              heading="Medium Heading Style"
              subheading="Semibold weight, used for sub-section headings."
              size="medium"
            />
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Right-Aligned</p>
            <SectionHeading
              eyebrow="Right-Aligned Layout"
              heading="Headings Alternate Left and Right"
              subheading="Pass align=&quot;right&quot; to right-align the heading block. Use L-R alternation across sections."
              align="right"
            />
          </div>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Dividers ═══ */}
      <GuideSection id="dividers" title="Section Dividers">
        <p className="mb-6 text-sm text-sgwx-text-muted">
          Gradient divider line that fades from transparent on both edges. Used between major page sections.
        </p>
        <div className="space-y-8 rounded-xl border border-sgwx-border bg-sgwx-bg-alt p-8">
          <div className="h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />
          <p className="text-center font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
            from-transparent via-sgwx-border to-transparent
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-sgwx-green/30 to-transparent" />
          <p className="text-center font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
            from-transparent via-sgwx-green/30 to-transparent (accent variant)
          </p>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Animations ═══ */}
      <GuideSection id="animations" title="Animation Patterns">
        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">Easing Curve</h3>
            <div className="rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
              <p className="font-mono text-sm text-sgwx-text">cubic-bezier(0.16, 1, 0.3, 1)</p>
              <p className="mt-2 text-sm text-sgwx-text-muted">
                Used across all animations. Fast start, gentle ease-out. Applied via Framer Motion&apos;s ease array: [0.16, 1, 0.3, 1]
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">fadeUp (scroll-triggered)</h3>
            <p className="mb-4 text-sm text-sgwx-text-muted">
              The primary reveal animation. Elements start invisible and 24px below, then animate into position when they enter the viewport.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <AnimatedSection delay={0}>
                <Card hover={false}>
                  <p className="font-mono text-[10px] text-sgwx-green">delay: 0</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">First element</p>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <Card hover={false}>
                  <p className="font-mono text-[10px] text-sgwx-green">delay: 0.15</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Staggered second</p>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <Card hover={false}>
                  <p className="font-mono text-[10px] text-sgwx-green">delay: 0.3</p>
                  <p className="mt-2 text-sm text-sgwx-text-muted">Staggered third</p>
                </Card>
              </AnimatedSection>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">fadeUp (page-load)</h3>
            <p className="mb-4 text-sm text-sgwx-text-muted">
              Hero elements use initial/animate (not scroll-triggered). Each element staggered with incremental delays.
            </p>
            <div className="rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
              <pre className="font-mono text-xs leading-relaxed text-sgwx-text-muted">
{`const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
  delay,
});

// Usage:
<motion.h1 {...fadeUp} transition={transition(0)} />
<motion.p  {...fadeUp} transition={transition(0.12)} />
<motion.div {...fadeUp} transition={transition(0.24)} />`}
              </pre>
            </div>
          </div>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Process Accents ═══ */}
      <GuideSection id="process" title="Process Page Accents">
        <p className="mb-6 text-sm text-sgwx-text-muted">
          The process page uses alternating accent colors across the 4 growth stages for visual rhythm.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { stage: "01 \u2014 Launch", accent: "sgwx-green", color: "text-sgwx-green", bg: "bg-sgwx-green" },
            { stage: "02 \u2014 Engage", accent: "sgwx-cyan", color: "text-sgwx-cyan", bg: "bg-sgwx-cyan" },
            { stage: "03 \u2014 Mobilize", accent: "sgwx-green", color: "text-sgwx-green", bg: "bg-sgwx-green" },
            { stage: "04 \u2014 Transform", accent: "sgwx-cyan", color: "text-sgwx-cyan", bg: "bg-sgwx-cyan" },
          ].map((s) => (
            <Card key={s.stage} hover={false}>
              <div className={`mb-3 h-1 w-12 rounded-full ${s.bg}`} />
              <p className={`font-mono text-[10px] tracking-widest uppercase ${s.color}`}>
                {s.stage}
              </p>
              <p className="mt-2 text-xs text-sgwx-text-dim">{s.accent}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-sgwx-text-dim">Stage Elements</h3>
          <div className="flex flex-wrap gap-3">
            {["brand architecture", "visual identity", "positioning strategy"].map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-sgwx-border bg-sgwx-surface px-4 py-2 text-sm text-sgwx-text transition-colors duration-300 hover:border-sgwx-green/60 hover:bg-sgwx-green/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-start gap-4 border-t border-sgwx-border pt-6">
            <div className="mt-[0.55rem] h-1.5 w-1.5 min-w-[6px] rounded-full bg-sgwx-green" />
            <div className="text-sm leading-relaxed text-sgwx-text-muted">
              <span className="font-medium text-sgwx-text">Client Name &mdash; Project Title</span>
              <br />
              Brief description of the proof point.
              <span className="mt-1 block text-xs tracking-wider text-sgwx-green">
                Result metric or outcome
              </span>
            </div>
          </div>
        </div>
      </GuideSection>

      <SectionDivider />

      {/* ═══ Spacing ═══ */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mb-10 border-b border-sgwx-border pb-4">
            <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">spacing</p>
            <h2 className="mt-2 text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">Spacing & Layout</h2>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
              <h3 className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Container</h3>
              <ul className="space-y-1 text-sm text-sgwx-text-muted">
                <li><span className="text-sgwx-text">Max width:</span> max-w-7xl (80rem / 1280px)</li>
                <li><span className="text-sgwx-text">Padding:</span> px-6 (mobile) &rarr; px-8 (md) &rarr; px-12 (lg)</li>
                <li><span className="text-sgwx-text">Centering:</span> mx-auto</li>
              </ul>
            </div>
            <div className="rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
              <h3 className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Section Spacing</h3>
              <ul className="space-y-1 text-sm text-sgwx-text-muted">
                <li><span className="text-sgwx-text">Default:</span> py-16 md:py-24 (4rem / 6rem)</li>
                <li><span className="text-sgwx-text">Hero:</span> min-h-[60vh] to min-h-[80vh]</li>
                <li><span className="text-sgwx-text">Token:</span> --spacing-section: 6rem, --spacing-section-sm: 4rem</li>
              </ul>
            </div>
            <div className="rounded-xl border border-sgwx-border bg-sgwx-surface p-6">
              <h3 className="mb-4 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">Section Backgrounds</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-sgwx-border bg-sgwx-bg p-4">
                  <p className="font-mono text-[10px] text-sgwx-text-dim">bg-sgwx-bg</p>
                  <p className="text-xs text-sgwx-text-muted">Primary sections</p>
                </div>
                <div className="rounded-lg border border-sgwx-border bg-sgwx-bg-alt p-4">
                  <p className="font-mono text-[10px] text-sgwx-text-dim">bg-sgwx-bg-alt</p>
                  <p className="text-xs text-sgwx-text-muted">Alternating sections</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
