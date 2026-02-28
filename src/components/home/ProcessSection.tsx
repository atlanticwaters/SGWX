import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

const stages = [
  { num: "01", title: "Launch", desc: "Brand foundation + market entry. Strategic and visual infrastructure to compete from day one.", accent: "text-sgwx-green" },
  { num: "02", title: "Engage", desc: "Content + experiences that connect. Campaigns, video, interactive \u2014 the work that moves people to act.", accent: "text-sgwx-cyan" },
  { num: "03", title: "Mobilize", desc: "Building communities + amplifying reach. Turning customers into advocates and audiences into movements.", accent: "text-sgwx-green" },
  { num: "04", title: "Transform", desc: "Internal alignment + organizational evolution. When the mission shifts to culture, we engineer the change.", accent: "text-sgwx-cyan" },
];

export default function ProcessSection({ backgroundUrl }: { backgroundUrl?: string }) {
  return (
    <section className="relative bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Our Process"
            heading="The Growth Sequence"
            subheading="Smart content + experiences built for every stage of your brand\u2019s evolution."
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <AnimatedSection key={stage.num} delay={0.08 + i * 0.08}>
              <Card className="h-full">
                <span className={`font-mono text-sm tracking-widest ${stage.accent}`}>
                  {stage.num}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-sgwx-text">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                  {stage.desc}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-10 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm tracking-wide text-sgwx-green transition-colors hover:text-sgwx-green-bright"
            >
              Explore the full sequence
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 10h10M11 6l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
