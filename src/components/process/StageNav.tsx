"use client";

import { useEffect, useState } from "react";

const stages = [
  { id: "launch", label: "launch" },
  { id: "engage", label: "engage" },
  { id: "mobilize", label: "mobilize" },
  { id: "transform", label: "transform" },
];

export default function StageNav() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const firstStage = document.getElementById("launch");
      const closing = document.getElementById("process-closing");

      if (!firstStage || !closing) return;

      const vh = window.innerHeight;
      const firstStageTop = firstStage.getBoundingClientRect().top;
      const closingTop = closing.getBoundingClientRect().top;

      setVisible(firstStageTop < vh * 0.8 && closingTop > vh * 0.5);

      for (let i = stages.length - 1; i >= 0; i--) {
        const el = document.getElementById(stages[i].id);
        if (el && el.getBoundingClientRect().top < vh * 0.5) {
          setActiveStage(stages[i].id);
          return;
        }
      }
      setActiveStage(null);
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
      {stages.map((stage) => (
        <button
          key={stage.id}
          onClick={() => scrollTo(stage.id)}
          className={`group relative h-2 w-2 rounded-full border transition-all duration-300 ${
            activeStage === stage.id
              ? "scale-[1.3] border-sgwx-green bg-sgwx-green"
              : "border-sgwx-text-dim bg-transparent hover:border-sgwx-text-muted"
          }`}
          aria-label={`Scroll to ${stage.label}`}
        >
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] uppercase text-sgwx-text-dim opacity-0 transition-opacity group-hover:opacity-100 max-md:hidden">
            {stage.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
