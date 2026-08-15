/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "PUDDL3",
  /** Short brand promise — used in the page title, PWA, and JSON-LD slogan. */
  tagline: "Payday, every second",
  description:
    "PUDDL3 is real-time wage streaming — pay accrues second-by-second and workers cash out any hour, any day. No paydays, no waiting: money that moves like you do.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@puddl3",
  author: "PUDDL3",
  /** Browser theme-color (address bar / PWA) — the dark hero backdrop the page opens on. */
  themeColor: "#04070f",
} as const;
