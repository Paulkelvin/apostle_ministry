import type { Metadata } from "next";
import { Geist_Mono, Fraunces, Inter } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display font — headings, hero titles, section titles only
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
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
        className={`${geistMono.variable} ${fraunces.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

