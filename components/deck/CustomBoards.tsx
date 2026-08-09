"use client";

// Board-area replacements for the three sections whose argument is not a
// four-participant structure. Added 2026-08-09: emptying contentChips on S07/S09/S10
// was correct on copy (TAM table, backward-looking benefit chips, asserted moat claims
// all had to go) but left the middle of three consecutive slides carrying nothing.
//
// Plain HTML/Tailwind rather than SVG so the same component serves desktop and mobile.

const Arrow = ({ className = "" }: { className?: string }) => (
  <span className={`font-mono text-marcat-orange select-none ${className}`} aria-hidden>
    →
  </span>
);

/* ── S07 · MARKET ────────────────────────────────────────────────────────────
   Three counts, three different epistemic statuses. 15–25 dominant: it is the
   only one that is a decision rather than an observation.                     */
export function MarketBoard() {
  const Stat = ({
    n,
    label,
    hero = false,
  }: { n: string; label: string; hero?: boolean }) => (
    <div className="flex flex-col items-center text-center px-4">
      <div
        className={`font-sans font-bold tracking-[-0.03em] leading-none tabular-nums ${
          hero ? "text-marcat-orange text-[52px] md:text-[76px]" : "text-ink-strong text-[34px] md:text-[48px]"
        }`}
      >
        {n}
      </div>
      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-ink-muted mt-3 max-w-[190px] leading-relaxed">
        {label}
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-row items-start justify-center gap-4 md:gap-12 flex-wrap">
        <Stat n="66,225" label={"Supermarket-format\nlistings · India"} />
        <Stat n="322" label={"Supermarket-format\nlistings · Ahmedabad"} />
        <Stat n="15–25" label={"Stores to prove\nthe model"} hero />
      </div>
      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-ink-muted border-t border-line pt-3">
        Directory counts · not ICP-qualified
      </div>
    </div>
  );
}

/* ── S09 · GTM ───────────────────────────────────────────────────────────────
   Two tracks, not a funnel: what is running today, and the channel the raise
   tests. "Warm introductions, not reselling" is load-bearing — it is what makes
   the channel survive "what's in it for the salesman?".                       */
export function GtmBoard() {
  const Node = ({
    label,
    state,
  }: { label: string; state: "live" | "next" }) => (
    <div className="border border-line bg-canvas-white px-4 py-3 text-center min-w-[150px]">
      <div className="font-sans font-semibold text-[14px] md:text-[16px] text-ink-strong leading-tight">
        {label}
      </div>
      <div
        className={`font-mono text-[9px] uppercase tracking-[0.2em] mt-1.5 ${
          state === "live" ? "text-marcat-orange" : "text-ink-muted"
        }`}
      >
        {state === "live" ? "🟢 live" : "🔵 next"}
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-5 px-6">
      <div className="flex flex-row items-center justify-center gap-3 md:gap-4 flex-wrap">
        <Node label="Banjara" state="live" />
        <Arrow />
        <Node label="Founder-led" state="next" />
        <Arrow />
        <Node label="5 stores" state="next" />
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        then the channel the raise tests
      </div>

      <div className="flex flex-row items-center justify-center gap-3 md:gap-4 flex-wrap">
        <Node label={"Distributor relationships\n· salesman beats"} state="next" />
        <Arrow />
        <div className="border border-dashed border-marcat-orange bg-marcat-soft px-4 py-3 text-center max-w-[260px]">
          <div className="font-sans font-semibold text-[14px] md:text-[15px] text-ink-strong leading-tight">
            Warm introductions
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted mt-1.5">
            not reselling
          </div>
        </div>
        <Arrow />
        <Node label={"15–25 paid\nAhmedabad · 18–24 mo"} state="next" />
      </div>
    </div>
  );
}

/* ── S10 · MOAT ──────────────────────────────────────────────────────────────
   The mechanism, drawn as a closed cycle. Deliberately carries NO 🟢/🔵 markers:
   marking a mechanism as live would turn it from an argument into a claim.     */
export function FlywheelBoard() {
  const STEPS = [
    "More participating stores",
    "More transaction signal",
    "Truer demand",
    "Better replenishment",
    "More valuable sell-out",
    "More reasons to connect",
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-6">
      {/* Fixed-width nodes + nowrap on desktop: auto-sizing let five land on one row
          and orphaned the sixth under an arrow pointing at nothing. */}
      <div className="flex flex-row items-stretch justify-center gap-1.5 flex-wrap md:flex-nowrap max-w-[1120px]">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-row items-center gap-1.5">
            <div className="border border-line bg-canvas-white px-2.5 py-2.5 text-center w-[140px] md:w-[152px] shrink-0 flex items-center justify-center min-h-[62px]">
              <div className="font-sans font-semibold text-[12px] md:text-[13.5px] text-ink-strong leading-tight">
                {s}
              </div>
            </div>
            {i < STEPS.length - 1 && <Arrow className="text-[14px] shrink-0" />}
          </div>
        ))}
      </div>

      {/* The return leg. Without it this is a value chain that terminates —
          and the compounding argument lives entirely in the step back. */}
      <div className="mt-5 flex flex-row items-center gap-3 border-t border-marcat-orange/40 pt-3 px-8">
        <span className="font-mono text-marcat-orange text-[15px] select-none" aria-hidden>
          ↺
        </span>
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-ink-muted">
          each cycle starts from more stores than the last
        </span>
      </div>
    </div>
  );
}
