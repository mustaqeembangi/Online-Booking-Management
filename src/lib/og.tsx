import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { ReactNode } from "react";

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#0b120e";
const fontPath = (name: string) => path.join(process.cwd(), "src/assets/fonts", name);
export const ogFonts = async () => [
  {
    name: "Funnel",
    data: await readFile(fontPath("funnel-display-latin-600-normal.woff")),
    weight: 600 as const,
    style: "normal" as const,
  },
  {
    name: "Accent",
    data: await readFile(fontPath("instrument-serif-latin-400-italic.woff")),
    weight: 400 as const,
    style: "italic" as const,
  },
];

// Rendered as JPEG, not PNG: WhatsApp drops large preview images and photos are huge as PNG.
export async function renderOg({
  image,
  title,
  fontSize,
  details,
}: {
  image: string;
  title: ReactNode;
  fontSize: number;
  details: string[];
}) {
  const photo = await sharp(path.join(process.cwd(), "public", image))
    .resize(OG_SIZE.width, OG_SIZE.height, { fit: "cover" })
    .jpeg({ quality: 82 })
    .toBuffer();

  const png = await new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: INK, color: "#fff", fontFamily: "Funnel" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={`data:image/jpeg;base64,${photo.toString("base64")}`} width={OG_SIZE.width} height={OG_SIZE.height} style={{ position: "absolute", top: 0, left: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: OG_SIZE.width, height: OG_SIZE.height, display: "flex", backgroundImage: "linear-gradient(to top, rgba(11,18,14,0.97) 0%, rgba(11,18,14,0.72) 42%, rgba(11,18,14,0.15) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: 56 }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", background: "#fff", color: INK, borderRadius: 999, padding: "14px 30px", fontSize: 32, letterSpacing: -0.5 }}>
              Ammar Tours
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", fontSize, lineHeight: 1, letterSpacing: fontSize * -0.03 }}>{title}</div>
            {details.length > 0 && (
              <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: "#8fdc55" }}>{details.join("  ·  ")}</div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await ogFonts() },
  ).arrayBuffer();

  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "content-type": "image/jpeg", "cache-control": "public, max-age=86400, s-maxage=31536000" },
  });
}
