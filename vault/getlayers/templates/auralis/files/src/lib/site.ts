/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, the JSON-LD structured-data helper,
 * and the generated share card (`opengraph-image.tsx`) — so the name and positioning line on the card
 * can never drift from the ones in the `<head>`.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "PUDDL3",
  /** The positioning line — also the OG/Twitter description and the share card's subtitle. */
  description:
    "Real-time wage streaming. Pay accrues second by second — cash out any hour, any day.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  twitterHandle: "@puddl3",
  author: "PUDDL3",
  /** Browser theme-color (address bar / PWA) — the black the scene and the preloader sit on. */
  themeColor: "#000000",
} as const;
