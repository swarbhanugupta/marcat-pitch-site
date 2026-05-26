// Chip — IC chip primitive on WHITE BG.
// Clean white chip body with thin border (orange MarCat / gray peripheral).
// No dark fill, no silicon tile, no shadow — matches CLAUDE.md spec.

"use client";

import { useState } from "react";
import { COLORS, HEARTBEAT } from "@/lib/tokens";
import type { ChipState } from "@/lib/tokens";

interface ChipProps {
  cx: number;
  cy: number;
  size: number;
  variant: "marcat" | "peripheral";
  state: ChipState;
  label: string;
  logoHref?: string;
  pinCount?: number;
  onClick?: () => void;
  clickable?: boolean;
  arrivalTiming?: "outward" | "inward" | null;
}

const PIN_W = 4;
const PIN_GAP = 2.5;
const PIN_PITCH = PIN_W + PIN_GAP;

export function Chip({
  cx,
  cy,
  size,
  variant,
  state,
  label,
  logoHref,
  pinCount,
  onClick,
  clickable,
  arrivalTiming = null,
}: ChipProps) {
  const [hovered, setHovered] = useState(false);

  const x = cx - size / 2;
  const y = cy - size / 2;

  const pins = pinCount ?? (variant === "marcat" ? 9 : 8);
  const pinL = variant === "marcat" ? 14 : 11;
  const used = pins * PIN_W + (pins - 1) * PIN_GAP;
  const inset = (size - used) / 2;

  const outline = variant === "marcat" ? COLORS.marcat : "#4B5563";
  const outlineWidth = variant === "marcat" ? 2.5 : 2;

  const opacity =
    state === "dim" ? 0.15 :
    state === "dead" ? 0.4 :
    state === "built" ? 0.7 :
    1;

  const filter = state === "dead"
    ? "url(#chipDeadFilter)"
    : (clickable && hovered)
      ? "url(#marcatHoverGlow)"
      : undefined;

  // Arrival glow timing — peripheral receives outward tube at end of outward phase
  // MarCat receives inward tubes at end of inward phase
  const totalCycle = HEARTBEAT.totalMs;
  // Outward phase ends when last tube arrives = (tubesPerPhase-1)*stagger + tubeDuration
  const outwardPhaseEnd =
    (HEARTBEAT.tubesPerPhase - 1) * HEARTBEAT.tubeStaggerMs + HEARTBEAT.tubeDurationMs;
  const inwardPhaseEnd =
    HEARTBEAT.inwardStartMs +
    (HEARTBEAT.tubesPerPhase - 1) * HEARTBEAT.tubeStaggerMs +
    HEARTBEAT.tubeDurationMs;

  const arrivalMs = arrivalTiming === "outward"
    ? outwardPhaseEnd
    : arrivalTiming === "inward"
      ? Math.min(inwardPhaseEnd, totalCycle - 1)
      : null;

  const renderArrivalGlow = arrivalMs !== null && state === "live";
  const safeArrival = arrivalMs ?? 0;
  const arrivalPct = safeArrival / totalCycle;

  const glowStartPct = Math.max(0, arrivalPct - 0.005);
  const glowPeakPct = arrivalPct;
  const glowFadeEndPct = Math.min(1, arrivalPct + 0.12);

  const glowKeyTimes = [
    "0",
    glowStartPct.toFixed(4),
    glowPeakPct.toFixed(4),
    glowFadeEndPct.toFixed(4),
    "1",
  ].join("; ");
  const glowValues = "0; 0; 0.85; 0; 0";
  const glowPad = 4;

  return (
    <g
      opacity={opacity}
      filter={filter}
      onMouseEnter={clickable ? () => setHovered(true) : undefined}
      onMouseLeave={clickable ? () => setHovered(false) : undefined}
      onClick={clickable ? (e) => {
        e.stopPropagation();
        onClick?.();
      } : undefined}
      style={{
        cursor: clickable ? "pointer" : "default",
        pointerEvents: clickable ? "all" : "auto",
      }}
    >
      {/* Arrival glow ring — drawn first, behind chip body */}
      {renderArrivalGlow && (
        <g filter="url(#chipReceiveGlow)">
          <rect
            x={x - glowPad}
            y={y - glowPad}
            width={size + glowPad * 2}
            height={size + glowPad * 2}
            rx={6}
            ry={6}
            fill="none"
            stroke={COLORS.marcat}
            strokeWidth={3}
            strokeOpacity={0}
          >
            <animate
              attributeName="stroke-opacity"
              dur={`${totalCycle / 1000}s`}
              repeatCount="indefinite"
              values={glowValues}
              keyTimes={glowKeyTimes}
              calcMode="linear"
            />
          </rect>
        </g>
      )}

      {/* Pins — top, bottom, left, right. Light gray on white chip. */}
      <g>
        {Array.from({ length: pins }, (_, i) => {
          const px = x + inset + i * PIN_PITCH;
          return (
            <rect
              key={`top-${i}`}
              x={px}
              y={y - pinL}
              width={PIN_W}
              height={pinL}
              fill="#9CA3AF"
            />
          );
        })}
        {Array.from({ length: pins }, (_, i) => {
          const px = x + inset + i * PIN_PITCH;
          return (
            <rect
              key={`bot-${i}`}
              x={px}
              y={y + size}
              width={PIN_W}
              height={pinL}
              fill="#9CA3AF"
            />
          );
        })}
        {Array.from({ length: pins }, (_, i) => {
          const py = y + inset + i * PIN_PITCH;
          return (
            <rect
              key={`left-${i}`}
              x={x - pinL}
              y={py}
              width={pinL}
              height={PIN_W}
              fill="#9CA3AF"
            />
          );
        })}
        {Array.from({ length: pins }, (_, i) => {
          const py = y + inset + i * PIN_PITCH;
          return (
            <rect
              key={`right-${i}`}
              x={x + size}
              y={py}
              width={pinL}
              height={PIN_W}
              fill="#9CA3AF"
            />
          );
        })}
      </g>

      {/* Chip body — WHITE with thin border */}
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        rx={4}
        ry={4}
        fill="#FFFFFF"
        stroke={outline}
        strokeWidth={outlineWidth}
      />

      {/* Pin-1 indicator dot — top-left corner */}
      <circle
        cx={x + 14}
        cy={y + 14}
        r={4}
        fill={variant === "marcat" ? COLORS.marcat : "#6B7280"}
      />

      {/* Chip body content — logo for MarCat (sized 75% of chip width with
          ~30px breathing room on each side), text label for peripheral. */}
      {variant === "marcat" && logoHref ? (
        <image
          href={logoHref}
          x={cx - 95}
          y={cy - 26}
          width={190}
          height={52}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : (
        <text
          x={cx}
          y={cy - 20}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize={28}
          fontWeight={700}
          letterSpacing="0.02em"
          fill={COLORS.ink}
        >
          {label.toUpperCase()}
        </text>
      )}

      {/* Status indicator below label — peripheral chips only.
          Sized for Google Meet 720p screen-share readability.
          When dead (kill-MarCat demo), show OFF in muted red. */}
      {variant === "peripheral" && state !== "dim" && (
        <text
          x={cx}
          y={cy + 28}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize={22}
          fontWeight={700}
          letterSpacing="0.2em"
          fill={
            state === "live" ? COLORS.marcat :
            state === "dead" ? "#C64545" :
            "#6B7280"
          }
        >
          {state === "live" ? "LIVE" : state === "dead" ? "OFF" : "BUILT"}
        </text>
      )}

      {/* Click catcher — transparent overlay, drawn last so it's on top, captures all clicks reliably */}
      {clickable && (
        <rect
          x={x - 4}
          y={y - 4}
          width={size + 8}
          height={size + 8}
          fill="transparent"
          pointerEvents="all"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        />
      )}
    </g>
  );
}
