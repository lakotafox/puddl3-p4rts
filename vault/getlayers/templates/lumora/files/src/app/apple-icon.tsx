import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Branded Apple touch icon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          borderRadius: 40,
        }}
      >
        <svg width="112" height="112" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z"
            fill="#cf8047"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
