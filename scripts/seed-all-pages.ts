/**
 * Seed ALL Sanity page documents with hard-coded content from components.
 * Uses createIfNotExists so existing documents are NOT overwritten.
 *
 * Usage: npx tsx scripts/seed-all-pages.ts
 */

import { createClient } from "next-sanity";
import { config } from "dotenv";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-25",
  token,
  useCdn: false,
});

// ═══════════════════════════════════════════════════════════════════════════
//  Helper: callToAction object
// ═══════════════════════════════════════════════════════════════════════════

function cta(
  label: string,
  href: string,
  variant: "primary" | "secondary" | "ghost" = "primary"
) {
  return { _type: "callToAction", label, href, variant };
}

// ═══════════════════════════════════════════════════════════════════════════
//  MODEL PAGE
// ═══════════════════════════════════════════════════════════════════════════

const modelPage = {
  _id: "modelPage",
  _type: "modelPage",

  // Hero
  heroEyebrow: "The right team, ready from day one.",
  heroHeading: "Stop Resetting. Start Building.",
  heroBody:
    "The Sageworx model brings together senior, bespoke teams who already know how to work together. We skip the learning curve and get right to the work, delivering continuity and momentum without the overhead of a traditional agency.",
  heroPrimaryCta: cta("Get Started", "/contact"),
  heroSecondaryCta: cta("See Our Work", "/work", "secondary"),

  // Right Team
  rightTeamEyebrow: "The Right Team",
  rightTeamHeading: "The Right Team Makes All the Difference.",
  rightTeamParagraphs: [
    {
      _key: "rt1",
      _type: "text",
      text: "You\u2019ve felt the friction of a team that isn\u2019t on the same page. The hit-or-miss results from a freelance marketplace. The junior-heavy agency that learns on your dime. Sageworx was built to fix that.",
    },
    {
      _key: "rt2",
      _type: "text",
      text: "We don\u2019t just bring together experts; we activate cohesive work teams. Specialists who know your industry, speak your language, and have a shared history of working together effectively. It\u2019s not just about the right skills, it\u2019s about the right team chemistry, ready to spark new ideas from the start.",
    },
    {
      _key: "rt3",
      _type: "text",
      text: "Our capabilities are organized to support you at every stage of growth.",
    },
  ],

  // Capabilities
  capabilitiesEyebrow: "Capabilities",
  capabilitiesTabs: [
    {
      _key: "tab-launch",
      id: "launch",
      label: "Launch",
      items: [
        { _key: "l1", _type: "string", value: "Brand Strategy & Architecture" },
        { _key: "l2", _type: "string", value: "Brand Identity & Visual Design" },
        { _key: "l3", _type: "string", value: "Brand Positioning & Messaging" },
        { _key: "l4", _type: "string", value: "Marketing Strategy & Planning" },
        { _key: "l5", _type: "string", value: "Brand Messaging & Copywriting" },
        { _key: "l6", _type: "string", value: "Product Launch & MVP Development" },
      ],
    },
    {
      _key: "tab-engage",
      id: "engage",
      label: "Engage",
      items: [
        { _key: "e1", _type: "string", value: "Marketing Campaigns & Activation" },
        { _key: "e2", _type: "string", value: "Content Marketing & Strategy" },
        { _key: "e3", _type: "string", value: "Gamification & Interactive Experiences" },
        { _key: "e4", _type: "string", value: "Experiential Marketing & Events" },
        { _key: "e5", _type: "string", value: "Brand Activations" },
        { _key: "e6", _type: "string", value: "Audience Engagement Strategies" },
      ],
    },
    {
      _key: "tab-mobilize",
      id: "mobilize",
      label: "Mobilize",
      items: [
        { _key: "m1", _type: "string", value: "Community Building & Management" },
        { _key: "m2", _type: "string", value: "Loyalty Programs & Membership Strategy" },
        { _key: "m3", _type: "string", value: "Brand Ambassador Programs" },
        { _key: "m4", _type: "string", value: "Influencer Marketing & Partnerships" },
        { _key: "m5", _type: "string", value: "Creator & Content Partnerships" },
        { _key: "m6", _type: "string", value: "Social Media & Digital Amplification" },
      ],
    },
    {
      _key: "tab-transform",
      id: "transform",
      label: "Transform",
      items: [
        { _key: "t1", _type: "string", value: "Organizational Change & Alignment" },
        { _key: "t2", _type: "string", value: "Sales Training & Sales Enablement" },
        {
          _key: "t3",
          _type: "string",
          value: "Employee Engagement, Internal Events & Training Workshops",
        },
        { _key: "t4", _type: "string", value: "AI Strategy & Marketing Automation" },
      ],
    },
  ],

  // Microteams
  microteamsEyebrow: "Microteams",
  microteamsHeading: "Small by Design. Senior by Default.",
  microteamsBody:
    "Our microteams are intentionally lean and deeply experienced. This isn\u2019t about saving money; it\u2019s about saving time and getting to better outcomes, faster. When every member of the team is a seasoned pro, you eliminate the endless review cycles and communication breakdowns that stifle creativity.",
  microteamsBullets: [
    { _key: "mb1", _type: "string", value: "CMO-level perspective to guide the strategy" },
    { _key: "mb2", _type: "string", value: "Top-tier creative direction to elevate the work" },
    {
      _key: "mb3",
      _type: "string",
      value: "Executive Producer discipline to drive the execution",
    },
  ],
  microteamsClosing:
    "You\u2019re not managing vendors. You\u2019re collaborating with a single, unified team that takes ownership of the outcomes.",

  // Momentum
  momentumEyebrow: "Momentum",
  momentumHeading: "Built for Momentum.",
  momentumBody:
    "Speed is a byproduct of alignment, not the goal itself. Our model is designed to create and sustain momentum. By getting the right people in the room from the beginning, we eliminate the costly resets and circular debates that stall progress. The work doesn\u2019t just get done; it builds on itself.",
  momentumBullets: [
    { _key: "mmb1", _type: "string", value: "Strategic decisions stick" },
    { _key: "mmb2", _type: "string", value: "Creative systems become reusable assets" },
    {
      _key: "mmb3",
      _type: "string",
      value: "Every sprint delivers real, measurable progress",
    },
  ],
  momentumClosing:
    "This is about moving forward with intention, so every step takes you further.",

  // ICP
  icpEyebrow: "Built for You",
  icpHeading: "One Model. Built for You.",
  icpSubheading:
    "The Sageworx model stays consistent. How we show up changes based upon you and your needs.",
  icpCards: [
    {
      _key: "icp1",
      badge: "For Startups",
      headline: "Burn Rate Matters. So Do Great Ideas.",
      body: "You don\u2019t need more headcount; you need access to senior leadership that can translate your vision into market traction. Sageworx provides the strategic and executional firepower to build your brand and drive growth, without the risk and cost of a full-time executive hire.",
    },
    {
      _key: "icp2",
      badge: "For Small to Midsize Brands",
      headline: "Tired of Decks Instead of Progress?",
      body: "Your internal marketing and creative teams are stretched thin, and big agencies are slowing you down with endless approval loops. Sageworx integrates directly into your workflow, breaking through bottlenecks and accelerating execution. We act as a seamless extension of your team, delivering the seasoned firepower you need to make an impact.",
      testimonialQuote:
        "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx is a smart, scalable way to solve complex problems without adding overhead.",
      testimonialAttribution: "Christi De Ved, VP of Marketing, EverPass Media",
    },
    {
      _key: "icp3",
      badge: "For Agencies & In-House Creative Teams",
      headline: "Say \u2018Yes\u2019 to Bigger Opportunities.",
      body: "A client needs something outside your wheelhouse. Don\u2019t scramble or say no. Sageworx allows you to expand your capabilities with fractional specialists who plug directly into your process. We help you pitch, plan, and deliver, all while remaining as visible (or invisible) to the client as you would like us to be.",
      testimonialQuote:
        "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx gives us a smart, scalable way to solve complex problems without adding overhead.",
      testimonialAttribution: "Will Morel, Creative Producer, Invivo Brands",
    },
  ],

  // Continuity
  continuityEyebrow: "Continuity",
  continuityHeading: "Flexibility Without the Friction.",
  continuityParagraphs: [
    {
      _key: "cp1",
      _type: "text",
      text: "The best part of our model is that knowledge sticks around. Leadership remains consistent, so you\u2019re not re-explaining your business every few months. We develop a living brief, a cohesive external share drive, and a communication protocol that keeps all the notes locked in one secure spot. As your needs evolve, we rotate specialists in and out without losing context or momentum.",
    },
    {
      _key: "cp2",
      _type: "text",
      text: "You get the continuity of a core team with the flexibility of a network. No chaos, no churn, just sustained progress.",
    },
  ],

  // Technology
  technologyEyebrow: "Technology",
  technologyHeading: "The Right Tools for the Job.",
  technologyParagraphs: [
    {
      _key: "tp1",
      _type: "text",
      text: "Great talent uses the best tools. Our teams are fluent in the technology that matters, from AI-enhanced strategy, analytics and production to immersive experiential platforms.",
    },
    {
      _key: "tp2",
      _type: "text",
      text: "We believe technology is a powerful accelerator, but it\u2019s never the strategy itself. Our approach is simple: use technology to elevate the thinking, streamline the work, and deliver better results. Human judgment guides the way; technology helps us get there faster.",
    },
  ],

  // Fit
  fitEyebrow: "Fit Check",
  fitHeading: "Let\u2019s Be Direct.",
  fitSubheading:
    "The Sageworx model works best when there\u2019s a true partnership. We\u2019re a strong fit if you value senior judgment, strategic clarity, and close collaboration.",
  fitGoodItems: [
    { _key: "fg1", _type: "string", value: "Tired of managing a roster of disconnected freelancers" },
    {
      _key: "fg2",
      _type: "string",
      value: "Looking to scale your team\u2019s capabilities without adding headcount",
    },
    {
      _key: "fg3",
      _type: "string",
      value: "An agency needing to fill a capability gap for a key client",
    },
    {
      _key: "fg4",
      _type: "string",
      value: "Frustrated with the bloat and slow pace of traditional agencies",
    },
  ],
  fitNotItems: [
    {
      _key: "fn1",
      _type: "string",
      value: "Looking for the lowest-cost execution or junior support",
    },
    {
      _key: "fn2",
      _type: "string",
      value: "Expecting to fully outsource the work with minimal involvement",
    },
    {
      _key: "fn3",
      _type: "string",
      value: "Optimizing for sheer volume over strategic impact",
    },
  ],
  fitClosing:
    "If you\u2019re looking for alignment, intentionality, and outcomes that last, we\u2019ll work extremely well together.",
  fitCtas: [
    { _key: "fc1", ...cta("Ready to Take Action?", "/contact") },
    { _key: "fc2", ...cta("Check Out Our Work", "/work", "secondary") },
    { _key: "fc3", ...cta("Meet Our Members", "/members", "ghost") },
  ],

  seo: {
    _type: "seo",
    title: "Our Model | Sageworx",
    description:
      "Senior, bespoke teams who already know how to work together. The Sageworx model delivers continuity and momentum without the overhead of a traditional agency.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  PROCESS PAGE
// ═══════════════════════════════════════════════════════════════════════════

const processPage = {
  _id: "processPage",
  _type: "processPage",

  heroEyebrow: "The Growth Sequence",
  heroHeading: "Smart Content + Experiences",
  heroBody:
    "The ultimate growth partner \u2014 built for every stage of your brand\u2019s evolution.",

  // Six Steps
  sixStepsEyebrow: "The Process",
  sixStepsHeading: "Six Steps. No Wasted Motion.",
  sixStepsItems: [
    {
      _key: "ss1",
      num: "01",
      title: "Immersion & Brief",
      whatsHappening:
        "The problem is pressure-tested, constraints are surfaced early, and success markers are agreed upon.",
      whyItMatters: "Most wasted spend traces back to a weak brief.",
      whatYouGet:
        "A living Project Brief that aligns teams, leadership, and execution from day one. The north star for the engagement\u2014defining targets, constraints, and success markers at launch. Revisited at every stage to course-correct, validate progress against real-world signals, and adapt intelligently as conditions change without losing sight of the objective.",
    },
    {
      _key: "ss2",
      num: "02",
      title: "Curating The Team",
      whatsHappening:
        "A purpose-built team is assembled based on category fluency and role fit\u2014not availability.",
      whyItMatters: "Teams win projects, not logos.",
      whatYouGet:
        "A category-fluent team ready to work immediately. An M-shaped team that can orient quickly, challenge assumptions, and move into execution without a learning curve\u2014aligned to the brief, fluent in your space, and ready to contribute from day one.",
    },
    {
      _key: "ss3",
      num: "03",
      title: "Shaping The Direction",
      whatsHappening:
        "Insights are converted into clear strategic and creative lanes before production begins.",
      whyItMatters: "Speed without direction is just motion.",
      whatYouGet:
        "A strategic roadmap that guides execution. A clear set of strategic and creative lanes tied directly to the Project Brief\u2014outlining priorities, tradeoffs, and sequencing so teams can move forward with confidence, make faster decisions, and stay aligned as the work accelerates.",
    },
    {
      _key: "ss4",
      num: "04",
      title: "Creation & Refinement",
      whatsHappening:
        "Work unfolds in focused sprints where strategy, creative, and production operate as one.",
      whyItMatters: "Momentum compounds when teams move together.",
      whatYouGet:
        "Accelerated progress without surprise pivots. A disciplined sprint rhythm anchored to the Project Brief, where work is reviewed against targets in real time, assumptions are tested early, and adjustments are made deliberately\u2014keeping momentum high while avoiding late-stage corrections or wasted effort.",
    },
    {
      _key: "ss5",
      num: "05",
      title: "Capturing Key Learnings",
      whatsHappening:
        "Decisions, insights, and learnings are captured as the work unfolds.",
      whyItMatters: "Most teams relearn the same lessons repeatedly.",
      whatYouGet:
        "A shared intelligence library that strengthens future work. A durable record of decisions, insights, and performance signals tied back to the Project Brief\u2014so future initiatives start smarter, move faster, and build on what actually happened, not what was assumed.",
    },
    {
      _key: "ss6",
      num: "06",
      title: "Evolution & Scale",
      whatsHappening:
        "Leadership remains consistent while specialists rotate in as needed.",
      whyItMatters: "Growth shouldn\u2019t require reinvention every quarter.",
      whatYouGet:
        "Sustained momentum without long-term overhead. A durable operating rhythm where leadership continuity preserves context, M-shaped specialists plug in as needed, and the Project Brief evolves into a living reference\u2014allowing you to scale effort up or down while staying aligned to real goals, real performance, and what comes next.",
    },
  ],

  // Principles
  principlesEyebrow: "Principles",
  principlesHeading: "Designed to Move You Forward. Faster.",
  principlesSubheading:
    "Our process and systems are designed for work without the re-work. Strategy, creative, and production aligned early. Fewer handoffs. Decisions and learnings are documented to reduce rework and repeat spend.",
  principlesCards: [
    {
      _key: "pc1",
      badge: "M-Shaped Talent",
      title: "Built Around M-Shaped Senior Talent",
      paragraphs: [
        {
          _key: "pcp1a",
          _type: "text",
          text: "Our members average 15\u201320 years in their discipline, with agency and in-house leadership backgrounds\u2014and the range to operate confidently beyond a single specialty.",
        },
        {
          _key: "pcp1b",
          _type: "text",
          text: "Deep expertise where it matters most, with meaningful fluency across adjacent disciplines. Our teams think beyond single roles\u2014connecting strategy, creative, technology, and production from day one.",
        },
        {
          _key: "pcp1c",
          _type: "text",
          text: "M-shaped talent means you\u2019re not just hiring for one lane. You\u2019re gaining leaders who can go deep, see around corners, and collaborate across the full scope of the work.",
        },
      ],
    },
    {
      _key: "pc2",
      badge: "Flex Structure",
      title: "Structured to Flex",
      paragraphs: [
        {
          _key: "pcp2a",
          _type: "text",
          text: "Leadership stays consistent, providing continuity, context, and accountability throughout the engagement. Specialists rotate in as needed based on the work\u2014not org charts\u2014allowing the team to flex without friction. Scope adapts as priorities evolve, without resetting momentum or re-onboarding a new group.",
        },
      ],
    },
  ],

  // Governance
  governanceEyebrow: "Governance & Risk",
  governanceHeading: "Built for Real-World Constraints",
  governanceBullets: [
    {
      _key: "gb1",
      _type: "text",
      text: "Sageworx contracts, insures, and stands behind the work; our members are vetted, contracted, and governed under a single engagement.",
    },
    {
      _key: "gb2",
      _type: "text",
      text: "AI is used to accelerate early drafts and analysis; judgment, direction, and final decisions remain human-led.",
    },
    {
      _key: "gb3",
      _type: "text",
      text: "We do not train models on proprietary client data, and we follow client-specific security and compliance requirements. AI tools are applied in a controlled, task-specific manner, aligned to each client\u2019s legal, security, and regulatory standards, with clear boundaries around data handling, access, and usage throughout the engagement.",
    },
    {
      _key: "gb4",
      _type: "text",
      text: "You pay for active senior expertise\u2014not bench time, training, or layers.",
    },
  ],

  // CTA
  closeHeading: "From clarity to momentum, without friction.",
  closeCta: cta("Activate Your Team", "/contact"),

  seo: {
    _type: "seo",
    title: "Our Process | Sageworx",
    description:
      "The Growth Sequence \u2014 smart content + experiences built for every stage of your brand\u2019s evolution.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  MEMBERS PAGE
// ═══════════════════════════════════════════════════════════════════════════

const membersPage = {
  _id: "membersPage",
  _type: "membersPage",

  heroHeading: "100+ Stories. One Mission.",
  heroBody:
    "Meet the minds behind the mission. A curated network of seasoned experts, diverse thinkers, and award-winning senior leaders\u2014each with a unique story, a distinct point of view, and a shared passion for making the work work better.",

  originEyebrow: "Our Origin",
  originHeading: "From Two Friends to a Global Network.",
  originParagraphs: [
    {
      _key: "op1",
      _type: "text",
      text: "Sageworx started in 2020 with a simple idea between two founders, Marc and Pat: What if you could build teams the way projects actually demand\u2014pulling in exactly the right people, with exactly the right skills, at exactly the right time?",
    },
    {
      _key: "op2",
      _type: "text",
      text: "They began by bringing together a small band of their most trusted former colleagues\u201421 senior professionals who shared the same frustration with the traditional model and the same belief in a better way to work.",
    },
    {
      _key: "op3",
      _type: "text",
      text: "They created a system built around independent lifestyles and collaborative, agile interactions that could flex with the demands of any project, any timeline, any industry.",
    },
  ],

  growthEyebrow: "How We Grow",
  growthHeading: "Growth Fueled by Independent Masters of Their Craft.",
  growthParagraphs: [
    {
      _key: "gp1",
      _type: "text",
      text: "Over the past six years, that small group of 21 has grown into a network of over 100 specialists, spanning strategy, creative, production, technology, and transformation.",
    },
    {
      _key: "gp2",
      _type: "text",
      text: "Each new member is brought into the collective one by one\u2014personally vouched for by an existing member, rigorously vetted by our founders, and ultimately selected on the basis of craft mastery, collaborative instinct, and professional character.",
    },
    {
      _key: "gp3",
      _type: "text",
      text: "This M-shaped talent delivers more innovative, integrated solutions\u2014providing deep expertise in their primary discipline while operating fluently across adjacent areas to ensure strategy, creative, and execution are connected from day one.",
    },
  ],

  statsEyebrow: "By the Numbers",
  statsHeading: "A Network of Multi-disciplined Powerhouses.",
  statsParagraphs: [
    {
      _key: "sp1",
      _type: "text",
      text: "Today, the Sageworx collective is a diverse group of independent consultants, entrepreneurs, and creative leaders who\u2019ve built careers at the highest levels of marketing, advertising, and brand building.",
    },
    {
      _key: "sp2",
      _type: "text",
      text: "We operate as a true collective\u2014sharing business, challenging one another, and raising the bar across every engagement.",
    },
  ],
  statsItems: [
    { _key: "st1", _type: "stat", value: 50, suffix: "+", label: "Fortune 500 Brands Served" },
    { _key: "st2", _type: "stat", value: 200, suffix: "+", label: "Major Awards Won" },
    { _key: "st3", _type: "stat", value: 90, suffix: "%", label: "With 15+ Years Experience" },
    { _key: "st4", _type: "stat", value: 12, suffix: "", label: "Languages Spoken" },
    { _key: "st5", _type: "stat", value: 300, suffix: "+", label: "Product Launches Supported" },
    { _key: "st6", _type: "stat", value: 25, suffix: "+", label: "Industries Represented" },
  ],

  joinHeading: "Interested in Joining Sageworx?",
  joinSubheading: "Let\u2019s Take Off Together.",
  joinParagraphs: [
    {
      _key: "jp1",
      _type: "text",
      text: "While our network has traditionally been built on trust and personal endorsements, we\u2019re always open to meeting exceptional talent who share our values.",
    },
    {
      _key: "jp2",
      _type: "text",
      text: "If you believe your work and mindset align with our mission, we\u2019d love to connect.",
    },
  ],
  joinCta: cta("Apply to Join", "/contact"),

  seo: {
    _type: "seo",
    title: "Our Members | Sageworx",
    description:
      "Meet 100+ seasoned experts, diverse thinkers, and award-winning senior leaders. A curated network with a shared passion for making the work work better.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  WORK PAGE
// ═══════════════════════════════════════════════════════════════════════════

const workPage = {
  _id: "workPage",
  _type: "workPage",

  heroHeading: "Our Work",
  heroSubheading:
    "Real outcomes for real brands. Explore how Sageworx teams have delivered impact across industries.",
  heroProjectsLabel: "Projects",
  heroStatusLabel: "Status",
  heroStatusValue: "Active",

  seo: {
    _type: "seo",
    title: "Our Work | Sageworx",
    description:
      "Real outcomes for real brands. Explore how Sageworx teams have delivered impact across industries.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  SPOTLIGHTS PAGE
// ═══════════════════════════════════════════════════════════════════════════

const spotlightsPage = {
  _id: "spotlightsPage",
  _type: "spotlightsPage",

  heroHeading: "Spotlights",
  heroSubheading:
    "Insights, featured work, and perspectives from the Sageworx collective.",

  seo: {
    _type: "seo",
    title: "Spotlights | Sageworx",
    description:
      "Insights, featured work, and perspectives from the Sageworx collective.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  STYLE GUIDE PAGE
// ═══════════════════════════════════════════════════════════════════════════

const styleGuidePage = {
  _id: "styleGuidePage",
  _type: "styleGuidePage",

  headerHeading: "SGWX Style Guide",
  headerSubheading:
    "Every color, component, and typographic token in the Sageworx design system. Click any swatch to copy its value.",

  seo: {
    _type: "seo",
    title: "Style Guide | Sageworx",
    description:
      "Every color, component, and typographic token in the Sageworx design system.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  ANIMATIONS PAGE
// ═══════════════════════════════════════════════════════════════════════════

const animationsPage = {
  _id: "animationsPage",
  _type: "animationsPage",

  headerHeading: "Animation Library",
  headerSubheading:
    "All background animations compiled for the SGWX site. Each preview renders at 500\u00D7500px. Use these to assign animations to page backgrounds and sections.",

  seo: {
    _type: "seo",
    title: "Animation Library | Sageworx",
    description:
      "All background animations compiled for the SGWX site.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════════════

const allDocs = [
  modelPage,
  processPage,
  membersPage,
  workPage,
  spotlightsPage,
  styleGuidePage,
  animationsPage,
];

async function main() {
  console.log("Seeding all page documents...\n");

  for (const doc of allDocs) {
    const existing = await client.fetch(
      `*[_id == "${doc._id}"][0] { _id, _rev }`
    );

    if (existing) {
      console.log(`  [skip] ${doc._type} already exists (rev: ${existing._rev})`);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await client.createIfNotExists(doc as any);
      console.log(`  [created] ${doc._type} (id: ${result._id})`);
    }
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Failed to seed:", err);
  process.exit(1);
});
