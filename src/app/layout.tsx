import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import { getSiteSettings } from "@/lib/sanity/queries";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const fallbackMeta = {
  title: "Sageworx | Go Further. Faster.",
  description:
    "We bring together seasoned marketing and creative experts\u2014bespoke teams who understand your work, thrive on the challenge and deliver when it counts.",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL("https://sageworx.com"),
    title: {
      default: settings?.siteTitle ?? fallbackMeta.title,
      template: "%s | Sageworx",
    },
    description: settings?.description ?? fallbackMeta.description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Sageworx",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  // Split navigation into regular items and CTA
  const allNav = settings?.navigation ?? [];
  const navItems = allNav.filter((n) => !n.isCta).map(({ label, href }) => ({ label, href }));
  const ctaItem = allNav.find((n) => n.isCta);

  // Footer links mirror nav items (non-CTA)
  const footerLinks = navItems.length > 0 ? navItems : undefined;
  const footerCopyright = settings?.footer?.copyright;

  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-sgwx-bg text-sgwx-text font-sans antialiased">
        <SiteShell
          navItems={navItems.length > 0 ? navItems : undefined}
          ctaLabel={ctaItem?.label}
          ctaHref={ctaItem?.href}
          footerLinks={footerLinks}
          footerCopyright={footerCopyright}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
