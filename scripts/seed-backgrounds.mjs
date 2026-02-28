import { createClient } from "@sanity/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-25",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

/**
 * Curated Unsplash images matching the SGWX mood board:
 * Nature & Technology Fusion — organic forms, sacred geometry,
 * dark moody landscapes, abstract energy, fluid dynamics.
 */
const backgrounds = [
  {
    _id: "bg-abstract-curves",
    name: "Abstract Curves",
    slug: "abstract-curves",
    // Dark abstract background with curves
    url: "https://images.unsplash.com/photo-1707730376818-a7a02fe896d5?w=1920&q=80",
    credit: "Unsplash",
    overlayColor: "sage",
  },
  {
    _id: "bg-dark-mountain",
    name: "Dark Mountain",
    slug: "dark-mountain",
    // Moody dark mountain peaks
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80",
    credit: "Unsplash / Benjamin Voros",
    overlayColor: "carbon",
  },
  {
    _id: "bg-spiral-geometry",
    name: "Spiral Geometry",
    slug: "spiral-geometry",
    // Nautilus shell / golden spiral
    url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1920&q=80",
    credit: "Unsplash / Zoltan Tasi",
    overlayColor: "teal",
  },
  {
    _id: "bg-dark-foliage",
    name: "Dark Foliage",
    slug: "dark-foliage",
    // Overhead dark green canopy
    url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1920&q=80",
    credit: "Unsplash / Jay Mantri",
    overlayColor: "sage",
  },
  {
    _id: "bg-geometric-architecture",
    name: "Geometric Architecture",
    slug: "geometric-architecture",
    // Modern building with geometric patterns
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80",
    credit: "Unsplash / Lance Anderson",
    overlayColor: "steel",
  },
  {
    _id: "bg-fluid-waves",
    name: "Fluid Waves",
    slug: "fluid-waves",
    // Abstract fluid / wave texture
    url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&q=80",
    credit: "Unsplash / Pawel Czerwinski",
    overlayColor: "sage",
  },
  {
    _id: "bg-water-ripples",
    name: "Water Ripples",
    slug: "water-ripples",
    // Concentric water ripple pattern
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
    credit: "Unsplash / Levi XU",
    overlayColor: "teal",
  },
  {
    _id: "bg-layered-terrain",
    name: "Layered Terrain",
    slug: "layered-terrain",
    // Abstract curved lines in dark tone
    url: "https://images.unsplash.com/photo-1751738567801-7d13e5b51b1d?w=1920&q=80",
    credit: "Unsplash",
    overlayColor: "steel",
  },
  // ─── New backgrounds ───
  {
    _id: "bg-ocean-depth",
    name: "Ocean Depth",
    slug: "ocean-depth",
    // Deep underwater blue/dark tones
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80",
    credit: "Unsplash / Cristian Palmer",
    overlayColor: "steel",
  },
  {
    _id: "bg-fog-coastline",
    name: "Fog Coastline",
    slug: "fog-coastline",
    // Dark flowing fabric / dramatic abstract
    url: "https://images.unsplash.com/photo-1752213355644-64b6900e7841?w=1920&q=80",
    credit: "Unsplash",
    overlayColor: "carbon",
  },
  {
    _id: "bg-macro-circuit",
    name: "Macro Circuit",
    slug: "macro-circuit",
    // Close-up circuit board / tech texture
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    credit: "Unsplash / Alexandre Debiave",
    overlayColor: "teal",
  },
  {
    _id: "bg-volcanic-texture",
    name: "Volcanic Texture",
    slug: "volcanic-texture",
    // Dark volcanic rock surface
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
    credit: "Unsplash / Samuel Ferrara",
    overlayColor: "carbon",
  },
  {
    _id: "bg-mycelium-roots",
    name: "Mycelium Roots",
    slug: "mycelium-roots",
    // Organic root/mycelium network texture
    url: "https://images.unsplash.com/photo-1530092285049-1c42085fd395?w=1920&q=80",
    credit: "Unsplash / Zdenek Machacek",
    overlayColor: "sage",
  },
  {
    _id: "bg-light-trails",
    name: "Light Trails",
    slug: "light-trails",
    // Long exposure light trails / abstract energy
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    credit: "Unsplash / NASA",
    overlayColor: "steel",
  },
];

async function uploadImageFromUrl(url) {
  console.log(`  Fetching ${url.slice(0, 60)}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    contentType: res.headers.get("content-type") || "image/jpeg",
    filename: url.split("?")[0].split("/").pop() + ".jpg",
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function seed() {
  console.log(`Seeding ${backgrounds.length} section backgrounds to Sanity...\n`);

  for (const bg of backgrounds) {
    console.log(`[${bg.name}]`);
    try {
      const imageRef = await uploadImageFromUrl(bg.url);
      const doc = {
        _id: bg._id,
        _type: "sectionBackground",
        name: bg.name,
        slug: { _type: "slug", current: bg.slug },
        image: imageRef,
        credit: bg.credit,
        sourceUrl: bg.url.split("?")[0],
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
