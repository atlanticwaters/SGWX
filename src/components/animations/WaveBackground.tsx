"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ───────────────────────────────────────────────────────────────
const COLS_DESKTOP = 110;
const ROWS_DESKTOP = 80;
const COLS_MOBILE = 60;
const ROWS_MOBILE = 44;
const SPACING = 1.8;
const BLOB_COUNT = 10;

// ─── Wave function ───────────────────────────────────────────────────────────
function waveHeight(x: number, z: number, t: number, W: number, D: number) {
  const nx = x / W,
    nz = z / D;
  const w1 = Math.sin(nx * 6.0 + nz * 3.5 - t * 1.1) * 7.0;
  const w2 = Math.sin(nx * 12.0 - nz * 5.0 + t * 0.7) * 3.2;
  const w3 = Math.sin(nx * 22.0 + nz * 18.0 - t * 1.8) * 1.1;
  const w4 = Math.sin((nx + nz) * 4.5 + t * 0.4) * 4.5;
  return w1 + w2 + w3 + w4;
}
const HMIN = -(7.0 + 3.2 + 1.1 + 4.5);
const HMAX = 7.0 + 3.2 + 1.1 + 4.5;

// ─── Main particle shader ────────────────────────────────────────────────────
const mainVertexShader = /* glsl */ `
  attribute float aHeight;
  attribute float aHue;
  attribute float aGold;
  varying float vH;
  varying float vHue;
  varying float vGold;
  void main() {
    vH    = aHeight;
    vHue  = aHue;
    vGold = aGold;
    // Crests: big and bold. Troughs still visible — not invisible.
    float sz = mix(1.8, 8.5, aHeight) * mix(1.0, 2.4, aGold);
    gl_PointSize = sz;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const mainFragmentShader = /* glsl */ `
  varying float vH;
  varying float vHue;
  varying float vGold;

  // Simple 3-stop color ramp per channel
  vec3 ramp(float h, vec3 a, vec3 b, vec3 c) {
    return h < 0.5 ? mix(a, b, h * 2.0) : mix(b, c, (h - 0.5) * 2.0);
  }

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, 0.18, d);
    float halo = 1.0 - smoothstep(0.1,  0.5,  d);
    float brightness = core * 1.0 + halo * 0.5;

    // Three hue bands across the grid:
    // band~0 -> deep ocean blue-green
    // band~0.5 -> vivid emerald / lime green
    // band~1 -> warm yellow-green
    vec3 troughA = vec3(0.02, 0.20, 0.35);   // deep blue-teal
    vec3 troughB = vec3(0.03, 0.30, 0.18);   // dark emerald
    vec3 troughC = vec3(0.10, 0.28, 0.06);   // dark olive

    vec3 midA    = vec3(0.04, 0.55, 0.82);   // bright cyan-blue
    vec3 midB    = vec3(0.08, 0.80, 0.42);   // vivid green
    vec3 midC    = vec3(0.42, 0.85, 0.12);   // lime

    vec3 crestA  = vec3(0.45, 0.95, 1.00);   // ice blue-white
    vec3 crestB  = vec3(0.70, 1.00, 0.72);   // bright mint-white
    vec3 crestC  = vec3(0.98, 1.00, 0.55);   // hot yellow-white

    vec3 trough  = ramp(vHue, troughA, troughB, troughC);
    vec3 mid     = ramp(vHue, midA,    midB,    midC);
    vec3 crest   = ramp(vHue, crestA,  crestB,  crestC);

    // Wave height drives brightness up the ramp
    vec3 waveCol = vH < 0.5
      ? mix(trough, mid,   vH * 2.0)
      : mix(mid,   crest, (vH - 0.5) * 2.0);

    // Gold nodes override to warm yellow, brightest at crests
    vec3 goldCol = mix(vec3(0.6, 0.4, 0.05), vec3(1.0, 0.92, 0.28), vH);
    vec3 col = mix(waveCol, goldCol, vGold);

    // Troughs are now 50% alpha (was 35%), crests hit 1.0
    float alpha = brightness * mix(0.50, 1.0, vH) * mix(1.0, 1.5, vGold);
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

