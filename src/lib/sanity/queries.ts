import { client } from "./client";

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
  tags: string[];
  shortDescription: string;
  order: number;
}

export interface CaseStudyDetail extends CaseStudyListItem {
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

// ─── Fetchers ────────────────────────────────────────────────────────────────

export async function getAllCaseStudies() {
  return client.fetch<CaseStudyListItem[]>(
    `*[_type == "caseStudy"] | order(order asc) {
      _id, title, "slug": slug.current, client, category, tags, shortDescription, order
    }`
  );
}

export async function getCaseStudyBySlug(slug: string) {
  return client.fetch<CaseStudyDetail | null>(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, client, category, tags, shortDescription,
      longDescription, testimonial, order
    }`,
    { slug }
  );
}

export async function getCaseStudySlugs() {
  return client.fetch<string[]>(
    `*[_type == "caseStudy" && defined(slug.current)].slug.current`
  );
}

export async function getAllBlogPosts() {
  return client.fetch<BlogPostListItem[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, "slug": slug.current, tag, excerpt, publishedAt
    }`
  );
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch<BlogPostDetail | null>(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, tag, excerpt, body, publishedAt
    }`,
    { slug }
  );
}

export async function getBlogPostSlugs() {
  return client.fetch<string[]>(
    `*[_type == "blogPost" && defined(slug.current)].slug.current`
  );
}

export async function getFeaturedMembers() {
  return client.fetch<MemberItem[]>(
    `*[_type == "member" && isFeatured == true] | order(order asc) {
      _id, name, "slug": slug.current, title, mantra, characterMetaphor,
      bio, favoriteTools, "link": link { label, url }, isFeatured, order
    }`
  );
}

export async function getAllMembers() {
  return client.fetch<MemberItem[]>(
    `*[_type == "member"] | order(order asc) {
      _id, name, "slug": slug.current, title, mantra, isFeatured, order
    }`
  );
}
