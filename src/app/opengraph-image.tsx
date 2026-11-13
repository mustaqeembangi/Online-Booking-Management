import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Ammar Tours: desert safaris in Dubai and city tours of Abu Dhabi";
export const size = OG_SIZE;
export const contentType = "image/jpeg";

export default function Image() {
  return renderOg({
    image: "/images/tours/evening-tour-quad-camel-bbq.jpg",
    fontSize: 120,
    title: (
      <>
        <span style={{ marginRight: 28 }}>Dunes. Desert.</span>
        <span style={{ fontFamily: "Accent", fontStyle: "italic", fontWeight: 400, color: "#8fdc55" }}>City.</span>
      </>
    ),
    details: ["Dubai tours with hotel pickup", "Book on WhatsApp"],
  });
}
