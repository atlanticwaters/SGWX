"use client";

import { useRef, useEffect, useCallback } from "react";

// ─── Pool types ──────────────────────────────────────────────────────────────

interface Pool {
  x: number; y: number; r: number;
  col: [number, number, number];
  spd: number; ph: number; amp: number; pulse: number;
}

interface ThermalPool {
  x: number; y: number; r: number;
  col: [number, number, number];
  spd: number; ph: number;
  ampX: number; ampY: number; bias: number;
}

interface DensePool {
  x: number; y: number; r: number;
  col: [number, number, number];
  spd: number; ph: number;
}

// ─── Pool data for each variant ──────────────────────────────────────────────

const POOLS_01: Pool[] = [
  { x:0.15,y:0.40,r:0.52,col:[8,62,44],spd:0.00022,ph:0.0,amp:0.065,pulse:0.00018 },
  { x:0.78,y:0.55,r:0.48,col:[5,38,60],spd:0.00018,ph:1.8,amp:0.055,pulse:0.00014 },
  { x:0.50,y:0.20,r:0.44,col:[10,70,48],spd:0.00028,ph:3.2,amp:0.070,pulse:0.00022 },
  { x:0.30,y:0.78,r:0.46,col:[4,30,55],spd:0.00016,ph:5.0,amp:0.050,pulse:0.00016 },
  { x:0.85,y:0.22,r:0.38,col:[12,50,32],spd:0.00032,ph:0.9,amp:0.080,pulse:0.00026 },
  { x:0.60,y:0.80,r:0.40,col:[6,44,62],spd:0.00020,ph:4.4,amp:0.060,pulse:0.00018 },
  { x:0.08,y:0.62,r:0.34,col:[14,58,28],spd:0.00038,ph:2.5,amp:0.090,pulse:0.00032 },
  { x:0.94,y:0.68,r:0.30,col:[3,22,42],spd:0.00024,ph:1.2,amp:0.045,pulse:0.00020 },
  { x:0.42,y:0.50,r:0.36,col:[9,55,38],spd:0.00030,ph:6.0,amp:0.075,pulse:0.00024 },
  { x:0.55,y:0.38,r:0.16,col:[70,92,10],spd:0.00055,ph:2.2,amp:0.120,pulse:0.00048 },
  { x:0.22,y:0.18,r:0.12,col:[85,108,8],spd:0.00065,ph:4.8,amp:0.140,pulse:0.00058 },
  { x:0.80,y:0.44,r:0.14,col:[55,80,12],spd:0.00048,ph:1.5,amp:0.110,pulse:0.00040 },
  { x:0.38,y:0.88,r:0.10,col:[100,115,14],spd:0.00070,ph:3.8,amp:0.160,pulse:0.00062 },
  { x:0.68,y:0.28,r:0.08,col:[120,130,18],spd:0.00080,ph:0.5,amp:0.180,pulse:0.00072 },
  { x:0.12,y:0.85,r:0.07,col:[90,110,12],spd:0.00075,ph:5.5,amp:0.170,pulse:0.00068 },
];

const POOLS_02: Pool[] = [
  { x:0.20,y:0.45,r:0.60,col:[3,22,48],spd:0.00015,ph:0.0,amp:0.045,pulse:0.00010 },
  { x:0.75,y:0.50,r:0.58,col:[2,18,40],spd:0.00012,ph:2.1,amp:0.040,pulse:0.00008 },
  { x:0.48,y:0.22,r:0.52,col:[4,28,58],spd:0.00018,ph:4.5,amp:0.055,pulse:0.00014 },
  { x:0.25,y:0.78,r:0.50,col:[3,15,35],spd:0.00010,ph:1.3,amp:0.035,pulse:0.00009 },
  { x:0.88,y:0.20,r:0.44,col:[5,32,62],spd:0.00020,ph:3.7,amp:0.060,pulse:0.00016 },
  { x:0.12,y:0.58,r:0.38,col:[5,42,52],spd:0.00025,ph:5.2,amp:0.070,pulse:0.00020 },
  { x:0.65,y:0.75,r:0.36,col:[4,36,48],spd:0.00022,ph:0.8,amp:0.065,pulse:0.00018 },
  { x:0.40,y:0.55,r:0.40,col:[6,45,55],spd:0.00028,ph:6.2,amp:0.075,pulse:0.00022 },
  { x:0.55,y:0.32,r:0.14,col:[12,88,115],spd:0.00050,ph:1.8,amp:0.130,pulse:0.00044 },
  { x:0.30,y:0.15,r:0.11,col:[8,70,98],spd:0.00062,ph:3.3,amp:0.150,pulse:0.00054 },
  { x:0.82,y:0.62,r:0.13,col:[10,80,110],spd:0.00045,ph:2.6,amp:0.120,pulse:0.00038 },
  { x:0.18,y:0.88,r:0.09,col:[15,95,125],spd:0.00068,ph:5.8,amp:0.160,pulse:0.00060 },
  { x:0.58,y:0.65,r:0.20,col:[5,40,32],spd:0.00032,ph:4.0,amp:0.085,pulse:0.00026 },
  { x:0.72,y:0.18,r:0.07,col:[40,105,140],spd:0.00078,ph:0.3,amp:0.180,pulse:0.00070 },
  { x:0.35,y:0.72,r:0.06,col:[28,90,120],spd:0.00082,ph:4.2,amp:0.185,pulse:0.00074 },
];

