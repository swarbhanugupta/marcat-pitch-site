"use client";

import { COLORS } from "@/lib/tokens";
import type { ContentChipSpec } from "@/lib/sections-config";

interface MobileContentCardProps {
  spec: ContentChipSpec;
}

export function MobileContentCard({ spec }: MobileContentCardProps) {
  const accentColor =
    spec.tone === "error" ? "#C64545" :
    spec.tone === "benefit" ? COLORS.marcat :
    "#4B5563";

  const borderColor = accentColor;
  const bodyTextColor = spec.tone === "error" ? "#C64545" : "#1F2937";

  return (
    <div
      className="relative border-2 bg-white rounded-md px-4 py-4"
      style={{ borderColor }}
    >
      {/* Accent corner square */}
      <div
        className="absolute top-3 left-3 w-2 h-2"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
      {/* Header */}
      <div className="font-mono text-[14px] font-bold tracking-[0.04em] text-ink ml-5 mb-2">
        {spec.label}
      </div>
      {/* Hairline */}
      <div className="border-t border-line mb-3" />
      {/* Body lines */}
      <div className="space-y-1">
        {spec.lines.map((line, i) => (
          <div
            key={i}
            className="font-sans text-[15px] font-bold leading-snug"
            style={{ color: bodyTextColor }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
