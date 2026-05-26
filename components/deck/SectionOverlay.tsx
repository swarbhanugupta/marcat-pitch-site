"use client";

// SectionOverlay — renders the headline/sub/takeaway/system-band overlays
// on top of the PersistentChipBoard. Pure positioning + typography.

import { motion, AnimatePresence } from "framer-motion";

interface SectionOverlayProps {
  eyebrow?: string;
  headline?: string;
  subHeadline?: string;
  takeaway?: string;
  systemBand?: string;
  bottomBand?: string;
  sectionKey: string; // for AnimatePresence transitions
}

const transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export function SectionOverlay({
  eyebrow,
  headline,
  subHeadline,
  takeaway,
  systemBand,
  bottomBand,
  sectionKey,
}: SectionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Top area: eyebrow + headline + sub */}
      {(eyebrow || headline || subHeadline) && (
        <div className="absolute top-0 left-0 right-0 px-8 pt-8 md:pt-12 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`top-${sectionKey}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={transition}
              className="text-center max-w-[1200px]"
            >
              {eyebrow && (
                <div className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.18em] text-ink-muted mb-3">
                  {eyebrow}
                </div>
              )}
              {headline && (
                <h1 className="font-sans font-semibold text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-ink-strong">
                  {headline}
                </h1>
              )}
              {subHeadline && (
                <p className="font-sans font-normal text-[18px] md:text-[24px] leading-[1.3] tracking-[-0.01em] text-ink-body mt-3">
                  {subHeadline}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* System band — between MarCat and bottom (vertically center, on canvas) */}
      {systemBand && (
        <AnimatePresence>
          <motion.div
            key={`band-${sectionKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="absolute left-0 right-0 top-[55%] flex justify-center"
          >
            <div className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.22em] text-ink-muted bg-white/70 px-4 py-1.5">
              {systemBand}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Bottom area: takeaway + small bottom band */}
      {(takeaway || bottomBand) && (
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 md:pb-12 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bot-${sectionKey}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={transition}
              className="text-center max-w-[1200px]"
            >
              {takeaway && (
                <p className="font-sans font-semibold text-[28px] md:text-[40px] leading-[1.1] tracking-[-0.015em] text-ink-strong mb-2">
                  {takeaway}
                </p>
              )}
              {bottomBand && (
                <p className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.18em] text-ink-muted">
                  {bottomBand}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
