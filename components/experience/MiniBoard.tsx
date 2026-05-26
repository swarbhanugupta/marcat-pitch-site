"use client";

// MiniBoard — small persistent thumbnail of the chip board, top-right corner.
// Visible across sections 3-12 to maintain the "one circuit board" feel.
// Subtle pulse on the MarCat chip reminds viewer the network is alive.

export function MiniBoard() {
  return (
    <div className="hidden md:flex fixed top-4 right-4 z-20 items-center gap-2 pointer-events-none">
      <div className="font-mono text-[9px] tracking-[0.22em] text-ink-muted uppercase">
        Network active
      </div>
      <svg width="64" height="44" viewBox="0 0 120 80" className="opacity-90">
        <defs>
          <radialGradient id="miniMarCat" cx="40%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#34343F" />
            <stop offset="100%" stopColor="#0A0A12" />
          </radialGradient>
          <radialGradient id="miniChip" cx="40%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#2B2B36" />
            <stop offset="100%" stopColor="#08080D" />
          </radialGradient>
        </defs>

        {/* Background grid */}
        <rect width={120} height={80} fill="#FFFFFF" />

        {/* Connection traces */}
        <line x1={60} y1={20} x2={60} y2={35} stroke="#FF6E1E" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="2 1.5" />
        <line x1={60} y1={45} x2={60} y2={60} stroke="#FF6E1E" strokeWidth={1.2} strokeOpacity={0.85} />
        <line x1={30} y1={40} x2={45} y2={40} stroke="#FF6E1E" strokeWidth={1.2} strokeOpacity={0.85} />
        <line x1={75} y1={40} x2={90} y2={40} stroke="#FF6E1E" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="2 1.5" />

        {/* Peripheral chips */}
        <rect x={50} y={4} width={20} height={14} rx={1} fill="url(#miniChip)" />
        <rect x={50} y={60} width={20} height={14} rx={1} fill="url(#miniChip)" />
        <rect x={12} y={33} width={18} height={14} rx={1} fill="url(#miniChip)" />
        <rect x={90} y={33} width={18} height={14} rx={1} fill="url(#miniChip)" />

        {/* MarCat central chip with pulse */}
        <rect x={45} y={32} width={30} height={16} rx={1} fill="url(#miniMarCat)" stroke="#FF6E1E" strokeWidth={0.5} />
        <circle cx={60} cy={40} r={2.5} fill="#FF6E1E">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
