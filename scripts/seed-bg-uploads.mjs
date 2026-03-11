import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const BG_DIR = path.resolve("_assets/images/Upload BG");

/**
 * Each entry: local filename, Sanity name, slug, overlay color, recommended section
 */
const backgrounds = [
  {
    _id: "bg-steel-lattice",
    file: "AdobeStock_272249356.jpeg",
    name: "Steel Lattice",
    slug: "steel-lattice",
    overlayColor: "carbon",
    credit: "Adobe Stock",
    section: "Fit Check",
  },
  {
    _id: "bg-collaborative-workspace",
    file: "AdobeStock_627360233.jpeg",
    name: "Collaborative Workspace",
    slug: "collaborative-workspace",
    overlayColor: "sage",
    credit: "Adobe Stock",
    section: "Right Team",
  },
  {
    _id: "bg-emerald-flow",
    file: "AdobeStock_1788174064.jpeg",
    name: "Emerald Flow",
    slug: "emerald-flow",
    overlayColor: "teal",
    credit: "Adobe Stock",
    section: "Capabilities",
  },
  {
    _id: "bg-leaf-network",
    file: "AdobeStock_64850582.jpeg",
    name: "Leaf Network",
    slug: "leaf-network",
    overlayColor: "sage",
    credit: "Adobe Stock",
    section: "Continuity",
  },
  {
    _id: "bg-garden-pathways",
    file: "AdobeStock_332440230.jpeg",
    name: "Garden Pathways",
    slug: "garden-pathways",
    overlayColor: "sage",
    credit: "Adobe Stock",
    section: "Built for You (ICP)",
  },
  {
    _id: "bg-crafted-geometry",
    file: "AdobeStock_461804234.jpeg",
    name: "Crafted Geometry",
    slug: "crafted-geometry",
    overlayColor: "amber",
    credit: "Adobe Stock",
    section: "Microteams",
  },
  {
    _id: "bg-data-streams",
    file: "AdobeStock_992950050.jpeg",
    name: "Data Streams",
    slug: "data-streams",
    overlayColor: "steel",
    credit: "Adobe Stock",
    section: "Technology",
  },
  {
    _id: "bg-palm-shadows",
    file: "AdobeStock_499868204.jpeg",
    name: "Palm Shadows",
    slug: "palm-shadows",
    overlayColor: "carbon",
    credit: "Adobe Stock",
    section: "(spare)",
  },
  {
    _id: "bg-teal-waveform",
    file: "AdobeStock_1562396114.jpeg",
    name: "Teal Waveform",
    slug: "teal-waveform",
    overlayColor: "teal",
    credit: "Adobe Stock",
    section: "(spare)",
  },
  {
    _id: "bg-signal-pulse",
    file: "AdobeStock_1903048844.jpeg",
    name: "Signal Pulse",
    slug: "signal-pulse",
    overlayColor: "sage",
    credit: "Adobe Stock",
    section: "Momentum",
  },
];

async function uploadLocalImage(filePath) {
  console.log(`  Uploading ${path.basename(filePath)}...`);
  const asset = await client.assets.upload(
    "image",
    createReadStream(filePath),
    {
      contentType: "image/jpeg",
      filename: path.basename(filePath),
    }
  );
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function seed() {
  console.log(
    `Uploading ${backgrounds.length} background images to Sanity...\n`
  );

  for (const bg of backgrounds) {
    console.log(`[${bg.name}] -> ${bg.section}`);
    try {
      const filePath = path.join(BG_DIR, bg.file);
      const imageRef = await uploadLocalImage(filePath);
      const doc = {
        _id: bg._id,
        _type: "sectionBackground",
        name: bg.name,
        slug: { _type: "slug", current: bg.slug },
        image: imageRef,
        credit: bg.credit,
        overlayColor: bg.overlayColor,
      };
      await client.createOrReplace(doc);
      console.log(`  -> Created: ${bg.slug} (overlay: ${bg.overlayColor})\n`);
    } catch (err) {
      console.error(`  -> FAILED: ${err.message}\n`);
    }
  }

  console.log("Done!");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
