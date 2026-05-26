import { SectionHeader, SectionContainer, SectionBand } from "@/components/SectionShell";

const lineage = [
  { co: "Mobisy", year: "2013", detail: "FMCG SFA foundation" },
  { co: "Bizom", year: "2017", detail: "Distribution data" },
  { co: "Qoruz", year: "2019", detail: "Influencer signal" },
  { co: "Happay", year: "2021", detail: "Spend mgmt B2B SaaS" },
  { co: "CultureX", year: "2023", detail: "Behavioural data" },
  { co: "Banjara + MarCat", year: "2025-26", detail: "Built the supermarket. Built MarCat.", current: true },
];

const stats = [
  { label: "Domain", value: "8+ years FMCG enterprise software" },
  { label: "Operator", value: "Banjara · 1 store · 6,000+ SKUs · live 2026-04-27" },
  { label: "Engineering", value: "824 commits · 658 in last 30 days · 4 portals · 1 developer" },
  { label: "Capital", value: "₹0 outside funding · founder-funded supermarket cashflow" },
];

function FounderCard({ initials, name, role, bio }: { initials: string; name: string; role: string; bio: string }) {
  return (
    <div className="flex flex-col items-center text-center max-w-[280px]">
      {/* Placeholder ring — replaced with real photo when /public/<name>.webp exists */}
      <div className="w-[140px] h-[140px] rounded-full border-[1.5px] border-dashed border-line flex items-center justify-center mb-5 bg-canvas-alt">
        <span className="font-mono text-[28px] font-semibold text-ink-muted tracking-wide">{initials}</span>
      </div>
      <div className="text-[18px] font-bold text-ink">{name}</div>
      <div className="font-mono text-[10px] tracking-[0.22em] text-marcat-orange uppercase mt-1.5">{role}</div>
      <p className="text-[12px] text-ink-body leading-relaxed mt-4">{bio}</p>
    </div>
  );
}

export function SectionTeam() {
  return (
    <SectionContainer>
      <SectionHeader
        number="10"
        label="Team"
        headline="Built by people who lived inside this problem."
        subhead="One founder. One ops partner. Eight years across FMCG enterprise software. One supermarket built from scratch."
      />

      {/* Founder cards */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-20 w-full mb-16">
        <FounderCard
          initials="SG"
          name="Swarbhanu Gupta"
          role="Founder & CEO"
          bio="8+ yrs FMCG enterprise software (Mobisy/Bizom · Happay · Qoruz · CultureX). Built Banjara supermarket from scratch in Prahladnagar, Ahmedabad. Ships daily."
        />
        <FounderCard
          initials="DP"
          name="Divya Pandya"
          role="Co-founder & Ops"
          bio="Full-time ops partner. Shipping at Banjara since launch (2026-04-27). Runs day-to-day supermarket operations and customer onboarding."
        />
      </div>

      {/* Lineage strip */}
      <div className="w-full max-w-5xl mb-12">
        <div className="font-mono text-[10px] tracking-[0.25em] text-ink-muted uppercase mb-6 text-center">
          Founder lineage
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {lineage.map((l) => (
            <div key={l.co} className="text-center">
              <div className="flex justify-center mb-3">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    l.current ? "bg-marcat-orange" : "border-[1.5px] border-marcat-orange"
                  }`}
                />
              </div>
              <div className="text-[12px] font-semibold text-ink leading-snug">{l.co}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] text-ink-muted uppercase mt-1">{l.year}</div>
              <div className="text-[10px] text-ink-muted leading-snug mt-1.5">{l.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Operator stats — mono technical panel */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="border border-line rounded-md p-4 bg-canvas-white flex flex-col">
            <div className="font-mono text-[9px] tracking-[0.22em] text-ink-muted uppercase mb-1.5">{s.label}</div>
            <div className="text-[12.5px] text-ink-body leading-relaxed">{s.value}</div>
          </div>
        ))}
      </div>

      <SectionBand>
        <span>We didn't pick this market</span>
        <span className="text-ink-muted/30">·</span>
        <span>We've spent our careers inside it</span>
      </SectionBand>
    </SectionContainer>
  );
}
