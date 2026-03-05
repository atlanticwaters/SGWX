import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const homepage = {
  _id: "homepage",
  _type: "homepage",

  // ── Hero ─────────────────────────────────────────────────
  heroHeading: "Go Further. Faster.",
  heroParagraph1:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts.",
  heroParagraph2:
    "No agency bloat. No freelancer roulette. Just proven pros, ready to work.",
  heroPrimaryCta: {
    _type: "callToAction",
    label: "How We Roll",
    href: "/model",
    variant: "primary",
  },
  heroSecondaryCta: {
    _type: "callToAction",
    label: "Let\u2019s Chat",
    href: "/contact",
    variant: "secondary",
  },

  // ── Changing Game ────────────────────────────────────────
  changingGameHeading: "The Rules Are Changing. Tilt Them In Your Favor.",
  changingGameCards: [
    {
      _key: "card1",
      heading: "Brands have been stuck choosing between two extremes.",
      body: "A traditional agency weighed down by static layers. Or a loose collection of freelancers who are never quite on the same page.",
    },
    {
      _key: "card2",
      heading:
        "The market moves too fast for the first option. Your needs are too important for the second.",
      body: "Technology isn\u2019t the strategy. People are. The best teams understand which tools elevate the work.",
    },
  ],

  // ── Comparison Table ─────────────────────────────────────
  comparisonEyebrow: "The Model Makes a Difference",
  comparisonHeading: "Why Sageworx?",
  comparisonColumns: {
    criteria: "Criteria",
    agency: "Traditional Agency",
    freelance: "Freelance Marketplace",
    sageworx: "Sageworx Protocol",
  },
  comparisonRows: [
    {
      _key: "row1",
      _type: "comparisonRow",
      criteria: "The Talent",
      traditional: "Junior-heavy. You fund the learning curve.",
      freelancers: "Hit-or-miss. A reset every time.",
      sageworx: "Senior specialists with category fluency.",
    },
    {
      _key: "row2",
      _type: "comparisonRow",
      criteria: "The Workflow",
      traditional: "Long onboarding. Longer timelines.",
      freelancers: "Quick kickoff. Constant realignment.",
      sageworx: "Clean start with no churn.",
    },
    {
      _key: "row3",
      _type: "comparisonRow",
      criteria: "The Cost",
      traditional: "High overhead. Hidden fees.",
      freelancers: "Unpredictable commitment and constant training.",
      sageworx: "Lean by design. Zero budget bloat.",
    },
  ],
  comparisonCta: {
    _type: "callToAction",
    label: "Explore Our Model",
    href: "/model",
    variant: "primary",
  },

  // ── Client Segments ──────────────────────────────────────
  clientsEyebrow: "Who We Serve",
  clientsHeading: "Curated Partners For Your Business",
  clientSegments: [
    {
      _key: "seg1",
      type: "Challenger Brands",
      painPoint:
        "Approval loops slow you down. Big agencies deliver decks instead of progress.",
      solution:
        "We clear the path and get to execution, quickly and thoughtfully.",
    },
    {
      _key: "seg2",
      type: "Niche Agencies",
      painPoint:
        "A client needs something outside your wheelhouse. You either scramble or say no.",
      solution:
        "Expand your capabilities with fractional specialists, not added overhead.",
    },
    {
      _key: "seg3",
      type: "Startups",
      painPoint: "Burn rate matters. Big hires come with big risks.",
      solution: "Senior leadership that scales as needed.",
    },
  ],

  // ── Experts ──────────────────────────────────────────────
  expertsEyebrow: "The Collective",
  expertsHeading: "Hand-Picked Experts",
  expertsSubheading: "We assemble expert teams for the challenge at hand.",

  // ── Process ──────────────────────────────────────────────
  processEyebrow: "Our Process",
  processHeading: "The Growth Sequence",
  processSubheading:
    "Smart content + experiences built for every stage of your brand\u2019s evolution.",
  processStages: [
    {
      _key: "stage1",
      number: "01",
      title: "Launch",
      id: "launch",
      description:
        "Brand foundation + market entry. Strategic and visual infrastructure to compete from day one.",
      accent: "green",
    },
    {
      _key: "stage2",
      number: "02",
      title: "Engage",
      id: "engage",
      description:
        "Content + experiences that connect. Campaigns, video, interactive \u2014 the work that moves people to act.",
      accent: "cyan",
    },
    {
      _key: "stage3",
      number: "03",
      title: "Mobilize",
      id: "mobilize",
      description:
        "Building communities + amplifying reach. Turning customers into advocates and audiences into movements.",
      accent: "green",
    },
    {
      _key: "stage4",
      number: "04",
      title: "Transform",
      id: "transform",
      description:
        "Internal alignment + organizational evolution. When the mission shifts to culture, we engineer the change.",
      accent: "cyan",
    },
  ],
  processFooterLink: {
    _type: "callToAction",
    label: "Explore the full sequence",
    href: "/process",
    variant: "ghost",
  },

  // ── Impact ───────────────────────────────────────────────
  impactEyebrow: "Case Studies",
  impactHeading: "Making An Impact",
  logoWallHeading: "Trusted by ambitious brands and global leaders",
  logos: [
    { _type: "string", _key: "l1", value: "Google" },
    { _type: "string", _key: "l2", value: "Spotify" },
    { _type: "string", _key: "l3", value: "Nike" },
    { _type: "string", _key: "l4", value: "Polestar" },
    { _type: "string", _key: "l5", value: "Airbnb" },
    { _type: "string", _key: "l6", value: "Linear" },
    { _type: "string", _key: "l7", value: "Vercel" },
  ],

  // ── Spotlights ───────────────────────────────────────────
  spotlightsEyebrow: "Spotlights",
  spotlightsHeading:
    "Every project is an opportunity to push boundaries, challenge conventions, and make a mark.",
  spotlightsCta: {
    _type: "callToAction",
    label: "More Spotlights",
    href: "/spotlights",
    variant: "secondary",
  },

  // ── Final CTA ────────────────────────────────────────────
  finalCtaHeading: "Ready to move forward faster?",
  finalCtaPrimaryCta: {
    _type: "callToAction",
    label: "Activate Your Team",
    href: "/contact",
    variant: "primary",
  },
  finalCtaSecondaryCta: {
    _type: "callToAction",
    label: "Meet Our Members",
    href: "/members",
    variant: "secondary",
  },
};

async function seed() {
  console.log("Seeding homepage document...");
  await client.createOrReplace(homepage);
  console.log("Homepage seeded successfully!");
}

seed().catch(console.error);
