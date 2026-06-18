import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://design-house-istanbul.vercel.app";
const TITLE = "Design House Istanbul — Creative Portfolio Mentorship";
const DESCRIPTION =
  "Design House Istanbul helps ambitious students build standout portfolios and win places at the world's best art & design schools. 1-on-1 mentorship, portfolio development and admissions strategy.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Design House Istanbul",
  },
  description: DESCRIPTION,
  applicationName: "Design House Istanbul",
  keywords: [
    "portfolio mentorship",
    "art school portfolio",
    "design school admissions",
    "Istanbul design studio",
    "creative portfolio",
    "Central Saint Martins portfolio",
    "RISD portfolio",
    "Parsons admissions",
    "art and design university",
  ],
  authors: [{ name: "Design House Istanbul" }],
  creator: "Design House Istanbul",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Design House Istanbul",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "https://www.trybloom.ai/img/c08fa8fd-4a03-4a05-82e2-2f51432d47d1",
        width: 1200,
        height: 630,
        alt: "Design House Istanbul — creative portfolio mentorship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://www.trybloom.ai/img/c08fa8fd-4a03-4a05-82e2-2f51432d47d1"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Design House Istanbul",
              description: DESCRIPTION,
              url: SITE_URL,
              logo: `${SITE_URL}/icon.svg`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Istanbul",
                addressCountry: "TR",
              },
              sameAs: ["https://www.instagram.com/designhouseistanbul/"],
            }),
          }}
        />
        <Grain />
        <Cursor />
        <Loader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
