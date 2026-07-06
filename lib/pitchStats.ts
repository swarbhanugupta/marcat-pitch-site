// Live Banjara-lab stats for the Proof slide.
//
// Fetches the public aggregate RPC `pitch_banjara_stats` at view-time so an
// investor opening the deck sees CURRENT numbers, counted through YESTERDAY
// (the RPC excludes the partial current day). Falls back to the last verified
// read-only pull so the deck never renders blank if the DB is unreachable.
//
// The RPC returns aggregates only (no row/PII data) and anon can call nothing
// else, so exposing it to the public marketing site is safe.

import { useEffect, useState } from "react";
import type { SectionState } from "./sections-config";

const SUPABASE_URL = "https://skaivanwarzibzcsgnis.supabase.co";
// Public anon key — already shipped in the marcat-v2 client bundle; the only
// thing it can reach here is the aggregate RPC.
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYWl2YW53YXJ6aWJ6Y3NnbmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTYyNDksImV4cCI6MjA4NzQ5MjI0OX0.RT9gCa3Ok6E6b2OfWgLlKUyzd7btPgd8FQRGKAgHZ2Q";

export interface PitchStats {
  bills: number;
  days: number;
  gmv: number;
  skus: number;
  customers: number;
  orders: number;
}

// Last verified read-only pull, through yesterday (2026-07-05). SSR + fetch-fail fallback.
export const FALLBACK_STATS: PitchStats = {
  bills: 11204, days: 70, gmv: 1039507, skus: 6614, customers: 3372, orders: 95,
};

const inr = (n: number) => n.toLocaleString("en-IN");
const gmvLakh = (gmv: number) => `₹${(gmv / 100000).toFixed(1)}L`;
const billsPlus = (n: number) => `${inr(Math.floor(n / 100) * 100)}+`;
const perDay = (bills: number, days: number) => `~${Math.round(bills / Math.max(1, days))} A DAY`;

export const proofRetailerLines = (s: PitchStats): string[] => [
  `${billsPlus(s.bills)} BILLS SINCE APR`,
  perDay(s.bills, s.days),
  `${inr(s.skus)} SKUS LIVE`,
];
export const proofConsumerLines = (s: PitchStats): string[] => [
  `${inr(s.customers)} CUSTOMERS TRACKED`,
  "KHATA + LOYALTY LIVE",
  `${s.orders} STOREFRONT ORDERS`,
];
export const proofSystemBand = (s: PitchStats): string =>
  `${gmvLakh(s.gmv)} GMV PROCESSED · ${s.days} DAYS LIVE, A BILL EVERY SINGLE DAY`;

// Rebuild the Proof section's live numbers into a rendered SectionState.
// No-op for every other section (keyed on the Proof eyebrow).
export function withLiveProof(state: SectionState, stats: PitchStats): SectionState {
  if (state.eyebrow !== "05 · PROOF") return state;
  return {
    ...state,
    contentChips: state.contentChips.map((c) =>
      c.peripheral === "retailer"
        ? { ...c, lines: proofRetailerLines(stats) }
        : c.peripheral === "consumer"
          ? { ...c, lines: proofConsumerLines(stats) }
          : c,
    ),
    systemBand: proofSystemBand(stats),
  };
}

export async function fetchPitchStats(): Promise<PitchStats> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/pitch_banjara_stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: "{}",
      cache: "no-store",
    });
    if (!res.ok) return FALLBACK_STATS;
    const d = (await res.json()) as Partial<PitchStats> | null;
    if (!d || typeof d.bills !== "number") return FALLBACK_STATS;
    return {
      bills: Number(d.bills) || FALLBACK_STATS.bills,
      days: Number(d.days) || FALLBACK_STATS.days,
      gmv: Number(d.gmv) || FALLBACK_STATS.gmv,
      skus: Number(d.skus) || FALLBACK_STATS.skus,
      customers: Number(d.customers) || FALLBACK_STATS.customers,
      orders: Number(d.orders) || FALLBACK_STATS.orders,
    };
  } catch {
    return FALLBACK_STATS;
  }
}

// Client hook: renders the fallback immediately (SSR-safe, no hydration jump
// since fallback ≈ live), then updates to the live pull after mount.
export function usePitchStats(): PitchStats {
  const [stats, setStats] = useState<PitchStats>(FALLBACK_STATS);
  useEffect(() => {
    let active = true;
    fetchPitchStats().then((s) => { if (active) setStats(s); });
    return () => { active = false; };
  }, []);
  return stats;
}
