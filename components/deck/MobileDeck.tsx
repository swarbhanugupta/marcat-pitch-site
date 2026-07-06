"use client";

import Image from "next/image";
import { SECTIONS } from "@/lib/sections-config";
import { usePitchStats, withLiveProof } from "@/lib/pitchStats";
import { MobileContentCard } from "./MobileContentCard";
import { PersistentChipBoard } from "@/components/chipboard/PersistentChipBoard";
import { DEFAULT_BOARD_STATE } from "@/lib/tokens";
import type { ChipName, ChipState } from "@/lib/tokens";

const allLive: Record<ChipName, ChipState> = {
  marcat: "live", brand: "live", consumer: "live", supplier: "live", retailer: "live",
};

/**
 * Mobile-native scrollable deck. All 11 sections rendered as vertical-scroll
 * page cards. Each section has stacked content (no chip board geometry
 * dependency except the hero). Uses HTML for crisp text rendering.
 */
export function MobileDeck() {
  const liveStats = usePitchStats();
  return (
    <main className="min-h-screen w-full bg-canvas-white">
      {SECTIONS.map((cfg, idx) => {
        const state = withLiveProof(cfg.getState(0), liveStats);
        return (
          <section
            key={cfg.name}
            className="px-5 py-10 border-b border-line"
            id={`s-${idx + 1}`}
          >
            {/* Section number badge */}
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-3">
              {String(idx + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
            </div>

            {/* Eyebrow */}
            {state.eyebrow && (
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-2">
                {state.eyebrow}
              </div>
            )}

            {/* Headline */}
            {state.headline && (
              <h1 className="font-sans font-semibold text-[26px] leading-[1.1] tracking-[-0.02em] text-ink-strong mb-3">
                {state.headline}
              </h1>
            )}

            {/* Subhead */}
            {state.subHeadline && (
              <p className="font-sans text-[15px] leading-[1.4] text-ink-body mb-6">
                {state.subHeadline}
              </p>
            )}

            {/* Section-specific custom content */}
            {cfg.name === "title" && (
              <div className="my-6 w-full" style={{ aspectRatio: "1 / 0.95" }}>
                <PersistentChipBoard
                  chipStates={DEFAULT_BOARD_STATE}
                  tubeMode="flowing"
                  showMarcatLogo
                  viewBoxOverride="430 100 1140 750"
                />
              </div>
            )}

            {cfg.name === "team" && <MobileTeam />}
            {cfg.name === "ask" && <MobileAsk />}
            {cfg.name === "thanks" && <MobileClose />}

            {/* Content cards (stacked vertically) */}
            {state.contentChips.length > 0 && (
              <div className="space-y-3 my-4">
                {state.contentChips.map((spec, i) => (
                  <MobileContentCard key={i} spec={spec} />
                ))}
              </div>
            )}

            {/* System band */}
            {state.systemBand && (
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange leading-relaxed mt-4">
                {state.systemBand}
              </div>
            )}

            {/* Takeaway */}
            {state.takeaway && (
              <p className="font-sans font-semibold text-[18px] leading-[1.3] text-ink-strong mt-5">
                {state.takeaway}
              </p>
            )}

            {/* Bottom band */}
            {state.bottomBand && (
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted leading-relaxed mt-4 whitespace-pre-line">
                {state.bottomBand}
              </p>
            )}
          </section>
        );
      })}

      <footer className="px-5 py-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          MarCat · pitch.marcat.in · swarbhanu@marcat.in
        </p>
      </footer>
    </main>
  );
}

function MobileTeam() {
  return (
    <div className="space-y-6 my-4">
      <div className="text-center">
        <div className="w-[120px] h-[120px] mx-auto mb-3 overflow-hidden rounded-full ring-2 ring-line">
          <Image
            src="/swarbhanu.webp"
            alt="Swarbhanu Gupta"
            width={240}
            height={240}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div className="font-sans font-bold text-[16px] text-ink-strong">Swarbhanu Gupta</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-1 mb-2">
          Founder · Operator
        </div>
        <div className="text-[13px] text-ink-body leading-relaxed">
          8+ yrs FMCG software · Ex-VP Sales CultureX<br />
          Earlier: Bizom · Happay · Qoruz · 55+ B2B closes
        </div>
        <div className="text-[11px] text-ink-muted italic mt-2 px-4">
          Built a supermarket from scratch — then built MarCat to run it. Sole engineer: 6 portals · 7 AI endpoints.
        </div>
      </div>
      <div className="text-center">
        <div className="w-[120px] h-[120px] mx-auto mb-3 overflow-hidden rounded-full ring-2 ring-line">
          <Image
            src="/divya.webp"
            alt="Divya Pandya"
            width={240}
            height={240}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div className="font-sans font-bold text-[16px] text-ink-strong">Divya Pandya</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-1 mb-2">
          Co-founder · Operations
        </div>
        <div className="text-[13px] text-ink-body leading-relaxed">
          7+ yrs HR &amp; People Ops · Ex-Country Lead, Outsourced<br />
          Earlier: Intugine · B.Tech + MBA
        </div>
        <div className="text-[11px] text-ink-muted italic mt-2 px-4">
          Runs daily store ops + cashier training at the supermarket lab since 27 April 2026.
        </div>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted text-center pt-4 border-t border-line">
        First hires (this round): 2 field reps + engineer + CS  ·  50+ stores: sales scale-up
      </div>
    </div>
  );
}

function MobileAsk() {
  return (
    <div className="space-y-6 my-4">
      <div className="text-center font-mono text-[12px] text-ink-body mb-1">
        ₹55 lakh · ~15-mo · ~6% dilution
      </div>
      <div className="flex justify-around items-start gap-4">
        <div className="text-center">
          <div className="font-mono text-[28px] font-bold tracking-tight text-ink-strong leading-none">
            ₹20L
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-marcat-orange mt-1">
            SISFS GRANT · NON-DILUTIVE
          </div>
        </div>
        <div className="text-center">
          <div className="font-mono text-[28px] font-bold tracking-tight text-ink-strong leading-none">
            ₹35L
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-marcat-orange mt-1">
            ANGEL SAFE · ₹6 Cr CAP
          </div>
        </div>
      </div>
      <div className="border-t border-line pt-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-3 text-center">
          MILESTONE: SELL-OUT LOOP LIVE · 10–15 PAYING STORES · ENGINEER HIRED
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
          <div>
            <div className="text-ink-strong font-bold">TEAM</div>
            <div className="text-ink-muted mt-1">engineer + rep</div>
          </div>
          <div>
            <div className="text-ink-strong font-bold">GTM</div>
            <div className="text-ink-muted mt-1">founder field</div>
          </div>
          <div>
            <div className="text-ink-strong font-bold">CLOUD + AI + OPS</div>
            <div className="text-ink-muted mt-1">15 mo</div>
          </div>
        </div>
      </div>
      <p className="text-[13px] text-ink-body italic leading-relaxed text-center px-2">
        Already live at the supermarket lab since 27 April 2026. This funds the network&rsquo;s first real edge — not survival.
      </p>
    </div>
  );
}

function MobileClose() {
  return (
    <div className="my-4">
      <div className="w-full" style={{ aspectRatio: "1 / 0.95" }}>
        <PersistentChipBoard
          chipStates={allLive}
          tubeMode="flowing"
          showMarcatLogo
          viewBoxOverride="430 100 1140 750"
        />
      </div>
      <div className="text-center mt-6">
        <p className="font-sans font-semibold text-[18px] text-ink-strong">
          Visit the lab.<br />
          Email swarbhanu@marcat.in.
        </p>
        <a
          href="/marcat-pitch.pdf"
          download="marcat-pitch.pdf"
          className="inline-block mt-6 px-6 py-3 font-mono text-[13px] uppercase tracking-widest bg-marcat-orange text-white rounded-md font-bold"
        >
          ↓ Download Deck PDF
        </a>
      </div>
    </div>
  );
}
