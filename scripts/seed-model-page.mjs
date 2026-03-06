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

const modelPage = {
  _id: "modelPage",
  _type: "modelPage",

  // ── Hero ─────────────────────────────────────────────────
  heroEyebrow: "The right team, ready from day one.",
  heroHeading: "Stop Resetting. Start Building.",
  heroBody:
    "The Sageworx model brings together senior, bespoke teams who already know how to work together. We skip the learning curve and get right to the work, delivering continuity and momentum without the overhead of a traditional agency.",
  heroPrimaryCta: {
    _type: "callToAction",
    label: "Get Started",
    href: "/contact",
    variant: "primary",
  },
  heroSecondaryCta: {
    _type: "callToAction",
    label: "See Our Work",
    href: "/work",
    variant: "secondary",
  },

  // ── Right Team ───────────────────────────────────────────
  rightTeamEyebrow: "The Right Team",
  rightTeamHeading: "The Right Team Makes All the Difference.",
  rightTeamParagraphs: [
    {
      _key: "rt-p1",
      _type: "text",
      // Sanity stores array-of-text items as plain strings
    },
  ],
  // Replace with plain strings for array of text
};

// Sanity array of `text` are just strings with _key
const modelPageData = {
  _id: "modelPage",
  _type: "modelPage",

  heroEyebrow: "The right team, ready from day one.",
  heroHeading: "Stop Resetting. Start Building.",
  heroBody:
    "The Sageworx model brings together senior, bespoke teams who already know how to work together. We skip the learning curve and get right to the work, delivering continuity and momentum without the overhead of a traditional agency.",
  heroPrimaryCta: {
    _type: "callToAction",
    label: "Get Started",
    href: "/contact",
    variant: "primary",
  },
  heroSecondaryCta: {
    _type: "callToAction",
    label: "See Our Work",
    href: "/work",
    variant: "secondary",
  },

  rightTeamEyebrow: "The Right Team",
  rightTeamHeading: "The Right Team Makes All the Difference.",
  rightTeamParagraphs: [
    "You\u2019ve felt the friction of a team that isn\u2019t on the same page. The hit-or-miss results from a freelance marketplace. The junior-heavy agency that learns on your dime. Sageworx was built to fix that.",
    "We don\u2019t just bring together experts; we activate cohesive work teams. Specialists who know your industry, speak your language, and have a shared history of working together effectively. It\u2019s not just about the right skills, it\u2019s about the right team chemistry, ready to spark new ideas from the start.",
    "Our capabilities are organized to support you at every stage of growth.",
  ],

  capabilitiesEyebrow: "Capabilities",
  capabilitiesTabs: [
    {
      _key: "tab-launch",
      id: "launch",
      label: "Launch",
      items: [
        "Brand Strategy & Architecture",
        "Brand Identity & Visual Design",
        "Brand Positioning & Messaging",
        "Marketing Strategy & Planning",
        "Brand Messaging & Copywriting",
        "Product Launch & MVP Development",
      ],
    },
    {
      _key: "tab-engage",
      id: "engage",
      label: "Engage",
      items: [
        "Marketing Campaigns & Activation",
        "Content Marketing & Strategy",
        "Gamification & Interactive Experiences",
        "Experiential Marketing & Events",
        "Brand Activations",
        "Audience Engagement Strategies",
      ],
    },
    {
      _key: "tab-mobilize",
      id: "mobilize",
      label: "Mobilize",
      items: [
        "Community Building & Management",
        "Loyalty Programs & Membership Strategy",
        "Brand Ambassador Programs",
        "Influencer Marketing & Partnerships",
        "Creator & Content Partnerships",
        "Social Media & Digital Amplification",
      ],
    },
    {
      _key: "tab-transform",
      id: "transform",
      label: "Transform",
      items: [
        "Organizational Change & Alignment",
        "Sales Training & Sales Enablement",
        "Employee Engagement, Internal Events & Training Workshops",
        "AI Strategy & Marketing Automation",
      ],
    },
  ],

  microteamsEyebrow: "Microteams",
  microteamsHeading: "Small by Design. Senior by Default.",
  microteamsBody:
    "Our microteams are intentionally lean and deeply experienced. This isn\u2019t about saving money; it\u2019s about saving time and getting to better outcomes, faster. When every member of the team is a seasoned pro, you eliminate the endless review cycles and communication breakdowns that stifle creativity.",
  microteamsBullets: [
    "CMO-level perspective to guide the strategy",
    "Top-tier creative direction to elevate the work",
    "Executive Producer discipline to drive the execution",
  ],
  microteamsClosing:
    "You\u2019re not managing vendors. You\u2019re collaborating with a single, unified team that takes ownership of the outcomes.",

  momentumEyebrow: "Momentum",
  momentumHeading: "Built for Momentum.",
  momentumBody:
    "Speed is a byproduct of alignment, not the goal itself. Our model is designed to create and sustain momentum. By getting the right people in the room from the beginning, we eliminate the costly resets and circular debates that stall progress. The work doesn\u2019t just get done; it builds on itself.",
  momentumBullets: [
    "Strategic decisions stick",
    "Creative systems become reusable assets",
    "Every sprint delivers real, measurable progress",
  ],
  momentumClosing:
    "This is about moving forward with intention, so every step takes you further.",

  icpEyebrow: "Built for You",
  icpHeading: "One Model. Built for You.",
  icpSubheading:
    "The Sageworx model stays consistent. How we show up changes based upon you and your needs.",
  icpCards: [
    {
      _key: "icp-startups",
      badge: "For Startups",
      headline: "Burn Rate Matters. So Do Great Ideas.",
      body: "You don\u2019t need more headcount; you need access to senior leadership that can translate your vision into market traction. Sageworx provides the strategic and executional firepower to build your brand and drive growth, without the risk and cost of a full-time executive hire.",
    },
    {
      _key: "icp-smb",
      badge: "For Small to Midsize Brands",
      headline: "Tired of Decks Instead of Progress?",
      body: "Your internal marketing and creative teams are stretched thin, and big agencies are slowing you down with endless approval loops. Sageworx integrates directly into your workflow, breaking through bottlenecks and accelerating execution. We act as a seamless extension of your team, delivering the seasoned firepower you need to make an impact.",
      testimonialQuote:
        "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx is a smart, scalable way to solve complex problems without adding overhead.",
      testimonialAttribution: "Christi De Ved, VP of Marketing, EverPass Media",
    },
    {
      _key: "icp-agencies",
      badge: "For Agencies & In-House Creative Teams",
      headline: "Say \u2018Yes\u2019 to Bigger Opportunities.",
      body: "A client needs something outside your wheelhouse. Don\u2019t scramble or say no. Sageworx allows you to expand your capabilities with fractional specialists who plug directly into your process. We help you pitch, plan, and deliver, all while remaining as visible (or invisible) to the client as you would like us to be.",
      testimonialQuote:
        "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx gives us a smart, scalable way to solve complex problems without adding overhead.",
      testimonialAttribution: "Will Morel, Creative Producer, Invivo Brands",
    },
  ],

  continuityEyebrow: "Continuity",
  continuityHeading: "Flexibility Without the Friction.",
  continuityParagraphs: [
    "The best part of our model is that knowledge sticks around. Leadership remains consistent, so you\u2019re not re-explaining your business every few months. We develop a living brief, a cohesive external share drive, and a communication protocol that keeps all the notes locked in one secure spot. As your needs evolve, we rotate specialists in and out without losing context or momentum.",
    "You get the continuity of a core team with the flexibility of a network. No chaos, no churn, just sustained progress.",
  ],

  technologyEyebrow: "Technology",
  technologyHeading: "The Right Tools for the Job.",
  technologyParagraphs: [
    "Great talent uses the best tools. Our teams are fluent in the technology that matters, from AI-enhanced strategy, analytics and production to immersive experiential platforms.",
    "We believe technology is a powerful accelerator, but it\u2019s never the strategy itself. Our approach is simple: use technology to elevate the thinking, streamline the work, and deliver better results. Human judgment guides the way; technology helps us get there faster.",
  ],

  fitEyebrow: "Fit Check",
  fitHeading: "Let\u2019s Be Direct.",
  fitSubheading:
    "The Sageworx model works best when there\u2019s a true partnership. We\u2019re a strong fit if you value senior judgment, strategic clarity, and close collaboration.",
  fitGoodItems: [
    "Tired of managing a roster of disconnected freelancers",
    "Looking to scale your team\u2019s capabilities without adding headcount",
    "An agency needing to fill a capability gap for a key client",
    "Frustrated with the bloat and slow pace of traditional agencies",
  ],
  fitNotItems: [
    "Looking for the lowest-cost execution or junior support",
    "Expecting to fully outsource the work with minimal involvement",
    "Optimizing for sheer volume over strategic impact",
  ],
  fitClosing:
    "If you\u2019re looking for alignment, intentionality, and outcomes that last, we\u2019ll work extremely well together.",
  fitCtas: [
    {
      _key: "fit-cta1",
      _type: "callToAction",
      label: "Ready to Take Action?",
      href: "/contact",
      variant: "primary",
    },
    {
      _key: "fit-cta2",
      _type: "callToAction",
      label: "Check Out Our Work",
      href: "/work",
      variant: "secondary",
    },
    {
      _key: "fit-cta3",
      _type: "callToAction",
      label: "Meet Our Members",
      href: "/members",
      variant: "ghost",
    },
  ],

  seo: {
    _type: "seo",
    title: "Our Model",
    description:
      "Senior, bespoke teams who already know how to work together. The Sageworx model delivers continuity and momentum without the overhead of a traditional agency.",
  },
};

async function main() {
  console.log("Seeding model page...");
  await client.createOrReplace(modelPageData);
  console.log("Done! Model page seeded.");
}

main().catch(console.error);
