type Status = "LIVE" | "BUILT";

export function StakeholderChip({
  label,
  status,
  className = "",
}: {
  label: string;
  status: Status;
  className?: string;
}) {
  const dotColor = status === "LIVE" ? "bg-marcat-orange" : "bg-ink-muted";
  const textColor = status === "LIVE" ? "text-marcat-orange" : "text-ink-muted";

  return (
    <div
      className={`inline-flex flex-col items-stretch border border-line rounded-lg bg-canvas-white px-4 py-2 min-w-[140px] ${className}`}
    >
      <div className="text-sm font-medium text-ink leading-tight">{label}</div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span className={`text-[10px] font-medium tracking-wide ${textColor}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
