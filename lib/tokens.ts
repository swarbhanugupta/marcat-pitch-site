// Single source of truth for canvas + spec tokens — locked 2026-05-23.
// Match values in app/globals.css :root and tailwind.config.ts.

export const COLORS = {
  canvas: "#FFFFFF",
  canvasSoft: "#FAFAF7",
  inkStrong: "#000000",
  ink: "#0A0A0A",
  textMute: "#6B6B6B",
  hairline: "#E5E7EB",
  hairlineSoft: "#F0F0F0",
  marcat: "#FF6E1E",
  marcatGold: "#FBA924",
  error: "#C64545",
} as const;

// Chip body gradient stops (used in <radialGradient>)
export const CHIP_BODY_STOPS = {
  outer: "#08080D",
  mid: "#16161E",
  inner: "#2B2B36",
  marcatOuter: "#0A0A12",
  marcatMid: "#1A1A22",
  marcatInner: "#34343F",
} as const;

// ChipBoard layout — viewBox widened 2026-05-25 to 2000×900 (aspect 2.22)
// to give content cards more outer space so we can bump card text 24→30px
// (25% bigger on screen) to survive Meet H.264 compression.
export const BOARD = {
  viewBox: { w: 2000, h: 900 },
  marcat: { size: 250, cx: 1000, cy: 450 },
  peripheral: { size: 180 },
  positions: {
    brand:    { cx: 660, cy: 270 },   // top-left
    consumer: { cx: 1340, cy: 270 },  // top-right
    supplier: { cx: 660, cy: 630 },   // bottom-left
    retailer: { cx: 1340, cy: 630 },  // bottom-right
  },
} as const;

// Heartbeat — 2.5s cycle, multiple tubes per phase creating a "flow" effect
// Each phase fires 3 tubes staggered 220ms apart; each tube travels for 800ms
export const HEARTBEAT = {
  totalMs: 2500,
  tubesPerPhase: 3,
  tubeDurationMs: 800,
  tubeStaggerMs: 220,
  outwardStartMs: 0,
  // Outward phase lasts (tubesPerPhase-1)*stagger + tubeDuration = 440 + 800 = 1240ms (0 to 1240)
  quietAfterOutwardMs: 60,
  inwardStartMs: 1300,
  // Inward phase: 1300 to 2540 — fits within 2500ms cycle (last tube spills 40ms but invisible)
  // Tube visual size — sized for Google Meet 720p screen-share visibility
  tubeLen: 36,
  tubeThickness: 7,
  // Kept for legacy compatibility (will be removed):
  outwardMs: 800,
  inwardMs: 800,
} as const;

// Pipe pair geometry
export const PIPE = {
  strokeWidth: 2,
  gap: 6,           // 6px between outward + inward pipes
  dashedArray: "4 4", // for BUILT (not live)
} as const;

// Pin geometry — must match Chip.tsx rendering
export const PIN = {
  width: 4,
  gap: 2.5,
  pitch: 6.5,            // width + gap
  marcatLength: 14,      // pin protrusion length for MarCat
  peripheralLength: 11,  // for peripheral chips
  marcatCount: 9,        // pins per side on MarCat
  peripheralCount: 8,    // pins per side on peripherals
} as const;

export type ChipName = "marcat" | "brand" | "consumer" | "supplier" | "retailer";
export type ChipState = "live" | "built" | "dead" | "dim";
export type TubeMode = "flowing" | "paused" | "vanishing";

// Default board state — Retailer + Consumer LIVE, Brand + Supplier BUILT
export const DEFAULT_BOARD_STATE: Record<ChipName, ChipState> = {
  marcat: "live",
  retailer: "live",
  consumer: "live",
  brand: "built",
  supplier: "built",
};
