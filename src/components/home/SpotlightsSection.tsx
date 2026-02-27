import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/shared/BlogCard";
import SectionBackground from "@/components/ui/SectionBackground";

interface Post {
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
}

interface SpotlightsSectionProps {
  posts: Post[];
  backgroundUrl?: string;
}

export default function SpotlightsSection({ posts, backgroundUrl }: SpotlightsSectionProps) {
  return (
    <section className="relative bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} />}
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
            <AnimatedSection key={post.slug} delay={0.1 + i * 0.08}>
              <BlogCard
                tag={post.tag}
                title={post.title}
                description={post.excerpt}
                href={`/spotlights/${post.slug}`}
              />
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