const POOLS_03: Pool[] = [
  { x:0.18,y:0.42,r:0.55,col:[8,40,10],spd:0.00020,ph:0.0,amp:0.060,pulse:0.00015 },
  { x:0.78,y:0.52,r:0.50,col:[6,35,8],spd:0.00016,ph:2.2,amp:0.050,pulse:0.00012 },
  { x:0.48,y:0.20,r:0.48,col:[10,48,12],spd:0.00025,ph:3.8,amp:0.070,pulse:0.00020 },
  { x:0.28,y:0.80,r:0.45,col:[5,30,8],spd:0.00014,ph:5.2,amp:0.045,pulse:0.00011 },
  { x:0.62,y:0.35,r:0.38,col:[28,75,12],spd:0.00032,ph:1.5,amp:0.085,pulse:0.00026 },
  { x:0.15,y:0.65,r:0.36,col:[22,65,10],spd:0.00028,ph:4.0,amp:0.080,pulse:0.00022 },
  { x:0.82,y:0.70,r:0.34,col:[32,80,15],spd:0.00035,ph:0.7,amp:0.090,pulse:0.00028 },
  { x:0.40,y:0.55,r:0.32,col:[18,60,8],spd:0.00030,ph:6.0,amp:0.075,pulse:0.00024 },
  { x:0.50,y:0.38,r:0.28,col:[75,110,8],spd:0.00048,ph:2.0,amp:0.110,pulse:0.00040 },
  { x:0.25,y:0.22,r:0.24,col:[88,125,10],spd:0.00055,ph:4.5,amp:0.125,pulse:0.00046 },
  { x:0.75,y:0.28,r:0.22,col:[65,100,6],spd:0.00042,ph:1.2,amp:0.100,pulse:0.00036 },
  { x:0.58,y:0.78,r:0.20,col:[95,135,12],spd:0.00060,ph:3.5,amp:0.135,pulse:0.00052 },
  { x:0.44,y:0.44,r:0.10,col:[140,165,18],spd:0.00085,ph:0.4,amp:0.185,pulse:0.00078 },
  { x:0.70,y:0.60,r:0.09,col:[155,175,22],spd:0.00090,ph:3.0,amp:0.190,pulse:0.00082 },
  { x:0.20,y:0.35,r:0.08,col:[120,150,14],spd:0.00078,ph:5.8,amp:0.175,pulse:0.00070 },
  { x:0.90,y:0.40,r:0.18,col:[8,52,38],spd:0.00038,ph:2.8,amp:0.095,pulse:0.00030 },
];

