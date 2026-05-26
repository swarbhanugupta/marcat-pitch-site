// Shared SVG <defs> for the entire chip board.

export function ChipDefs() {
  return (
    <defs>
      {/* Peripheral chip body */}
      <radialGradient id="chipBodyPeripheral" cx="32%" cy="22%" r="85%">
        <stop offset="0%" stopColor="#2B2B36" />
        <stop offset="55%" stopColor="#16161E" />
        <stop offset="100%" stopColor="#08080D" />
      </radialGradient>

      {/* MarCat chip body — slightly warmer/brighter */}
      <radialGradient id="chipBodyMarcat" cx="32%" cy="22%" r="90%">
        <stop offset="0%" stopColor="#34343F" />
        <stop offset="55%" stopColor="#1A1A22" />
        <stop offset="100%" stopColor="#0A0A12" />
      </radialGradient>

      {/* Bevel highlight overlay */}
      <linearGradient id="chipBevel" x1={0} y1={0} x2={0} y2={1}>
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.18} />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0} />
        <stop offset="100%" stopColor="#000000" stopOpacity={0.45} />
      </linearGradient>

      {/* Pin gradients */}
      <linearGradient id="pinGradV" x1={0} y1={0} x2={1} y2={0}>
        <stop offset="0%" stopColor="#4A4A52" />
        <stop offset="50%" stopColor="#C8C8D0" />
        <stop offset="100%" stopColor="#3A3A42" />
      </linearGradient>
      <linearGradient id="pinGradH" x1={0} y1={0} x2={0} y2={1}>
        <stop offset="0%" stopColor="#4A4A52" />
        <stop offset="50%" stopColor="#C8C8D0" />
        <stop offset="100%" stopColor="#3A3A42" />
      </linearGradient>

      {/* Die tile pattern — silicon texture */}
      <pattern id="dieTiles" x={0} y={0} width={10} height={10} patternUnits="userSpaceOnUse">
        <rect width={10} height={10} fill="#0C0C14" />
        <rect x={0.5} y={0.5} width={9} height={9} fill="none" stroke="#1A1A24" strokeWidth={0.4} />
      </pattern>

      {/* Electron glow — wide soft orange halo around tubes */}
      <filter id="electronGlow" x="-300%" y="-300%" width="600%" height="600%">
        <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="haloFar" />
        <feColorMatrix
          in="haloFar"
          type="matrix"
          values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 0.65 0"
          result="haloFarOrange"
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation={2} result="haloMid" />
        <feColorMatrix
          in="haloMid"
          type="matrix"
          values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 0.9 0"
          result="haloMidOrange"
        />
        <feMerge>
          <feMergeNode in="haloFarOrange" />
          <feMergeNode in="haloMidOrange" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Chip arrival glow — orange halo when an electron tube arrives at the chip */}
      <filter id="chipReceiveGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="receiveBlur" />
        <feColorMatrix
          in="receiveBlur"
          type="matrix"
          values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 1.0 0"
          result="receiveOrange"
        />
        <feMerge>
          <feMergeNode in="receiveOrange" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* MarCat hover glow */}
      <filter id="marcatHoverGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation={6} result="hoverBlur" />
        <feColorMatrix
          in="hoverBlur"
          type="matrix"
          values="1 0 0 0 1   0 0.43 0 0 0.43   0 0 0.12 0 0.12   0 0 0 1.1 0"
          result="hoverOrange"
        />
        <feMerge>
          <feMergeNode in="hoverOrange" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Chip drop shadow — depth on white canvas */}
      <filter id="chipShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceAlpha" stdDeviation={8} />
        <feOffset dx={0} dy={6} result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope={0.22} />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Dead chip filter — desaturate (Section 3 kill state) */}
      <filter id="chipDeadFilter">
        <feColorMatrix
          type="matrix"
          values="0.3 0.3 0.3 0 0
                  0.3 0.3 0.3 0 0
                  0.3 0.3 0.3 0 0
                  0   0   0   1 0"
        />
      </filter>

      {/* Subtle blueprint grid backdrop */}
      <pattern id="bpGridMinor" x={0} y={0} width={32} height={32} patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" strokeWidth={0.5} strokeOpacity={0.04} />
      </pattern>
      <pattern id="bpGridMajor" x={0} y={0} width={128} height={128} patternUnits="userSpaceOnUse">
        <path d="M 128 0 L 0 0 0 128" fill="none" stroke="#000000" strokeWidth={0.5} strokeOpacity={0.08} />
      </pattern>
      <radialGradient id="bgVignette" cx="50%" cy="45%" r="80%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#FDFDFA" />
        <stop offset="100%" stopColor="#F7F7F1" />
      </radialGradient>
    </defs>
  );
}
