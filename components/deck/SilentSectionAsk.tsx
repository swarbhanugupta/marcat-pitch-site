"use client";

export function SilentSectionAsk() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pointer-events-none select-none">
      <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted mb-2">
        10 · ASK
      </div>
      <h1 className="font-sans font-semibold text-[32px] md:text-[36px] leading-[1.05] tracking-[-0.02em] text-ink-strong mb-8">
        The ask.
      </h1>

      <div className="flex flex-row gap-12 items-start">
        <div className="text-center">
          <div className="font-mono text-[32px] md:text-[44px] font-bold tracking-tight text-ink-strong leading-none">
            ₹20 LAKH
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange mt-2">
            SISFS GRANT
          </div>
        </div>

        <div className="text-center">
          <div className="font-mono text-[32px] md:text-[44px] font-bold tracking-tight text-ink-strong leading-none">
            ₹50 LAKH
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange mt-2">
            INCUBATOR CONVERTIBLE
          </div>
        </div>
      </div>

      {/* Use of funds — 18-month runway */}
      <div className="mt-8 max-w-[640px] w-full">
        <div className="border-t border-line pt-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2 text-center">
            18-MONTH RUNWAY · MILESTONE: 15 PAYING STORES ACROSS AHMEDABAD
          </div>
          <div className="grid grid-cols-3 gap-4 text-center font-mono text-[11px]">
            <div>
              <div className="text-ink-strong font-semibold">FIELD REP</div>
              <div className="text-ink-muted mt-1">18 months</div>
            </div>
            <div>
              <div className="text-ink-strong font-semibold">ENG HIRE</div>
              <div className="text-ink-muted mt-1">12 months</div>
            </div>
            <div>
              <div className="text-ink-strong font-semibold">CLOUD + OPS</div>
              <div className="text-ink-muted mt-1">18 months</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-[600px] text-center">
        <p className="text-[13px] md:text-[15px] text-ink-body italic leading-relaxed">
          Already live at the supermarket lab since 27 April 2026.<br />
          Funds acceleration, not survival.
        </p>
      </div>
    </div>
  );
}
