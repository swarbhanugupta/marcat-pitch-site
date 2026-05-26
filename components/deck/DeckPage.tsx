"use client";

import { useDeck } from "@/lib/deck-state";
import { SECTIONS } from "@/lib/sections-config";
import { PersistentChipBoard } from "@/components/chipboard/PersistentChipBoard";
import { SilentSectionTeam } from "./SilentSectionTeam";
import { SilentSectionAsk } from "./SilentSectionAsk";
import { MobileDeck } from "./MobileDeck";
import { useIsMobile } from "@/lib/use-is-mobile";
import { motion, AnimatePresence } from "framer-motion";

const transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

export function DeckPage() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileDeck />;

  return <DesktopDeck />;
}

function DesktopDeck() {
  const { currentSection, subStep, tubeMode, next, prev } = useDeck();
  const cfg = SECTIONS[currentSection];
  const state = cfg.getState(subStep);
  const sectionKey = `${cfg.name}-${subStep}`;

  const isTeam = cfg.name === "team";
  const isAsk = cfg.name === "ask";
  const isCustom = isTeam || isAsk;

  // Split-click: left half advances backward, right half forward
  // Skip nav buttons (data-nav-button) to avoid double-fire
  const handleStageClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-nav-button]")) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prev();
    else next();
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-canvas-white relative flex flex-col">
      {/* TOP ZONE — eyebrow + headline + sub. Trimmed to give chip board
          maximum vertical real estate (chips render larger on Meet 720p). */}
      {!isCustom && (
        <div className="h-[80px] md:h-[90px] flex-shrink-0 flex flex-col items-center justify-center px-8 pt-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={`top-${sectionKey}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={transition}
              className="text-center max-w-[1200px]"
            >
              {state.eyebrow && (
                <div className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.22em] text-ink-muted mb-1">
                  {state.eyebrow}
                </div>
              )}
              {state.headline && (
                <h1 className="font-sans font-semibold text-[24px] md:text-[32px] leading-[1.05] tracking-[-0.02em] text-ink-strong">
                  {state.headline}
                </h1>
              )}
              {state.subHeadline && (
                <p className="font-sans text-[14px] md:text-[16px] leading-[1.3] tracking-[-0.01em] text-ink-body mt-1">
                  {state.subHeadline}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* MIDDLE ZONE — chip board (or custom content for Team/Ask).
          Click-to-advance enabled even on Team/Ask so navigation never gets stuck. */}
      <div
        className="flex-1 min-h-0 relative cursor-pointer"
        onClick={handleStageClick}
      >
        {!isCustom && (
          <div className="absolute inset-0">
            <PersistentChipBoard
              chipStates={state.chipStates}
              tubeMode={tubeMode}
              opacity={state.boardOpacity}
              showMarcatLogo={state.showMarcatLogo}
              contentChips={state.contentChips}
              onMarcatClick={next}
            />
          </div>
        )}
        {isTeam && <SilentSectionTeam />}
        {isAsk && <SilentSectionAsk />}
      </div>

      {/* BOTTOM ZONE — takeaway, system band, bottom band (compact) */}
      {!isCustom && (state.takeaway || state.systemBand || state.bottomBand) && (
        <div className="h-[80px] md:h-[90px] flex-shrink-0 flex flex-col items-center justify-center px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bot-${sectionKey}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={transition}
              className="text-center max-w-[1200px]"
            >
              {state.systemBand && (
                <div className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.24em] text-marcat-orange mb-1">
                  {state.systemBand}
                </div>
              )}
              {state.takeaway && (
                <p className="font-sans font-semibold text-[20px] md:text-[26px] leading-[1.1] tracking-[-0.015em] text-ink-strong">
                  {state.takeaway}
                </p>
              )}
              {state.bottomBand && (
                <p className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.18em] text-ink-muted mt-1 whitespace-pre-line">
                  {state.bottomBand}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Nav strip — flex child, stacks at bottom, no overlap with takeaway.
          BACK hidden on first slide, NEXT hidden on last slide.
          Empty placeholder divs preserve justify-between balance. */}
      <div className="h-[52px] flex-shrink-0 flex items-center justify-between px-4 border-t border-line bg-white/95 backdrop-blur">
        {currentSection > 0 ? (
          <button
            data-nav-button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="px-4 py-2 font-mono text-[14px] uppercase tracking-widest text-ink border-2 border-line bg-canvas-white hover:bg-marcat-soft hover:border-marcat-orange transition-colors font-semibold"
          >
            ← back
          </button>
        ) : (
          <div className="w-[88px]" aria-hidden />
        )}

        <div className="flex items-center gap-3">
          <span className="font-mono text-[14px] uppercase tracking-widest text-ink font-semibold">
            {String(currentSection + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
          </span>
          {cfg.totalSubSteps > 1 && (
            <span className="font-mono text-[12px] uppercase tracking-widest text-ink-muted">
              · step {subStep + 1}/{cfg.totalSubSteps}
            </span>
          )}
        </div>

        {currentSection < SECTIONS.length - 1 ? (
          <button
            data-nav-button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="px-4 py-2 font-mono text-[14px] uppercase tracking-widest text-white bg-marcat-orange hover:opacity-90 transition-opacity font-semibold"
          >
            next →
          </button>
        ) : (
          <a
            data-nav-button
            href="/marcat-pitch.pdf"
            download="marcat-pitch.pdf"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 font-mono text-[14px] uppercase tracking-widest text-white bg-marcat-orange hover:opacity-90 transition-opacity font-semibold no-underline"
          >
            ↓ pdf
          </a>
        )}
      </div>
    </main>
  );
}
