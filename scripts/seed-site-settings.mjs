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

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",

  siteTitle: "Sageworx | Go Further. Faster.",
  description:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts.",

  navigation: [
    { _key: "nav-model", label: "Model", href: "/model", isCta: false },
    { _key: "nav-members", label: "Members", href: "/members", isCta: false },
    { _key: "nav-process", label: "Process", href: "/process", isCta: false },
    { _key: "nav-work", label: "Work", href: "/work", isCta: false },
    { _key: "nav-spotlights", label: "Spotlights", href: "/spotlights", isCta: false },
    { _key: "nav-cta", label: "Let\u2019s Chat!", href: "/contact", isCta: true },
  ],

  footer: {
    copyright: `\u00A9 ${new Date().getFullYear()} Sageworx, LLC.`,
    socialLinks: [],
  },
};

async function main() {
  console.log("Seeding site settings...");
  await client.createOrReplace(siteSettings);
  console.log("Done! Site settings seeded.");
}

main().catch(console.error);
