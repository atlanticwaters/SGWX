import Link from "next/link";

const footerLinks = [
  { label: "Model", href: "/model" },
  { label: "Members", href: "/members" },
  { label: "Process", href: "/process" },
  { label: "Work", href: "/work" },
  { label: "Spotlights", href: "/spotlights" },
];

export default function Footer() {
  return (
    <footer className="border-t border-sgwx-border-subtle bg-sgwx-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <p className="text-sm text-sgwx-text-dim">
          &copy; {new Date().getFullYear()} Sageworx, LLC.
        </p>
        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-sgwx-text-dim transition-colors hover:text-sgwx-text-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 text-sgwx-text-dim">
          {/* Social icons - placeholder for now */}
        </div>
      </div>
    </footer>
  );
}
