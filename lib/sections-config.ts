// Section configuration — data-driven specs for all 14 sections.
// Each section declares its sub-step count + visual state per sub-step.
//
// Narrative v1.0 (FROZEN, 2026-07): "the transaction layer for Indian FMCG."
// Source of truth for copy: D:\Pitch deck\FINAL_DECK_CONTENT.md
// Freeze rule: no headline changes unless customer evidence forces the story
// to change (Store #2 live, supplier sync live, brand paying, measured
// outcomes, network metrics). Anything else is a preference edit — declined.
//
// Display note: the middle-tier node stays "SUPPLIER" (generic) — that tier can
// be a distributor, super-stockist or sub-stockist, so the deck doesn't commit
// to one. ChipName/geometry keys are "supplier".

import type { ChipName, ChipState } from "@/lib/tokens";
import { DEFAULT_BOARD_STATE } from "@/lib/tokens";
import { FALLBACK_STATS, proofRetailerLines, proofConsumerLines, proofSystemBand } from "./pitchStats";

export interface ContentChipSpec {
  peripheral: "brand" | "consumer" | "supplier" | "retailer";
  // Pin pair used on the peripheral side (cycles per section to avoid stagnation)
  pinPair: 0 | 1 | 2 | 3;
  // Which side of peripheral to connect from (must NOT collide with MarCat-arm side)
  side: "top" | "bottom" | "left" | "right";
  label: string;       // chip header
  lines: string[];     // body text lines
  tone: "error" | "benefit" | "neutral"; // determines color (red / orange / gray)
}

export interface SectionState {
  chipStates: Record<ChipName, ChipState>;
  boardOpacity: number;       // 0 = silent, 0.2 = reprise (Section 12), 1 = normal
  showMarcatLogo: boolean;
  eyebrow?: string;            // mono uppercase eyebrow
  headline?: string;
  subHeadline?: string;
  takeaway?: string;           // big bottom statement
  systemBand?: string;         // band between MarCat and bottom chips
  contentChips: ContentChipSpec[];
  bottomBand?: string;         // small text at viewport bottom
}

export interface SectionConfig {
  index: number;
  name: string;
  totalSubSteps: number;
  getState: (subStep: number) => SectionState;
}

// Shared side map — TL/BL connect left, TR/BR connect right.
const SIDE = { brand: "left", consumer: "right", supplier: "left", retailer: "right" } as const;

// Display labels. The middle-tier node stays generic "SUPPLIER" on purpose —
// that tier can be a distributor, super-stockist OR sub-stockist depending on
// the brand's route-to-market, so we don't commit to one term.
const DISPLAY_LABEL = { brand: "BRAND", consumer: "CONSUMER", supplier: "SUPPLIER", retailer: "RETAILER" } as const;

// Helpers
const allLive: Record<ChipName, ChipState> = {
  marcat: "live", brand: "live", consumer: "live", supplier: "live", retailer: "live",
};
// allDim — S2 "divergent" state: every node present but muted + un-synced (no
// electrons). Reads as "everyone has software, nobody shares the same reality"
// — nodes exist, they just aren't on the same transaction. (Not allDead: the
// participants aren't gone, they're disconnected.)
const allDim: Record<ChipName, ChipState> = {
  marcat: "dim", brand: "dim", consumer: "dim", supplier: "dim", retailer: "dim",
};

const NODES = ["brand", "consumer", "supplier", "retailer"] as const;

// ── S1 · IDENTITY ──────────────────────────────────────────────────────────
// Identity is a primitive (transaction layer), not a verb. Neural-network line
// demoted to the S14 close reprise only.
const section1: SectionConfig = {
  index: 0, name: "title", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE,
    boardOpacity: 1, showMarcatLogo: true,
    headline: "The transaction layer for Indian FMCG.",
    subHeadline: "One transaction. One shared operational state. Four participants acting from the same reality.",
    contentChips: [],
  }),
};