// ─── Bloom halo shader ───────────────────────────────────────────────────────
const bloomVertexShader = /* glsl */ `
  attribute float aHeight;
  attribute float aHue;
  varying float vH;
  varying float vHue;
  void main() {
    vH   = aHeight;
    vHue = aHue;
    // Bloom halos only appear on the upper half of the wave
    gl_PointSize = mix(0.0, 42.0, pow(max(0.0, aHeight - 0.3) / 0.7, 2.0));
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const bloomFragmentShader = /* glsl */ `
  varying float vH;
  varying float vHue;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv) * 2.0;
    float a  = pow(1.0 - smoothstep(0.0, 1.0, d), 2.2) * vH * 0.30;

    // Match hue bands of main layer
    vec3 colA = vec3(0.04, 0.60, 0.90);   // cyan
    vec3 colB = vec3(0.12, 0.90, 0.45);   // green
    vec3 colC = vec3(0.80, 1.00, 0.30);   // yellow-lime
    vec3 col  = vHue < 0.5
      ? mix(colA, colB, vHue * 2.0)
      : mix(colB, colC, (vHue - 0.5) * 2.0);

    gl_FragColor = vec4(col, a);
  }
`;

// ─── Blob shader ─────────────────────────────────────────────────────────────
const blobVertexShader = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  varying float vPhase;
  attribute float aHue;
  varying float vHue;
  void main() {
    vPhase = aPhase;
    vHue   = aHue;
    float breathe = 1.0 + 0.15 * sin(uTime * 0.35 + aPhase);
    gl_PointSize = 380.0 * breathe;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const blobFragmentShader = /* glsl */ `
  varying float vPhase;
  varying float vHue;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv) * 2.0;
    float a  = pow(1.0 - smoothstep(0.0, 1.0, d), 3.0) * 0.28;
    // Vivid blob colors keyed to hue band
    vec3 colA = vec3(0.02, 0.30, 0.28);  // deep teal
    vec3 colB = vec3(0.04, 0.35, 0.12);  // deep green
    vec3 colC = vec3(0.12, 0.28, 0.04);  // olive-dark
    vec3 col  = vHue < 0.5
      ? mix(colA, colB, vHue * 2.0)
      : mix(colB, colC, (vHue - 0.5) * 2.0);
    gl_FragColor = vec4(col, a);
  }