const DENSE_POOLS_05: DensePool[] = [
  { x:0.12,y:0.20,r:0.28,col:[8,55,38],spd:0.00042,ph:0.0 },
  { x:0.38,y:0.14,r:0.26,col:[5,30,55],spd:0.00038,ph:1.1 },
  { x:0.65,y:0.22,r:0.30,col:[10,62,42],spd:0.00045,ph:2.4 },
  { x:0.88,y:0.35,r:0.25,col:[4,25,48],spd:0.00035,ph:3.8 },
  { x:0.08,y:0.50,r:0.28,col:[9,52,35],spd:0.00040,ph:5.0 },
  { x:0.92,y:0.55,r:0.24,col:[6,35,52],spd:0.00036,ph:0.6 },
  { x:0.22,y:0.42,r:0.26,col:[12,68,45],spd:0.00055,ph:1.8 },
  { x:0.50,y:0.38,r:0.28,col:[5,28,52],spd:0.00048,ph:3.2 },
  { x:0.75,y:0.45,r:0.25,col:[10,58,40],spd:0.00060,ph:4.6 },
  { x:0.32,y:0.65,r:0.27,col:[7,40,55],spd:0.00052,ph:0.3 },
  { x:0.58,y:0.70,r:0.26,col:[11,60,38],spd:0.00044,ph:2.0 },
  { x:0.82,y:0.72,r:0.24,col:[4,22,42],spd:0.00057,ph:5.8 },
  { x:0.44,y:0.28,r:0.16,col:[65,90,12],spd:0.00075,ph:1.5 },
  { x:0.18,y:0.75,r:0.14,col:[75,102,10],spd:0.00082,ph:4.2 },
  { x:0.70,y:0.28,r:0.15,col:[58,82,8],spd:0.00068,ph:2.8 },
  { x:0.88,y:0.82,r:0.13,col:[85,115,14],spd:0.00088,ph:0.9 },
  { x:0.28,y:0.52,r:0.12,col:[10,80,95],spd:0.00095,ph:3.5 },
  { x:0.60,y:0.50,r:0.11,col:[8,72,85],spd:0.00102,ph:1.2 },
  { x:0.45,y:0.85,r:0.10,col:[12,90,105],spd:0.00088,ph:5.5 },
  { x:0.35,y:0.35,r:0.07,col:[120,145,18],spd:0.00120,ph:2.1 },
  { x:0.68,y:0.60,r:0.06,col:[100,128,14],spd:0.00130,ph:4.7 },
  { x:0.14,y:0.88,r:0.06,col:[140,160,20],spd:0.00115,ph:0.2 },
];
const DENSE_AMPS = DENSE_POOLS_05.map((_, i) => 0.055 + (i % 7) * 0.018);

const THERMAL_POOLS_06: ThermalPool[] = [
  { x:0.22,y:0.08,r:0.45,col:[3,22,45],spd:0.00012,ph:0.0,ampX:0.035,ampY:0.015,bias:0.0 },
  { x:0.65,y:0.12,r:0.42,col:[4,18,40],spd:0.00010,ph:2.3,ampX:0.030,ampY:0.012,bias:0.0 },
  { x:0.88,y:0.06,r:0.38,col:[5,28,52],spd:0.00014,ph:4.8,ampX:0.038,ampY:0.016,bias:0.0 },
  { x:0.15,y:0.40,r:0.36,col:[7,45,35],spd:0.00025,ph:1.5,ampX:0.060,ampY:0.040,bias:0.0 },
  { x:0.48,y:0.38,r:0.38,col:[6,38,48],spd:0.00022,ph:3.6,ampX:0.055,ampY:0.035,bias:0.0 },
  { x:0.78,y:0.42,r:0.34,col:[8,48,38],spd:0.00028,ph:0.7,ampX:0.062,ampY:0.042,bias:0.0 },
  { x:0.30,y:0.65,r:0.30,col:[22,62,15],spd:0.00040,ph:0.4,ampX:0.070,ampY:0.120,bias:-0.08 },
  { x:0.55,y:0.72,r:0.28,col:[18,55,12],spd:0.00045,ph:2.8,ampX:0.065,ampY:0.130,bias:-0.10 },
  { x:0.82,y:0.68,r:0.26,col:[25,68,18],spd:0.00038,ph:5.2,ampX:0.072,ampY:0.115,bias:-0.07 },
  { x:0.20,y:0.85,r:0.48,col:[42,72,8],spd:0.00018,ph:1.0,ampX:0.045,ampY:0.025,bias:0.0 },
  { x:0.50,y:0.90,r:0.52,col:[55,85,10],spd:0.00015,ph:3.4,ampX:0.040,ampY:0.020,bias:0.0 },
  { x:0.80,y:0.88,r:0.45,col:[38,65,7],spd:0.00020,ph:5.8,ampX:0.048,ampY:0.028,bias:0.0 },
  { x:0.38,y:0.78,r:0.14,col:[90,118,12],spd:0.00065,ph:0.9,ampX:0.085,ampY:0.200,bias:-0.18 },
  { x:0.62,y:0.82,r:0.12,col:[105,132,15],spd:0.00072,ph:4.1,ampX:0.090,ampY:0.210,bias:-0.20 },
  { x:0.12,y:0.76,r:0.11,col:[78,105,10],spd:0.00058,ph:2.5,ampX:0.078,ampY:0.185,bias:-0.16 },
  { x:0.88,y:0.80,r:0.10,col:[115,140,18],spd:0.00078,ph:1.6,ampX:0.095,ampY:0.220,bias:-0.22 },
  { x:0.32,y:0.22,r:0.08,col:[130,155,20],spd:0.00095,ph:3.2,ampX:0.100,ampY:0.080,bias:0.0 },
  { x:0.68,y:0.18,r:0.07,col:[110,138,16],spd:0.00088,ph:0.5,ampX:0.095,ampY:0.075,bias:0.0 },
];

