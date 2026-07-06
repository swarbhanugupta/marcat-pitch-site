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
        ₹1.2 crore pre-seed · 24-month runway
      </div>

      <div className="flex flex-row gap-12 items-start">
        <div className="text-center">
          <div className="font-mono text-[32px] md:text-[44px] font-bold tracking-tight text-ink-strong leading-none">
            ₹20 LAKH
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange mt-2">
            SISFS GRANT · NON-DILUTIVE
          </div>
        </div>

        <div className="text-center">
          <div className="font-mono text-[32px] md:text-[44px] font-bold tracking-tight text-ink-strong leading-none">
            ₹1 CRORE
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange mt-2">
            SAFE · ₹9–10 Cr CAP
          </div>
        </div>
      </div>

      {/* Use of funds — 24-month runway to the seed-unlock milestone */}
      <div className="mt-8 max-w-[720px] w-full">
        <div className="border-t border-line pt-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2 text-center">
            MILESTONE: SELL-OUT LOOP LIVE ON REAL DATA · 30–40 PAYING STORES · FIRST BRAND PILOT
          </div>
          <div className="grid grid-cols-3 gap-4 text-center font-mono text-[11px]">
            <div>
              <div className="text-ink-strong font-semibold">TEAM</div>
              <div className="text-ink-muted mt-1">1 eng + 2 field reps</div>
            </div>
            <div>
              <div className="text-ink-strong font-semibold">GTM</div>
              <div className="text-ink-muted mt-1">founder-led field</div>
            </div>
            <div>
              <div className="text-ink-strong font-semibold">CLOUD + AI + OPS</div>
              <div className="text-ink-muted mt-1">24 months</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-[620px] text-center">
        <p className="text-[13px] md:text-[15px] text-ink-body italic leading-relaxed">
          Already live at the supermarket lab since 27 April 2026.<br />
          This funds the network&rsquo;s first real edge — not survival.
        </p>
      </div>
    </div>
  );
}
