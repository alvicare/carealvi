/* eslint-disable */
"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { createPortal } from "react-dom";

// ============================================================================
// AlviCare WebGL Shader Preloader — Brand Constants, Vector Paths & Math Rig
// ============================================================================

const DEFAULT_PALETTE = {
  background: "#041211",
  deepTeal: "#0B4F4A",
  teal: "#0F766E",
  mint: "#2DD4BF",
  aqua: "#99F6E4",
  amber: "#F59E5B",
};

const DEFAULT_PASSES = [
  "Initializing care engine",
  "Aligning telemetry",
  "Calibrating precision",
  "Connecting AlviCare",
  "Ready",
];

const DISPLAY_STACK =
  '"Space Grotesk", "Sora", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const MONO_STACK =
  '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace';

// Exact AlviCare vector glyphs ("Al" and "iCare") from the brand SVG
const ALVI_LETTERS_PATH =
  "M24 0 312 -700H392L678 0H554L330 -567H372L146 0ZM166 -135V-235H537V-135Z " +
  "M743 0V-720H853V0Z " +
  "M1696 0V-480H1806V0ZM1751 -568Q1723 -568 1704.5 -587Q1686 -606 1686 -634Q1686 -662 1704.5 -681Q1723 -700 1751 -700Q1780 -700 1798 -681Q1816 -662 1816 -634Q1816 -606 1798 -587Q1780 -568 1751 -568Z " +
  "M2242 10Q2166 10 2101.5 -17.5Q2037 -45 1989 -94.5Q1941 -144 1915 -209.5Q1889 -275 1889 -350Q1889 -425 1915 -490.5Q1941 -556 1989 -605Q2037 -654 2101.5 -682Q2166 -710 2242 -710Q2327 -710 2389 -682Q2451 -654 2499 -606L2421 -528Q2390 -562 2345.5 -581Q2301 -600 2242 -600Q2190 -600 2147 -582Q2104 -564 2072.5 -530.5Q2041 -497 2024 -451Q2007 -405 2007 -350Q2007 -295 2024 -249Q2041 -203 2072.5 -169.5Q2104 -136 2147 -118Q2190 -100 2242 -100Q2306 -100 2350.5 -119.5Q2395 -139 2426 -173L2504 -95Q2456 -46 2391 -18Q2326 10 2242 10Z " +
  "M2773 10Q2708 10 2655.5 -23Q2603 -56 2572.5 -112.5Q2542 -169 2542 -239Q2542 -310 2572.5 -366.5Q2603 -423 2655.5 -456.5Q2708 -490 2773 -490Q2828 -490 2870.5 -466.5Q2913 -443 2938 -402Q2963 -361 2963 -309V-171Q2963 -119 2938.5 -78Q2914 -37 2871 -13.5Q2828 10 2773 10ZM2791 -94Q2852 -94 2889.5 -135Q2927 -176 2927 -240Q2927 -283 2910 -316Q2893 -349 2862.5 -367.5Q2832 -386 2791 -386Q2751 -386 2720.5 -367.5Q2690 -349 2672.5 -316Q2655 -283 2655 -240Q2655 -197 2672.5 -164Q2690 -131 2720.5 -112.5Q2751 -94 2791 -94ZM2920 0V-129L2939 -246L2920 -362V-480H3030V0Z " +
  "M3132 0V-480H3242V0ZM3242 -267 3204 -286Q3204 -377 3244.5 -433.5Q3285 -490 3367 -490Q3403 -490 3432 -477Q3461 -464 3486 -435L3414 -361Q3401 -375 3385 -381Q3369 -387 3348 -387Q3302 -387 3272 -358Q3242 -329 3242 -267Z " +
  "M3760 10Q3688 10 3630.5 -22.5Q3573 -55 3539.5 -112Q3506 -169 3506 -240Q3506 -311 3539 -367.5Q3572 -424 3628.5 -457Q3685 -490 3754 -490Q3821 -490 3872.5 -459Q3924 -428 3953.5 -374Q3983 -320 3983 -251Q3983 -239 3981.5 -226.5Q3980 -214 3977 -199H3583V-289H3920L3879 -253Q3877 -297 3862 -327Q3847 -357 3819.5 -373Q3792 -389 3752 -389Q3710 -389 3679 -371Q3648 -353 3631 -320.5Q3614 -288 3614 -243Q3614 -198 3632 -164Q3650 -130 3683 -111.5Q3716 -93 3759 -93Q3796 -93 3827.5 -106Q3859 -119 3881 -144L3951 -73Q3916 -32 3866 -11Q3816 10 3760 10Z";

// Phase durations (ms)
const IGNITE_MS = 2400;
const HOLD_MS = 2800;
const LIFT_MS = 1400;

// Core geometry & rig constants
const TAU = Math.PI * 2;
const HERO_Y = 0.1;
const HERO_R = 0.22;
const HERO_ROT = 0;
const HEAD_R = 0.048;

const clamp01 = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const sm = (t: number) => t * t * (3 - 2 * t);

// Nonlinear loading knots [time, progress]
const KNOTS: [number, number][] = [
  [0, 0],
  [0.16, 0.22],
  [0.27, 0.26],
  [0.55, 0.62],
  [0.66, 0.66],
  [0.84, 0.9],
  [1, 1],
];

function acpSimulated(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  for (let i = 0; i < KNOTS.length - 1; i++) {
    const [t0, p0] = KNOTS[i];
    const [t1, p1] = KNOTS[i + 1];
    if (t <= t1) return p0 + (p1 - p0) * sm((t - t0) / (t1 - t0));
  }
  return 1;
}

