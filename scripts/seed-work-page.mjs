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

const workPageData = {
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
    title: "Our Work",
    description:
      "Real outcomes for real brands. Explore how Sageworx teams have delivered impact across industries.",
  },
};

async function main() {
  console.log("Seeding work page...");
  await client.createOrReplace(workPageData);
  console.log("Done! Work page seeded.");
}

main().catch(console.error);
