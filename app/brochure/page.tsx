import type { Metadata } from "next";
import { PersistentChipBoard } from "@/components/chipboard/PersistentChipBoard";
import { PrintButton } from "@/components/brochure/PrintButton";
import { DEFAULT_BOARD_STATE } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "MarCat — From running one store to rewiring an entire industry",
  description:
    "The commercial intelligence layer for Indian FMCG. Built and proven inside a live supermarket.",
};

// ─────────────────────────────────────────────────────────────────────────
// Product brief / "chapter one" — a conviction document, not a feature sheet.
// Same design DNA as pitch.marcat.in. Every section centers a fixed-width
// content column (balanced margins, no left-hugging). One idea per screen.
// ─────────────────────────────────────────────────────────────────────────

const SECTION =
  "relative min-h-screen w-full flex flex-col justify-center items-center px-8 py-24 md:py-28 " +
  "border-b border-line";
const WRAP = "w-full max-w-[960px]";
const EYEBROW =
  "font-mono text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-marcat-orange mb-6";
const H = "font-sans font-semibold tracking-[-0.02em] text-ink-strong leading-[1.05]";

// Print stylesheet — screen uses full-viewport centered sections; print must NOT.
// Without this, min-h-screen (100vh) + md:py-28 + justify-center make every
// section float in the middle of an oversized page and spill blank pages.
const PRINT_CSS = `
@media print {
  @page { margin: 0; }
  html, body { background: #fff !important; }
  .brochure section {
    min-height: 0 !important;
    padding-top: 1.25rem !important;
    padding-bottom: 1.25rem !important;
    justify-content: flex-start !important;
    border: 0 !important;
  }
  /* keep each screenshot / image whole; sections flow freely (no per-section pages) */
  .brochure figure, .brochure img { break-inside: avoid; page-break-inside: avoid; }
}
`;

// Browser-chrome frame for a real app screenshot.
function Shot({ src, label }: { src: string; label: string }) {
  return (
    <figure className="w-full">
      <div className="rounded-xl border border-line overflow-hidden bg-canvas-white shadow-[0_12px_44px_rgba(0,0,0,0.07)]">
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-line bg-canvas-soft">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="w-full aspect-[16/10] object-cover object-top" />
      </div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute text-center">
        {label}
      </figcaption>
    </figure>
  );
}

