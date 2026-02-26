"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Geometry helpers ────────────────────────────────────────────────────────

function L(a: number[], x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
  a.push(x1, y1, z1, x2, y2, z2);
}

function box(
  a: number[],
  cx: number, cy: number, cz: number,
  w: number, h: number, d: number,
  sw = 0, sh = 0,
) {
  const [x0, x1, y0, y1, z0, z1] = [cx - w / 2, cx + w / 2, cy, cy + h, cz - d / 2, cz + d / 2];
  L(a, x0, y0, z0, x1, y0, z0); L(a, x1, y0, z0, x1, y0, z1); L(a, x1, y0, z1, x0, y0, z1); L(a, x0, y0, z1, x0, y0, z0);
  L(a, x0, y1, z0, x1, y1, z0); L(a, x1, y1, z0, x1, y1, z1); L(a, x1, y1, z1, x0, y1, z1); L(a, x0, y1, z1, x0, y1, z0);
  L(a, x0, y0, z0, x0, y1, z0); L(a, x1, y0, z0, x1, y1, z0); L(a, x1, y0, z1, x1, y1, z1); L(a, x0, y0, z1, x0, y1, z1);
  for (let i = 1; i < sw; i++) { const xp = x0 + (w / sw) * i; L(a, xp, y0, z0, xp, y1, z0); L(a, xp, y0, z1, xp, y1, z1); }
  for (let i = 1; i < sh; i++) {
    const yp = y0 + (h / sh) * i;
    L(a, x0, yp, z0, x1, yp, z0); L(a, x0, yp, z1, x1, yp, z1);
    L(a, x0, yp, z0, x0, yp, z1); L(a, x1, yp, z0, x1, yp, z1);
  }
}

function gable(a: number[], cx: number, cy: number, cz: number, w: number, d: number, ph: number) {
  const [x0, x1, z0, z1] = [cx - w / 2, cx + w / 2, cz - d / 2, cz + d / 2];
  L(a, x0, cy, z0, cx, cy + ph, z0); L(a, x1, cy, z0, cx, cy + ph, z0);
  L(a, x0, cy, z1, cx, cy + ph, z1); L(a, x1, cy, z1, cx, cy + ph, z1);
  L(a, cx, cy + ph, z0, cx, cy + ph, z1);
  L(a, x0, cy, z0, x0, cy, z1); L(a, x1, cy, z0, x1, cy, z1);
}

function cyl(a: number[], cx: number, cy: number, cz: number, r: number, h: number, seg = 10, rings = 3) {
  const pts: number[][][] = [];
  for (let ri = 0; ri <= rings; ri++) {
    const y = cy + (ri / rings) * h;
    const row: number[][] = [];
    for (let s = 0; s < seg; s++) {
      const ang = (s / seg) * Math.PI * 2;
      row.push([cx + Math.cos(ang) * r, y, cz + Math.sin(ang) * r]);
    }
    pts.push(row);
    for (let s = 0; s < seg; s++) L(a, row[s][0], row[s][1], row[s][2], row[(s + 1) % seg][0], row[(s + 1) % seg][1], row[(s + 1) % seg][2]);
  }
  for (let s = 0; s < seg; s++) L(a, pts[0][s][0], pts[0][s][1], pts[0][s][2], pts[rings][s][0], pts[rings][s][1], pts[rings][s][2]);
}

function circle(a: number[], cx: number, cy: number, cz: number, r: number, seg = 20, axis = "y") {
  for (let s = 0; s < seg; s++) {
    const a0 = (s / seg) * Math.PI * 2;
    const a1 = ((s + 1) / seg) * Math.PI * 2;
    if (axis === "y") L(a, cx + Math.cos(a0) * r, cy, cz + Math.sin(a0) * r, cx + Math.cos(a1) * r, cy, cz + Math.sin(a1) * r);
    else L(a, cx + Math.cos(a0) * r, cy + Math.sin(a0) * r, cz, cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, cz);
  }
}

function ellipse(a: number[], cx: number, cy: number, cz: number, rx: number, rz: number, seg = 32) {
  for (let s = 0; s < seg; s++) {
    const a0 = (s / seg) * Math.PI * 2;
    const a1 = ((s + 1) / seg) * Math.PI * 2;
    L(a, cx + Math.cos(a0) * rx, cy, cz + Math.sin(a0) * rz, cx + Math.cos(a1) * rx, cy, cz + Math.sin(a1) * rz);
  }
}

// ─── Shader sources ──────────────────────────────────────────────────────────

const sparkVertexShader = /* glsl */ `
  uniform float uTime;
  void main(){
    float pulse=1.0+0.5*sin(uTime*18.0);
    gl_PointSize=12.0*pulse;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
  }
`;

const sparkFragmentShader = /* glsl */ `
  void main(){
    vec2 uv=gl_PointCoord-0.5; float d=length(uv);
    if(d>0.5)discard;
    float a=(1.0-smoothstep(0.0,0.5,d));
    gl_FragColor=vec4(1.0,1.0,0.85,a*0.9);
  }
`;

