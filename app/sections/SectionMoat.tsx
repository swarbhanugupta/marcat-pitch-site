import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const moats = [
  {
    label: "Transaction graph",
    weight: "PRIMARY",
    detail:
      "Every bill, every order, every scheme reconciliation lives on one database, joined across stakeholders. Compounds with each new store. Cannot be retro-fitted by single-node incumbents (Marg can't add a customer aggregator; Bizom can't add POS).",
  },
  {
    label: "Operator credentials",
    weight: "PRIMARY",
    detail:
      "Founder built and runs Banjara supermarket. Software is hardened at the cashier seat. Trust signal nobody from pure-SaaS or pure-VC operator angles can match.",
  },
  {
    label: "FMCG warm channel",
    weight: "PRIMARY",
    detail:
      "10+ FMCG salesmen visit Banjara daily. Formalised as brand-HQ partnerships, this becomes a non-replicable retailer-acquisition motion. ICs at Bizom / Mobisy / Happay relationships compound here.",
  },
  {
    label: "Capital efficiency",
    weight: "SECONDARY",
    detail:
      "No fleet, no dark stores, no payment intermediation, no hardware subsidies. Customer pays for own PC. Y1 LTV/CAC 26:1. Every rupee deploys into onboarding, not infrastructure burn.",
  },
];

const maturity = [
  { phase: "Today", state: "1 store, captive · graph seed" },
  { phase: "Y1", state: "50 stores · graph thickens · brand interest" },
  { phase: "Y2", state: "Brand pilots · cross-layer joins" },
  { phase: "Y3+", state: "Network effects compound" },
];

export function SectionMoat() {
  return (
    <SectionContainer>
      <SectionHeader
        number="08"
        label="Moat"
        headline="The graph compounds."
        subhead="Four moats. Three primary, one supporting. None of them are buildable by a single-node incumbent in 18 months."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {moats.map((m) => (
          <div
            key={m.label}
            className={`border rounded-md p-6 ${
              m.weight === "PRIMARY" ? "border-marcat bg-marcat-soft/30" : "border-line bg-canvas-white"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] tracking-[0.22em] text-ink uppercase font-semibold flex items-center gap-2">
                {m.weight === "PRIMARY" && <span className="text-marcat-orange">★</span>}
                {m.label}
              </div>
              <div
                className={`font-mono text-[9px] tracking-[0.18em] uppercase ${
                  m.weight === "PRIMARY" ? "text-marcat-orange" : "text-ink-muted"
                }`}
              >
                {m.weight}
              </div>
            </div>
            <p className="text-[12.5px] text-ink-body leading-relaxed">{m.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-4xl">
        <div className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase mb-6 text-center">
          Maturity curve
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {maturity.map((m) => (
            <div key={m.phase} className="text-center">
              <div className="font-mono text-[10px] tracking-[0.2em] text-marcat-orange uppercase mb-2">{m.phase}</div>
              <div className="text-xs text-ink-body leading-snug">{m.state}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionBand>
        <span>Petpooja can't add a brand portal</span>
        <span className="text-ink-muted/30">·</span>
        <span>Bizom can't add a customer app</span>
        <span className="text-ink-muted/30">·</span>
        <span>Architecture is the lock-in</span>
      </SectionBand>
    </SectionContainer>
  );
}
