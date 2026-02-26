import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface SpotlightData {
  tag: string;
  title: string;
  body: string[];
}

const spotlightData: Record<string, SpotlightData> = {
  "zenpep-racing-game": {
    tag: "Featured Work",
    title: "ZENPEP\u00AE Racing Game",
    body: [
      "When healthcare professionals are pressed for time and overwhelmed with information, traditional sales materials often fall flat. The challenge was clear: how do you make complex clinical data not just understandable, but genuinely memorable? The answer turned out to be a game.",
      "By partnering with top-tier game developers and applying deep pharma expertise, our team created an arcade-style racing experience that transforms passive detailing into active engagement. Sales reps now have a tool that sparks genuine curiosity, drives repeat interactions, and keeps compliance front and center.",
      "The result speaks for itself. Since launching at major trade events, the game has generated measurable increases in rep confidence and HCP engagement time. It is a proof point for what happens when creative ambition meets strategic discipline.",
    ],
  },
  "end-of-aor-model": {
    tag: "Insights",
    title: "The End of the AOR Model",
    body: [
      "For decades, the agency of record model was the default for brand-agency relationships. A single agency would handle everything\u2014strategy, creative, media, production\u2014under one retainer. It provided stability and consistency, but it also introduced bloat, complacency, and a one-size-fits-all approach that rarely served every need equally well.",
      "Today, brands are rethinking that arrangement. The rise of specialized talent networks, project-based engagements, and distributed teams has shown that there is a better way to get high-quality creative work done. Instead of locking in with one agency, forward-thinking companies are assembling bespoke teams tailored to each challenge.",
      "This shift is not just a trend\u2014it is a structural change in how marketing organizations operate. The brands that embrace it will move faster, spend smarter, and get work that is genuinely tailored to their needs rather than shaped by an agency\u2019s existing capabilities.",
    ],
  },
  "building-teams-that-scale": {
    tag: "Process",
    title: "Building Teams That Scale",
    body: [
      "The most common mistake in scaling creative teams is treating it as a hiring problem. Throw more people at it, and the work will get done faster. In practice, the opposite often happens: communication overhead increases, quality becomes inconsistent, and the original vision gets diluted across too many hands.",
      "At Sageworx, we approach scaling differently. Instead of growing headcount, we build micro-teams of senior specialists who already know how to work together. Each team is assembled for the specific challenge at hand\u2014no bench players, no learning curves, no wasted cycles.",
      "The result is a model that scales without sacrificing quality or speed. When a project grows in scope, we bring in the right people at the right time, maintaining the tight collaboration and accountability that makes great work possible. It is scaling by design, not by default.",
    ],
  },
};

export function generateStaticParams() {
  return [
    { slug: "zenpep-racing-game" },
    { slug: "end-of-aor-model" },
    { slug: "building-teams-that-scale" },
  ];
}

interface SpotlightDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SpotlightDetailPage({
  params,
}: SpotlightDetailPageProps) {
  const { slug } = await params;
  const spotlight = spotlightData[slug];

  if (!spotlight) {
    notFound();
  }

  return (
    <article className="bg-sgwx-bg py-16 md:py-24">
      <Container className="max-w-3xl">
        {/* Back link */}
        <AnimatedSection>
          <Link
            href="/spotlights"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Spotlights
          </Link>
        </AnimatedSection>

        {/* Tag badge */}
        <AnimatedSection delay={0.05}>
          <Badge variant="neutral" className="mt-6">
            {spotlight.tag}
          </Badge>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection delay={0.1}>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-sgwx-text md:text-5xl">
            {spotlight.title}
          </h1>
        </AnimatedSection>

        {/* Thumbnail placeholder */}
        <AnimatedSection delay={0.15}>
          <div className="mt-10 aspect-video rounded-2xl bg-sgwx-bg-alt" />
        </AnimatedSection>

        {/* Body */}
        <AnimatedSection delay={0.2}>
          <div className="mt-10 space-y-6">
            {spotlight.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-sgwx-text-muted md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>

        {/* Back CTA */}
        <AnimatedSection delay={0.25}>
          <div className="mt-16 border-t border-sgwx-border pt-10">
            <Link
              href="/spotlights"
              className="inline-flex items-center gap-2 text-sm font-medium text-sgwx-green transition-colors hover:text-sgwx-green-bright"
            >
              <span aria-hidden="true">&larr;</span>
              Back to all Spotlights
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </article>
  );
}