const trailVertexShader = /* glsl */ `
  attribute float aIdx;
  varying float vIdx;
  void main(){ vIdx=aIdx; gl_PointSize=4.0*(1.0-aIdx/22.0); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }
`;

const trailFragmentShader = /* glsl */ `
  varying float vIdx;
  void main(){
    vec2 uv=gl_PointCoord-0.5; if(length(uv)>0.5)discard;
    gl_FragColor=vec4(1.0,0.95,0.6,(1.0-vIdx/22.0)*0.55);
  }
`;

const atmVertexShader = /* glsl */ `
  attribute float aPhase; attribute float aHue; uniform float uTime; varying float vA; varying float vH;
  void main(){ vH=aHue; float hf=1.0-smoothstep(0.0,1.0,position.y/70.0); vA=(0.3+0.4*sin(uTime*0.2+aPhase))*hf; gl_PointSize=1.5+2.0*hf; gl_Position=projectionMatrix*modelViewMatrix*vec4(position+vec3(sin(uTime*0.12+aPhase)*1.2,cos(uTime*0.09+aPhase)*0.5,0.0),1.0); }
`;

const atmFragmentShader = /* glsl */ `
  varying float vA; varying float vH; void main(){ vec2 uv=gl_PointCoord-.5; if(length(uv)>0.5)discard; float a=(1.0-smoothstep(0.1,0.5,length(uv)))*vA*0.65; gl_FragColor=vec4(mix(vec3(0.08,0.70,0.40),vec3(0.04,0.38,0.70),vH),a); }
`;

const blobVertexShader = /* glsl */ `
  attribute float aPhase; attribute float aHue; uniform float uTime; varying float vH; void main(){ vH=aHue; gl_PointSize=440.0*(1.0+0.15*sin(uTime*0.22+aPhase)); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }
`;

const blobFragmentShader = /* glsl */ `
  varying float vH; void main(){ float d=length(gl_PointCoord-0.5)*2.0; float a=pow(1.0-smoothstep(0.0,1.0,d),3.2)*0.20; gl_FragColor=vec4(mix(vec3(0.02,0.22,0.18),vec3(0.03,0.30,0.10),vH),a); }
`;

// ─── District + sequence types ───────────────────────────────────────────────

interface DistrictLine {
  geo: THREE.BufferGeometry;
  mat: THREE.LineBasicMaterial;
  totalVerts: number;
  drawnVerts: number;
}

interface DistrictDef {
  d: DistrictLine;
  label: string;
  colorHex: number;
  dimHex: number;
  camPos: THREE.Vector3;
  camLook: THREE.Vector3;
}

interface SeqStep {
  name: string;
  duration: number;
  di: number;
}

const TRAIL_LEN = 22;

// ─── Atmospheric particle counts ─────────────────────────────────────────────
const ATM_DESKTOP = 1800;
const ATM_MOBILE = 800;
const BLOB_COUNT_DESKTOP = 12;
const BLOB_COUNT_MOBILE = 6;

// ─── Component ───────────────────────────────────────────────────────────────

