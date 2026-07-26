import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Device-width viewport — phones now render a dedicated MobileDeck layout
// (see components/deck/MobileDeck.tsx). The desktop deck still loads at >= 768px.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const OG_DESC =
  "One transaction, four operational decisions — synchronized. Live at Banjara, a running supermarket, since 27 April 2026.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pitch.marcat.in"),
  title: "MarCat /Market/ — The transaction layer for Indian FMCG",
  description:
    "One transaction. One shared operational state. Four participants — brand, supplier, retailer, consumer — acting from the same reality. Live at a running supermarket since 27 April 2026.",
  openGraph: {
    title: "MarCat /Market/ — The transaction layer for Indian FMCG",
    description: OG_DESC,
    url: "https://pitch.marcat.in",
    siteName: "MarCat",
    type: "website",
    // Explicit static image with a CLEAN url (no ?query) — WhatsApp's crawler
    // silently drops og:image URLs that carry a query string, which is what
    // Next's file-convention opengraph-image.png did (…?<hash>).
    images: [
      {
        url: "https://pitch.marcat.in/og.png",
        width: 1200,
        height: 630,
        alt: "MarCat — the transaction layer for Indian FMCG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MarCat /Market/ — The transaction layer for Indian FMCG",
    description: OG_DESC,
    images: ["https://pitch.marcat.in/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
