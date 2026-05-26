// Section configuration — data-driven specs for all 12 sections.
// Each section declares its sub-step count + visual state per sub-step.

import type { ChipName, ChipState } from "@/lib/tokens";
import { DEFAULT_BOARD_STATE } from "@/lib/tokens";

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

// Helpers
const allLive: Record<ChipName, ChipState> = {
  marcat: "live", brand: "live", consumer: "live", supplier: "live", retailer: "live",
};
const dead: Record<ChipName, ChipState> = {
  ...DEFAULT_BOARD_STATE, marcat: "dead",
};
// allDead — used in Section 3 kill-MarCat demo. When MarCat dies, the network it
// holds together collapses: every peripheral drops to dead state too. Without this,
// "Switch off MarCat → Retailer LIVE" reads as self-contradicting.
const allDead: Record<ChipName, ChipState> = {
  marcat: "dead", brand: "dead", consumer: "dead", supplier: "dead", retailer: "dead",
};
const allDim: Record<ChipName, ChipState> = {
  marcat: "dim", brand: "dim", consumer: "dim", supplier: "dim", retailer: "dim",
};

// SECTION 1 — Title + Architecture (merged hero). Pronunciation folded into
// subhead so no bottom band needed — chip board gets full vertical space.
const section1: SectionConfig = {
  index: 0, name: "title", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE,
    boardOpacity: 1, showMarcatLogo: true,
    headline: "The Neural Network for Indian FMCG Retail.",
    subHeadline: "MarCat /Market/ — two nodes live in production, two built.",
    contentChips: [],
  }),
};

// SECTION 3 — Problem (kill MarCat, problem chips appear)
// Lines truncated to fit chip width at Google Meet 720p — 3 punchiest per node.
const problemErrors = {
  brand:    ["SELL-OUT: 6–8 WEEKS STALE", "STOCKOUTS: INVISIBLE", "PROMOS: 94% FAIL"],
  supplier: ["BEAT: SALESMAN MEMORY", "RETAILER STOCK: 0% VISIBLE", "SCHEMES: 2H/DAY MANUAL"],
  retailer: ["STOCK ≠ SALES", "EXPIRY: SHELF-WALK", "MARKETING: PAPER"],
  consumer: ["ORDER FROM KIRANA: ✗", "NEIGHBOR STOCK: ✗", "LOYALTY: PAPER KHATA"],
};

// SECTION 2 — Problem (single view: dead network + 4 error cards + takeaway)
const section3: SectionConfig = {
  index: 1, name: "problem", totalSubSteps: 1,
  getState: () => ({
    chipStates: allDead,
    boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "02 · PROBLEM",
    headline: "Imagine MarCat doesn't exist.",
    subHeadline: "This is your world today.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name,
      pinPair: 0 as const,
      side: ({ brand: "left", consumer: "right", supplier: "left", retailer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: problemErrors[name],
      tone: "error" as const,
    })),
    takeaway: "13 million kiranas. Zero network.",
  }),
};

// SECTION 4 — Solution
// Telegraph form to fit 260w chip at 13px mono (~29 chars max per line).
const benefitShifts: Record<"brand" | "supplier" | "retailer" | "consumer", string[]> = {
  brand:    ["LIVE SELL-OUT GRAPH", "60-DAY LAG → REAL-TIME", "PANELS → STREAM"],
  supplier: ["EACH SHELF, BEFORE BEAT", "STOCK + SCHEMES LIVE", "MEMORY → DATA"],
  retailer: ["ONE OS, NOT FIVE TOOLS", "BILLS · STOCK · KHATA", "ACCOUNTING → OPS"],
  consumer: ["KIRANA WITH AN APP", "CROSS-STORE LOYALTY", "STORE COMES TO YOU"],
};

