// Live Banjara-lab stats for the Proof slide.
//
// Fetches the public aggregate RPC `pitch_banjara_stats` at view-time so an
// investor opening the deck sees CURRENT numbers, counted through YESTERDAY
// (the RPC excludes the partial current day). Falls back to the last verified
// read-only pull so the deck never renders blank if the DB is unreachable.
//
// The RPC returns aggregates only (no row/PII data) and anon can call nothing
// else, so exposing it to the public marketing site is safe.

// NOTE: this module is imported by app/page.tsx (a Server Component), so it must
// stay free of React hooks. The client hook lives in ./usePitchStats.
import type { SectionState } from "./sections-config";
import type { RecentBill } from "./pitchBills";

export const SUPABASE_URL = "https://skaivanwarzibzcsgnis.supabase.co";
// Public anon key — already shipped in the marcat-v2 client bundle; the only
// thing it can reach here is the aggregate RPC.
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYWl2YW53YXJ6aWJ6Y3NnbmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTYyNDksImV4cCI6MjA4NzQ5MjI0OX0.RT9gCa3Ok6E6b2OfWgLlKUyzd7btPgd8FQRGKAgHZ2Q";

export interface PitchStats {
  bills: number;
  days: number;
  gmv: number;
  skus: number;
  customers: number;
  orders: number;
}

// Last verified read-only pull (2026-08-09). SSR + fetch-fail fallback.
// REFRESH THIS whenever the PDF is regenerated — a stale fallback makes the deck
// understate its own proof on first paint and in every downloaded copy.
export const FALLBACK_STATS: PitchStats = {
  bills: 16775, days: 104, gmv: 1552321, skus: 6724, customers: 3386, orders: 150,
};

const inr = (n: number) => n.toLocaleString("en-IN");
const gmvLakh = (gmv: number) => `₹${(gmv / 100000).toFixed(1)}L`;
const billsPlus = (n: number) => `${inr(Math.floor(n / 100) * 100)}+`;
const perDay = (bills: number, days: number) =>
  `~${inr(Math.round(bills / Math.max(1, days)))} BILLS A DAY`;

// Two aggregate lines, not three. The card is 130 + lines×60 tall and sits at cy 630 in
// a 900 viewBox; at five lines (430) it overlapped the consumer card above, which ends
// at y 425. Four lines = 370 tall = 20px clear. SKUs moved to the system band.
export const proofRetailerLines = (s: PitchStats): string[] => [
  `${billsPlus(s.bills)} BILLS SINCE APR`,
  perDay(s.bills, s.days),
];
export const proofConsumerLines = (s: PitchStats): string[] => [
  `${inr(s.customers)} CUSTOMERS TRACKED`,
  "KHATA + LOYALTY LIVE",
  `${s.orders} STOREFRONT ORDERS`,
];
// "A BILL EVERY SINGLE DAY" removed 2026-08-09 — it parsed as one bill per day, the
// opposite of the truth, and its intended meaning (zero gap days) was never verifiable.
// The rate lives on the RETAILER chip; the band carries only what the chips don't.
export const proofSystemBand = (s: PitchStats): string =>
  `${gmvLakh(s.gmv)} GMV PROCESSED · ${s.days} DAYS LIVE · ${inr(s.skus)} SKUS`;

// Rebuild the Proof section's live numbers into a rendered SectionState.
// No-op for every other section (keyed on the Proof eyebrow).
// Live bills are appended to the RETAILER card rather than floated as a separate
// overlay. The transaction has to arrive somewhere, and the retailer's counter is where
// it is written — a feed pinned to a screen corner reads as a widget, the same rows
// inside the card wired to that node read as transactions landing at the store.
//
// Two rows only: the card is 130 + lines×60 tall and the retailer sits at cy 630 in a
// 900 viewBox, so five lines is the ceiling before it runs off the board.
const RECENT_ROWS = 2;

const billLine = (b: RecentBill): string => {
  const amt = `₹${Math.round(b.amount).toLocaleString("en-IN")}`;
  const t = new Date(b.billed_at).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
  return `${amt} · ${b.item_count} ITEM${b.item_count === 1 ? "" : "S"} · ${t}`;
};

export function withLiveProof(
  state: SectionState,
  stats: PitchStats,
  bills: RecentBill[] = [],
): SectionState {
  if (state.eyebrow !== "05 · REALITY") return state;
  const recent = bills.slice(0, RECENT_ROWS).map(billLine);
  return {
    ...state,
    contentChips: state.contentChips.map((c) =>
      c.peripheral === "retailer"
        ? {
            ...c,
            lines: [...proofRetailerLines(stats), ...recent],
            accentFrom: recent.length > 0 ? proofRetailerLines(stats).length : undefined,
          }
        : c.peripheral === "consumer"
          ? { ...c, lines: proofConsumerLines(stats) }
          : c,
    ),
    systemBand: proofSystemBand(stats),
  };
}

// `revalidate` (seconds) is for the SERVER pull in app/page.tsx, so first paint is
// already fresh instead of showing FALLBACK_STATS until the client mounts. Omit it
// on the client, where no-store gives a live read on every page load.
export async function fetchPitchStats(opts?: { revalidate?: number }): Promise<PitchStats> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/pitch_banjara_stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: "{}",
      ...(opts?.revalidate === undefined
        ? { cache: "no-store" as const }
        : { next: { revalidate: opts.revalidate } }),
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

// usePitchStats moved to ./usePitchStats — see the note at the top of this file.
