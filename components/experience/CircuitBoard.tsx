"use client";

import { motion, MotionValue } from "framer-motion";
import { CircuitChip } from "../CircuitChip";

// ─────────────────────────────────────────────────────────────────────────────
// CircuitBoard — the persistent board.
// Animates based on Framer Motion MotionValue props driven by parent scroll.
//
// Stages it supports (via scroll-driven motion values):
//   - chipScale         : 1.0 (default) → 1.6 (Section 1 closeup) → 0.4 (Sec 10 thumbnail) etc.
//   - peripheralOpacity : 0 (Section 1) → 1 (Sections 2-9) → 0.6 (Sections 10+)
//   - traceOpacity      : 0 (Section 1) → 1 (Sections 2-9)
//   - electronOpacity   : 0 (Section 1) → 1 (Sections 2+)
//   - boardOpacity      : overall board opacity
//   - dimmed            : 0 (lit) → 1 (greyed for Sec 3 broken state)
// ─────────────────────────────────────────────────────────────────────────────

const W = 1400;
const H = 800;

const MARCAT = { w: 280, h: 280 };
const MARCAT_X = (W - MARCAT.w) / 2;
const MARCAT_Y = (H - MARCAT.h) / 2;
const MARCAT_CX = W / 2;
const MARCAT_CY = H / 2;

const P = { w: 130, h: 130 };
const BRANDS = { x: (W - P.w) / 2, y: 55 };
const RETAILER = { x: (W - P.w) / 2, y: H - P.h - 55 };
const CUSTOMER = { x: 120, y: (H - P.h) / 2 };
const DISTRIBUTORS = { x: W - P.w - 120, y: (H - P.h) / 2 };

const PIN_W = 4;
const PIN_GAP = 2.5;
const PIN_PITCH = PIN_W + PIN_GAP;

const MARCAT_PINS = { h: 16, v: 12 };
const PORTAL_PINS = { h: 11, v: 8 };
const MARCAT_PIN_L = 14;
const PORTAL_PIN_L = 12;

function pinCentersTop(x: number, y: number, w: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (w - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: x + inset + i * PIN_PITCH + PIN_W / 2,
    y: y - pinL,
  }));
}
function pinCentersBottom(x: number, y: number, w: number, h: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (w - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: x + inset + i * PIN_PITCH + PIN_W / 2,
    y: y + h + pinL,
  }));
}
function pinCentersLeft(x: number, y: number, h: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (h - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: x - pinL,
    y: y + inset + i * PIN_PITCH + PIN_W / 2,
  }));
}
function pinCentersRight(x: number, y: number, w: number, h: number, count: number, pinL: number) {
  const used = count * PIN_W + (count - 1) * PIN_GAP;
  const inset = (h - used) / 2;
  return Array.from({ length: count }, (_, i) => ({
    x: x + w + pinL,
    y: y + inset + i * PIN_PITCH + PIN_W / 2,
  }));
}

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

type Trace = { d: string; status: "live" | "built"; key: string };

function verticalTraces(
  fromPins: { x: number; y: number }[],
  toPins: { x: number; y: number }[],
  status: "live" | "built",
  prefix: string
): Trace[] {
  const count = Math.min(fromPins.length, 6);
  const fromStart = Math.floor((fromPins.length - count) / 2);
  const toStart = Math.floor((toPins.length - count) / 2);
  return Array.from({ length: count }, (_, i) => {
    const from = fromPins[fromStart + i];
    const to = toPins[toStart + i];
    if (Math.abs(from.x - to.x) < 1) {
      return { d: `M ${from.x} ${from.y} L ${to.x} ${to.y}`, status, key: `${prefix}-${i}` };
    }
    const midY = (from.y + to.y) / 2;
    const miter = Math.abs(to.x - from.x);
    return {
      d: `M ${from.x} ${from.y} L ${from.x} ${midY - miter / 2} L ${to.x} ${midY + miter / 2} L ${to.x} ${to.y}`,
      status,
      key: `${prefix}-${i}`,
    };
  });
}
function horizontalTraces(
  fromPins: { x: number; y: number }[],
  toPins: { x: number; y: number }[],
  status: "live" | "built",
  prefix: string
): Trace[] {
  const count = Math.min(fromPins.length, 6);
  const fromStart = Math.floor((fromPins.length - count) / 2);
  const toStart = Math.floor((toPins.length - count) / 2);
  return Array.from({ length: count }, (_, i) => {
    const from = fromPins[fromStart + i];
    const to = toPins[toStart + i];
    if (Math.abs(from.y - to.y) < 1) {
      return { d: `M ${from.x} ${from.y} L ${to.x} ${to.y}`, status, key: `${prefix}-${i}` };
    }
    const midX = (from.x + to.x) / 2;
    const miter = Math.abs(to.y - from.y);
    return {
      d: `M ${from.x} ${from.y} L ${midX - miter / 2} ${from.y} L ${midX + miter / 2} ${to.y} L ${to.x} ${to.y}`,
      status,
      key: `${prefix}-${i}`,
    };
  });
}

