import type { Metadata } from "next";
import { Geist_Mono, Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Primary Body & UI font — warm, approachable, human-centric (from tbheducator.com)
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Primary Display & Editorial font — timeless, elegant, dignified serif (from tbheducator.com)
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Restoring Life Family Community Center | Welcome Home",
  description: "A place where everyone belongs. Join us for worship, community, and spiritual growth.",
  keywords: ["church", "ministry", "worship", "community", "faith", "spiritual growth"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${manrope.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