// SECTION 3 — Solution (single view: live network + 4 benefit cards + system band + takeaway)
const section4: SectionConfig = {
  index: 2, name: "solution", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "03 · SOLUTION",
    headline: "Switch the network on.",
    subHeadline: "Retailer + Consumer live. Brand + Supplier built, ready to activate.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 1 as const,
      side: ({ brand: "left", consumer: "right", supplier: "left", retailer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: benefitShifts[name],
      tone: "benefit" as const,
    })),
    systemBand: "4 PORTALS · 1 PLATFORM · 311 ROUTES · 7 AI ENDPOINTS (MORNING-BRIEF · COPILOT · PHOTO-VERIFY)",
    takeaway: "13 million kiranas. One network.",
  }),
};

// SECTION 4 — Market (single view: TAM/SAM/SOM badges + per-metro Y3 model).
// SOM numbers REBUILT from validated web data: Bizom blended ARPU ₹12L/brand
// (not ₹50L), 5-7% SMB SaaS conversion (not 15%), FieldAssist DMS ₹4-6L per
// distributor (not ₹30L). Full agent audit ran 2026-05-24.
const section5: SectionConfig = {
  index: 3, name: "market", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "04 · MARKET",
    headline: "We sell cities, not India.",
    subHeadline: "Each city unlocks ~2,000 GST-billing kiranas + ~500 FMCG distributors + brand-side data access.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 2 as const,
      side: ({ brand: "left", consumer: "right", supplier: "left", retailer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: {
        brand:    ["TAM  ₹2,500 Cr", "SAM  ₹600 Cr", "SOM  ₹5–6 Cr"],
        supplier: ["TAM  ₹1,000 Cr", "SAM  ₹250 Cr", "SOM  ₹4–5 Cr"],
        retailer: ["TAM  ₹2,250 Cr", "SAM  ₹450 Cr", "SOM  ₹2–3 Cr"],
        consumer: ["Phase 3+ optionality", "SAM ₹0 (3-yr)", "SOM ₹0 (3-yr)"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "Y3: ₹70L per metro baseline (retailer + supplier) · ₹5.7 Cr brand-side national (46 brands × per-city) · ~₹13 Cr total network ARR.",
    bottomBand: "Out of scope: quick commerce + large modern trade chains",
  }),
};

// SECTION 5 — Landscape (reframed from "Competition" — no threat signaling.
// Frames named companies as TOOLS per layer; MarCat sits as the connecting layer above.)
const section6: SectionConfig = {
  index: 4, name: "landscape", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "05 · LANDSCAPE",
    headline: "Each layer has its tools.",
    subHeadline: "We built ours at all four — and the wire that connects them.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 3 as const,
      side: ({ brand: "left", consumer: "right", supplier: "left", retailer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: {
        brand:    ["NIELSENIQ · PANELS", "KANTAR · PANELS", "BIZOM · SFA"],
        supplier: ["BIZOM · SFA", "FIELDASSIST · SFA", "CHANNELPLAY · MERCH"],
        retailer: ["MARG · DESKTOP ERP", "VYAPAR · MOBILE SMB", "TALLY · ACCOUNTS"],
        consumer: ["KHATABOOK · LEDGER", "BLINKIT · 10-MIN QC", "KIRANA APP: OPEN"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "ONDC is a protocol. MarCat is the retail OS. We integrate ONDC the day a retailer asks.",
    bottomBand: "Each layer: well-served by existing tools   ·   The connecting layer: empty   ·   MarCat: 4 chips · 3-month build · live since 27 April 2026",
  }),
};

// SECTION 6 — GTM (viral graph + unfair channel)
const section7: SectionConfig = {
  index: 5, name: "gtm", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "06 · GTM",
    headline: "We don't build a sales engine. We ride India's distribution.",
    subHeadline: "FMCG distributor salesmen visit every kirana daily. We're a kirana. They sell us to other kiranas.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 0 as const,
      side: ({ brand: "left", consumer: "right", supplier: "left", retailer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: {
        brand:    ["1 BRAND signed →", "2,000+ retailers/city", "+ 10 distributors"],
        supplier: ["1 DISTRIBUTOR signed →", "150+ retailers", "+ beat data live"],
        retailer: ["1 STORE signed →", "100+ distributor links", "+ 3,000+ customers"],
        consumer: ["1 CUSTOMER signed →", "cross-store loyalty", "+ demand signal"],
      }[name],
      tone: "benefit" as const,
    })),
    takeaway: "Every new node onboards the others. The graph pulls itself tight.",
    bottomBand: "Beachhead: 1 store → 5 founder-led → 15 paid across Ahmedabad (18 mo) = 0.75% of ~2,000 metro GST kirana cohort",
  }),
};

// SECTION 7 — Moat (telegraph-bullet format to match S2/S3/S5/S6 visual style)
const section8: SectionConfig = {
  index: 6, name: "moat", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "07 · MOAT",
    headline: "What makes us inevitable.",
    subHeadline: "Moats compound across the chain.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 0 as const, // looped back to 0
      side: ({ brand: "left", consumer: "right", supplier: "left", retailer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: {
        brand:    ["60-SEC SELL-OUT FEED", "PANELS = 6-8 WK LAG", "DATA MOAT COMPOUNDS"],
        supplier: ["LIVE RETAILER STOCK", "BEAT-BY-MEMORY DEAD", "TRADE SPEND VISIBLE"],
        retailer: ["ONE OS, FIVE REPLACED", "SWITCH = REINSTALL 5", "DATA LIVES HERE"],
        consumer: ["CROSS-STORE KHATA", "HISTORY DOESN'T PORT", "PIN-CODE GRAPH OWNED"],
      }[name],
      tone: "benefit" as const,
    })),
    takeaway: "The graph compounds. Switching costs grow with use.",
    bottomBand: "L1 TECH (live, deep market penetration through Y5) · L2 FULFILLMENT (Y5) · L3 CREDIT ACROSS NODES (Y8) · L4 AI-GUIDED COMPLETE INFRA (Y10+)\nGST CHAIN COMPOUNDS WITH EVERY NEW NODE LIVE — retailer today, full chain at L2",
  }),
};

