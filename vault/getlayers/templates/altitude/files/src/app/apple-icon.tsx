/**
 * Apple touch icon — the same mark as `icon.tsx`, at the size iOS wants for the
 * home screen. Kept separate because Next serves it under a different `rel`.
 *
 * 📖 Docs: obsidian/frontend/seo-metadata.md
 */
import { ImageResponse } from "next/og";

import { brandGradient, brandPalette } from "@/lib/brand";
import { DISPLAY_FONT_NAME, loadDisplayFont } from "@/lib/og-font";
import { siteConfig } from "@/lib/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
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
          fontSize: 124,
          lineHeight: 1,
          paddingTop: 10,
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
