// ContentConnection — gray pipe connecting a peripheral chip's free pin pair
// to a content chip's pin pair. Manhattan routing, no tube electrons (tubes are
// reserved for MarCat-to-peripheral flow only).

import type { Point } from "./geometry";

interface ContentConnectionProps {
  peripheralPin: Point;
  peripheralSide: "top" | "bottom" | "left" | "right";
  contentPin: Point;
  contentSide: "top" | "bottom" | "left" | "right";
}

export function ContentConnection({
  peripheralPin,
  peripheralSide,
  contentPin,
}: ContentConnectionProps) {
  // Manhattan routing: first segment along peripheral pin axis (perpendicular to chip edge),
  // 90° turn, second segment to content chip pin
  let corner: Point;
  if (peripheralSide === "left" || peripheralSide === "right") {
    // Peripheral pin axis is horizontal → first segment horizontal
    corner = { x: contentPin.x, y: peripheralPin.y };
  } else {
    // Peripheral pin axis is vertical → first segment vertical
    corner = { x: peripheralPin.x, y: contentPin.y };
  }

  const d = `M ${peripheralPin.x} ${peripheralPin.y} L ${corner.x} ${corner.y} L ${contentPin.x} ${contentPin.y}`;

  return (
    <path
      d={d}
      fill="none"
      stroke="#C7CCD1"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}
