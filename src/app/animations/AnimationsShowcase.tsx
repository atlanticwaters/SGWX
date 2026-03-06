"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";

// Dynamically import Three.js components to avoid SSR issues
const AnimationCanvas = dynamic(
  () => import("@/components/animations/AnimationCanvas"),
  { ssr: false }
);
const WaveBackground = dynamic(
  () => import("@/components/animations/WaveBackground"),
  { ssr: false }
);
const CityBackground = dynamic(
  () => import("@/components/animations/CityBackground"),
  { ssr: false }
);
const NetworkBackground = dynamic(
  () => import("@/components/animations/NetworkBackground"),
  { ssr: false }
);
const DeepFieldCanvas = dynamic(
  () => import("@/components/animations/DeepFieldCanvas"),
  { ssr: false }
);

// ─── Viewport-aware wrapper ──────────────────────────────────────────────────
// Only mounts the Three.js canvas when the container is in the viewport.
// This prevents WebGL context pressure from multiple simultaneous heavy scenes.
function LazyThreePreview({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {inView && children}
    </div>
  );
}

// ─── Three.js animation entries ──────────────────────────────────────────────

interface ThreeAnimationEntry {
  name: string;
  description: string;
  file: string;
  component: React.ReactNode;
  canvasProps: {
    cameraPosition?: [number, number, number];
    cameraFov?: number;
    cameraFar?: number;
    fogColor?: number;
    fogDensity?: number;
  };
}

const threeAnimations: ThreeAnimationEntry[] = [
  {
    name: "Wave Background",
    description:
      "Ocean-like particle field with multi-layered sine waves, bloom halos, and gold accent nodes. Used on the homepage hero and process page.",
    file: "WaveBackground.tsx",
    component: <WaveBackground />,
    canvasProps: {
      cameraPosition: [-10, 28, 90],
      cameraFov: 55,
      cameraFar: 600,
      fogColor: 0x021a14,
      fogDensity: 0.01,
    },
  },
  {
    name: "City Background",
    description:
      "Wireframe city with 4 districts (Agriculture, Auto, Sports, Tech) that draw in sequentially with a construction spark trail. Used on model page.",
    file: "CityBackground.tsx",
    component: <CityBackground />,
    canvasProps: {
      cameraPosition: [12, 155, 220],
      cameraFov: 58,
      cameraFar: 600,
      fogColor: 0x020e09,
      fogDensity: 0.008,
    },
  },
  {
    name: "Network Background",
    description:
      "Dynamic network graph with drifting nodes, proximity-based edges, traveling pulses, and gold accent nodes. Used on work page.",
    file: "NetworkBackground.tsx",
    component: <NetworkBackground />,
    canvasProps: {
      cameraPosition: [0, 0, 90],
      cameraFov: 58,
      cameraFar: 400,
      fogColor: 0x020e09,
      fogDensity: 0.012,
    },
  },
];

// ─── Deep Field entries ──────────────────────────────────────────────────────

interface DeepFieldEntry {
  variant: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  subtitle: string;
  description: string;
  file: string;
  technique: string;
  bgColor: string;
}

