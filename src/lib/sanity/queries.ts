import { client } from "./client";

// Base query helper
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, params ?? {});
}
