import type { Metadata } from "next";
import { Archivo, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Bold grotesk for display + body (Paper Tiger pairs one grotesk family),
// DM Mono for the small uppercase labels (same as Paper Tiger).
const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const archivoDisplay = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Design House Istanbul — Creative Studio",
  description:
    "Design House Istanbul is a creative studio shaping brands, spaces and digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoDisplay.variable} ${dmMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
