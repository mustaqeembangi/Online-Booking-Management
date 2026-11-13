// The site lists only the Ammar Tours GetYourGuide tours (operator decision, 2026-11-13).
// Photos and text come from GetYourGuide (read 2026-11-13); ratings were supplied by the operator on 2026-11-09.
// `price: null` means no price is published: the site shows "Ask for price".
// Ratings exist only where GetYourGuide published them. Never add others, or any discounts.

export type Currency = "USD" | "AED";

export type CategoryId = "desert-safari" | "city-tours";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
}

export interface TourPrice {
  amount: number;
  childAmount?: number;
  currency: Currency;
  unit?: string;
}

export interface Tour {
  slug: string;
  title: string;
  category: CategoryId;
  image: string;
  summary: string;
  price: TourPrice | null;
  duration: string | null;
  departs: string | null;
  returns: string | null;
  minGuests?: number;
  types: ("Shared" | "Private")[];
  includes: string[];
  extras?: string[];
  notes?: string[];
  featured?: boolean;
  gyg?: { rating: number; reviews: number; url: string };
  photos?: string[];
  highlights?: string[];
  optionIncludes?: { title: string; items: string[] };
  stops?: string[];
  notIncluded?: string[];
  notSuitableFor?: string[];
  whatToBring?: string[];
}

const img = (slug: string) => `/images/tours/${slug}.jpg`;

export const CATEGORIES: Category[] = [
  {
    id: "desert-safari",
    name: "Desert safaris",
    blurb: "Red dunes, quad bikes, camels and a BBQ evening",
    image: img("red-dune-safari-quad-camel-bbq"),
  },
  {
    id: "city-tours",
    name: "City tours",
    blurb: "Abu Dhabi day trips from Dubai",
    image: img("abu-dhabi-tour-sheikh-zayed-mosque"),
  },
];

const photos = (slug: string, count = 2) => [
  img(slug),
  ...Array.from({ length: count - 1 }, (_, i) => `/images/tours/${slug}-${i + 2}.jpg`),
];

// Shared by the three Ammar Tours red dune listings with a 4-hour and a 7-hour option (GetYourGuide, read 2026-11-13).
const RED_DUNE_INCLUDES = [
  "Hotel pickup and drop-off from Dubai, Sharjah and Ajman",
  "Transport by air-conditioned 4x4 jeep",
  "English-speaking licensed safari guide",
  "Red dune bashing for 30-40 minutes",
  "Sandboarding in the red sand",
  "Camel ride (repeated on request)",
  "Photo stop in the middle of the red sand desert",
  "Photos and videos of your activities, taken by your guide",
  "Unlimited drinking water",
  "Unlimited tea and coffee with dates",
  "Quad biking with a safety briefing (if you choose that option)",
];

const SEVEN_HOUR_CAMP = {
  title: "With the 7-hour option",
  items: [
    "Evening at the Bedouin camp",
    "BBQ dinner with vegetarian, non-vegetarian and dietary choices",
    "Dessert",
    "Soft drinks",
    "Arabic snacks and fruit salad",
    "Fire show",
    "Belly dance show",
    "Tanoura show",
    "Henna painting (a small design)",
    "Shisha at the shisha corner",
    "Arabic dress for photos",
  ],
};

const RED_DUNE_NOT_INCLUDED = ["Alcoholic drinks", "Personal expenses", "Tips (optional)"];

const QUAD_RISK =
  "Quad biking is self-driven and at your own risk. It is not covered by the tour's insurance, and any accident or damage is the rider's responsibility. International travel insurance is recommended.";
const NO_FOOD_BEFORE =
  "Please do not eat for 2-3 hours before the safari, to avoid feeling sick during dune bashing.";
const NO_SHOWS_RAMADAN =
  "Dance shows do not run during Ramadan or on other Islamic holidays, as required by UAE law.";
const SHISHA =
  "Shisha is free in the shisha corner. Shisha served at your table costs extra.";

