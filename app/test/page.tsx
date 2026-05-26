"use client";

// Test page — chip board fills the viewport, controls compact at top.
// Tube burst behavior: tubes flow for 7.5s at "inception", then pause.

import { useState, useEffect, useRef } from "react";
import { PersistentChipBoard } from "@/components/chipboard/PersistentChipBoard";
import type { ChipName, ChipState, TubeMode } from "@/lib/tokens";
import { DEFAULT_BOARD_STATE } from "@/lib/tokens";

const BURST_DURATION_MS = 7500; // 3 full heartbeat cycles (2.5s × 3)

export default function TestPage() {
  const [chipStates, setChipStates] = useState<Record<ChipName, ChipState>>(DEFAULT_BOARD_STATE);
  const [tubeMode, setTubeMode] = useState<TubeMode>("flowing");
  const [opacity, setOpacity] = useState(1);
  const [showLogo, setShowLogo] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [controlsOpen, setControlsOpen] = useState(false);
  const burstTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger a burst: flow tubes for BURST_DURATION_MS, then pause
  const triggerBurst = () => {
    if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    setTubeMode("flowing");
    burstTimeoutRef.current = setTimeout(() => setTubeMode("paused"), BURST_DURATION_MS);
  };

  // Initial burst on mount
  useEffect(() => {
    triggerBurst();
    return () => {
      if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setChip = (name: ChipName, state: ChipState) => {
    setChipStates((prev) => ({ ...prev, [name]: state }));
  };

  const btnBase =
    "px-2 py-1 text-[10px] font-mono uppercase tracking-wider border transition-colors whitespace-nowrap";
  const btnOff = "border-line bg-canvas-white hover:bg-marcat-soft";
  const btnOn = "border-marcat-orange bg-marcat-soft";

  return (
    <main className="h-screen w-screen overflow-hidden bg-canvas-white flex flex-col">
      {/* Compact top bar — controls + collapse */}
      <div className="border-b border-line bg-canvas-white px-3 py-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 flex-shrink-0">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted whitespace-nowrap">
          chipboard test
        </span>

        {/* Quick presets */}
        <button onClick={() => setChipStates(DEFAULT_BOARD_STATE)} className={`${btnBase} ${btnOff}`}>
          Default
        </button>
        <button
          onClick={() => setChipStates({ marcat: "live", brand: "live", consumer: "live", supplier: "live", retailer: "live" })}
          className={`${btnBase} ${btnOff}`}
        >
          All live
        </button>
        <button onClick={() => setChipStates({ ...chipStates, marcat: "dead" })} className={`${btnBase} ${btnOff}`}>
          Kill MarCat
        </button>

        {/* Tubes — burst is the section-inception behavior. Manual toggle for testing. */}
        <button onClick={triggerBurst} className={`${btnBase} ${tubeMode === "flowing" ? btnOn : btnOff}`}>
          {tubeMode === "flowing" ? "▶ flowing" : "↻ re-burst"}
        </button>

        {/* Toggles */}
        <button onClick={() => setShowLogo(!showLogo)} className={`${btnBase} ${showLogo ? btnOn : btnOff}`}>
          Logo {showLogo ? "on" : "off"}
        </button>
        <button onClick={() => setShowGrid(!showGrid)} className={`${btnBase} ${showGrid ? btnOn : btnOff}`}>
          Grid {showGrid ? "on" : "off"}
        </button>

        {/* Click counter */}
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted ml-auto whitespace-nowrap">
          clicks: {clickCount}
        </span>

        {/* Expand per-chip controls */}
        <button onClick={() => setControlsOpen(!controlsOpen)} className={`${btnBase} ${controlsOpen ? btnOn : btnOff}`}>
          {controlsOpen ? "▲ less" : "▼ more"}
        </button>
      </div>

      {/* Optional expanded controls — per-chip state grid */}
      {controlsOpen && (
        <div className="border-b border-line bg-canvas-soft px-3 py-2 flex-shrink-0">
          <div className="grid grid-cols-5 gap-1.5">
            {(Object.keys(chipStates) as ChipName[]).map((name) => (
              <div key={name} className="border border-line bg-canvas-white p-1.5">
                <div className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-1">{name}</div>
                <div className="flex flex-wrap gap-0.5">
                  {(["live", "built", "dead", "dim"] as ChipState[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setChip(name, s)}
                      className={`px-1 py-0.5 text-[8px] font-mono uppercase border transition-colors ${
                        chipStates[name] === s ? btnOn : btnOff
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center mt-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">opacity</span>
            {[1, 0.2, 0].map((o) => (
              <button
                key={o}
                onClick={() => setOpacity(o)}
                className={`${btnBase} ${opacity === o ? btnOn : btnOff}`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chip board fills the remaining viewport — SVG preserveAspectRatio handles fit */}
      <div className="flex-1 min-h-0 bg-canvas-white">
        <PersistentChipBoard
          chipStates={chipStates}
          tubeMode={tubeMode}
          opacity={opacity}
          showMarcatLogo={showLogo}
          onMarcatClick={() => setClickCount((c) => c + 1)}
        />
      </div>
    </main>
  );
}
