import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  console.log("Patching modelPage with copy deck edits...");

  const result = await client
    .patch("modelPage")
    .set({
      // ── Hero ──
      heroHeading: "Stop Resetting. Start Accelerating.",
      heroBody:
        "The Sageworx model brings together seasoned teams who already know how to work together, and understand your industry and audience. We skip the learning curve and get right to the work, delivering continuity and momentum without the overhead of a traditional agency.",

      // ── ICP Cards ──
      icpCards: [
        {
          _key: "icp1",
          badge: "For Startups",
          headline: "Burn Rate Matters. So Do Great Ideas.",
          body: "You don\u2019t need more headcount; you need access to senior leadership that can translate your vision into market traction. Sageworx provides the strategic and executional firepower to build your brand and drive growth, without the risk and cost of a full-time executive hire.",
          testimonialQuote:
            "Launching a new platform in a fast-moving media landscape requires both strategic clarity and creative excellence. Sageworx has been a true extension of our team \u2014 partnering closely with us to shape the EverPass brand, support key media partnerships, and develop the first campaigns introducing our offering to the market. They\u2019ve navigated brand, legal, and league considerations with confidence and precision. Their ability to collaborate seamlessly and move quickly alongside our team has made them an invaluable partner.",
          testimonialAttribution:
            "Christi DeVed, VP of Marketing, EverPass Media",
        },
        {
          _key: "icp2",
          badge: "For Small to Midsize Brands on the Move",
          headline: "Tired of Decks Instead of Progress?",
          body: "Your internal marketing and creative teams are stretched thin, and big agencies are slowing you down with endless approval loops. Sageworx integrates directly into your workflow, breaking through bottlenecks and accelerating execution. We act as a seamless extension of your team, delivering the seasoned firepower you need to make an impact.",
          testimonialQuote:
            "We needed a team that could bridge the gap between technical precision and emotional storytelling. Sageworx delivered a creative vision that elevated our brand and gave us a framework we can build on for years.",
          testimonialAttribution:
            "Dirk Frese, Vice President of Sales, Marketing & Service, JULABO USA",
        },
        {
          _key: "icp3",
          badge: "For Agencies & In-House Creative Teams",
          headline: "Say \u2018Yes\u2019 to Bigger Opportunities.",
          body: "A client needs something outside your wheelhouse. Don\u2019t scramble or say no. Sageworx allows you to expand your capabilities with fractional specialists who plug directly into your process. We help you pitch, plan, and deliver, all while remaining as visible (or invisible) to the client as you would like us to be.",
          testimonialQuote:
            "When client solutions push us beyond our core capabilities, Sageworx is our first call. They integrate seamlessly, bring the right expertise, and deliver work that helps us go beyond expectations. With ZENPEP, they allowed us to offer a solution that included game design and development\u2014expanding our core offerings and unlocking a new revenue stream with one of our top clients. Sageworx gives us a smart, scalable way to solve complex problems without adding overhead.",
          testimonialAttribution:
            "Will Morel, Creative Producer, Invivo Brands",
        },
      ],

      // ── Fit CTAs ──
      fitCtas: [
        {
          _key: "fc1",
          _type: "callToAction",
          label: "Check Out Our Work",
          href: "/work",
          variant: "secondary",
        },
        {
          _key: "fc2",
          _type: "callToAction",
          label: "Meet Our Members",
          href: "/members",
          variant: "ghost",
        },
        {
          _key: "fc3",
          _type: "callToAction",
          label: "Take Action",
          href: "/contact",
          variant: "primary",
        },
      ],
    })
    .commit();

  console.log("Patched modelPage:", result._id, "rev:", result._rev);
}

main().catch((err) => {
  console.error("Error patching modelPage:", err.message);
  process.exit(1);
});