const DESERT_BRING = ["Comfortable shoes", "Comfortable clothes", "Sunglasses", "Sun hat", "Sunscreen"];

export const TOURS: Tour[] = [
  {
    slug: "desert-safari-quad-camel-sandboarding",
    title: "Desert Safari, Quad Bike, Camel Riding and Sandboarding",
    category: "desert-safari",
    image: img("desert-safari-quad-camel-sandboarding"),
    photos: photos("desert-safari-quad-camel-sandboarding", 14),
    summary:
      "Experience the Lahbab Desert on a safari from Dubai, with thrilling dune bashing, camel riding, sandboarding and an optional quad bike ride.",
    price: { amount: 29, currency: "USD" },
    duration: "4 hours",
    departs: null,
    returns: null,
    types: [],
    highlights: [
      "Feel the thrill of dune bashing in the Arabian Desert",
      "Ride across the dunes on a quad bike (optional)",
      "Have a go at sandboarding, then enjoy a relaxing camel ride",
      "Drive over the red dunes of the desert around Dubai",
      "Watch the desert change colour as the sun sets",
    ],
    includes: [
      "Pickup and drop-off from your hotel or chosen location",
      "Transport in an air-conditioned 4x4",
      "Dune bashing",
      "Short camel ride (repeated on request)",
      "Sandboarding",
      "Photo stop on the high red dunes",
      "Water",
    ],
    notIncluded: ["Meals and snacks", "Quad bike ride (unless you choose that option)"],
    notes: [
      "The tour time includes pickup and drop-off.",
      "Your guide tells you the pickup time and plan before the safari.",
      "The minimum age to drive a quad bike is 16.",
      QUAD_RISK,
      NO_FOOD_BEFORE,
      "Wear closed shoes in summer, for your safety.",
    ],
    notSuitableFor: [
      "Children under 3",
      "Pregnant women",
      "People with back problems",
      "People with heart problems",
      "Wheelchair users",
      "People with existing medical conditions",
    ],
    whatToBring: ["Sunglasses", "Sun hat", "Sunscreen"],
    featured: true,
    gyg: {
      rating: 4.9,
      reviews: 45778,
      url: "https://www.getyourguide.com/dubai-l173/dubai-red-dunes-evening-desert-safari-w-bbq-dinner-t74766/",
    },
  },
  {
    slug: "red-dune-safari-quad-camel-bbq",
    title: "Red Dune Safari, Quad Bike, Camel Riding and BBQ Dinner",
    category: "desert-safari",
    image: img("red-dune-safari-quad-camel-bbq"),
    photos: photos("red-dune-safari-quad-camel-bbq", 20),
    summary:
      "Escape Dubai and drive across the red Lahbab Desert in a 4x4. Enjoy the sunset, sandboarding and a camel ride, with a BBQ dinner at the camp on the 7-hour option.",
    price: { amount: 27, currency: "USD" },
    duration: "4 or 7 hours",
    departs: null,
    returns: null,
    types: [],
    highlights: [
      "An exciting dune drive across the red dunes",
      "Add a quad bike ride over the rolling dunes (optional)",
      "A peaceful camel ride with views across the desert",
      "Test your balance sandboarding down the golden sand",
      "Watch the desert change colour as the sun sets",
    ],
    includes: RED_DUNE_INCLUDES,
    optionIncludes: SEVEN_HOUR_CAMP,
    notIncluded: RED_DUNE_NOT_INCLUDED,
    notes: [NO_FOOD_BEFORE, NO_SHOWS_RAMADAN, SHISHA, QUAD_RISK],
    notSuitableFor: [
      "Children under 3",
      "Pregnant women",
      "People with back problems",
      "People with heart problems",
      "People with limited mobility",
    ],
    whatToBring: DESERT_BRING,
    featured: true,
    gyg: {
      rating: 4.9,
      reviews: 32979,
      url: "https://www.getyourguide.com/dubai-l173/dubai-red-dune-safari-quad-bike-camel-ride-bbq-dinner-t74550/",
    },
  },
  {
    slug: "safari-quad-camel-bbq-buffet",
    title: "Safari, Quad Biking, Camel Ride and BBQ Buffet Dinner",
    category: "desert-safari",
    image: img("safari-quad-camel-bbq-buffet"),
    photos: photos("safari-quad-camel-bbq-buffet", 20),
    summary:
      "A desert adventure with dune bashing, sandboarding and camel rides. Choose quad biking, or a traditional camp evening with a BBQ buffet dinner and shows.",
    price: { amount: 27, currency: "USD" },
    duration: "4 or 7 hours",
    departs: null,
    returns: null,
    types: [],
    highlights: [
      "Thrilling 4x4 dune bashing across Dubai's red sand dunes",
      "Sandboarding down the dunes and sunset photos",
      "Drive a quad bike yourself (optional)",
      "Relax at a traditional desert camp with henna painting and refreshments",
      "A BBQ buffet dinner with belly dance, Tanoura and fire shows",
    ],
    includes: RED_DUNE_INCLUDES,
    optionIncludes: SEVEN_HOUR_CAMP,
    notIncluded: RED_DUNE_NOT_INCLUDED,
    notes: [
      "Quad biking is optional and is not part of the standard price.",
      "On shared trips, guests from Sharjah are picked up first and dropped off last.",
      NO_FOOD_BEFORE,
      NO_SHOWS_RAMADAN,
      SHISHA,
      QUAD_RISK,
    ],
    notSuitableFor: [
      "Children under 3",
      "Pregnant women",
      "People with back problems",
      "Wheelchair users",
    ],
    whatToBring: DESERT_BRING,
    featured: true,
    gyg: {
      rating: 4.9,
      reviews: 33634,
      url: "https://www.getyourguide.com/dubai-l173/dubai-safari-quad-bike-camel-ride-and-more-t188052/",
    },
  },
  {
    slug: "evening-tour-quad-camel-bbq",
    title: "Evening Tour with Quad Biking, Camel Riding and BBQ",
    category: "desert-safari",
    image: img("evening-tour-quad-camel-bbq"),
    photos: photos("evening-tour-quad-camel-bbq", 26),
    summary:
      "A desert trip with a little of everything: dune bashing, a camel ride, sandboarding, quad biking and a BBQ dinner at the camp.",
    price: { amount: 27, currency: "USD" },
    duration: "4 or 7 hours",
    departs: null,
    returns: null,
    types: [],
    highlights: [
      "A thrilling dune ride with expert drivers across the red desert",
      "Slide down soft sand hills on a sandboard",
      "A peaceful camel ride through the golden sand",
      "Explore the dunes at your own pace on a quad bike (optional)",
      "Watch the desert glow as the sun sets",
    ],
    includes: RED_DUNE_INCLUDES,
    optionIncludes: SEVEN_HOUR_CAMP,
    notIncluded: RED_DUNE_NOT_INCLUDED,
    notes: [NO_FOOD_BEFORE, NO_SHOWS_RAMADAN, SHISHA, QUAD_RISK],
    notSuitableFor: [
      "Children under 3",
      "Pregnant women",
      "People with back problems",
      "People with heart problems",
    ],
    whatToBring: DESERT_BRING,
    featured: true,
    gyg: {
      rating: 5.0,
      reviews: 281,
      url: "https://www.getyourguide.com/dubai-l173/dubai-evening-tour-with-quad-biking-camel-ride-and-bbq-t80286/",
    },
  },
  {
    slug: "abu-dhabi-tour-sheikh-zayed-mosque",
    title: "Abu Dhabi Tour with Sheikh Zayed Mosque, from Dubai",
    category: "city-tours",
    image: img("abu-dhabi-tour-sheikh-zayed-mosque"),
    photos: photos("abu-dhabi-tour-sheikh-zayed-mosque", 8),
    summary:
      "A full-day guided tour of Abu Dhabi from Dubai. Visit the Sheikh Zayed Grand Mosque, drive along the Corniche, explore the Heritage Village and see the city's landmarks.",
    price: { amount: 54, currency: "USD" },
    duration: "10 hours",
    departs: null,
    returns: null,
    types: [],
    highlights: [
      "See Abu Dhabi's remarkable modern architecture",
      "Visit the huge Sheikh Zayed Grand Mosque",
      "Walk through the Heritage Village, a rebuilt oasis village",
      "Drive along the Corniche, past skyscrapers and beaches",
    ],
    stops: [
      "Sheikh Zayed Grand Mosque",
      "Abu Dhabi Heritage Village",
      "Emirates Palace",
      "Marina Mall",
      "Ferrari World, Yas Island",
    ],
    includes: [
      "Pickup and drop-off from your location in Dubai",
      "Air-conditioned vehicle",
      "Guided visit to the Sheikh Zayed Grand Mosque",
      "Drive past the Founder's Memorial",
      "Photo stop at the Louvre Abu Dhabi",
      "Photo stop at Ferrari World on Yas Island",
      "Photo stop on the Abu Dhabi Corniche",
      "Licensed tour guide",
      "Abaya and scarf for women to enter the mosque",
      "Mineral water during the tour",
    ],
    notIncluded: ["Lunch", "Covering clothes for men"],
    notSuitableFor: ["Wheelchair users"],
    whatToBring: ["Sunglasses", "Sun hat"],
    featured: true,
    gyg: {
      rating: 4.8,
      reviews: 955,
      url: "https://www.getyourguide.com/dubai-l173/from-dubai-abu-dhabi-tour-with-sheikh-zayed-mosque-t74721/",
    },
  },
  {
    slug: "abu-dhabi-city-tour-qasr-al-watan",
    title: "Abu Dhabi City Tour with Qasr Al Watan",
    category: "city-tours",
    image: img("abu-dhabi-city-tour-qasr-al-watan"),
    photos: photos("abu-dhabi-city-tour-qasr-al-watan", 8),
    summary:
      "A full day in the UAE's capital: the Sheikh Zayed Grand Mosque, the Corniche, Emirates Palace and a visit inside the Qasr Al Watan palace.",
    price: { amount: 81, currency: "USD" },
    duration: "10 hours",
    departs: null,
    returns: null,
    types: [],
    highlights: [
      "Discover a stunning monument of Islamic architecture at the Grand Mosque",
      "Admire its marble mosaics and Swarovski chandeliers",
      "Go inside Qasr Al Watan, the presidential palace",
      "Drive along the Abu Dhabi Corniche and enjoy the city skyline",
    ],
    stops: [
      "Sheikh Zayed Grand Mosque",
      "Abu Dhabi Corniche",
      "Emirates Palace",
      "Qasr Al Watan",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "Air-conditioned vehicle",
      "1.5-hour visit to the Sheikh Zayed Grand Mosque",
      "Entry tickets for Qasr Al Watan",
      "Bottle of water",
      "English-speaking guide",
    ],
    notIncluded: ["Meals", "Tips"],
    notSuitableFor: ["Wheelchair users"],
    featured: true,
    gyg: {
      rating: 4.5,
      reviews: 14,
      url: "https://www.getyourguide.com/abu-dhabi-l494/abu-dhabi-city-tour-with-qasr-al-watan-t61823/",
    },
  },
];

export const getTour = (slug: string) => TOURS.find((t) => t.slug === slug);
export const getToursByCategory = (id: CategoryId) =>
  TOURS.filter((t) => t.category === id);
export const getFeaturedTours = () => TOURS.filter((t) => t.featured);

export function formatPrice(price: TourPrice) {
  const symbol = price.currency === "USD" ? "$" : "AED ";
  return `${symbol}${price.amount}`;
}

export const GYG_TOTAL_REVIEWS = TOURS.reduce(
  (sum, t) => sum + (t.gyg?.reviews ?? 0),
  0,
);
