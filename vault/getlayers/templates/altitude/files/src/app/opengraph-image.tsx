/**
 * Open Graph / Twitter share card, 1200×630, generated from the brand mark.
 *
 * Mirrors the hero: the wordmark over a night ground, the tagline in the display
 * face, and a rule borrowed from the submit button's gradient. Next fingerprints
 * the output and injects both `og:image` and `twitter:image`, so nothing needs
 * declaring in the metadata generator.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */
import { ImageResponse } from "next/og";

import { brandGradient, brandPalette } from "@/lib/brand";
import { DISPLAY_FONT_NAME, loadDisplayFont } from "@/lib/og-font";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const display = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: brandPalette.ink,
          // A single warm light low in the frame, as in the hero video.
          backgroundImage: `radial-gradient(120% 90% at 50% 118%, ${brandPalette.actionFrom}40 0%, ${brandPalette.ink}00 60%)`,
          fontFamily: DISPLAY_FONT_NAME,
          color: brandPalette.onMedia,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: 16,
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            marginTop: 56,
            width: 120,
            height: 3,
            borderRadius: 999,
            backgroundImage: brandGradient,
          }}
        />

        {/* One string, not an expression plus a literal: Satori refuses any
            element with more than one child node unless it declares a display
            mode, and the failure only surfaces at request time. */}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 82,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {`You earn every second. Come spend a few here.`}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: DISPLAY_FONT_NAME, data: display, weight: 400, style: "normal" },
      ],
    },
  );
}