`;

// ─── Component ───────────────────────────────────────────────────────────────

export default function WaveBackground() {
  const { camera } = useThree();

  // Mobile optimization: reduce grid size
  const isMobile = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return true;
    }
    return false;
  }, []);

  const COLS = isMobile ? COLS_MOBILE : COLS_DESKTOP;
  const ROWS = isMobile ? ROWS_MOBILE : ROWS_DESKTOP;
  const W = COLS * SPACING;
  const D = ROWS * SPACING;
  const COUNT = COLS * ROWS;
  const SPARSE = Math.floor(COUNT / 14);

  // ─── Mutable state ref ──────────────────────────────────────────────────
  const stateRef = useRef({
    t: 0,
    mouseX: 0,
    mouseY: 0,
  });

  // ─── Mouse tracking ───────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX =
        (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY =
        (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ─── Main grid buffers ────────────────────────────────────────────────
  const gridData = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const heights = new Float32Array(COUNT);
    const hueBand = new Float32Array(COUNT);
    const isGold = new Float32Array(COUNT);
    const baseX = new Float32Array(COUNT);
    const baseZ = new Float32Array(COUNT);

    let idx = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = (col / (COLS - 1) - 0.5) * W;
        const z = (row / (ROWS - 1) - 0.5) * D - 20;
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;

        baseX[idx] = x;
        baseZ[idx] = z;

        // Hue band: slow diagonal gradient across the grid (0->1)
        hueBand[idx] =
          (col / COLS) * 0.6 +
          (row / ROWS) * 0.4 +
          Math.random() * 0.12;
        hueBand[idx] = Math.min(1.0, Math.max(0.0, hueBand[idx]));

        const cBias = 1 - Math.abs(col / COLS - 0.5) * 2;
        isGold[idx] =
          Math.random() < 0.08 * (0.4 + cBias) ? 1 : 0;
        idx++;
      }
    }

    return { positions, heights, hueBand, isGold, baseX, baseZ };
  }, [COLS, ROWS, W, D, COUNT]);

  // ─── Bloom (sparse) buffers ───────────────────────────────────────────
  const bloomData = useMemo(() => {
    const sPos = new Float32Array(SPARSE * 3);
    const sH = new Float32Array(SPARSE);
    const sHue = new Float32Array(SPARSE);
    const sparseIdx = Array.from({ length: SPARSE }, () =>
      Math.floor(Math.random() * COUNT),
    );

    // Pre-populate sHue from main hueBand
    for (let s = 0; s < SPARSE; s++) {
      sHue[s] = gridData.hueBand[sparseIdx[s]];
    }

    return { sPos, sH, sHue, sparseIdx };
  }, [SPARSE, COUNT, gridData.hueBand]);

  // ─── Blob buffers ────────────────────────────────────────────────────
  const blobData = useMemo(() => {
    const bPos = new Float32Array(BLOB_COUNT * 3);
    const bHue = new Float32Array(BLOB_COUNT);
    const bPhase = new Float32Array(BLOB_COUNT);
    for (let i = 0; i < BLOB_COUNT; i++) {
      bPos[i * 3] = (Math.random() - 0.5) * W * 0.85;
      bPos[i * 3 + 1] = (Math.random() - 0.5) * 15 - 5;
      bPos[i * 3 + 2] = (Math.random() - 0.5) * D * 0.6 - 20;
      bHue[i] = Math.random();
      bPhase[i] = Math.random() * Math.PI * 2;
    }
    return { bPos, bHue, bPhase };
  }, [W, D]);

  // ─── Geometry refs ────────────────────────────────────────────────────
  const mainGeoRef = useRef<THREE.BufferGeometry>(null);
  const bloomGeoRef = useRef<THREE.BufferGeometry>(null);
  const mainMatRef = useRef<THREE.ShaderMaterial>(null);
  const blobMatRef = useRef<THREE.ShaderMaterial>(null);

  // ─── Camera target ─────────────────────────────────────────────────────
  const camLookTarget = useMemo(() => new THREE.Vector3(0, -6, -30), []);

  // ─── Animation loop ───────────────────────────────────────────────────
  useFrame(() => {
    const state = stateRef.current;
    state.t += 0.006;
    const t = state.t;

    // Update shader uniforms
    if (mainMatRef.current) {
      mainMatRef.current.uniforms.uTime.value = t;
    }
    if (blobMatRef.current) {
      blobMatRef.current.uniforms.uTime.value = t;
    }

    // ─── Update main grid positions and heights ─────────────────────
    const mainGeo = mainGeoRef.current;
    if (mainGeo) {
      const posAttr = mainGeo.attributes
        .position as THREE.BufferAttribute;
      const hAttr = mainGeo.attributes
        .aHeight as THREE.BufferAttribute;

      for (let i = 0; i < COUNT; i++) {
        const h = waveHeight(
          gridData.baseX[i],
          gridData.baseZ[i],
          t,
          W,
          D,
        );
        const hn = (h - HMIN) / (HMAX - HMIN);
        posAttr.setY(i, h);
        hAttr.setX(i, hn);
      }
      posAttr.needsUpdate = true;
      hAttr.needsUpdate = true;

      // ─── Sync bloom (sparse) layer ──────────────────────────────
      const bloomGeo = bloomGeoRef.current;
      if (bloomGeo) {
        const sp = bloomGeo.attributes
          .position as THREE.BufferAttribute;
        const shA = bloomGeo.attributes
          .aHeight as THREE.BufferAttribute;

        for (let s = 0; s < SPARSE; s++) {
          const i = bloomData.sparseIdx[s];
          sp.setXYZ(
            s,
            gridData.baseX[i],
            posAttr.getY(i) + 0.6,
            gridData.baseZ[i],
          );
          shA.setX(s, hAttr.getX(i));
        }
        sp.needsUpdate = true;
        shA.needsUpdate = true;
      }
    }

    // ─── Camera drift ─────────────────────────────────────────────────
    const mouse = state;
    const camX = -10 + mouse.mouseX * 6 + Math.sin(t * 0.12) * 5;
    const camY = 28 - mouse.mouseY * 4 + Math.sin(t * 0.07) * 2;
    const camZ = 90 + Math.cos(t * 0.09) * 8;
    camera.position.x += (camX - camera.position.x) * 0.03;
    camera.position.y += (camY - camera.position.y) * 0.03;
    camera.position.z += (camZ - camera.position.z) * 0.03;

    camLookTarget.set(mouse.mouseX * 3, -6 + mouse.mouseY * 2, -30);
    camera.lookAt(camLookTarget);
  });

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <group>
      {/* Deep background ambient glow blobs */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[blobData.bPos, 3]}
          />
          <bufferAttribute
            attach="attributes-aHue"
            args={[blobData.bHue, 1]}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[blobData.bPhase, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={blobMatRef}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main particle grid */}
      <points>
        <bufferGeometry ref={mainGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[gridData.positions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-aHeight"
            args={[gridData.heights, 1]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-aHue"
            args={[gridData.hueBand, 1]}
          />
          <bufferAttribute
            attach="attributes-aGold"
            args={[gridData.isGold, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={mainMatRef}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={mainVertexShader}
          fragmentShader={mainFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Bloom halo layer */}
      <points>
        <bufferGeometry ref={bloomGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[bloomData.sPos, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-aHeight"
            args={[bloomData.sH, 1]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-aHue"
            args={[bloomData.sHue, 1]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{}}
          vertexShader={bloomVertexShader}
          fragmentShader={bloomFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
