import { MarCatLogo } from "./MarCatLogo";

export function MarCatChip({ animate = true }: { animate?: boolean }) {
  return (
    <div
      className="inline-flex items-center justify-center border border-marcat rounded-lg bg-canvas-white px-4 py-3"
      style={{ minWidth: 130 }}
    >
      <MarCatLogo size="chip" animate={animate} />
    </div>
  );
}
