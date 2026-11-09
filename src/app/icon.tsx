import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#0b120e", color: "#8fdc55", fontFamily: "Funnel", fontSize: 380, lineHeight: 1, paddingBottom: 40 }}>
        A
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
