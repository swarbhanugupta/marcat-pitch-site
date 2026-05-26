"use client";

import { useState, useCallback } from "react";
import { CircuitChip } from "./CircuitChip";

// ─────────────────────────────────────────────────────────────────────────────
// HeroChip — Section 1's centerpiece.
//
// Renders the MarCat IC chip large, with off-screen traces hinting at the
// larger board revealed in Section 2. Electrons always flow on those traces
// (heartbeat rhythm via native SVG <animateMotion>) so the hero feels ALIVE,
// not static.
//
// Clicking the chip OR the "Power up" button triggers a VISIBLE flash
// (chip glows, electrons surge brighter for 600ms) THEN smooth-scrolls
// into Section 2.
// ─────────────────────────────────────────────────────────────────────────────

const W = 1200;
const H = 760;

const CHIP_W = 540;
const CHIP_H = 380;
const CHIP_X = (W - CHIP_W) / 2;
const CHIP_Y = (H - CHIP_H) / 2;

const PIN_W = 4;
const PIN_GAP = 2.5;
const PIN_PITCH = PIN_W + PIN_GAP;
const PIN_L = 16;

const CHIP_PINS = { h: 22, v: 16 };

function topPins() {
  const used = CHIP_PINS.h * PIN_W + (CHIP_PINS.h - 1) * PIN_GAP;
  const inset = (CHIP_W - used) / 2;
  return Array.from({ length: CHIP_PINS.h }, (_, i) => ({
    x: CHIP_X + inset + i * PIN_PITCH + PIN_W / 2,
    y: CHIP_Y - PIN_L,
  }));
}
function bottomPins() {
  const used = CHIP_PINS.h * PIN_W + (CHIP_PINS.h - 1) * PIN_GAP;
  const inset = (CHIP_W - used) / 2;
  return Array.from({ length: CHIP_PINS.h }, (_, i) => ({
    x: CHIP_X + inset + i * PIN_PITCH + PIN_W / 2,
    y: CHIP_Y + CHIP_H + PIN_L,
  }));
}
function leftPins() {
  const used = CHIP_PINS.v * PIN_W + (CHIP_PINS.v - 1) * PIN_GAP;
  const inset = (CHIP_H - used) / 2;
  return Array.from({ length: CHIP_PINS.v }, (_, i) => ({
    x: CHIP_X - PIN_L,
    y: CHIP_Y + inset + i * PIN_PITCH + PIN_W / 2,
  }));
}
function rightPins() {
  const used = CHIP_PINS.v * PIN_W + (CHIP_PINS.v - 1) * PIN_GAP;
  const inset = (CHIP_H - used) / 2;
  return Array.from({ length: CHIP_PINS.v }, (_, i) => ({
    x: CHIP_X + CHIP_W + PIN_L,
    y: CHIP_Y + inset + i * PIN_PITCH + PIN_W / 2,
  }));
}

// Off-screen traces — only animate electrons on a SUBSET (every Nth pin) so we
// don't drown the hero. The MarCat chip is the focus; electrons hint at flow.
const tracedPinSteps = 3; // every 3rd pin gets a live trace

const animatedTraces: { from: { x: number; y: number }; toX: number; toY: number; id: string }[] = [];

topPins().forEach((p, i) => {
  if (i % tracedPinSteps === 1) {
    animatedTraces.push({ from: p, toX: p.x, toY: 0, id: `hc-trace-top-${i}` });
  }
});
bottomPins().forEach((p, i) => {
  if (i % tracedPinSteps === 1) {
    animatedTraces.push({ from: p, toX: p.x, toY: H, id: `hc-trace-bottom-${i}` });
  }
});
leftPins().forEach((p, i) => {
  if (i % tracedPinSteps === 1) {
    animatedTraces.push({ from: p, toX: 0, toY: p.y, id: `hc-trace-left-${i}` });
  }
});
rightPins().forEach((p, i) => {
  if (i % tracedPinSteps === 1) {
    animatedTraces.push({ from: p, toX: W, toY: p.y, id: `hc-trace-right-${i}` });
  }
});

