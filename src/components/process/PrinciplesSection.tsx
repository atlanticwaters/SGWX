import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface PrincipleCard {
  badge: string;
  title: string;
  paragraphs: string[];
}

const defaultCards: PrincipleCard[] = [
  {
    badge: "M-Shaped Talent",
    title: "Built Around M-Shaped Senior Talent",
    paragraphs: [
      "Our members average 15\u201320 years in their discipline, with agency and in-house leadership backgrounds\u2014and the range to operate confidently beyond a single specialty.",
      "Deep expertise where it matters most, with meaningful fluency across adjacent disciplines. Our teams think beyond single roles\u2014connecting strategy, creative, technology, and production from day one.",
      "M-shaped talent means you\u2019re not just hiring for one lane. You\u2019re gaining leaders who can go deep, see around corners, and collaborate across the full scope of the work.",
    ],
  },
  {
    badge: "Flex Structure",
    title: "Structured to Flex",
    paragraphs: [
      "Leadership stays consistent, providing continuity, context, and accountability throughout the engagement. Specialists rotate in as needed based on the work\u2014not org charts\u2014allowing the team to flex without friction. Scope adapts as priorities evolve, without resetting momentum or re-onboarding a new group.",
    ],
  },
];

interface PrinciplesSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  cards?: PrincipleCard[];
}

export default function PrinciplesSection({ eyebrow, heading, subheading, cards }: PrinciplesSectionProps) {
  const allCards = cards ?? defaultCards;

  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Principles"}
            heading={heading ?? "Designed to Move You Forward. Faster."}
            subheading={subheading ?? "Our process and systems are designed for work without the re-work. Strategy, creative, and production aligned early. Fewer handoffs. Decisions and learnings are documented to reduce rework and repeat spend."}
            size="display"
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {allCards.map((card, i) => (
            <AnimatedSection key={card.badge} delay={0.1 + i * 0.08}>
              <Card hover={false} className="h-full">
                <p className="mb-4 font-mono text-[14px] font-medium uppercase tracking-widest text-sgwx-green">
                  {card.badge}
                </p>
                <h3 className="text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">
                  {card.title}
                </h3>
                <div className="mt-4 space-y-4">
                  {card.paragraphs.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-sgwx-text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
