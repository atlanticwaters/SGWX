import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

interface IcpCard {
  badge: string;
  headline: string;
  body: string;
  testimonialQuote?: string;
  testimonialAttribution?: string;
}

const defaultCards: IcpCard[] = [
  {
    badge: "For Startups",
    headline: "Burn Rate Matters. So Do Great Ideas.",
    body: "You don\u2019t need more headcount; you need access to senior leadership that can translate your vision into market traction. Sageworx provides the strategic and executional firepower to build your brand and drive growth, without the risk and cost of a full-time executive hire.",
    testimonialQuote:
      "Launching a new platform in a fast-moving media landscape requires both strategic clarity and creative excellence. Sageworx has been a true extension of our team \u2014 partnering closely with us to shape the EverPass brand, support key media partnerships, and develop the first campaigns introducing our offering to the market. They\u2019ve navigated brand, legal, and league considerations with confidence and precision. Their ability to collaborate seamlessly and move quickly alongside our team has made them an invaluable partner.",
    testimonialAttribution: "Christi DeVed, VP of Marketing, EverPass Media",
  },
  {
    badge: "For Small to Midsize Brands on the Move",
    headline: "Tired of Decks Instead of Progress?",
    body: "Your internal marketing and creative teams are stretched thin, and big agencies are slowing you down with endless approval loops. Sageworx integrates directly into your workflow, breaking through bottlenecks and accelerating execution. We act as a seamless extension of your team, delivering the seasoned firepower you need to make an impact.",
    testimonialQuote:
      "We needed a team that could bridge the gap between technical precision and emotional storytelling. Sageworx delivered a creative vision that elevated our brand and gave us a framework we can build on for years.",
    testimonialAttribution: "Dirk Frese, Vice President of Sales, Marketing & Service, JULABO USA",
  },
  {
    badge: "For Agencies & In-House Creative Teams",
    headline: "Say \u2018Yes\u2019 to Bigger Opportunities.",
    body: "A client needs something outside your wheelhouse. Don\u2019t scramble or say no. Sageworx allows you to expand your capabilities with fractional specialists who plug directly into your process. We help you pitch, plan, and deliver, all while remaining as visible (or invisible) to the client as you would like us to be.",
    testimonialQuote:
      "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx gives us a smart, scalable way to solve complex problems without adding overhead.",
    testimonialAttribution: "Will Morel, Creative Producer, Invivo Brands",
  },
];

interface IcpSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  cards?: IcpCard[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function IcpSection({ eyebrow, heading, subheading, cards, backgroundUrl, overlayColor }: IcpSectionProps) {
  const icpCards = cards ?? defaultCards;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Built for You"}
            heading={heading ?? "One Model. Built for You."}
            subheading={subheading ?? "The Sageworx model stays consistent. How we show up changes based upon you and your needs."}
            size="display"
            align="right"
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {icpCards.map((card, i) => (
            <AnimatedSection key={card.badge} delay={0.1 + i * 0.08}>
              <Card className="flex h-full flex-col gap-4">
                <p className="font-mono text-[14px] font-medium uppercase tracking-widest text-sgwx-green">
                  {card.badge}
                </p>

                <h3 className="text-2xl font-normal tracking-tight text-sgwx-text md:text-3xl">
                  {card.headline}
                </h3>

                <p className="text-base leading-relaxed text-sgwx-text-muted">
                  {card.body}
                </p>

                {card.testimonialQuote && (
                  <div className="mt-auto pt-6">
                    <div className="h-px bg-sgwx-border-subtle" />
                    <blockquote className="mt-4">
                      <p className="text-xs italic leading-relaxed text-sgwx-text-dim">
                        &ldquo;{card.testimonialQuote}&rdquo;
                      </p>
                      <footer className="mt-3">
                        <cite className="not-italic font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                          &mdash; {card.testimonialAttribution}
                        </cite>
                      </footer>
                    </blockquote>
                  </div>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
