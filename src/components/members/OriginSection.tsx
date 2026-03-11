import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const defaultParagraphs = [
  "Sageworx started in 2020 with a simple idea between two founders, Marc Calamia and Patrick Conreaux. One from the world of creative and marketing, the other from production and advertising, they both saw the same cracks in the traditional agency model. They wanted to build something different, with people who thought differently.",
  "They began by bringing together a small band of their most trusted former colleagues\u2014all senior specialists who had also left the agency and corporate worlds behind. This was the start of the collective. During a time when the world was going remote, they built a new kind of machine, fueled not by winning awards, but by delivering real outcomes for clients.",
  "They created a system built around independent lifestyles and collaborative, agile interactions. Information was engrained, not handed off. The result was a seamless workflow that proved you didn\u2019t need to be in the same room to be on the same page.",
];

interface Founder {
  name: string;
  slug: string;
  title: string;
  photoUrl?: string;
}

interface OriginSectionProps {
  eyebrow?: string;
  heading?: string;
  paragraphs?: string[];
  founders?: Founder[];
  backgroundUrl?: string;
  overlayColor?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function OriginSection({ eyebrow, heading, paragraphs, founders, backgroundUrl, overlayColor }: OriginSectionProps) {
  const paras = paragraphs ?? defaultParagraphs;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Our Origin"}
            heading={heading ?? "From Two Friends to a Global Network."}
            size="display"
          />
        </AnimatedSection>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Copy block */}
          <AnimatedSection delay={0.12} className="flex-1">
            <div className="max-w-3xl space-y-6 text-base leading-relaxed text-sgwx-text-muted md:text-lg">
              {paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </AnimatedSection>

          {/* Founder photos — stacked vertically beside the copy */}
          {founders && founders.length > 0 && (
            <AnimatedSection delay={0.24} className="shrink-0">
              <div className="flex gap-4">
                {founders.map((founder) => (
                  <Link
                    key={founder.slug}
                    href={`/members/${founder.slug}`}
                    className="group block w-1/2 overflow-hidden rounded-2xl border border-white/[0.06] bg-sgwx-surface transition-all hover:border-sgwx-green/30 hover:shadow-lg hover:shadow-sgwx-green/5"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-sgwx-bg">
                      {founder.photoUrl ? (
                        <Image
                          src={founder.photoUrl}
                          alt={founder.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{ filter: "brightness(0.9) contrast(1.05) saturate(0.85)" }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-3xl font-bold text-sgwx-text-dim">
                            {getInitials(founder.name)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-sgwx-bg/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-sgwx-text transition-colors group-hover:text-sgwx-green-bright">
                        {founder.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
                        {founder.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </Container>
    </section>
  );
}
