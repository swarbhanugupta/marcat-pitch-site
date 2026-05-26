import { HeroChip } from "@/components/HeroChip";

export function SectionHero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-canvas-white px-6 py-12 relative">
      <div className="w-full max-w-[1280px] flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="font-mono text-[11px] tracking-[0.28em] text-ink-muted mb-6 uppercase">
          01 · MarCat
        </div>

        {/* Headline */}
        <h1 className="text-[28px] md:text-[40px] font-bold text-ink leading-[1.1] tracking-tight max-w-3xl">
          The connecting layer for organized retail.
        </h1>

        {/* Subhead */}
        <p className="text-[17px] md:text-[19px] font-normal text-ink-muted leading-relaxed pt-4 max-w-2xl">
          Four stakeholders — customer, retailer, distributor, brand — on one
          database, in real time.
        </p>

        {/* The MarCat chip — hero centrepiece, click to power up */}
        <div className="w-full mt-10">
          <HeroChip />
        </div>

        {/* Founder credentials — mono technical strip */}
        <div className="font-mono text-[11px] tracking-[0.18em] text-ink-muted/85 uppercase mt-12 leading-relaxed">
          Swarbhanu Gupta · 8+ yrs FMCG software (Bizom · Happay · Qoruz)
        </div>
        <div className="font-mono text-[11px] tracking-[0.18em] text-ink-muted/85 uppercase mt-1 leading-relaxed">
          Built and runs Banjara · Live in production since 27 April 2026
        </div>

        {/* Footer */}
        <div className="font-mono text-[10px] tracking-[0.25em] text-ink-muted/50 uppercase mt-8">
          Pre-seed · Ahmedabad, India
        </div>
      </div>
    </section>
  );
}
