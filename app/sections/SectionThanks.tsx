import { MarCatLogo } from "@/components/MarCatLogo";
import { SectionContainer, SectionEyebrow } from "@/components/SectionShell";

export function SectionThanks() {
  return (
    <SectionContainer>
      <div className="flex flex-col items-center text-center w-full max-w-3xl">
        <SectionEyebrow number="12" label="Close" />

        <h2 className="text-ink text-[40px] md:text-[56px] font-medium leading-[1.05] tracking-tight mt-2">
          Thank you.
        </h2>

        <div className="mt-12 mb-8">
          <MarCatLogo size="hero" />
        </div>

        {/* Contact ribbon */}
        <div className="w-full max-w-2xl border-t border-line pt-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <div className="text-[16px] font-bold text-ink">Swarbhanu Gupta</div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-marcat-orange uppercase mt-1">Founder &amp; CEO</div>
            <div className="text-[12px] text-ink-body mt-3">swarbhanu@marcat.in</div>
            <div className="text-[12px] text-ink-muted">+91 XXXXX XXXXX</div>
          </div>
          <div>
            <div className="text-[16px] font-bold text-ink">Divya Pandya</div>
            <div className="font-mono text-[10px] tracking-[0.22em] text-marcat-orange uppercase mt-1">Co-founder &amp; Ops</div>
            <div className="text-[12px] text-ink-body mt-3">divya@marcat.in</div>
            <div className="text-[12px] text-ink-muted">+91 XXXXX XXXXX</div>
          </div>
        </div>

        <div className="mt-12 font-mono text-[11px] tracking-[0.28em] text-marcat-orange uppercase font-semibold">
          pitch.marcat.in
        </div>
        <div className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase mt-2">
          Live at Banjara since 2026-04-27
        </div>

        {/* Q&A invite */}
        <div className="mt-12 text-[14px] text-ink font-medium">Happy to take questions.</div>
      </div>
    </SectionContainer>
  );
}
