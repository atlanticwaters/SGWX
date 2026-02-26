import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sageworx.com"),
  title: {
    default: "Sageworx | Go Further. Faster.",
    template: "%s | Sageworx",
  },
  description:
    "We bring together seasoned marketing and creative experts—bespoke teams who understand your work, thrive on the challenge and deliver when it counts.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sageworx",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-sgwx-bg text-sgwx-text font-sans antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
