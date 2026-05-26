import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const layers = [
  {
    label: "Retailer",
    status: "LIVE",
    tam: "₹2,250 Cr",
    sam: "₹450 Cr",
    som: "₹15-22 Cr",
    note: "Pro tier ₹15K/PC/yr · 1.5M supermarket-class shops",
  },
  {
    label: "Brand HQ",
    status: "BUILT",
    tam: "₹2,000-2,500 Cr",
    sam: "₹600 Cr",
    som: "₹6-10 Cr",
    note: "City pilots ₹2-4L/qtr · NielsenIQ-lag wedge",
  },
  {
    label: "Distributors",
    status: "BUILT",
    tam: "₹800-1,000 Cr",
    sam: "₹250 Cr",
    som: "₹3-6 Cr",
    note: "Retailer-pull motion · cheapest CAC",
  },
  {
    label: "Customer",
    status: "LIVE",
    tam: "Phase 3+",
    sam: "—",
    som: "—",
    note: "Optionality · activates after density",
  },
];

const density = [
  { stage: "Today", value: "1 store · ₹0 SaaS rev" },
  { stage: "18 mo", value: "50 stores · ₹7.5L ARR" },
  { stage: "3 yr", value: "8-10K stores · ₹25-35 Cr ARR" },
  { stage: "5 yr", value: "Top-5 metros · ₹1-1.3K Cr SAM" },
];

export function SectionMarket() {
  return (
    <SectionContainer>
      <SectionHeader
        number="05"
        label="Market"
        headline="Density math, not TAM theatre."
        subhead="The wedge is 380015 Ahmedabad. The compound is the cross-layer graph nobody else owns."
      />

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-line">
              <th className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase py-3 pr-4">Layer</th>
              <th className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase py-3 px-4 text-right">TAM</th>
              <th className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase py-3 px-4 text-right">SAM (5-yr)</th>
              <th className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase py-3 px-4 text-right">SOM (3-yr ARR)</th>
              <th className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase py-3 pl-4">Note</th>
            </tr>
          </thead>
          <tbody>
            {layers.map((l) => (
              <tr key={l.label} className="border-b border-line/60">
                <td className="py-4 pr-4">
                  <div className="text-sm font-medium text-ink">{l.label}</div>
                  <div
                    className={`font-mono text-[9px] tracking-[0.18em] uppercase mt-1 ${
                      l.status === "LIVE" ? "text-marcat-orange" : "text-ink-muted"
                    }`}
                  >
                    {l.status}
                  </div>
                </td>
                <td className="py-4 px-4 text-right font-mono text-sm text-ink-body tabular-nums">{l.tam}</td>
                <td className="py-4 px-4 text-right font-mono text-sm text-ink-body tabular-nums">{l.sam}</td>
                <td className="py-4 px-4 text-right font-mono text-sm text-marcat-orange tabular-nums">{l.som}</td>
                <td className="py-4 pl-4 text-xs text-ink-muted leading-relaxed">{l.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-16 w-full max-w-5xl">
        <div className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase mb-6 text-center">
          Density trajectory
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {density.map((d, i) => (
            <div key={d.stage} className="text-center">
              <div className="font-mono text-[10px] tracking-[0.2em] text-marcat-orange uppercase mb-2">{d.stage}</div>
              <div className="text-sm text-ink-body leading-snug">{d.value}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionBand>
        <span>Cumulative SAM ₹1-1.3K Cr</span>
        <span className="text-ink-muted/30">·</span>
        <span>3-yr SOM ₹25-35 Cr ARR</span>
        <span className="text-ink-muted/30">·</span>
        <span>Bizom raised $12M at ₹70-80 Cr</span>
      </SectionBand>
    </SectionContainer>
  );
}
