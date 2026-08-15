/**
 * @fileoverview Standardised metadata + viewport generators for pages.
 *
 * `generateMetadata` builds a Next.js `Metadata` object — basic meta tags,
 * OpenGraph, Twitter cards, canonical URL, robots. `metadataBase` is always set
 * (from `siteConfig`) so relative URLs resolve to absolute — required by social
 * scrapers.
 *
 * Icons, the web manifest, and the OG/Twitter images are **not** set here. They
 * come from the `app/` file conventions (`icon.svg`, `apple-icon.tsx`,
 * `opengraph-image.tsx`, `manifest.ts`), which Next merges in automatically and
 * fingerprints for cache-busting. Declaring them here as well would override
 * those generated URLs with stale hand-written paths.
 *
 * `generateViewport` builds the `Viewport` export. `themeColor` lives here, not
 * in `Metadata` — Next deprecated it on the metadata object.
 */

import { Metadata, Viewport } from "next";

import { siteConfig } from "@/lib/site";

interface MetadataProps {
  title?: string;
  description?: string;
  /** Canonical path (e.g. `/about`) or absolute URL for this page. */
  url?: string;
  author?: string;
  siteName?: string;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  url = "/",
  author = siteConfig.author,
  siteName = siteConfig.name,
}: MetadataProps = {}): Metadata {
  // The home page gets the full "Name — Tagline"; inner pages get their own
  // title with the site name appended.
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title: resolvedTitle,
    description,
    ...(siteConfig.twitterHandle
      ? { site: siteConfig.twitterHandle, creator: siteConfig.twitterHandle }
      : {}),
  };

  return {
    // Resolves every relative URL below to an absolute one.
    metadataBase: new URL(siteConfig.url),
    title: resolvedTitle,
    description,
    applicationName: siteConfig.name,
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
    },
    twitter,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateViewport(): Viewport {
  return {
    themeColor: siteConfig.themeColor,
    width: "device-width",
    initialScale: 1,
  };
}
