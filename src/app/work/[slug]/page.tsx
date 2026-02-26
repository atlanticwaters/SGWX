import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface CaseStudyData {
  category: string;
  title: string;
  tags: string[];
  body: string[];
}

const caseStudyData: Record<string, CaseStudyData> = {
  zenpep: {
    category: "Pharma / HCP Engagement",
    title: "ZENPEP\u00AE Racing Game by Nestl\u00E9 Health Science",
    tags: [
      "Game Design",
      "Pharma Education",
      "Interactive Learning",
      "Trade Show Engagements",
    ],
    body: [
      "Static slides don\u2019t cut it with busy healthcare professionals. When a leading pharmaceutical company needed to reframe the conversation around dosing, it faced a big hurdle: how to make complex clinical data stick in fast-paced field sales and conference environments.",
      "Sageworx partnered with leading game developer MOTR to design and produce an interactive experience that trades passive detailing for active participation. We bypassed the slide deck and built a first-person, arcade-style driving game that transforms clinical education into a memorable, compliance-safe tool.",
      "Built as an iPad-first WebGL Progressive Web App, the game is zero-friction for sales reps. It launches instantly, works offline, and requires no installation, making it a ready-to-go asset for any HCP conversation. Inside a stylized pancreas, players navigate a raceway, collecting power up tokens to fight chronic disease and hitting checkpoints that trigger quiz moments. Each interaction reinforces critical prescribing considerations\u2014from patient variability to the correct dosing\u2014while keeping approved safety information visible. A competitive leaderboard fuels repeat engagement, turning a clinical tool into a peer-to-peer challenge. The result is a high-performance platform that empowers sales reps and makes complex science digestible.",
      "The game launched at major trade events in February 2026, setting a new standard for interactive pharmaceutical education.",
    ],
  },
  "nfl-sunday-ticket": {
    category: "Sports Media / Brand & Product Identity",
    title: "New NFL Sunday Ticket\u00AE Logo for Businesses",
    tags: ["Brand Architecture", "Logo Design", "Product Identity Systems"],
    body: [
      "When EverPass Media acquired the commercial distribution rights for NFL Sunday Ticket\u00AE, the opportunity was massive, and so was the challenge. With YouTube carrying the consumer product, EverPass needed a brand identity that clearly signaled business-only access, while maintaining the integrity, authority, and equity of one of the most recognizable brands in sports.",
      "EverPass engaged Sageworx to help them lead the evolution. As a fast-growing sports media company operating alongside giants like the NFL, ESPN and NBC Universal, EverPass required seasoned creative leadership capable of navigating brand hierarchy, legal constraints, and real-world commercial use cases. This was not just a logo refresh\u2014it was a strategic redesign.",
      "Sageworx developed a broad range of logo concepts rooted in the game itself, exploring tickets, screens, stadium architecture, shields, and field-driven iconography. Each direction was designed to modernize NFL Sunday Ticket\u00AE for today\u2019s streaming environment while clearly differentiating the commercial offering from the consumer YouTube package. Particular care was taken to preserve NFL authenticity, respect trademark boundaries, and strengthen cohesion with the EverPass brand\u2014without visual confusion.",
      "The resulting identity system was engineered for versatility and scale, performing across digital platforms, print, and high-visibility bar and venue environments. The final mark communicates premium access, legitimacy, and professionalism\u2014positioning EverPass as the definitive commercial home of NFL Sunday Ticket\u00AE.",
    ],
  },
};

export function generateStaticParams() {
  return [{ slug: "zenpep" }, { slug: "nfl-sunday-ticket" }];
}

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const study = caseStudyData[slug];

  if (!study) {
    notFound();
  }

  return (
    <article className="bg-sgwx-bg py-16 md:py-24">
      <Container className="max-w-3xl">
        {/* Back link */}
        <AnimatedSection>
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Work
          </Link>
        </AnimatedSection>

        {/* Category badge */}
        <AnimatedSection delay={0.05}>
          <Badge className="mt-6">{study.category}</Badge>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={0.1}>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-sgwx-text md:text-5xl">
            {study.title}
          </h1>
        </AnimatedSection>

        {/* Tags */}
        <AnimatedSection delay={0.15}>
          <div className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </AnimatedSection>

        {/* Thumbnail placeholder */}
        <AnimatedSection delay={0.2}>
          <div className="mt-10 aspect-video rounded-2xl bg-sgwx-bg-alt" />
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection delay={0.25}>
          <div className="mt-10 space-y-6">
            {study.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-sgwx-text-muted md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 border-t border-sgwx-border pt-10 text-center">
            <p className="mb-6 text-lg text-sgwx-text-muted">
              Ready to see more of our work?
            </p>
            <Button href="/work" variant="secondary">
              View All Case Studies
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </article>
  );
}
