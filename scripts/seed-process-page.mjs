import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const processPageData = {
  _id: "processPage",
  _type: "processPage",

  // ── Hero ─────────────────────────────────────────────────
  heroEyebrow: "The Growth Sequence",
  heroHeading: "Smart Content + Experiences",
  heroBody:
    "The ultimate growth partner — built for every stage of your brand's evolution.",

  // ── Stages ───────────────────────────────────────────────
  stages: [
    {
      _key: "stage-launch",
      id: "launch",
      number: "01",
      name: "Launch",
      accent: "green",
      focus:
        "Brand foundation + market entry. Positioning, messaging, identity, strategy — the elements that define how you show up and why it matters.",
      services: [
        "brand architecture",
        "visual identity systems",
        "positioning strategy",
        "marketing roadmaps",
        "messaging",
        "MVPs",
      ],
      proof: {
        client: "EverPass Media — NFL Sunday Ticket®",
        description:
          "Redesigned the brand + product identity for the commercial streaming market. New logo system, go-to-market strategy, full visual language.",
        result: "Brand launch across B2B streaming vertical",
      },
      glowPosition: "bottom-right",
      deepFieldVariant: 1,
    },
    {
      _key: "stage-engage",
      id: "engage",
      number: "02",
      name: "Engage",
      accent: "cyan",
      focus:
        "Creating content + experiences that connect. Campaigns, video, interactive, experiential — the work that moves people to act.",
      services: [
        "campaigns",
        "content",
        "games",
        "experiences",
        "activations",
        "engagement",
      ],
      proof: {
        client: "JULABO USA — One Degree Can Change Everything",
        description:
          "Cinematic video campaign fusing AI-enhanced visuals with human storytelling for aerospace + defense audiences.",
        result: "Scalable brand content system for B2B tech",
      },
      glowPosition: "top-left",
      deepFieldVariant: 3,
    },
    {
      _key: "stage-mobilize",
      id: "mobilize",
      number: "03",
      name: "Mobilize",
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
        client: "Dr. Squatch — Sydney Sweeney's Bathwater Bliss",
        description:
          "5,000-bar limited drop with influencer activation, creator content strategy + managed legal/reputational risk.",
        result: "Sold out instantly · Trended across social · Late-night mentions",
      },
      glowPosition: "right-center",
      deepFieldVariant: 5,
    },
    {
      _key: "stage-transform",
      id: "transform",
      number: "04",
      name: "Transform",
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
        client: "Mindstrong — Corporate Summit",
        description:
          "Designed + produced an in-person summit for a distributed healthcare/tech company rebuilding connection post-pandemic.",
        result: "91% satisfaction · 95% connection score (vs 55% pre-summit)",
      },
      glowPosition: "bottom-left",
      deepFieldVariant: 6,
    },
  ],

  // ── Six Steps ────────────────────────────────────────────
  sixStepsEyebrow: "The Process",
  sixStepsHeading: "Six Steps. No Wasted Motion.",
  sixStepsItems: [
    {
      _key: "step-01",
      num: "01",
      title: "Immersion & Brief",
      whatsHappening:
        "The problem is pressure-tested, constraints are surfaced early, and success markers are agreed upon.",
      whyItMatters: "Most wasted spend traces back to a weak brief.",
      whatYouGet:
        "A living Project Brief that aligns teams, leadership, and execution from day one. The north star for the engagement—defining targets, constraints, and success markers at launch. Revisited at every stage to course-correct, validate progress against real-world signals, and adapt intelligently as conditions change without losing sight of the objective.",
    },
    {
      _key: "step-02",
      num: "02",
      title: "Curating The Team",
      whatsHappening:
        "A purpose-built team is assembled based on category fluency and role fit—not availability.",
      whyItMatters: "Teams win projects, not logos.",
      whatYouGet:
        "A category-fluent team ready to work immediately. An M-shaped team that can orient quickly, challenge assumptions, and move into execution without a learning curve—aligned to the brief, fluent in your space, and ready to contribute from day one.",
    },
    {
      _key: "step-03",
      num: "03",
      title: "Shaping The Direction",
      whatsHappening:
        "Insights are converted into clear strategic and creative lanes before production begins.",
      whyItMatters: "Speed without direction is just motion.",
      whatYouGet:
        "A strategic roadmap that guides execution. A clear set of strategic and creative lanes tied directly to the Project Brief—outlining priorities, tradeoffs, and sequencing so teams can move forward with confidence, make faster decisions, and stay aligned as the work accelerates.",
    },
    {
      _key: "step-04",
      num: "04",
      title: "Creation & Refinement",
      whatsHappening:
        "Work unfolds in focused sprints where strategy, creative, and production operate as one.",
      whyItMatters: "Momentum compounds when teams move together.",
      whatYouGet:
        "Accelerated progress without surprise pivots. A disciplined sprint rhythm anchored to the Project Brief, where work is reviewed against targets in real time, assumptions are tested early, and adjustments are made deliberately—keeping momentum high while avoiding late-stage corrections or wasted effort.",
    },
    {
      _key: "step-05",
      num: "05",
      title: "Capturing Key Learnings",
      whatsHappening:
        "Decisions, insights, and learnings are captured as the work unfolds.",
      whyItMatters: "Most teams relearn the same lessons repeatedly.",
      whatYouGet:
        "A shared intelligence library that strengthens future work. A durable record of decisions, insights, and performance signals tied back to the Project Brief—so future initiatives start smarter, move faster, and build on what actually happened, not what was assumed.",
    },
    {
      _key: "step-06",
      num: "06",
      title: "Evolution & Scale",
      whatsHappening:
        "Leadership remains consistent while specialists rotate in as needed.",
      whyItMatters: "Growth shouldn't require reinvention every quarter.",
      whatYouGet:
        "Sustained momentum without long-term overhead. A durable operating rhythm where leadership continuity preserves context, M-shaped specialists plug in as needed, and the Project Brief evolves into a living reference—allowing you to scale effort up or down while staying aligned to real goals, real performance, and what comes next.",
    },
  ],

  // ── Principles ───────────────────────────────────────────
  principlesEyebrow: "Principles",
  principlesHeading: "Designed to Move You Forward. Faster.",
  principlesSubheading:
    "Our process and systems are designed for work without the re-work. Strategy, creative, and production aligned early. Fewer handoffs. Decisions and learnings are documented to reduce rework and repeat spend.",
  principlesCards: [
    {
      _key: "principle-m-shaped",
      badge: "M-Shaped Talent",
      title: "Built Around M-Shaped Senior Talent",
      paragraphs: [
        "Our members average 15–20 years in their discipline, with agency and in-house leadership backgrounds—and the range to operate confidently beyond a single specialty.",
        "Deep expertise where it matters most, with meaningful fluency across adjacent disciplines. Our teams think beyond single roles—connecting strategy, creative, technology, and production from day one.",
        "M-shaped talent means you're not just hiring for one lane. You're gaining leaders who can go deep, see around corners, and collaborate across the full scope of the work.",
      ],
    },
    {
      _key: "principle-flex",
      badge: "Flex Structure",
      title: "Structured to Flex",
      paragraphs: [
        "Leadership stays consistent, providing continuity, context, and accountability throughout the engagement. Specialists rotate in as needed based on the work—not org charts—allowing the team to flex without friction. Scope adapts as priorities evolve, without resetting momentum or re-onboarding a new group.",
      ],
    },
  ],

  // ── Governance ───────────────────────────────────────────
  governanceEyebrow: "Governance & Risk",
  governanceHeading: "Built for Real-World Constraints",
  governanceBullets: [
    "Sageworx contracts, insures, and stands behind the work; our members are vetted, contracted, and governed under a single engagement.",
    "AI is used to accelerate early drafts and analysis; judgment, direction, and final decisions remain human-led.",
    "We do not train models on proprietary client data, and we follow client-specific security and compliance requirements. AI tools are applied in a controlled, task-specific manner, aligned to each client's legal, security, and regulatory standards, with clear boundaries around data handling, access, and usage throughout the engagement.",
    "You pay for active senior expertise—not bench time, training, or layers.",
  ],

  // ── Fit Check ────────────────────────────────────────────
  fitEyebrow: "Fit Check",
  fitHeading: "Is This Right for You?",
  fitGoodItems: [
    "You need senior expertise without long-term overhead",
    "You value speed, clarity, and follow-through",
    "You want teams who integrate, not perform",
  ],
  fitNotItems: [
    "You're primarily looking for decks, frameworks, or performative deliverables rather than forward motion and real execution",
    "You require constant staffing changes, repeated onboarding, or junior-heavy teams that reset context and slow progress",
    "You're optimizing for optics, signaling, or internal theater over measurable outcomes and sustained momentum",
  ],

  // ── Closing ──────────────────────────────────────────────
  closingStageWords: [
    { _key: "word-launch", text: "launch", color: "text-sgwx-green" },
    { _key: "word-engage", text: "engage", color: "text-sgwx-cyan" },
    { _key: "word-mobilize", text: "mobilize", color: "text-sgwx-green" },
    { _key: "word-transform", text: "transform", color: "text-sgwx-cyan" },
  ],
  closingWordmark: "SAGEWORX",
  closingTagline: "Emerge. Engage. Evolve.",
  closingCta: {
    _type: "callToAction",
    label: "Activate Your Team",
    href: "/contact",
    variant: "primary",
  },

  // ── Close Section ────────────────────────────────────────
  closeHeading: "From clarity to momentum, without friction.",
  closeBody:
    "The goal isn't just to finish the work. It's to leave you better equipped for what comes next.",
  closeCta: {
    _type: "callToAction",
    label: "Activate Your Team",
    href: "/contact",
    variant: "primary",
  },

  // ── SEO ──────────────────────────────────────────────────
  seo: {
    _type: "seo",
    title: "Our Process",
    description:
      "The Growth Sequence — smart content + experiences built for every stage of your brand's evolution.",
  },
};

async function main() {
  console.log("Seeding process page...");
  await client.createOrReplace(processPageData);
  console.log("Done! Process page seeded.");
}

main().catch(console.error);
