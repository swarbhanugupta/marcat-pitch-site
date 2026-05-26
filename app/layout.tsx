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

export const metadata: Metadata = {
  title: "MarCat /Market/ — the Neural Network for Indian FMCG Retail",
  description:
    "Four portals on one platform connecting Brand, Supplier, Retailer, Consumer. Live at the supermarket lab since 27 April 2026.",
  openGraph: {
    title: "MarCat /Market/ — the Neural Network for Indian FMCG Retail",
    description:
      "Four portals on one platform. Two live, two built. Live at the supermarket lab since 27 April 2026.",
    url: "https://pitch.marcat.in",
    siteName: "MarCat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarCat /Market/ — the Neural Network for Indian FMCG Retail",
    description:
      "Four portals on one platform. Live at the supermarket lab since 27 April 2026.",
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
