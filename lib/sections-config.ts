// Section configuration — data-driven specs for all 14 sections.
// Each section declares its sub-step count + visual state per sub-step.
//
// v3 (grounded, 2026-07-06): +3 sections after Solution —
//   04 HOW IT WORKS (transaction-flow decode), 05 PROOF (Banjara evidence),
//   06 WHY NOW. Neural-network hero kept; new sections cash the framing with
//   a concrete loop + real proof + timing. Flow slide is framed LIVE/BUILT so
//   the animation never overclaims the un-wired brand/supplier legs.

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
    headline: "The neural network for Indian FMCG retail.",
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
      side: SIDE[name],
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
      side: SIDE[name],
      label: name.toUpperCase(),
      lines: benefitShifts[name],
      tone: "benefit" as const,
    })),
    systemBand: "6 PORTALS · 1 PLATFORM · 7 AI ENDPOINTS (MORNING-BRIEF · COPILOT · PHOTO-VERIFY)",
    takeaway: "13 million kiranas. One network.",
  }),
};

// SECTION (NEW) 04 — How it works (transaction flow).
// The "decode sentence" the deck was missing + the loop, mapped onto the 4 nodes.
// Framed LIVE/BUILT: retailer + consumer legs are real today; distributor + brand
// legs activate when those nodes light up — so the animated flow never overclaims.
const sectionFlow: SectionConfig = {
  index: 3, name: "how", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "04 · HOW IT WORKS",
    headline: "One sale. Every node updates.",
    subHeadline: "A single kirana sale becomes a shared commercial event — live for the retailer today, and for the distributor and brand the moment their node lights up.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 2 as const,
      side: SIDE[name],
      label: name.toUpperCase(),
      lines: {
        retailer: ["① SALE RINGS UP", "STOCK DROPS LIVE", "GST BILL, INSTANT"],
        supplier: ["② DEMAND SIGNAL", "REORDER SURFACES", "BEAT GETS SMART"],
        brand:    ["③ SELL-OUT, LIVE", "NO 6–8 WK PANEL", "PER-STORE TRUTH"],
        consumer: ["④ LOYALTY ACCRUES", "REORDER PREDICTED", "STORE REMEMBERS"],
      }[name],
      tone: "benefit" as const,
    })),
    systemBand: "SALE → STOCK → DEMAND → SELL-OUT → LOYALTY → AI REORDER",
    takeaway: "The transaction is the network. Every sale tightens it.",
    bottomBand: "Steps ① ④ LIVE today (retailer + consumer)   ·   Steps ② ③ activate the moment a distributor or brand node lights up",
  }),
};

// SECTION (NEW) 05 — Proof / evidence.
// Real Banjara-lab numbers, pulled 2026-07-06 (read-only, store 83d9e3dc…).
// Live POS bills carry status='completed'; status='saved' rows are imported Marg
// history (42,303, pre-Apr) and are EXCLUDED — only MarCat-processed bills count.
//   completed bills since 27 Apr: 11,324 · GMV ₹10.5L · ~65 days live · ~175/day
//   active SKUs: 6,614 · customers: 3,372
// AI (7) + WhatsApp (14) counts deliberately OMITTED — too small to help; would
// undercut the claim. Framed "the software is real", NOT "we have paying demand".
const sectionProof: SectionConfig = {
  index: 4, name: "proof", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "05 · PROOF",
    headline: "Not a prototype. A running store.",
    subHeadline: "Live at the supermarket lab since 27 April 2026 — real bills, real customers, every single day.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 3 as const,
      side: SIDE[name],
      label: name.toUpperCase(),
      lines: {
        retailer: proofRetailerLines(FALLBACK_STATS),
        consumer: proofConsumerLines(FALLBACK_STATS),
        supplier: ["BUILT · NOT YET LIVE", "1ST DISTRIBUTOR NEXT", "—"],
        brand:    ["BUILT · NOT YET LIVE", "1ST BRAND PILOT NEXT", "—"],
      }[name],
      tone: "benefit" as const,
    })),
    systemBand: proofSystemBand(FALLBACK_STATS),
    takeaway: "The platform is production-grade. The demand test is what we raise for.",
    bottomBand: "Captive R&D lab, not a paying customer — proof the software runs at real retail scale, not proof of market demand",
  }),
};

