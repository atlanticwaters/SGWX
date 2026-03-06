"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

interface SiteShellProps {
  children: React.ReactNode;
  navItems?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  footerLinks?: { label: string; href: string }[];
  footerCopyright?: string;
}

export default function SiteShell({
  children,
  navItems,
  ctaLabel,
  ctaHref,
  footerLinks,
  footerCopyright,
}: SiteShellProps) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  return (
    <>
      <Header navItems={navItems} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      {!isStudio && <PageTransition />}
      <main className="pt-16">{children}</main>
      <Footer links={footerLinks} copyright={footerCopyright} />
    </>
  );
}