function acpEase(t: number): number {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function acpMorph(p: number): number {
  const x = clamp01(p) * 4;
  const k = Math.min(3, Math.floor(x));
  return k + sm(clamp01((x - k - 0.3) / 0.7));
}

function acpPass(m: number, n: number): number {
  if (n < 1) return -1;
  const x = Math.min(4, Math.max(0, m));
  return Math.min(n - 1, Math.round((x / 4) * (n - 1)));
}

function acpView(aspect: number) {
  const zoom = Math.max(1, 0.92 / Math.max(aspect, 0.1));
  return { zoom, w: aspect * zoom, h: zoom };
}

function acpHead(aspect: number) {
  const v = acpView(aspect);
  const x = -Math.min(v.w * 0.3, 0.52);
  const y = -v.h * 0.2;
  const tail = lerp(1.05, 0.5, clamp01((aspect - 0.5) / 1));
  const room = Math.min((v.w / 2 - x) / Math.cos(tail), (v.h / 2 - y) / Math.sin(tail));
  return { x, y, tail, room };
}

function acpRig(m: number, aspect: number) {
  const { zoom, w, h } = acpView(aspect);
  const s1 = sm(clamp01(m));
  const s2 = sm(clamp01(m - 1));
  const s3 = sm(clamp01(m - 2));
  const s4 = sm(clamp01(m - 3));

  let phi = Math.max(0.02, s1 * TAU);
  const rho0 = ((1 - s1) * w) / phi;
  let ax = 0;
  let ay = (h / 2) * (1 - s1) + rho0;
  let beta = -Math.PI / 2;
  let kv = lerp(1 / h, 2.6, s1);

  beta += s2 * Math.PI;
  phi = lerp(phi, 0.85, s2);
  ay = lerp(ay, -0.3, s2);
  kv = lerp(kv, 1.45, s2);

  const head = acpHead(aspect);
  beta = lerp(beta, head.tail, s3);
  phi = lerp(phi, 0.55, s3);
  ax = lerp(ax, head.x, s3);
  ay = lerp(ay, head.y, s3);
  kv = lerp(kv, Math.max(0.75, 0.8 / (head.room * 0.92)), s3);

  const closed = sm(clamp01((phi / TAU - 0.9) / 0.1));
  return {
    zoom,
    ax,
    ay,
    beta,
    phi,
    rho0,
    kv,
    vf: lerp(1, 0.32, s3),
    narrow: lerp(lerp(1, 0.55, s2), 0.3, s3),
    wave: s3,
    bulge: s2 * (1 - s3),
    edge: clamp01(s1 * 4) * (1 - closed),
    closed,
    mark: s4,
    lines: s4,
  };
}

function acpIgnite(i: number, aspect: number) {
  const head = acpHead(aspect);
  const x = clamp01(i);
  const e = acpEase(x);
  const cx = head.x * 0.15 + 0.22;
  const cy = head.y - 0.1;
  const k = 1 - e;
  return {
    x: k * k * head.x + 2 * k * e * cx,
    y: k * k * head.y + 2 * k * e * cy + e * e * HERO_Y,
    r: lerp(HEAD_R, HERO_R, sm(clamp01((x - 0.08) / 0.8))),
    rot: lerp(0, HERO_ROT + TAU, e),
    mode: sm(clamp01((x - 0.28) / 0.56)),
    comet: 1 - sm(clamp01((x - 0.05) / 0.5)),
    retract: sm(clamp01(x / 0.5)),
    lines: 1 - sm(clamp01((x - 0.4) / 0.4)),
    bloom: Math.exp(-Math.pow((x - 0.32) / 0.08, 2)),
  };
}

function acpHex(s: unknown): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(s).trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
  return [0, 2, 4].map((o) => parseInt(h.slice(o, o + 2), 16) / 255) as [number, number, number];
}

// ============================================================================
// WebGL Shaders
// ============================================================================

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uZoom;
uniform float uTime;

uniform vec2 uApex;
uniform float uBeta;
uniform float uPhi;
uniform float uRho0;
uniform float uKv;
uniform float uVf;
uniform float uNarrow;
uniform float uWave;
uniform float uBulge;
uniform float uEdge;
uniform float uClosed;
uniform float uComet;
uniform float uLines;
uniform float uLineDir;

uniform vec2 uMarkC;
uniform float uMarkR;
uniform float uMarkAmt;
uniform float uMarkMode;
uniform float uMarkRot;
uniform float uSwirl;
uniform vec2 uTilt;
uniform float uHoleOpen;
uniform float uFlash;
uniform float uBloom;

uniform vec3 uPtr;
uniform vec3 uBg;
uniform vec3 uDeepTeal;
uniform vec3 uTeal;
uniform vec3 uMint;
uniform vec3 uAqua;
uniform vec3 uAmber;
uniform float uExposure;
uniform float uGrain;

#define PI 3.14159265
#define TAU 6.28318531

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float pnoise(vec2 p, float per) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 w = f * f * (3.0 - 2.0 * f);
  float x0 = mod(i.x, per);
  float x1 = mod(i.x + 1.0, per);
  float a = hash(vec2(x0, i.y));
  float b = hash(vec2(x1, i.y));
  float c = hash(vec2(x0, i.y + 1.0));
  float d = hash(vec2(x1, i.y + 1.0));
  return mix(mix(a, b, w.x), mix(c, d, w.x), w.y);
}

float fbm(vec2 p, float per) {
  float s = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    s += amp * pnoise(p, per);
    p = p * 2.0 + vec2(0.0, 17.3);
    per *= 2.0;
    amp *= 0.5;
  }
  return s / 0.9375;
}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, s, -s, c);
}

float dot2(vec2 v) {
  return dot(v, v);
}

