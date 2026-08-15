/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "PUDDL3",
  /** Used as the `<title>` when a page doesn't set its own. */
  title: "PUDDL3 — Walk-in diagnostics and specialist care, any hour, any day",
  description:
    "Walk-in diagnostics, same-day lab results and specialist care with every price in plain sight — open any hour, any day. Built by the PUDDL3 team, caring for 52,000+ shift workers since 2019.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Open Graph / Twitter share image.
   *
   * Generated from the logo at request time by `src/app/opengraph-image.tsx`
   * rather than shipped as a static file — see that route. Next resolves the
   * `/opengraph-image` file convention automatically, so this path only exists
   * for callers that pass an explicit override.
   */
  ogImage: "/opengraph-image",
  twitterHandle: "@puddl3health",
  author: "PUDDL3 Health",
  /** Browser theme-color (address bar / PWA) — the brand green. */
  themeColor: "#246f65",
  /** Brand palette, shared with the generated icon and OG routes. */
  brand: {
    green: "#246f65",
    lime: "#f8ffb4",
    mint: "#eff4f2",
  },
} as const;
