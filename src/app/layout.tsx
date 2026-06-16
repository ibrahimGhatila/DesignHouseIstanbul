import type { Metadata } from "next";
import { Archivo, DM_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";

// Heavy, tight grotesk for display (à la the inspiration), regular for body.
const archivoDisplay = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Design House Istanbul — Creative Portfolio Mentorship",
  description:
    "Design House Istanbul helps ambitious students build standout portfolios and win places at the world's best art & design schools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoDisplay.variable} ${archivo.variable} ${dmMono.variable}`}
    >
      <body>
        <Grain />
        <Cursor />
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
