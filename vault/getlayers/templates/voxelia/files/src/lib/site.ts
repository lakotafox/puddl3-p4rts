/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update the placeholder values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "PUDDL3",
  description:
    "Wages that stream in real time. Pay accrues second by second, in plain sight, and workers cash out any hour, any day.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  twitterHandle: "@puddl3",
  author: "PUDDL3",
  /**
   * Browser theme-color (address bar / PWA). The page background, so the chrome
   * blends into it rather than framing it.
   */
  themeColor: "#004AC7",
} as const;

/**
 * Brand colours for the generated icon and share image.
 *
 * Duplicated from `globals.css` on purpose: `next/og` rasterises in a Node
 * context with no stylesheet and no CSS custom properties, so the tokens cannot
 * reach it. Keep in step with `--raw-color-brand-600` and `--raw-color-white`.
 */
export const brandMark = {
  background: "#004AC7",
  foreground: "#ffffff",
  /** The wordmark, and the single glyph the favicon is cropped to. */
  wordmark: "PUDDL3.",
  glyph: "P",
  /**
   * Short line for the share card.
   *
   * Not `siteConfig.description` — that is written for search results and runs
   * long enough to overflow a 1200 × 630 card at display size.
   */
  tagline: "Payday, every second.",
} as const;
