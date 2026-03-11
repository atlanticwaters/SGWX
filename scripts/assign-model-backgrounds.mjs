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

const assignments = {
  rightTeamBackground: "bg-collaborative-workspace",
  capabilitiesBackground: "bg-emerald-flow",
  microteamsBackground: "bg-crafted-geometry",
  momentumBackground: "bg-signal-pulse",
  icpBackground: "bg-garden-pathways",
  continuityBackground: "bg-leaf-network",
  technologyBackground: "bg-data-streams",
  fitBackground: "bg-steel-lattice",
};

async function assign() {
  console.log("Assigning backgrounds to modelPage sections...\n");

  const patch = client.patch("modelPage");

  for (const [field, refId] of Object.entries(assignments)) {
    console.log(`  ${field} -> ${refId}`);
    patch.set({
      [field]: { _type: "reference", _ref: refId },
    });
  }

  const result = await patch.commit();
  console.log(`\nDone! Updated document: ${result._id}`);
}

assign().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
