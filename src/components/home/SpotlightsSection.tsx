import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/shared/BlogCard";

const posts = [
  {
    tag: "Featured Work",
    title: "ZENPEP\u00AE Racing Game",
    description:
      "How we turned clinical education into an engaging competitive game.",
    href: "/spotlights/zenpep-racing-game",
  },
  {
    tag: "Insights",
    title: "The End of the AOR Model",
    description:
      "Why brands are moving away from agency of record relationships.",
    href: "/spotlights/end-of-aor-model",
  },
  {
    tag: "Process",
    title: "Building Teams That Scale",
    description:
      "Our approach to assembling the right talent for every challenge.",
    href: "/spotlights/building-teams-that-scale",
  },
];

export default function SpotlightsSection() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            heading="Every project is an opportunity to push boundaries, challenge conventions, and make a mark."
            size="display"
            centered
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <AnimatedSection key={post.href} delay={0.1 + i * 0.08}>
              <BlogCard {...post} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.35}>
          <div className="mt-12 text-center">
            <Button href="/spotlights" variant="secondary">
              More Spotlights
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
