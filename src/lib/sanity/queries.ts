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
}

// ─── Fetchers ────────────────────────────────────────────────────────────────

export async function getSectionBackgrounds(): Promise<SectionBackgroundItem[]> {
  if (!client) return [];
  const raw = await client.fetch<
    { _id: string; name: string; slug: string; image: SanityImageSource; credit?: string }[]
  >(
    `*[_type == "sectionBackground"] {
      _id, name, "slug": slug.current, image, credit
    }`
  );
  return raw.map((bg) => ({
    _id: bg._id,
    name: bg.name,
    slug: bg.slug,
    imageUrl: urlFor(bg.image).width(1920).quality(75).auto("format").url(),
    credit: bg.credit,
  }));
}

export async function getSectionBackgroundBySlug(slug: string): Promise<SectionBackgroundItem | null> {
  if (!client) return null;
  const raw = await client.fetch<
    { _id: string; name: string; slug: string; image: SanityImageSource; credit?: string } | null
  >(
    `*[_type == "sectionBackground" && slug.current == $slug][0] {
      _id, name, "slug": slug.current, image, credit
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
    `*[_type == "caseStudy" && slug.current == $slug][0] {
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
  return client.fetch<MemberItem[]>(
    `*[_type == "member" && isFeatured == true] | order(order asc) {
      _id, name, "slug": slug.current, title, mantra, characterMetaphor,
      bio, favoriteTools, "link": link { label, url }, isFeatured, order
    }`
  );
}

export async function getAllMembers(): Promise<MemberItem[]> {
  if (!client) return [];
  return client.fetch<MemberItem[]>(
    `*[_type == "member"] | order(order asc) {
      _id, name, "slug": slug.current, title, mantra, isFeatured, order
    }`
  );
}
