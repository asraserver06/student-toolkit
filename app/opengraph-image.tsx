import { ImageResponse } from "next/og";

export const alt = "Student Toolkit — CGPA & Merit Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          backgroundColor: "#f6f1e4",
          backgroundImage:
            "repeating-linear-gradient(#f6f1e4 0 34px, rgba(27,42,74,0.055) 34px 35px)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.25em",
            color: "#a5312b",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Student Toolkit
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#1b2a4a",
            marginBottom: 16,
          }}
        >
          Merit Sheet
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#3d4d6b",
            fontFamily: "Courier New, monospace",
          }}
        >
          CGPA &amp; University Merit Calculators
        </div>
        <div
          style={{
            marginTop: 32,
            border: "3px solid #a5312b",
            color: "#a5312b",
            padding: "8px 24px",
            borderRadius: "50%",
            fontSize: 16,
            letterSpacing: "0.15em",
            transform: "rotate(-6deg)",
          }}
        >
          VERIFIED 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
