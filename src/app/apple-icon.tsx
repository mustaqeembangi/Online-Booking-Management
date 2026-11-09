import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#0b120e", color: "#8fdc55", fontFamily: "Funnel", fontSize: 130, lineHeight: 1, paddingBottom: 14 }}>
        A
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