// ─── Variant 04 data ─────────────────────────────────────────────────────────

interface V4Pool {
  x: number; y: number; r: number;
  col: [number, number, number];
  spd: number; ph: number; amp: number; pulse: number;
  oc: { spd: number; ph: number; min: number; max: number };
  pl: number;
}

interface V4Band {
  cx: number; cy: number; rx: number; ry: number; ang: number;
  col: [number, number, number];
  spd: number; ph: number; amp: number;
  oc: { spd: number; ph: number; min: number; max: number };
  pl: number;
}

interface V4Star {
  x: number; y: number; r: number; op: number;
  depth: number; tph: number; tspd: number; hue: number;
}

const V4_LAYER_A: V4Pool[] = [
  { x:0.08,y:0.22,r:1.05,col:[5,45,32],spd:0.000068,ph:0.0,amp:0.018,pulse:0.000050,oc:{spd:0.000045,ph:0.0,min:0.30,max:0.72},pl:0.02 },
  { x:0.90,y:0.55,r:0.98,col:[2,20,50],spd:0.000055,ph:2.5,amp:0.015,pulse:0.000042,oc:{spd:0.000038,ph:1.8,min:0.22,max:0.65},pl:0.02 },
  { x:0.45,y:0.92,r:0.95,col:[4,38,20],spd:0.000062,ph:5.0,amp:0.016,pulse:0.000046,oc:{spd:0.000042,ph:3.4,min:0.28,max:0.70},pl:0.02 },
  { x:0.78,y:0.12,r:0.90,col:[3,25,42],spd:0.000058,ph:3.8,amp:0.014,pulse:0.000044,oc:{spd:0.000040,ph:5.2,min:0.25,max:0.68},pl:0.02 },
];
const V4_LAYER_B: V4Pool[] = [
  { x:0.22,y:0.42,r:0.52,col:[8,72,52],spd:0.000135,ph:0.6,amp:0.042,pulse:0.000108,oc:{spd:0.000090,ph:0.4,min:0.42,max:0.88},pl:0.07 },
  { x:0.55,y:0.18,r:0.48,col:[4,32,68],spd:0.000118,ph:2.0,amp:0.038,pulse:0.000095,oc:{spd:0.000080,ph:2.2,min:0.38,max:0.85},pl:0.08 },
  { x:0.12,y:0.72,r:0.50,col:[6,58,36],spd:0.000145,ph:4.2,amp:0.044,pulse:0.000115,oc:{spd:0.000095,ph:1.0,min:0.40,max:0.86},pl:0.06 },
  { x:0.78,y:0.40,r:0.44,col:[3,28,62],spd:0.000125,ph:1.4,amp:0.040,pulse:0.000100,oc:{spd:0.000085,ph:3.6,min:0.35,max:0.82},pl:0.07 },
  { x:0.48,y:0.78,r:0.46,col:[7,55,38],spd:0.000140,ph:5.8,amp:0.042,pulse:0.000112,oc:{spd:0.000092,ph:4.8,min:0.38,max:0.84},pl:0.07 },
  { x:0.82,y:0.18,r:0.40,col:[5,38,58],spd:0.000130,ph:3.2,amp:0.038,pulse:0.000105,oc:{spd:0.000088,ph:0.9,min:0.32,max:0.80},pl:0.08 },
  { x:0.40,y:0.50,r:0.42,col:[6,52,48],spd:0.000150,ph:0.2,amp:0.045,pulse:0.000120,oc:{spd:0.000098,ph:2.6,min:0.35,max:0.82},pl:0.09 },
  { x:0.75,y:0.80,r:0.44,col:[5,42,28],spd:0.000122,ph:4.5,amp:0.038,pulse:0.000098,oc:{spd:0.000082,ph:1.5,min:0.32,max:0.78},pl:0.06 },
  { x:0.05,y:0.38,r:0.38,col:[2,18,55],spd:0.000142,ph:2.8,amp:0.042,pulse:0.000115,oc:{spd:0.000094,ph:5.0,min:0.30,max:0.76},pl:0.07 },
];
const V4_LAYER_C: V4Pool[] = [
  { x:0.58,y:0.38,r:0.24,col:[88,105,8],spd:0.000265,ph:1.2,amp:0.082,pulse:0.000220,oc:{spd:0.000175,ph:0.8,min:0.05,max:0.92},pl:0.16 },
  { x:0.42,y:0.62,r:0.22,col:[105,72,10],spd:0.000290,ph:3.8,amp:0.088,pulse:0.000240,oc:{spd:0.000190,ph:3.2,min:0.00,max:0.88},pl:0.18 },
  { x:0.18,y:0.28,r:0.20,col:[52,92,8],spd:0.000310,ph:0.4,amp:0.092,pulse:0.000255,oc:{spd:0.000205,ph:1.5,min:0.02,max:0.85},pl:0.20 },
  { x:0.88,y:0.65,r:0.18,col:[95,55,12],spd:0.000325,ph:5.5,amp:0.095,pulse:0.000268,oc:{spd:0.000215,ph:4.0,min:0.00,max:0.80},pl:0.19 },
  { x:0.92,y:0.08,r:0.18,col:[8,88,105],spd:0.000285,ph:2.4,amp:0.085,pulse:0.000235,oc:{spd:0.000188,ph:2.8,min:0.05,max:0.82},pl:0.17 },
  { x:0.68,y:0.85,r:0.16,col:[75,110,10],spd:0.000340,ph:4.2,amp:0.098,pulse:0.000280,oc:{spd:0.000225,ph:0.2,min:0.00,max:0.78},pl:0.21 },
  { x:0.28,y:0.55,r:0.15,col:[10,82,62],spd:0.000358,ph:1.6,amp:0.100,pulse:0.000295,oc:{spd:0.000238,ph:5.5,min:0.05,max:0.88},pl:0.22 },
  { x:0.50,y:0.30,r:0.14,col:[68,78,8],spd:0.000372,ph:3.0,amp:0.102,pulse:0.000308,oc:{spd:0.000248,ph:2.0,min:0.00,max:0.75},pl:0.23 },
];
const V4_BANDS: V4Band[] = [
  { cx:0.55,cy:0.70,rx:0.72,ry:0.18,ang:0.22,col:[52,48,6],spd:0.000038,ph:0.0,amp:0.012,oc:{spd:0.000032,ph:0.0,min:0.18,max:0.52},pl:0.03 },
  { cx:0.30,cy:0.30,rx:0.68,ry:0.14,ang:-0.18,col:[4,30,52],spd:0.000032,ph:2.2,amp:0.010,oc:{spd:0.000028,ph:1.5,min:0.15,max:0.48},pl:0.03 },
  { cx:0.50,cy:0.55,rx:0.80,ry:0.12,ang:0.05,col:[5,40,25],spd:0.000035,ph:4.5,amp:0.011,oc:{spd:0.000030,ph:3.2,min:0.12,max:0.44},pl:0.02 },
  { cx:0.65,cy:0.40,rx:0.55,ry:0.10,ang:0.38,col:[48,40,5],spd:0.000040,ph:1.8,amp:0.013,oc:{spd:0.000035,ph:0.5,min:0.10,max:0.40},pl:0.04 },
];

