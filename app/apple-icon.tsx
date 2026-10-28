import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same stick-figure K as app/icon.svg, on a full-bleed tile (iOS adds its own rounding).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#d9ff43" }}>
        <svg width="180" height="180" viewBox="0 0 40 40">
          <g stroke="#171717" strokeWidth="5.5">
            <path d="M14 8v24M17 20 28 9M19 19l10 13" />
          </g>
          <ellipse cx="14" cy="12" rx="1.3" ry="1.6" fill="#d9ff43" />
        </svg>
      </div>
    ),
    size,
  );
}
