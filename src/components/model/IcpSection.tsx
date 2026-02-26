import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface IcpCard {
  badge: string;
  headline: string;
  body: string;
  testimonial?: {
    quote: string;
    attribution: string;
  };
}

const cards: IcpCard[] = [
  {
    badge: "For Startups",
    headline: "Burn Rate Matters. So Do Great Ideas.",
    body: "You don\u2019t need more headcount; you need access to senior leadership that can translate your vision into market traction. Sageworx provides the strategic and executional firepower to build your brand and drive growth, without the risk and cost of a full-time executive hire.",
  },
  {
    badge: "For Small to Midsize Brands",
    headline: "Tired of Decks Instead of Progress?",
    body: "Your internal marketing and creative teams are stretched thin, and big agencies are slowing you down with endless approval loops. Sageworx integrates directly into your workflow, breaking through bottlenecks and accelerating execution. We act as a seamless extension of your team, delivering the seasoned firepower you need to make an impact.",
    testimonial: {
      quote:
        "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx is a smart, scalable way to solve complex problems without adding overhead.",
      attribution: "Christi De Ved, VP of Marketing, EverPass Media",
    },
  },
  {
    badge: "For Agencies & In-House Creative Teams",
    headline: "Say \u2018Yes\u2019 to Bigger Opportunities.",
    body: "A client needs something outside your wheelhouse. Don\u2019t scramble or say no. Sageworx allows you to expand your capabilities with fractional specialists who plug directly into your process. We help you pitch, plan, and deliver, all while remaining as visible (or invisible) to the client as you would like us to be.",
    testimonial: {
      quote:
        "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx gives us a smart, scalable way to solve complex problems without adding overhead.",
      attribution: "Will Morel, Creative Producer, Invivo Brands",
    },
  },
];

export default function IcpSection() {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Built for You"
            heading="One Model. Built for You."
            subheading="The Sageworx model stays consistent. How we show up changes based upon you and your needs."
            centered
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((card, i) => (
            <AnimatedSection key={card.badge} delay={0.1 + i * 0.08}>
              <Card className="flex h-full flex-col">
                <Badge>{card.badge}</Badge>

                <h3 className="mt-4 text-xl font-semibold text-sgwx-text">
                  {card.headline}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-sgwx-text-muted">
                  {card.body}
                </p>

                {card.testimonial && (
                  <div className="mt-auto pt-6">
                    <div className="h-px bg-sgwx-border-subtle" />
                    <blockquote className="mt-4">
                      <p className="text-xs italic leading-relaxed text-sgwx-text-dim">
                        &ldquo;{card.testimonial.quote}&rdquo;
                      </p>
                      <footer className="mt-3">
                        <cite className="not-italic font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                          &mdash; {card.testimonial.attribution}
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