// ── S2 · THE INSIGHT (problem) ──────────────────────────────────────────────
// One transaction, four decisions, four different numbers. Divergent board.
const insightDecisions: Record<typeof NODES[number], string[]> = {
  retailer: ["REORDER?", "SHELF SAYS 19"],
  supplier: ["DISPATCH?", "STILL PLANS 20"],
  brand:    ["PROMO WORKING?", "KNOWS IN 45 DAYS"],
  consumer: ["COME BACK?", "HISTORY: 1 STORE"],
};
const section3: SectionConfig = {
  index: 1, name: "problem", totalSubSteps: 1,
  getState: () => ({
    chipStates: allDim,
    boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "02 · PROBLEM",
    headline: "One transaction. Four decisions.",
    subHeadline: "A shopper buys one unit.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 0 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: insightDecisions[name],
      tone: "error" as const,
    })),
    takeaway: "Four decisions, four datasets. Nobody acts on the same version of the transaction.",
  }),
};

// ── S3 · SOLUTION ───────────────────────────────────────────────────────────
// Outcome-first chips. Live nodes flow; built nodes dashed.
const solutionOutcomes: Record<typeof NODES[number], string[]> = {
  retailer: ["REORDERS ON STOCK", "THAT'S ACTUALLY TRUE"],
  consumer: ["RECOGNIZED STORE", "TO STORE"],
  supplier: ["DISPATCHES ON", "LIVE DEMAND  · BUILT"],
  brand:    ["SEES SELL-OUT", "AS IT HAPPENS · BUILT"],
};
const section4: SectionConfig = {
  index: 2, name: "solution", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "03 · SOLUTION",
    headline: "Synchronize the transaction.",
    subHeadline: "Each participant sees the same transaction through a workflow built for them.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 1 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: solutionOutcomes[name],
      tone: "benefit" as const,
    })),
    systemBand: "FOUR INTERFACES · ONE DATABASE · ONE SHARED STATE",
    takeaway: "Retailers reorder right, suppliers dispatch accurately, brands see demand live, consumers keep coming back. Two decisions synchronized today, four by design.",
  }),
};

// ── S4 · THE TRANSFORMATION (how it works) — the "holy shit" slide ──────────
// The transaction cascade. NOTE: bespoke vertical-cascade component is a
// follow-up (see TransactionCascade TODO); for v1.0 the cascade rides the
// systemBand + node chips on the radial board. This is the design centerpiece.
const cascadeSteps: Record<typeof NODES[number], string[]> = {
  retailer: ["① STOCK UPDATES", "REPLENISHMENT LIVE"],
  supplier: ["② SUPPLIER PLANS", "ON REAL DEMAND"],
  brand:    ["③ SELL-OUT VISIBLE", "THE SAME DAY"],
  consumer: ["④ CUSTOMER RETURNS", "THE LAYER REMEMBERS"],
};
const sectionFlow: SectionConfig = {
  index: 3, name: "how", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "04 · HOW IT WORKS",
    headline: "A single bill. Four businesses decide.",
    subHeadline: "One ₹250 grocery bill isn't a sale — it's an information event. Replenishment, supplier planning, brand intelligence, and the reason a customer returns — all from one write.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 2 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: cascadeSteps[name],
      tone: "benefit" as const,
    })),
    systemBand: "₹250 BILL → STOCK → DEMAND → SELL-OUT → LOYALTY → AI REORDER → EVERY FUTURE DECISION SHARPER",
    takeaway: "One write. Reused by four businesses. Every future decision sharper than the last.",
    bottomBand: "Operational intelligence = inventory truth + demand visibility + sell-out visibility, from one transaction   ·   Retailer + consumer LIVE today · Brand + supplier built",
  }),
};

// ── S5 · THE LAB (reality + wedge) ──────────────────────────────────────────
// Real Banjara-lab numbers (read-only, store 83d9e3dc…). Only MarCat-processed
// bills count; imported Marg history excluded. The wedge (independent
// supermarkets) is named here — Banjara IS the wedge, made concrete.
const sectionProof: SectionConfig = {
  index: 4, name: "proof", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "05 · REALITY",
    headline: "Not a prototype. A running store.",
    subHeadline: "Live at Banjara — an independent supermarket in Ahmedabad — since 27 April 2026. Real bills, real customers, every single day.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 3 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: {
        retailer: proofRetailerLines(FALLBACK_STATS),
        consumer: proofConsumerLines(FALLBACK_STATS),
        supplier: ["BUILT · NOT YET LIVE", "1ST SUPPLIER NEXT", "—"],
        brand:    ["BUILT · NOT YET LIVE", "1ST BRAND PILOT NEXT", "—"],
      }[name],
      tone: "benefit" as const,
    })),
    systemBand: proofSystemBand(FALLBACK_STATS),
    takeaway: "We start as the operating system for independent supermarkets. Every new supermarket makes every synchronized transaction more valuable. The demand test is what we raise for.",
    bottomBand: "Banjara is our first customer and our lab — every feature ships here first   ·   captive R&D lab, not a paying customer",
  }),
};

