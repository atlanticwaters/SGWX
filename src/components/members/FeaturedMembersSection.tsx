import Container from "@/components/ui/Container";
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
          <p className="mb-12 font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
            Featured Members
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
