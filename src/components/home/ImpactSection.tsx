import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import CaseStudyCard from "@/components/shared/CaseStudyCard";
import LogoWall from "./LogoWall";

interface CaseStudy {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  thumbnailUrl?: string;
}

interface ImpactSectionProps {
  eyebrow?: string;
  heading?: string;
  logoWallHeading?: string;
  logos?: { imageUrl?: string; alt: string }[];
  caseStudies: CaseStudy[];
}

export default function ImpactSection({
  eyebrow = "Featured Work",
  heading = "Making An Impact.",
  logoWallHeading,
  logos,
  caseStudies,
}: ImpactSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading eyebrow={eyebrow} heading={heading} size="medium" align="right" />
          <p className="mt-3 max-w-2xl text-base text-sgwx-text-muted md:text-lg">
            Trusted by ambitious brands and global leaders to help them move forward faster.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.slug} delay={0.1 + i * 0.08} className="h-full">
              <CaseStudyCard
                category={study.category}
                title={study.title}
                description={study.shortDescription}
                href={`/work/${study.slug}`}
                thumbnailUrl={study.thumbnailUrl}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.25}>
          <div className="mt-10 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-sgwx-green px-6 py-3 font-mono text-[13px] tracking-widest uppercase text-sgwx-green transition-all hover:bg-sgwx-green/10 hover:text-sgwx-green-bright"
            >
              View More Work
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <LogoWall heading={logoWallHeading} logos={logos} />
        </AnimatedSection>
      </Container>
    </section>
  );
}
