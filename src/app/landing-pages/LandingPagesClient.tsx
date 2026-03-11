"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import {
  createLandingPage,
  updateLandingPage,
  toggleLandingPageStatus,
  deleteLandingPage,
} from "@/app/actions/sanity";
import type { LandingPageListItem } from "@/lib/sanity/queries";

/* ─── Constants ──────────────────────────────────────────────────────────────── */

const TEMPLATES = [
  { value: "bold-hero", label: "Bold Hero", desc: "Full-bleed hero, stats, case studies, CTA" },
  { value: "minimal", label: "Minimal", desc: "Clean text, value prop, testimonials, insights" },
  {
    value: "services-showcase",
    label: "Services Showcase",
    desc: "Services grid, comparison table, CTA",
  },
];

const VERTICALS = [
  "Healthcare",
  "Automotive",
  "Sports",
  "Technology",
  "Finance",
  "Retail",
  "CPG",
  "Entertainment",
  "Education",
  "Real Estate",
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

interface LandingPagesClientProps {
  initialPages: LandingPageListItem[];
}

export default function LandingPagesClient({ initialPages }: LandingPagesClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Wizard visibility & edit mode
  const [showWizard, setShowWizard] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Wizard fields
  const [template, setTemplate] = useState("bold-hero");
  const [clientName, setClientName] = useState("");
  const [slug, setSlug] = useState("");
  const [verticals, setVerticals] = useState<string[]>([]);
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");

  // Error state
  const [error, setError] = useState<string | null>(null);

  /* ── Wizard helpers ──────────────────────────────────────────────────────── */

  function resetWizard() {
    setShowWizard(false);
    setEditId(null);
    setTemplate("bold-hero");
    setClientName("");
    setSlug("");
    setVerticals([]);
    setHeroHeading("");
    setHeroSubheading("");
    setError(null);
  }

  function toggleVertical(v: string) {
    setVerticals((prev) => {
      if (prev.includes(v)) return prev.filter((x) => x !== v);
      if (prev.length >= 3) return prev;
      return [...prev, v];
    });
  }

  /* ── CRUD handlers ───────────────────────────────────────────────────────── */

  function handleCreate() {
    setError(null);
    startTransition(async () => {
      const result = await createLandingPage({
        title: clientName,
        slug,
        clientName,
        template,
        verticals,
        heroHeading: heroHeading || undefined,
        heroSubheading: heroSubheading || undefined,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      resetWizard();
      router.refresh();
    });
  }

  function handleUpdate() {
    if (!editId) return;
    setError(null);
    startTransition(async () => {
      const result = await updateLandingPage(editId, {
        title: clientName,
        slug,
        clientName,
        template,
        verticals,
        heroHeading: heroHeading || undefined,
        heroSubheading: heroSubheading || undefined,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      resetWizard();
      router.refresh();
    });
  }

  function handleToggle(page: LandingPageListItem) {
    setError(null);
    startTransition(async () => {
      const result = await toggleLandingPageStatus(page._id, page.status);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  function handleDelete(page: LandingPageListItem) {
    if (!confirm(`Delete "${page.title || page.slug}"? This cannot be undone.`)) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteLandingPage(page._id);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  }

  function handleEdit(page: LandingPageListItem) {
    setEditId(page._id);
    setTemplate(page.template || "bold-hero");
    setClientName(page.clientName || "");
    setSlug(page.slug || "");
    setVerticals(page.verticals || []);
    setHeroHeading("");
    setHeroSubheading("");
    setShowWizard(true);
  }

  /* ── Render ──────────────────────────────────────────────────────────────── */

  return (
    <section className="min-h-screen bg-sgwx-bg py-24">
      <Container>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-sgwx-text">Landing Pages</h1>
            <p className="mt-1 text-sm text-sgwx-text-muted">
              Create and manage prospect landing pages.
            </p>
          </div>
          <button
            onClick={() => {
              resetWizard();
              setShowWizard(true);
            }}
            className="rounded-lg bg-sgwx-green px-6 py-2 text-sm font-medium text-sgwx-bg"
          >
            + New
          </button>
        </div>

        {/* ── Error Banner ────────────────────────────────────────────────── */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <div className="flex items-start justify-between gap-3">
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="shrink-0 text-red-400 hover:text-red-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* ── Pages Table ─────────────────────────────────────────────────── */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-sgwx-border">
                <th className="pb-3 pr-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                  Slug
                </th>
                <th className="pb-3 pr-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                  Client
                </th>
                <th className="pb-3 pr-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                  Template
                </th>
                <th className="pb-3 pr-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                  Verticals
                </th>
                <th className="pb-3 pr-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                  Status
                </th>
                <th className="pb-3 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {initialPages.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sgwx-text-muted">
                    No landing pages yet. Click &quot;+ New&quot; to create one.
                  </td>
                </tr>
              )}
              {initialPages.map((page) => (
                <tr key={page._id} className="border-b border-sgwx-border/50">
                  <td className="py-4 pr-4">
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sgwx-green hover:underline"
                    >
                      /{page.slug}
                    </a>
                  </td>
                  <td className="py-4 pr-4 text-sgwx-text">{page.clientName || "—"}</td>
                  <td className="py-4 pr-4 text-sgwx-text-muted">{page.template || "—"}</td>
                  <td className="py-4 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {page.verticals && page.verticals.length > 0
                        ? page.verticals.map((v) => (
                            <span
                              key={v}
                              className="rounded-full border border-sgwx-border bg-sgwx-surface px-2 py-0.5 text-[14px] text-sgwx-text-muted"
                            >
                              {v}
                            </span>
                          ))
                        : "—"}
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={page.status === "active" ? "green" : "neutral"}>
                      {page.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(page)}
                        disabled={isPending}
                        className="text-sgwx-text-muted hover:text-sgwx-text"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggle(page)}
                        disabled={isPending}
                        className="text-sgwx-text-muted hover:text-sgwx-text"
                      >
                        {page.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(page)}
                        disabled={isPending}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Creation / Edit Wizard ──────────────────────────────────────── */}
        {showWizard && (
          <div className="mt-16 rounded-xl border border-sgwx-border p-8">
            <h2 className="mb-8 text-2xl font-light text-sgwx-text">
              {editId ? "Edit Landing Page" : "New Landing Page"}
            </h2>

            {/* Step 1 — Template Selection */}
            <div className="mb-8">
              <label className="mb-3 block font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Step 1 — Template
              </label>
              <div className="grid gap-4 sm:grid-cols-3">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTemplate(t.value)}
                    className={`rounded-lg border p-4 text-left transition-colors ${
                      template === t.value
                        ? "border-sgwx-green bg-sgwx-green/10"
                        : "border-sgwx-border bg-sgwx-surface hover:border-sgwx-text-dim"
                    }`}
                  >
                    <span className="block text-sm font-medium text-sgwx-text">{t.label}</span>
                    <span className="mt-1 block text-xs text-sgwx-text-muted">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — Client Name & Slug */}
            <div className="mb-8">
              <label className="mb-3 block font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Step 2 — Client Details
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-sgwx-text-muted">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (!editId) setSlug(slugify(e.target.value));
                    }}
                    placeholder="Acme Corp"
                    className="w-full rounded-lg border border-sgwx-border bg-sgwx-bg px-4 py-2 text-sm text-sgwx-text focus:border-sgwx-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-sgwx-text-muted">URL Slug</label>
                  <div className="flex items-center rounded-lg border border-sgwx-border bg-sgwx-bg">
                    <span className="pl-4 text-xs text-sgwx-text-dim">sgwx.vercel.app/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(slugify(e.target.value))}
                      placeholder="acme-corp"
                      className="w-full rounded-r-lg bg-transparent px-2 py-2 text-sm text-sgwx-text focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 — Verticals */}
            <div className="mb-8">
              <label className="mb-3 block font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Step 3 — Verticals{" "}
                <span className="text-sgwx-text-dim">(max 3)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {VERTICALS.map((v) => {
                  const selected = verticals.includes(v);
                  const disabled = !selected && verticals.length >= 3;
                  return (
                    <button
                      key={v}
                      onClick={() => toggleVertical(v)}
                      disabled={disabled}
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                        selected
                          ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-green"
                          : disabled
                            ? "cursor-not-allowed border-sgwx-border/50 text-sgwx-text-dim/50"
                            : "border-sgwx-border text-sgwx-text-muted hover:border-sgwx-text-dim"
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hero Overrides */}
            <div className="mb-8">
              <label className="mb-3 block font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Hero Overrides <span className="text-sgwx-text-dim">(optional)</span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-sgwx-text-muted">Hero Heading</label>
                  <input
                    type="text"
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    placeholder="Go Further. Faster."
                    className="w-full rounded-lg border border-sgwx-border bg-sgwx-bg px-4 py-2 text-sm text-sgwx-text focus:border-sgwx-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-sgwx-text-muted">
                    Hero Subheading
                  </label>
                  <input
                    type="text"
                    value={heroSubheading}
                    onChange={(e) => setHeroSubheading(e.target.value)}
                    placeholder="Your strategic partner in..."
                    className="w-full rounded-lg border border-sgwx-border bg-sgwx-bg px-4 py-2 text-sm text-sgwx-text focus:border-sgwx-green focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={editId ? handleUpdate : handleCreate}
                disabled={isPending || !clientName || !slug}
                className="rounded-lg bg-sgwx-green px-6 py-2 text-sm font-medium text-sgwx-bg disabled:opacity-40"
              >
                {isPending ? "Saving..." : editId ? "Update" : "Create"}
              </button>
              <button
                onClick={resetWizard}
                disabled={isPending}
                className="text-sm text-sgwx-text-muted hover:text-sgwx-text"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