// SECTION 9 — Revenue
const section9: SectionConfig = {
  index: 7, name: "revenue", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "08 · REVENUE",
    headline: "How we charge.",
    subHeadline: "Pricing model live. Customer #2 onboards post-incubation.",
    contentChips: (["retailer", "consumer"] as const).map((name) => ({
      peripheral: name, pinPair: 1 as const, // looped
      side: ({ retailer: "right", consumer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: name === "retailer"
        ? ["Free Mobile · 1 slot", "Pro · ₹15K / PC / yr", "+ ₹1 / WhatsApp msg"]
        : ["Free today", "Phase 4+ monetization"],
      tone: "benefit" as const,
    })),
    takeaway: "Asset-light. Software-only. No inventory, no fulfillment.",
    bottomBand: "Comparable: Vyapar ₹3-7K · Marg ₹8-15K · Petpooja ₹10-12K · Retailer Portal Pro ₹15K",
  }),
};

// SECTION 10 — Team (silent — no chip board)
const section10: SectionConfig = {
  index: 8, name: "team", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 0, showMarcatLogo: false,
    eyebrow: "09 · TEAM",
    headline: "The team.",
    contentChips: [],
  }),
};

// SECTION 11 — Ask (silent — no chip board)
const section11: SectionConfig = {
  index: 9, name: "ask", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 0, showMarcatLogo: false,
    eyebrow: "10 · ASK",
    headline: "The ask.",
    contentChips: [],
  }),
};

// SECTION 11 — Close (full-strength chip reprise + bold manifesto)
const section12: SectionConfig = {
  index: 10, name: "thanks", totalSubSteps: 1,
  getState: () => ({
    chipStates: allLive, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "11 · CLOSE",
    headline: "We've built the network. Now we light it up.",
    subHeadline: "3 months of build. Live at the supermarket lab since 27 April 2026.",
    contentChips: [],
    takeaway: "Visit the lab · Email swarbhanu@marcat.in · Download the deck ↓",
  }),
};

// Section 2 (standalone Architecture) was merged into section1 — chip board
// now appears once as the hero with the "two live / two built" honesty layer.
export const SECTIONS: SectionConfig[] = [
  section1, section3, section4, section5, section6,
  section7, section8, section9, section10, section11, section12,
];
