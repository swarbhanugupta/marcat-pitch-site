"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CircuitBoard } from "./CircuitBoard";

/**
 * HeroArchitectureScroll
 *
 * Combines Section 1 (Hero) and Section 2 (Architecture) into ONE sticky
 * scroll-driven experience. As the user scrolls through this 200vh container,
 * the chip board "powers up" — the MarCat chip zooms out from closeup, the
 * peripherals materialise, traces light up, and electrons start flowing.
 *
 * No section boundary between hero and architecture — it's one continuous
 * circuit-board experience.
 */

export function HeroArchitectureScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // ─── Scroll-driven choreography ─────────────────────────────────────
  // 0.00 → 0.30 : hero state — MarCat chip large (closeup), peripherals invisible, no traces
  // 0.30 → 0.55 : POWER UP — chip zooms out, peripherals fade in, traces draw
  // 0.55 → 0.75 : ENERGIZE — electrons start flowing, hero text fades out
  // 0.75 → 1.00 : architecture state — full board visible, architecture caption visible

  const chipScale = useTransform(scrollYProgress, [0, 0.3, 0.55, 1], [1.7, 1.6, 1.0, 1.0]);
  const peripheralOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const traceOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const electronOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  // Hero text — visible early, fades out as user scrolls into architecture
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [1, 1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);

  // Architecture caption — fades in as user passes the power-up
  const archTextOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const archTextY = useTransform(scrollYProgress, [0.55, 0.8], [40, 0]);

  // Power-up CTA — visible at start, fades out once power-up begins
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);

  // Click handler — scrolls programmatically to the architecture state
  const handlePowerUp = () => {
    if (!ref.current) return;
    const containerTop = ref.current.offsetTop;
    const containerHeight = ref.current.offsetHeight;
    // Scroll to ~75% of the way through (architecture state fully visible)
    const targetY = containerTop + containerHeight * 0.75;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative bg-canvas-white" style={{ height: "260vh" }}>
      {/* Sticky stage — the chip board lives here, content overlays float above */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* The chip board — always rendered, animates based on scroll */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full max-w-[1480px]">
            <CircuitBoard
              chipScale={chipScale}
              peripheralOpacity={peripheralOpacity}
              traceOpacity={traceOpacity}
              electronOpacity={electronOpacity}
            />
          </div>
        </div>

        {/* HERO TEXT — sits above chip, fades out on scroll */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="absolute top-[8vh] inset-x-0 flex flex-col items-center text-center px-6 pointer-events-none"
        >
          <div className="font-mono text-[11px] tracking-[0.28em] text-ink-muted mb-5 uppercase">
            01 · MarCat
          </div>
          <h1 className="text-[28px] md:text-[40px] font-bold text-ink leading-[1.1] tracking-tight max-w-3xl">
            The connecting layer for organized retail.
          </h1>
          <p className="text-[17px] md:text-[19px] font-normal text-ink-muted leading-relaxed pt-3 max-w-2xl">
            Four stakeholders — customer, retailer, distributor, brand — on one
            database, in real time.
          </p>
        </motion.div>

        {/* POWER UP CTA — sits below chip in hero state */}
        <motion.div
          style={{ opacity: ctaOpacity }}
          className="absolute bottom-[8vh] inset-x-0 flex flex-col items-center pointer-events-auto"
        >
          <button
            onClick={handlePowerUp}
            className="group inline-flex items-center gap-3 px-6 py-3 border border-line rounded-full bg-canvas-white hover:bg-marcat-soft transition-colors cursor-pointer shadow-sm"
          >
            <span className="font-mono text-[10px] tracking-[0.28em] text-ink uppercase font-semibold">
              Power up the circuit
            </span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-marcat-orange text-white">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1.5 V8.5 M2 5.5 L5 8.5 L8 5.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <div className="font-mono text-[9px] tracking-[0.3em] text-ink-muted/60 uppercase mt-4">
            Or scroll
          </div>
        </motion.div>

        {/* ARCHITECTURE TEXT — fades in after power-up */}
        <motion.div
          style={{ opacity: archTextOpacity, y: archTextY }}
          className="absolute top-[6vh] inset-x-0 flex flex-col items-center text-center px-6 pointer-events-none"
        >
          <div className="font-mono text-[11px] tracking-[0.28em] text-ink-muted mb-3 uppercase">
            02 · Architecture
          </div>
          <h2 className="text-[24px] md:text-[30px] font-bold text-ink leading-tight tracking-tight max-w-3xl">
            Four stakeholders. One database. Real-time coordination.
          </h2>
        </motion.div>

        {/* ARCHITECTURE CAPTION STRIP — below chip in architecture state */}
        <motion.div
          style={{ opacity: archTextOpacity }}
          className="absolute bottom-[6vh] inset-x-0 flex justify-center px-6 pointer-events-none"
        >
          <div className="font-mono text-[11px] tracking-[0.22em] text-ink-muted/80 uppercase flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-3xl text-center">
            <span>Real-time</span>
            <span className="text-ink-muted/30">·</span>
            <span>One database</span>
            <span className="text-ink-muted/30">·</span>
            <span>Bidirectional</span>
            <span className="text-ink-muted/30">·</span>
            <span>2-node live · 2-node built</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
