"use client";

import { motion } from "framer-motion";
import { CircuitChip } from "./CircuitChip";

// ─────────────────────────────────────────────────────────────────────────────
// Layout — 16:10 viewBox, central MarCat chip + 4 cardinal peripheral chips
// Per research: central 2.2–2.8× peripheral (sweet spot 2.4×)
// ─────────────────────────────────────────────────────────────────────────────

const W = 1400;
const H = 800;

// Central MarCat chip
const MARCAT = { w: 280, h: 280 };
const MARCAT_X = (W - MARCAT.w) / 2;       // 560
const MARCAT_Y = (H - MARCAT.h) / 2;       // 260
const MARCAT_CX = W / 2;                   // 700
const MARCAT_CY = H / 2;                   // 400

// Peripheral chips — 120×120, 2.33× ratio to central
const P = { w: 120, h: 120 };

// Peripheral positions — cardinal, with generous breathing room for trace bundles
const BRANDS = { x: (W - P.w) / 2, y: 50 };                       // north
const RETAILER = { x: (W - P.w) / 2, y: H - P.h - 50 };           // south
const CUSTOMER = { x: 110, y: (H - P.h) / 2 };                    // west
const DISTRIBUTORS = { x: W - P.w - 110, y: (H - P.h) / 2 };      // east

// Pin geometry constants (must match CircuitChip)
const PIN_W = 4;
const PIN_GAP = 2.5;
const PIN_PITCH = PIN_W + PIN_GAP; // 6.5

// Chip pin counts (must match CircuitChip props)
const MARCAT_PINS = { h: 16, v: 12 };
const PORTAL_PINS = { h: 10, v: 8 };

// Compute pin centre coordinates on each edge of a chip
function pinCentersTop(chipX: number, chipY: number, chipW: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (chipW - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: chipX + inset + i * PIN_PITCH + PIN_W / 2,
    y: chipY - pinL,
  }));
}
function pinCentersBottom(chipX: number, chipY: number, chipW: number, chipH: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (chipW - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: chipX + inset + i * PIN_PITCH + PIN_W / 2,
    y: chipY + chipH + pinL,
  }));
}
function pinCentersLeft(chipX: number, chipY: number, chipH: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (chipH - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: chipX - pinL,
    y: chipY + inset + i * PIN_PITCH + PIN_W / 2,
  }));
}
function pinCentersRight(chipX: number, chipY: number, chipW: number, chipH: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (chipH - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: chipX + chipW + pinL,
    y: chipY + inset + i * PIN_PITCH + PIN_W / 2,
  }));
}

// MarCat pin centres on each side
const MARCAT_PIN_L = 14;
const PORTAL_PIN_L = 11;

const marcatPins = {
  top: pinCentersTop(MARCAT_X, MARCAT_Y, MARCAT.w, MARCAT_PINS.h, MARCAT_PIN_L),
  bottom: pinCentersBottom(MARCAT_X, MARCAT_Y, MARCAT.w, MARCAT.h, MARCAT_PINS.h, MARCAT_PIN_L),
  left: pinCentersLeft(MARCAT_X, MARCAT_Y, MARCAT.h, MARCAT_PINS.v, MARCAT_PIN_L),
  right: pinCentersRight(MARCAT_X, MARCAT_Y, MARCAT.w, MARCAT.h, MARCAT_PINS.v, MARCAT_PIN_L),
};

const brandsPins = {
  bottom: pinCentersBottom(BRANDS.x, BRANDS.y, P.w, P.h, PORTAL_PINS.h, PORTAL_PIN_L),
};
const retailerPins = {
  top: pinCentersTop(RETAILER.x, RETAILER.y, P.w, PORTAL_PINS.h, PORTAL_PIN_L),
};
const customerPins = {
  right: pinCentersRight(CUSTOMER.x, CUSTOMER.y, P.w, P.h, PORTAL_PINS.v, PORTAL_PIN_L),
};
const distributorsPins = {
  left: pinCentersLeft(DISTRIBUTORS.x, DISTRIBUTORS.y, P.h, PORTAL_PINS.v, PORTAL_PIN_L),
};

// ─────────────────────────────────────────────────────────────────────────────
// Trace path generation — multiple parallel traces forming a "data bus"
// Routing: each peripheral pin connects to a MarCat pin via a 45°-mitered path
// (PCB convention — no straight diagonals, no curves)
// ─────────────────────────────────────────────────────────────────────────────

type Trace = { d: string; status: "live" | "built" };

