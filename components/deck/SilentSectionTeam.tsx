"use client";

import Image from "next/image";

export function SilentSectionTeam() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 select-none pointer-events-none">
      <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted mb-2">
        12 · TEAM
      </div>
      <h1 className="font-sans font-semibold text-[32px] md:text-[36px] leading-[1.05] tracking-[-0.02em] text-ink-strong mb-3 pointer-events-none">
        Built from inside the problem.
      </h1>
      {/* Comparative claim removed 2026-08-09 — "most founders never ran a store" invites
          "how do you know?" about a set we can't evidence. Show the combination, don't compare. */}
      <div className="text-[13px] md:text-[14px] text-ink-body leading-snug text-center max-w-[720px] mb-6 pointer-events-none">
        We didn&apos;t design this for a supermarket.{" "}
        <span className="text-ink-strong font-medium">We built it inside one.</span>
      </div>

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
            Built the operating system inside a live supermarket.
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
            Runs daily store ops + cashier training at the supermarket lab.
          </div>
        </div>
      </div>

      {/* First-hires line moved to S13 2026-08-09 — the Ask owns hiring. */}
      <div className="mt-6 pointer-events-none">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ink-muted text-center">
          Operate → Observe → Build → Ship
        </div>
      </div>

      {/* Two distinct dates, previously conflated into one. The supermarket opened
          5 Jan 2025; MarCat went live inside it 27 Apr 2026 — 15 months of operating
          BEFORE the software existed. That gap is the founder-market-fit argument,
          and collapsing it into "since April 2026" threw the argument away. */}
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted mt-4 pointer-events-none text-center">
        Supermarket open since 5 Jan 2025
        <span className="text-marcat-orange"> · MarCat live inside it since 27 Apr 2026</span>
      </div>
    </div>
  );
}
