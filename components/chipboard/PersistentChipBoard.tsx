"use client";

import { BOARD, HEARTBEAT, DEFAULT_BOARD_STATE, PIN } from "@/lib/tokens";
import type { ChipName, ChipState, TubeMode } from "@/lib/tokens";
import { ChipDefs } from "./ChipDefs";
import { Chip } from "./Chip";
import { PipePair } from "./PipePair";
import { TubeElectron } from "./TubeElectron";
import { ContentChip } from "./ContentChip";
import { ContentConnection } from "./ContentConnection";
import { chipPinTip, peripheralPinTip } from "./geometry";
import type { ContentChipSpec } from "@/lib/sections-config";

interface PersistentChipBoardProps {
  chipStates?: Record<ChipName, ChipState>;
  tubeMode?: TubeMode;
  opacity?: number;
  showMarcatLogo?: boolean;
  className?: string;
  onMarcatClick?: () => void;
  contentChips?: ContentChipSpec[];
  /** Override viewBox to crop the SVG. Format: "x y w h". Used on mobile to
   *  zoom into just the chip cluster (default viewBox has ~60% empty edges
   *  reserved for content cards). */
  viewBoxOverride?: string;
}

interface PeripheralConfig {
  name: Exclude<ChipName, "marcat">;
  label: string;
  cx: number;
  cy: number;
}

const PERIPHERALS: PeripheralConfig[] = [
  { name: "brand",    label: "Brand",    cx: BOARD.positions.brand.cx,    cy: BOARD.positions.brand.cy },
  { name: "consumer", label: "Consumer", cx: BOARD.positions.consumer.cx, cy: BOARD.positions.consumer.cy },
  { name: "supplier", label: "Supplier", cx: BOARD.positions.supplier.cx, cy: BOARD.positions.supplier.cy },
  { name: "retailer", label: "Retailer", cx: BOARD.positions.retailer.cx, cy: BOARD.positions.retailer.cy },
];

// Map of peripheral name → which side is used for MarCat connection (DO NOT REUSE for content chips)
const MARCAT_SIDE: Record<Exclude<ChipName, "marcat">, "top" | "bottom" | "left" | "right"> = {
  brand: "bottom",
  consumer: "left",
  supplier: "right",
  retailer: "top",
};

// Position computation for content chip — placed outside the swastik area.
// Sideways-only layout: cards sit LEFT of left-column chips, RIGHT of right-column
// chips. Uses the ~350px outer horizontal margins, lets us run bigger text.
function computeContentChipLayout(spec: ContentChipSpec) {
  const peri = BOARD.positions[spec.peripheral];
  const periHalf = BOARD.peripheral.size / 2;
  const contentW = 540;
  const contentH = 130 + spec.lines.length * 60;
  const gap = 16;

  let cx: number, cy: number;
  let contentSide: "top" | "bottom" | "left" | "right";

  if (spec.side === "top") {
    cx = peri.cx;
    cy = peri.cy - periHalf - PIN.peripheralLength - gap - contentH / 2;
    contentSide = "bottom";
  } else if (spec.side === "bottom") {
    cx = peri.cx;
    cy = peri.cy + periHalf + PIN.peripheralLength + gap + contentH / 2;
    contentSide = "top";
  } else if (spec.side === "left") {
    cx = peri.cx - periHalf - PIN.peripheralLength - gap - contentW / 2;
    cy = peri.cy;
    contentSide = "right";
  } else {
    cx = peri.cx + periHalf + PIN.peripheralLength + gap + contentW / 2;
    cy = peri.cy;
    contentSide = "left";
  }

  // Soft clamp only — keep within viewBox but never closer than the peripheral chip edge,
  // so we never pile a content chip on top of a peripheral.
  const edgeBuffer = 12;
  const periTop = peri.cy - periHalf - PIN.peripheralLength;
  const periBottom = peri.cy + periHalf + PIN.peripheralLength;
  const periLeft = peri.cx - periHalf - PIN.peripheralLength;
  const periRight = peri.cx + periHalf + PIN.peripheralLength;

  if (spec.side === "top") {
    cy = Math.max(contentH / 2 + edgeBuffer, cy);
    cy = Math.min(cy, periTop - gap - contentH / 2);
  } else if (spec.side === "bottom") {
    cy = Math.min(BOARD.viewBox.h - contentH / 2 - edgeBuffer, cy);
    cy = Math.max(cy, periBottom + gap + contentH / 2);
  } else if (spec.side === "left") {
    cx = Math.max(contentW / 2 + edgeBuffer, cx);
    cx = Math.min(cx, periLeft - gap - contentW / 2);
  } else {
    cx = Math.min(BOARD.viewBox.w - contentW / 2 - edgeBuffer, cx);
    cx = Math.max(cx, periRight + gap + contentW / 2);
  }

  const bodyX = cx - contentW / 2;
  const bodyY = cy - contentH / 2;

  // Compute connection: 1 pin on peripheral side + 1 pin on content side
  // Pin pair: cycle through pin indices based on spec.pinPair
  // We use 1 pin (not pair) for content connection to keep it simple
  const pinIdx = spec.pinPair * 2 + 1; // 1, 3, 5, 7

  const peripheralPin = peripheralPinTip(spec.peripheral, spec.side, pinIdx);

  // Content chip pin: place at center of the facing side
  // For top/bottom side, pin x is at content chip horizontal center
  // For left/right side, pin y is at content chip vertical center
  let contentPin: { x: number; y: number };
  if (contentSide === "top") {
    contentPin = { x: cx, y: bodyY - PIN.peripheralLength };
  } else if (contentSide === "bottom") {
    contentPin = { x: cx, y: bodyY + contentH + PIN.peripheralLength };
  } else if (contentSide === "left") {
    contentPin = { x: bodyX - PIN.peripheralLength, y: cy };
  } else {
    contentPin = { x: bodyX + contentW + PIN.peripheralLength, y: cy };
  }

  return {
    bodyX,
    bodyY,
    contentW,
    contentH,
    contentSide,
    peripheralPin,
    peripheralSide: spec.side,
    contentPin,
  };
}