// All pins get a faint static trace (for the "implied larger board" feel)
const staticTraces: string[] = [
  ...topPins().map((p) => `M ${p.x} ${p.y} L ${p.x} 0`),
  ...bottomPins().map((p) => `M ${p.x} ${p.y} L ${p.x} ${H}`),
  ...leftPins().map((p) => `M ${p.x} ${p.y} L 0 ${p.y}`),
  ...rightPins().map((p) => `M ${p.x} ${p.y} L ${W} ${p.y}`),
];

export function HeroChip() {
  const [isPoweringUp, setIsPoweringUp] = useState(false);

  const handlePowerUp = useCallback(() => {
    if (isPoweringUp) return;
    setIsPoweringUp(true);
    // Flash plays for 600ms, THEN smooth scroll to Section 2
    window.setTimeout(() => {
      document.getElementById("section-architecture")?.scrollIntoView({ behavior: "smooth" });
    }, 600);
    // Reset flash state once scroll is well underway
    window.setTimeout(() => {
      setIsPoweringUp(false);
    }, 1800);
  }, [isPoweringUp]);

  return (
    <div className="w-full max-w-[1280px] mx-auto select-none">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        onClick={handlePowerUp}
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          cursor: "pointer",
        }}
      >
        <defs>
          <radialGradient id="chipBodyMarcat" cx="32%" cy="22%" r="90%">
            <stop offset="0%" stopColor="#34343F" />
            <stop offset="55%" stopColor="#1A1A22" />
            <stop offset="100%" stopColor="#0A0A12" />
          </radialGradient>
          <radialGradient id="chipBody" cx="32%" cy="22%" r="85%">
            <stop offset="0%" stopColor="#2B2B36" />
            <stop offset="55%" stopColor="#16161E" />
            <stop offset="100%" stopColor="#08080D" />
          </radialGradient>
          <linearGradient id="chipBevel" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.18} />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0} />
            <stop offset="100%" stopColor="#000000" stopOpacity={0.45} />
          </linearGradient>
          <linearGradient id="pinGradV" x1={0} y1={0} x2={1} y2={0}>
            <stop offset="0%" stopColor="#4A4A52" />
            <stop offset="50%" stopColor="#C8C8D0" />
            <stop offset="100%" stopColor="#3A3A42" />
          </linearGradient>
          <linearGradient id="pinGradH" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#4A4A52" />
            <stop offset="50%" stopColor="#C8C8D0" />
            <stop offset="100%" stopColor="#3A3A42" />
          </linearGradient>
          <pattern id="dieTiles" x={0} y={0} width={10} height={10} patternUnits="userSpaceOnUse">
            <rect width={10} height={10} fill="#0C0C14" />
            <rect x={0.5} y={0.5} width={9} height={9} fill="none" stroke="#1A1A24" strokeWidth={0.4} />
          </pattern>

          <filter id="hcElectronGlow" x="-300%" y="-300%" width="600%" height="600%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="haloFar" />
            <feColorMatrix
              in="haloFar"
              type="matrix"
              values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 0.7 0"
              result="haloOrange"
            />
            <feMerge>
              <feMergeNode in="haloOrange" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="hcChipShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation={12} />
            <feOffset dx={0} dy={8} result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope={isPoweringUp ? 0.5 : 0.22} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Power-up flash glow filter — used when chip is "activating" */}
          <filter id="hcChipGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={isPoweringUp ? 14 : 0} result="glowBlur" />
            <feColorMatrix
              in="glowBlur"
              type="matrix"
              values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 1.2 0"
              result="orangeGlow"
            />
            <feMerge>
              <feMergeNode in="orangeGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static traces — faint, suggest the larger board */}
        <g opacity={isPoweringUp ? 0.7 : 0.45}>
          {staticTraces.map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="#1A1A24" strokeWidth={1.5} strokeLinecap="square" />
              <path d={d} fill="none" stroke="#FF6E1E" strokeWidth={0.7} strokeOpacity={0.5} strokeLinecap="square" />
            </g>
          ))}
        </g>

        {/* Live animated trace paths (defined here, referenced by animateMotion below) */}
        <defs>
          {animatedTraces.map((t) => (
            <path
              key={t.id}
              id={t.id}
              d={`M ${t.from.x} ${t.from.y} L ${t.toX} ${t.toY}`}
            />
          ))}
        </defs>

        {/* The chip — with power-up glow when isPoweringUp */}
        <g filter={isPoweringUp ? "url(#hcChipGlow)" : undefined}>
          <g filter="url(#hcChipShadow)">
            <CircuitChip
              x={CHIP_X}
              y={CHIP_Y}
              width={CHIP_W}
              height={CHIP_H}
              label="MarCat"
              partNumber="MCT-2026 · ORCH · 4-NODE"
              yearCode="IN-2026 · LIVE"
              status="LIVE"
              variant="marcat"
              pinsHorizontal={CHIP_PINS.h}
              pinsVertical={CHIP_PINS.v}
              logoHref="/marcat-mark.png"
            />
          </g>
        </g>

        {/* ELECTRONS — native SVG animateMotion, ALWAYS flowing, heartbeat rhythm.
            keyPoints heartbeat: 0 → 0.5 (lub) → hold → 1 (dub) → hold → rest */}
        <g>
          {animatedTraces.map((t, idx) => (
            <g key={`e-${t.id}`}>
              {/* Outer halo + bright core + white pinpoint */}
              <circle r={6} fill="#FF6E1E" opacity={isPoweringUp ? 0.55 : 0.25} filter="url(#hcElectronGlow)">
                <animateMotion
                  dur={isPoweringUp ? "1.2s" : "2.4s"}
                  repeatCount="indefinite"
                  begin={`${idx * 0.07}s`}
                  keyPoints="0; 0.5; 0.5; 1; 1; 1"
                  keyTimes="0; 0.18; 0.22; 0.4; 0.45; 1"
                  calcMode="linear"
                >
                  <mpath href={`#${t.id}`} />
                </animateMotion>
              </circle>
              <circle r={3.5} fill="#FF6E1E">
                <animateMotion
                  dur={isPoweringUp ? "1.2s" : "2.4s"}
                  repeatCount="indefinite"
                  begin={`${idx * 0.07}s`}
                  keyPoints="0; 0.5; 0.5; 1; 1; 1"
                  keyTimes="0; 0.18; 0.22; 0.4; 0.45; 1"
                  calcMode="linear"
                >
                  <mpath href={`#${t.id}`} />
                </animateMotion>
              </circle>
              <circle r={1.2} fill="#FFFFFF">
                <animateMotion
                  dur={isPoweringUp ? "1.2s" : "2.4s"}
                  repeatCount="indefinite"
                  begin={`${idx * 0.07}s`}
                  keyPoints="0; 0.5; 0.5; 1; 1; 1"
                  keyTimes="0; 0.18; 0.22; 0.4; 0.45; 1"
                  calcMode="linear"
                >
                  <mpath href={`#${t.id}`} />
                </animateMotion>
              </circle>
            </g>
          ))}
        </g>
      </svg>

      {/* Power-up CTA */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePowerUp}
          disabled={isPoweringUp}
          className={`group inline-flex items-center gap-3 px-6 py-3 border rounded-full transition-all cursor-pointer ${
            isPoweringUp
              ? "border-marcat-orange bg-marcat-soft scale-105"
              : "border-line bg-canvas-white hover:bg-marcat-soft hover:border-marcat-orange"
          }`}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-ink uppercase font-semibold">
            {isPoweringUp ? "Powering up…" : "Power up the circuit"}
          </span>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-marcat-orange text-white">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1.5 V8.5 M2 5.5 L5 8.5 L8 5.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