// SECTION (NEW) 06 — Why now.
const sectionWhyNow: SectionConfig = {
  index: 5, name: "whynow", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "06 · WHY NOW",
    headline: "Why this is inevitable now.",
    subHeadline: "Five shifts just made a connected kirana network buildable for the first time.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 0 as const,
      side: SIDE[name],
      label: name.toUpperCase(),
      lines: {
        retailer: ["GST DIGITIZED BILLING", "EVERY SALE = DATA", "COMPLIANCE → CLOUD"],
        consumer: ["UPI + CHEAP ANDROID", "WHATSAPP COMMERCE", "KIRANA GOES DIGITAL"],
        supplier: ["DISTRIBUTORS ON PHONES", "BEAT DATA CAPTURABLE", "SFA NORMALIZED"],
        brand:    ["USABLE AI · CHEAP CLOUD", "REAL-TIME > PANELS", "SELL-OUT AFFORDABLE"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "The rails now exist. The wire between them doesn't. That's the opening.",
    bottomBand: "GST · UPI · cheap Android · WhatsApp commerce · usable AI — none of this was true five years ago",
  }),
};

// SECTION 07 — Market (single view: TAM/SAM/SOM badges + per-metro Y3 model).
// SOM numbers REBUILT from validated web data: Bizom blended ARPU ₹12L/brand
// (not ₹50L), 5-7% SMB SaaS conversion (not 15%), FieldAssist DMS ₹4-6L per
// distributor (not ₹30L). Full agent audit ran 2026-05-24.
const section5: SectionConfig = {
  index: 6, name: "market", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "07 · MARKET",
    headline: "We sell cities, not India.",
    subHeadline: "Each metro holds thousands of GST-billing kiranas + hundreds of FMCG distributors — every one a node.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 2 as const,
      side: SIDE[name],
      label: name.toUpperCase(),
      lines: {
        brand:    ["TAM  ₹2,500 CR", "SAM  ₹600 CR", "SOM  ₹5–6 CR"],
        supplier: ["TAM  ₹1,000 CR", "SAM  ₹250 CR", "SOM  ₹4–5 CR"],
        retailer: ["TAM  ₹2,250 CR", "SAM  ₹450 CR", "SOM  ₹2–3 CR"],
        consumer: ["PHASE 3+ OPTIONALITY", "SAM ₹0 (3-YR)", "SOM ₹0 (3-YR)"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "Y3: ₹70L per metro baseline (retailer + supplier) · ₹5.7 Cr brand-side national (46 brands × per-city) · ~₹13 Cr total network ARR.",
    bottomBand: "Out of scope: quick commerce + large modern trade chains",
  }),
};

// SECTION 08 — Landscape (reframed from "Competition" — no threat signaling.
// Frames named companies as TOOLS per layer; MarCat sits as the connecting layer above.)
const section6: SectionConfig = {
  index: 7, name: "landscape", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "08 · LANDSCAPE",
    headline: "Each layer has its tools.",
    subHeadline: "We built ours at all four — and the wire that connects them.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 3 as const,
      side: SIDE[name],
      label: name.toUpperCase(),
      lines: {
        brand:    ["NIELSENIQ · PANELS", "KANTAR · PANELS", "BIZOM · SFA"],
        supplier: ["BIZOM · SFA", "FIELDASSIST · SFA", "CHANNELPLAY · MERCH"],
        retailer: ["MARG · DESKTOP ERP", "VYAPAR · MOBILE SMB", "TALLY · ACCOUNTS"],
        consumer: ["KHATABOOK · LEDGER", "BLINKIT · 10-MIN QC", "KIRANA APP: OPEN"],
      }[name],
      tone: "neutral" as const,
    })),
    takeaway: "Every incumbent monetizes one layer. Connecting all four cannibalizes their own model — so they won't.",
    bottomBand: "Each layer: well-served by existing tools   ·   The connecting layer: empty   ·   MarCat: 4 chips · 3-month build · live since 27 April 2026",
  }),
};

