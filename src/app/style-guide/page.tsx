import type { Metadata } from "next";
import StyleGuideClient from "./StyleGuideClient";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "SGWX Design System — tokens, components, and patterns.",
  robots: { index: false, follow: false },
};

export default function StyleGuidePage() {
  return <StyleGuideClient />;
}
