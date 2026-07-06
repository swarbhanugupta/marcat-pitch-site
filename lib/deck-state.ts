"use client";

import { createContext, useContext } from "react";
import type { TubeMode } from "@/lib/tokens";

export interface DeckState {
  currentSection: number;
  subStep: number;
  tubeMode: TubeMode;
  next: () => void;
  prev: () => void;
  jumpTo: (sectionIndex: number) => void;
  triggerBurst: () => void;
}

export const DeckContext = createContext<DeckState | null>(null);

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used inside <DeckProvider>");
  return ctx;
}

export const TOTAL_SECTIONS = 14;
export const TUBE_BURST_MS = 7500;
