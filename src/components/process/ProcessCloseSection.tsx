import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ProcessCloseSection() {
  return (
    <section className="bg-sgwx-bg-alt py-24 md:py-32">
      <Container>
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-normal tracking-tight text-sgwx-text md:text-4xl lg:text-5xl">
              From clarity to momentum, without friction.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-sgwx-text-muted md:text-xl">
              The goal isn&apos;t just to finish the work. It&apos;s to leave
              you better equipped for what comes next.
            </p>
            <div className="mt-10">
              <Button href="/contact">Activate Your Team</Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