// ── S6 · WHY NOW ────────────────────────────────────────────────────────────
const sectionWhyNow: SectionConfig = {
  index: 5, name: "whynow", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "06 · WHY NOW",
    headline: "Why this is inevitable now.",
    subHeadline: "MarCat isn't a new behavior. Supermarkets already generate the data, suppliers already visit them, brands already pay to understand them, consumers already shop there. We connect what already happens.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 0 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: {
        retailer: ["GST DIGITIZED BILLING", "EVERY SALE = DATA"],
        consumer: ["UPI + CHEAP ANDROID", "WHATSAPP COMMERCE"],
        supplier: ["SUPPLIERS ON PHONES", "BEAT DATA CAPTURABLE"],
        brand:    ["USABLE AI · CHEAP CLOUD", "REAL-TIME > PANELS"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "India digitized every participant. Nobody synchronized them.",
    bottomBand: "GST · UPI · cheap Android · WhatsApp commerce · usable AI — none of this was true five years ago",
  }),
};

// ── S7 · MARKET ─────────────────────────────────────────────────────────────
const section5: SectionConfig = {
  index: 6, name: "market", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "07 · MARKET",
    headline: "We sell cities, not India.",
    subHeadline: "Each metro holds thousands of GST-billing kiranas + hundreds of FMCG suppliers — every one a node. Density math, not TAM theatre.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 2 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: {
        brand:    ["TAM  ₹2,500 CR", "SAM  ₹600 CR", "SOM  ₹5–6 CR"],
        supplier: ["TAM  ₹1,000 CR", "SAM  ₹250 CR", "SOM  ₹4–5 CR"],
        retailer: ["TAM  ₹2,250 CR", "SAM  ₹450 CR", "SOM  ₹2–3 CR"],
        consumer: ["PHASE 3+ OPTIONALITY", "SAM ₹0 (3-YR)", "SOM ₹0 (3-YR)"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "Y3: ₹70L per metro (retailer + supplier) · ₹5.7 Cr brand-side national · ~₹13 Cr total ARR across the transaction layer.",
    bottomBand: "Out of scope: quick commerce + large modern trade chains",
  }),
};

// ── S8 · LANDSCAPE ──────────────────────────────────────────────────────────
const section6: SectionConfig = {
  index: 7, name: "landscape", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "08 · LANDSCAPE",
    headline: "Each layer has its tools.",
    subHeadline: "Every tool optimizes one participant. None synchronize all four.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 3 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: {
        brand:    ["NIELSENIQ · PANELS", "KANTAR · PANELS"],
        supplier: ["BIZOM · SFA", "FIELDASSIST · SFA"],
        retailer: ["MARG · DESKTOP ERP", "VYAPAR · TALLY"],
        consumer: ["KHATABOOK · LEDGER", "BLINKIT · 10-MIN QC"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "Bolting it on is materially harder than it looks: their systems were designed to optimize a participant — retrofitting a shared transaction across all four is a re-architecture, not a feature.",
    bottomBand: "Each layer: well-served by existing tools   ·   the connecting layer: empty",
  }),
};

// ── S9 · GTM ────────────────────────────────────────────────────────────────
const section7: SectionConfig = {
  index: 8, name: "gtm", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "09 · GTM",
    headline: "We don't build a sales engine. We ride India's distribution.",
    subHeadline: "The supermarket joins for better operations. Everyone else joins because the supermarket already did.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 0 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: {
        brand:    ["SELL-OUT BECOMES", "VISIBLE · BUILT"],
        supplier: ["END BLIND DISPATCH", "· BUILT"],
        retailer: ["OPS IMPROVE DAY ONE", "· LIVE"],
        consumer: ["STORE GOES DIGITAL", "· LIVE"],
      }[name],
      tone: "benefit" as const,
    })),
    takeaway: "Store #1 live → suppliers gain visibility → 5 founder-led stores → brands gain sell-out → the plan we're raising to run.",
    bottomBand: "Beachhead: 1 store → 5 founder-led → 15–25 paid across Ahmedabad (18–24 mo)",
  }),
};

