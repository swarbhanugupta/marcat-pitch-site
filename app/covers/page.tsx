import { PersistentChipBoard } from "@/components/chipboard/PersistentChipBoard";
import { DEFAULT_BOARD_STATE } from "@/lib/tokens";
import type { ChipName, ChipState } from "@/lib/tokens";

// 5 gallery covers — reference concepts (foundation · network · retailer · flow ·
// future), rendered in pitch.marcat.in's light / ink / orange / chip language.
// Each card is 1200×675 (16:9); render and screenshot each #cover-N.

const allLive: Record<ChipName, ChipState> = {
  marcat: "live", brand: "live", consumer: "live", supplier: "live", retailer: "live",
};

const CARD = "cover w-[1200px] h-[675px] overflow-hidden bg-canvas-white shrink-0 flex flex-col";
const H = "font-sans font-semibold tracking-[-0.02em] text-ink-strong leading-[1.06]";

function Shell({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <section id={`cover-${n}`} className={CARD}>
      <div className="flex items-center justify-between px-14 pt-10">
        <div className="font-mono text-[12px] uppercase tracking-[0.26em] text-marcat-orange">{label}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/marcat-logo.png" alt="MarCat" className="h-7 w-auto" />
      </div>
      <div className="flex-1 min-h-0">{children}</div>
      <div className="px-14 pb-8">
        <div className="border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
          Retailers · Distributors · Brands · Consumers
        </div>
      </div>
    </section>
  );
}

function Board({ vb, states = DEFAULT_BOARD_STATE, w }: { vb: string; states?: Record<ChipName, ChipState>; w: string }) {
  const [, , vbW, vbH] = vb.split(" ");
  return (
    <div className={w} style={{ aspectRatio: `${vbW} / ${vbH}` }}>
      <PersistentChipBoard chipStates={states} tubeMode="flowing" showMarcatLogo viewBoxOverride={vb} />
    </div>
  );
}

// Chip pin row/column (short legs protruding from a chip edge).
function Pins({ pos }: { pos: "top" | "bottom" | "left" | "right" }) {
  const horiz = pos === "top" || pos === "bottom";
  const place =
    pos === "top" ? "left-1/2 -translate-x-1/2 -top-[13px]" :
    pos === "bottom" ? "left-1/2 -translate-x-1/2 -bottom-[13px]" :
    pos === "left" ? "top-1/2 -translate-y-1/2 -left-[13px]" :
    "top-1/2 -translate-y-1/2 -right-[13px]";
  return (
    <div className={`absolute flex ${horiz ? "flex-row" : "flex-col"} gap-[8px] ${place}`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className={`rounded-full bg-ink-mute/40 ${horiz ? "w-[3px] h-3" : "w-3 h-[3px]"}`} />
      ))}
    </div>
  );
}

// Standalone, self-contained MarCat chip — complete in itself, no dangling
// traces, so it can never look cropped (the root-cause fix for cover 1).
function ChipGraphic() {
  return (
    <div className="relative">
      <div className="absolute -inset-28 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #FFF1E6 0%, transparent 64%)" }} />
      <div className="relative w-[300px] h-[300px] rounded-[30px] bg-white border-[2.5px] border-marcat-orange flex items-center justify-center shadow-[0_28px_80px_rgba(255,110,30,0.20)]">
        <span className="absolute top-[18px] left-[18px] h-2.5 w-2.5 rounded-full bg-marcat-orange" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/marcat-logo.png" alt="MarCat" className="h-11 w-auto" />
        <Pins pos="top" />
        <Pins pos="bottom" />
        <Pins pos="left" />
        <Pins pos="right" />
      </div>
    </div>
  );
}

