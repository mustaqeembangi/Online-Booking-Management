import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Discover Dubai with Ammar Tours: desert safaris, quad biking and Abu Dhabi city tours";
export const size = OG_SIZE;
export const contentType = "image/jpeg";

export default function Image() {
  return renderOg({
    image: "/images/tours/evening-tour-quad-camel-bbq.jpg",
    fontSize: 96,
    title: (
      <>
        <span style={{ marginRight: 24 }}>Discover Dubai with</span>
        <span style={{ color: "#8fdc55" }}>Ammar Tours</span>
      </>
    ),
    details: ["Dubai tours with hotel pickup", "Book on WhatsApp"],
  });
}