export default function Brochure() {
  return (
    <main className="brochure w-full bg-canvas-white">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      <PrintButton />

      {/* ── COVER ────────────────────────────────────────────────────── */}
      <section className={SECTION}>
        {/* Backing logos — cover top-right (letterhead) */}
        <div className="absolute top-7 right-7 md:top-10 md:right-14 flex items-center gap-6 md:gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gtu.png" alt="GTU Ventures" className="h-16 md:h-[84px] w-auto object-contain" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dpiit.jpg" alt="DPIIT · Startup India" className="h-16 md:h-[84px] w-auto object-contain" />
        </div>

        <div className={WRAP + " flex flex-col items-center text-center"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marcat-logo.png" alt="MarCat" className="h-10 md:h-12 w-auto mb-14" />
          <h1 className={H + " text-[40px] md:text-[70px] max-w-[15ch]"}>
            From running one store to rewiring an entire industry.
          </h1>
          <div className="mt-12 flex items-center gap-3 font-mono text-[11px] md:text-[13px] uppercase tracking-[0.24em] text-ink-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-marcat-orange" />
            The commercial intelligence layer for Indian FMCG
            <span className="h-1.5 w-1.5 rounded-full bg-marcat-orange" />
          </div>
        </div>
      </section>

      {/* ── 01 · FOUNDER-MARKET FIT (two-column) ────────────────────── */}
      <section className={SECTION}>
        <div className={WRAP + " grid md:grid-cols-2 gap-12 md:gap-16 items-center"}>
          <div>
            <div className={EYEBROW}>Founder</div>
            <h2 className={H + " text-[30px] md:text-[46px]"}>
              I run a supermarket. I built the software it runs on.
            </h2>
            <div className="mt-8 font-mono text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-ink-mute">
              Live every day inside Banjara Supermarket.
            </div>
          </div>
          <div className="w-full aspect-square rounded-3xl border border-line overflow-hidden bg-canvas-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/storefront.jpg"
              alt="Banjara Supermarket storefront"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 02 · THE PROBLEM (two-column) ───────────────────────────── */}
      <section className={SECTION}>
        <div className={WRAP + " grid md:grid-cols-2 gap-14 md:gap-20 items-center"}>
          <div>
            <div className={EYEBROW}>Four versions of one truth</div>
            <h2 className={H + " text-[26px] md:text-[38px]"}>
              Every day, I watched the same transaction get recreated four times.
            </h2>
            <div className="mt-10 space-y-3 font-sans text-[17px] md:text-[20px] text-ink-body leading-snug">
              <p>A customer buys a packet of biscuits.</p>
              <p>My inventory changes.</p>
              <p className="text-ink-mute">My distributor doesn&rsquo;t know.</p>
              <p className="text-ink-mute">The brand doesn&rsquo;t know.</p>
              <p className="text-ink-mute">My purchase book updates hours later.</p>
              <p className="text-ink-mute">Someone, somewhere, places the next order by hand.</p>
            </div>
          </div>

          <div className="md:border-l md:border-line md:pl-16">
            <p className="font-sans text-[19px] md:text-[24px] text-ink-strong leading-snug">
              Everyone is working from a different version of the same commercial event.
            </p>
            <p className="mt-10 font-sans font-semibold text-[24px] md:text-[34px] text-ink-strong leading-[1.15] tracking-[-0.02em]">
              I didn&rsquo;t need better software. The industry needed{" "}
              <span className="text-marcat-orange">shared commercial intelligence.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 03 · WHAT MARCAT IS (the real animated board) ───────────── */}
      <section className={SECTION}>
        <div className={WRAP + " flex flex-col items-center text-center"}>
          <div className={EYEBROW}>One shared reality</div>

          <div className="w-full max-w-[720px]" style={{ aspectRatio: "1140 / 720" }}>
            <PersistentChipBoard
              chipStates={DEFAULT_BOARD_STATE}
              tubeMode="flowing"
              showMarcatLogo
              viewBoxOverride="430 110 1140 720"
            />
          </div>

          <p className="mt-9 max-w-[760px] font-sans text-[18px] md:text-[22px] text-ink-body leading-relaxed">
            MarCat is the commercial operating layer that records every retail transaction{" "}
            <span className="text-ink-strong">once</span> — and makes that intelligence available to
            everyone it touches: retailer, distributor, brand, consumer.
          </p>
          <p className="mt-9 font-mono text-[12px] md:text-[14px] uppercase tracking-[0.24em] text-ink-mute">
            One commercial event · Multiple stakeholders · Shared intelligence
          </p>
          <p className={H + " mt-8 text-[24px] md:text-[38px] max-w-[20ch]"}>
            MarCat doesn&rsquo;t replace existing businesses. It connects them.
          </p>
        </div>
      </section>

      {/* ── 04 · THE PRODUCT ────────────────────────────────────────── */}
      <section className={SECTION}>
        <div className={WRAP + " flex flex-col items-center text-center"}>
          <div className={EYEBROW}>The interfaces</div>
          <h2 className={H + " text-[30px] md:text-[46px] max-w-[18ch]"}>
            One system. Every interface a store already needs.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full">
            <Shot src="/app-pos.jpg" label="Point of sale · GST billing" />
            <Shot src="/app-inventory.jpg" label="Inventory · 6,614 live SKUs" />
            <Shot src="/app-dashboard.jpg" label="Real-time analytics" />
            <Shot src="/app-copilot.jpg" label="AI copilot" />
          </div>

          {/* Consumer node — a branded storefront for every store */}
          <div className="mt-8 md:mt-10 w-full max-w-[680px]">
            <Shot src="/app-shop.jpg" label="Customer storefront · a branded shop for every store" />
          </div>

          <div className="mt-12 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-ink-mute">
            Billing · Inventory · Purchase · CRM · Loyalty · Analytics · AI · Storefront
          </div>

          <p className="mt-10 max-w-[640px] font-sans text-[19px] md:text-[24px] text-ink-strong leading-snug tracking-[-0.01em]">
            These are simply the interfaces through which the commercial network is created.
          </p>
        </div>
      </section>

      {/* ── 05 · WHY RETAIL FIRST (two-column) ──────────────────────── */}
      <section className={SECTION}>
        <div className={WRAP + " grid md:grid-cols-2 gap-14 md:gap-20 items-center"}>
          <div>
            <div className={EYEBROW}>Where demand begins</div>
            <h2 className={H + " text-[30px] md:text-[46px]"}>
              Demand is where the network begins.
            </h2>
            <p className="mt-8 font-sans text-[17px] md:text-[20px] text-ink-body leading-relaxed">
              Retailers are where demand originates. Every commercial event begins at the shelf — which
              makes retail the natural entry point for a shared commercial network.
            </p>
            <p className="mt-8 font-sans font-semibold text-[22px] md:text-[30px] text-ink-strong tracking-[-0.02em]">
              So we start at the shelf.
            </p>
          </div>

          <div>
            {[
              "Retailers generate demand",
              "Demand creates replenishment",
              "Replenishment creates distribution",
              "Distribution creates brand intelligence",
            ].map((step, i, arr) => (
              <div key={step}>
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[13px] text-marcat-orange">{`0${i + 1}`}</span>
                  <span className="font-sans text-[19px] md:text-[26px] text-ink-strong tracking-[-0.01em]">
                    {step}
                  </span>
                </div>
                {i < arr.length - 1 && <div className="ml-[6px] my-2 h-6 w-px bg-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 · PROOF (the moat) ───────────────────────────────────── */}
      <section className={SECTION}>
        <div className={WRAP + " flex flex-col items-center text-center"}>
          <div className={EYEBROW}>Proven in production</div>
          <h2 className={H + " text-[32px] md:text-[52px] max-w-[16ch]"}>
            Built inside a live supermarket.
          </h2>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 w-full">
            {[
              ["11,200+", "bills since 27 April"],
              ["~160", "bills a day, every day"],
              ["6,614", "SKUs live"],
              ["3,372", "customers"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-sans font-semibold text-[38px] md:text-[60px] text-ink-strong leading-none tracking-[-0.03em]">
                  {n}
                </div>
                <div className="mt-3 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-ink-mute">
                  {l}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-16 max-w-[720px] font-sans text-[18px] md:text-[22px] text-ink-body leading-relaxed">
            Not a pilot. A real store billing <span className="text-ink-strong">every single day</span> since
            27 April 2026 — founder-operated, iterated daily, on real customers and real transactions.
          </p>
        </div>
      </section>

      {/* ── 07 · THE BELIEF ─────────────────────────────────────────── */}
      <section className={SECTION}>
        <div className={WRAP + " flex flex-col items-center text-center"}>
          <div className={EYEBROW}>The belief</div>
          <h2 className={H + " text-[34px] md:text-[56px] max-w-[18ch]"}>
            Every commercial event should happen once. Every participant should benefit from it.
          </h2>
          <p className="mt-12 max-w-[24ch] font-sans font-semibold text-[22px] md:text-[32px] text-ink-strong tracking-[-0.02em] leading-[1.2]">
            We believe commercial intelligence should be{" "}
            <span className="text-marcat-orange">shared, not siloed.</span>
          </p>
        </div>
      </section>

      {/* ── 08 · THE CLOSE (emotional) ──────────────────────────────── */}
      <section className={SECTION}>
        <div className={WRAP + " flex flex-col items-center text-center"}>
          <div className="space-y-2 font-sans font-semibold text-[24px] md:text-[38px] text-ink-strong leading-[1.25] tracking-[-0.02em]">
            <p>Every retailer deserves better decisions.</p>
            <p>Every distributor deserves better visibility.</p>
            <p>Every brand deserves better demand intelligence.</p>
          </div>
          <p className="mt-12 max-w-[34ch] font-sans text-[19px] md:text-[24px] text-ink-mute leading-relaxed">
            We&rsquo;re building the commercial infrastructure that makes all three possible.
          </p>

          <div className="mt-24 flex flex-col items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marcat-logo.png" alt="MarCat" className="h-9 w-auto" />
            <div className="font-mono text-[12px] uppercase tracking-[0.24em] text-ink-mute">marcat.in</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute/70">
              Incubated at GTU Ventures · Recognised by DPIIT — Startup India
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
