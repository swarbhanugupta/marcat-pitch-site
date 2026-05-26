// Shared section primitives — eyebrow + header — so every section reads as part of one system.

export function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className="font-mono text-[11px] tracking-[0.28em] text-ink-muted mb-6 uppercase">
      {number} · {label}
    </div>
  );
}

export function SectionHeader({
  number,
  label,
  headline,
  subhead,
}: {
  number: string;
  label: string;
  headline: string;
  subhead?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center mb-14">
      <SectionEyebrow number={number} label={label} />
      <h2 className="text-ink text-[28px] md:text-[36px] font-bold leading-[1.15] tracking-tight max-w-4xl">
        {headline}
      </h2>
      {subhead && (
        <p className="text-ink-muted text-base md:text-lg mt-4 max-w-2xl font-normal leading-relaxed">
          {subhead}
        </p>
      )}
    </div>
  );
}

export function SectionBand({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 font-mono text-[11px] tracking-[0.22em] text-ink-muted/80 uppercase flex flex-wrap items-center justify-center gap-x-6 gap-y-2 max-w-3xl text-center">
      {children}
    </div>
  );
}

export function SectionContainer({
  children,
  dark = false,
  id,
}: {
  children: React.ReactNode;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 py-24 scroll-mt-12 ${
        dark ? "bg-[#0A0A0F] text-white" : "bg-canvas-white"
      }`}
    >
      {/* Blueprint-grid backdrop — invisible reminder this is the same circuit board */}
      {!dark && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
      )}
      <div className="w-full max-w-[1280px] flex flex-col items-center relative z-10">
        {children}
      </div>
    </section>
  );
}
