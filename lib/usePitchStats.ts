"use client";

// Client hook, split out of ./pitchStats so that module stays server-importable
// (app/page.tsx does the initial pull on the server).
//
// Seeds from the SERVER pull when one is passed in, so first paint already carries
// current numbers; falls back to FALLBACK_STATS only when the server fetch itself
// failed. Then re-reads live after mount.

import { useEffect, useState } from "react";
import { FALLBACK_STATS, fetchPitchStats } from "./pitchStats";
import type { PitchStats } from "./pitchStats";

// Re-pulls on an interval so the numbers actually move while the deck is open.
// Banjara writes a bill roughly every 4–5 minutes in trading hours, so a viewer
// sitting on the proof slide will see the count tick rather than a frozen figure.
export const POLL_MS = 30_000;

export function usePitchStats(initial?: PitchStats): PitchStats {
  const [stats, setStats] = useState<PitchStats>(initial ?? FALLBACK_STATS);
  useEffect(() => {
    let active = true;
    const pull = () => fetchPitchStats().then((s) => { if (active) setStats(s); });
    pull();
    const id = setInterval(pull, POLL_MS);
    return () => { active = false; clearInterval(id); };
  }, []);
  return stats;
}