// Vertical trace bundle (Brands → MarCat top, Retailer → MarCat bottom)
// Each trace is a near-straight vertical line, with a small offset between traces
function verticalTraces(
  fromPins: { x: number; y: number }[],
  toPins: { x: number; y: number }[],
  status: "live" | "built"
): Trace[] {
  // Pick a central subset of fromPins and toPins, equal count
  const count = Math.min(fromPins.length, 6);
  const fromStart = Math.floor((fromPins.length - count) / 2);
  const toStart = Math.floor((toPins.length - count) / 2);

  return Array.from({ length: count }, (_, i) => {
    const fromPin = fromPins[fromStart + i];
    const toPin = toPins[toStart + i];
    // 45° miter at the midpoint if pins aren't aligned
    const midY = (fromPin.y + toPin.y) / 2;
    if (Math.abs(fromPin.x - toPin.x) < 1) {
      // Aligned — straight line
      return { d: `M ${fromPin.x} ${fromPin.y} L ${toPin.x} ${toPin.y}`, status };
    } else {
      // 45° miter: go vertical, then 45° to align, then vertical
      const dx = toPin.x - fromPin.x;
      const miterLen = Math.abs(dx);
      const beforeY = midY - miterLen / 2;
      const afterY = midY + miterLen / 2;
      return {
        d: `M ${fromPin.x} ${fromPin.y} L ${fromPin.x} ${beforeY} L ${toPin.x} ${afterY} L ${toPin.x} ${toPin.y}`,
        status,
      };
    }
  });
}

// Horizontal trace bundle (Customer → MarCat left, Distributors → MarCat right)
function horizontalTraces(
  fromPins: { x: number; y: number }[],
  toPins: { x: number; y: number }[],
  status: "live" | "built"
): Trace[] {
  const count = Math.min(fromPins.length, 6);
  const fromStart = Math.floor((fromPins.length - count) / 2);
  const toStart = Math.floor((toPins.length - count) / 2);

  return Array.from({ length: count }, (_, i) => {
    const fromPin = fromPins[fromStart + i];
    const toPin = toPins[toStart + i];
    const midX = (fromPin.x + toPin.x) / 2;
    if (Math.abs(fromPin.y - toPin.y) < 1) {
      return { d: `M ${fromPin.x} ${fromPin.y} L ${toPin.x} ${toPin.y}`, status };
    } else {
      const dy = toPin.y - fromPin.y;
      const miterLen = Math.abs(dy);
      const beforeX = midX - miterLen / 2;
      const afterX = midX + miterLen / 2;
      return {
        d: `M ${fromPin.x} ${fromPin.y} L ${beforeX} ${fromPin.y} L ${afterX} ${toPin.y} L ${toPin.x} ${toPin.y}`,
        status,
      };
    }
  });
}

const traceBundles = {
  brands: verticalTraces(brandsPins.bottom, marcatPins.top, "built"),
  retailer: verticalTraces(retailerPins.top, marcatPins.bottom, "live"),
  customer: horizontalTraces(customerPins.right, marcatPins.left, "live"),
  distributors: horizontalTraces(distributorsPins.left, marcatPins.right, "built"),
};

// Flatten for rendering
const allTraces = [
  ...traceBundles.brands.map((t, i) => ({ ...t, key: `brands-${i}`, idx: i })),
  ...traceBundles.retailer.map((t, i) => ({ ...t, key: `retailer-${i}`, idx: i })),
  ...traceBundles.customer.map((t, i) => ({ ...t, key: `customer-${i}`, idx: i })),
  ...traceBundles.distributors.map((t, i) => ({ ...t, key: `distributors-${i}`, idx: i })),
];

// ─────────────────────────────────────────────────────────────────────────────
// Electron — white core inside orange halo, travels along trace with offset-path
// Animation: 1.2s travel with cubic-bezier easing, then 0.6–1.4s rest, staggered
// ─────────────────────────────────────────────────────────────────────────────

