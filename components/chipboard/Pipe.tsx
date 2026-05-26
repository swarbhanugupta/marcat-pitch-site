// Pipe — single hairline trace. Darker gray for live (survives Google Meet compression),
// dashed lighter gray for built. Tube electrons flow ON these pipes.

interface PipeProps {
  id: string;
  d: string;                    // SVG path data
  variant: "live" | "built";
}

export function Pipe({ id, d, variant }: PipeProps) {
  return (
    <>
      <defs>
        <path id={id} d={d} />
      </defs>
      <path
        d={d}
        fill="none"
        // Darker than locked spec #E5E7EB to survive screen-share compression.
        // Live = solid mid-gray, Built = dashed lighter gray.
        stroke={variant === "live" ? "#C7CCD1" : "#D1D5DB"}
        strokeWidth={2.5}
        strokeDasharray={variant === "built" ? "5 5" : undefined}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </>
  );
}
