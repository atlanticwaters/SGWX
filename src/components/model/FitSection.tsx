import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";

const defaultGoodFit = [
  "Tired of managing a roster of disconnected freelancers",
  "Looking to scale your team\u2019s capabilities without adding headcount",
  "An agency needing to fill a capability gap for a key client",
  "Frustrated with the bloat and slow pace of traditional agencies",
];

const defaultNotFit = [
  "Looking for the lowest-cost execution or junior support",
  "Expecting to fully outsource the work with minimal involvement",
  "Optimizing for sheer volume over strategic impact",
];

interface FitSectionProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  goodItems?: string[];
  notItems?: string[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function FitSection({ eyebrow, heading, subheading, goodItems, notItems, backgroundUrl, overlayColor }: FitSectionProps) {
  const goodFit = goodItems ?? defaultGoodFit;
  const notFit = notItems ?? defaultNotFit;

  return (
    <section className="relative overflow-hidden bg-sgwx-bg py-24 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Fit Check"}
            heading={heading ?? "Let\u2019s Be Direct."}
            subheading={subheading ?? "The Sageworx model works best when there\u2019s a true partnership. We\u2019re a strong fit if you value senior judgment, strategic clarity, and close collaboration."}
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Good fit — green-tinted panel */}
          <AnimatedSection delay={0.1}>
            <div className="h-full rounded-2xl border border-sgwx-green/30 bg-sgwx-green/[0.14] p-6 backdrop-blur-sm">
              <p className="mb-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-green-bright">
                You&apos;ll feel right at home if you&apos;re:
              </p>
              <ul className="space-y-3">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-sgwx-green-bright"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 10l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed text-sgwx-text">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Not a fit — muted warm panel */}
          <AnimatedSection delay={0.18}>
            <div className="h-full rounded-2xl border border-red-500/20 bg-red-950/[0.35] p-6 backdrop-blur-sm">
              <p className="mb-4 font-mono text-[14px] tracking-widest uppercase text-red-400/80">
                We&apos;re probably not the right solution if you&apos;re:
              </p>
              <ul className="space-y-3">
                {notFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-red-400/70"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 6l8 8M14 6l-8 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed text-sgwx-text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

      </Container>
    </section>
  );
}
