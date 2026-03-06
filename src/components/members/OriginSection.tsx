import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";

const defaultParagraphs = [
  "Sageworx started in 2020 with a simple idea between two founders, Marc and Pat. One from the world of creative and marketing, the other from production and advertising, they both saw the same cracks in the traditional agency model. They wanted to build something different, with people who thought differently.",
  "They began by bringing together a small band of their most trusted former colleagues\u2014all senior specialists who had also left the agency and corporate worlds behind. This was the start of the collective. During a time when the world was going remote, they built a new kind of machine, fueled not by winning awards, but by delivering real outcomes for clients.",
  "They created a system built around independent lifestyles and collaborative, agile interactions. Information was engrained, not handed off. The result was a seamless workflow that proved you didn\u2019t need to be in the same room to be on the same page.",
];

interface OriginSectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
}

export default function OriginSection({ eyebrow, heading, paragraphs }: OriginSectionProps) {
  const paras = paragraphs ?? defaultParagraphs;

  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Our Origin"}
            heading={heading ?? "From Two Friends to a Global Network."}
            size="display"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
