import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FeaturedMemberCard from "./FeaturedMemberCard";
import type { FeaturedMember } from "./FeaturedMemberCard";

const members: FeaturedMember[] = [
  {
    name: "Sara Ann MacFarlane",
    title: "Behavioral Scientist | Research Director | Campaign Strategist",
    mantra: "Let the problem inform the solution.",
    bio: "Sara is a behavioral scientist who sees the world through a unique lens, combining psychology, economics, and art to understand the beautiful complexity of human behavior. With over 15 years in research and marketing, she has a rare talent for translating big-picture findings into actionable brand strategies.",
    favoriteTools:
      "A well-designed mixed methodology study, a collaborative Miro board, and a healthy dose of intellectual curiosity.",
    linkText: "Dive Deeper into Sara\u2019s Human-Centered Approach",
    linkHref: "#",
    initials: "SM",
  },
  {
    name: "Ann Marie Almariei (AMA)",
    title: "Content Creator | Creative Director | Vibe Marketer",
    mantra:
      "Adaptation at any stage of a company\u2019s development takes commitment.",
    bio: "AMA operates at the intersection of web2, web3, and AI-enhanced marketing. With deep experience across creative direction, community growth, and content strategy for video and social, she brings a rare, hands-on perspective to emerging digital ecosystems.",
    favoriteTools:
      "A deep understanding of community dynamics, a wallet full of NFTs, and the courage to be an early adopter.",
    linkText: "Hear AMA\u2019s Latest AI Findings & Discoveries",
    linkHref: "#",
    initials: "AMA",
  },
  {
    name: "James Petrossi",
    title: "Brand Strategist | Transformation Leader | Cultural Activist",
    mantra: "Create a more consciously connected world.",
    bio: "James has built his career on a simple but powerful idea: transforming how people connect\u2014with their work, with each other, and with brands. As the founder of PTNL, he helps companies transcend the chaos and evolve their culture with purpose.",
    favoriteTools:
      "Insightful questions, a well-facilitated workshop, and the willingness to have a courageous conversation.",
    linkText: "Listen To James Discuss Philosophy With Marketing Leaders",
    linkHref: "#",
    initials: "JP",
  },
  {
    name: "Andrew Waters",
    title: "Photographer | Art Director | AI Engineer",
    mantra:
      "The perfect shot and the perfect user experience have one thing in common: a relentless pursuit of the details.",
    bio: "Andrew is an adrenaline junkie with a penchant for sharp turns, steep drops, and snapping the perfect action shot. With over 20 years of experience, he\u2019s the award-winning creative who has led identity and web design for giants like Turner Sports and Warner Media.",
    favoriteTools:
      "A well-worn camera, a clean design system, and a powerful new AI model to push creative boundaries.",
    linkText: "View Andrew\u2019s Action-Packed Portfolio",
    linkHref: "#",
    initials: "AW",
  },
];

export default function FeaturedMembersSection() {
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
