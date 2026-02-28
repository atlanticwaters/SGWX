import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

function getWriteClient(): SanityClient {
  if (!projectId || !dataset) {
    throw new Error("Missing Sanity project configuration (NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET)");
  }
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN environment variable. " +
      "Create a write token in Sanity dashboard → Settings → API → Tokens (Editor role) " +
      "and add it to your Vercel environment variables."
    );
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: "2026-02-25",
    useCdn: false,
    token,
  });
}

export { getWriteClient };
