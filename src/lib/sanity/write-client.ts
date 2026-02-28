import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity project configuration");
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-02-25",
  useCdn: false,
  token,
});
