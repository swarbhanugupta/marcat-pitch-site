import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const competitors = [
  {
    stakeholder: "Customer",
    layer: "Quick-commerce + storefront",
    them: ["Blinkit", "Zepto", "Instamart"],
    them_do: "Run their own fleet · dark stores · burn capital · own the customer",
    we_do: "Kirana owns the customer · we ship the software · zero logistics burn",
  },
  {
    stakeholder: "Retailer",
    layer: "POS / billing software",
    them: ["Marg", "Tally", "Vyapar", "Petpooja (restaurants)"],
    them_do: "Desktop POS · single-node · no customer aggregator · no brand data",
    we_do: "Multi-portal · live customer + brand layer · cloud-native · AI-equipped",
  },
  {
    stakeholder: "Distributor",
    layer: "SFA + distribution",
    them: ["Bizom", "Mobisy", "FieldAssist", "Botree"],
    them_do: "Brand-side SFA · enterprise lock-in · no retailer software · no consumer",
    we_do: "Retailer-pull · distributor adopts because retailers already on MarCat",
  },
  {
    stakeholder: "Brand",
    layer: "Retail / sell-out data",
    them: ["NielsenIQ", "Kantar"],
    them_do: "Audit panels · sample-based · 6-8 week lag · ₹50L-3 Cr per brand",
    we_do: "Live POS-level sell-out · billing-time data · accessible mid-market pricing",
  },
];

export function SectionCompetition() {
  return (
    <SectionContainer>
      <SectionHeader
        number="07"
        label="Competition"
        headline="Per-layer leaders. No platform competitor."
        subhead="Every layer has incumbents. None of them play across all four nodes — and none of them own the cross-layer transaction graph."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {competitors.map((c) => (
          <div key={c.stakeholder} className="border border-line rounded-md p-6 bg-canvas-white">
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[10px] tracking-[0.22em] text-ink uppercase font-semibold">
                {c.stakeholder}
              </div>
              <div className="font-mono text-[9px] tracking-[0.18em] text-ink-muted uppercase">{c.layer}</div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {c.them.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-[0.1em] uppercase border border-line rounded-sm px-2 py-1 text-ink-muted bg-canvas-alt"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-3 text-[12px] leading-relaxed">
              <div className="flex gap-2">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink-muted shrink-0 w-12">Them</span>
                <span className="text-ink-body">{c.them_do}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-marcat-orange shrink-0 w-12">Us</span>
                <span className="text-ink-body">{c.we_do}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionBand>
        <span>Nobody plays across all 4 nodes</span>
        <span className="text-ink-muted/30">·</span>
        <span>Nobody owns the cross-layer graph</span>
        <span className="text-ink-muted/30">·</span>
        <span>That's the wedge</span>
      </SectionBand>
    </SectionContainer>
  );
}
