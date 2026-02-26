"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ───────────────────────────────────────────────────────────────
const NODE_COUNT_DESKTOP = 160;
const NODE_COUNT_MOBILE = 96;
const FIELD = 120;
const CONNECT_DIST = 24;
const MAX_LINES_FACTOR = 10; // MAX_LINES = nodeCount * 10
const PULSE_COUNT = 40;
const BLOB_COUNT = 8;

// ─── Shader sources ─────────────────────────────────────────────────────────

const nodeVertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aPhase;
  attribute float aSize;
  attribute float aGold;
  varying float vGold;
  varying float vAlpha;
  void main() {
    vGold  = aGold;
    float pulse = 0.6 + 0.4 * sin(uTime * 1.2 + aPhase);
    vAlpha = pulse;
    float sz = mix(3.0, 9.0, aSize) * mix(1.0, 1.6, aGold) * pulse;
    gl_PointSize = sz;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nodeFragmentShader = /* glsl */ `
  varying float vGold;
  varying float vAlpha;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;
    float core = 1.0 - smoothstep(0.0, 0.25, d);
    float glow = 1.0 - smoothstep(0.15, 0.5, d);
    vec3 greenCol = vec3(0.08, 0.72, 0.44);
    vec3 blueCol  = vec3(0.05, 0.42, 0.52);
    vec3 goldCol  = vec3(0.94, 0.87, 0.22);
    vec3 col = mix(mix(greenCol, blueCol, 0.4), goldCol, vGold);
    float a = (core * 0.9 + glow * 0.35) * vAlpha;
    gl_FragColor = vec4(col, a);
  }
`;

const pulseVertexShader = /* glsl */ `
  attribute float aAlpha;
  attribute float aGold;
  varying float vAlpha;
  varying float vGold;
  void main() {
    vAlpha = aAlpha;
    vGold  = aGold;
    gl_PointSize = mix(5.0, 11.0, aGold);
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const pulseFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vGold;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    vec3 greenCol = vec3(0.15, 0.95, 0.55);
    vec3 goldCol  = vec3(1.0,  0.92, 0.25);
    gl_FragColor  = vec4(mix(greenCol, goldCol, vGold), glow * vAlpha * 0.9);
  }
`;

const glowVertexShader = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  varying float vPhase;
  void main() {
    vPhase = aPhase;
    float breathe = 1.0 + 0.12 * sin(uTime * 0.4 + aPhase);
    gl_PointSize = 280.0 * breathe;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = /* glsl */ `
  varying float vPhase;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv) * 2.0;
    float a  = 1.0 - smoothstep(0.0, 1.0, d);
    a = pow(a, 3.0) * 0.18;
    float t = sin(vPhase) * 0.5 + 0.5;
    vec3 col = mix(vec3(0.02, 0.28, 0.22), vec3(0.03, 0.18, 0.35), t);
    gl_FragColor = vec4(col, a);
  }
`;

// ─── Node data type ──────────────────────────────────────────────────────────

interface NodeData {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  phase: number;
  freq: number;
  size: number;
  isGold: boolean;
}

interface PulseData {
  a: number;
  b: number;
  t: number;
  speed: number;
  isGold: boolean;
}

interface ActiveEdge {
  a: number;
  b: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function NetworkBackground() {
  const { camera } = useThree();

  // Determine node count based on viewport width (mobile optimization)
  const nodeCount = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return NODE_COUNT_MOBILE;
    }
    return NODE_COUNT_DESKTOP;
  }, []);

  const maxLines = nodeCount * MAX_LINES_FACTOR;

  // ─── Mutable state refs ──────────────────────────────────────────────────
  const stateRef = useRef({
    t: 0,
    lastSpawn: 0,
    camTheta: 0,
    mouseX: 0,
    mouseY: 0,
    pulses: [] as PulseData[],
    activeEdges: [] as ActiveEdge[],
  });

  // ─── Initialize node data ───────────────────────────────────────────────
  const nodes = useMemo<NodeData[]>(() => {
    return Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * FIELD,
      y: (Math.random() - 0.5) * FIELD,
      z: (Math.random() - 0.5) * FIELD * 0.5,
      vx: (Math.random() - 0.5) * 0.03,
      vy: (Math.random() - 0.5) * 0.03,
      vz: (Math.random() - 0.5) * 0.015,
      phase: Math.random() * Math.PI * 2,
      freq: 0.3 + Math.random() * 0.7,
      size: Math.random(),
      isGold: Math.random() < 0.07,
    }));
  }, [nodeCount]);

  // ─── Node geometry buffers ─────────────────────────────────────────────
  const nodeBuffers = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const phases = new Float32Array(nodeCount);
    const sizes = new Float32Array(nodeCount);
    const golds = new Float32Array(nodeCount);

    nodes.forEach((n, i) => {
      positions[i * 3] = n.x;
      positions[i * 3 + 1] = n.y;
      positions[i * 3 + 2] = n.z;
      phases[i] = n.phase;
      sizes[i] = n.size;
      golds[i] = n.isGold ? 1 : 0;
    });

    return { positions, phases, sizes, golds };
  }, [nodes, nodeCount]);

  // ─── Edge geometry buffers ─────────────────────────────────────────────
  const edgeBuffers = useMemo(() => {
    const positions = new Float32Array(maxLines * 6);
    const colors = new Float32Array(maxLines * 6);
    return { positions, colors };
  }, [maxLines]);

  // ─── Pulse geometry buffers ────────────────────────────────────────────
  const pulseBuffers = useMemo(() => {
    const positions = new Float32Array(PULSE_COUNT * 3);
    const alphas = new Float32Array(PULSE_COUNT);
    const golds = new Float32Array(PULSE_COUNT);
    return { positions, alphas, golds };
  }, []);

  // ─── Glow blob geometry buffers ────────────────────────────────────────
  const glowBuffers = useMemo(() => {
    const positions = new Float32Array(BLOB_COUNT * 3);
    const phases = new Float32Array(BLOB_COUNT);
    for (let i = 0; i < BLOB_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD * 0.9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD * 0.9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, []);

  // ─── Refs for Three.js objects ─────────────────────────────────────────
  const nodeGeoRef = useRef<THREE.BufferGeometry>(null);
  const edgeGeoRef = useRef<THREE.BufferGeometry>(null);
  const pulseGeoRef = useRef<THREE.BufferGeometry>(null);
  const nodeMatRef = useRef<THREE.ShaderMaterial>(null);
  const glowMatRef = useRef<THREE.ShaderMaterial>(null);

  // ─── Camera target (always look at origin) ────────────────────────────
  const camTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

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

  // ─── Spawn pulse helper ────────────────────────────────────────────────
  const spawnPulse = () => {
    const state = stateRef.current;
    if (
      state.pulses.length >= PULSE_COUNT ||
      state.activeEdges.length === 0
    )
      return;
    const edge =
      state.activeEdges[
        Math.floor(Math.random() * state.activeEdges.length)
      ];
    if (!edge) return;
    state.pulses.push({
      a: edge.a,
      b: edge.b,
      t: 0,
      speed: 0.004 + Math.random() * 0.008,
      isGold: nodes[edge.a].isGold || nodes[edge.b].isGold,
    });
  };

  // ─── Animation loop ───────────────────────────────────────────────────
  useFrame(() => {
    const state = stateRef.current;
    state.t += 0.007;
    const t = state.t;

    // Update shader uniforms
    if (nodeMatRef.current) {
      nodeMatRef.current.uniforms.uTime.value = t;
    }
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uTime.value = t;
    }

    // ─── Move nodes ────────────────────────────────────────────────────
    const nodeGeo = nodeGeoRef.current;
    if (nodeGeo) {
      const posAttr = nodeGeo.attributes
        .position as THREE.BufferAttribute;
      const h = FIELD * 0.5;

      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.x +=
          Math.sin(t * n.freq + n.phase) * 0.022 + n.vx;
        n.y +=
          Math.cos(t * n.freq * 0.8 + n.phase + 1.3) * 0.022 + n.vy;
        n.z +=
          Math.sin(t * n.freq * 0.5 + n.phase + 2.7) * 0.01;

        if (n.x > h) n.x -= FIELD;
        if (n.x < -h) n.x += FIELD;
        if (n.y > h) n.y -= FIELD;
        if (n.y < -h) n.y += FIELD;

        posAttr.setXYZ(i, n.x, n.y, n.z);
      }
      posAttr.needsUpdate = true;
    }

    // ─── Rebuild edges ─────────────────────────────────────────────────
    const edgeGeo = edgeGeoRef.current;
    if (edgeGeo) {
      state.activeEdges.length = 0;
      let ei = 0;
      const ep = edgeGeo.attributes.position as THREE.BufferAttribute;
      const ec = edgeGeo.attributes.color as THREE.BufferAttribute;

      for (let a = 0; a < nodeCount && ei < maxLines; a++) {
        for (let b = a + 1; b < nodeCount && ei < maxLines; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const dz = nodes[a].z - nodes[b].z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECT_DIST) {
            const fade = Math.pow(1 - dist / CONNECT_DIST, 1.6);
            state.activeEdges.push({ a, b });
            const gold =
              nodes[a].isGold || nodes[b].isGold ? 1 : 0;
            const r = gold ? 0.55 * fade : 0.04 * fade;
            const g = gold ? 0.6 * fade : 0.55 * fade;
            const bl = gold ? 0.08 * fade : 0.42 * fade;

            ep.setXYZ(ei * 2, nodes[a].x, nodes[a].y, nodes[a].z);
            ep.setXYZ(
              ei * 2 + 1,
              nodes[b].x,
              nodes[b].y,
              nodes[b].z,
            );
            ec.setXYZ(ei * 2, r, g, bl);
            ec.setXYZ(ei * 2 + 1, r * 0.4, g * 0.4, bl * 0.4);
            ei++;
          }
        }
      }

      edgeGeo.setDrawRange(0, ei * 2);
      ep.needsUpdate = true;
      ec.needsUpdate = true;
    }

    // ─── Pulses ────────────────────────────────────────────────────────
    if (t - state.lastSpawn > 0.18) {
      spawnPulse();
      state.lastSpawn = t;
    }

    const pulseGeo = pulseGeoRef.current;
    if (pulseGeo) {
      const pp = pulseGeo.attributes.position as THREE.BufferAttribute;
      const pa = pulseGeo.attributes.aAlpha as THREE.BufferAttribute;
      const pg = pulseGeo.attributes.aGold as THREE.BufferAttribute;

      for (let i = state.pulses.length - 1; i >= 0; i--) {
        const p = state.pulses[i];
        p.t += p.speed;
        if (p.t >= 1) {
          state.pulses.splice(i, 1);
          continue;
        }
        const na = nodes[p.a];
        const nb = nodes[p.b];
        pp.setXYZ(
          i,
          na.x + (nb.x - na.x) * p.t,
          na.y + (nb.y - na.y) * p.t,
          na.z + (nb.z - na.z) * p.t,
        );
        pa.setX(i, Math.sin(p.t * Math.PI));
        pg.setX(i, p.isGold ? 1 : 0);
      }

      pulseGeo.setDrawRange(0, state.pulses.length);
      pp.needsUpdate = true;
      pa.needsUpdate = true;
      pg.needsUpdate = true;
    }

    // ─── Camera: slow auto-orbit + mouse parallax ──────────────────────
    state.camTheta += 0.0018;
    const tx =
      state.mouseX * 8 + Math.sin(state.camTheta) * 12;
    const ty =
      -state.mouseY * 5 + Math.sin(t * 0.15) * 8;
    camera.position.x += (tx - camera.position.x) * 0.025;
    camera.position.y += (ty - camera.position.y) * 0.025;
    camera.position.z = 90 + Math.sin(t * 0.08) * 6;
    camera.lookAt(camTarget);
  });

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <group>
      {/* Ambient glow blobs (rendered behind everything) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[glowBuffers.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[glowBuffers.phases, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={glowMatRef}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Edges (line segments) */}
      <lineSegments>
        <bufferGeometry ref={edgeGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[edgeBuffers.positions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[edgeBuffers.colors, 3]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes (custom shader points) */}
      <points>
        <bufferGeometry ref={nodeGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[nodeBuffers.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aPhase"
            args={[nodeBuffers.phases, 1]}
          />
          <bufferAttribute
            attach="attributes-aSize"
            args={[nodeBuffers.sizes, 1]}
          />
          <bufferAttribute
            attach="attributes-aGold"
            args={[nodeBuffers.golds, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMatRef}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={nodeVertexShader}
          fragmentShader={nodeFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Travelling pulses */}
      <points>
        <bufferGeometry ref={pulseGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[pulseBuffers.positions, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-aAlpha"
            args={[pulseBuffers.alphas, 1]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-aGold"
            args={[pulseBuffers.golds, 1]}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{}}
          vertexShader={pulseVertexShader}
          fragmentShader={pulseFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
