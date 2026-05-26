import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // MarCat brand (rare accent — MarCat-marked surfaces only)
        marcat: {
          DEFAULT: "#FF6E1E",
          orange: "#FF6E1E",
          gold: "#FBA924",
          soft: "#FFF4EB",
          tint: "#FFF8F3",
        },
        // Canvas
        canvas: {
          DEFAULT: "#FFFFFF",
          white: "#FFFFFF",
          soft: "#FAFAF7",
          alt: "#FAFAF7",
        },
        // Text — locked spec
        ink: {
          DEFAULT: "#000000",
          strong: "#000000",
          body: "#0A0A0A",
          mute: "#6B6B6B",
          muted: "#6B6B6B",
        },
        // Hairlines — Vercel-grade
        line: {
          DEFAULT: "#E5E7EB",
          hairline: "#E5E7EB",
          soft: "#F0F0F0",
          marcat: "#FF6E1E",
        },
        // Clinical red (Section 3 error cards only)
        clinical: {
          red: "#C64545",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "marcat-gradient":
          "linear-gradient(135deg, #FF6E1E 0%, #FBA924 100%)",
      },
      transitionTimingFunction: {
        marcat: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        // Heartbeat rhythm — lub (strong) → brief rest → dub (softer) → long rest → repeat
        // Two beats per cycle. Reads as "the network is alive" not a metronome.
        "marcat-heartbeat": {
          "0%":   { opacity: "0.95", transform: "scale(1)" },
          "14%":  { opacity: "1.00", transform: "scale(1.04)" },   /* lub */
          "28%":  { opacity: "0.96", transform: "scale(1)" },
          "42%":  { opacity: "0.99", transform: "scale(1.025)" },  /* dub */
          "70%":  { opacity: "0.95", transform: "scale(1)" },      /* rest */
          "100%": { opacity: "0.95", transform: "scale(1)" },
        },
        // Section 7 only — same rhythm, deeper opacity dip
        "marcat-heartbeat-strong": {
          "0%":   { opacity: "0.85", transform: "scale(1)" },
          "14%":  { opacity: "1.00", transform: "scale(1.06)" },
          "28%":  { opacity: "0.88", transform: "scale(1)" },
          "42%":  { opacity: "0.97", transform: "scale(1.03)" },
          "70%":  { opacity: "0.85", transform: "scale(1)" },
          "100%": { opacity: "0.85", transform: "scale(1)" },
        },
        // Section 12 — same rhythm, faster cadence (handled via duration, not keyframes)
      },
      animation: {
        // Default cadence ~1.4s (between human resting 60 BPM and a calmer 45 BPM)
        "marcat-heartbeat": "marcat-heartbeat 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "marcat-heartbeat-strong": "marcat-heartbeat-strong 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        // Section 12 close — faster cadence (~1s, signals "the network is at full power")
        "marcat-heartbeat-fast": "marcat-heartbeat 1.0s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
