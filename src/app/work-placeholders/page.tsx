import type { Metadata } from "next";
import WorkPlaceholders from "./WorkPlaceholders";

export const metadata: Metadata = {
  title: "Work Placeholders",
  description: "Placeholder case studies with sample imagery for production graphic reference.",
  robots: { index: false, follow: false },
};

export default function WorkPlaceholdersPage() {
  return <WorkPlaceholders />;
}
