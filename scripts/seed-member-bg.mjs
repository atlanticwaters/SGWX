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

const BG_DIR = path.resolve("_assets/images/Member BG");

const backgrounds = [
  {
    _id: "bg-sage-leaves",
    file: "AdobeStock_357963926.jpeg",
    name: "Sage Leaves",
    slug: "sage-leaves",
    overlayColor: "sage",
    credit: "Adobe Stock",
    section: "Featured Members",
  },
  {
    _id: "bg-joyful-creator",
    file: "AdobeStock_410127153.jpeg",
    name: "Joyful Creator",
    slug: "joyful-creator",
    overlayColor: "carbon",
    credit: "Adobe Stock",
    section: "Join Section",
  },
  {
    _id: "bg-warm-collaboration",
    file: "AdobeStock_347430903.jpeg",
    name: "Warm Collaboration",
    slug: "warm-collaboration",
    overlayColor: "carbon",
    credit: "Adobe Stock",
    section: "Origin Section",
  },
  {
    _id: "bg-creative-workshop",
    file: "AdobeStock_299051602.jpeg",
    name: "Creative Workshop",
    slug: "creative-workshop",
    overlayColor: "sage",
    credit: "Adobe Stock",
    section: "Growth Section",
  },
  {
    _id: "bg-digital-mesh",
    file: "AdobeStock_1563629909.jpeg",
    name: "Digital Mesh",
    slug: "digital-mesh",
    overlayColor: "teal",
    credit: "Adobe Stock",
    section: "Collective Stats",
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
    `Uploading ${backgrounds.length} member background images to Sanity...\n`
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
