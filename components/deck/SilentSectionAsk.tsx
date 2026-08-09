"use client";

export function SilentSectionAsk() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 pointer-events-none select-none">
      <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted mb-2">
        13 · ASK
      </div>
      <h1 className="font-sans font-semibold text-[32px] md:text-[36px] leading-[1.05] tracking-[-0.02em] text-ink-strong mb-2">
        ₹75L to prove MarCat can repeat beyond one store.
      </h1>
      <div className="font-sans text-[13px] md:text-[15px] text-ink-body mb-7">
        One store proves the system. Multiple stores prove the model.
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
          {/* "SELL-OUT LOOP LIVE" removed 2026-08-09 — the brand product has no definition
              or price (cut from S07 and S11); funding it as a milestone promises delivery. */}
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1 text-center">
            PROOF TARGET · 15–25 PAYING STORES · AHMEDABAD · 24 MONTHS FROM CLOSE
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-marcat-orange mb-2 text-center">
            VALIDATION ROUND · NOT A REVENUE FORECAST
          </div>
          <div className="grid grid-cols-3 gap-4 text-center font-mono text-[11px]">
            <div>
              <div className="text-ink-strong font-semibold">ENGINEERING</div>
              <div className="text-ink-muted mt-1">repeatable deployment + reliability</div>
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
          Pre-seed SAFE · 18–24 months runway · ₹7 Cr cap
        </p>
      </div>
    </div>
  );
}
