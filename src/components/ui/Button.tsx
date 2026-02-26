import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-sgwx-green text-sgwx-bg font-semibold hover:bg-sgwx-green-bright hover:shadow-[0_0_24px_rgba(48,255,136,0.28)] transition-all",
  secondary:
    "border border-sgwx-green text-sgwx-green hover:bg-sgwx-green/10 hover:shadow-[0_0_20px_rgba(23,168,107,0.18)] transition-all",
  ghost:
    "text-sgwx-text-muted hover:text-sgwx-text transition-colors",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button">) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm tracking-widest uppercase ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