export default function Covers() {
  return (
    <main className="flex flex-col items-center gap-8 bg-[#e9e9e9] py-8">
      {/* 1 · FOUNDATION ─────────────────────────────────────────────── */}
      <Shell n={1} label="01 — The intelligence layer">
        <div className="grid grid-cols-[1.05fr_0.95fr] h-full">
          <div className="flex flex-col justify-center pl-14 pr-4">
            <h1 className={H + " text-[46px]"}>
              One commercial event.<br />
              <span className="text-marcat-orange">Infinite possibilities.</span>
            </h1>
            <p className="mt-6 max-w-[34ch] font-sans text-[18px] text-ink-body leading-relaxed">
              MarCat is the commercial intelligence layer powering India&rsquo;s FMCG ecosystem.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <ChipGraphic />
          </div>
        </div>
      </Shell>

      {/* 2 · NETWORK ────────────────────────────────────────────────── */}
      <Shell n={2} label="02 — The connected ecosystem">
        <div className="grid grid-cols-[0.9fr_1.1fr] h-full items-center">
          <div className="flex flex-col justify-center pl-14 pr-2">
            <h1 className={H + " text-[40px]"}>Connecting every link in the FMCG chain.</h1>
            <p className="mt-6 max-w-[32ch] font-sans text-[18px] text-ink-body leading-relaxed">
              Retailers, distributors, brands and consumers on one shared commercial network.
            </p>
          </div>
          <div className="flex items-center justify-center pr-8">
            <Board vb="430 170 1140 600" w="w-[520px]" />
          </div>
        </div>
      </Shell>

      {/* 3 · RETAILER AT THE CENTER ─────────────────────────────────── */}
      <Shell n={3} label="03 — The retailer at the center">
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col justify-center pl-14 pr-8">
            <h1 className={H + " text-[42px]"}>
              Your store.<br />
              <span className="text-marcat-orange">The center of commercial intelligence.</span>
            </h1>
            <p className="mt-6 max-w-[32ch] font-sans text-[18px] text-ink-body leading-relaxed">
              Every sale becomes a shared signal the whole chain can act on.
            </p>
          </div>
          <div className="relative h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/storefront.jpg" alt="Banjara Supermarket" className="w-full h-full object-cover" />
          </div>
        </div>
      </Shell>

      {/* 4 · THE TRANSACTION FLOW ───────────────────────────────────── */}
      <Shell n={4} label="04 — The daily transaction flow">
        <div className="flex flex-col justify-center h-full px-14">
          <h1 className={H + " text-[40px] max-w-[20ch]"}>
            From a sale at your counter to insights across the chain.
          </h1>
          <div className="mt-14 flex items-center">
            {["Sale", "Inventory", "Demand", "Sell-out", "Loyalty"].map((s, i, a) => (
              <div key={s} className="flex items-center">
                <div className="rounded-xl bg-[#0A0A12] text-white px-6 py-4 font-mono text-[13px] uppercase tracking-[0.12em]">
                  {s}
                </div>
                {i < a.length - 1 && (
                  <div className="flex items-center mx-2" aria-hidden>
                    <div className="h-px w-8 bg-marcat-orange" />
                    <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-marcat-orange" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-10 font-sans text-[18px] text-ink-body">
            One record. Read by everyone it touches — instantly.
          </p>
        </div>
      </Shell>

      {/* 5 · THE FUTURE ─────────────────────────────────────────────── */}
      <Shell n={5} label="05 — The future">
        <div className="relative flex flex-col justify-center items-center text-center h-full px-16">
          <div className="absolute inset-0 opacity-[0.06] flex items-center justify-center pointer-events-none">
            <Board vb="430 170 1140 600" states={allLive} w="w-[720px]" />
          </div>
          <h1 className={H + " relative text-[46px] max-w-[17ch]"}>
            Building the commercial infrastructure for{" "}
            <span className="text-marcat-orange">Bharat</span> and beyond.
          </h1>
          <p className="relative mt-7 font-sans text-[20px] text-ink-body">
            Start with the kirana. Connect the chain. Rewire Indian trade.
          </p>
        </div>
      </Shell>
    </main>
  );
}
