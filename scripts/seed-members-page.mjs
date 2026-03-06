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

const membersPageData = {
  _id: "membersPage",
  _type: "membersPage",

  heroHeading: "100+ Stories. One Mission.",
  heroBody:
    "Meet the minds behind the mission. A curated network of seasoned experts, diverse thinkers, and award-winning senior leaders\u2014each with a unique story, a distinct point of view, and a shared passion for making the work work better.",

  originEyebrow: "Our Origin",
  originHeading: "From Two Friends to a Global Network.",
  originParagraphs: [
    "Sageworx started in 2020 with a simple idea between two founders, Marc and Pat. One from the world of creative and marketing, the other from production and advertising, they both saw the same cracks in the traditional agency model. They wanted to build something different, with people who thought differently.",
    "They began by bringing together a small band of their most trusted former colleagues\u2014all senior specialists who had also left the agency and corporate worlds behind. This was the start of the collective. During a time when the world was going remote, they built a new kind of machine, fueled not by winning awards, but by delivering real outcomes for clients.",
    "They created a system built around independent lifestyles and collaborative, agile interactions. Information was engrained, not handed off. The result was a seamless workflow that proved you didn\u2019t need to be in the same room to be on the same page.",
  ],

  growthEyebrow: "How We Grow",
  growthHeading: "Growth Fueled by Independent Masters of Their Craft.",
  growthParagraphs: [
    "Over the past six years, that small group of 21 has grown into a network of over 100 specialists. This growth has been intentional, not accidental. From the beginning, Sageworx has actively sought out the best M-shaped professionals\u2014people who are not only deeply skilled in one discipline but also highly proficient in others. Think creative director\u2013sonic branding strategist\u2013technologist. Or art director\u2013NFT creator\u2013social content strategist.",
    "Each new member is brought into the collective one by one, endorsed by at least one existing member and personally approved by both founders. Our vetting process is one part credential, three parts potential. We look for senior leaders who have a proven track record of innovation and a penchant for exploring new technologies, challenging old workflows, and finding new ways to make the work work better.",
    "This M-shaped talent delivers more innovative, integrated solutions\u2014and sparks more serendipity from ideation to creation to activation.",
  ],

  statsEyebrow: "By the Numbers",
  statsHeading: "A Network of Multi-disciplined Powerhouses.",
  statsParagraphs: [
    "Today, the Sageworx collective is a diverse group of independent consultants, boutique agency owners, and subject matter experts. We are former Chief Creative Officers, VPs of Marketing, and heads of production from the biggest names in the business. We are strategists, creatives, producers, and makers who have chosen independence but thrive on collaboration.",
    "We operate as a true collective\u2014sharing business, challenging one another, and improving our craft together. This is our unfair advantage: a stable of award-winning, M-shaped specialists who are constantly sharing intelligence and learnings from across multiple industries and all over the world.",
  ],
  statsItems: [
    { _key: "stat-1", _type: "stat", value: "50", suffix: "+", label: "Fortune 500 Brands Served" },
    { _key: "stat-2", _type: "stat", value: "200", suffix: "+", label: "Major Awards Won" },
    { _key: "stat-3", _type: "stat", value: "90", suffix: "%", label: "With 15+ Years Experience" },
    { _key: "stat-4", _type: "stat", value: "12", suffix: "", label: "Languages Spoken" },
    { _key: "stat-5", _type: "stat", value: "300", suffix: "+", label: "Product Launches Supported" },
    { _key: "stat-6", _type: "stat", value: "25", suffix: "+", label: "Industries Represented" },
  ],

  joinHeading: "Interested in Joining Sageworx?",
  joinSubheading: "Let\u2019s Take Off Together.",
  joinParagraphs: [
    "While our network has traditionally been built on trust and personal endorsements, we are always looking to team with senior, independent, M-shaped leaders who are exceptional at their craft and believe in the power of collaboration.",
    "If you believe your work and mindset align with our mission, we\u2019d love to connect.",
  ],
  joinCta: {
    _type: "callToAction",
    label: "Apply to Join",
    href: "/contact",
    variant: "primary",
  },

  seo: {
    _type: "seo",
    title: "Our Members",
    description:
      "Meet 100+ seasoned experts, diverse thinkers, and award-winning senior leaders. A curated network with a shared passion for making the work work better.",
  },
};

async function main() {
  console.log("Seeding members page...");
  await client.createOrReplace(membersPageData);
  console.log("Done! Members page seeded.");
}

main().catch(console.error);
