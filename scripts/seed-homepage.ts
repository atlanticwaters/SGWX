/**
 * Seed the Sanity homepage document with the hard-coded content
 * from the React components.
 *
 * Usage: npx tsx scripts/seed-homepage.ts
 */

import { createClient } from "next-sanity";
import { config } from "dotenv";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-25",
  token,
  useCdn: false,
});

const homepageDoc = {
  _id: "homepage",
  _type: "homepage",

  // ── Hero ───────────────────────────────────────────────
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

  // ── Changing Game ──────────────────────────────────────
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

  // ── Comparison Table ───────────────────────────────────
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

  // ── Client Segments ────────────────────────────────────
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

  // ── Experts ────────────────────────────────────────────
  expertsEyebrow: "The Collective",
  expertsHeading: "Hand-Picked Experts",
  expertsSubheading:
    "We assemble expert teams for the challenge at hand.",

  // ── Process ────────────────────────────────────────────
  processEyebrow: "Our Process",
  processHeading: "The Growth Sequence",
  processSubheading:
    "Smart content + experiences built for every stage of your brand\u2019s evolution.",
  processStages: [
    {
      _key: "stage1",
      number: "01",
      title: "Immersion & Brief",
      id: "immersion",
      description:
        "We define the problem, align on goals, and set success markers.",
      output: "Mission Brief",
      accent: "green",
    },
    {
      _key: "stage2",
      number: "02",
      title: "Build The Team",
      id: "build-team",
      description:
        "We assemble the right mix of seasoned talent for category expertise.",
      output: "Purpose Built Team",
      accent: "cyan",
    },
    {
      _key: "stage3",
      number: "03",
      title: "Shape The Direction",
      id: "shape-direction",
      description:
        "We convert the brief into clear avenues for strategic and creative exploration.",
      output: "Strategic Roadmap",
      accent: "green",
    },
    {
      _key: "stage4",
      number: "04",
      title: "Create & Refine",
      id: "create-refine",
      description:
        "Work unfolds in focused sprints. Strategy, creative, and production operate as one.",
      output: "Accelerated Progress",
      accent: "cyan",
    },
    {
      _key: "stage5",
      number: "05",
      title: "Capture Learnings",
      id: "capture-learnings",
      description:
        "Insights, decisions, and learnings inform the work now and the work to come.",
      output: "Shared Knowledge",
      accent: "green",
    },
    {
      _key: "stage6",
      number: "06",
      title: "Evolve & Scale",
      id: "evolve-scale",
      description:
        "Leadership stays consistent. Specialists come in as needed. You get continuity without long-term overhead.",
      output: "Sustained Momentum",
      accent: "cyan",
    },
  ],
  processFooterLink: {
    _type: "callToAction",
    label: "Explore the full sequence",
    href: "/process",
    variant: "ghost",
  },

  // ── Impact / Case Studies ──────────────────────────────
  impactEyebrow: "Impact",
  impactHeading: "The Work Speaks",
  caseStudyDisplayCount: 4,
  logoWallHeading: "Trusted by ambitious brands and global leaders",

  // ── Spotlights ─────────────────────────────────────────
  spotlightsEyebrow: "Spotlights",
  spotlightsHeading:
    "Every project is an opportunity to push boundaries, challenge conventions, and make a mark.",
  spotlightsCta: {
    _type: "callToAction",
    label: "More Spotlights",
    href: "/spotlights",
    variant: "secondary",
  },

  // ── Final CTA ──────────────────────────────────────────
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

  // ── SEO ────────────────────────────────────────────────
  seo: {
    _type: "seo",
    title: "Sageworx — Go Further. Faster.",
    description:
      "Bespoke marketing and creative teams. Senior specialists, zero bloat.",
  },
};

async function main() {
  console.log("Checking for existing homepage document...");
  const existing = await client.fetch(
    `*[_type == "homepage" && _id == "homepage"][0] { _id, _rev }`
  );

  if (existing) {
    console.log(`Found existing homepage document (rev: ${existing._rev})`);
    console.log("Updating with createOrReplace...");
  } else {
    console.log("No existing homepage document found. Creating...");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await client.createOrReplace(homepageDoc as any);
  console.log(`Homepage document seeded successfully! (id: ${result._id})`);
}

main().catch((err) => {
  console.error("Failed to seed homepage:", err);
  process.exit(1);
});
