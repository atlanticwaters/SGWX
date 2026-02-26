export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl px-6 md:px-8 lg:px-12 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />
    </div>
  );
}