// SECTION 09 — GTM (viral graph + unfair channel)
const section7: SectionConfig = {
  index: 8, name: "gtm", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "09 · GTM",
    headline: "We don't build a sales engine. We ride India's distribution.",
    subHeadline: "A distributor's salesman onboards a kirana → his orders go digital, his beat gets faster, his schemes get visible. He has a reason to spread us.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 0 as const,
      side: SIDE[name],
      label: name.toUpperCase(),
      lines: {
        brand:    ["1 BRAND SIGNED →", "2,000+ RETAILERS/CITY", "+ 10 DISTRIBUTORS"],
        supplier: ["1 DISTRIBUTOR SIGNED →", "150+ RETAILERS", "+ BEAT DATA LIVE"],
        retailer: ["1 STORE SIGNED →", "100+ DISTRIBUTOR LINKS", "+ 3,000+ CUSTOMERS"],
        consumer: ["1 CUSTOMER SIGNED →", "CROSS-STORE LOYALTY", "+ DEMAND SIGNAL"],
      }[name],
      tone: "benefit" as const,
    })),
    takeaway: "Every new node has a reason to onboard the next. The graph pulls itself tight.",
    bottomBand: "Beachhead: 1 store → 5 founder-led → 10–15 paid across Ahmedabad (15 mo) — proof of repeatability before city-scale",
  }),
};

// SECTION 10 — Moat (telegraph-bullet format to match S2/S3/S5/S6 visual style)
const section8: SectionConfig = {
  index: 9, name: "moat", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "10 · MOAT",
    headline: "Everyone owns one layer. We own two.",
    subHeadline: "Bizom owns the salesman. Marg owns the till. No one has built for both the till and the warehouse feeding it. We have — and that adjacency compounds as each node goes live.",
    contentChips: (["brand", "consumer", "supplier", "retailer"] as const).map((name) => ({
      peripheral: name, pinPair: 0 as const, // looped back to 0
      side: SIDE[name],
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

// SECTION 11 — Revenue
const section9: SectionConfig = {
  index: 10, name: "revenue", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "11 · REVENUE",
    headline: "How we charge.",
    subHeadline: "Pricing model live. First paying customer onboards post-incubation.",
    contentChips: (["retailer", "consumer"] as const).map((name) => ({
      peripheral: name, pinPair: 1 as const, // looped
      side: ({ retailer: "right", consumer: "right" } as const)[name],
      label: name.toUpperCase(),
      lines: name === "retailer"
        ? ["FREE MOBILE · 1 SLOT", "PRO · ₹15K / PC / YR", "+ ₹1 / WHATSAPP MSG"]
        : ["FREE TODAY", "PHASE 4+ MONETIZATION"],
      tone: "benefit" as const,
    })),
    takeaway: "Asset-light. Software-only. No inventory, no fulfillment.",
    bottomBand: "Comparable: Vyapar ₹3-7K · Marg ₹8-15K · Petpooja ₹10-12K · Retailer Portal Pro ₹15K",
  }),
};

// SECTION 12 — Team (silent — no chip board)
const section10: SectionConfig = {
  index: 11, name: "team", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 0, showMarcatLogo: false,
    eyebrow: "12 · TEAM",
    headline: "The team.",
    contentChips: [],
  }),
};

// SECTION 13 — Ask (silent — no chip board)
const section11: SectionConfig = {
  index: 12, name: "ask", totalSubSteps: 1,
  getState: () => ({
    chipStates: DEFAULT_BOARD_STATE, boardOpacity: 0, showMarcatLogo: false,
    eyebrow: "13 · ASK",
    headline: "The ask.",
    contentChips: [],
  }),
};

// SECTION 14 — Close (full-strength chip reprise + bold manifesto)
const section12: SectionConfig = {
  index: 13, name: "thanks", totalSubSteps: 1,
  getState: () => ({
    chipStates: allLive, boardOpacity: 1, showMarcatLogo: true,
    eyebrow: "14 · CLOSE",
    headline: "We've built the network. Now we light it up.",
    subHeadline: "3 months of build. Live at the supermarket lab since 27 April 2026.",
    contentChips: [],
    takeaway: "Visit the lab · Email swarbhanu@marcat.in · Download the deck ↓",
  }),
};

// Section 2 (standalone Architecture) was merged into section1 — chip board
// now appears once as the hero with the "two live / two built" honesty layer.
// v3 order: Title · Problem · Solution · HowItWorks · Proof · WhyNow ·
//           Market · Landscape · GTM · Moat · Revenue · Team · Ask · Close.
export const SECTIONS: SectionConfig[] = [
  section1, section3, section4,
  sectionFlow, sectionProof, sectionWhyNow,
  section5, section6, section7, section8, section9,
  section10, section11, section12,
];
