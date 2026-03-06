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

const spotlightsPageData = {
  _id: "spotlightsPage",
  _type: "spotlightsPage",
  heroHeading: "Spotlights",
  heroSubheading:
    "Insights, featured work, and perspectives from the Sageworx collective.",
  seo: {
    _type: "seo",
    title: "Spotlights",
    description:
      "Insights, featured work, and perspectives from the Sageworx collective.",
  },
};

async function main() {
  console.log("Seeding spotlights page...");
  await client.createOrReplace(spotlightsPageData);
  console.log("Done! Spotlights page seeded.");
}

main().catch(console.error);