// Electron with HEARTBEAT data-flow rhythm — native SVG <animateMotion>.
// Native SMIL is more reliable than CSS offset-path through Framer Motion on SVG groups.
// keyPoints heartbeat: 0 (start) → 0.5 (lub) → hold → 1 (dub) → hold → long rest
function Electron({
  pathId,
  status,
  delay,
  reverse,
}: {
  pathId: string;
  status: "live" | "built";
  delay: number;
  reverse?: boolean;
}) {
  const isLive = status === "live";
  if (!isLive) return null;

  const keyPoints = reverse ? "1; 0.5; 0.5; 0; 0; 0" : "0; 0.5; 0.5; 1; 1; 1";

  return (
    <g>
      {/* Outer halo */}
      <circle r={7} fill="#FF6E1E" opacity={0.3} filter="url(#electronGlow)">
        <animateMotion
          dur="2.2s"
          repeatCount="indefinite"
          begin={`${delay}s`}
          keyPoints={keyPoints}
          keyTimes="0; 0.18; 0.22; 0.4; 0.45; 1"
          calcMode="linear"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
      {/* Main core */}
      <circle r={4.5} fill="#FF6E1E">
        <animateMotion
          dur="2.2s"
          repeatCount="indefinite"
          begin={`${delay}s`}
          keyPoints={keyPoints}
          keyTimes="0; 0.18; 0.22; 0.4; 0.45; 1"
          calcMode="linear"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
      {/* White-hot pinpoint */}
      <circle r={1.6} fill="#FFFFFF">
        <animateMotion
          dur="2.2s"
          repeatCount="indefinite"
          begin={`${delay}s`}
          keyPoints={keyPoints}
          keyTimes="0; 0.18; 0.22; 0.4; 0.45; 1"
          calcMode="linear"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function NodeNetwork() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    >
      <defs>
        {/* Blueprint grid pattern — dark lines on light canvas */}
        <pattern id="bpGrid" x={0} y={0} width={32} height={32} patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" strokeWidth={0.5} strokeOpacity={0.05} />
        </pattern>
        <pattern id="bpGridMajor" x={0} y={0} width={128} height={128} patternUnits="userSpaceOnUse">
          <path d="M 128 0 L 0 0 0 128" fill="none" stroke="#000000" strokeWidth={0.5} strokeOpacity={0.09} />
        </pattern>
        {/* Soft drop shadow for chips — feels like a chip sitting on a clean white workbench */}
        <filter id="chipShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={8} />
          <feOffset dx={0} dy={6} result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.18} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Portal chip body — near-black radial gradient, light from upper-left */}
        <radialGradient id="chipBody" cx="32%" cy="22%" r="85%">
          <stop offset="0%" stopColor="#2B2B36" />
          <stop offset="55%" stopColor="#16161E" />
          <stop offset="100%" stopColor="#08080D" />
        </radialGradient>
        {/* MarCat chip body — slightly warmer / brighter highlight */}
        <radialGradient id="chipBodyMarcat" cx="32%" cy="22%" r="90%">
          <stop offset="0%" stopColor="#34343F" />
          <stop offset="55%" stopColor="#1A1A22" />
          <stop offset="100%" stopColor="#0A0A12" />
        </radialGradient>
        {/* Bevel highlight — top white-tint, bottom dark-tint */}
        <linearGradient id="chipBevel" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.18} />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.45} />
        </linearGradient>

        {/* Metallic pin gradient — vertical pins (top/bottom of chip) */}
        <linearGradient id="pinGradV" x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0%" stopColor="#4A4A52" />
          <stop offset="50%" stopColor="#C8C8D0" />
          <stop offset="100%" stopColor="#3A3A42" />
        </linearGradient>
        {/* Metallic pin gradient — horizontal pins (left/right of chip) */}
        <linearGradient id="pinGradH" x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor="#4A4A52" />
          <stop offset="50%" stopColor="#C8C8D0" />
          <stop offset="100%" stopColor="#3A3A42" />
        </linearGradient>

        {/* Die tile pattern — slightly-darker grid simulating silicon die internal structure */}
        <pattern id="dieTiles" x={0} y={0} width={10} height={10} patternUnits="userSpaceOnUse">
          <rect width={10} height={10} fill="#0C0C14" />
          <rect x={0.5} y={0.5} width={9} height={9} fill="none" stroke="#1A1A24" strokeWidth={0.4} />
        </pattern>

        {/* Electron glow filter — multi-stop blur + orange colour matrix + sharp core */}
        <filter id="electronGlow" x="-300%" y="-300%" width="600%" height="600%">
          {/* Wide outer halo */}
          <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="haloFar" />
          <feColorMatrix
            in="haloFar"
            type="matrix"
            values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 0.65 0"
            result="haloFarOrange"
          />
          {/* Mid halo */}
          <feGaussianBlur in="SourceGraphic" stdDeviation={2} result="haloMid" />
          <feColorMatrix
            in="haloMid"
            type="matrix"
            values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 0.9 0"
            result="haloMidOrange"
          />
          {/* Composite: far halo, mid halo, then sharp white source on top */}
          <feMerge>
            <feMergeNode in="haloFarOrange" />
            <feMergeNode in="haloMidOrange" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background — clean white canvas */}
      <rect width={W} height={H} fill="#FFFFFF" />
      {/* Whisper-subtle vignette — keeps centre pure white, gentle warmth at edges */}
      <radialGradient id="bgVignette" cx="50%" cy="45%" r="80%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#FDFDFA" />
        <stop offset="100%" stopColor="#F7F7F1" />
      </radialGradient>
      <rect width={W} height={H} fill="url(#bgVignette)" />

      {/* Blueprint grid overlay — 32 minor, 128 major */}
      <rect width={W} height={H} fill="url(#bpGrid)" />
      <rect width={W} height={H} fill="url(#bpGridMajor)" />

      {/* Hidden path defs — animateMotion references these by id */}
      <defs>
        {allTraces.map((t) => (
          <path key={`pathdef-${t.key}`} id={`nn-trace-${t.key}`} d={t.d} />
        ))}
      </defs>

      {/* Traces — drawn first so chips and electrons render on top */}
      {/* Triple-stroke: dark base + orange overlay + bright orange highlight on live traces */}
      <g>
        {allTraces.map((t) => (
          <g key={`trace-base-${t.key}`}>
            {/* Dark metal base */}
            <path
              d={t.d}
              fill="none"
              stroke="#1A1A24"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeLinecap="square"
            />
            {/* Orange energized overlay */}
            <path
              d={t.d}
              fill="none"
              stroke="#FF6E1E"
              strokeWidth={1.6}
              strokeOpacity={t.status === "live" ? 0.85 : 0.25}
              strokeLinejoin="round"
              strokeLinecap="square"
              strokeDasharray={t.status === "built" ? "6 5" : undefined}
            />
            {/* Hot core highlight on live traces only */}
            {t.status === "live" && (
              <path
                d={t.d}
                fill="none"
                stroke="#FFD9B8"
                strokeWidth={0.6}
                strokeOpacity={0.7}
                strokeLinejoin="round"
                strokeLinecap="square"
              />
            )}
          </g>
        ))}
      </g>

      {/* Peripheral chips — each wrapped in a group with chip-shadow filter for depth on white canvas */}
      <g filter="url(#chipShadow)">
        <CircuitChip
          x={BRANDS.x}
          y={BRANDS.y}
          width={P.w}
          height={P.h}
          label="Brands"
          partNumber="HQ + SFA"
          yearCode="BLT-26"
          status="BUILT"
          pinsHorizontal={PORTAL_PINS.h}
          pinsVertical={PORTAL_PINS.v}
        />
      </g>
      <g filter="url(#chipShadow)">
        <CircuitChip
          x={RETAILER.x}
          y={RETAILER.y}
          width={P.w}
          height={P.h}
          label="Retailer"
          partNumber="POS · INV · AI"
          yearCode="LIVE-26"
          status="LIVE"
          pinsHorizontal={PORTAL_PINS.h}
          pinsVertical={PORTAL_PINS.v}
        />
      </g>
      <g filter="url(#chipShadow)">
        <CircuitChip
          x={CUSTOMER.x}
          y={CUSTOMER.y}
          width={P.w}
          height={P.h}
          label="Customer"
          partNumber="SHOP · ORDERS"
          yearCode="LIVE-26"
          status="LIVE"
          pinsHorizontal={PORTAL_PINS.h}
          pinsVertical={PORTAL_PINS.v}
        />
      </g>
      <g filter="url(#chipShadow)">
        <CircuitChip
          x={DISTRIBUTORS.x}
          y={DISTRIBUTORS.y}
          width={P.w}
          height={P.h}
          label="Distributors"
          partNumber="BEAT · WHSE"
          yearCode="BLT-26"
          status="BUILT"
          pinsHorizontal={PORTAL_PINS.h}
          pinsVertical={PORTAL_PINS.v}
        />
      </g>

      {/* Central MarCat chip — premium high-pin-count IC with stronger shadow */}
      <g filter="url(#chipShadow)">
        <CircuitChip
          x={MARCAT_X}
          y={MARCAT_Y}
          width={MARCAT.w}
          height={MARCAT.h}
          label="MarCat"
          partNumber="MCT-2026 · ORCH · 4-NODE"
          yearCode="IN-2026"
          status="LIVE"
          variant="marcat"
          pinsHorizontal={MARCAT_PINS.h}
          pinsVertical={MARCAT_PINS.v}
        />
      </g>

      {/* Electrons — heartbeat-paced data flow on LIVE traces only.
          Native SVG <animateMotion> for reliability. */}
      <g>
        {allTraces
          .filter((t) => t.status === "live")
          .flatMap((t, idx) => [
            <Electron
              key={`e-${t.key}-fwd`}
              pathId={`nn-trace-${t.key}`}
              status={t.status}
              delay={idx * 0.13}
            />,
            <Electron
              key={`e-${t.key}-bwd`}
              pathId={`nn-trace-${t.key}`}
              status={t.status}
              delay={idx * 0.13 + 1.1}
              reverse
            />,
          ])}
      </g>
    </svg>
  );
}
