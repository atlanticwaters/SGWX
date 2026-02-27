import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

const steps = [
  { num: "01", title: "Immersion & Brief", desc: "We define the problem, align on goals, and set success markers.", output: "Mission Brief" },
  { num: "02", title: "Build The Team", desc: "We assemble the right mix of seasoned talent for category expertise.", output: "Purpose Built Team" },
  { num: "03", title: "Shape The Direction", desc: "We convert the brief into clear avenues for strategic and creative exploration.", output: "Strategic Roadmap" },
  { num: "04", title: "Create & Refine", desc: "Work unfolds in focused sprints. Strategy, creative, and production operate as one.", output: "Accelerated Progress" },
  { num: "05", title: "Capture Learnings", desc: "Insights, decisions, and learnings inform the work now and the work to come.", output: "Shared Knowledge" },
  { num: "06", title: "Evolve & Scale", desc: "Leadership stays consistent. Specialists come in as needed. You get continuity without long-term overhead.", output: "Sustained Momentum" },
];

export default function ProcessSection({ backgroundUrl }: { backgroundUrl?: string }) {
  return (
    <section className="relative bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            heading="How The Work Gets Done"
            subheading="A clear, flexible process built for speed and follow-through."
            centered
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={0.08 + i * 0.08}>
              <Card className="h-full">
                <span className="font-mono text-sm tracking-widest text-sgwx-green">
                  {step.num}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-sgwx-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                  {step.desc}
                </p>
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-sgwx-text-dim">
                  Output: {step.output}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