// ── S10 · MOAT ──────────────────────────────────────────────────────────────
const section8: SectionConfig = {
  index: 9, name: "moat", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "10 · MOAT",
    headline: "Everyone owns one layer. We own two.",
    subHeadline: "The flywheel is coordination, not software: more stores → more synchronized transactions → sharper shared intelligence → more valuable for every participant → more participants.",
    contentChips: NODES.map((name) => ({
      peripheral: name, pinPair: 0 as const,
      side: SIDE[name],
      label: DISPLAY_LABEL[name],
      lines: {
        brand:    ["60-SEC SELL-OUT FEED", "PANELS = 6–8 WK LAG"],
        supplier: ["LIVE RETAILER STOCK", "BEAT-BY-MEMORY DEAD"],
        retailer: ["ONE OS, FIVE REPLACED", "DATA LIVES HERE"],
        consumer: ["CROSS-STORE KHATA", "PIN-CODE GRAPH OWNED"],
      }[name],
      tone: "benefit" as const,
    })),
    takeaway: "Incumbents built software for participants. We build infrastructure for the transaction. Every participant added makes the layer more valuable for everyone already connected.",
    bottomBand: "L1 RETAILER OS (live) · L2 SUPPLIER DMS · L3 BRAND INTELLIGENCE · L4 CREDIT & FULFILMENT\nEvery synchronized transaction increases the value of the next one",
  }),
};

// ── S11 · REVENUE ───────────────────────────────────────────────────────────
const section9: SectionConfig = {
  index: 10, name: "revenue", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "11 · REVENUE",
    headline: "How the layer monetizes.",
    subHeadline: "One supermarket → software revenue → supplier joins → brand intelligence unlocks → network services unlock.",
    contentChips: (["retailer", "consumer"] as const).map((name) => ({
      peripheral: name, pinPair: 1 as const,
      side: ({ retailer: "right", consumer: "right" } as const)[name],
      label: DISPLAY_LABEL[name],
      lines: name === "retailer"
        ? ["FREE MOBILE · 1 SLOT", "PRO · ₹15K / PC / YR", "+ ₹1 / WHATSAPP MSG"]
        : ["FREE TODAY", "PHASE 4+ MONETIZATION"],
      tone: "benefit" as const,
    })),
    takeaway: "Free tools build the coordination layer. The brand side monetizes it. Asset-light, software-only.",
    bottomBand: "Today: retailer software · As density grows: supplier + brand intelligence · Future: credit · retail media · fulfilment\nComparable: Vyapar ₹3-7K · Marg ₹8-15K · Petpooja ₹10-12K · Pro ₹15K",
  }),
};

// ── S12 · TEAM (silent — content in SilentSectionTeam.tsx) ──────────────────
const section10: SectionConfig = {
  index: 11, name: "team", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 0, showMarcatLogo: false,
    eyebrow: "12 · TEAM",
    headline: "Why now us?",
    contentChips: [],
  }),
};

// ── S13 · ASK (silent — content in SilentSectionAsk.tsx) ────────────────────
const section11: SectionConfig = {
  index: 12, name: "ask", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 0, showMarcatLogo: false,
    eyebrow: "13 · ASK",
    headline: "The ask.",
    contentChips: [],
  }),
};

// ── S14 · CLOSE (full-strength reprise; neural-network line as poetic close) ─
const section12: SectionConfig = {
  index: 13, name: "thanks", totalSubSteps: 1,
  getState: () => ({
    chipStates: allLive, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "14 · CLOSE",
    headline: "One supermarket is live. The next one makes every participant smarter.",
    subHeadline: "MarCat — the neural network for Indian FMCG retail.",
    contentChips: [],
    takeaway: "Visit the lab · Email swarbhanu@marcat.in · Download the deck ↓",
  }),
};

// v1.0 order: Identity · Insight · Solution · Transformation · Reality · WhyNow
//           · Market · Landscape · GTM · Moat · Revenue · Team · Ask · Close.
export const SECTIONS: SectionConfig[] = [
  section1, section3, section4,
  sectionFlow, sectionProof, sectionWhyNow,
  section5, section6, section7, section8, section9,
  section10, section11, section12,
];