const deepFields: DeepFieldEntry[] = [
  {
    variant: 1,
    name: "Bioluminescent Tide",
    subtitle: "Deep Field 01",
    description:
      "Warm teal and gold bioluminescent pools drifting like deep-ocean organisms. Large, slow foundation pools layered with faster gold/yellow-green accent sparks. Screen-blended with radial depth crush.",
    file: "deep-field-01.html",
    technique: "15 radial gradient pools, screen blending, multiply depth crush + atmospheric band",
    bgColor: "#010e0a",
  },
  {
    variant: 2,
    name: "Abyssal Blue",
    subtitle: "Deep Field 02",
    description:
      "Nearly-black deep ocean blue with cold cyan fissures and faint teal undercurrent. Very slow, large mass pools create a pressurized underwater feel. Icy white-blue micro sparks punctuate the darkness.",
    file: "deep-field-02.html",
    technique: "15 pools with tighter falloff, cool blue depth crush, heavy top-down atmospheric pressure",
    bgColor: "#01080f",
  },
  {
    variant: 3,
    name: "Lime Surge",
    subtitle: "Deep Field 03",
    description:
      "High-voltage lime and yellow-green energy radiating from a dark forest green base. Electric yellow-white hot spots pulse rapidly against slow-moving foundation layers. A single teal undertone adds depth.",
    file: "deep-field-03.html",
    technique: "16 pools in 4 tiers (base, mid, surge, electric), warm green depth crush",
    bgColor: "#020e04",
  },
  {
    variant: 4,
    name: "Sparse Void",
    subtitle: "Deep Field 04",
    description:
      "The most complex variant. Three distinct pool layers (tectonic slabs, mid pools, vivid accents) with independent opacity sinusoids that shift the composition over 2\u20134 minute horizons. Elliptical temperature bands create color climate regions.",
    file: "deep-field-04.html",
    technique: "4 elliptical bands + 4 tectonic + 9 mid + 8 accent pools, per-pool opacity cycling",
    bgColor: "#010c09",
  },
  {
    variant: 5,
    name: "Dense Interference",
    subtitle: "Deep Field 05",
    description:
      "22 tightly-packed pools with crisp edges create visible moir\u00e9-like interference patterns as they overlap. Tighter gradient falloff than other variants produces sharper color boundaries and more complex visual texture.",
    file: "deep-field-05.html",
    technique: "22 dense pools with tight falloff, per-pool amplitude array, screen interference",
    bgColor: "#010f0b",
  },
  {
    variant: 6,
    name: "Thermal Drift",
    subtitle: "Deep Field 06",
    description:
      "Thermal convection simulation. Cold blue-teal pools anchor the ceiling, while hot gold-green pools anchor the base. Rising plumes drift upward with vertical bias, creating a convection current feel. Apex sparks appear where thermals reach the top.",
    file: "deep-field-06.html",
    technique: "18 pools with directional ampX/ampY/bias, vertical thermal drift, cool-top warm-bottom depth",
    bgColor: "#010d08",
  },
];

interface AnimationsShowcaseProps {
  headerHeading?: string;
  headerSubheading?: string;
  threeAnimations?: { name: string; description: string; fileName: string }[];
  deepFields?: { variant: number; name: string; subtitle: string; description: string; technique: string; bgColor: string }[];
}

