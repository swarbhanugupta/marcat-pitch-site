// TubeElectron — 24×4 orange capsule traveling along a pipe path via
// SVG <animateMotion>. Multi-layer: outer glow + capsule body + white-hot core.

import { COLORS, HEARTBEAT } from "@/lib/tokens";

interface TubeElectronProps {
  pathId: string;
  durationMs: number;
  beginMs: number;
  totalCycleMs: number;
  visible: boolean;
}

export function TubeElectron({
  pathId,
  durationMs,
  beginMs,
  totalCycleMs,
  visible,
}: TubeElectronProps) {
  if (!visible) return null;

  const cycleDur = `${totalCycleMs / 1000}s`;
  const begin = `${beginMs / 1000}s`;

  const w = HEARTBEAT.tubeLen;
  const h = HEARTBEAT.tubeThickness;

  // Visibility fraction: tube travels for durationMs out of total cycle
  const travelEnd = durationMs / totalCycleMs;

  // Use the same keyTimes for motion + opacity so they sync exactly
  const motionKeyTimes = `0; ${travelEnd}; 1`;
  const motionKeyPoints = `0; 1; 1`;
  const opacityKeyTimes = `0; ${(travelEnd * 0.92).toFixed(4)}; ${travelEnd.toFixed(4)}; 1`;
  const opacityValues = `1; 1; 0; 0`;
  const glowOpacityValues = `0.5; 0.5; 0; 0`;

  return (
    <g>
      {/* Wide outer glow (electronGlow filter) */}
      <g filter="url(#electronGlow)">
        <rect
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx={h / 2}
          ry={h / 2}
          fill={COLORS.marcat}
        >
          <animateMotion
            dur={cycleDur}
            repeatCount="indefinite"
            begin={begin}
            rotate="auto"
            keyPoints={motionKeyPoints}
            keyTimes={motionKeyTimes}
            calcMode="linear"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            dur={cycleDur}
            repeatCount="indefinite"
            begin={begin}
            values={glowOpacityValues}
            keyTimes={opacityKeyTimes}
          />
        </rect>
      </g>

      {/* Main capsule body */}
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={h / 2}
        ry={h / 2}
        fill={COLORS.marcat}
      >
        <animateMotion
          dur={cycleDur}
          repeatCount="indefinite"
          begin={begin}
          rotate="auto"
          keyPoints={motionKeyPoints}
          keyTimes={motionKeyTimes}
          calcMode="linear"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          dur={cycleDur}
          repeatCount="indefinite"
          begin={begin}
          values={opacityValues}
          keyTimes={opacityKeyTimes}
        />
      </rect>

      {/* White-hot inner core (smaller capsule along center) */}
      <rect
        x={-w / 2 + 4}
        y={-h / 2 + 1}
        width={w - 8}
        height={h - 2}
        rx={(h - 2) / 2}
        ry={(h - 2) / 2}
        fill="#FFFFFF"
        opacity={0.8}
      >
        <animateMotion
          dur={cycleDur}
          repeatCount="indefinite"
          begin={begin}
          rotate="auto"
          keyPoints={motionKeyPoints}
          keyTimes={motionKeyTimes}
          calcMode="linear"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          dur={cycleDur}
          repeatCount="indefinite"
          begin={begin}
          values={`0.8; 0.8; 0; 0`}
          keyTimes={opacityKeyTimes}
        />
      </rect>
    </g>
  );
}