float sdHeart(vec2 p) {
  p.x = abs(p.x);
  if (p.y + p.x > 1.0) {
    return sqrt(dot2(p - vec2(0.25, 0.75))) - 0.35355339;
  }
  return sqrt(min(
    dot2(p - vec2(0.0, 1.0)),
    dot2(p - 0.5 * max(p.x + p.y, 0.0))
  )) * sign(p.x - p.y);
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

vec3 sheet(float u, float v, float t) {
  float X = u * 20.0;
  float vy = v * uVf;
  float w = fbm(vec2(X * 0.5, vy * 1.3 - t * 0.12), 10.0);
  float wave = sin(v * 9.0 - t * 2.2) * uWave * 0.9;
  float n = fbm(vec2(X + (w - 0.5) * 5.0 + wave, vy * 1.6 - t * 0.22), 20.0);
  float ridge = 1.0 - abs(n * 2.0 - 1.0);
  float ribbons = pow(ridge, mix(4.8, 2.5, uWave));
  float blob = pnoise(vec2(X * 0.25, v * 2.2 - t * 0.18), 5.0);
  float len = 0.5 + 0.42 * pnoise(vec2(X * 0.5, 3.7 + t * 0.03), 10.0);
  float body = smoothstep(len + 0.08, len - 0.42, v) * smoothstep(-0.02, 0.07, v);
  float I = ribbons * body * (0.34 + 1.3 * blob);

  float hue = pnoise(vec2(X * 0.5, v * 0.7 + t * 0.04 + 9.0), 10.0);
  vec3 c = mix(uDeepTeal * 1.5, uTeal * 1.65, smoothstep(0.18, 0.55, hue));
  c = mix(c, uMint * 1.35, smoothstep(0.55, 0.88, hue));
  vec3 col = c * I * 1.75;

  float fringe = smoothstep(0.4, 0.62, I) * smoothstep(1.05, 0.68, I);
  col += mix(uAmber * 1.15, uAqua, smoothstep(0.28, 0.72, hue)) * fringe * 0.65;
  col += vec3(0.95, 1.0, 0.98) * smoothstep(0.74, 1.28, I) * 1.3;

  float across = mix(1.0 - 0.7 * smoothstep(0.0, 0.5, abs(u - 0.5)), 1.0, uClosed);
  float flare = exp(-abs(v) * 6.5) * 0.6 + exp(-abs(v) * 30.0) * 1.25;
  col += mix(uAqua, vec3(1.0), 0.4) * flare * across;

  vec2 g = vec2(u * 64.0, v * 20.0 - t * 0.7);
  vec2 id = floor(g);
  id.x = mod(id.x, 64.0);
  float h = hash(id + 11.0);
  vec2 off = vec2(hash(id + 3.7), hash(id + 9.1)) - 0.5;
  float spark = step(0.925, h) * smoothstep(0.17, 0.0, length(fract(g) - 0.5 - off * 0.6));
  spark *= (0.55 + 0.45 * sin(t * 6.0 + h * 40.0)) * smoothstep(0.05, 0.2, v) * smoothstep(1.15, 0.6, v);
  col += mix(uAmber, vec3(1.0, 0.94, 0.86), 0.35) * spark * 1.65;
  return col;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 a = p * uZoom;
  float t = uTime;

  vec2 pd = a - uPtr.xy;
  float pr = dot(pd, pd);
  vec2 aw = uPtr.xy + rot(uPtr.z * 1.5 * exp(-pr * 14.0)) * pd * (1.0 - uPtr.z * 0.22 * exp(-pr * 24.0));

  vec3 col = uBg + uTeal * 0.09 * smoothstep(1.25, 0.0, length(p));
  float alpha = 1.0;

  if (uComet > 0.001) {
    vec2 d = aw - uApex;
    float rho = length(d);
    float ang = mod(atan(d.y, d.x) - uBeta + PI, TAU) - PI;
    float v = (rho - uRho0) * uKv;
    float u = ang / uPhi * (1.0 - uBulge * 0.45 * sin(clamp(v, 0.0, 1.0) * PI)) + 0.5;
    float mask = mix(1.0, smoothstep(0.0, 0.07, u) * smoothstep(1.0, 0.93, u), uEdge);
    col += sheet(0.5 + (u - 0.5) * uNarrow, v, t) * mask * uComet;
    col += mix(uMint, uAmber, 0.35) * exp(-pr * 70.0) * uPtr.z * 0.12;
  }

  if (uLines > 0.001) {
    vec2 dir = vec2(cos(uLineDir), sin(uLineDir));
    float along = dot(a, dir);
    float across = dot(a, vec2(-dir.y, dir.x)) * 38.0;
    float h = hash(vec2(floor(across), 3.1));
    float lane = fract(across) - 0.5;
    float seg = fract(along * 0.45 - t * (0.5 + h * 1.3) + h * 9.0);
    float line = step(0.8, h) * exp(-lane * lane * 40.0) * smoothstep(0.0, 0.08, seg) * smoothstep(0.42, 0.1, seg);
    col += mix(uTeal * 1.4, uMint, hash(vec2(h, 1.0))) * line * uLines * 0.9;
  }

  if (uMarkAmt > 0.001) {
    vec2 q = a - uMarkC;
    float den = max(0.2, 1.0 + dot(q, uTilt));
    q /= den;
    float rr = length(q);
    float R = max(uMarkR, 0.0001);
    float aa = 2.2 * uZoom * den / (uRes.y * R);

    vec2 qr = rot(uMarkRot + uSwirl * min(rr / R, 2.5)) * q;
    vec2 u = qr / R;
    float ang = atan(qr.y, qr.x);

    float pulse = 1.0 + 0.07 * sin(t * 4.2);
    float dHead = sdHeart(u / (1.35 * pulse) + vec2(0.0, 0.52));
    vec3 heartCore = mix(uAmber * 1.8, vec3(1.0, 0.96, 0.9), smoothstep(0.05, -0.35, dHead));
    vec3 spark = heartCore * (1.0 - smoothstep(-aa, aa * 1.8, dHead)) * 2.1;
    spark += uAmber * exp(-max(dHead, 0.0) * 3.8) * 1.15;
    spark += mix(uMint, uAmber, 0.6) * exp(-rr / R * 0.85) * 0.55;
    col += spark * uMarkAmt * (1.0 - uMarkMode);

    if (uMarkMode > 0.001) {
      vec2 qa = abs(u) + 0.00001;
      float e = 3.65;
      float S = pow(pow(qa.x, e) + pow(qa.y, e), 1.0 / e);

      float grad = clamp(0.5 + (u.x - u.y) * 0.36, 0.0, 1.0);
      vec3 tile = mix(uTeal * 1.28, uDeepTeal * 1.05, grad);
      float caustic = 0.5 + 0.5 * sin(u.x * 4.5 - u.y * 3.5 + t * 0.9);
      tile += uMint * 0.14 * caustic * smoothstep(1.0, 0.15, S);
      tile += uMint * 0.2 * exp(-dot(u, u) * 1.8);
      float rimBand = smoothstep(0.84, 0.985, S);
      vec3 rimCol = mix(uAqua, uAmber, 0.35 + 0.35 * sin(ang * 2.0 - t * 0.6));
      tile += rimCol * rimBand * 0.95;
      float topGloss = smoothstep(0.91, 0.985, S) * smoothstep(-0.3, 0.8, u.y - u.x * 0.4);
      tile += vec3(0.95, 1.0, 0.99) * topGloss * 0.55;

      float dV = min(
        sdSegment(u, vec2(-0.384, 0.192), vec2(-0.038, -0.345)),
        sdSegment(u, vec2(-0.038, -0.345), vec2(0.345, 0.345))
      ) - 0.077;
      float vFill = 1.0 - smoothstep(-aa * 0.7, aa * 0.9, dV);
      float vGlow = exp(-max(dV, 0.0) * 14.0);

      float hBeat = 1.0 + 0.035 * sin(t * 2.8);
      float hScale = 0.261 * hBeat;
      float dHeart = sdHeart((u - vec2(0.345, 0.230)) / hScale) * hScale;
      float hFill = 1.0 - smoothstep(-aa * 0.7, aa * 0.9, dHeart);
      float hGlow = exp(-max(dHeart, 0.0) * 16.0);

      float markVis = (1.0 - smoothstep(0.0, 0.48, uHoleOpen));
      vec3 ic = tile;
      ic += uAqua * vGlow * 0.38 * markVis;
      ic = mix(ic, vec3(1.18, 1.22, 1.21), vFill * markVis);
      ic += uAmber * hGlow * 0.55 * markVis;
      vec3 heartShade = mix(uAmber * 1.45, vec3(1.0, 0.88, 0.74), smoothstep(0.0, -0.09, dHeart));
      ic = mix(ic, heartShade, hFill * markVis);

      float o = max(S - 1.0, 0.0);
      float fold = 0.5 + 0.5 * sin(ang * 2.0 + 0.7);
      vec3 mem = mix(uBg, uDeepTeal, 0.14) * 1.25;
      mem += uTeal * (0.14 + 0.18 * fold) * exp(-o * 0.65);
      mem += uTeal * 0.55 * exp(-o * 4.5) + uAqua * 0.78 * exp(-o * 26.0);
      mem -= vec3(0.04) * exp(-o * 9.0) * (1.0 - exp(-o * 60.0));
      float rays = pow(0.5 + 0.5 * sin(ang * 6.0 + sin(ang * 3.0 + t * 0.2) * 1.6 + t * 0.05), 7.0);
      mem += mix(uMint, uAmber, 0.22) * rays * exp(-rr / R * 0.65) * 0.7;
      mem += mix(uAqua, vec3(1.0), 0.45) * exp(-o * 7.5) * 0.34;

      vec3 portal = mix(max(mem, vec3(0.0)), ic, 1.0 - smoothstep(1.0 - aa, 1.0 + aa, S));
      col = mix(col, portal, uMarkMode);

      float hole = (1.0 - smoothstep(1.0 - aa, 1.0 + aa, S)) * (1.0 - smoothstep(0.62, 0.96, S));
      alpha = 1.0 - uHoleOpen * hole * uMarkMode;
    }
  }

  float bd = length(a - uMarkC);
  col += mix(uAqua, uAmber, 0.45) * uBloom * (exp(-bd * 18.0) * 3.0 + exp(-bd * 5.5) * 1.1 + 0.03);

  col = 1.0 - exp(-col * uExposure);
  col *= 1.0 - 0.5 * smoothstep(0.35, 1.25, length(p * vec2(0.9, 1.0)));
  col += (hash(gl_FragCoord.xy + fract(t * 7.0) * 311.0) - 0.5) * uGrain;
  col = mix(col, vec3(0.95, 1.0, 0.99), uFlash);
  alpha = mix(alpha, 1.0, uFlash);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * alpha, alpha);
}
`;

const UNIFORMS = [
  "uRes",
  "uZoom",
  "uTime",
  "uApex",
  "uBeta",
  "uPhi",
  "uRho0",
  "uKv",
  "uVf",
  "uNarrow",
  "uWave",
  "uBulge",
  "uEdge",
  "uClosed",
  "uComet",
  "uLines",
  "uLineDir",
  "uMarkC",
  "uMarkR",
  "uMarkAmt",
  "uMarkMode",
  "uMarkRot",
  "uSwirl",
  "uTilt",
  "uHoleOpen",
  "uFlash",
  "uBloom",
  "uPtr",
  "uBg",
  "uDeepTeal",
  "uTeal",
  "uMint",
  "uAqua",
  "uAmber",
  "uExposure",
  "uGrain",
];

function linkShaderProgram(
  gl: WebGLRenderingContext,
  vert: string,
  frag: string
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  const pairs: [number, string][] = [
    [gl.VERTEX_SHADER, vert],
    [gl.FRAGMENT_SHADER, frag],
  ];
  for (const [type, source] of pairs) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  return program;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

const ACP_CSS = `
.acp-root {
  position: fixed;
  inset: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-width: 100vw;
  min-height: 100vh;
  min-height: 100dvh;
  z-index: 999999;
  margin: 0;
  padding: 0;
  overflow: hidden;
  isolation: isolate;
  background: var(--acp-bg);
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.acp-root[data-phase="done"] {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}
.acp-gate {
  position: absolute;
  inset: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  z-index: 10;
  background: var(--acp-bg);
  color: #f0fdfa;
  font-family: var(--acp-mono);
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  transition: opacity 0.6s ease;
}
.acp-root[data-phase="lift"] .acp-gate {
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease 0.6s;
}
.acp-layer, .acp-canvas {
  position: absolute;
  inset: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  display: block;
  pointer-events: none;
}
.acp-grid {
  background-image:
    linear-gradient(rgba(153, 246, 228, 0.065) 1px, transparent 1px),
    linear-gradient(90deg, rgba(153, 246, 228, 0.065) 1px, transparent 1px);
  background-size: calc(var(--acp-u) * 0.065) calc(var(--acp-u) * 0.065);
  background-position: 50% 50%;
  mix-blend-mode: screen;
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 30%, transparent 85%);
  mask-image: radial-gradient(ellipse at 50% 50%, #000 30%, transparent 85%);
  transition: opacity 1.4s ease;
}
.acp-root:not([data-phase="load"]) .acp-grid { opacity: 0; }
.acp-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--acp-u) * 0.065);
  background: #020808;
  pointer-events: none;
  transition: transform 1.1s cubic-bezier(0.7, 0, 0.2, 1);
}
.acp-bar-top { top: 0; transform: translateY(-101%); }
.acp-bar-bot { bottom: 0; transform: translateY(101%); }
.acp-root[data-phase="ignite"] .acp-bar, .acp-root[data-phase="reveal"] .acp-bar { transform: none; }
.acp-hud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  font-size: clamp(9px, calc(var(--acp-u) * 0.017), 13px);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  transition: opacity 0.7s ease;
}
.acp-root[data-phase="lift"] .acp-hud { opacity: 0; }
.acp-bl {
  position: absolute;
  left: calc(var(--acp-u) * 0.05);
  bottom: calc(var(--acp-u) * 0.05);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.6, 0, 0.2, 1);
}
.acp-root:not([data-phase="load"]) .acp-bl { opacity: 0; transform: translateY(1.2em); }
.acp-count {
  font-family: var(--acp-display);
  font-size: clamp(30px, calc(var(--acp-u) * 0.13), 112px);
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  margin: 0;
  text-shadow:
    -1px 0 color-mix(in srgb, var(--acp-aqua) 60%, transparent),
    1px 0 color-mix(in srgb, var(--acp-amber) 60%, transparent);
}
.acp-count small { font-size: 0.3em; letter-spacing: 0.1em; margin-left: 0.3em; vertical-align: top; opacity: 0.6; }
.acp-segs { display: flex; gap: 4px; margin-top: 0.9em; width: clamp(120px, calc(var(--acp-u) * 0.36), 300px); }
.acp-seg { position: relative; flex: 1; height: 2px; background: rgba(153, 246, 228, 0.16); overflow: hidden; }
.acp-seg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--acp-aqua), var(--acp-mint), var(--acp-amber));
  transform-origin: 0 50%;
  transform: scaleX(clamp(0, calc(var(--acp-p) * 4 - var(--k)), 1));
}
.acp-title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  pointer-events: none;
  transition: opacity 0.6s ease, transform 1.7s cubic-bezier(0.6, 0, 0.3, 1), filter 1.2s ease;
}
.acp-root[data-phase="lift"] .acp-title { opacity: 0; transform: scale(1.35); filter: blur(10px); }
.acp-logo-svg {
  display: block;
  margin: 0 auto;
  width: clamp(160px, calc(var(--acp-u) * 0.38), 380px);
  height: auto;
  overflow: visible;
  opacity: 0;
  filter: blur(14px) drop-shadow(0 0 18px color-mix(in srgb, var(--acp-mint) 40%, transparent));
  transform: translateY(14px) scale(1.12);
  transition:
    opacity 1.1s ease 0.08s,
    filter 1.3s ease 0.08s,
    transform 1.4s cubic-bezier(0.15, 0.8, 0.15, 1) 0.08s;
}
.acp-root[data-phase="reveal"] .acp-logo-svg,
.acp-root[data-phase="lift"] .acp-logo-svg {
  opacity: 1;
  filter: blur(0) drop-shadow(0 0 14px color-mix(in srgb, var(--acp-teal) 55%, transparent));
  transform: none;
}
.acp-logo-heart {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  transform: scale(0.4);
  transition: opacity 0.7s ease 0.45s, transform 0.9s cubic-bezier(0.2, 1.35, 0.4, 1) 0.45s;
}
.acp-root[data-phase="reveal"] .acp-logo-heart,
.acp-root[data-phase="lift"] .acp-logo-heart {
  opacity: 1;
  transform: scale(1);
}
.acp-caption, .acp-hint {
  margin: 1.4em 0 0;
  font-size: clamp(9px, calc(var(--acp-u) * 0.017), 13px);
  letter-spacing: 0.4em;
  text-indent: 0.4em;
  text-transform: uppercase;
  color: rgba(204, 251, 241, 0.72);
  opacity: 0;
  transition: opacity 1s ease 0.7s, letter-spacing 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s;
}
.acp-hint { margin-top: 0.9em; color: rgba(204, 251, 241, 0.45); transition-delay: 1.6s; }
.acp-root[data-phase="reveal"] .acp-caption { opacity: 1; letter-spacing: 0.5em; }
.acp-root[data-phase="reveal"] .acp-hint { opacity: 1; animation: acp-breathe 2.4s ease-in-out 2.4s infinite; }
.acp-skip-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 20;
  padding: 0.35rem 0.85rem;
  font-size: 11px;
  font-family: var(--acp-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(204, 251, 241, 0.65);
  background: rgba(15, 118, 110, 0.18);
  border: 1px solid rgba(45, 212, 191, 0.25);
  border-radius: 9999px;
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: all 0.2s ease;
}
.acp-skip-btn:hover {
  color: #FFFFFF;
  background: rgba(15, 118, 110, 0.4);
  border-color: rgba(45, 212, 191, 0.45);
}
@keyframes acp-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) {
  .acp-root[data-phase="reveal"] .acp-hint { animation: none; }
  .acp-logo-svg, .acp-logo-heart { filter: none; transform: none; transition: opacity 0.4s ease; }
  .acp-root[data-phase="lift"] .acp-title { transform: none; filter: none; }
  .acp-bar, .acp-bl { transition-duration: 0.01s; }
}
`;

// ============================================================================
// Preloader Component
// ============================================================================

export interface PreloaderProps {
  durationMs?: number;
  onComplete?: () => void;
  className?: string;
}

export function Preloader({
  durationMs = 4500,
  onComplete,
  className = "",
}: PreloaderProps) {
  const uid = useId().replace(/:/g, "");
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"load" | "ignite" | "reveal" | "lift" | "done">("load");
  const [pct, setPct] = useState(0);
  const [pass, setPass] = useState(0);
  const [failed, setFailed] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [box, setBox] = useState({ w: 1920, h: 1080 });
  const still = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rushRef = useRef(false);
  const shownRef = useRef(0);
  const phaseRef = useRef(phase);
  const phaseAtRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const colors = DEFAULT_PALETTE;
  const passes = DEFAULT_PASSES;
  const word = "AlviCare";
  const caption = "Intelligent Care · Human Heart";

  const igniteMs = still ? 400 : IGNITE_MS;
  const liftMs = still ? 500 : LIFT_MS;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
    phaseAtRef.current = performance.now();
  }, [phase]);

  // Lock body scroll during preloader, unlock when finished
  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("alvi_intro_seen", "true");
      }
      onCompleteRef.current?.();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Measure container
  useEffect(() => {
    const root = rootRef.current;
    const measure = () => {
      const w = window.innerWidth || root?.clientWidth || 1920;
      const h = window.innerHeight || root?.clientHeight || 1080;
      if (w > 0 && h > 0) setBox({ w: Math.round(w), h: Math.round(h) });
    };
    measure();
    window.addEventListener("resize", measure);
    if (!root || typeof ResizeObserver === "undefined") {
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  // Drive progress loop
  useEffect(() => {
    if (phase !== "load") return;
    const root = rootRef.current;
    let raf = 0;
    let shown = 0;
    let last = performance.now();
    const start = last;
    let lastPct = -1;

    const paint = (p: number) => {
      shownRef.current = p;
      root?.style.setProperty("--acp-p", p.toFixed(4));
      const next = Math.round(p * 100);
      if (next !== lastPct) {
        lastPct = next;
        setPct(next);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      let target = acpSimulated((now - start) / Math.max(400, durationMs));
      if (rushRef.current) target = 1;
      const rate = rushRef.current ? 0.08 : 1;
      shown += (target - shown) * Math.min(1, rate * (dt / 16.7));
      if (Math.abs(target - shown) < 0.002) shown = target;
      paint(shown);
      if (shown >= 1) {
        setPhase("ignite");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    paint(shown);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, durationMs]);

  // WebGL Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
    } catch {
      gl = null;
    }
    if (!gl) {
      setFailed(true);
      return;
    }
    const program = linkShaderProgram(gl, VERT, FRAG);
    if (!program) {
      setFailed(true);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    if (aPos !== -1) {
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    }
    gl.useProgram(program);
    const U: Record<string, WebGLUniformLocation | null> = {};
    for (const name of UNIFORMS) U[name] = gl.getUniformLocation(program, name);

    let raf = 0;
    let last = performance.now();
    let clock = 0;
    let mShown = 0;
    let igShown = 0;
    let lastPass = -1;
    let visible = true;
    const ptr = { x: 0, y: 0, on: 0, nx: 0, ny: 0 };

    const rgb = (hex: string, fallback: string): [number, number, number] =>
      acpHex(hex) ?? acpHex(fallback) ?? [0, 0, 0];

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.064, (now - last) / 1000);
      last = now;
      if (!visible || (typeof document !== "undefined" && document.hidden) || !gl) return;
      if (!still) clock += dt;
      const t = still ? 4 : clock % 600;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = window.innerWidth || canvas.clientWidth || rootRef.current?.clientWidth || 1920;
      const h = window.innerHeight || canvas.clientHeight || rootRef.current?.clientHeight || 1080;
      const cw = Math.max(1, Math.round(w * dpr));
      const ch = Math.max(1, Math.round(h * dpr));
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw;
        canvas.height = ch;
      }
      const aspect = cw / ch;

      const curPhase = phaseRef.current;
      const since = now - phaseAtRef.current;
      const k = (rate: number) => (still ? 1 : 1 - Math.exp(-dt * rate));

      const mTarget = curPhase === "load" ? acpMorph(shownRef.current) : 4;
      mShown += (mTarget - mShown) * k(curPhase === "load" && mTarget < mShown ? 30 : 6);
      if (curPhase === "load") igShown = 0;
      else if (curPhase === "ignite") igShown = Math.max(igShown, clamp01(since / igniteMs));
      else igShown += (1 - igShown) * k(5);
      const lift = curPhase === "lift" ? clamp01(since / liftMs) : 0;
      const rig = acpRig(mShown, aspect);
      const ig = acpIgnite(igShown, aspect);
      const loading = curPhase === "load";

      const nextPass = loading ? acpPass(mShown, passes.length) : passes.length - 1;
      if (nextPass !== lastPass) {
        lastPass = nextPass;
        setPass(nextPass);
      }

      const target = pointerRef.current;
      ptr.on += ((target && !still ? 1 : 0) - ptr.on) * k(4);
      if (target) {
        ptr.nx += (target.x - ptr.nx) * k(7);
        ptr.ny += (target.y - ptr.ny) * k(7);
      } else {
        ptr.nx += (0 - ptr.nx) * k(1.5);
        ptr.ny += (0 - ptr.ny) * k(1.5);
      }
      ptr.x = ptr.nx * (aspect * rig.zoom) * 0.5;
      ptr.y = -ptr.ny * rig.zoom * 0.5;

      const mode = loading ? 0 : ig.mode;
      const breathe = still ? 0 : Math.sin(t * 1.3) * 0.02 * mode;
      const zoomIn = still ? 1 : Math.exp(sm(lift) * 5.4);
      const markX = loading ? rig.ax : ig.x + ptr.x * 0.04 * mode;
      const markY = loading ? rig.ay : ig.y + ptr.y * 0.04 * mode;
      const markR = (loading ? HEAD_R : ig.r) * (1 + breathe) * zoomIn;
      const fade = 1 - lift;
      const comet = loading ? 1 : ig.comet;

      gl.viewport(0, 0, cw, ch);
      if (U.uRes) gl.uniform2f(U.uRes, cw, ch);
      if (U.uZoom) gl.uniform1f(U.uZoom, rig.zoom);
      if (U.uTime) gl.uniform1f(U.uTime, t);
      if (U.uApex) gl.uniform2f(U.uApex, loading ? rig.ax : ig.x, loading ? rig.ay : ig.y);
      if (U.uBeta) gl.uniform1f(U.uBeta, rig.beta);
      if (U.uPhi) gl.uniform1f(U.uPhi, rig.phi);
      if (U.uRho0) gl.uniform1f(U.uRho0, rig.rho0);
      if (U.uKv) gl.uniform1f(U.uKv, rig.kv * (1 + (loading ? 0 : ig.retract) * 5));
      if (U.uVf) gl.uniform1f(U.uVf, rig.vf);
      if (U.uNarrow) gl.uniform1f(U.uNarrow, rig.narrow);
      if (U.uWave) gl.uniform1f(U.uWave, rig.wave);
      if (U.uBulge) gl.uniform1f(U.uBulge, rig.bulge);
      if (U.uEdge) gl.uniform1f(U.uEdge, rig.edge);
      if (U.uClosed) gl.uniform1f(U.uClosed, rig.closed);
      if (U.uComet) gl.uniform1f(U.uComet, comet);
      if (U.uLines) gl.uniform1f(U.uLines, (loading ? rig.lines : ig.lines) * fade);
      if (U.uLineDir) gl.uniform1f(U.uLineDir, acpHead(aspect).tail);
      if (U.uMarkC) gl.uniform2f(U.uMarkC, markX, markY);
      if (U.uMarkR) gl.uniform1f(U.uMarkR, markR);
      if (U.uMarkAmt) gl.uniform1f(U.uMarkAmt, loading ? rig.mark : 1);
      if (U.uMarkMode) gl.uniform1f(U.uMarkMode, mode);
      if (U.uMarkRot)
        gl.uniform1f(
          U.uMarkRot,
          (loading ? 0 : ig.rot) + (still ? 0 : Math.sin(t * 0.35) * 0.025 * mode)
        );
      if (U.uSwirl) gl.uniform1f(U.uSwirl, Math.sin(mode * Math.PI) * 0.55);
      if (U.uTilt)
        gl.uniform2f(
          U.uTilt,
          (0.24 - ptr.nx * 0.38 * ptr.on) * mode * fade,
          (0.18 + ptr.ny * 0.32 * ptr.on) * mode * fade
        );
      if (U.uHoleOpen) gl.uniform1f(U.uHoleOpen, still ? lift : sm(clamp01(lift / 0.42)));
      if (U.uBloom) gl.uniform1f(U.uBloom, loading || still ? 0 : ig.bloom * (1 - lift));
      if (U.uFlash) gl.uniform1f(U.uFlash, still ? lift : sm(clamp01((lift - 0.5) / 0.5)));
      if (U.uPtr) gl.uniform3f(U.uPtr, ptr.x, ptr.y, ptr.on * (loading ? 1 : 1 - mode));
      if (U.uBg) gl.uniform3fv(U.uBg, rgb(colors.background, DEFAULT_PALETTE.background));
      if (U.uDeepTeal) gl.uniform3fv(U.uDeepTeal, rgb(colors.deepTeal, DEFAULT_PALETTE.deepTeal));
      if (U.uTeal) gl.uniform3fv(U.uTeal, rgb(colors.teal, DEFAULT_PALETTE.teal));
      if (U.uMint) gl.uniform3fv(U.uMint, rgb(colors.mint, DEFAULT_PALETTE.mint));
      if (U.uAqua) gl.uniform3fv(U.uAqua, rgb(colors.aqua, DEFAULT_PALETTE.aqua));
      if (U.uAmber) gl.uniform3fv(U.uAmber, rgb(colors.amber, DEFAULT_PALETTE.amber));
      if (U.uExposure) gl.uniform1f(U.uExposure, 1.28);
      if (U.uGrain) gl.uniform1f(U.uGrain, still ? 0 : 0.032);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onRestored = () => setGeneration((g) => g + 1);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (gl && !gl.isContextLost()) {
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
      }
    };
  }, [still, generation, igniteMs, liftMs]);

  // Phase Transitions
  useEffect(() => {
    if (phase === "ignite") {
      const t = setTimeout(() => setPhase("reveal"), igniteMs);
      return () => clearTimeout(t);
    }
    if (phase === "reveal") {
      const t = setTimeout(() => setPhase("lift"), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (phase === "lift") {
      const t = setTimeout(() => {
        setPhase("done");
      }, liftMs);
      return () => clearTimeout(t);
    }
  }, [phase, igniteMs, liftMs]);

  const onActivate = () => {
    if (phase === "load") rushRef.current = true;
    else if (phase === "ignite") setPhase("reveal");
    else if (phase === "reveal") setPhase("lift");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const root = rootRef.current;
    if (!root) return;
    const r = root.getBoundingClientRect();
    pointerRef.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: ((e.clientY - r.top) / r.height) * 2 - 1,
    };
  };
  const onPointerLeave = () => {
    pointerRef.current = null;
  };

  const loading = phase === "load";
  const u = Math.min(box.w, box.h);
  const zoom = acpView(box.w / Math.max(1, box.h)).zoom;
  const titleTop = (0.5 + (HERO_R - HERO_Y + 0.065) / zoom) * 100;
  const at = failed
    ? loading
      ? acpPass(acpMorph(pct / 100), passes.length)
      : passes.length - 1
    : pass;
  const label = at >= 0 && at < passes.length ? passes[at] : "";
  const tileGradId = `acp-tile-grad-${uid}`;

  if (phase === "done") return null;

  const content = (
    <div
      ref={rootRef}
      className={`acp-root ${className}`}
      data-phase={phase}
      data-gl={!failed}
      style={{
        "--acp-u": `${u}px`,
        "--acp-p": 0,
        "--acp-bg": colors.background,
        "--acp-deep-teal": colors.deepTeal,
        "--acp-teal": colors.teal,
        "--acp-mint": colors.mint,
        "--acp-aqua": colors.aqua,
        "--acp-amber": colors.amber,
        "--acp-display": DISPLAY_STACK,
        "--acp-mono": MONO_STACK,
      } as React.CSSProperties}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <style>{ACP_CSS}</style>

      {/* Floating Skip Button */}
      <button
        type="button"
        onClick={onActivate}
        className="acp-skip-btn"
        aria-label="Skip preloader animation"
      >
        Skip Intro <span className="opacity-60">[Esc]</span>
      </button>

      <div
        className="acp-gate"
        role="progressbar"
        aria-label={`${word} is loading`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={loading ? `${pct}%` : "Loaded. Press Enter to continue."}
        tabIndex={0}
        onClick={onActivate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
            e.preventDefault();
            onActivate();
          }
        }}
      >
        {failed ? (
          <div className="acp-layer" style={{ background: colors.background }} aria-hidden="true">
            <svg
              className="absolute left-1/2 top-[40%] w-32 h-32 -ml-16 -mt-16"
              viewBox="80 35 117 120"
            >
              <defs>
                <linearGradient id={tileGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.teal} />
                  <stop offset="100%" stopColor={colors.deepTeal} />
                </linearGradient>
              </defs>
              <rect x="83.5" y="41.5" width="110" height="110" rx="32.5" fill="#083B37" />
              <rect
                x="83.5"
                y="38.5"
                width="110"
                height="110"
                rx="32.5"
                fill={`url(#${tileGradId})`}
              />
              <g transform="translate(104.75, 59.75) scale(1.0547)">
                <path
                  d="M12 22 L30 50 L50 14"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M50 8 C48.5 3.5 41 5 42.5 11 C44 15.5 50 18.5 50 20 C50 18.5 56 15.5 57.5 11 C59 5 51.5 3.5 50 8 Z"
                  fill={colors.amber}
                />
              </g>
            </svg>
          </div>
        ) : (
          <canvas key={generation} ref={canvasRef} className="acp-canvas" aria-hidden="true" />
        )}

        <div className="acp-layer acp-grid" aria-hidden="true" />

        <div className="acp-title" style={{ top: `${titleTop}%` }} aria-hidden="true">
          <svg
            className="acp-logo-svg"
            viewBox="0 -800 4020 840"
            role="img"
            aria-label="AlviCare"
          >
            <path d={ALVI_LETTERS_PATH} fill="#F2FAF8" />
            <g transform="translate(914.0 -480) scale(15.0)">
              <path
                d="M4.67 3.67 L20 28.33 L38 -3"
                fill="none"
                stroke={colors.mint}
                strokeWidth="7.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="acp-logo-heart"
                d="M0 -3 C-1 -6 -6 -5 -5 -1 C-4 2 0 4 0 5 C0 4 4 2 5 -1 C6 -5 1 -6 0 -3 Z"
                transform="translate(40.5 -11) scale(1.5)"
                fill={colors.amber}
              />
            </g>
          </svg>
          <p className="acp-caption">{caption}</p>
          <p className="acp-hint">Click anywhere or press Enter to begin</p>
        </div>

        <div className="acp-bar acp-bar-top" />
        <div className="acp-bar acp-bar-bot" />

        <div className="acp-hud" aria-hidden="true">
          <div className="acp-bl">
            <p className="acp-count">
              {String(pct).padStart(3, "0")}
              <small>%</small>
            </p>
            <div className="acp-segs">
              {[0, 1, 2, 3].map((k) => (
                <i key={k} className="acp-seg" style={{ "--k": k } as React.CSSProperties} />
              ))}
            </div>
          </div>
        </div>

        <span className="sr-only" aria-live="polite">
          {loading ? label.replace(/\n/g, ", ") : `${word} — ${caption}`}
        </span>
      </div>
    </div>
  );

  if (mounted && typeof document !== "undefined") {
    return createPortal(content, document.body);
  }

  return content;
}

export default Preloader;
