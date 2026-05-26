// ContentChip — rectangular chip with content lines. Sized for Google Meet 720p readability.

import { COLORS } from "@/lib/tokens";

interface ContentChipProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  lines: string[];
  tone: "error" | "benefit" | "neutral";
  pinSide: "top" | "bottom" | "left" | "right";
  pinTips: { x: number; y: number }[];
}

const PIN_W = 4;

export function ContentChip({
  x, y, width, height, label, lines, tone, pinSide, pinTips,
}: ContentChipProps) {
  const accentColor =
    tone === "error" ? "#C64545" :
    tone === "benefit" ? COLORS.marcat :
    "#4B5563";

  const borderColor = tone === "error" ? "#C64545" : tone === "benefit" ? COLORS.marcat : "#4B5563";
  const bodyTextColor = tone === "error" ? "#C64545" : tone === "benefit" ? "#1F2937" : "#1F2937";

  const pinL = 11;
  let pinX1: (i: number) => number;
  let pinY1: (i: number) => number;
  let pinW: number;
  let pinH: number;

  if (pinSide === "top") {
    pinX1 = (i) => pinTips[i].x - PIN_W / 2;
    pinY1 = () => y - pinL;
    pinW = PIN_W; pinH = pinL;
  } else if (pinSide === "bottom") {
    pinX1 = (i) => pinTips[i].x - PIN_W / 2;
    pinY1 = () => y + height;
    pinW = PIN_W; pinH = pinL;
  } else if (pinSide === "left") {
    pinX1 = () => x - pinL;
    pinY1 = (i) => pinTips[i].y - PIN_W / 2;
    pinW = pinL; pinH = PIN_W;
  } else {
    pinX1 = () => x + width;
    pinY1 = (i) => pinTips[i].y - PIN_W / 2;
    pinW = pinL; pinH = PIN_W;
  }

  // Layout — sized for Meet H.264 compression survival inside 540×(130+60n) box.
  // Header 36, body 30 — bumped 2026-05-25 PM with viewBox 2000×900 to defeat
  // Meet's text-killing video codec. Renders ~17px on screen post-Meet share.
  const padX = 26;
  const headerY = y + 58;
  const dividerY = y + 94;
  const lineStartY = y + 114;
  const lineH = 60;

  return (
    <g>
      {/* Pins on the side facing peripheral */}
      {pinTips.map((_, i) => (
        <rect
          key={`pin-${i}`}
          x={pinX1(i)}
          y={pinY1(i)}
          width={pinW}
          height={pinH}
          fill="#9CA3AF"
        />
      ))}

      {/* Chip body */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        ry={3}
        fill="#FFFFFF"
        stroke={borderColor}
        strokeWidth={2}
      />

      {/* Accent corner square */}
      <rect
        x={x + 18}
        y={y + 18}
        width={16}
        height={16}
        fill={accentColor}
      />

      {/* Header label */}
      <text
        x={x + padX + 30}
        y={headerY}
        textAnchor="start"
        dominantBaseline="central"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize={36}
        fontWeight={800}
        letterSpacing="0.04em"
        fill="#0A0A0A"
      >
        {label}
      </text>

      {/* Hairline under header */}
      <line
        x1={x + padX}
        y1={dividerY}
        x2={x + width - padX}
        y2={dividerY}
        stroke="#E5E7EB"
        strokeWidth={1}
      />

      {/* Body lines */}
      {lines.map((line, i) => (
        <text
          key={`line-${i}`}
          x={x + padX}
          y={lineStartY + i * lineH}
          textAnchor="start"
          dominantBaseline="hanging"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fontSize={30}
          fontWeight={700}
          letterSpacing="0"
          fill={bodyTextColor}
        >
          {line}
        </text>
      ))}
    </g>
  );
}
