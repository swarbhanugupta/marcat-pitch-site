import { NodeNetwork } from "@/components/NodeNetwork";

export function SectionNodeDiagram() {
  return (
    <section id="section-architecture" className="min-h-screen flex flex-col items-center justify-center bg-canvas-white px-4 py-20 relative scroll-mt-12">
      <div className="flex flex-col items-center text-center w-full max-w-[1480px] relative">
        {/* Section eyebrow — matches Section 1 typographic system */}
        <div className="font-mono text-[11px] tracking-[0.28em] text-ink-muted mb-6 uppercase">
          02 · Architecture
        </div>

        {/* Headline + subhead */}
        <h2 className="text-ink text-[28px] md:text-[36px] font-bold leading-tight tracking-tight max-w-3xl">
          The connecting layer for organized retail.
        </h2>
        <p className="text-ink-muted text-base md:text-lg mt-4 max-w-2xl font-normal leading-relaxed">
          Four stakeholders. One database. Real-time coordination through MarCat.
        </p>

        {/* The chip board — load-bearing visual */}
        <div className="w-full mt-12">
          <NodeNetwork />
        </div>

        {/* Caption strip — monospace, technical */}
        <div className="mt-10 font-mono text-[11px] tracking-[0.22em] text-ink-muted/80 uppercase flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>Real-time</span>
          <span className="text-ink-muted/30">·</span>
          <span>One database</span>
          <span className="text-ink-muted/30">·</span>
          <span>Bidirectional</span>
          <span className="text-ink-muted/30">·</span>
          <span>2-node live · 2-node built</span>
        </div>
      </div>
    </section>
  );
}
