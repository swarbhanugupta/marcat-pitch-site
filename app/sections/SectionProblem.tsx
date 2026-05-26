import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

// 3 stakeholder pain nodes — visually "broken" cards (disconnected, tilted, grey)
const painPoints = [
  {
    label: "Retailer",
    tilt: "-2deg",
    pains: [
      "Tally / Marg / Vyapar don't talk to each other",
      "No customer view across visits",
      "Schemes reconciled on paper, weeks late",
    ],
  },
  {
    label: "Distributor",
    tilt: "1.5deg",
    pains: [
      "Excel + WhatsApp order capture",
      "Salesman beat invisible to HQ",
      "Retailer ledgers reconciled monthly, not daily",
    ],
  },
  {
    label: "Brand",
    tilt: "-1deg",
    pains: [
      "Sell-out data arrives 6-8 weeks late (NielsenIQ)",
      "Scheme effectiveness measured after the fact",
      "Last-mile retailer relationship invisible",
    ],
  },
];

export function SectionProblem() {
  return (
    <SectionContainer>
      <SectionHeader
        number="03"
        label="The Problem"
        headline="Indian organized retail is fragmented at every node."
        subhead="Rewind to before April 27, 2026 — every stakeholder ran on disconnected systems."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
        {painPoints.map((p) => (
          <div
            key={p.label}
            className="border border-line bg-canvas-alt rounded-md p-6 grayscale opacity-90"
            style={{ transform: `rotate(${p.tilt})` }}
          >
            <div className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase mb-4">
              {p.label} · BROKEN
            </div>
            <ul className="space-y-3">
              {p.pains.map((pain, i) => (
                <li key={i} className="text-sm text-ink-body leading-relaxed flex gap-2">
                  <span className="text-ink-muted">·</span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SectionBand>
        <span>Everyone has tried to solve individual nodes</span>
        <span className="text-ink-muted/30">·</span>
        <span>Nobody has built the network connecting these flows</span>
      </SectionBand>
    </SectionContainer>
  );
}
