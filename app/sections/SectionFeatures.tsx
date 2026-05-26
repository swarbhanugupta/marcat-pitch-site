import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const portals = [
  {
    label: "Customer",
    status: "LIVE",
    features: ["Storefront browse", "Cart + checkout", "Order tracking", "Subscriptions"],
  },
  {
    label: "Retailer",
    status: "LIVE",
    features: [
      "POS · multi-slot · keyboard-first",
      "Inventory · batch expiry · velocity",
      "Purchase · cost-basis · schemes",
      "Reports · 52 views · daily KPIs",
      "Promotions · 5 scheme types · AI brief",
      "WhatsApp · Meta API · attribution",
      "AI Copilot · Haiku · cost-capped",
    ],
  },
  {
    label: "Distributor",
    status: "BUILT",
    features: [
      "Beat SFA · salesman PWA",
      "Warehouse · fulfilment · e-way",
      "Billing · ledger · reconciliation",
      "Targets · routes · territories",
    ],
  },
  {
    label: "Brand",
    status: "BUILT",
    features: [
      "Live sell-out feed · 60s refresh",
      "Scheme orchestration · 80/20 split",
      "Salesman SFA · beat coverage",
      "Distributor network · invoicing",
    ],
  },
];

const govt = [
  "GST reconciliation across the chain",
  "Real-time product movement, brand → consumer",
  "MSME formalisation through digital ledgers",
];

export function SectionFeatures() {
  return (
    <SectionContainer>
      <SectionHeader
        number="04"
        label="How We Support"
        headline="Every node, fully equipped."
        subhead="One Next.js codebase. One Postgres database. 311 routes. Live in production."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {portals.map((p) => (
          <div
            key={p.label}
            className="border border-line rounded-md p-5 bg-canvas-white flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] tracking-[0.22em] text-ink uppercase font-semibold">
                {p.label}
              </div>
              <div
                className={`font-mono text-[9px] tracking-[0.2em] uppercase ${
                  p.status === "LIVE" ? "text-marcat-orange" : "text-ink-muted"
                }`}
              >
                {p.status}
              </div>
            </div>
            <ul className="space-y-2">
              {p.features.map((f, i) => (
                <li key={i} className="text-[12px] text-ink-body leading-relaxed flex gap-2">
                  <span className="text-marcat-orange shrink-0">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 w-full max-w-4xl border border-line rounded-md p-6 bg-marcat-soft/40">
        <div className="font-mono text-[10px] tracking-[0.22em] text-marcat-orange uppercase mb-3 font-semibold">
          Government of India · System benefits
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {govt.map((g, i) => (
            <li key={i} className="text-[12px] text-ink-body leading-relaxed flex gap-2">
              <span className="text-marcat-orange">·</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>

      <SectionBand>
        <span>4 portals · 1 database · 1 codebase</span>
        <span className="text-ink-muted/30">·</span>
        <span>824 commits · 658 in last 30 days</span>
      </SectionBand>
    </SectionContainer>
  );
}