const allTraces: Trace[] = [
  ...verticalTraces(brandsPins.bottom, marcatPins.top, "built", "brands"),
  ...verticalTraces(retailerPins.top, marcatPins.bottom, "live", "retailer"),
  ...horizontalTraces(customerPins.right, marcatPins.left, "live", "customer"),
  ...horizontalTraces(distributorsPins.left, marcatPins.right, "built", "distributors"),
];

// ─────────────────────────────────────────────────────────────────────────────
// Electron — heartbeat data flow
// ─────────────────────────────────────────────────────────────────────────────

function Electron({
  pathD,
  delay,
  reverse,
  opacity,
}: {
  pathD: string;
  delay: number;
  reverse?: boolean;
  opacity?: MotionValue<number>;
}) {
  const distanceValues = reverse
    ? ["100%", "50%", "50%", "0%", "0%", "0%"]
    : ["0%", "50%", "50%", "100%", "100%", "100%"];
  return (
    <motion.g
      style={{
        offsetPath: `path('${pathD}')`,
        offsetRotate: "0deg",
        opacity,
      }}
      animate={{ offsetDistance: distanceValues }}
      transition={{
        duration: 2.2,
        times: [0, 0.18, 0.22, 0.40, 0.45, 1.0],
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      <circle r={7} fill="#FF6E1E" opacity={0.25} filter="url(#cbElectronGlow)" />
      <circle r={4.5} fill="#FF6E1E" />
      <circle r={1.6} fill="#FFFFFF" />
    </motion.g>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export interface CircuitBoardProps {
  chipScale?: MotionValue<number>;
  peripheralOpacity?: MotionValue<number>;
  traceOpacity?: MotionValue<number>;
  electronOpacity?: MotionValue<number>;
  boardOpacity?: MotionValue<number>;
  dimmed?: MotionValue<number>; // 0 = full colour, 1 = greyscale broken
}

export function CircuitBoard({
  chipScale,
  peripheralOpacity,
  traceOpacity,
  electronOpacity,
  boardOpacity,
}: CircuitBoardProps) {
  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        maxWidth: "100%",
        height: "auto",
        opacity: boardOpacity,
      }}
    >
      <defs>
        <pattern id="cbGrid" x={0} y={0} width={32} height={32} patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" strokeWidth={0.5} strokeOpacity={0.05} />
        </pattern>
        <pattern id="cbGridMajor" x={0} y={0} width={128} height={128} patternUnits="userSpaceOnUse">
          <path d="M 128 0 L 0 0 0 128" fill="none" stroke="#000000" strokeWidth={0.5} strokeOpacity={0.09} />
        </pattern>

        <radialGradient id="chipBody" cx="32%" cy="22%" r="85%">
          <stop offset="0%" stopColor="#2B2B36" />
          <stop offset="55%" stopColor="#16161E" />
          <stop offset="100%" stopColor="#08080D" />
        </radialGradient>
        <radialGradient id="chipBodyMarcat" cx="32%" cy="22%" r="90%">
          <stop offset="0%" stopColor="#34343F" />
          <stop offset="55%" stopColor="#1A1A22" />
          <stop offset="100%" stopColor="#0A0A12" />
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

        <filter id="cbElectronGlow" x="-300%" y="-300%" width="600%" height="600%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="haloFar" />
          <feColorMatrix
            in="haloFar"
            type="matrix"
            values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 0.65 0"
            result="haloFarOrange"
          />
          <feMerge>
            <feMergeNode in="haloFarOrange" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="cbChipShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={8} />
          <feOffset dx={0} dy={6} result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.2} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background — white with subtle grid */}
      <rect width={W} height={H} fill="#FFFFFF" />
      <rect width={W} height={H} fill="url(#cbGrid)" />
      <rect width={W} height={H} fill="url(#cbGridMajor)" />

      {/* TRACES — driven by traceOpacity */}
      <motion.g style={{ opacity: traceOpacity }}>
        {allTraces.map((t) => (
          <g key={`trace-${t.key}`}>
            <path d={t.d} fill="none" stroke="#1A1A24" strokeWidth={3} strokeLinejoin="round" strokeLinecap="square" />
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
      </motion.g>

      {/* PERIPHERAL CHIPS — driven by peripheralOpacity */}
      <motion.g style={{ opacity: peripheralOpacity }}>
        <g filter="url(#cbChipShadow)">
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
        <g filter="url(#cbChipShadow)">
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
        <g filter="url(#cbChipShadow)">
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
        <g filter="url(#cbChipShadow)">
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
      </motion.g>

      {/* MARCAT CENTRAL CHIP — scale-able via chipScale */}
      <motion.g
        style={{
          transformOrigin: `${MARCAT_CX}px ${MARCAT_CY}px`,
          scale: chipScale,
        }}
        filter="url(#cbChipShadow)"
      >
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
          logoHref="/marcat-mark.png"
        />
      </motion.g>

      {/* ELECTRONS — driven by electronOpacity */}
      <motion.g style={{ opacity: electronOpacity }}>
        {allTraces
          .filter((t) => t.status === "live")
          .flatMap((t, idx) => [
            <Electron key={`e-${t.key}-fwd`} pathD={t.d} delay={idx * 0.13} />,
            <Electron key={`e-${t.key}-bwd`} pathD={t.d} delay={idx * 0.13 + 1.1} reverse />,
          ])}
      </motion.g>
    </motion.svg>
  );
}