// ─── Shared drawing helpers ──────────────────────────────────────────────────

function drawStandardPool(
  ctx: CanvasRenderingContext2D,
  p: Pool,
  frame: number,
  W: number,
  H: number,
  phMul = 1.4,
  ampMul = 0.65,
) {
  const t = frame * p.spd;
  const tp = frame * p.pulse;
  const bx = p.x + Math.sin(t + p.ph) * p.amp;
  const by = p.y + Math.cos(t + p.ph * phMul) * p.amp * ampMul;
  const br = p.r * (1 + Math.sin(tp + p.ph * 0.7) * 0.06);
  const cx = bx * W, cy = by * H;
  const rad = br * Math.max(W, H);
  const [r, g, b] = p.col;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.75)`);
  grad.addColorStop(0.35, `rgba(${r},${g},${b},0.30)`);
  grad.addColorStop(0.65, `rgba(${r},${g},${b},0.08)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0.00)`);
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

function drawDepthCrush(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  innerCol: string,
  midCol: string,
  outerCol: string,
  radius = 0.72,
) {
  ctx.globalCompositeOperation = "multiply";
  const depth = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * radius);
  depth.addColorStop(0, innerCol);
  depth.addColorStop(0.55, midCol);
  depth.addColorStop(1, outerCol);
  ctx.fillStyle = depth;
  ctx.fillRect(0, 0, W, H);
}

function drawAtmBand(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  topCol: string,
  bottomCol: string,
  topFade = 0.12,
  bottomFade = 0.88,
) {
  const atm = ctx.createLinearGradient(0, 0, 0, H);
  atm.addColorStop(0, topCol);
  atm.addColorStop(topFade, "rgba(0,0,0,0)");
  atm.addColorStop(bottomFade, "rgba(0,0,0,0)");
  atm.addColorStop(1, bottomCol);
  ctx.fillStyle = atm;
  ctx.fillRect(0, 0, W, H);
}

// ─── Variant-specific renderers ──────────────────────────────────────────────

function renderV01(ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#010e0a";
  ctx.fillRect(0, 0, W, H);
  POOLS_01.forEach(p => drawStandardPool(ctx, p, frame, W, H));
  drawDepthCrush(ctx, W, H, "rgba(22,52,36,0.0)", "rgba(4,16,10,0.35)", "rgba(1,8,5,0.90)");
  drawAtmBand(ctx, W, H, "rgba(1,8,5,0.55)", "rgba(1,8,5,0.65)");
  ctx.globalCompositeOperation = "source-over";
}

function renderV02(ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#01080f";
  ctx.fillRect(0, 0, W, H);
  POOLS_02.forEach(p => {
    const t = frame * p.spd;
    const tp = frame * p.pulse;
    const bx = p.x + Math.sin(t + p.ph) * p.amp;
    const by = p.y + Math.cos(t + p.ph * 1.3) * p.amp * 0.70;
    const br = p.r * (1 + Math.sin(tp + p.ph * 0.8) * 0.055);
    const cx = bx * W, cy = by * H;
    const rad = br * Math.max(W, H);
    const [r, g, b] = p.col;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.72)`);
    grad.addColorStop(0.38, `rgba(${r},${g},${b},0.28)`);
    grad.addColorStop(0.68, `rgba(${r},${g},${b},0.06)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0.00)`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  });
  drawDepthCrush(ctx, W, H, "rgba(8,20,38,0.0)", "rgba(2,8,18,0.40)", "rgba(1,4,10,0.92)", 0.75);
  drawAtmBand(ctx, W, H, "rgba(1,5,12,0.70)", "rgba(1,5,12,0.60)", 0.18, 0.82);
  ctx.globalCompositeOperation = "source-over";
}