export function PersistentChipBoard({
  chipStates = DEFAULT_BOARD_STATE,
  tubeMode = "flowing",
  opacity = 1,
  showMarcatLogo = true,
  className,
  onMarcatClick,
  contentChips = [],
  viewBoxOverride,
}: PersistentChipBoardProps) {
  const marcatState = chipStates.marcat;

  // Compute content chip layouts
  const contentLayouts = contentChips.map((spec) => ({
    spec,
    layout: computeContentChipLayout(spec),
  }));

  return (
    <svg
      viewBox={viewBoxOverride ?? `0 0 ${BOARD.viewBox.w} ${BOARD.viewBox.h}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        opacity,
        transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <ChipDefs />

      {/* Background — pure WHITE */}
      <rect width={BOARD.viewBox.w} height={BOARD.viewBox.h} fill="#FFFFFF" />

      {/* MarCat-peripheral pipes (swastik routing) */}
      {PERIPHERALS.map((p) => {
        const isLive = chipStates[p.name] === "live";
        return (
          <PipePair
            key={`pipe-${p.name}`}
            peripheralName={p.name}
            variant={isLive ? "live" : "built"}
          />
        );
      })}

      {/* Content chip connections (gray pipes, no tubes) */}
      {contentLayouts.map(({ spec, layout }, i) => (
        <ContentConnection
          key={`content-conn-${i}-${spec.peripheral}`}
          peripheralPin={layout.peripheralPin}
          peripheralSide={layout.peripheralSide}
          contentPin={layout.contentPin}
          contentSide={layout.contentSide}
        />
      ))}

      {/* Tube electrons — only on LIVE pipes, only when flowing and MarCat alive */}
      {tubeMode === "flowing" && marcatState !== "dead" && (
        <g>
          {PERIPHERALS.map((p) => {
            const isLive = chipStates[p.name] === "live";
            if (!isLive) return null;
            return (
              <g key={`tubes-${p.name}`}>
                {Array.from({ length: HEARTBEAT.tubesPerPhase }, (_, i) => (
                  <TubeElectron
                    key={`out-${p.name}-${i}`}
                    pathId={`pipe-${p.name}-outward`}
                    durationMs={HEARTBEAT.tubeDurationMs}
                    beginMs={HEARTBEAT.outwardStartMs + i * HEARTBEAT.tubeStaggerMs}
                    totalCycleMs={HEARTBEAT.totalMs}
                    visible={true}
                  />
                ))}
                {Array.from({ length: HEARTBEAT.tubesPerPhase }, (_, i) => (
                  <TubeElectron
                    key={`in-${p.name}-${i}`}
                    pathId={`pipe-${p.name}-inward`}
                    durationMs={HEARTBEAT.tubeDurationMs}
                    beginMs={HEARTBEAT.inwardStartMs + i * HEARTBEAT.tubeStaggerMs}
                    totalCycleMs={HEARTBEAT.totalMs}
                    visible={true}
                  />
                ))}
              </g>
            );
          })}
        </g>
      )}

      {/* Peripheral chips */}
      {PERIPHERALS.map((p) => (
        <Chip
          key={`chip-${p.name}`}
          cx={p.cx}
          cy={p.cy}
          size={BOARD.peripheral.size}
          variant="peripheral"
          state={chipStates[p.name]}
          label={p.label}
          arrivalTiming={tubeMode === "flowing" ? "outward" : null}
        />
      ))}

      {/* Content chips — rendered last so they sit on top of any overlapping pipes */}
      {contentLayouts.map(({ spec, layout }, i) => {
        // Compute pin tips array for visualization (just the connection pin for now)
        const pinTips = [layout.contentPin];
        return (
          <ContentChip
            key={`content-${i}-${spec.peripheral}`}
            x={layout.bodyX}
            y={layout.bodyY}
            width={layout.contentW}
            height={layout.contentH}
            label={spec.label}
            lines={spec.lines}
            tone={spec.tone}
            pinSide={layout.contentSide}
            pinTips={pinTips}
          />
        );
      })}

      {/* MarCat — drawn last, on top */}
      <Chip
        cx={BOARD.marcat.cx}
        cy={BOARD.marcat.cy}
        size={BOARD.marcat.size}
        variant="marcat"
        state={marcatState}
        label="MarCat"
        logoHref={showMarcatLogo ? "/marcat-logo.png" : undefined}
        onClick={onMarcatClick}
        clickable={!!onMarcatClick}
        arrivalTiming={tubeMode === "flowing" ? "inward" : null}
      />
    </svg>
  );
}
