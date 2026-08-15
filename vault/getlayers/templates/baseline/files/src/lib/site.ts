/**
 * Site-wide configuration — the single source of truth for SEO.
 *
 * Consumed by the metadata generator, `robots.ts`, `sitemap.ts`, and the
 * JSON-LD structured-data helper. Update these values per project.
 */
import { publicEnv } from "@/env";

export const siteConfig = {
  name: "DEUC3",
  shortName: "DEUC3",
  /** Used in the title template and OG/structured-data where the full name reads better. */
  legalName: "DEUC3 Tennis Club by PUDDL3",
  description:
    "DEUC3 — the members' tennis club from the PUDDL3 team. Courts booked by the hour, any hour, with live availability, honest pricing, and coaching that keeps count.",
  /** Short tagline reused in OG copy / structured data. */
  tagline: "Advantage, you. Courts in real time.",
  /**
   * Public origin, no trailing slash. Drives canonical URLs, OG tags, the
   * sitemap, and JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production.
   */
  url: publicEnv.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default Open Graph / Twitter share image (path under `public/`). */
  ogImage: "/open-graph.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "DEUC3 — Tennis Club by PUDDL3",
  /** Search keywords (kept tight — keyword stuffing is ignored / penalised). */
  keywords: [
    "tennis club",
    "tennis academy",
    "tennis coaching",
    "court booking",
    "tennis courts",
    "junior tennis",
    "private coaching",
    "membership",
    "DEUC3",
    "PUDDL3",
  ],
  twitterHandle: "@deuc3club",
  author: "DEUC3 Tennis Club",
  locale: "en_US",
  /** Browser theme-color (address bar / PWA). */
  themeColor: "#0f2f63",
  /** PWA splash background. */
  backgroundColor: "#0f2f63",
  /** Real-world contact — also feeds the LocalBusiness structured data. */
  contact: {
    email: "courts@puddl3.xyz",
    phone: "+1 (555) 010-0604",
    address: {
      street: "44 Rally Row",
      locality: "Brooklyn",
      region: "NY",
      postalCode: "11201",
      country: "US",
    },
  },
  /** Official profiles — emitted as `sameAs` for entity disambiguation. */
  sameAs: [
    "https://instagram.com/deuc3club",
    "https://x.com/deuc3club",
    "https://youtube.com/@deuc3club",
    "https://linkedin.com/company/deuc3club",
  ],
} as const;
