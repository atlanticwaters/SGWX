import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getLandingPageBySlug,
  getActiveLandingPageSlugs,
  getCaseStudiesByVerticals,
  getBlogPostsByVerticals,
  getTestimonialsByVerticals,
} from "@/lib/sanity/queries";
import BoldHeroTemplate from "@/components/landing-pages/BoldHeroTemplate";
import MinimalTemplate from "@/components/landing-pages/MinimalTemplate";
import ServicesShowcaseTemplate from "@/components/landing-pages/ServicesShowcaseTemplate";

export const revalidate = 60;

const RESERVED_SLUGS = [
  "actions",
  "admin",
  "animations",
  "api",
  "card-designer",
  "landing-pages",
  "members",
  "model",
  "process",
  "spotlights",
  "studio",
  "style-guide",
  "work",
  "work-placeholders",
];

export async function generateStaticParams() {
  const slugs = await getActiveLandingPageSlugs();
  return slugs
    .filter((slug) => !RESERVED_SLUGS.includes(slug))
    .map((slug) => ({ slug }));
}

interface LandingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.includes(slug)) return {};
  const page = await getLandingPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.clientName ? `${page.clientName} — Sageworx` : page.title,
    description:
      page.heroSubheading ||
      `Custom landing page for ${page.clientName || slug}`,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;

  if (RESERVED_SLUGS.includes(slug)) {
    notFound();
  }

  const page = await getLandingPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const verticals = page.verticals || [];

  const [caseStudies, blogPosts, testimonials] = await Promise.all([
    getCaseStudiesByVerticals(verticals),
    getBlogPostsByVerticals(verticals),
    getTestimonialsByVerticals(verticals),
  ]);

  switch (page.template) {
    case "minimal":
      return (
        <MinimalTemplate
          page={page}
          blogPosts={blogPosts}
          testimonials={testimonials}
        />
      );
    case "services-showcase":
      return (
        <ServicesShowcaseTemplate page={page} caseStudies={caseStudies} />
      );
    case "bold-hero":
    default:
      return (
        <BoldHeroTemplate
          page={page}
          caseStudies={caseStudies}
          testimonials={testimonials}
        />
      );
  }
}
