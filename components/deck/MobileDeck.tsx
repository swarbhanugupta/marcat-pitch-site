"use client";

import Image from "next/image";
import { SECTIONS } from "@/lib/sections-config";
import { withLiveProof } from "@/lib/pitchStats";
import { usePitchStats } from "@/lib/usePitchStats";
import { useRecentBills } from "@/lib/useRecentBills";
import type { PitchStats } from "@/lib/pitchStats";
import { MobileContentCard } from "./MobileContentCard";
import { MarketBoard, GtmBoard, FlywheelBoard } from "./CustomBoards";
import { PersistentChipBoard } from "@/components/chipboard/PersistentChipBoard";
import { DEFAULT_BOARD_STATE } from "@/lib/tokens";



/**
 * Mobile-native scrollable deck. All 11 sections rendered as vertical-scroll
 * page cards. Each section has stacked content (no chip board geometry
 * dependency except the hero). Uses HTML for crisp text rendering.
 */
export function MobileDeck({ initialStats }: { initialStats?: PitchStats }) {
  const liveStats = usePitchStats(initialStats);
  const recentBills = useRecentBills();
  return (
    <main className="min-h-screen w-full bg-canvas-white">
      {SECTIONS.map((cfg, idx) => {
        const state = withLiveProof(cfg.getState(0), liveStats, recentBills);
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

            {/* Custom boards — same components desktop uses, so mobile doesn't
                silently keep the bare-board version of S07/S09/S10. */}
            {state.customBoard && (
              <div className="my-6 min-h-[300px]">
                {state.customBoard === "market" && <MarketBoard />}
                {state.customBoard === "gtm" && <GtmBoard />}
                {state.customBoard === "flywheel" && <FlywheelBoard />}
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
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-marcat-orange leading-relaxed mt-4 whitespace-pre-line">
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
          Built the operating system inside a live supermarket.
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
          Runs daily store ops + cashier training at the supermarket lab.
        </div>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted text-center pt-4 border-t border-line">
        Operate → Observe → Build → Ship
        <div className="mt-1">
          Supermarket open since 5 Jan 2025
          <span className="text-marcat-orange"> · MarCat live inside it since 27 Apr 2026</span>
        </div>
      </div>
    </div>
  );
}

function MobileAsk() {
  return (
    <div className="space-y-6 my-4">
      <div className="text-center font-sans text-[13px] text-ink-body mb-1">
        One store proves the system. Multiple stores prove the model.
      </div>
      <div className="flex justify-around items-start gap-4">
        <div className="text-center">
          <div className="font-mono text-[28px] font-bold tracking-tight text-ink-strong leading-none">
            ₹75L
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-marcat-orange mt-1">
            TARGET
          </div>
        </div>
        <div className="text-center">
          <div className="font-mono text-[28px] font-bold tracking-tight text-ink-strong leading-none">
            ₹1 Cr
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-marcat-orange mt-1">
            STRETCH · ₹7 Cr CAP
          </div>
        </div>
      </div>
      <div className="border-t border-line pt-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1 text-center">
          PROOF TARGET · 15–25 PAYING STORES · AHMEDABAD · 24 MONTHS FROM CLOSE
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-marcat-orange mb-3 text-center">
          VALIDATION ROUND · NOT A REVENUE FORECAST
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
          <div>
            <div className="text-ink-strong font-bold">ENGINEERING</div>
            <div className="text-ink-muted mt-1">repeatable deploy</div>
          </div>
          <div>
            <div className="text-ink-strong font-bold">FIELD GTM</div>
            <div className="text-ink-muted mt-1">repeatable acq</div>
          </div>
          <div>
            <div className="text-ink-strong font-bold">CUSTOMER SUCCESS</div>
            <div className="text-ink-muted mt-1">convert to paid</div>
          </div>
        </div>
      </div>
      <p className="text-[13px] text-ink-body italic leading-relaxed text-center px-2">
        Self-sufficient raise — grants treated as upside, not counted.<br />
        Pre-seed SAFE · 18–24 months runway · ₹7 Cr cap
      </p>
    </div>
  );
}

function MobileClose() {
  return (
    <div className="my-4">
      <div className="w-full" style={{ aspectRatio: "1 / 0.95" }}>
        {/* allLive → DEFAULT_BOARD_STATE 2026-08-09, matching desktop S14. Showing four
            green nodes on the final frame retracted the 🟢/🔵 discipline of the whole deck. */}
        <PersistentChipBoard
          chipStates={DEFAULT_BOARD_STATE}
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
