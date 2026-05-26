// CircuitChip — a semiconductor / IC chip as SVG. Rendered as <g> inside parent SVG.
// References shared defs (gradients, patterns, filters) defined once in NodeNetwork.
//
// Visual grammar (per deep research, Apple/Cerebras/Groq playbook):
//   - Body: near-black radial gradient, off-centred light from upper-left
//   - Double-stroke bevel for depth
//   - Many metallic pins (gap < pin-width = tight packing)
//   - Pin-1 indicator dot (orange) inside top-left of die
//   - Die area with tile pattern + silk-screen monospace label
//   - rx=3 corner radius (NOT 8+, that's UI-chip language)

type Status = "LIVE" | "BUILT";

export type ChipProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;          // e.g. "MARCAT"
  partNumber?: string;    // e.g. "MCT-2026 · ORCH"
  yearCode?: string;      // e.g. "IN-2026"
  status?: Status;
  variant?: "marcat" | "portal";
  pinsHorizontal?: number;  // pins along top/bottom each
  pinsVertical?: number;    // pins along left/right each
  logoHref?: string;        // optional image embedded as the die (e.g. /marcat-mark.png)
};

export function CircuitChip({
  x,
  y,
  width,
  height,
  label,
  partNumber,
  yearCode,
  status,
  variant = "portal",
  pinsHorizontal = 10,
  pinsVertical = 8,
  logoHref,
}: ChipProps) {
  const isMarcat = variant === "marcat";

  // Pin geometry — gap < width = tight packing (research rule)
  const pinW = 4;        // pin width (perpendicular to chip edge)
  const pinL = isMarcat ? 14 : 11;  // pin length (extends from chip)
  const pinGap = 2.5;    // gap between adjacent pins

  // Compute pin positions along each edge, evenly distributed inside edge inset
  const edgeInsetH = (width - (pinsHorizontal * pinW + (pinsHorizontal - 1) * pinGap)) / 2;
  const edgeInsetV = (height - (pinsVertical * pinW + (pinsVertical - 1) * pinGap)) / 2;

  // Generate pin rectangles for each side
  const topPins = Array.from({ length: pinsHorizontal }, (_, i) => ({
    x: x + edgeInsetH + i * (pinW + pinGap),
    y: y - pinL,
    w: pinW,
    h: pinL,
    side: "top" as const,
  }));
  const bottomPins = Array.from({ length: pinsHorizontal }, (_, i) => ({
    x: x + edgeInsetH + i * (pinW + pinGap),
    y: y + height,
    w: pinW,
    h: pinL,
    side: "bottom" as const,
  }));
  const leftPins = Array.from({ length: pinsVertical }, (_, i) => ({
    x: x - pinL,
    y: y + edgeInsetV + i * (pinW + pinGap),
    w: pinL,
    h: pinW,
    side: "left" as const,
  }));
  const rightPins = Array.from({ length: pinsVertical }, (_, i) => ({
    x: x + width,
    y: y + edgeInsetV + i * (pinW + pinGap),
    w: pinL,
    h: pinW,
    side: "right" as const,
  }));
  const allPins = [...topPins, ...bottomPins, ...leftPins, ...rightPins];

  // Die area — central inset rectangle
  const dieInset = isMarcat ? 28 : 16;
  const dieX = x + dieInset;
  const dieY = y + dieInset;
  const dieW = width - dieInset * 2;
  const dieH = height - dieInset * 2;

  // Pin-1 indicator dot — small orange circle just inside die top-left
  const pin1 = { cx: dieX + 8, cy: dieY + 8, r: isMarcat ? 3.5 : 2.5 };

  // Label positioning — centred in die
  const centerX = x + width / 2;
  const labelY = isMarcat ? y + height / 2 + 6 : y + height / 2 + 4;

  return (
    <g>
      {/* Pins — drawn FIRST so chip body sits on top of pin bases */}
      {allPins.map((p, i) => {
        const grad = p.side === "top" || p.side === "bottom" ? "url(#pinGradV)" : "url(#pinGradH)";
        return (
          <rect
            key={`pin-${i}`}
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill={grad}
          />
        );
      })}

      {/* Chip body — radial gradient with off-centred light from upper-left */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        ry={3}
        fill={isMarcat ? "url(#chipBodyMarcat)" : "url(#chipBody)"}
      />
      {/* Outer dark hairline */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        ry={3}
        fill="none"
        stroke="#000000"
        strokeWidth={0.75}
        opacity={0.9}
      />
      {/* Inner bevel highlight — top half subtle white, bottom half subtle dark */}
      <rect
        x={x + 0.75}
        y={y + 0.75}
        width={width - 1.5}
        height={height - 1.5}
        rx={2.5}
        ry={2.5}
        fill="none"
        stroke="url(#chipBevel)"
        strokeWidth={0.5}
      />

      {/* Die area — slightly darker rect with tile pattern, simulates the silicon die */}
      <rect
        x={dieX}
        y={dieY}
        width={dieW}
        height={dieH}
        rx={1.5}
        ry={1.5}
        fill="url(#dieTiles)"
      />
      <rect
        x={dieX}
        y={dieY}
        width={dieW}
        height={dieH}
        rx={1.5}
        ry={1.5}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={0.5}
      />

      {/* Pin-1 indicator dot */}
      <circle
        cx={pin1.cx}
        cy={pin1.cy}
        r={pin1.r}
        fill="#FF6E1E"
        opacity={0.85}
      />
      <circle
        cx={pin1.cx}
        cy={pin1.cy}
        r={pin1.r}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={0.5}
      />

      {/* Optional embedded logo image (used as the die centerpiece for MarCat hero chip) */}
      {logoHref && (() => {
        // Logo takes ~50% of die width, centred horizontally, sits in upper portion of die
        const logoW = Math.min(dieW, dieH) * 0.55;
        const logoH = logoW;
        const logoX = x + width / 2 - logoW / 2;
        const logoYpos = dieY + (dieH - logoH) / 2 - dieH * 0.1; // shift up slightly to make room for label below
        return (
          <image
            href={logoHref}
            x={logoX}
            y={logoYpos}
            width={logoW}
            height={logoH}
            preserveAspectRatio="xMidYMid meet"
          />
        );
      })()}

      {/* Silk-screen label — monospace, ALL CAPS, white at reduced opacity */}
      <text
        x={centerX}
        y={logoHref ? dieY + dieH - (isMarcat ? 24 : 18) : labelY}
        textAnchor="middle"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
        fontSize={isMarcat ? 22 : 12}
        fontWeight={700}
        fill="#FFFFFF"
        opacity={0.85}
        letterSpacing={isMarcat ? 3 : 1.5}
      >
        {label.toUpperCase()}
      </text>

      {/* Part-number / subtitle — smaller mono, lower opacity */}
      {partNumber && (
        <text
          x={centerX}
          y={logoHref ? dieY + dieH - (isMarcat ? 10 : 6) : labelY + (isMarcat ? 20 : 14)}
          textAnchor="middle"
          fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          fontSize={isMarcat ? 9 : 7.5}
          fontWeight={500}
          fill="#FFFFFF"
          opacity={0.42}
          letterSpacing={isMarcat ? 1.2 : 0.8}
        >
          {partNumber}
        </text>
      )}

      {/* Year code in bottom-right of die */}
      {yearCode && (
        <text
          x={dieX + dieW - 6}
          y={dieY + dieH - 6}
          textAnchor="end"
          fontFamily="var(--font-geist-mono), ui-monospace, monospace"
          fontSize={6.5}
          fontWeight={500}
          fill="#FFFFFF"
          opacity={0.28}
          letterSpacing={0.6}
        >
          {yearCode}
        </text>
      )}

      {/* Status badge — tiny indicator at bottom-left of die */}
      {status && (
        <g>
          <circle
            cx={dieX + 8}
            cy={dieY + dieH - 8}
            r={2}
            fill={status === "LIVE" ? "#FF6E1E" : "#666666"}
          />
          <text
            x={dieX + 14}
            y={dieY + dieH - 5}
            textAnchor="start"
            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
            fontSize={6.5}
            fontWeight={600}
            fill={status === "LIVE" ? "#FF6E1E" : "rgba(255,255,255,0.4)"}
            letterSpacing={0.6}
          >
            {status}
          </text>
        </g>
      )}
    </g>
  );
}
