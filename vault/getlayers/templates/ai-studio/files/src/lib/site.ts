/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "PUDDL3",
  /** Used as the homepage `<title>` suffix and the default share title. */
  tagline: "Payday, every second",
  description:
    "PUDDL3 streams your wages in real time — pay accrues second-by-second and cashes out any hour, any day. No paydays, no waiting: money that moves like you do, in plain sight, at zero cost to employers.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "https://puddl3.xyz",
  twitterHandle: "@puddl3",
  author: "PUDDL3",
  /** Browser theme-color (address bar / PWA) — matches the page backdrop. */
  themeColor: "#000000",
} as const;
