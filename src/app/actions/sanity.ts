"use server";

import { getWriteClient } from "@/lib/sanity/write-client";
import { revalidatePath } from "next/cache";

// ─── Result Types ─────────────────────────────────────────────────────────────

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── Diagnostics (temporary) ─────────────────────────────────────────────────

export async function diagnoseSanityConnection(): Promise<ActionResult<{
  projectId: string;
  dataset: string;
  tokenPrefix: string;
  tokenLength: number;
}>> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "(not set)";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "(not set)";
  const token = process.env.SANITY_API_WRITE_TOKEN || "";

  return {
    success: true,
    data: {
      projectId,
      dataset,
      tokenPrefix: token ? token.slice(0, 8) + "..." : "(not set)",
      tokenLength: token.length,
    },
  };
}

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

export async function upsertCardStyle(
  data: CardStyleData,
  existingId?: string
): Promise<ActionResult> {
  try {
    const client = getWriteClient();
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
      await client.patch(existingId).set(doc).commit();
    } else {
      await client.create(doc);
    }

    revalidatePath("/card-designer");
    return { success: true, data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[upsertCardStyle]", message);
    return { success: false, error: message };
  }
}

export async function deleteCardStyle(id: string): Promise<ActionResult> {
  try {
    const client = getWriteClient();
    await client.delete(id);
    revalidatePath("/card-designer");
    return { success: true, data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[deleteCardStyle]", message);
    return { success: false, error: message };
  }
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

export async function createLandingPage(
  data: LandingPageData
): Promise<ActionResult<string>> {
  try {
    const client = getWriteClient();
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

    const result = await client.create(doc);
    revalidatePath("/landing-pages");
    revalidatePath(`/${data.slug}`);
    return { success: true, data: result._id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[createLandingPage]", message);
    return { success: false, error: message };
  }
}

export async function updateLandingPage(
  id: string,
  data: Partial<LandingPageData>
): Promise<ActionResult> {
  try {
    const client = getWriteClient();
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

    await client.patch(id).set(patch).commit();
    revalidatePath("/landing-pages");
    if (data.slug) revalidatePath(`/${data.slug}`);
    return { success: true, data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[updateLandingPage]", message);
    return { success: false, error: message };
  }
}

export async function toggleLandingPageStatus(
  id: string,
  currentStatus: string
): Promise<ActionResult> {
  try {
    const client = getWriteClient();
    const newStatus = currentStatus === "active" ? "draft" : "active";
    await client.patch(id).set({ status: newStatus }).commit();
    revalidatePath("/landing-pages");
    return { success: true, data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[toggleLandingPageStatus]", message);
    return { success: false, error: message };
  }
}

export async function deleteLandingPage(id: string): Promise<ActionResult> {
  try {
    const client = getWriteClient();
    await client.delete(id);
    revalidatePath("/landing-pages");
    return { success: true, data: undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[deleteLandingPage]", message);
    return { success: false, error: message };
  }
}
