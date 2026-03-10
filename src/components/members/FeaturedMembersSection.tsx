import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FeaturedMemberCard from "./FeaturedMemberCard";
import type { FeaturedMember } from "./FeaturedMemberCard";

interface FeaturedMembersSectionProps {
  members: FeaturedMember[];
}

export default function FeaturedMembersSection({ members }: FeaturedMembersSectionProps) {
  return (
    <section className="bg-sgwx-bg-alt py-16 md:py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Featured Members"
            heading="Meet a Few of Our Lead Characters."
            size="medium"
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {members.map((member, i) => (
            <AnimatedSection key={member.name} delay={0.1 + i * 0.08}>
              <FeaturedMemberCard member={member} />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
