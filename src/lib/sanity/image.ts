import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    const stub = { url: () => "", width: () => stub, quality: () => stub, auto: () => stub };
    return stub;
  }
  return builder.image(source);
}
