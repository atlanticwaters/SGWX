import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_KEY,
  useCdn: false,
});

const LOGO_DIR = path.resolve("_assets/logos/client_logos");

const logos = [
  { file: "160Over90.svg", alt: "160over90" },
  { file: "Coca-Cola_Logo_Alternative_0.svg", alt: "The Coca-Cola Company" },
  { file: "Edible.webp", alt: "Edible" },
  { file: "Smurfit Westrock.svg", alt: "Smurfit WestRock" },
  { file: "WITH_idMZoPr75j_1.svg", alt: "The With Agency" },
  { file: "allison.svg", alt: "Allison & Partners" },
  { file: "bbdo.svg", alt: "BBDO" },
  { file: "first_nations_bank.svg", alt: "First Horizon Bank" },
  { file: "halo.svg", alt: "Halo Dog Collars" },
  { file: "kroger.svg", alt: "Kroger" },
  { file: "pda_logo.svg", alt: "PDA" },
  { file: "tractor_supply.svg", alt: "Tractor Supply Company" },
  { file: "usc_logo_horizontal_rgb_k_rev.svg", alt: "Darla Moore School" },
  { file: "yah-agency-logo.svg", alt: "The YAH Agency" },
];

function contentType(file) {
  if (file.endsWith(".svg")) return "image/svg+xml";
  if (file.endsWith(".webp")) return "image/webp";
  if (file.endsWith(".png")) return "image/png";
  return "image/jpeg";
}

async function seed() {
  console.log(`Uploading ${logos.length} logos and patching homepage...\n`);

  const logoEntries = [];

  for (const logo of logos) {
    const filePath = path.join(LOGO_DIR, logo.file);
    console.log(`  Uploading ${logo.file}...`);
    try {
      const asset = await client.assets.upload(
        "image",
        createReadStream(filePath),
        { contentType: contentType(logo.file), filename: logo.file }
      );
      logoEntries.push({
        _key: asset._id.replace(/^image-/, "").slice(0, 12),
        _type: "object",
        image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
        alt: logo.alt,
      });
      console.log(`    -> Uploaded: ${asset._id}`);
    } catch (err) {
      console.error(`    -> FAILED: ${err.message}`);
    }
  }

  if (logoEntries.length === 0) {
    console.error("No logos uploaded — skipping homepage patch.");
    process.exit(1);
  }

  console.log(`\nPatching homepage with ${logoEntries.length} logos...`);
  await client
    .patch("homepage")
    .set({ logos: logoEntries })
    .commit();

  console.log("Done! Logos are now on the homepage.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
