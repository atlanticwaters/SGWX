import { client } from "./client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "./image";
import { normalizeSanityData } from "./normalize";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SanityBlock {
  _type: "block";
  _key: string;
  children: { _type: "span"; text: string }[];
  style?: string;
}

export interface CaseStudyListItem {
  _id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  year?: string;
  tags: string[];
  shortDescription: string;
  thumbnailUrl?: string;
  order: number;
}

export interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface CaseStudyDetail extends CaseStudyListItem {
  heroImageUrl?: string;
  galleryImages?: GalleryImage[];
  longDescription: SanityBlock[];
  testimonial?: { quote: string; author: string; role: string };
}

export interface BlogPostListItem {
  _id: string;
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  publishedAt: string;
}

export interface BlogPostDetail extends BlogPostListItem {
  body: SanityBlock[];
}

export interface MemberItem {
  _id: string;
  name: string;
  slug: string;
  title: string;
  mantra: string;
  characterMetaphor: string;
  bio: string;
  favoriteTools: string;
  photoUrl?: string;
  link?: { label: string; url: string };
  isFeatured: boolean;
  order: number;
}

export interface SectionBackgroundItem {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string;
  credit?: string;
  overlayColor?: string;
}

// ─── Fetchers ────────────────────────────────────────────────────────────────

export async function getSectionBackgrounds(): Promise<SectionBackgroundItem[]> {
  if (!client) return [];
  const raw = await client.fetch<
    { _id: string; name: string; slug: string; image: SanityImageSource; credit?: string; overlayColor?: string }[]
  >(
    `*[_type == "sectionBackground"] {
      _id, name, "slug": slug.current, image, credit, overlayColor
    }`
  );
  return raw.map((bg) => ({
    _id: bg._id,
    name: bg.name,
    slug: bg.slug,
    imageUrl: urlFor(bg.image).width(1920).quality(75).auto("format").url(),
    credit: bg.credit,
    overlayColor: bg.overlayColor,
  }));
}

export async function getSectionBackgroundBySlug(slug: string): Promise<SectionBackgroundItem | null> {
  if (!client) return null;
  const raw = await client.fetch<
    { _id: string; name: string; slug: string; image: SanityImageSource; credit?: string; overlayColor?: string } | null
  >(
    `*[_type == "sectionBackground" && slug.current == $slug][0] {
      _id, name, "slug": slug.current, image, credit, overlayColor
    }`,
    { slug }
  );
  if (!raw) return null;
  return {
    _id: raw._id,
    name: raw.name,
    slug: raw.slug,
    imageUrl: urlFor(raw.image).width(1920).quality(75).auto("format").url(),
    credit: raw.credit,
    overlayColor: raw.overlayColor,
  };
}