export default function AnimationsShowcase({ headerHeading, headerSubheading, threeAnimations: cmsThree, deepFields: cmsDeep }: AnimationsShowcaseProps) {
  // Merge CMS descriptive text with code-coupled data
  const mergedThree = threeAnimations.map((anim, i) => {
    const cms = cmsThree?.[i];
    return {
      ...anim,
      name: cms?.name ?? anim.name,
      description: cms?.description ?? anim.description,
      file: cms?.fileName ?? anim.file,
    };
  });

  const mergedDeep = deepFields.map((df, i) => {
    const cms = cmsDeep?.find((c) => c.variant === df.variant) ?? cmsDeep?.[i];
    return {
      ...df,
      name: cms?.name ?? df.name,
      subtitle: cms?.subtitle ?? df.subtitle,
      description: cms?.description ?? df.description,
      technique: cms?.technique ?? df.technique,
      bgColor: cms?.bgColor ?? df.bgColor,
    };
  });
  return (
    <div className="min-h-screen bg-sgwx-bg py-16 md:py-24">
      <Container>
        {/* Header */}
        <AnimatedSection>
          <Badge className="mb-4">Internal Reference</Badge>
          <h1 className="text-4xl font-normal tracking-tight text-sgwx-text md:text-5xl">
            {headerHeading ?? "Animation Library"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sgwx-text-muted">
            {headerSubheading ?? "All background animations compiled for the SGWX site. Each preview renders at 500\u00d7500px. Use these to assign animations to page backgrounds and sections."}
          </p>
        </AnimatedSection>

        {/* ─── Three.js 3D Backgrounds ─────────────────────────────────────── */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />

        <AnimatedSection>
          <h2 className="font-mono text-[10px] tracking-widest uppercase text-sgwx-green">
            Three.js / WebGL
          </h2>
          <p className="mt-2 text-sm text-sgwx-text-muted">
            3D particle and geometry systems rendered with React Three Fiber. Used as full-viewport hero backgrounds.
          </p>
        </AnimatedSection>

        <div className="mt-10 space-y-16">
          {mergedThree.map((anim, i) => (
            <AnimatedSection key={anim.name} delay={i * 0.1}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                {/* Preview container — 500x500 */}
                <div
                  className="relative isolate shrink-0 overflow-hidden rounded-2xl border border-sgwx-border bg-sgwx-bg"
                  style={{ width: 500, height: 500 }}
                >
                  <LazyThreePreview>
                    <AnimationCanvas
                      className="!z-0"
                      cameraPosition={anim.canvasProps.cameraPosition}
                      cameraFov={anim.canvasProps.cameraFov}
                      cameraFar={anim.canvasProps.cameraFar}
                      fogColor={anim.canvasProps.fogColor}
                      fogDensity={anim.canvasProps.fogDensity}
                    >
                      {anim.component}
                    </AnimationCanvas>
                  </LazyThreePreview>
                  {/* Label overlay */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-sgwx-bg/80 to-transparent px-5 pb-4 pt-10">
                    <span className="font-mono text-xs tracking-wider text-sgwx-green">
                      {anim.file}
                    </span>
                  </div>
                </div>

                {/* Info panel */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-normal tracking-tight text-sgwx-text">
                    {anim.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-sgwx-text-muted">
                    {anim.description}
                  </p>

                  {/* Technical details */}
                  <div className="mt-6 space-y-3">
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                      Canvas Configuration
                    </h4>
                    <div className="rounded-lg border border-sgwx-border-subtle bg-sgwx-bg-alt p-4 font-mono text-xs leading-relaxed text-sgwx-text-muted">
                      <div>
                        <span className="text-sgwx-text-dim">cameraPosition:</span>{" "}
                        <span className="text-sgwx-cyan">
                          [{anim.canvasProps.cameraPosition?.join(", ")}]
                        </span>
                      </div>
                      <div>
                        <span className="text-sgwx-text-dim">cameraFov:</span>{" "}
                        <span className="text-sgwx-yellow">{anim.canvasProps.cameraFov}</span>
                      </div>
                      <div>
                        <span className="text-sgwx-text-dim">cameraFar:</span>{" "}
                        <span className="text-sgwx-yellow">{anim.canvasProps.cameraFar}</span>
                      </div>
                      <div>
                        <span className="text-sgwx-text-dim">fogColor:</span>{" "}
                        <span className="text-sgwx-green">
                          0x{anim.canvasProps.fogColor?.toString(16).padStart(6, "0")}
                        </span>
                      </div>
                      <div>
                        <span className="text-sgwx-text-dim">fogDensity:</span>{" "}
                        <span className="text-sgwx-yellow">{anim.canvasProps.fogDensity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ─── Deep Fields (Canvas 2D) ─────────────────────────────────────── */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-sgwx-border to-transparent" />

        <AnimatedSection>
          <h2 className="font-mono text-[10px] tracking-widest uppercase text-sgwx-cyan">
            Deep Fields / Canvas 2D
          </h2>
          <p className="mt-2 text-sm text-sgwx-text-muted">
            Ambient color field animations using 2D canvas with radial gradient pools, screen blending, and depth crush layers.
            Ideal for section backgrounds, cards, and atmospheric overlays.
          </p>
        </AnimatedSection>

        <div className="mt-10 space-y-16">
          {mergedDeep.map((df, i) => (
            <AnimatedSection key={df.variant} delay={i * 0.08}>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                {/* Preview container — 500x500 */}
                <div
                  className="relative shrink-0 overflow-hidden rounded-2xl border border-sgwx-border"
                  style={{ width: 500, height: 500 }}
                >
                  <DeepFieldCanvas variant={df.variant} size={500} />
                  {/* Grain overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-screen"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: "200px 200px",
                    }}
                  />
                  {/* Vignette overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse 85% 75% at 50% 50%, transparent 28%, rgba(1,14,10,0.55) 68%, ${df.bgColor} 100%)`,
                    }}
                  />
                  {/* Label overlay */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sgwx-bg/80 to-transparent px-5 pb-4 pt-10">
                    <span className="font-mono text-xs tracking-wider text-sgwx-cyan">
                      {df.file}
                    </span>
                  </div>
                </div>

                {/* Info panel */}
                <div className="flex-1 pt-2">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                    {df.subtitle}
                  </p>
                  <h3 className="mt-1 text-2xl font-normal tracking-tight text-sgwx-text">
                    {df.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-sgwx-text-muted">
                    {df.description}
                  </p>

                  {/* Technical details */}
                  <div className="mt-6 space-y-3">
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-sgwx-text-dim">
                      Technique
                    </h4>
                    <div className="rounded-lg border border-sgwx-border-subtle bg-sgwx-bg-alt p-4 font-mono text-xs leading-relaxed text-sgwx-text-muted">
                      <div>{df.technique}</div>
                      <div className="mt-2">
                        <span className="text-sgwx-text-dim">bgColor:</span>{" "}
                        <span className="text-sgwx-cyan">{df.bgColor}</span>
                        <span
                          className="ml-2 inline-block h-3 w-3 rounded-sm border border-sgwx-border-subtle"
                          style={{ backgroundColor: df.bgColor }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </div>
  );
}
