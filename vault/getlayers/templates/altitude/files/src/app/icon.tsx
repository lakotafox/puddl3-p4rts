/**
 * Favicon, generated from the brand mark at build time.
 *
 * The wordmark is type, not artwork, so there is no logo file to export — the
 * icon is its initial set in the same display face, on the same gradient the
 * submit button uses. One source of truth: change the font or the gradient and
 * the favicon follows.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */
import { ImageResponse } from "next/og";

import { brandGradient, brandPalette } from "@/lib/brand";
import { DISPLAY_FONT_NAME, loadDisplayFont } from "@/lib/og-font";
import { siteConfig } from "@/lib/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const display = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: brandGradient,
          color: brandPalette.actionForeground,
          fontFamily: DISPLAY_FONT_NAME,
          fontSize: 44,
          // The glyph sits high in its em box; nudge it onto the optical centre.
          lineHeight: 1,
          paddingTop: 4,
        }}
      >
        {siteConfig.name.charAt(0).toUpperCase()}
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
