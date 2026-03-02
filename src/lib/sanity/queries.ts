import { client } from "./client";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "./image";

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
    `*[_type == "member" && isFeatured == true && defined(slug.current)].slug.current`
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
