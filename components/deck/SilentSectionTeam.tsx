"use client";

import Image from "next/image";

export function SilentSectionTeam() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 select-none pointer-events-none">
      <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted mb-2">
        09 · TEAM
      </div>
      <h1 className="font-sans font-semibold text-[32px] md:text-[36px] leading-[1.05] tracking-[-0.02em] text-ink-strong mb-6 pointer-events-none">
        The team.
      </h1>

      <div className="grid grid-cols-2 gap-10 max-w-[1000px] w-full pointer-events-none">
        {/* Swarbhanu */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-[140px] h-[140px] mb-3 overflow-hidden rounded-full ring-2 ring-line"
            style={{ boxShadow: "rgba(0,0,0,0.08) 0 4px 20px 0" }}
          >
            <Image
              src="/swarbhanu.webp"
              alt="Swarbhanu Gupta"
              width={280}
              height={280}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="font-sans font-semibold text-[18px] leading-tight text-ink-strong">
            Swarbhanu Gupta
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-1 mb-2">
            Founder · Operator
          </div>
          <div className="text-[12px] text-ink-body leading-relaxed">
            8+ yrs FMCG software · Ex-VP Sales CultureX<br />
            Earlier: Bizom · Happay · Qoruz · 55+ B2B closes
          </div>
          <div className="text-[11px] text-ink-muted italic mt-2 max-w-[280px]">
            Built a supermarket from scratch — then built MarCat to run it.
            Sole engineer: 4 portals · 311 routes · 7 AI endpoints.
          </div>
        </div>

        {/* Divya */}
        <div className="flex flex-col items-center text-center">
          <div
            className="w-[140px] h-[140px] mb-3 overflow-hidden rounded-full ring-2 ring-line"
            style={{ boxShadow: "rgba(0,0,0,0.08) 0 4px 20px 0" }}
          >
            <Image
              src="/divya.webp"
              alt="Divya Pandya"
              width={280}
              height={280}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="font-sans font-semibold text-[18px] leading-tight text-ink-strong">
            Divya Pandya
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-1 mb-2">
            Co-founder · Operations
          </div>
          <div className="text-[12px] text-ink-body leading-relaxed">
            7+ yrs HR &amp; People Ops · Ex-Country Lead, Outsourced<br />
            Earlier: Intugine · B.Tech + MBA
          </div>
          <div className="text-[11px] text-ink-muted italic mt-2 max-w-[280px]">
            Runs daily store ops + cashier training at the supermarket lab since 27 April 2026.
          </div>
        </div>
      </div>

      {/* First hires — single inline line */}
      <div className="mt-6 pointer-events-none">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted text-center">
          First hires · 5 stores: field rep + dev + CS  ·  50 stores: sales scale-up
        </div>
      </div>

      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted mt-4 italic pointer-events-none">
        Code written and tested inside a live supermarket lab
      </div>
    </div>
  );
}
