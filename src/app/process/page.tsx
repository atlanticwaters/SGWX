import type { Metadata } from "next";
import ProcessHero from "@/components/process/ProcessHero";
import StageSection from "@/components/process/StageSection";
import type { StageData } from "@/components/process/StageSection";
import ProcessClosing from "@/components/process/ProcessClosing";
import ProgressBar from "@/components/process/ProgressBar";
import StageNav from "@/components/process/StageNav";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "The Growth Sequence — smart content + experiences built for every stage of your brand's evolution.",
};

const stages: StageData[] = [
  {
    id: "launch",
    number: "01",
    name: "launch",
    accent: "green",
    focus:
      "Brand foundation + market entry. We build the strategic and visual infrastructure that positions you to compete from day one.",
    services: [
      "brand architecture",
      "visual identity systems",
      "positioning strategy",
      "marketing roadmaps",
      "messaging",
      "MVPs",
    ],
    proof: {
      client: "EverPass Media \u2014 NFL Sunday Ticket\u00AE",
      description:
        "Redesigned the brand + product identity for the commercial streaming market. New logo system, go-to-market strategy, full visual language.",
      result: "Brand launch across B2B streaming vertical",
    },
    glowPosition: "bottom-right",
  },
  {
    id: "engage",
    number: "02",
    name: "engage",
    accent: "cyan",
    focus:
      "Creating content + experiences that connect. Campaigns, video, interactive, experiential \u2014 the work that moves people to act.",
    services: [
      "campaigns",
      "content",
      "games",
      "experiences",
      "activations",
      "engagement",
    ],
    proof: {
      client: "JULABO USA \u2014 One Degree Can Change Everything",
      description:
        "Cinematic video campaign fusing AI-enhanced visuals with human storytelling for aerospace + defense audiences.",
      result: "Scalable brand content system for B2B tech",
    },
    glowPosition: "top-left",
  },
  {
    id: "mobilize",
    number: "03",
    name: "mobilize",
    accent: "green",
    focus:
      "Building communities + amplifying reach. Turning customers into advocates and audiences into movements.",
    services: [
      "community growth",
      "membership + loyalty",
      "ambassadors",
      "influencers + KOLs",
      "creator partnerships",
      "amplification",
    ],
    proof: {
      client: "Dr. Squatch \u2014 Sydney Sweeney\u2019s Bathwater Bliss",
      description:
        "5,000-bar limited drop with influencer activation, creator content strategy + managed legal/reputational risk.",
      result:
        "Sold out instantly \u00B7 Trended across social \u00B7 Late-night mentions",
    },
    glowPosition: "right-center",
  },
  {
    id: "transform",
    number: "04",
    name: "transform",
    accent: "cyan",
    focus:
      "Internal alignment + organizational evolution. When the mission shifts from marketing to culture, we engineer the change.",
    services: [
      "transformation strategy",
      "organizational alignment",
      "cross-cultural adoption",
      "engagement initiatives",
      "celebratory moments",
      "generative AI + automation",
    ],
    proof: {
      client: "Mindstrong \u2014 Corporate Summit",
      description:
        "Designed + produced an in-person summit for a distributed healthcare/tech company rebuilding connection post-pandemic.",
      result: "91% satisfaction \u00B7 95% connection score (vs 55% pre-summit)",
    },
    glowPosition: "bottom-left",
  },
];

export default function ProcessPage() {
  return (
    <>
      <ProgressBar />
      <StageNav />
      <ProcessHero />
      {stages.map((stage) => (
        <StageSection key={stage.id} {...stage} />
      ))}
      <ProcessClosing />
    </>
  );
}
