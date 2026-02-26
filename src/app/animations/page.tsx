import type { Metadata } from "next";
import AnimationsShowcase from "./AnimationsShowcase";

export const metadata: Metadata = {
  title: "Animations Showcase",
  description: "SGWX 3D animation library — preview all available background animations.",
  robots: { index: false, follow: false },
};

export default function AnimationsPage() {
  return <AnimationsShowcase />;
}
