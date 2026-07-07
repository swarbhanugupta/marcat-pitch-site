// Downloads the pre-generated brochure PDF (built by marcat-qa/gen-brochure-pdf.mjs
// via Playwright page.pdf) — a real file, not window.print(), so it's clean and
// consistent regardless of the viewer's print dialog. Regenerate after content edits.
export function PrintButton() {
  return (
    <a
      href="/marcat-brochure.pdf"
      download="MarCat-brochure.pdf"
      className="fixed top-5 right-5 z-50 print:hidden rounded-full border border-line bg-canvas-white/90 backdrop-blur px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-body no-underline hover:border-marcat-orange hover:text-marcat-orange transition-colors"
      aria-label="Download brochure as PDF"
    >
      ↓ PDF
    </a>
  );
}
