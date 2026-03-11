"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { LandingPageDetail, CaseStudyListItem } from "@/lib/sanity/queries";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const SERVICES = [
  { title: "Brand Strategy", desc: "Position, message, and differentiate your brand in a crowded market." },
  { title: "Content & Creative", desc: "Campaigns, assets, and storytelling that move people to act." },
  { title: "Digital Experience", desc: "Websites, apps, and platforms built for conversion and scale." },
  { title: "Growth Marketing", desc: "Data-driven acquisition, retention, and lifecycle marketing." },
  { title: "Research & Insights", desc: "Customer research, competitive analysis, and market intelligence." },
  { title: "Production & Operations", desc: "Efficient workflows, tooling, and delivery at scale." },
];

const COMPARISON = [
  { criteria: "Team seniority", traditional: "Junior-heavy", freelancers: "Varies", sageworx: "100% Senior" },
  { criteria: "Ramp time", traditional: "4-8 weeks", freelancers: "1-2 weeks", sageworx: "Days" },
  { criteria: "Team continuity", traditional: "Low", freelancers: "None", sageworx: "High" },
  { criteria: "Overhead cost", traditional: "High", freelancers: "Low", sageworx: "Moderate" },
  { criteria: "Strategic depth", traditional: "Siloed", freelancers: "Limited", sageworx: "Integrated" },
];

interface ServicesShowcaseTemplateProps {
  page: LandingPageDetail;
  caseStudies: CaseStudyListItem[];
}

export default function ServicesShowcaseTemplate({ page, caseStudies }: ServicesShowcaseTemplateProps) {
  const heading = page.heroHeading || "Full-Service, Senior-Led, Built to Deliver";
  const subheading = page.heroSubheading || "The services you need, the talent you deserve.";

  return (
    <div className="bg-sgwx-bg">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sgwx-teal/5 via-transparent to-sgwx-green/5" />
        <Container>
          <motion.div className="max-w-3xl" {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            {page.clientName && (
              <p className="mb-4 font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
                Services for {page.clientName}
              </p>
            )}
            <h1 className="text-5xl font-thin tracking-tight text-sgwx-text md:text-6xl">
              {heading}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted">
              {subheading}
            </p>
            <div className="mt-10">
              <Button href={page.ctaHref || "/contact"}>
                {page.ctaLabel || "Let's Talk"}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
              Capabilities
            </p>
            <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
              What We Bring
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((svc) => (
                <Card key={svc.title}>
                  <h3 className="text-lg font-semibold text-sgwx-text">{svc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sgwx-text-muted">{svc.desc}</p>
                </Card>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <p className="font-mono text-[14px] tracking-widest uppercase text-sgwx-green">
              Why Sageworx
            </p>
            <h2 className="mt-2 text-3xl font-thin tracking-tight text-sgwx-text">
              How We Compare
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sgwx-border text-left">
                    <th className="py-3 pr-6 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">Criteria</th>
                    <th className="py-3 pr-6 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">Traditional Agency</th>
                    <th className="py-3 pr-6 font-mono text-[14px] tracking-widest uppercase text-sgwx-text-dim">Freelancers</th>
                    <th className="py-3 font-mono text-[14px] tracking-widest uppercase text-sgwx-green">Sageworx</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.criteria} className="border-b border-sgwx-border-subtle">
                      <td className="py-3 pr-6 text-sgwx-text">{row.criteria}</td>
                      <td className="py-3 pr-6 text-sgwx-text-muted">{row.traditional}</td>
                      <td className="py-3 pr-6 text-sgwx-text-muted">{row.freelancers}</td>
                      <td className="py-3 font-medium text-sgwx-green">{row.sageworx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-sgwx-border py-20">
        <Container>
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl font-thin tracking-tight text-sgwx-text md:text-4xl">
                Ready to see the difference?
              </h2>
              <div className="mt-8">
                <Button href={page.ctaHref || "/contact"}>
                  {page.ctaLabel || "Let's Talk"}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
}
