interface BadgeProps {
  children: React.ReactNode;
  variant?: "green" | "neutral";
  className?: string;
}

export default function Badge({ children, variant = "green", className = "" }: BadgeProps) {
  const styles = {
    green: "border-sgwx-green/30 bg-sgwx-green/10 text-sgwx-green",
    neutral: "border-sgwx-border bg-sgwx-surface text-sgwx-text-muted",
  };

  return (
    <span className={`inline-block rounded-full border px-3 py-0.5 font-mono text-[14px] tracking-widest uppercase ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
