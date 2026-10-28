import { ImageResponse } from "next/og";

export const alt =
  "Krutarth Chauhan — I make websites. And other questionable decisions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f5f1e8",
        color: "#171717",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 2 }}>
        KRUTARTH CHAUHAN · FULL STACK DEVELOPER
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 96,
          fontWeight: 900,
          lineHeight: 0.95,
        }}
      >
        <span>I MAKE WEBSITES.</span>
        <span>AND OTHER</span>
        <span style={{ color: "#ff6438", fontStyle: "italic" }}>
          QUESTIONABLE DECISIONS.
        </span>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}
      >
        <span
          style={{
            background: "#d9ff43",
            padding: "6px 14px",
            border: "3px solid #171717",
          }}
        >
          Founder of Krutonic
        </span>
        <span>Gujarat, India</span>
      </div>
    </div>,
    size,
  );
}
