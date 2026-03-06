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

const styleGuidePageData = {
  _id: "styleGuidePage",
  _type: "styleGuidePage",
  headerHeading: "SGWX Style Guide",
  headerSubheading:
    "Every color, component, and typographic token in the Sageworx design system. Click any swatch to copy its value.",
  sectionDescriptions: [
    { _key: "colors", sectionId: "colors", heading: "Color Palette" },
    { _key: "glows", sectionId: "glows", heading: "Glows & Overlays" },
    { _key: "overlays", sectionId: "overlays", heading: "Overlay Colors" },
    { _key: "typography", sectionId: "typography", heading: "Typography" },
    { _key: "buttons", sectionId: "buttons", heading: "Buttons" },
    { _key: "cards", sectionId: "cards", heading: "Cards" },
    { _key: "badges", sectionId: "badges", heading: "Badges" },
    { _key: "headings", sectionId: "headings", heading: "Section Headings" },
    { _key: "dividers", sectionId: "dividers", heading: "Section Dividers" },
    { _key: "animations", sectionId: "animations", heading: "Animation Patterns" },
    { _key: "process", sectionId: "process", heading: "Process Page Accents" },
  ],
  seo: {
    _type: "seo",
    title: "Style Guide",
    description:
      "SGWX Design System — tokens, components, and patterns.",
  },
};

async function main() {
  console.log("Seeding style guide page...");
  await client.createOrReplace(styleGuidePageData);
  console.log("Done! Style guide page seeded.");
}

main().catch(console.error);
