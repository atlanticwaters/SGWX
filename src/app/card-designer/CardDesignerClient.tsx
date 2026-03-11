"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import StyledCard, {
  RADIUS_MAP,
  PADDING_MAP,
  BG_MAP,
  ACCENT_BORDER_MAP,
  HOVER_MAP,
  IMAGE_ASPECT_MAP,
} from "@/components/ui/StyledCard";
import { upsertCardStyle, deleteCardStyle } from "@/app/actions/sanity";
import type { CardStyleItem } from "@/lib/sanity/queries";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

interface RadioGroupOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioGroupOption[];
}

function RadioGroup({ label, value, onChange, options }: RadioGroupProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
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

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_STYLE = {
  borderRadius: "2xl",
  padding: "default",
  hoverEffect: "glow",
  accentColor: "green",
  showBorder: true,
  imageAspect: "video",
  backgroundStyle: "surface",
};

// ─── Options ──────────────────────────────────────────────────────────────────

const RADIUS_OPTIONS: RadioGroupOption[] = Object.keys(RADIUS_MAP).map((k) => ({
  value: k,
  label: k,
}));

const PADDING_OPTIONS: RadioGroupOption[] = Object.keys(PADDING_MAP).map((k) => ({
  value: k,
  label: k,
}));

const BG_OPTIONS: RadioGroupOption[] = Object.keys(BG_MAP).map((k) => ({
  value: k,
  label: k,
}));

const ACCENT_OPTIONS: RadioGroupOption[] = Object.keys(ACCENT_BORDER_MAP).map((k) => ({
  value: k,
  label: k,
}));

const HOVER_OPTIONS: RadioGroupOption[] = Object.keys(HOVER_MAP).map((k) => ({
  value: k,
  label: k,
}));

const IMAGE_ASPECT_OPTIONS: RadioGroupOption[] = Object.keys(IMAGE_ASPECT_MAP).map((k) => ({
  value: k,
  label: k,
}));

// ─── Client Component ────────────────────────────────────────────────────────

interface CardDesignerClientProps {
  initialStyles: CardStyleItem[];
}

export default function CardDesignerClient({ initialStyles }: CardDesignerClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Saved styles list
  const [styles, setStyles] = useState<CardStyleItem[]>(initialStyles);

  // Currently selected style id (null = new)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Editor state
  const [name, setName] = useState("");
  const [current, setCurrent] = useState({ ...DEFAULT_STYLE });

  // ─── Actions ──────────────────────────────────────────────────────────

  function loadStyle(style: CardStyleItem) {
    setSelectedId(style._id);
    setName(style.name);
    setCurrent({
      borderRadius: style.borderRadius,
      padding: style.padding,
      hoverEffect: style.hoverEffect,
      accentColor: style.accentColor,
      showBorder: style.showBorder,
      imageAspect: style.imageAspect,
      backgroundStyle: style.backgroundStyle,
    });
  }

  function resetToNew() {
    setSelectedId(null);
    setName("");
    setCurrent({ ...DEFAULT_STYLE });
  }

  function handleSave() {
    if (!name.trim()) return;
    setError(null);

    const slug = slugify(name);
    const data = {
      name: name.trim(),
      slug,
      ...current,
    };

    startTransition(async () => {
      const result = await upsertCardStyle(data, selectedId ?? undefined);
      if (!result.success) {
        setError(result.error);
        return;
      }

      // Optimistic update for saved styles list
      if (selectedId) {
        setStyles((prev) =>
          prev.map((s) =>
            s._id === selectedId ? { ...s, ...data, slug } : s
          )
        );
      } else {
        // New style -- rely on revalidation for the real _id
        setStyles((prev) => [
          ...prev,
          { _id: `temp-${Date.now()}`, ...data },
        ]);
      }

      router.refresh();
    });
  }

  function handleDelete() {
    if (!selectedId) return;
    if (!confirm("Delete this card style?")) return;
    setError(null);

    startTransition(async () => {
      const result = await deleteCardStyle(selectedId);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setStyles((prev) => prev.filter((s) => s._id !== selectedId));
      resetToNew();
      router.refresh();
    });
  }

  // ─── Build preview style object ───────────────────────────────────────

  const previewStyle: CardStyleItem = {
    _id: selectedId ?? "preview",
    name: name || "Preview",
    slug: slugify(name || "preview"),
    ...current,
  };

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-sgwx-bg pt-8">
      <Container>
        {/* Header */}
        <h1 className="text-4xl font-thin tracking-tight text-sgwx-text">
          Card Designer
        </h1>
        <p className="mt-2 text-sgwx-text-muted">
          Adjust card styles visually, preview in real time, and persist to
          Sanity.
        </p>

        {/* Error Banner */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
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

        {/* Main grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* ── Left sidebar: saved styles ─────────────────────────────── */}
          <aside className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Saved Styles
              </h2>
              <button
                type="button"
                onClick={resetToNew}
                className="rounded-lg border border-sgwx-green px-3 py-1 text-xs text-sgwx-green transition-colors hover:bg-sgwx-green/10"
              >
                + New
              </button>
            </div>

            {styles.length === 0 && (
              <p className="text-xs text-sgwx-text-muted">
                No saved styles yet. Create one using the editor.
              </p>
            )}

            <div className="space-y-1">
              {styles.map((style) => (
                <button
                  key={style._id}
                  type="button"
                  onClick={() => loadStyle(style)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    selectedId === style._id
                      ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-green"
                      : "border-sgwx-border bg-sgwx-surface text-sgwx-text hover:border-sgwx-green/30"
                  }`}
                >
                  <span className="block font-medium">{style.name}</span>
                  <span className="block font-mono text-[14px] text-sgwx-text-muted">
                    {style.slug}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* ── Right panel: editor ────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Name input */}
            <div className="space-y-2">
              <label
                htmlFor="style-name"
                className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green"
              >
                Style Name
              </label>
              <input
                id="style-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Feature Card"
                className="w-full rounded-lg border border-sgwx-border bg-sgwx-surface px-4 py-2 text-sm text-sgwx-text placeholder:text-sgwx-text-muted focus:border-sgwx-green focus:outline-none"
              />
              {name && (
                <p className="font-mono text-[14px] text-sgwx-text-muted">
                  slug: {slugify(name)}
                </p>
              )}
            </div>

            {/* Live Preview */}
            <div className="space-y-3">
              <h2 className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Live Preview
              </h2>
              <div className="rounded-xl border border-sgwx-border bg-sgwx-bg-alt p-8">
                <div className="mx-auto max-w-sm">
                  <StyledCard style={previewStyle} imagePlaceholder>
                    <Badge>Category</Badge>
                    <h3 className="mt-3 text-lg font-medium text-sgwx-text">
                      Card Title Goes Here
                    </h3>
                    <p className="mt-1 text-sm text-sgwx-text-muted">
                      A short description of the card content to show how text
                      looks inside the component.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-sgwx-green">
                      Learn more
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </StyledCard>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <RadioGroup
                label="Border Radius"
                value={current.borderRadius}
                onChange={(v) =>
                  setCurrent((prev) => ({ ...prev, borderRadius: v }))
                }
                options={RADIUS_OPTIONS}
              />

              <RadioGroup
                label="Padding"
                value={current.padding}
                onChange={(v) =>
                  setCurrent((prev) => ({ ...prev, padding: v }))
                }
                options={PADDING_OPTIONS}
              />

              <RadioGroup
                label="Background"
                value={current.backgroundStyle}
                onChange={(v) =>
                  setCurrent((prev) => ({ ...prev, backgroundStyle: v }))
                }
                options={BG_OPTIONS}
              />

              <RadioGroup
                label="Accent Color"
                value={current.accentColor}
                onChange={(v) =>
                  setCurrent((prev) => ({ ...prev, accentColor: v }))
                }
                options={ACCENT_OPTIONS}
              />

              <RadioGroup
                label="Hover Effect"
                value={current.hoverEffect}
                onChange={(v) =>
                  setCurrent((prev) => ({ ...prev, hoverEffect: v }))
                }
                options={HOVER_OPTIONS}
              />

              <RadioGroup
                label="Image Aspect"
                value={current.imageAspect}
                onChange={(v) =>
                  setCurrent((prev) => ({ ...prev, imageAspect: v }))
                }
                options={IMAGE_ASPECT_OPTIONS}
              />

              {/* Show Border toggle */}
              <fieldset className="space-y-2">
                <legend className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                  Show Border
                </legend>
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((prev) => ({
                      ...prev,
                      showBorder: !prev.showBorder,
                    }))
                  }
                  className={`rounded-lg border px-4 py-1.5 text-xs transition-colors ${
                    current.showBorder
                      ? "border-sgwx-green bg-sgwx-green/10 text-sgwx-green"
                      : "border-sgwx-border bg-sgwx-surface text-sgwx-text-muted"
                  }`}
                >
                  {current.showBorder ? "On" : "Off"}
                </button>
              </fieldset>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 border-t border-sgwx-border pt-6">
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending || !name.trim()}
                className="rounded-lg bg-sgwx-green px-6 py-2 text-sm font-semibold text-sgwx-bg transition-colors hover:bg-sgwx-green-bright disabled:opacity-40"
              >
                {isPending
                  ? "Saving..."
                  : selectedId
                    ? "Update Style"
                    : "Save Style"}
              </button>

              {selectedId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="rounded-lg border border-red-500/30 px-6 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-40"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="pb-16" />
      </Container>
    </div>
  );
}
