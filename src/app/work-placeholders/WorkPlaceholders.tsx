"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface PlaceholderCaseStudy {
  title: string;
  client: string;
  category: string;
  tags: string[];
  shortDescription: string;
  image: string;
  imageAlt: string;
}

const placeholders: PlaceholderCaseStudy[] = [
  {
    title: "Digital Growth Engine for Heritage Automotive",
    client: "Meridian Motors",
    category: "Digital Strategy",
    tags: ["Content Strategy", "SEO", "Brand Positioning", "Analytics"],
    shortDescription:
      "Transformed a legacy automotive brand's digital presence with a full-funnel content ecosystem, driving 340% organic traffic growth and a 28% lift in qualified leads within 9 months.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=450&fit=crop",
    imageAlt: "Sleek automotive photography showing a luxury car on a winding road",
  },
  {
    title: "Community Platform Launch for Urban Agriculture",
    client: "GreenRoot Collective",
    category: "Platform Development",
    tags: ["Web App", "Community", "UX Research", "Content"],
    shortDescription:
      "Designed and launched a community-driven platform connecting urban farmers with local restaurants, achieving 12,000 active users and $2.4M in marketplace transactions in year one.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop",
    imageAlt: "Lush urban garden with raised beds and city skyline in the background",
  },
  {
    title: "Brand Mobilization for Renewable Energy Startup",
    client: "Solara Energy",
    category: "Brand & Campaign",
    tags: ["Brand Identity", "Campaign", "Social Media", "Video"],
    shortDescription:
      "Built a bold brand identity and multi-channel launch campaign for a solar energy startup, generating 18M impressions and 45K qualified signups in the first 60 days.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop",
    imageAlt: "Solar panels in a field with dramatic sunset light",
  },
  {
    title: "E-Commerce Transformation for Craft Goods",
    client: "Artisan & Co",
    category: "E-Commerce",
    tags: ["Shopify", "UX Design", "Content", "Email Marketing"],
    shortDescription:
      "Rebuilt the entire digital storefront for a handmade goods marketplace, resulting in a 67% increase in average order value and 4.2x improvement in conversion rate.",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=450&fit=crop",
    imageAlt: "Artisan workshop with handcrafted ceramic goods on wooden shelves",
  },
  {
    title: "Data-Driven Content System for Health Tech",
    client: "VitalPath",
    category: "Content Systems",
    tags: ["CMS Architecture", "AI/ML", "Content Ops", "Personalization"],
    shortDescription:
      "Architected a personalized content delivery system powered by behavioral data, increasing patient engagement by 89% and reducing content production costs by 40%.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop",
    imageAlt: "Modern health technology interface with data visualization",
  },
  {
    title: "Stadium Experience Redesign for Pro Sports",
    client: "Velocity FC",
    category: "Experience Design",
    tags: ["UX/UI", "Mobile App", "Real-time Data", "Fan Engagement"],
    shortDescription:
      "Reimagined the in-stadium fan experience with a real-time companion app featuring live stats, AR wayfinding, and social features — adopted by 78% of season ticket holders.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=450&fit=crop",
    imageAlt: "Packed sports stadium at night with dramatic lighting",
  },
];

export default function WorkPlaceholders() {
  return (
    <div className="min-h-screen bg-sgwx-bg py-16 md:py-24">
      <Container>
        {/* Header */}
        <AnimatedSection>
          <Badge className="mb-4">Internal Reference</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-sgwx-text md:text-5xl">
            Work Placeholders
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted">
            Sample case studies with Unsplash imagery showing how production
            graphics will appear on the site. Use these as a guide for building
            the real assets and adding them to Sanity.
          </p>
        </AnimatedSection>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />

        {/* Card grid — matches work page layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {placeholders.map((study, i) => (
            <AnimatedSection key={study.title} delay={i * 0.1}>
              <Card className="flex h-full flex-col">
                {/* Thumbnail with Unsplash image */}
                <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={study.image}
                    alt={study.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Subtle overlay to maintain dark aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/40 to-transparent" />
                </div>

                {/* Category badge */}
                <Badge>{study.category}</Badge>

                {/* Client name */}
                <p className="mt-3 font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                  {study.client}
                </p>

                {/* Title */}
                <h3 className="mt-2 text-lg font-semibold text-sgwx-text">
                  {study.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sgwx-text-muted">
                  {study.shortDescription}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Placeholder CTA */}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sgwx-green">
                  View Case Study
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Image source note */}
        <div className="mt-16 border-t border-sgwx-border pt-8 text-center">
          <p className="text-xs text-sgwx-text-dim">
            All images sourced from{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sgwx-green transition-colors hover:text-sgwx-green-bright"
            >
              Unsplash
            </a>
            . Replace with production graphics before launch.
          </p>
        </div>
      </Container>
    </div>
  );
}