function renderV03(ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#020e04";
  ctx.fillRect(0, 0, W, H);
  POOLS_03.forEach(p => {
    const t = frame * p.spd;
    const tp = frame * p.pulse;
    const bx = p.x + Math.sin(t + p.ph) * p.amp;
    const by = p.y + Math.cos(t + p.ph * 1.5) * p.amp * 0.60;
    const br = p.r * (1 + Math.sin(tp + p.ph * 0.6) * 0.065);
    const cx = bx * W, cy = by * H;
    const rad = br * Math.max(W, H);
    const [r, g, b] = p.col;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.78)`);
    grad.addColorStop(0.32, `rgba(${r},${g},${b},0.32)`);
    grad.addColorStop(0.62, `rgba(${r},${g},${b},0.09)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0.00)`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  });
  drawDepthCrush(ctx, W, H, "rgba(15,35,8,0.0)", "rgba(4,14,3,0.38)", "rgba(1,6,1,0.88)", 0.70);
  drawAtmBand(ctx, W, H, "rgba(1,6,1,0.60)", "rgba(1,6,1,0.65)", 0.14, 0.86);
  ctx.globalCompositeOperation = "source-over";
}

function renderV04(ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#010c09";
  ctx.fillRect(0, 0, W, H);

  const drawV4Pool = (p: V4Pool) => {
    const t = frame * p.spd;
    const oc = p.oc;
    const opB = oc.min + (oc.max - oc.min) * (0.5 + 0.5 * Math.sin(frame * oc.spd + oc.ph));
    const bx = p.x + Math.sin(t + p.ph) * p.amp;
    const by = p.y + Math.cos(t + p.ph * 1.22) * p.amp * 0.68;
    const br = p.r * (1 + Math.sin(frame * p.pulse + p.ph * 0.82) * 0.055);
    const cx = bx * W, cy = by * H;
    const rad = br * Math.max(W, H);
    const [r, g, b] = p.col;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, `rgba(${r},${g},${b},${(opB * 0.88).toFixed(3)})`);
    grad.addColorStop(0.18, `rgba(${r},${g},${b},${(opB * 0.52).toFixed(3)})`);
    grad.addColorStop(0.42, `rgba(${r},${g},${b},${(opB * 0.18).toFixed(3)})`);
    grad.addColorStop(0.68, `rgba(${r},${g},${b},${(opB * 0.04).toFixed(3)})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0.000)`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  };

  // Elliptical bands
  V4_BANDS.forEach(b => {
    const t = frame * b.spd;
    const oc = b.oc;
    const opB = oc.min + (oc.max - oc.min) * (0.5 + 0.5 * Math.sin(frame * oc.spd + oc.ph));
    const bx = (b.cx + Math.sin(t + b.ph) * b.amp) * W;
    const by = (b.cy + Math.cos(t + b.ph * 1.3) * b.amp * 0.6) * H;
    const scaleX = b.rx * Math.max(W, H);
    const scaleY = b.ry * Math.max(W, H);
    const [r, g, bl] = b.col;
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(b.ang);
    ctx.scale(1, scaleY / scaleX);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, scaleX);
    grad.addColorStop(0, `rgba(${r},${g},${bl},${(opB * 0.60).toFixed(3)})`);
    grad.addColorStop(0.30, `rgba(${r},${g},${bl},${(opB * 0.30).toFixed(3)})`);
    grad.addColorStop(0.60, `rgba(${r},${g},${bl},${(opB * 0.08).toFixed(3)})`);
    grad.addColorStop(1, `rgba(${r},${g},${bl},0.000)`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = grad;
    ctx.fillRect(-scaleX, -scaleX, scaleX * 2, scaleX * 2);
    ctx.restore();
  });

  V4_LAYER_A.forEach(drawV4Pool);
  V4_LAYER_B.forEach(drawV4Pool);
  V4_LAYER_C.forEach(drawV4Pool);

  ctx.globalCompositeOperation = "multiply";
  const depth = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.85);
  depth.addColorStop(0, "rgba(16,42,28,0.00)");
  depth.addColorStop(0.22, "rgba(5,18,11,0.15)");
  depth.addColorStop(0.50, "rgba(2,9,6,0.44)");
  depth.addColorStop(0.76, "rgba(1,5,3,0.70)");
  depth.addColorStop(1, "rgba(1,4,2,0.95)");
  ctx.fillStyle = depth;
  ctx.fillRect(0, 0, W, H);
  drawAtmBand(ctx, W, H, "rgba(1,5,3,0.68)", "rgba(1,5,3,0.72)", 0.11, 0.89);
  ctx.globalCompositeOperation = "source-over";
}

function renderV05(ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#010f0b";
  ctx.fillRect(0, 0, W, H);

  DENSE_POOLS_05.forEach((p, i) => {
    const t = frame * p.spd;
    const amp = DENSE_AMPS[i];
    const bx = p.x + Math.sin(t + p.ph) * amp;
    const by = p.y + Math.cos(t + p.ph * 1.35) * amp * 0.68;
    const br = p.r * (1 + Math.sin(t * 1.6 + p.ph) * 0.055);
    const cx = bx * W, cy = by * H;
    const rad = br * Math.max(W, H);
    const [r, g, b] = p.col;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.80)`);
    grad.addColorStop(0.28, `rgba(${r},${g},${b},0.35)`);
    grad.addColorStop(0.55, `rgba(${r},${g},${b},0.10)`);
    grad.addColorStop(0.80, `rgba(${r},${g},${b},0.02)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0.00)`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  });

  drawDepthCrush(ctx, W, H, "rgba(18,42,28,0.0)", "rgba(4,15,10,0.35)", "rgba(1,8,5,0.90)", 0.68);
  drawAtmBand(ctx, W, H, "rgba(1,8,5,0.55)", "rgba(1,8,5,0.62)");
  ctx.globalCompositeOperation = "source-over";
}

