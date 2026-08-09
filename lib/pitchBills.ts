// Real Banjara bills for the slide-05 transaction feed.
//
// Server-safe (no React) — same rule as ./pitchStats, since app/page.tsx may import it.
// Backed by public.pitch_recent_bills: last 20 completed bills, aggregate-safe
// (amount, time, item count only — no customer id, name or phone).
//
// Degrades to an empty list on any failure. An empty feed renders nothing at all,
// which is the correct behaviour: a fabricated transaction feed would be far worse
// than none on the one slide whose job is to be believed.

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./pitchStats";

export interface RecentBill {
  amount: number;
  billed_at: string;
  item_count: number;
}

export async function fetchRecentBills(): Promise<RecentBill[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/pitch_recent_bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: "{}",
      cache: "no-store",
    });
    if (!res.ok) return [];
    const d = await res.json();
    if (!Array.isArray(d)) return [];
    return d
      .filter((b) => b && typeof b.amount !== "undefined" && b.billed_at)
      .map((b) => ({
        amount: Number(b.amount),
        billed_at: String(b.billed_at),
        item_count: Number(b.item_count) || 0,
      }));
  } catch {
    return [];
  }
}
