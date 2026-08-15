/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Everything a crawler, a share card or a
 * home-screen icon says about this site is derived from here; nothing below is
 * repeated in a component.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "Splitsecond",
  /**
   * The full title, used as the home page's `<title>` and as the OG title.
   * `name` on its own is what the `%s — Splitsecond` template puts after a
   * page's own title; the two are deliberately different strings.
   */
  title: "Splitsecond — We put every second on screen",
  description:
    "The eight-person studio built by the PUDDL3 team — identity, motion and websites for money that moves in real time.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production — the
   * fallback here is the production domain rather than localhost so a build
   * that forgets the variable still emits absolute URLs that resolve.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "https://splitsecond.puddl3.xyz",
  /**
   * Default Open Graph / Twitter share image (path under `public/`), and its
   * real pixel size. The dimensions are declared to scrapers, so they are read
   * from here rather than written again in the metadata generator — a share
   * card that lies about its own size is cropped by whoever renders it.
   */
  ogImage: "/open-graph.png",
  ogImageSize: { width: 900, height: 600 },
  twitterHandle: "@puddl3",
  author: "Splitsecond",
  /** BCP-47 language and the OG locale that goes with it. */
  locale: "en_US",
  language: "en",
  /**
   * Where the privacy policy lives — `null` until one does.
   *
   * The consent banner and its preferences modal both point at it. They pointed
   * at `/privacy-policy`, which was never built, so the words render as words
   * until this is filled in. Typed rather than inferred so setting it stays a
   * one-line change.
   */
  privacyPolicyUrl: null as string | null,
  /** Browser theme-color (address bar / PWA) — the room the site opens in. */
  themeColor: "#000000",
} as const;
