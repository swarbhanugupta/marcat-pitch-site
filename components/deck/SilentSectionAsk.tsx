"use client";

export function SilentSectionAsk() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pointer-events-none select-none">
      <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted mb-2">
        13 · ASK
      </div>
      <h1 className="font-sans font-semibold text-[32px] md:text-[36px] leading-[1.05] tracking-[-0.02em] text-ink-strong mb-2">
        The ask.
      </h1>
      <div className="font-mono text-[13px] md:text-[15px] text-ink-body mb-7">
        Pre-seed · SAFE · 18&ndash;24-month runway
      </div>

      <div className="flex flex-row gap-12 items-start">
        <div className="text-center">
          <div className="font-mono text-[32px] md:text-[44px] font-bold tracking-tight text-ink-strong leading-none">
            ₹75 LAKH
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange mt-2">
            TARGET
          </div>
        </div>

        <div className="text-center">
          <div className="font-mono text-[32px] md:text-[44px] font-bold tracking-tight text-ink-strong leading-none">
            ₹1 CRORE
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange mt-2">
            STRETCH · ₹7 Cr CAP
          </div>
        </div>
      </div>

      {/* Milestone + use of funds */}
      <div className="mt-8 max-w-[780px] w-full">
        <div className="border-t border-line pt-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2 text-center">
            MILESTONE: REPEATABLE PAID RETAILER ACQUISITION · SELL-OUT LOOP LIVE · EARLY MONETIZATION
          </div>
          <div className="grid grid-cols-3 gap-4 text-center font-mono text-[11px]">
            <div>
              <div className="text-ink-strong font-semibold">ENGINEERING</div>
              <div className="text-ink-muted mt-1">sell-out loop + reliability</div>
            </div>
            <div>
              <div className="text-ink-strong font-semibold">FIELD GTM</div>
              <div className="text-ink-muted mt-1">repeatable acquisition</div>
            </div>
            <div>
              <div className="text-ink-strong font-semibold">CUSTOMER SUCCESS</div>
              <div className="text-ink-muted mt-1">onboard + convert to paid</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-[660px] text-center">
        <p className="text-[13px] md:text-[15px] text-ink-body italic leading-relaxed">
          Self-sufficient raise — grants treated as upside, not counted.<br />
          Already live at the lab; this funds repeatable retailer adoption.
        </p>
      </div>
    </div>
  );
}
