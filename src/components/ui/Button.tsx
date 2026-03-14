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
    "bg-sgwx-green text-sgwx-bg font-semibold hover:bg-sgwx-green-bright hover:animate-[pulse-glow-primary_2s_ease-in-out_infinite] transition-all",
  secondary:
    "border border-sgwx-green text-sgwx-green hover:bg-sgwx-green/10 hover:animate-[pulse-glow-secondary_2s_ease-in-out_infinite] transition-all",
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
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-sm tracking-widest uppercase ${variants[variant]} ${className}`;

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
