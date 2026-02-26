"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface AnimationCanvasProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  cameraFar?: number;
  fogColor?: number;
  fogDensity?: number;
}

export default function AnimationCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 90],
  cameraFov = 58,
  cameraFar = 400,
  fogColor = 0x020e09,
  fogDensity = 0.012,
}: AnimationCanvasProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov, near: 0.1, far: cameraFar }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <fogExp2 attach="fog" args={[fogColor, fogDensity]} />
          {children}
        </Suspense>
      </Canvas>
      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(2,8,6,0.55) 65%, rgba(1,5,3,0.92) 100%)",
        }}
      />
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
