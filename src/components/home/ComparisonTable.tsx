import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

const DEFAULT_ROWS = [
  {
    criteria: "The Talent",
    traditional: "Junior-heavy. You fund the learning curve.",
    freelancers: "Hit-or-miss. A reset every time.",
    sageworx: "Senior specialists with category fluency.",
  },
  {
    criteria: "The Workflow",
    traditional: "Long onboarding. Longer timelines.",
    freelancers: "Quick kickoff. Constant realignment.",
    sageworx: "Clean start with no churn.",
  },
  {
    criteria: "The Cost",
    traditional: "High overhead. Hidden fees.",
    freelancers: "Unpredictable commitment and constant training.",
    sageworx: "Lean by design. Zero budget bloat.",
  },
];

const DEFAULT_COLUMNS = {
  criteria: "Criteria",
  agency: "Traditional Agency",
  freelance: "Freelance Marketplace",
  sageworx: "Sageworx Protocol",
};

interface ComparisonTableProps {
  eyebrow?: string;
  heading?: string;
  columns?: { criteria: string; agency: string; freelance: string; sageworx: string };
  rows?: { criteria: string; traditional: string; freelancers: string; sageworx: string }[];
  cta?: { label: string; href: string };
}

export default function ComparisonTable({
  eyebrow = "The Model Makes a Difference",
  heading = "Why Sageworx?",
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  cta = { label: "Explore Our Model", href: "/model" },
}: ComparisonTableProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            align="right"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-sgwx-border">
              <caption className="sr-only">Comparison of Sageworx Protocol vs Traditional Agency and Freelance Marketplace</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-widest text-sgwx-text">
                    {columns.criteria}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-widest text-sgwx-text">
                    {columns.agency}
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-widest text-sgwx-text">
                    {columns.freelance}
                  </th>
                  <th scope="col" className="border-t-2 border-sgwx-green bg-sgwx-highlight-col px-6 py-4 text-left text-sm font-bold uppercase tracking-widest text-sgwx-green">
                    {columns.sageworx}
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
                      {row.traditional}
                    </td>
                    <td className="px-6 py-5 text-sm text-sgwx-text-muted">
                      {row.freelancers}
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
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
