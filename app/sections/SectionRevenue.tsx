import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const streams = [
  {
    label: "Retailer SaaS",
    status: "LIVE",
    price: "₹15K / PC / year",
    detail:
      "Free Mobile tier (1 slot) · Paid Pro tier ₹15K per PC per year, volume discount, +2 mobile slots. LTV/CAC 26:1. 86% gross margin.",
    activation: "Today",
  },
  {
    label: "Brand pilots",
    status: "ACTIVATES Y2-Y3",
    price: "₹2-4L / city / quarter",
    detail:
      "Sell-out feed + scheme reconciliation + demand signal. NielsenIQ ships 6-8 weeks late — we ship at billing-time. Bizom shape, modern stack.",
    activation: "After 380015 + Mumbai/BLR pin-code wedges",
  },
  {
    label: "Distributor SaaS",
    status: "ACTIVATES Y2",
    price: "Pricing TBD",
    detail:
      "Pulled in by retailers already on MarCat. Cheapest CAC. Beat SFA + warehouse + ledger. Built; awaiting first customer.",
    activation: "After 20+ paid retailer stores ask for distributor onboarding",
  },
];

export function SectionRevenue() {
  return (
    <SectionContainer>
      <SectionHeader
        number="06"
        label="Revenue Streams"
        headline="Three streams. One platform. Sequenced by density."
        subhead="Density unlocks monetisation. Each layer activates when the previous reaches its threshold."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {streams.map((s) => (
          <div key={s.label} className="border border-line rounded-md p-6 bg-canvas-white flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[10px] tracking-[0.22em] text-ink uppercase font-semibold">
                {s.label}
              </div>
              <div
                className={`font-mono text-[9px] tracking-[0.18em] uppercase ${
                  s.status === "LIVE" ? "text-marcat-orange" : "text-ink-muted"
                }`}
              >
                {s.status}
              </div>
            </div>
            <div className="text-2xl font-bold text-ink mb-3 tabular-nums">{s.price}</div>
            <p className="text-[13px] text-ink-body leading-relaxed mb-4 flex-1">{s.detail}</p>
            <div className="pt-3 border-t border-line/60">
              <div className="font-mono text-[9px] tracking-[0.18em] text-ink-muted uppercase">Activation</div>
              <div className="text-xs text-ink-body mt-1">{s.activation}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionBand>
        <span>Retailer pays for software</span>
        <span className="text-ink-muted/30">·</span>
        <span>Brand pays for the data that retailer software generates</span>
        <span className="text-ink-muted/30">·</span>
        <span>Distributor pays to keep up</span>
      </SectionBand>
    </SectionContainer>
  );
}
