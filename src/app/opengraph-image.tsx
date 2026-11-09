import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ammar Tours: desert safaris, dhow cruises and city tours in Dubai";
export const size = OG_SIZE;
export const contentType = "image/jpeg";

export default function Image() {
  return renderOg({
    image: "/images/tours/dune-bashing.jpg",
    fontSize: 120,
    title: (
      <>
        <span style={{ marginRight: 28 }}>Desert. Sea.</span>
        <span style={{ fontFamily: "Accent", fontStyle: "italic", fontWeight: 400, color: "#8fdc55" }}>City.</span>
      </>
    ),
    details: ["Dubai tours with hotel pickup", "Book on WhatsApp"],
  });
}
