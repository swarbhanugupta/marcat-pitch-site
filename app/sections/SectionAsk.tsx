import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const pillars = [
  {
    label: "Incubation",
    detail: "Acceptance into IC IIT Patna",
    note: "Sectoral bridge — industrial-grade infrastructure for organized retail",
  },
  {
    label: "SISFS",
    detail: "₹20L grant + ₹50L convertible",
    note: "Via IIT Patna DPR",
  },
  {
    label: "Network",
    detail: "IIT Patna mentor + alumni access",
    note: "FMCG · retail-tech · B2B SaaS scaling · Tier-2 distribution",
  },
];

const useOfFunds = [
  { sector: "Team runway", amount: "₹40L", pct: 33, detail: "2 founders capped ₹50K/mo + 1 first engineer" },
  { sector: "Distribution", amount: "₹30L", pct: 25, detail: "2 BDs walking Ahmedabad cluster, +1 Y2" },
  { sector: "Marketing + CAC", amount: "₹18L", pct: 15, detail: "Paid · events · store-walking" },
  { sector: "Tech infra", amount: "₹14L", pct: 12, detail: "Vercel · Supabase · Claude · WhatsApp BSP" },
  { sector: "Ops + buffer", amount: "₹18L", pct: 15, detail: "Legal · GST · ROC · 10% contingency" },
];

const milestones = [
  { mo: "Mo 6", goal: "5 paying stores · ₹75K ARR" },
  { mo: "Mo 12", goal: "50 paying stores · ₹7.5L ARR" },
  { mo: "Mo 18", goal: "2 brand pilots signed · distributor alpha" },
  { mo: "Mo 24+", goal: "Series A path · ₹4-5 Cr round" },
];

const wontPayFor = [
  "Banjara supermarket — founder-funded, isolated P&L",
  "Founder salaries above ₹50K/month each",
  "Hardware subsidies — customer pays for own PC",
  "Discounts below ₹15K/year price floor",
];

export function SectionAsk() {
  return (
    <SectionContainer>
      <SectionHeader
        number="11"
        label="The Ask"
        headline="What we need from IIT Patna."
        subhead="Three things. Plus a concurrent ₹50L pre-seed angel round, opening Q3 2026."
      />

      {/* 3 pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-12 max-w-5xl">
        {pillars.map((p) => (
          <div key={p.label} className="border border-marcat rounded-md p-6 bg-marcat-soft/40">
            <div className="font-mono text-[10px] tracking-[0.25em] text-marcat-orange uppercase font-semibold mb-3">
              {p.label}
            </div>
            <div className="text-[15px] text-ink font-semibold leading-snug mb-2">{p.detail}</div>
            <div className="text-[12px] text-ink-muted leading-relaxed">{p.note}</div>
          </div>
        ))}
      </div>

      {/* Concurrent angel round */}
      <div className="w-full max-w-4xl border border-line rounded-md p-5 bg-canvas-alt mb-12">
        <div className="font-mono text-[9px] tracking-[0.22em] text-ink-muted uppercase mb-2">Parallel · Angel pre-seed</div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="text-[24px] font-bold text-ink tabular-nums">₹50L</div>
          <div className="text-sm text-ink-body">· SAFE @ ₹4-5 Cr cap</div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-ink-muted uppercase">Open Q3 2026 · 1 of 3 readiness gates remaining</div>
        </div>
      </div>

      {/* Use of funds */}
      <div className="w-full max-w-5xl mb-12">
        <div className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase mb-4 text-center">
          Use of funds · ₹1.2 Cr combined · 18 months
        </div>
        <div className="space-y-2">
          {useOfFunds.map((u) => (
            <div key={u.sector} className="border border-line rounded-md bg-canvas-white overflow-hidden">
              <div className="flex items-center px-4 py-3 gap-4">
                <div className="font-medium text-[13px] text-ink w-44 shrink-0">{u.sector}</div>
                <div className="flex-1 h-1.5 bg-canvas-alt rounded-full overflow-hidden">
                  <div className="h-full bg-marcat-orange" style={{ width: `${u.pct * 2}%` }} />
                </div>
                <div className="font-mono text-[13px] text-ink tabular-nums w-16 text-right">{u.amount}</div>
                <div className="font-mono text-[10px] tracking-[0.15em] text-ink-muted uppercase w-10 text-right">{u.pct}%</div>
              </div>
              <div className="px-4 pb-3 text-[11px] text-ink-muted leading-relaxed">{u.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="w-full max-w-5xl mb-12">
        <div className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase mb-6 text-center">
          What ₹1.2 Cr buys
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {milestones.map((m, i) => (
            <div key={m.mo} className="text-center">
              <div className="flex justify-center mb-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${i === 0 ? "bg-marcat-orange" : "border border-marcat-orange"}`}
                />
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-marcat-orange uppercase mb-2">{m.mo}</div>
              <div className="text-xs text-ink-body leading-snug">{m.goal}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Won't pay for */}
      <div className="w-full max-w-4xl border border-line rounded-md p-5 bg-canvas-alt">
        <div className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase mb-3 font-semibold">
          What ₹1.2 Cr will NOT pay for
        </div>
        <ul className="space-y-2 mb-4">
          {wontPayFor.map((w, i) => (
            <li key={i} className="text-[12px] text-ink-body leading-relaxed flex gap-2">
              <span className="text-ink-muted">·</span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
        <div className="pt-3 border-t border-line/60 text-[12px] text-ink font-medium">
          3% preference shares to IIT Patna on incubation acceptance — accepted.
        </div>
      </div>

      <SectionBand>
        <span>Capital efficiency is the model</span>
        <span className="text-ink-muted/30">·</span>
        <span>Not the constraint</span>
      </SectionBand>
    </SectionContainer>
  );
}
