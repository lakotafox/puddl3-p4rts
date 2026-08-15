/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, `manifest.ts`,
 * and the JSON-LD structured-data helper.
 */
import { publicEnv } from "@/env";
import { brandPalette } from "@/lib/brand";

export const siteConfig = {
  name: "CR33K",
  /** Shown after the page title, e.g. "Ledger — CR33K". */
  tagline: "Clock out. Climb up.",
  description:
    "Off-grid cabins for people who get paid by the second — book any hour, any day, no front desk, no waiting. Plain-sight pricing, every stay scouted in person. Built by the PUDDL3 team.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "CR33K",
  /**
   * Browser theme-colour (address bar / PWA). Sampled from the hero's night sky
   * rather than the token palette — this one is consumed by the browser chrome,
   * not by CSS.
   */
  themeColor: brandPalette.ink,
  /** Background behind the PWA splash screen. */
  backgroundColor: brandPalette.ink,
  /**
   * Social handle, e.g. "@cr33k". Left undefined deliberately: inventing an
   * account that does not exist puts a dead link in every share card. Set it
   * once the real handle is known and the Twitter tags fill themselves in.
   */
  twitterHandle: undefined as string | undefined,
} as const;
