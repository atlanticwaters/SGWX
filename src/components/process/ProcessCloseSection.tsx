import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ProcessCloseSectionProps {
  heading?: string;
  body?: string;
  cta?: { label: string; href: string };
}

export default function ProcessCloseSection({ heading, body, cta }: ProcessCloseSectionProps) {
  return (
    <section className="bg-sgwx-bg-alt py-24 md:py-32">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-normal tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
              {heading ?? "From clarity to momentum, without friction."}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-sgwx-text-muted md:text-xl">
              {body ?? "The goal isn\u2019t just to finish the work. It\u2019s to leave you better equipped for what comes next."}
            </p>
            <div className="mt-10">
              <Button href={cta?.href ?? "/contact"}>
                {cta?.label ?? "Activate Your Team"}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
