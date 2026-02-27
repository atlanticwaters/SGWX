interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-sgwx-border bg-sgwx-surface p-6 ${
        hover ? "transition-all duration-300 hover:border-sgwx-green/30 hover:bg-sgwx-surface-hover hover:shadow-[0_0_30px_rgba(110,168,127,0.08)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
