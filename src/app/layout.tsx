import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display font — modern, warm, humanist sans for headings & UI titles
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Editorial serif font — elegant, warm for scripture quotes, mission statements, and accents
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// Body/UI font — paragraphs, labels, buttons, nav (site-wide default)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
        className={`${geistMono.variable} ${plusJakartaSans.variable} ${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

