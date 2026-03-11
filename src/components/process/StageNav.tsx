"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "principles", label: "principles" },
  { id: "steps", label: "the six steps" },
  { id: "governance", label: "governance" },
];

export default function StageNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const firstSection = document.getElementById("principles");
      const lastSection = document.getElementById("governance");

      if (!firstSection || !lastSection) return;

      const vh = window.innerHeight;
      const firstTop = firstSection.getBoundingClientRect().top;
      const lastBottom = lastSection.getBoundingClientRect().bottom;

      setVisible(firstTop < vh * 0.8 && lastBottom > vh * 0.3);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top < vh * 0.5) {
          setActiveSection(sections[i].id);
          return;
        }
      }
      setActiveSection(null);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-6 transition-opacity duration-500 max-md:right-4 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className={`group relative h-2 w-2 rounded-full border transition-all duration-300 ${
            activeSection === section.id
              ? "scale-[1.3] border-sgwx-green bg-sgwx-green"
              : "border-sgwx-text-dim bg-transparent hover:border-sgwx-text-muted"
          }`}
          aria-label={`Scroll to ${section.label}`}
        >
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[14px] tracking-[0.2em] uppercase text-sgwx-text-dim opacity-0 transition-opacity group-hover:opacity-100 max-md:hidden">
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
