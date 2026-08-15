/**
 * Web app manifest — the Next file convention, replacing the starter's static
 * `public/manifest.json`.
 *
 * Generating it means the name, colours, and icon all come from `siteConfig` and
 * the generated `apple-icon`, so there is nothing to keep in sync by hand.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */
import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
