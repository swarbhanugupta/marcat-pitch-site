import { DeckProvider } from "@/components/deck/DeckProvider";
import { DeckPage } from "@/components/deck/DeckPage";
import { fetchPitchStats } from "@/lib/pitchStats";

// Server-side pull so the FIRST PAINT already carries current Banjara numbers.
// Previously the client fetched on mount, which meant every viewer saw
// FALLBACK_STATS first — and kept them if the fetch was slow, blocked by an
// ad-blocker, or filtered by a corporate network.
export const revalidate = 60;

export default async function Home() {
  const initialStats = await fetchPitchStats({ revalidate: 60 });

  return (
    <DeckProvider>
      <DeckPage initialStats={initialStats} />
    </DeckProvider>
  );
}
