import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionBackground from "@/components/ui/SectionBackground";
import type { OverlayColor } from "@/components/ui/SectionBackground";
import FeaturedMemberCard from "./FeaturedMemberCard";
import type { FeaturedMember } from "./FeaturedMemberCard";

interface FeaturedMembersSectionProps {
  members: FeaturedMember[];
  backgroundUrl?: string;
  overlayColor?: string;
}

export default function FeaturedMembersSection({ members, backgroundUrl, overlayColor }: FeaturedMembersSectionProps) {
  return (
    <section className="relative overflow-hidden bg-sgwx-bg-alt py-16 md:py-24">
      {backgroundUrl && <SectionBackground src={backgroundUrl} overlayColor={overlayColor as OverlayColor} />}
      <Container>
        <AnimatedSection>
          <SectionHeading
            eyebrow="Featured Members"
            heading="Meet a Few of Our Lead Characters."
            size="medium"
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
