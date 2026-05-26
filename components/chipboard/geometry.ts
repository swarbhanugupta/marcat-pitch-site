// Swastik clockwise routing — Manhattan PCB style.
// Each peripheral connects via a DIFFERENT side of MarCat (uses all 4 sides):
//   Brand TL    → MarCat LEFT (west arm, bends NORTH)
//   Consumer TR → MarCat TOP (north arm, bends EAST)
//   Retailer BR → MarCat RIGHT (east arm, bends SOUTH)
//   Supplier BL → MarCat BOTTOM (south arm, bends WEST)
// Each pipe pair = 2 parallel L-shapes connecting adjacent pin pairs.

import { BOARD, PIN } from "@/lib/tokens";

export interface Point {
  x: number;
  y: number;
}

export type ChipSide = "top" | "bottom" | "left" | "right";

// Compute the pin tip (far end) coordinates for a specific pin on a chip.
export function chipPinTip(
  chipCx: number,
  chipCy: number,
  chipSize: number,
  pinL: number,
  pinCount: number,
  side: ChipSide,
  pinIndex: number
): Point {
  const used = pinCount * PIN.width + (pinCount - 1) * PIN.gap;
  const inset = (chipSize - used) / 2;
  const cornerX = chipCx - chipSize / 2;
  const cornerY = chipCy - chipSize / 2;
  const pinCenterOffset = inset + pinIndex * PIN.pitch + PIN.width / 2;

  if (side === "top") {
    return { x: cornerX + pinCenterOffset, y: cornerY - pinL };
  }
  if (side === "bottom") {
    return { x: cornerX + pinCenterOffset, y: cornerY + chipSize + pinL };
  }
  if (side === "left") {
    return { x: cornerX - pinL, y: cornerY + pinCenterOffset };
  }
  return { x: cornerX + chipSize + pinL, y: cornerY + pinCenterOffset };
}

export function peripheralPinTip(
  peripheralName: "brand" | "consumer" | "supplier" | "retailer",
  side: ChipSide,
  pinIndex: number
): Point {
  const pos = BOARD.positions[peripheralName];
  return chipPinTip(
    pos.cx,
    pos.cy,
    BOARD.peripheral.size,
    PIN.peripheralLength,
    PIN.peripheralCount,
    side,
    pinIndex
  );
}

export function marcatPinTip(side: ChipSide, pinIndex: number): Point {
  return chipPinTip(
    BOARD.marcat.cx,
    BOARD.marcat.cy,
    BOARD.marcat.size,
    PIN.marcatLength,
    PIN.marcatCount,
    side,
    pinIndex
  );
}

export function pointsToSvgPath(points: Point[]): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

// Manhattan routing: 2 segments with one 90° turn.
// First segment runs along the START pin's axis; corner is the 90° turn;
// second segment runs along the END pin's axis (perpendicular).
export function computePinToPinPath(
  startPin: Point,
  startSide: ChipSide,
  endPin: Point,
  endSide: ChipSide
): [Point, Point, Point] {
  // startSide is left/right → pin axis is horizontal → first segment is horizontal (constant y)
  // startSide is top/bottom → pin axis is vertical → first segment is vertical (constant x)
  let corner: Point;
  if (startSide === "left" || startSide === "right") {
    corner = { x: endPin.x, y: startPin.y };
  } else {
    corner = { x: startPin.x, y: endPin.y };
  }
  return [startPin, corner, endPin];
}

// Swastik clockwise connection map.
// Each peripheral uses a UNIQUE side of MarCat (left/top/right/bottom).
// Outward pipe = outer pin pair (closer to canvas corner of that quadrant).
// Inward pipe = inner pin pair (closer to MarCat center).
export const CONNECTIONS: Record<
  "brand" | "consumer" | "supplier" | "retailer",
  {
    peripheral: { side: ChipSide; pinOutward: number; pinInward: number };
    marcat: { side: ChipSide; pinOutward: number; pinInward: number };
  }
> = {
  // Brand top-left: MarCat LEFT (west arm) bends NORTH to Brand BOTTOM
  brand: {
    peripheral: { side: "bottom", pinOutward: 6, pinInward: 7 },
    marcat: { side: "left", pinOutward: 0, pinInward: 1 },
  },
  // Consumer top-right: MarCat TOP (north arm) bends EAST to Consumer LEFT
  consumer: {
    peripheral: { side: "left", pinOutward: 0, pinInward: 1 },
    marcat: { side: "top", pinOutward: 8, pinInward: 7 },
  },
  // Supplier bottom-left: MarCat BOTTOM (south arm) bends WEST to Supplier RIGHT
  supplier: {
    peripheral: { side: "right", pinOutward: 0, pinInward: 1 },
    marcat: { side: "bottom", pinOutward: 0, pinInward: 1 },
  },
  // Retailer bottom-right: MarCat RIGHT (east arm) bends SOUTH to Retailer TOP
  retailer: {
    peripheral: { side: "top", pinOutward: 7, pinInward: 6 },
    marcat: { side: "right", pinOutward: 8, pinInward: 7 },
  },
};
