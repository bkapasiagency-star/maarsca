import { ImageResponse } from "next/og";

export const alt = "MAARS & Associates, Chartered Accountants & Business Advisors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a2540",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 6 }}>
          <div style={{ width: 48, height: 3, background: "#7cc8ee" }} />
          CHARTERED ACCOUNTANTS & BUSINESS ADVISORS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Financial clarity for businesses ready to grow.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, opacity: 0.8 }}>
          <div style={{ fontWeight: 700, letterSpacing: 2 }}>MAARS & ASSOCIATES</div>
          <div>Tax · Audit · Finance · Advisory · Virtual CFO</div>
        </div>
      </div>
    ),
    size,
  );
}
