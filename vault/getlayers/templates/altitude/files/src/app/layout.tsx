import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { LazyCookie } from "@/components/common/Cookie";
import { AdaptiveGrid } from "@/components/common/grid";
import { Preloader } from "@/components/common/preloader";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

/** Display face — headings, the brand mark, stat figures, the submit button. */
const gildaDisplay = localFont({
  src: "./fonts/GildaDisplay-Regular.ttf",
  variable: "--font-gilda",
  weight: "400",
  style: "normal",
  display: "swap",
});

/** Text face — navigation, body copy, form fields. */
const generalSans = localFont({
  src: "./fonts/GeneralSans-Regular.otf",
  variable: "--font-general",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables go on <html>, not <body>: Tailwind's preflight sets
    // `font-family` on the root element, so a variable scoped to <body> is
    // invisible to it and the whole page silently falls back to ui-sans-serif.
    <html lang="en" className={`${gildaDisplay.variable} ${generalSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          <Preloader />
          <LazyCookie />
          {children}
        </ScrollLayout>
      </body>
    </html>
  );
}
