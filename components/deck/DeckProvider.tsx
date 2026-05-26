"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DeckContext, TOTAL_SECTIONS, TUBE_BURST_MS } from "@/lib/deck-state";
import type { TubeMode } from "@/lib/tokens";
import { SECTIONS } from "@/lib/sections-config";

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [tubeMode, setTubeMode] = useState<TubeMode>("flowing");
  const burstTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Refs always carry the latest values — avoids stale-closure issues
  const sectionRef = useRef(currentSection);
  const subStepRef = useRef(subStep);
  useEffect(() => { sectionRef.current = currentSection; }, [currentSection]);
  useEffect(() => { subStepRef.current = subStep; }, [subStep]);

  const triggerBurst = useCallback(() => {
    // Continuous loop (locked 2026-05-25) — the chip board's "live network" claim
    // requires sustained motion. S2 Problem still shows static because MarCat=dead
    // disables tubes regardless of tubeMode (per PersistentChipBoard guard).
    if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    setTubeMode("flowing");
  }, []);

  // Stable handleNext — doesn't change identity across renders
  const handleNext = useCallback(() => {
    const curSec = sectionRef.current;
    const curSub = subStepRef.current;
    const cfg = SECTIONS[curSec];
    if (curSub < cfg.totalSubSteps - 1) {
      setSubStep(curSub + 1);
      return;
    }
    const newSec = Math.min(TOTAL_SECTIONS - 1, curSec + 1);
    if (newSec !== curSec) {
      setCurrentSection(newSec);
      setSubStep(0);
      triggerBurst();
    }
  }, [triggerBurst]);

  const handlePrev = useCallback(() => {
    const curSec = sectionRef.current;
    const curSub = subStepRef.current;
    if (curSub > 0) {
      setSubStep(curSub - 1);
      return;
    }
    const newSec = Math.max(0, curSec - 1);
    if (newSec !== curSec) {
      const newCfg = SECTIONS[newSec];
      setCurrentSection(newSec);
      setSubStep(newCfg.totalSubSteps - 1);
      triggerBurst();
    }
  }, [triggerBurst]);

  const jumpTo = useCallback((sectionIndex: number) => {
    const idx = Math.max(0, Math.min(TOTAL_SECTIONS - 1, sectionIndex));
    setCurrentSection(idx);
    setSubStep(0);
    triggerBurst();
  }, [triggerBurst]);

  // Initial burst on mount
  useEffect(() => {
    triggerBurst();
    return () => {
      if (burstTimeoutRef.current) clearTimeout(burstTimeoutRef.current);
    };
  }, [triggerBurst]);

  // Keyboard navigation — attached once because handleNext/Prev are stable
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        jumpTo(0);
      } else if (e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        jumpTo(parseInt(e.key) - 1);
      } else if (e.key === "0") {
        e.preventDefault();
        jumpTo(9);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNext, handlePrev, jumpTo]);

  return (
    <DeckContext.Provider
      value={{
        currentSection,
        subStep,
        tubeMode,
        next: handleNext,
        prev: handlePrev,
        jumpTo,
        triggerBurst,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}
