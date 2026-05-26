"use client";

import { COLORS } from "@/lib/tokens";

/**
 * Simplified chip-board for mobile S1 hero. No pipes, no animations, just
 * four peripheral chips around the orange MarCat anchor — enough to
 * communicate the "four nodes + one center" structure.
 */
export function MobileChipBoardHero() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto max-w-[340px] mx-auto"
      style={{ display: "block" }}
    >
      {/* Pipes — simple straight lines */}
      <line x1="120" y1="120" x2="180" y2="180" stroke="#C7CCD1" strokeWidth="2" />
      <line x1="280" y1="120" x2="220" y2="180" stroke="#C7CCD1" strokeWidth="2" />
      <line x1="120" y1="280" x2="180" y2="220" stroke="#C7CCD1" strokeWidth="2" />
      <line x1="280" y1="280" x2="220" y2="220" stroke="#C7CCD1" strokeWidth="2" />

      {/* Brand (TL) — BUILT */}
      <PeripheralChip cx={80} cy={80} label="BRAND" status="BUILT" />
      {/* Consumer (TR) — LIVE */}
      <PeripheralChip cx={320} cy={80} label="CONSUMER" status="LIVE" live />
      {/* Supplier (BL) — BUILT */}
      <PeripheralChip cx={80} cy={320} label="SUPPLIER" status="BUILT" />
      {/* Retailer (BR) — LIVE */}
      <PeripheralChip cx={320} cy={320} label="RETAILER" status="LIVE" live />

      {/* MarCat center chip — orange border */}
      <rect
        x={140} y={140} width={120} height={120}
        rx={4} ry={4}
        fill="#FFFFFF"
        stroke={COLORS.marcat}
        strokeWidth={2.5}
      />
      <text
        x={200} y={210}
        textAnchor="middle"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize={20}
        fontWeight={700}
        fill={COLORS.marcat}
        letterSpacing="0.04em"
      >
        MARCAT
      </text>
    </svg>
  );
}

function PeripheralChip({
  cx, cy, label, status, live = false,
}: { cx: number; cy: number; label: string; status: string; live?: boolean }) {
  return (
    <g>
      <rect
        x={cx - 60} y={cy - 30} width={120} height={60}
        rx={4} ry={4}
        fill="#FFFFFF"
        stroke="#4B5563"
        strokeWidth={2}
      />
      <text
        x={cx} y={cy - 6}
        textAnchor="middle"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize={13}
        fontWeight={700}
        fill="#0A0A0A"
        letterSpacing="0.04em"
      >
        {label}
      </text>
      <text
        x={cx} y={cy + 14}
        textAnchor="middle"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize={10}
        fontWeight={700}
        fill={live ? COLORS.marcat : "#6B7280"}
        letterSpacing="0.2em"
      >
        {status}
      </text>
    </g>
  );
}
