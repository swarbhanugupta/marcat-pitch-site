"use client";

// Makes the proof slide's data legibly LIVE rather than merely accurate.
//
// The numbers have always been fetched from the store; nothing on screen said so, and
// an investor cannot tell a live figure from a typed one. This shows the pull time and
// flashes when the bill count actually moves — a real bill landing at Banjara is the
// only thing that can trigger it.
//
// Deliberately renders NOTHING when the data came from FALLBACK_STATS: a "live" badge
// over stale numbers would be worse than no badge at all.

import { useEffect, useRef, useState } from "react";
import type { PitchStats } from "@/lib/pitchStats";
import { FALLBACK_STATS } from "@/lib/pitchStats";

export function LiveTicker({ stats }: { stats: PitchStats }) {
  const prevBills = useRef<number | null>(null);
  const [delta, setDelta] = useState(0);
  const [stamp, setStamp] = useState<string | null>(null);

  useEffect(() => {
    if (prevBills.current !== null && stats.bills > prevBills.current) {
      setDelta(stats.bills - prevBills.current);
      const t = setTimeout(() => setDelta(0), 8000);
      prevBills.current = stats.bills;
      return () => clearTimeout(t);
    }
    prevBills.current = stats.bills;
  }, [stats.bills]);

  // Set in an effect, never during render — a server-rendered clock would hydrate-mismatch.
  useEffect(() => {
    setStamp(
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  }, [stats]);

  // Identity check: fetchPitchStats returns the FALLBACK object itself on failure.
  const isLive = stats !== FALLBACK_STATS;
  if (!isLive || !stamp) return null;

  return (
    /* print:hidden — the badge means "this page is polling right now". In the exported
       PDF that is false, and a static document claiming liveness is exactly the kind of
       unearned claim this deck spent a whole pass removing. */
    <div className="absolute top-3 right-4 flex items-center gap-2 pointer-events-none select-none print:hidden">
      {delta > 0 && (
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-marcat-orange">
          +{delta} bill{delta > 1 ? "s" : ""}
        </span>
      )}
      <span className="relative flex h-[7px] w-[7px]">
        <span className="absolute inline-flex h-full w-full rounded-full bg-marcat-orange opacity-70 motion-safe:animate-ping" />
        <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-marcat-orange" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        live · {stamp}
      </span>
    </div>
  );
}
