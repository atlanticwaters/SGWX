"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";

function ScaleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        fill="#1e2422"
        d="M15.5 20.5h-2v-2l-2 -1 -2 1v2h-2l-0.5 3h9l-0.5 -3Z"
      />
      <path fill="#1e2422" d="m4.5 17 -4 -2.5h8l-4 2.5Z" />
      <path fill="#1e2422" d="m18.5 13 -4 -2.5h8l-4 2.5Z" />
      <path fill="#1e2422" d="M11.5 5.5 10 4 11.5 0.5 13 4l-1.5 1.5Z" />
      <path fill="#D4EEDA" d="M7.3 22 7 23.5h9l-0.2 -1.5H7.3Z" />
      <path
        stroke="#4A7A58"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3 9 17 -5"
      />
      <path
        stroke="#4A7A58"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.5 5.5v12"
      />
      <path
        stroke="#4A7A58"
        strokeLinejoin="round"
        d="M4.5 8.59998V14.5"
      />
      <path
        stroke="#4A7A58"
        strokeLinejoin="round"
        d="M18.5 4.40002V10.5"
      />
      <path
        stroke="#4A7A58"
        strokeLinejoin="round"
        d="m4.5 17 -4 -2.5h8l-4 2.5Z"
      />
      <path
        stroke="#4A7A58"
        strokeLinejoin="round"
        d="m18.5 13 -4 -2.5h8l-4 2.5Z"
      />
      <path
        stroke="#4A7A58"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 20.5h-8l-0.5 3h9l-0.5 -3Z"
      />
      <path
        stroke="#4A7A58"
        strokeLinejoin="round"
        d="M9.5 20.5v-2l2 -1 2 1v2"
      />
      <path
        stroke="#4A7A58"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.5 5.5 10 4 11.5 0.5 13 4l-1.5 1.5Z"
      />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        fill="#1e2422"
        d="m21.5 18 -10 5.5 -10 -5.5V7l10 -5.5 10 5.5v11Z"
      />
      <path
        fill="#D4EEDA"
        d="M19.385 16.663 11.5 21l-7.885 -4.337L1.5 18l10 5.5 10 -5.5 -2.115 -1.337Z"
      />
      <path
        stroke="#4A7A58"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 12.5H5L6.5 10l2 6.5 2 -10.5L13 19l2 -9 1.5 6 1.5 -3.5h1.5"
      />
      <path
        stroke="#4A7A58"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21.5 18 -10 5.5 -10 -5.5V7l10 -5.5 10 5.5v11Z"
      />
    </svg>
  );
}

export default function ChangingGameSection({ backgroundUrl }: { backgroundUrl?: string }) {
  return (
    <section className="relative bg-sgwx-bg-alt py-20 md:py-32">
      {backgroundUrl && <SectionBackground src={backgroundUrl} />}
      <Container>
        <AnimatedSection>
          <SectionHeading heading="The Rules Are Changing. Tilt Them In Your Favor." size="display" />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <Card>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-sgwx-green/20 bg-sgwx-green/10">
                <ScaleIcon />
              </div>
              <h3 className="text-lg font-semibold text-sgwx-text">
                Brands have been stuck choosing between two extremes.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                A traditional agency weighed down by static layers. Or a loose
                collection of freelancers who are never quite on the same page.
              </p>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.18}>
            <Card>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-sgwx-green/20 bg-sgwx-green/10">
                <WaveIcon />
              </div>
              <h3 className="text-lg font-semibold text-sgwx-text">
                The market moves too fast for the first option. Your needs are
                too important for the second.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">
                Technology isn&apos;t the strategy. People are. The best teams
                understand which tools elevate the work.
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