export async function getAllCaseStudies(): Promise<CaseStudyListItem[]> {
  if (!client) return [];
  const raw = await client.fetch<
    (Omit<CaseStudyListItem, "thumbnailUrl"> & { thumbnail?: SanityImageSource })[]
  >(
    `*[_type == "caseStudy"] | order(order asc) {
      _id, title, "slug": slug.current, client, category, year, tags, shortDescription, thumbnail, order
    }`
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

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyDetail | null> {
  if (!client) return null;
  const raw = await client.fetch<
    (Omit<CaseStudyDetail, "thumbnailUrl" | "heroImageUrl" | "galleryImages"> & {
      thumbnail?: SanityImageSource;
      heroImage?: SanityImageSource;
      galleryImages?: { asset: SanityImageSource; alt?: string; caption?: string }[];
    }) | null
  >(
    `*[_type == "caseStudy" && slug.current == $slug] | order(defined(heroImage) desc, defined(galleryImages) desc)[0] {
      _id, title, "slug": slug.current, client, category, year, tags, shortDescription,
      thumbnail, heroImage,
      galleryImages[] { asset->, alt, caption },
      longDescription, testimonial, order
    }`,
    { slug }
  );
  if (!raw) return null;
  return {
    _id: raw._id,
    title: raw.title,
    slug: raw.slug,
    client: raw.client,
    category: raw.category,
    year: raw.year,
    tags: raw.tags,
    shortDescription: raw.shortDescription,
    thumbnailUrl: raw.thumbnail
      ? urlFor(raw.thumbnail).width(800).quality(75).auto("format").url()
      : undefined,
    heroImageUrl: raw.heroImage
      ? urlFor(raw.heroImage).width(1920).quality(80).auto("format").url()
      : undefined,
    galleryImages: raw.galleryImages?.map((img) => ({
      url: urlFor(img.asset).width(1400).quality(80).auto("format").url(),
      alt: img.alt,
      caption: img.caption,
    })),
    longDescription: raw.longDescription,
    testimonial: raw.testimonial,
    order: raw.order,
  };
}

export async function getAdjacentCaseStudies(
  currentSlug: string
): Promise<{ prev: CaseStudyListItem | null; next: CaseStudyListItem | null }> {
  const all = await getAllCaseStudies();
  const idx = all.findIndex((cs) => cs.slug === currentSlug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (!client) return [];
  return client.fetch<string[]>(
    `*[_type == "caseStudy" && defined(slug.current)].slug.current`
  );
}

export async function getAllBlogPosts(): Promise<BlogPostListItem[]> {
  if (!client) return [];
  return client.fetch<BlogPostListItem[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, "slug": slug.current, tag, excerpt, publishedAt
    }`
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  if (!client) return null;
  return client.fetch<BlogPostDetail | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, tag, excerpt, body, publishedAt
    }`,
    { slug }
  );
}

export async function getBlogPostSlugs(): Promise<string[]> {
  if (!client) return [];
  return client.fetch<string[]>(
    `*[_type == "blogPost" && defined(slug.current)].slug.current`
  );
}

export async function getFeaturedMembers(): Promise<MemberItem[]> {
  if (!client) return [];
  const raw = await client.fetch<
    (Omit<MemberItem, "photoUrl"> & { photo?: SanityImageSource })[]
  >(
    `*[_type == "member" && isFeatured == true] | order(order asc) {
      _id, name, "slug": slug.current, title, mantra, characterMetaphor,
      bio, favoriteTools, photo, "link": link { label, url }, isFeatured, order
    }`
  );
  return raw.map((m) => ({
    ...m,
    photoUrl: m.photo
      ? urlFor(m.photo).width(600).height(600).quality(80).auto("format").url()
      : undefined,
    photo: undefined,
  })) as MemberItem[];
}

export async function getAllMembers(): Promise<MemberItem[]> {
  if (!client) return [];
  const raw = await client.fetch<
    (Omit<MemberItem, "photoUrl"> & { photo?: SanityImageSource })[]
  >(
    `*[_type == "member"] | order(order asc) {
      _id, name, "slug": slug.current, title, mantra, photo, isFeatured, order
    }`
  );
  return raw.map((m) => ({
    ...m,
    photoUrl: m.photo
      ? urlFor(m.photo).width(200).height(200).quality(75).auto("format").url()
      : undefined,
    photo: undefined,
  })) as MemberItem[];
}

export async function getMembersForStrip(): Promise<Pick<MemberItem, "_id" | "name" | "slug" | "title" | "mantra" | "photoUrl" | "isFeatured">[]> {
  if (!client) return [];
  const raw = await client.fetch<
    { _id: string; name: string; slug: string; title: string; mantra: string; photo?: SanityImageSource; isFeatured: boolean; order: number }[]
  >(
    `*[_type == "member" && defined(photo)] | order(order asc) {
      _id, name, "slug": slug.current, title, mantra, photo, isFeatured, order
    }`
  );
  return raw.map((m) => ({
    _id: m._id,
    name: m.name,
    slug: m.slug,
    title: m.title,
    mantra: m.mantra,
    isFeatured: m.isFeatured,
    photoUrl: m.photo
      ? urlFor(m.photo).width(400).height(533).quality(80).auto("format").url()
      : undefined,
  }));
}

export async function getMemberBySlug(slug: string): Promise<MemberItem | null> {
  if (!client) return null;
  const raw = await client.fetch<
    (Omit<MemberItem, "photoUrl"> & { photo?: SanityImageSource }) | null
  >(
    `*[_type == "member" && slug.current == $slug][0] {
      _id, name, "slug": slug.current, title, mantra, characterMetaphor,
      bio, favoriteTools, photo, "link": link { label, url }, isFeatured, order
    }`,
    { slug }
  );
  if (!raw) return null;
  return {
    ...raw,
    photoUrl: raw.photo
      ? urlFor(raw.photo).width(800).height(800).quality(80).auto("format").url()
      : undefined,
    photo: undefined,
  } as MemberItem;
}

export async function getMemberSlugs(): Promise<string[]> {
  if (!client) return [];
  return client.fetch<string[]>(
    `*[_type == "member" && defined(slug.current)].slug.current`
  );
}

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
    `*[_type == "caseStudy" && industry in $verticals] | order(order asc) {
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
    `*[_type == "blogPost" && industry in $verticals] | order(publishedAt desc)[0...6] {
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
    `*[_type == "testimonial" && industry in $verticals] {
      _id, quote, authorName, role, company
    }`,
    { verticals }
  );
}

// ─── Site Settings Types & Query ─────────────────────────────────────────────

export interface SiteSettingsNavItem {
  label: string;
  href: string;
  isCta?: boolean;
}

export interface SiteSettingsData {
  siteTitle?: string;
  description?: string;
  navigation?: SiteSettingsNavItem[];
  footer?: {
    copyright?: string;
    socialLinks?: { platform: string; url: string }[];
  };
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  if (!client) return null;
  return client.fetch<SiteSettingsData | null>(
    `*[_type == "siteSettings" && _id == "siteSettings"][0] {
      siteTitle,
      description,
      navigation[] { label, href, isCta },
      footer { copyright, socialLinks[] { platform, url } }
    }`
  );
}

// ─── Shared: resolved hero background from reference ────────────────────────

const HERO_BG_PROJECTION = `heroBackground-> { "imageUrl": image.asset->url + "?w=1920&q=75&auto=format", overlayColor }`;

/** Reusable projection for any sectionBackground reference field */
const SECTION_BG = (field: string) =>
  `${field}-> { "imageUrl": image.asset->url + "?w=1920&q=75&auto=format", overlayColor }`;

/** Reusable projection for inline image fields */
const INLINE_IMG = (field: string) =>
  `"${field}": ${field} { "url": asset->url + "?w=800&q=80&auto=format", "alt": alt }`;

// ─── Model Page Types & Query ───────────────────────────────────────────────

type SectionBg = { imageUrl: string; overlayColor?: string };

export interface ModelPageData {
  heroBackground?: SectionBg;
  heroEyebrow?: string;
  heroHeading?: string;
  heroBody?: string;
  heroPrimaryCta?: HomepageCta;
  heroSecondaryCta?: HomepageCta;
  rightTeamBackground?: SectionBg;
  rightTeamEyebrow?: string;
  rightTeamHeading?: string;
  rightTeamParagraphs?: string[];
  rightTeamAlign?: string;
  rightTeamInlineImage?: { url: string; alt: string };
  capabilitiesBackground?: SectionBg;
  capabilitiesEyebrow?: string;
  capabilitiesTabs?: { id: string; label: string; items: string[] }[];
  microteamsBackground?: SectionBg;
  microteamsEyebrow?: string;
  microteamsHeading?: string;
  microteamsBody?: string;
  microteamsBullets?: string[];
  microteamsClosing?: string;
  microteamsAlign?: string;
  microteamsInlineImage?: { url: string; alt: string };
  momentumBackground?: SectionBg;
  momentumEyebrow?: string;
  momentumHeading?: string;
  momentumBody?: string;
  momentumBullets?: string[];
  momentumClosing?: string;
  momentumAlign?: string;
  momentumInlineImage?: { url: string; alt: string };
  icpBackground?: SectionBg;
  icpEyebrow?: string;
  icpHeading?: string;
  icpSubheading?: string;
  icpCards?: { badge: string; headline: string; body: string; testimonialQuote?: string; testimonialAttribution?: string; testimonialPhotoUrl?: string }[];
  continuityBackground?: SectionBg;
  continuityEyebrow?: string;
  continuityHeading?: string;
  continuityParagraphs?: string[];
  continuityAlign?: string;
  continuityInlineImage?: { url: string; alt: string };
  technologyBackground?: SectionBg;
  technologyEyebrow?: string;
  technologyHeading?: string;
  technologyParagraphs?: string[];
  technologyAlign?: string;
  technologyInlineImage?: { url: string; alt: string };
  fitBackground?: SectionBg;
  fitEyebrow?: string;
  fitHeading?: string;
  fitSubheading?: string;
  fitGoodItems?: string[];
  fitNotItems?: string[];
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

export async function getModelPage(): Promise<ModelPageData | null> {
  if (!client) return null;
  const raw = await client.fetch<ModelPageData | null>(
    `*[_type == "modelPage" && _id == "modelPage"][0] {
      ${HERO_BG_PROJECTION},
      heroEyebrow, heroHeading, heroBody,
      heroPrimaryCta { label, href, variant },
      heroSecondaryCta { label, href, variant },
      ${SECTION_BG("rightTeamBackground")},
      rightTeamEyebrow, rightTeamHeading, rightTeamParagraphs,
      rightTeamAlign, ${INLINE_IMG("rightTeamInlineImage")},
      ${SECTION_BG("capabilitiesBackground")},
      capabilitiesEyebrow,
      capabilitiesTabs[] { id, label, items },
      ${SECTION_BG("microteamsBackground")},
      microteamsEyebrow, microteamsHeading, microteamsBody, microteamsBullets, microteamsClosing,
      microteamsAlign, ${INLINE_IMG("microteamsInlineImage")},
      ${SECTION_BG("momentumBackground")},
      momentumEyebrow, momentumHeading, momentumBody, momentumBullets, momentumClosing,
      momentumAlign, ${INLINE_IMG("momentumInlineImage")},
      ${SECTION_BG("icpBackground")},
      icpEyebrow, icpHeading, icpSubheading,
      icpCards[] { badge, headline, body, testimonialQuote, testimonialAttribution, "testimonialPhotoUrl": testimonialPhoto.asset->url + "?w=200&h=200&fit=crop&auto=format" },
      ${SECTION_BG("continuityBackground")},
      continuityEyebrow, continuityHeading, continuityParagraphs,
      continuityAlign, ${INLINE_IMG("continuityInlineImage")},
      ${SECTION_BG("technologyBackground")},
      technologyEyebrow, technologyHeading, technologyParagraphs,
      technologyAlign, ${INLINE_IMG("technologyInlineImage")},
      ${SECTION_BG("fitBackground")},
      fitEyebrow, fitHeading, fitSubheading, fitGoodItems, fitNotItems,
      seo { title, description, noIndex }
    }`
  );
  return raw ? normalizeSanityData(raw) as ModelPageData : null;
}

// ─── Work Page Types & Query ────────────────────────────────────────────────

export interface WorkPageData {
  heroBackground?: { imageUrl: string; overlayColor?: string };
  heroHeading?: string;
  heroSubheading?: string;
  heroProjectsLabel?: string;
  heroStatusLabel?: string;
  heroStatusValue?: string;
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

export async function getWorkPage(): Promise<WorkPageData | null> {
  if (!client) return null;
  return client.fetch<WorkPageData | null>(
    `*[_type == "workPage" && _id == "workPage"][0] {
      ${HERO_BG_PROJECTION},
      heroHeading, heroSubheading, heroProjectsLabel, heroStatusLabel, heroStatusValue,
      seo { title, description, noIndex }
    }`
  );
}

// ─── Spotlights Page Types & Query ──────────────────────────────────────────

export interface SpotlightsPageData {
  heroBackground?: { imageUrl: string; overlayColor?: string };
  heroHeading?: string;
  heroSubheading?: string;
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

export async function getSpotlightsPage(): Promise<SpotlightsPageData | null> {
  if (!client) return null;
  return client.fetch<SpotlightsPageData | null>(
    `*[_type == "spotlightsPage" && _id == "spotlightsPage"][0] {
      ${HERO_BG_PROJECTION},
      heroHeading, heroSubheading,
      seo { title, description, noIndex }
    }`
  );
}

// ─── Members Page Types & Query ─────────────────────────────────────────────

export interface MembersStatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface MembersPageData {
  heroBackground?: { imageUrl: string; overlayColor?: string };
  heroHeading?: string;
  heroBody?: string;
  originEyebrow?: string;
  originHeading?: string;
  originParagraphs?: string[];
  growthEyebrow?: string;
  growthHeading?: string;
  growthParagraphs?: string[];
  growthAlign?: string;
  growthInlineImage?: { url: string; alt: string };
  statsEyebrow?: string;
  statsHeading?: string;
  statsParagraphs?: string[];
  statsItems?: MembersStatItem[];
  joinHeading?: string;
  joinSubheading?: string;
  joinParagraphs?: string[];
  joinCta?: HomepageCta;
  joinAlign?: string;
  joinInlineImage?: { url: string; alt: string };
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

export async function getMembersPage(): Promise<MembersPageData | null> {
  if (!client) return null;
  const raw = await client.fetch<MembersPageData | null>(
    `*[_type == "membersPage" && _id == "membersPage"][0] {
      ${HERO_BG_PROJECTION},
      heroHeading, heroBody,
      originEyebrow, originHeading, originParagraphs,
      growthEyebrow, growthHeading, growthParagraphs,
      growthAlign, ${INLINE_IMG("growthInlineImage")},
      statsEyebrow, statsHeading, statsParagraphs,
      statsItems[] { value, suffix, label },
      joinHeading, joinSubheading, joinParagraphs,
      joinCta { label, href, variant },
      joinAlign, ${INLINE_IMG("joinInlineImage")},
      seo { title, description, noIndex }
    }`
  );
  return raw ? normalizeSanityData(raw) as MembersPageData : null;
}

// ─── Process Page Types & Query ─────────────────────────────────────────────

export interface ProcessStageData {
  id: string;
  number: string;
  name: string;
  accent: "green" | "cyan";
  focus: string;
  services: string[];
  proof: { client: string; description: string; result: string };
  glowPosition: string;
  deepFieldVariant: number;
}

export interface ProcessStepData {
  num: string;
  title: string;
  whatsHappening: string;
  whyItMatters: string;
  whatYouGet: string;
}

export interface ProcessPrincipleCard {
  badge: string;
  title: string;
  paragraphs: string[];
}

export interface ProcessPageData {
  heroBackground?: { imageUrl: string; overlayColor?: string };
  heroEyebrow?: string;
  heroHeading?: string;
  heroBody?: string;
  stages?: ProcessStageData[];
  sixStepsEyebrow?: string;
  sixStepsHeading?: string;
  sixStepsItems?: ProcessStepData[];
  principlesEyebrow?: string;
  principlesHeading?: string;
  principlesSubheading?: string;
  principlesCards?: ProcessPrincipleCard[];
  governanceEyebrow?: string;
  governanceHeading?: string;
  governanceBullets?: string[];
  fitEyebrow?: string;
  fitHeading?: string;
  fitGoodItems?: string[];
  fitNotItems?: string[];
  closingStageWords?: { text: string; color: string }[];
  closingWordmark?: string;
  closingTagline?: string;
  closingCta?: HomepageCta;
  closeHeading?: string;
  closeBody?: string;
  closeCta?: HomepageCta;
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

export async function getProcessPage(): Promise<ProcessPageData | null> {
  if (!client) return null;
  const raw = await client.fetch<ProcessPageData | null>(
    `*[_type == "processPage" && _id == "processPage"][0] {
      ${HERO_BG_PROJECTION},
      heroEyebrow, heroHeading, heroBody,
      stages[] { id, number, name, accent, focus, services, proof { client, description, result }, glowPosition, deepFieldVariant },
      sixStepsEyebrow, sixStepsHeading,
      sixStepsItems[] { num, title, whatsHappening, whyItMatters, whatYouGet },
      principlesEyebrow, principlesHeading, principlesSubheading,
      principlesCards[] { badge, title, paragraphs },
      governanceEyebrow, governanceHeading, governanceBullets,
      fitEyebrow, fitHeading, fitGoodItems, fitNotItems,
      closingStageWords[] { text, color },
      closingWordmark, closingTagline,
      closingCta { label, href, variant },
      closeHeading, closeBody,
      closeCta { label, href, variant },
      seo { title, description, noIndex }
    }`
  );
  return raw ? normalizeSanityData(raw) as ProcessPageData : null;
}

// ─── Style Guide Page Types & Query ─────────────────────────────────────────

export interface StyleGuideSectionDescription {
  sectionId: string;
  heading: string;
  description?: string;
}

export interface StyleGuidePageData {
  headerHeading?: string;
  headerSubheading?: string;
  sectionDescriptions?: StyleGuideSectionDescription[];
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

export async function getStyleGuidePage(): Promise<StyleGuidePageData | null> {
  if (!client) return null;
  const raw = await client.fetch<StyleGuidePageData | null>(
    `*[_type == "styleGuidePage" && _id == "styleGuidePage"][0] {
      headerHeading, headerSubheading,
      sectionDescriptions[] { sectionId, heading, description },
      seo { title, description, noIndex }
    }`
  );
  return raw ? normalizeSanityData(raw) as StyleGuidePageData : null;
}

// ─── Animations Page Types & Query ──────────────────────────────────────────

export interface AnimationsThreeEntry {
  name: string;
  description: string;
  fileName: string;
}

export interface AnimationsDeepFieldEntry {
  variant: number;
  name: string;
  subtitle: string;
  description: string;
  technique: string;
  bgColor: string;
}

export interface AnimationsPageData {
  headerHeading?: string;
  headerSubheading?: string;
  threeAnimations?: AnimationsThreeEntry[];
  deepFields?: AnimationsDeepFieldEntry[];
  seo?: { title?: string; description?: string; noIndex?: boolean };
}

export async function getAnimationsPage(): Promise<AnimationsPageData | null> {
  if (!client) return null;
  const raw = await client.fetch<AnimationsPageData | null>(
    `*[_type == "animationsPage" && _id == "animationsPage"][0] {
      headerHeading, headerSubheading,
      threeAnimations[] { name, description, fileName },
      deepFields[] { variant, name, subtitle, description, technique, bgColor },
      seo { title, description, noIndex }
    }`
  );
  return raw ? normalizeSanityData(raw) as AnimationsPageData : null;
}

// ─── Homepage Types & Query ─────────────────────────────────────────────────

export interface HomepageCta {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
}

export interface HomepageData {
  // Hero
  heroBackground?: { imageUrl: string; overlayColor?: string };
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
  processStages: { number: string; title: string; id: string; description: string; output?: string; accent: "green" | "cyan" }[];
  processFooterLink: HomepageCta;
  // Impact
  impactEyebrow: string;
  impactHeading: string;
  featuredCaseStudies?: CaseStudyListItem[];
  caseStudyDisplayCount?: number;
  logoWallHeading: string;
  logos: { imageUrl?: string; alt: string }[];
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

export async function getHomepage(): Promise<HomepageData | null> {
  if (!client) return null;
  const raw = await client.fetch<
    (Omit<HomepageData, "logos" | "featuredCaseStudies"> & {
      logos?: { asset: SanityImageSource; alt: string }[];
      featuredCaseStudies?: (Omit<CaseStudyListItem, "thumbnailUrl"> & { thumbnail?: SanityImageSource })[];
    }) | null
  >(
    `*[_type == "homepage" && _id == "homepage"][0] {
      ${HERO_BG_PROJECTION},
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
      processStages[] { number, title, id, description, output, accent },
      processFooterLink { label, href, variant },
      impactEyebrow, impactHeading,
      featuredCaseStudies[]-> {
        _id, title, "slug": slug.current, client, category, year, tags,
        shortDescription, thumbnail, order
      },
      caseStudyDisplayCount,
      logoWallHeading,
      logos[] { "asset": coalesce(image.asset, asset), alt },
      spotlightsEyebrow, spotlightsHeading,
      spotlightsCta { label, href, variant },
      finalCtaHeading,
      finalCtaPrimaryCta { label, href, variant },
      finalCtaSecondaryCta { label, href, variant },
      seo { title, description, noIndex }
    }`
  );
  if (!raw) return null;
  const normalized = normalizeSanityData(raw) as typeof raw;
  return {
    ...normalized,
    featuredCaseStudies: normalized.featuredCaseStudies
      ?.filter((cs) => cs != null)
      .map((cs) => ({
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
      })),
    logos: (raw.logos ?? [])
      .filter((logo) => logo?.asset || logo?.alt)
      .map((logo) => ({
        imageUrl: logo.asset
          ? urlFor(logo.asset).height(80).quality(90).auto("format").url()
          : undefined,
        alt: logo.alt ?? "",
      })),
  };
}
