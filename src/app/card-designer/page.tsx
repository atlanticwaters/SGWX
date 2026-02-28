import type { Metadata } from "next";
import { getAllCardStyles } from "@/lib/sanity/queries";
import CardDesignerClient from "./CardDesignerClient";

export const metadata: Metadata = {
  title: "Card Designer",
  description: "Visual card style editor — adjust and save card component styles.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CardDesignerPage() {
  const styles = await getAllCardStyles();
  return <CardDesignerClient initialStyles={styles} />;
}