function renderV06(ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#010d08";
  ctx.fillRect(0, 0, W, H);

  THERMAL_POOLS_06.forEach(p => {
    const t = frame * p.spd;
    const tp = frame * p.spd * 1.8;
    const bx = p.x + Math.sin(t + p.ph) * p.ampX;
    const by = p.y + Math.sin(t + p.ph) * p.ampY + p.bias * Math.abs(Math.sin(t * 0.4 + p.ph));
    const br = p.r * (1 + Math.sin(tp + p.ph * 0.7) * 0.06);
    const cx = bx * W, cy = by * H;
    const rad = br * Math.max(W, H);
    const [r, g, b] = p.col;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.76)`);
    grad.addColorStop(0.30, `rgba(${r},${g},${b},0.32)`);
    grad.addColorStop(0.60, `rgba(${r},${g},${b},0.08)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0.00)`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  });

  // Thermal depth — cool top, warm bottom
  ctx.globalCompositeOperation = "multiply";
  const depth = ctx.createLinearGradient(0, 0, 0, H);
  depth.addColorStop(0, "rgba(1,5,12,0.65)");
  depth.addColorStop(0.35, "rgba(2,10,6,0.0)");
  depth.addColorStop(0.65, "rgba(5,12,2,0.0)");
  depth.addColorStop(1, "rgba(3,8,1,0.40)");
  ctx.fillStyle = depth;
  ctx.fillRect(0, 0, W, H);

  const rdepth = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.72);
  rdepth.addColorStop(0, "rgba(10,28,15,0.0)");
  rdepth.addColorStop(0.52, "rgba(2,10,5,0.32)");
  rdepth.addColorStop(1, "rgba(1,6,3,0.88)");
  ctx.fillStyle = rdepth;
  ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = "source-over";
}

// ─── Renderer map ────────────────────────────────────────────────────────────

const RENDERERS: Record<number, (ctx: CanvasRenderingContext2D, W: number, H: number, frame: number) => void> = {
  1: renderV01,
  2: renderV02,
  3: renderV03,
  4: renderV04,
  5: renderV05,
  6: renderV06,
};

// ─── Component ───────────────────────────────────────────────────────────────

interface DeepFieldCanvasProps {
  variant: 1 | 2 | 3 | 4 | 5 | 6;
  size?: number;
  className?: string;
}

export default function DeepFieldCanvas({ variant, size = 500, className = "" }: DeepFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const renderer = RENDERERS[variant];

  // Start/resume the animation loop — only runs while visible
  const startLoop = useCallback(() => {
    function loop() {
      if (!isVisibleRef.current) return; // exit loop when hidden
      frameRef.current++;
      if (ctxRef.current && renderer) {
        renderer(ctxRef.current, size, size, frameRef.current);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [renderer, size]);

  // Set up canvas once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctxRef.current = ctx;
  }, [variant, size]);

  // Observe visibility — start/stop loop accordingly
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        // Restart loop when becoming visible
        if (!wasVisible && entry.isIntersecting && ctxRef.current) {
          startLoop();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [startLoop]);

  return (
    <div ref={wrapperRef} style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className={className}
        style={{ width: size, height: size, display: "block" }}
      />
    </div>
  );
}