export default function CityBackground() {
  const { camera } = useThree();

  const isMobile = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return true;
    }
    return false;
  }, []);

  const ATM = isMobile ? ATM_MOBILE : ATM_DESKTOP;
  const BLOBCT = isMobile ? BLOB_COUNT_MOBILE : BLOB_COUNT_DESKTOP;

  // ─── Build all line geometry data in useMemo ─────────────────────────
  const cityData = useMemo(() => {
    // Ground grid
    const groundArr: number[] = [];
    const GS = 6, GW = 32, GD = 30;
    for (let i = -GW; i <= GW; i++) L(groundArr, i * GS, 0, -GD * GS, i * GS, 0, GD * GS);
    for (let i = -GD; i <= GD; i++) L(groundArr, -GW * GS, 0, i * GS, GW * GS, 0, i * GS);

    // Infrastructure
    const infraArr: number[] = [];
    L(infraArr, -190, 0.2, 0, 190, 0.2, 0); L(infraArr, -3, 0.2, 0, -3, 0.2, 0);
    L(infraArr, 0, 0.2, -190, 0, 0.2, 190);
    for (let l = -1; l <= 1; l += 2) { L(infraArr, -190, 0.3, l * 3.5, 190, 0.3, l * 3.5); L(infraArr, l * 3.5, 0.3, -190, l * 3.5, 0.3, 190); }
    // Overpass
    for (let i = 0; i < 12; i++) {
      const t = i / 11, t1 = (i + 1) / 11;
      const ox0 = -40 + t * 100, oz0 = 55 - t * 95, oy0 = 7 + Math.sin(t * Math.PI) * 10;
      const ox1 = -40 + t1 * 100, oz1 = 55 - t1 * 95, oy1 = 7 + Math.sin(t1 * Math.PI) * 10;
      L(infraArr, ox0, oy0, oz0, ox1, oy1, oz1);
      L(infraArr, ox0, 0, oz0, ox0, oy0, oz0);
    }
    // Central hub
    cyl(infraArr, 0, 0, 0, 11, 5, 12, 2);
    cyl(infraArr, 0, 5, 0, 6, 22, 8, 5);
    L(infraArr, 0, 27, 0, 0, 38, 0); circle(infraArr, 0, 30, 0, 4, 10);
    for (let b = 0; b < 4; b++) { const ba = (b / 4) * Math.PI * 2; L(infraArr, Math.cos(ba) * 11, 5, Math.sin(ba) * 11, Math.cos(ba) * 28, 5, Math.sin(ba) * 28); }

    // District 0 — Agriculture
    const farmArr: number[] = [];
    {
      const OX = -68, OZ = 32;
      for (let row = 0; row < 10; row++) {
        const fz = OZ - 26 + row * 5.5;
        for (let seg = 0; seg < 15; seg++) {
          const x0 = OX - 34 + seg * 4.5, x1 = x0 + 4.5;
          L(farmArr, x0, Math.sin(seg * 0.5 + row) * 0.4, fz, x1, Math.sin((seg + 1) * 0.5 + row) * 0.4, fz);
        }
      }
      for (let c = 0; c < 7; c++) { const fx = OX - 34 + c * 11.5; L(farmArr, fx, 0, OZ - 28, fx, 0, OZ + 28); }
      box(farmArr, OX + 14, 0, OZ + 2, 18, 10, 12);
      gable(farmArr, OX + 14, 10, OZ + 2, 18, 12, 6);
      L(farmArr, OX + 5, 0, OZ - 5, OX + 5, 6, OZ - 5); L(farmArr, OX + 23, 0, OZ - 5, OX + 23, 6, OZ - 5); L(farmArr, OX + 5, 6, OZ - 5, OX + 23, 6, OZ - 5);
      cyl(farmArr, OX + 28, 0, OZ + 4, 4, 22, 10, 6); circle(farmArr, OX + 28, 22, OZ + 4, 4, 10);
      for (let s = 0; s < 10; s++) L(farmArr, OX + 28 + Math.cos(s / 10 * Math.PI * 2) * 4, 22, OZ + 4 + Math.sin(s / 10 * Math.PI * 2) * 4, OX + 28, 26, OZ + 4);
      cyl(farmArr, OX + 22, 0, OZ + 4, 3.2, 18, 10, 4); for (let s = 0; s < 10; s++) L(farmArr, OX + 22 + Math.cos(s / 10 * Math.PI * 2) * 3.2, 18, OZ + 4 + Math.sin(s / 10 * Math.PI * 2) * 3.2, OX + 22, 22, OZ + 4);
      const wx = OX - 18, wz = OZ + 8;
      L(farmArr, wx, 0, wz, wx, 25, wz);
      for (let i = 0; i < 4; i++) { const y = i * 6; L(farmArr, wx - 1.5, y, wz, wx + 1.5, y + 3, wz); L(farmArr, wx + 1.5, y, wz, wx - 1.5, y + 3, wz); }
      const bL = 9, bY = 25;
      L(farmArr, wx, bY, wz, wx + bL, bY + 2, wz); L(farmArr, wx, bY, wz, wx, bY + bL, wz);
      L(farmArr, wx, bY, wz, wx - bL, bY - 2, wz); L(farmArr, wx, bY, wz, wx, bY - bL, wz);
      L(farmArr, wx + bL, bY + 2, wz, wx, bY + bL, wz); L(farmArr, wx, bY + bL, wz, wx - bL, bY - 2, wz);
      L(farmArr, wx - bL, bY - 2, wz, wx, bY - bL, wz); L(farmArr, wx, bY - bL, wz, wx + bL, bY + 2, wz);
      for (let i = 0; i < 14; i++) { const fx = OX - 38 + i * 5.5; L(farmArr, fx, 0, OZ - 30, fx, 2, OZ - 30); L(farmArr, fx + 5.5, 0, OZ - 30, fx + 5.5, 0, OZ - 30); }
      for (let i = 0; i < 14; i++) { const fx = OX - 38 + i * 5.5; L(farmArr, fx, 2, OZ - 30, fx + 5.5, 2, OZ - 30); L(farmArr, fx, 0, OZ - 30, fx + 5.5, 0, OZ - 30); }
      cyl(farmArr, OX - 30, 8, OZ + 15, 4, 5, 8, 2);
      for (let l = 0; l < 4; l++) { const la = (l / 4) * Math.PI * 2; L(farmArr, OX - 30 + Math.cos(la) * 4, 8, OZ + 15 + Math.sin(la) * 4, OX - 30 + Math.cos(la) * 5.5, 0, OZ + 15 + Math.sin(la) * 5.5); }
      box(farmArr, OX - 8, 0, OZ + 14, 10, 7, 8);
      gable(farmArr, OX - 8, 7, OZ + 14, 10, 8, 4);
    }

    // District 1 — Auto Industry
    const autoArr: number[] = [];
    {
      const OX = 62, OZ = 28;
      box(autoArr, OX - 8, 0, OZ, 52, 12, 32, 5, 3);
      for (let i = 0; i < 5; i++) {
        const rx = OX - 32 + i * 11.5;
        L(autoArr, rx, 12, OZ - 16, rx + 6, 18, OZ - 16); L(autoArr, rx + 6, 18, OZ - 16, rx + 11.5, 12, OZ - 16);
        L(autoArr, rx, 12, OZ + 16, rx + 6, 18, OZ + 16); L(autoArr, rx + 6, 18, OZ + 16, rx + 11.5, 12, OZ + 16);
        L(autoArr, rx, 12, OZ - 16, rx, 12, OZ + 16); L(autoArr, rx + 6, 18, OZ - 16, rx + 6, 18, OZ + 16);
      }
      for (let s = 0; s < 3; s++) {
        cyl(autoArr, OX - 28 + s * 16, 12, OZ - 16, 2, 20, 8, 3);
        circle(autoArr, OX - 28 + s * 16, 32, OZ - 16, 3, 12);
      }
      for (let lane = 0; lane < 3; lane++) {
        const lz = OZ - 10 + lane * 10;
        L(autoArr, OX - 30, 5, lz, OX + 15, 5, lz); L(autoArr, OX - 30, 5, lz + 1, OX + 15, 5, lz + 1);
        for (let l = 0; l < 5; l++) { const lx = OX - 30 + l * 11; L(autoArr, lx, 0, lz, lx, 5, lz); L(autoArr, lx, 0, lz + 1, lx, 5, lz + 1); L(autoArr, lx, 5, lz, lx, 5, lz + 1); }
        for (let r = 0; r < 10; r++) { const rx = OX - 30 + r * 4.5; L(autoArr, rx, 5.5, lz - 0.5, rx, 5.5, lz + 1.5); }
      }
      [{ x: OX + 20, z: OZ - 12 }, { x: OX + 20, z: OZ }, { x: OX + 20, z: OZ + 12 }].forEach(({ x, z }) => {
        box(autoArr, x, 1, z, 10, 3, 5);
        box(autoArr, x + 0.5, 4, z, 7, 2.5, 4.5);
        [[x - 3.5, z - 2.5], [x + 3.5, z - 2.5], [x - 3.5, z + 2.5], [x + 3.5, z + 2.5]].forEach(([wx, wz]) => circle(autoArr, wx, 1, wz, 1.4, 8, "x"));
        for (let g = 0; g < 3; g++) L(autoArr, x - 5, 1.5 + g * 0.8, z - 2.5, x - 5, 1.5 + g * 0.8, z + 2.5);
      });
      [{ x: OX - 28, z: OZ + 18 }, { x: OX - 10, z: OZ + 18 }].forEach(({ x, z }) => {
        box(autoArr, x, 0, z, 2, 3, 2);
        L(autoArr, x, 3, z, x + 4, 8, z); L(autoArr, x + 4, 8, z, x + 6, 13, z);
        L(autoArr, x + 6, 13, z, x + 8, 13, z - 1); L(autoArr, x + 6, 13, z, x + 8, 13, z + 1);
      });
      box(autoArr, OX + 28, 0, OZ, 10, 5, 22, 2, 1);
    }

    // District 2 — Sports Stadium
    const stadArr: number[] = [];
    {
      const OX = -30, OZ = -42, RA = 42, RB = 28;
      for (let ring = 0; ring < 6; ring++) ellipse(stadArr, OX, ring * 4, OZ, RA - ring * 3, RB - ring * 2, 36);
      for (let rib = 0; rib < 24; rib++) {
        const a = (rib / 24) * Math.PI * 2;
        L(stadArr, OX + Math.cos(a) * RA, 0, OZ + Math.sin(a) * RB, OX + Math.cos(a) * (RA - 14), 20, OZ + Math.sin(a) * (RB - 9));
      }
      L(stadArr, OX - 30, 0.1, OZ - 18, OX + 30, 0.1, OZ - 18); L(stadArr, OX - 30, 0.1, OZ + 18, OX + 30, 0.1, OZ + 18);
      L(stadArr, OX - 30, 0.1, OZ - 18, OX - 30, 0.1, OZ + 18); L(stadArr, OX + 30, 0.1, OZ - 18, OX + 30, 0.1, OZ + 18);
      L(stadArr, OX, 0.1, OZ - 18, OX, 0.1, OZ + 18);
      circle(stadArr, OX, 0.1, OZ, 8, 24, "y");
      L(stadArr, OX - 30, 0.1, OZ - 7, OX - 22, 0.1, OZ - 7); L(stadArr, OX - 30, 0.1, OZ + 7, OX - 22, 0.1, OZ + 7); L(stadArr, OX - 22, 0.1, OZ - 7, OX - 22, 0.1, OZ + 7);
      L(stadArr, OX + 30, 0.1, OZ - 7, OX + 22, 0.1, OZ - 7); L(stadArr, OX + 30, 0.1, OZ + 7, OX + 22, 0.1, OZ + 7); L(stadArr, OX + 22, 0.1, OZ - 7, OX + 22, 0.1, OZ + 7);
      [[RA * 0.82, RB * 0.82], [-RA * 0.82, RB * 0.82], [RA * 0.82, -RB * 0.82], [-RA * 0.82, -RB * 0.82]].forEach(([tx, tz]) => {
        const tpx = OX + tx, tpz = OZ + tz;
        L(stadArr, tpx, 0, tpz, tpx, 28, tpz);
        L(stadArr, tpx - 4, 26, tpz, tpx + 4, 26, tpz); L(stadArr, tpx - 4, 28, tpz, tpx + 4, 28, tpz);
        for (let l = 0; l < 5; l++) { const lx = tpx - 4 + l * 2; L(stadArr, lx, 28, tpz, lx + 0.5, 30, tpz); L(stadArr, lx, 28, tpz, lx - 0.5, 30, tpz); }
        L(stadArr, tpx, 0, tpz, tpx + 4, 14, tpz); L(stadArr, tpx, 0, tpz, tpx - 4, 14, tpz);
      });
      box(stadArr, OX, 20, OZ - RB - 2, 20, 8, 4, 4, 2);
      L(stadArr, OX - 10, 0, OZ - RB - 2, OX - 8, 20, OZ - RB - 2); L(stadArr, OX + 10, 0, OZ - RB - 2, OX + 8, 20, OZ - RB - 2);
      for (let s = 0; s < 22; s++) {
        const a0 = (-0.3 + s / 22 * 1.9) * Math.PI, a1 = (-0.3 + (s + 1) / 22 * 1.9) * Math.PI;
        L(stadArr, OX + Math.cos(a0) * (RA + 2), 21, OZ + Math.sin(a0) * (RB + 2), OX + Math.cos(a1) * (RA + 2), 21, OZ + Math.sin(a1) * (RB + 2));
        L(stadArr, OX + Math.cos(a0) * (RA - 6), 21, OZ + Math.sin(a0) * (RB - 4), OX + Math.cos(a1) * (RA - 6), 21, OZ + Math.sin(a1) * (RB - 4));
      }
    }

    // District 3 — High-Tech Skyscrapers
    const techArr: number[] = [];
    {
      const OX = 52, OZ = -40;
      box(techArr, OX - 10, 0, OZ - 6, 14, 80, 10, 7, 16);
      L(techArr, OX - 10, 80, OZ - 6, OX - 10, 96, OZ - 6);
      L(techArr, OX - 10, 88, OZ - 6, OX - 14, 93, OZ - 6); L(techArr, OX - 10, 88, OZ - 6, OX - 6, 93, OZ - 6);
      circle(techArr, OX - 10, 84, OZ - 6, 2, 8);
      box(techArr, OX + 8, 0, OZ - 4, 10, 60, 8, 5, 12);
      L(techArr, OX + 3, 0, OZ - 8, OX + 13, 60, OZ - 8); L(techArr, OX + 3, 0, OZ, OX + 13, 60, OZ);
      box(techArr, OX + 10, 60, OZ - 4, 6, 8, 4, 2, 4);
      box(techArr, OX - 22, 0, OZ + 6, 8, 55, 7, 4, 11);
      box(techArr, OX - 22, 40, OZ + 6, 5, 15, 4, 2, 5);
      box(techArr, OX + 4, 0, OZ + 16, 22, 12, 16, 6, 3);
      box(techArr, OX + 6, 12, OZ + 18, 12, 42, 10, 4, 8);
      cyl(techArr, OX - 30, 0, OZ + 20, 1.5, 35, 6, 6);
      circle(techArr, OX - 30, 35, OZ + 20, 5, 12);
      L(techArr, OX - 30, 35, OZ + 20, OX - 30, 40, OZ + 20);
      for (let s = 0; s < 6; s++) { const a = (s / 6) * Math.PI * 2; L(techArr, OX - 30, 35, OZ + 20, OX - 30 + Math.cos(a) * 5, 35, OZ + 20 + Math.sin(a) * 5); }
      for (let df = 0; df < 9; df++) {
        const dx = OX - 36 + df * 4, dz = OZ - 22;
        for (let l = 0; l < 5; l++) { const y0 = l * 10, y1 = y0 + 7; const xo = (Math.random() - 0.5) * 1.2; L(techArr, dx + xo, y0, dz, dx + xo, y1, dz); }
      }
      L(techArr, OX - 17, 38, OZ - 6, OX + 3, 38, OZ - 4); L(techArr, OX - 17, 40, OZ - 6, OX + 3, 40, OZ - 4);
      L(techArr, OX - 17, 38, OZ - 6, OX - 17, 40, OZ - 6); L(techArr, OX + 3, 38, OZ - 4, OX + 3, 40, OZ - 4);
      L(techArr, OX - 26, 32, OZ + 6, OX - 17, 32, OZ - 6);
      for (let g = 0; g < 6; g++) { L(techArr, OX - 36 + g * 12, 0, OZ + 32, OX - 36 + g * 12, 0, OZ - 32); L(techArr, OX - 38, 0, OZ - 32 + g * 12, OX + 38, 0, OZ - 32 + g * 12); }
      for (let sp = 0; sp < 6; sp++) {
        const spx = OX - 36 + sp * 6, spy = 4, spz = OZ + 34;
        L(techArr, spx, spy, spz, spx + 5, spy, spz);
        L(techArr, spx, spy, spz, spx, spy + 0.2, spz + 3); L(techArr, spx + 5, spy, spz, spx + 5, spy + 0.2, spz + 3);
        L(techArr, spx, spy + 0.2, spz + 3, spx + 5, spy + 0.2, spz + 3);
      }
    }

    return {
      groundArr,
      infraArr,
      farmArr,
      autoArr,
      stadArr,
      techArr,
    };
  }, []);

  // ─── Create Three.js line geometry objects ──────────────────────────────
  const lineObjects = useMemo(() => {
    function makeLineData(arr: number[], col: number, opacity = 0.9): DistrictLine {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(arr), 3));
      geo.setDrawRange(0, 0);
      const mat = new THREE.LineBasicMaterial({
        color: col,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      return { geo, mat, totalVerts: arr.length / 3, drawnVerts: 0 };
    }

    const groundLines = makeLineData(cityData.groundArr, 0x0a3020, 0.4);
    const infraLines = makeLineData(cityData.infraArr, 0x0d4530, 0.45);
    const farmD = makeLineData(cityData.farmArr, 0xd4e840, 0.88);
    const autoD = makeLineData(cityData.autoArr, 0x20aaff, 0.88);
    const stadD = makeLineData(cityData.stadArr, 0x30ff88, 0.88);
    const techD = makeLineData(cityData.techArr, 0x88eeff, 0.88);

    return { groundLines, infraLines, farmD, autoD, stadD, techD };
  }, [cityData]);

  // ─── District definitions ──────────────────────────────────────────────
  const DISTRICTS: DistrictDef[] = useMemo(
    () => [
      {
        d: lineObjects.farmD,
        label: "Agriculture",
        colorHex: 0xd4e840,
        dimHex: 0x1f2205,
        camPos: new THREE.Vector3(-95, 52, 100),
        camLook: new THREE.Vector3(-65, 8, 28),
      },
      {
        d: lineObjects.autoD,
        label: "Auto Industry",
        colorHex: 0x20aaff,
        dimHex: 0x020e1a,
        camPos: new THREE.Vector3(98, 50, 100),
        camLook: new THREE.Vector3(62, 8, 28),
      },
      {
        d: lineObjects.stadD,
        label: "Sports & Recreation",
        colorHex: 0x30ff88,
        dimHex: 0x021908,
        camPos: new THREE.Vector3(-62, 60, 18),
        camLook: new THREE.Vector3(-30, 6, -40),
      },
      {
        d: lineObjects.techD,
        label: "High-Tech District",
        colorHex: 0x88eeff,
        dimHex: 0x051518,
        camPos: new THREE.Vector3(100, 62, 18),
        camLook: new THREE.Vector3(52, 18, -38),
      },
    ],
    [lineObjects],
  );

  // ─── Sequence state machine ────────────────────────────────────────────
  const SEQUENCE: SeqStep[] = useMemo(() => {
    const seq: SeqStep[] = [];
    seq.push({ name: "overview-start", duration: 2.8, di: -1 });
    for (let i = 0; i < 4; i++) {
      seq.push({ name: "move", duration: 2.8, di: i });
      seq.push({ name: "draw", duration: 6.0, di: i });
      seq.push({ name: "hold", duration: 2.2, di: i });
    }
    seq.push({ name: "overview-end", duration: 6.0, di: -1 });
    return seq;
  }, []);

  const WIDE_CAM_POS = useMemo(() => new THREE.Vector3(12, 155, 220), []);
  const WIDE_CAM_LOOK = useMemo(() => new THREE.Vector3(0, 0, -12), []);

  // ─── Spark geometry ───────────────────────────────────────────────────
  const sparkGeoRef = useRef<THREE.BufferGeometry>(null);
  const sparkMatRef = useRef<THREE.ShaderMaterial>(null);
  const sparkGroupRef = useRef<THREE.Points>(null);

  // ─── Trail geometry ───────────────────────────────────────────────────
  const trailData = useMemo(() => {
    const trailPos = new Float32Array(TRAIL_LEN * 3);
    const trailIdxArr = new Float32Array(TRAIL_LEN);
    for (let i = 0; i < TRAIL_LEN; i++) trailIdxArr[i] = i;
    return { trailPos, trailIdxArr };
  }, []);
  const trailGeoRef = useRef<THREE.BufferGeometry>(null);

  // ─── Atmospheric particles ────────────────────────────────────────────
  const atmData = useMemo(() => {
    const atmPos = new Float32Array(ATM * 3);
    const atmPh = new Float32Array(ATM);
    const atmHu = new Float32Array(ATM);
    for (let i = 0; i < ATM; i++) {
      atmPos[i * 3] = (Math.random() - 0.5) * 300;
      atmPos[i * 3 + 1] = Math.random() * 70;
      atmPos[i * 3 + 2] = (Math.random() - 0.5) * 300;
      atmPh[i] = Math.random() * Math.PI * 2;
      atmHu[i] = Math.random();
    }
    return { atmPos, atmPh, atmHu };
  }, [ATM]);
  const atmGeoRef = useRef<THREE.BufferGeometry>(null);
  const atmMatRef = useRef<THREE.ShaderMaterial>(null);

  // ─── Blob atmosphere ──────────────────────────────────────────────────
  const blobAtmData = useMemo(() => {
    const bP = new Float32Array(BLOBCT * 3);
    const bPh = new Float32Array(BLOBCT);
    const bHu = new Float32Array(BLOBCT);
    for (let i = 0; i < BLOBCT; i++) {
      bP[i * 3] = (Math.random() - 0.5) * 260;
      bP[i * 3 + 1] = 5 + Math.random() * 45;
      bP[i * 3 + 2] = (Math.random() - 0.5) * 260;
      bPh[i] = Math.random() * Math.PI * 2;
      bHu[i] = Math.random();
    }
    return { bP, bPh, bHu };
  }, [BLOBCT]);
  const blobMatRef = useRef<THREE.ShaderMaterial>(null);

  // ─── Mutable state ────────────────────────────────────────────────────
  const stateRef = useRef({
    t: 0,
    seqIdx: 0,
    seqTime: 0,
    mouseX: 0,
    mouseY: 0,
    camLookAt: new THREE.Vector3(0, 0, -12),
    trailBuffer: Array.from({ length: TRAIL_LEN }, () => new THREE.Vector3()),
    trailHead: 0,
    lastTime: 0,
    initialized: false,
  });

  // ─── Mouse tracking ───────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      stateRef.current.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ─── Push trail helper ────────────────────────────────────────────────
  const pushTrail = (v: THREE.Vector3) => {
    const state = stateRef.current;
    state.trailBuffer[state.trailHead % TRAIL_LEN].copy(v);
    state.trailHead++;
    const trailGeo = trailGeoRef.current;
    if (trailGeo) {
      const tp = trailGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < TRAIL_LEN; i++) {
        const b = state.trailBuffer[(state.trailHead - 1 - i + TRAIL_LEN * 10) % TRAIL_LEN];
        tp.setXYZ(i, b.x, b.y, b.z);
      }
      tp.needsUpdate = true;
    }
  };

  // ─── Animation loop ───────────────────────────────────────────────────
  useFrame((_rootState, delta) => {
    const state = stateRef.current;
    const dt = Math.min(delta, 0.05);
    state.t += dt;
    state.seqTime += dt;
    const t = state.t;

    // Update shader uniforms
    if (atmMatRef.current) atmMatRef.current.uniforms.uTime.value = t;
    if (blobMatRef.current) blobMatRef.current.uniforms.uTime.value = t;
    if (sparkMatRef.current) sparkMatRef.current.uniforms.uTime.value = t;

    const step = SEQUENCE[state.seqIdx];
    const { groundLines, infraLines } = lineObjects;

    // ─── Camera target ─────────────────────────────────────────────────
    let desiredPos: THREE.Vector3;
    let desiredLook: THREE.Vector3;
    if (step.di < 0) {
      desiredPos = WIDE_CAM_POS;
      desiredLook = WIDE_CAM_LOOK;
    } else {
      const D = DISTRICTS[step.di];
      desiredPos = D.camPos.clone().add(new THREE.Vector3(state.mouseX * 5, -state.mouseY * 3, 0));
      desiredLook = D.camLook;
    }
    const lf = 1 - Math.pow(0.012, dt);
    camera.position.lerp(desiredPos, lf);
    state.camLookAt.lerp(desiredLook, lf);
    camera.lookAt(state.camLookAt);

    // ─── Ground / infra draw-in ────────────────────────────────────────
    if (step.name === "overview-start" || state.seqIdx > 0) {
      [groundLines, infraLines].forEach((dl) => {
        if (dl.drawnVerts < dl.totalVerts) {
          dl.drawnVerts = Math.min(dl.drawnVerts + (dl.totalVerts / 2.5) * dt, dl.totalVerts);
          dl.geo.setDrawRange(0, Math.floor(dl.drawnVerts / 2) * 2);
        }
      });
    }

    // ─── District opacity management ───────────────────────────────────
    DISTRICTS.forEach((D, i) => {
      const mat = D.d.mat;
      const isActive = step.di === i;
      const isDrawn = D.d.drawnVerts >= D.d.totalVerts;
      let targetOp: number;
      if (isActive) targetOp = 0.9;
      else if (isDrawn) targetOp = 0.22;
      else targetOp = 0.0;
      mat.opacity += (targetOp - mat.opacity) * 0.04;
      if (isActive) {
        mat.color.lerp(new THREE.Color(D.colorHex), 0.06);
      } else if (isDrawn) {
        mat.color.lerp(new THREE.Color(D.dimHex), 0.04);
      }
    });

    // ─── Per-step logic ────────────────────────────────────────────────
    if (step.name === "draw") {
      const D = DISTRICTS[step.di];
      const dl = D.d;
      const sparkVisible = dl.drawnVerts < dl.totalVerts;
      if (sparkGroupRef.current) sparkGroupRef.current.visible = sparkVisible;

      if (dl.drawnVerts < dl.totalVerts) {
        const speed = dl.totalVerts / 6.0;
        dl.drawnVerts = Math.min(dl.drawnVerts + speed * dt, dl.totalVerts);
        const drawCount = Math.floor(dl.drawnVerts / 2) * 2;
        dl.geo.setDrawRange(0, drawCount);

        // Spark at current drawing front
        const vi = Math.min(drawCount, dl.totalVerts - 2);
        const pos = dl.geo.attributes.position as THREE.BufferAttribute;
        const sx = pos.getX(vi), sy = pos.getY(vi), sz = pos.getZ(vi);
        const sparkGeo = sparkGeoRef.current;
        if (sparkGeo) {
          const sp = sparkGeo.attributes.position as THREE.BufferAttribute;
          sp.setXYZ(0, sx, sy, sz);
          sp.needsUpdate = true;
        }
        pushTrail(new THREE.Vector3(sx, sy, sz));
      } else {
        if (sparkGroupRef.current) sparkGroupRef.current.visible = false;
      }
    }

    if (step.name === "hold") {
      if (sparkGroupRef.current) sparkGroupRef.current.visible = false;
      const D = DISTRICTS[step.di];
      D.d.mat.opacity = 0.75 + 0.15 * Math.sin(t * 2.2);
    }

    if (step.name === "overview-end") {
      if (sparkGroupRef.current) sparkGroupRef.current.visible = false;
      DISTRICTS.forEach((D) => {
        if (D.d.drawnVerts > 0) D.d.mat.opacity = 0.28 + 0.08 * Math.sin(t * 1.5 + D.colorHex * 0.0001);
      });
    }

    // ─── Advance sequence ──────────────────────────────────────────────
    if (state.seqTime >= step.duration) {
      state.seqIdx = (state.seqIdx + 1) % SEQUENCE.length;
      state.seqTime = 0;
      // If looping back, reset all draw ranges
      if (state.seqIdx === 0) {
        DISTRICTS.forEach(({ d }) => {
          d.drawnVerts = 0;
          d.geo.setDrawRange(0, 0);
        });
        groundLines.drawnVerts = 0;
        groundLines.geo.setDrawRange(0, 0);
        infraLines.drawnVerts = 0;
        infraLines.geo.setDrawRange(0, 0);
      }
    }

    // ─── Atmospheric drift ─────────────────────────────────────────────
    const atmGeo = atmGeoRef.current;
    if (atmGeo) {
      const ap = atmGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < ATM; i++) {
        const py = ap.getY(i) + 0.007;
        ap.setY(i, py > 72 ? Math.random() * 4 : py);
      }
      ap.needsUpdate = true;
    }
  });

  // ─── Render ────────────────────────────────────────────────────────────
  return (
    <group>
      {/* Blob atmosphere (behind everything) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[blobAtmData.bP, 3]} />
          <bufferAttribute attach="attributes-aPhase" args={[blobAtmData.bPh, 1]} />
          <bufferAttribute attach="attributes-aHue" args={[blobAtmData.bHu, 1]} />
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

      {/* Ground grid */}
      <lineSegments>
        <primitive object={lineObjects.groundLines.geo} attach="geometry" />
        <primitive object={lineObjects.groundLines.mat} attach="material" />
      </lineSegments>

      {/* Infrastructure */}
      <lineSegments>
        <primitive object={lineObjects.infraLines.geo} attach="geometry" />
        <primitive object={lineObjects.infraLines.mat} attach="material" />
      </lineSegments>

      {/* District 0 — Agriculture */}
      <lineSegments>
        <primitive object={lineObjects.farmD.geo} attach="geometry" />
        <primitive object={lineObjects.farmD.mat} attach="material" />
      </lineSegments>

      {/* District 1 — Auto Industry */}
      <lineSegments>
        <primitive object={lineObjects.autoD.geo} attach="geometry" />
        <primitive object={lineObjects.autoD.mat} attach="material" />
      </lineSegments>

      {/* District 2 — Sports Stadium */}
      <lineSegments>
        <primitive object={lineObjects.stadD.geo} attach="geometry" />
        <primitive object={lineObjects.stadD.mat} attach="material" />
      </lineSegments>

      {/* District 3 — High-Tech */}
      <lineSegments>
        <primitive object={lineObjects.techD.geo} attach="geometry" />
        <primitive object={lineObjects.techD.mat} attach="material" />
      </lineSegments>

      {/* Construction spark */}
      <points ref={sparkGroupRef} visible={false}>
        <bufferGeometry ref={sparkGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0]), 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={sparkMatRef}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={sparkVertexShader}
          fragmentShader={sparkFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Spark trail */}
      <points>
        <bufferGeometry ref={trailGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[trailData.trailPos, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute
            attach="attributes-aIdx"
            args={[trailData.trailIdxArr, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={trailVertexShader}
          fragmentShader={trailFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Atmospheric particles */}
      <points>
        <bufferGeometry ref={atmGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[atmData.atmPos, 3]}
            usage={THREE.DynamicDrawUsage}
          />
          <bufferAttribute attach="attributes-aPhase" args={[atmData.atmPh, 1]} />
          <bufferAttribute attach="attributes-aHue" args={[atmData.atmHu, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={atmMatRef}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader={atmVertexShader}
          fragmentShader={atmFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
