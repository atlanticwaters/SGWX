"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Constants ───────────────────────────────────────────────────────────────
// Wide & shallow field to span the full footer viewport
const NODE_COUNT_DESKTOP = 140;
const NODE_COUNT_MOBILE = 80;
const FIELD_X = 220; // much wider
const FIELD_Y = 50; // shallow
const FIELD_Z = 30;
const CONNECT_DIST = 28;
const MAX_LINES_FACTOR = 10;
const PULSE_COUNT = 30;
const BLOB_COUNT = 10;

// ─── Shader sources ─────────────────────────────────────────────────────────

const nodeVertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aPhase;
  attribute float aSize;
  attribute float aAccent;
  varying float vAccent;
  varying float vAlpha;
  void main() {
    vAccent = aAccent;
    float pulse = 0.5 + 0.5 * sin(uTime * 0.8 + aPhase);
    vAlpha = pulse;
    float sz = mix(2.5, 7.0, aSize) * mix(1.0, 1.5, aAccent) * pulse;
    gl_PointSize = sz;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nodeFragmentShader = /* glsl */ `
  varying float vAccent;
  varying float vAlpha;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;
    float core = 1.0 - smoothstep(0.0, 0.25, d);
    float glow = 1.0 - smoothstep(0.15, 0.5, d);
    vec3 cyanCol  = vec3(0.47, 0.61, 0.66);
    vec3 blueCol  = vec3(0.12, 0.38, 0.55);
    vec3 brightCol = vec3(0.62, 0.82, 0.92);
    vec3 col = mix(mix(cyanCol, blueCol, 0.35), brightCol, vAccent);
    float a = (core * 0.85 + glow * 0.3) * vAlpha;
    gl_FragColor = vec4(col, a);
  }
`;

const pulseVertexShader = /* glsl */ `
  attribute float aAlpha;
  attribute float aAccent;
  varying float vAlpha;
  varying float vAccent;
  void main() {
    vAlpha  = aAlpha;
    vAccent = aAccent;
    gl_PointSize = mix(4.0, 9.0, aAccent);
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const pulseFragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vAccent;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    vec3 cyanCol  = vec3(0.35, 0.75, 0.85);
    vec3 brightCol = vec3(0.7, 0.9, 1.0);
    gl_FragColor  = vec4(mix(cyanCol, brightCol, vAccent), glow * vAlpha * 0.7);
  }
`;

const glowVertexShader = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  varying float vPhase;
  void main() {
    vPhase = aPhase;
    float breathe = 1.0 + 0.15 * sin(uTime * 0.3 + aPhase);
    gl_PointSize = 320.0 * breathe;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glowFragmentShader = /* glsl */ `
  varying float vPhase;
  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv) * 2.0;
    float a  = 1.0 - smoothstep(0.0, 1.0, d);
    a = pow(a, 3.0) * 0.14;
    float t = sin(vPhase) * 0.5 + 0.5;
    vec3 col = mix(vec3(0.02, 0.15, 0.28), vec3(0.04, 0.25, 0.32), t);
    gl_FragColor = vec4(col, a);
  }
`;

// ─── Node data types ─────────────────────────────────────────────────────────

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
  isAccent: boolean;
}

interface PulseData {
  a: number;
  b: number;
  t: number;
  speed: number;
  isAccent: boolean;
}

interface ActiveEdge {
  a: number;
  b: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FooterNetwork() {
  const { camera } = useThree();

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
    pulses: [] as PulseData[],
    activeEdges: [] as ActiveEdge[],
  });

  // ─── Initialize node data — wide horizontal spread ─────────────────────
  const nodes = useMemo<NodeData[]>(() => {
    return Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * FIELD_X,
      y: (Math.random() - 0.5) * FIELD_Y,
      z: (Math.random() - 0.5) * FIELD_Z,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.015,
      vz: (Math.random() - 0.5) * 0.008,
      phase: Math.random() * Math.PI * 2,
      freq: 0.2 + Math.random() * 0.5,
      size: Math.random(),
      isAccent: Math.random() < 0.1,
    }));
  }, [nodeCount]);

  // ─── Node geometry buffers ───────────────────────────────────────────────
  const nodeBuffers = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const phases = new Float32Array(nodeCount);
    const sizes = new Float32Array(nodeCount);
    const accents = new Float32Array(nodeCount);

    nodes.forEach((n, i) => {
      positions[i * 3] = n.x;
      positions[i * 3 + 1] = n.y;
      positions[i * 3 + 2] = n.z;
      phases[i] = n.phase;
      sizes[i] = n.size;
      accents[i] = n.isAccent ? 1 : 0;
    });

    return { positions, phases, sizes, accents };
  }, [nodes, nodeCount]);

  // ─── Edge geometry buffers ───────────────────────────────────────────────
  const edgeBuffers = useMemo(() => {
    const positions = new Float32Array(maxLines * 6);
    const colors = new Float32Array(maxLines * 6);
    return { positions, colors };
  }, [maxLines]);

  // ─── Pulse geometry buffers ──────────────────────────────────────────────
  const pulseBuffers = useMemo(() => {
    const positions = new Float32Array(PULSE_COUNT * 3);
    const alphas = new Float32Array(PULSE_COUNT);
    const accents = new Float32Array(PULSE_COUNT);
    return { positions, alphas, accents };
  }, []);

  // ─── Glow blob geometry buffers — spread wide ────────────────────────────
  const glowBuffers = useMemo(() => {
    const positions = new Float32Array(BLOB_COUNT * 3);
    const phases = new Float32Array(BLOB_COUNT);
    for (let i = 0; i < BLOB_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * FIELD_X * 0.85;
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_Y * 0.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, []);

  // ─── Refs for Three.js objects ───────────────────────────────────────────
  const nodeGeoRef = useRef<THREE.BufferGeometry>(null);
  const edgeGeoRef = useRef<THREE.BufferGeometry>(null);
  const pulseGeoRef = useRef<THREE.BufferGeometry>(null);
  const nodeMatRef = useRef<THREE.ShaderMaterial>(null);
  const glowMatRef = useRef<THREE.ShaderMaterial>(null);

  const camTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  // ─── Spawn pulse helper ──────────────────────────────────────────────────
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
      speed: 0.003 + Math.random() * 0.006,
      isAccent: nodes[edge.a].isAccent || nodes[edge.b].isAccent,
    });
  };

  // ─── Animation loop ─────────────────────────────────────────────────────
  useFrame(() => {
    const state = stateRef.current;
    state.t += 0.005; // slower than NetworkBackground
    const t = state.t;

    if (nodeMatRef.current) {
      nodeMatRef.current.uniforms.uTime.value = t;
    }
    if (glowMatRef.current) {
      glowMatRef.current.uniforms.uTime.value = t;
    }

    // ─── Move nodes ──────────────────────────────────────────────────────
    const nodeGeo = nodeGeoRef.current;
    if (nodeGeo) {
      const posAttr = nodeGeo.attributes.position as THREE.BufferAttribute;
      const hx = FIELD_X * 0.5;
      const hy = FIELD_Y * 0.5;

      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.x += Math.sin(t * n.freq + n.phase) * 0.015 + n.vx;
        n.y += Math.cos(t * n.freq * 0.7 + n.phase + 1.3) * 0.012 + n.vy;
        n.z += Math.sin(t * n.freq * 0.4 + n.phase + 2.7) * 0.006;

        if (n.x > hx) n.x -= FIELD_X;
        if (n.x < -hx) n.x += FIELD_X;
        if (n.y > hy) n.y -= FIELD_Y;
        if (n.y < -hy) n.y += FIELD_Y;

        posAttr.setXYZ(i, n.x, n.y, n.z);
      }
      posAttr.needsUpdate = true;
    }

    // ─── Rebuild edges ───────────────────────────────────────────────────
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
            const fade = Math.pow(1 - dist / CONNECT_DIST, 1.8);
            state.activeEdges.push({ a, b });
            const accent = nodes[a].isAccent || nodes[b].isAccent ? 1 : 0;
            // Blue/cyan palette for edges
            const r = accent ? 0.35 * fade : 0.08 * fade;
            const g = accent ? 0.65 * fade : 0.35 * fade;
            const bl = accent ? 0.75 * fade : 0.52 * fade;

            ep.setXYZ(ei * 2, nodes[a].x, nodes[a].y, nodes[a].z);
            ep.setXYZ(ei * 2 + 1, nodes[b].x, nodes[b].y, nodes[b].z);
            ec.setXYZ(ei * 2, r, g, bl);
            ec.setXYZ(ei * 2 + 1, r * 0.35, g * 0.35, bl * 0.35);
            ei++;
          }
        }
      }

      edgeGeo.setDrawRange(0, ei * 2);
      ep.needsUpdate = true;
      ec.needsUpdate = true;
    }

    // ─── Pulses ──────────────────────────────────────────────────────────
    if (t - state.lastSpawn > 0.22) {
      spawnPulse();
      state.lastSpawn = t;
    }

    const pulseGeo = pulseGeoRef.current;
    if (pulseGeo) {
      const pp = pulseGeo.attributes.position as THREE.BufferAttribute;
      const pa = pulseGeo.attributes.aAlpha as THREE.BufferAttribute;
      const pg = pulseGeo.attributes.aAccent as THREE.BufferAttribute;

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
        pg.setX(i, p.isAccent ? 1 : 0);
      }

      pulseGeo.setDrawRange(0, state.pulses.length);
      pp.needsUpdate = true;
      pa.needsUpdate = true;
      pg.needsUpdate = true;
    }

    // ─── Camera: gentle auto-drift only ─────────────────────────────────
    state.camTheta += 0.001;
    const tx = Math.sin(state.camTheta) * 5;
    const ty = Math.sin(t * 0.1) * 3;
    camera.position.x += (tx - camera.position.x) * 0.02;
    camera.position.y += (ty - camera.position.y) * 0.02;
    camera.position.z = 80 + Math.sin(t * 0.06) * 3;
    camera.lookAt(camTarget);
  });

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <group>
      {/* Ambient glow blobs */}
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

      {/* Edges */}
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
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes */}
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
            attach="attributes-aAccent"
            args={[nodeBuffers.accents, 1]}
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
            attach="attributes-aAccent"
            args={[pulseBuffers.accents, 1]}
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
