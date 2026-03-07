/**
 * Sanity stores array-of-string/text fields as objects like {_key, _type, value/text}.
 * This recursively normalizes them to plain strings so components can render them directly.
 */

type SanityArrayItem = { _key?: string; _type?: string; value?: string; text?: string };

function isStringArrayItem(item: unknown): item is SanityArrayItem {
  if (typeof item !== "object" || item === null) return false;
  const obj = item as Record<string, unknown>;
  return ("value" in obj && typeof obj.value === "string") ||
         ("text" in obj && typeof obj.text === "string");
}

/** Normalize a single array: [{_key, _type, value}] → ["value"] */
export function normalizeStringArray(arr: unknown[] | undefined): string[] | undefined {
  if (!arr) return undefined;
  return arr.map((item) => {
    if (typeof item === "string") return item;
    if (isStringArrayItem(item)) return (item.value ?? item.text)!;
    return String(item);
  });
}

/**
 * Deep-normalize an object: any array property whose items look like
 * Sanity string-wrappers gets flattened to plain strings.
 */
export function normalizeSanityData<T extends Record<string, unknown>>(data: T): T {
  const result = { ...data };
  for (const key of Object.keys(result)) {
    const val = result[key];
    if (Array.isArray(val) && val.length > 0) {
      if (val.every((item) => typeof item === "string" || isStringArrayItem(item))) {
        // Flat string array
        (result as Record<string, unknown>)[key] = normalizeStringArray(val);
      } else if (val.every((item) => typeof item === "object" && item !== null && !isStringArrayItem(item))) {
        // Array of objects — recurse into each
        (result as Record<string, unknown>)[key] = val.map((item) =>
          typeof item === "object" && item !== null && !Array.isArray(item)
            ? normalizeSanityData(item as Record<string, unknown>)
            : item
        );
      }
    }
  }
  return result;
}
