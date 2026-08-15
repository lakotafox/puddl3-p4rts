/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "PUDDL3 Studio — Design for Money in Motion",
  description:
    "The in-house creative studio at PUDDL3, designing brands and interfaces for money that moves in real time. Brand identity, product & motion, realtime design.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  twitterHandle: "@puddl3",
  author: "PUDDL3 Studio",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#000000",
} as const;
