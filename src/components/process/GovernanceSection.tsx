import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/ui/AnimatedSection";

const defaultBullets = [
  "Sageworx contracts, insures, and stands behind the work; our members are vetted, contracted, and governed under a single engagement.",
  "AI is used to accelerate early drafts and analysis; judgment, direction, and final decisions remain human-led.",
  "We do not train models on proprietary client data, and we follow client-specific security and compliance requirements. AI tools are applied in a controlled, task-specific manner, aligned to each client\u2019s legal, security, and regulatory standards, with clear boundaries around data handling, access, and usage throughout the engagement.",
  "You pay for active senior expertise\u2014not bench time, training, or layers.",
];

interface GovernanceSectionProps {
  eyebrow?: string;
  heading?: string;
  bullets?: string[];
}

export default function GovernanceSection({ eyebrow, heading, bullets }: GovernanceSectionProps) {
  const items = bullets ?? defaultBullets;

  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow ?? "Governance & Risk"}
            heading={heading ?? "Built for Real-World Constraints"}
            align="right"
          />
        </AnimatedSection>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {items.map((item, i) => (
            <AnimatedSection key={i} delay={0.1 + i * 0.08}>
              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-sgwx-green"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 2L3 6v6c0 4.5 3 7 7 10 4-3 7-5.5 7-10V6l-7-4z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 10l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-sm leading-relaxed text-sgwx-text-muted">
                    {item}
                  </p>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
