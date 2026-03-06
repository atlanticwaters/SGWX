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

const animationsPageData = {
  _id: "animationsPage",
  _type: "animationsPage",
  headerHeading: "Animation Library",
  headerSubheading:
    "All background animations compiled for the SGWX site. Each preview renders at 500\u00d7500px. Use these to assign animations to page backgrounds and sections.",
  threeAnimations: [
    {
      _key: "wave",
      name: "Wave Background",
      description:
        "Ocean-like particle field with multi-layered sine waves, bloom halos, and gold accent nodes. Used on the homepage hero and process page.",
      fileName: "WaveBackground.tsx",
    },
    {
      _key: "city",
      name: "City Background",
      description:
        "Wireframe city with 4 districts (Agriculture, Auto, Sports, Tech) that draw in sequentially with a construction spark trail. Used on model page.",
      fileName: "CityBackground.tsx",
    },
    {
      _key: "network",
      name: "Network Background",
      description:
        "Dynamic network graph with drifting nodes, proximity-based edges, traveling pulses, and gold accent nodes. Used on work page.",
      fileName: "NetworkBackground.tsx",
    },
  ],
  deepFields: [
    {
      _key: "df1",
      variant: 1,
      name: "Bioluminescent Tide",
      subtitle: "Deep Field 01",
      description:
        "Warm teal and gold bioluminescent pools drifting like deep-ocean organisms. Large, slow foundation pools layered with faster gold/yellow-green accent sparks. Screen-blended with radial depth crush.",
      technique:
        "15 radial gradient pools, screen blending, multiply depth crush + atmospheric band",
      bgColor: "#010e0a",
    },
    {
      _key: "df2",
      variant: 2,
      name: "Abyssal Blue",
      subtitle: "Deep Field 02",
      description:
        "Nearly-black deep ocean blue with cold cyan fissures and faint teal undercurrent. Very slow, large mass pools create a pressurized underwater feel. Icy white-blue micro sparks punctuate the darkness.",
      technique:
        "15 pools with tighter falloff, cool blue depth crush, heavy top-down atmospheric pressure",
      bgColor: "#01080f",
    },
    {
      _key: "df3",
      variant: 3,
      name: "Lime Surge",
      subtitle: "Deep Field 03",
      description:
        "High-voltage lime and yellow-green energy radiating from a dark forest green base. Electric yellow-white hot spots pulse rapidly against slow-moving foundation layers. A single teal undertone adds depth.",
      technique:
        "16 pools in 4 tiers (base, mid, surge, electric), warm green depth crush",
      bgColor: "#020e04",
    },
    {
      _key: "df4",
      variant: 4,
      name: "Sparse Void",
      subtitle: "Deep Field 04",
      description:
        "The most complex variant. Three distinct pool layers (tectonic slabs, mid pools, vivid accents) with independent opacity sinusoids that shift the composition over 2\u20134 minute horizons. Elliptical temperature bands create color climate regions.",
      technique:
        "4 elliptical bands + 4 tectonic + 9 mid + 8 accent pools, per-pool opacity cycling",
      bgColor: "#010c09",
    },
    {
      _key: "df5",
      variant: 5,
      name: "Dense Interference",
      subtitle: "Deep Field 05",
      description:
        "22 tightly-packed pools with crisp edges create visible moir\u00e9-like interference patterns as they overlap. Tighter gradient falloff than other variants produces sharper color boundaries and more complex visual texture.",
      technique:
        "22 dense pools with tight falloff, per-pool amplitude array, screen interference",
      bgColor: "#010f0b",
    },
    {
      _key: "df6",
      variant: 6,
      name: "Thermal Drift",
      subtitle: "Deep Field 06",
      description:
        "Thermal convection simulation. Cold blue-teal pools anchor the ceiling, while hot gold-green pools anchor the base. Rising plumes drift upward with vertical bias, creating a convection current feel. Apex sparks appear where thermals reach the top.",
      technique:
        "18 pools with directional ampX/ampY/bias, vertical thermal drift, cool-top warm-bottom depth",
      bgColor: "#010d08",
    },
  ],
  seo: {
    _type: "seo",
    title: "Animations Showcase",
    description:
      "SGWX 3D animation library — preview all available background animations.",
  },
};

async function main() {
  console.log("Seeding animations page...");
  await client.createOrReplace(animationsPageData);
  console.log("Done! Animations page seeded.");
}

main().catch(console.error);
