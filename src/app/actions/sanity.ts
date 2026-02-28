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
