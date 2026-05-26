import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const phases = [
  {
    phase: "Phase 1",
    period: "Mo 0-6",
    headline: "Customer #2-5 via founder walks + Yom Computer",
    goal: "5 paying stores · ₹75K ARR",
    state: "ACTIVE",
  },
  {
    phase: "Phase 2",
    period: "Mo 6-12",
    headline: "380015 saturation via FMCG salesman warm-channel",
    goal: "50 paying stores · ₹7.5L ARR",
    state: "NEXT",
  },
  {
    phase: "Phase 3",
    period: "Mo 12-18",
    headline: "First brand pilot · ₹2-4L/city/quarter",
    goal: "Brand monetization validated",
    state: "PLANNED",
  },
  {
    phase: "Phase 4",
    period: "Mo 18-24",
    headline: "First distributor onboarded · 2nd-3rd pin-code density",
    goal: "Cross-layer graph materialises",
    state: "PLANNED",
  },
];

const channels = [
  { stakeholder: "Retailer", primary: "Founder-led walks (380015) · FMCG salesman channel", secondary: "Yom Computer reseller · word-of-mouth" },
  { stakeholder: "Brand", primary: "Founder-led sales (Bizom/Happay/HUL/Britannia network)", secondary: "Sell-out demo · anchor pilot motion" },
  { stakeholder: "Distributor", primary: "Retailer-pull (50+ stores ask for distributor onboarding)", secondary: "Direct founder sales · brand-pull · free Marg/Tally migration" },
  { stakeholder: "Customer", primary: "Walk-in conversion · QR code in store", secondary: "WhatsApp campaigns from retailer · network effect" },
];

export function SectionGTM() {
  return (
    <SectionContainer>
      <SectionHeader
        number="09"
        label="Go-to-Market"
        headline="Density first. Brands second. Distributors third. Customers throughout."
        subhead="Each phase's density unlocks the next phase's monetisation."
      />

      {/* Phased timeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full mb-16">
        {phases.map((p) => {
          const active = p.state === "ACTIVE";
          return (
            <div
              key={p.phase}
              className={`border rounded-md p-5 ${active ? "border-marcat bg-marcat-soft/30" : "border-line bg-canvas-white"}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${active ? "bg-marcat-orange" : "border border-marcat-orange"}`}
                />
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold">
                  {p.phase}
                </div>
                <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-muted ml-auto">
                  {p.period}
                </div>
              </div>
              <div className="text-[13px] text-ink leading-snug mb-3 font-medium">{p.headline}</div>
              <div className="pt-3 border-t border-line/60">
                <div className="font-mono text-[9px] tracking-[0.18em] text-ink-muted uppercase mb-1">Goal</div>
                <div className="text-[12px] text-marcat-orange font-medium leading-snug">{p.goal}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Acquisition channels */}
      <div className="w-full max-w-5xl">
        <div className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase mb-6 text-center">
          Acquisition channels by node
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channels.map((c) => (
            <div key={c.stakeholder} className="border border-line rounded-md p-5 bg-canvas-white">
              <div className="font-mono text-[10px] tracking-[0.22em] text-ink uppercase font-semibold mb-3">
                {c.stakeholder}
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 text-[12px]">
                  <span className="text-marcat-orange shrink-0">★</span>
                  <span className="text-ink-body">{c.primary}</span>
                </div>
                <div className="flex gap-2 text-[12px]">
                  <span className="text-ink-muted shrink-0">·</span>
                  <span className="text-ink-muted">{c.secondary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionBand>
        <span>The ask is the runway for Phases 1-3</span>
        <span className="text-ink-muted/30">·</span>
        <span>By Phase 4 the network compounds independently</span>
      </SectionBand>
    </SectionContainer>
  );
}
