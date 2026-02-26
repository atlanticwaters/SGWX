import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const rows = [
  {
    criteria: "The Talent",
    agency: "Junior-heavy. You fund the learning curve.",
    freelance: "Hit-or-miss. A reset every time.",
    sageworx: "Senior specialists with category fluency.",
  },
  {
    criteria: "The Workflow",
    agency: "Long onboarding. Longer timelines.",
    freelance: "Quick kickoff. Constant realignment.",
    sageworx: "Clean start with no churn.",
  },
  {
    criteria: "The Cost",
    agency: "High overhead. Hidden fees.",
    freelance: "Unpredictable commitment and constant training.",
    sageworx: "Lean by design. Zero budget bloat.",
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="The Model Makes a Difference"
            heading="Why Sageworx?"
            centered
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-sgwx-border">
              <caption className="sr-only">Comparison of Sageworx Protocol vs Traditional Agency and Freelance Marketplace</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-widest text-sgwx-text">
                    Criteria
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-widest text-sgwx-text">
                    Traditional Agency
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-widest text-sgwx-text">
                    Freelance Marketplace
                  </th>
                  <th scope="col" className="border-t-2 border-sgwx-green bg-sgwx-highlight-col px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-sgwx-green">
                    Sageworx Protocol
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.criteria} className="border-b border-sgwx-border-subtle">
                    <td className="px-6 py-5 text-sm font-medium text-sgwx-text-muted">
                      {row.criteria}
                    </td>
                    <td className="px-6 py-5 text-sm text-sgwx-text-muted">
                      {row.agency}
                    </td>
                    <td className="px-6 py-5 text-sm text-sgwx-text-muted">
                      {row.freelance}
                    </td>
                    <td className="bg-sgwx-highlight-col px-6 py-5 text-sm text-sgwx-text">
                      <span className="mr-2 text-sgwx-check">✓</span>
                      {row.sageworx}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="mt-10 text-center">
            <Button href="/model">Explore Our Model</Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
