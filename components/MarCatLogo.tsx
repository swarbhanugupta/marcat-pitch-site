import Image from "next/image";

type Size = "hero" | "chip" | "small";

const dimensions: Record<Size, { width: number; height: number }> = {
  hero: { width: 320, height: 160 },
  chip: { width: 110, height: 55 },
  small: { width: 80, height: 40 },
};

// Brand logo. NOT animated by default — the heartbeat lives on the data flow,
// not on the logo. The chip is stable; the data is what's alive.
export function MarCatLogo({
  size = "hero",
  animate = false,
}: {
  size?: Size;
  animate?: boolean;
}) {
  const { width, height } = dimensions[size];
  return (
    <Image
      src="/marcat-logo.png"
      alt="MarCat"
      width={width}
      height={height}
      priority
      className={animate ? "animate-marcat-heartbeat" : ""}
      style={{ width, height: "auto" }}
    />
  );
}
