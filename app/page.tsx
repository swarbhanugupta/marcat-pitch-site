import { DeckProvider } from "@/components/deck/DeckProvider";
import { DeckPage } from "@/components/deck/DeckPage";

export default function Home() {
  return (
    <DeckProvider>
      <DeckPage />
    </DeckProvider>
  );
}
