// Tours with `gyg` come from the Ammar Tours GetYourGuide listing (operator supplied, 2026-11-09;
// photos and text re-read from GetYourGuide on 2026-11-13).
// All other tour facts come from the company's own pages on ammartours.com (read 2026-11-09).
// `price: null` means no price is published: the site shows "Ask for price".
// Ratings exist only where GetYourGuide published them. Never add others, or any discounts.

export type Currency = "USD" | "AED";

export type CategoryId =
  | "desert-safari"
  | "adventure"
  | "cruises"
  | "city-tours"
  | "attractions";

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
  gyg?: { rating: number; reviews: number };
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
    blurb: "Dunes, camps and mountain wadis",
    image: img("evening-desert-safari"),
  },
  {
    id: "adventure",
    name: "Buggy, quad & desert rides",
    blurb: "Drive it yourself or ride along",
    image: img("dune-buggy-drive"),
  },
  {
    id: "cruises",
    name: "Dhow cruises",
    blurb: "Dinner on the water and Musandam",
    image: img("dhow-cruise-marina"),
  },
  {
    id: "city-tours",
    name: "City tours",
    blurb: "Dubai and the other Emirates",
    image: img("dubai-city-tour"),
  },
  {
    id: "attractions",
    name: "Attractions",
    blurb: "Burj Khalifa, Atlantis and Ferrari World",
    image: img("burj-khalifa"),
  },
];

const photos = (slug: string) => [img(slug), `/images/tours/${slug}-2.jpg`];

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
    photos: photos("desert-safari-quad-camel-sandboarding"),
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
    gyg: { rating: 4.9, reviews: 45778 },
  },
  {
    slug: "red-dune-safari-quad-camel-bbq",
    title: "Red Dune Safari, Quad Bike, Camel Riding and BBQ Dinner",
    category: "desert-safari",
    image: img("red-dune-safari-quad-camel-bbq"),
    photos: photos("red-dune-safari-quad-camel-bbq"),
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
    gyg: { rating: 4.9, reviews: 32979 },
  },
  {
    slug: "safari-quad-camel-bbq-buffet",
    title: "Safari, Quad Biking, Camel Ride and BBQ Buffet Dinner",
    category: "desert-safari",
    image: img("safari-quad-camel-bbq-buffet"),
    photos: photos("safari-quad-camel-bbq-buffet"),
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
    gyg: { rating: 4.9, reviews: 33634 },
  },
  {
    slug: "evening-tour-quad-camel-bbq",
    title: "Evening Tour with Quad Biking, Camel Riding and BBQ",
    category: "desert-safari",
    image: img("evening-tour-quad-camel-bbq"),
    photos: photos("evening-tour-quad-camel-bbq"),
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
    gyg: { rating: 5.0, reviews: 281 },
  },
  {
    slug: "abu-dhabi-tour-sheikh-zayed-mosque",
    title: "Abu Dhabi Tour with Sheikh Zayed Mosque, from Dubai",
    category: "city-tours",
    image: img("abu-dhabi-tour-sheikh-zayed-mosque"),
    photos: photos("abu-dhabi-tour-sheikh-zayed-mosque"),
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
    gyg: { rating: 4.8, reviews: 955 },
  },
  {
    slug: "abu-dhabi-city-tour-qasr-al-watan",
    title: "Abu Dhabi City Tour with Qasr Al Watan",
    category: "city-tours",
    image: img("abu-dhabi-city-tour-qasr-al-watan"),
    photos: photos("abu-dhabi-city-tour-qasr-al-watan"),
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
    gyg: { rating: 4.5, reviews: 14 },
  },
  {
    slug: "evening-desert-safari",
    title: "Evening Desert Safari",
    category: "desert-safari",
    image: img("evening-desert-safari"),
    summary:
      "An afternoon drive into the red dunes of Al Lahbab, 45 minutes of dune driving by Land Cruiser, then an evening at the camp with a BBQ dinner and live shows.",
    price: null,
    duration: "6-7 hours",
    departs: "3:00 pm - 3:30 pm",
    returns: "9:30 pm - 10:00 pm",
    types: ["Shared", "Private"],
    includes: [
      "Hotel pickup and drop-off by 4x4",
      "45 minutes of dune bashing by Land Cruiser",
      "Sandboarding",
      "Camel rides",
      "Traditional costumes",
      "Arabic coffee and fresh dates",
      "Unlimited soft drinks, tea, coffee and water",
      "Welcome snacks, shawarma and falafel",
      "Shisha (flavoured hookah)",
      "Henna painting",
      "Fire show, tanoura show and belly dance show",
      "Open BBQ dinner buffet at the camp",
    ],
  },
  {
    slug: "morning-desert-safari",
    title: "Morning Desert Safari",
    category: "desert-safari",
    image: img("morning-desert-safari"),
    summary:
      "A shorter desert trip that starts with a 4x4 pickup, with dune bashing, sandboarding and a stop for photos before you are back for lunch.",
    price: null,
    duration: "4 hours",
    departs: "9:30 am, daily",
    returns: "1:00 pm - 1:30 pm",
    types: ["Shared", "Private"],
    includes: [
      "Dune bashing",
      "Sandboarding",
      "Off-road ride",
      "Photography stop",
    ],
    extras: ["Camel ride", "Quad bike"],
  },
  {
    slug: "private-desert-safari",
    title: "Private Desert Safari at Lahbab",
    category: "desert-safari",
    image: img("private-desert-safari"),
    summary:
      "The full evening safari in your own vehicle, with dune bashing by Land Cruiser or Hummer, the camp activities, live shows and a BBQ and vegetarian buffet.",
    price: null,
    duration: "6 hours",
    departs: "3:00 pm - 3:30 pm",
    returns: "9:30 pm - 10:00 pm",
    types: ["Private"],
    includes: [
      "Hotel pickup and drop-off by 4x4",
      "45 minutes of dune bashing by Land Cruiser or Hummer",
      "Sandboarding",
      "Camel rides",
      "Traditional costumes",
      "Arabic coffee and fresh dates",
      "Unlimited soft drinks, tea, coffee and water",
      "Welcome snacks, shawarma and falafel",
      "Shisha (flavoured hookah)",
      "Henna painting",
      "Tanoura show, belly dance show and fire show",
      "BBQ and vegetarian buffet dinner",
    ],
  },
  {
    slug: "hatta-mountain-safari",
    title: "Hatta Mountain Wadi Safari",
    category: "desert-safari",
    image: img("hatta-mountain-safari"),
    summary:
      "An early 4x4 trip to the Hatta mountains, with the heritage village, rocky mountain tracks and fresh water pools where you can swim.",
    price: { amount: 55, currency: "USD" },
    duration: "6-7 hours",
    departs: "8:00 am - 8:30 am",
    returns: null,
    minGuests: 4,
    types: ["Shared", "Private"],
    includes: [
      "Pickup from your hotel or home in Dubai",
      "Hatta Heritage Village",
      "Hatta Hill Park and Hatta Dam",
      "Al Hajr mountain crossing",
      "Hatta wadis and fresh water pools, when the border checkpoint allows it",
      "Carpet market stop",
      "Drop-off",
    ],
    extras: ["Lunch at Hatta Fort Hotel, $40 per person"],
    notes: ["Bring a swimsuit and a towel."],
  },
  {
    slug: "desert-safari-dune-buggy",
    title: "Desert Safari with Dune Buggy",
    category: "desert-safari",
    image: img("desert-safari-dune-buggy"),
    summary:
      "Drive a twin-seat 700cc buggy along a guided dune trail, with breaks and soft drinks on the way. Every buggy has a full roll cage and safety harness.",
    price: null,
    duration: null,
    departs: null,
    returns: null,
    types: ["Private"],
    includes: [],
  },
  {
    slug: "desert-safari-quad-bike",
    title: "Desert Safari with Quad Bike",
    category: "desert-safari",
    image: img("desert-safari-quad-bike"),
    summary:
      "A guided trek over low and high dunes on a fully automatic quad, after a briefing on off-road rules and safety gear. Breaks and soft drinks are part of the route.",
    price: null,
    duration: null,
    departs: null,
    returns: null,
    types: ["Private"],
    includes: [],
  },
  {
    slug: "dune-buggy-drive",
    title: "Dune Buggy Drive",
    category: "adventure",
    image: img("dune-buggy-drive"),
    summary:
      "Thirty minutes behind the wheel of a dune buggy, with an instructor guiding the trail at your pace.",
    price: null,
    duration: "3 hours, including 30 minutes of driving",
    departs: "9:00 am - 10:00 am, daily",
    returns: "12:00 pm - 1:00 pm",
    types: [],
    includes: ["30 minute dune buggy drive", "Helmet"],
    extras: ["Pickup and drop-off from your hotel or home"],
    notes: ["Every driver signs an indemnity form before the activity."],
    featured: true,
  },
  {
    slug: "quad-biking",
    title: "Quad Biking with Transfer",
    category: "adventure",
    image: img("quad-biking"),
    summary:
      "Thirty minutes on a fully automatic quad bike through the dunes with a guide, after a safety briefing.",
    price: null,
    duration: "30 minutes of riding",
    departs: "9:00 am - 10:00 am, daily",
    returns: "12:00 pm - 1:00 pm",
    types: [],
    includes: [
      "Pickup and drop-off from your hotel or home",
      "30 minute quad bike ride",
      "Helmet",
      "Soft drink breaks",
    ],
    notes: [
      "Minimum age is 16.",
      "Every rider signs an indemnity form before the activity.",
    ],
  },
  {
    slug: "dune-bashing",
    title: "Dune Bashing",
    category: "adventure",
    image: img("dune-bashing"),
    summary:
      "One hour over the dunes in a 4WD with a skilled driver at the wheel. You sit back as a passenger for the slides and jumps.",
    price: { amount: 50, currency: "USD", unit: "per adult" },
    duration: "2-3 hours",
    departs: "8:30 am - 9:00 am, daily",
    returns: "12:00 pm - 12:30 pm",
    minGuests: 2,
    types: ["Private"],
    includes: [
      "Pickup from your hotel or home",
      "1 hour of dune bashing",
      "Drop-off at your hotel or home",
    ],
    notes: ["Guests are passengers only and do not drive."],
  },
  {
    slug: "camel-riding",
    title: "Camel Riding",
    category: "adventure",
    image: img("camel-riding"),
    summary: "A camel trek up and down the sand in the Dubai desert.",
    price: null,
    duration: "3 hours",
    departs: "9:00 am - 10:00 am, daily",
    returns: "12:00 pm - 1:00 pm",
    minGuests: 2,
    types: ["Shared", "Private"],
    includes: [
      "Pickup from your hotel or home",
      "Camel ride",
      "Drop-off at your hotel or home",
    ],
  },
  {
    slug: "sand-boarding",
    title: "Sandboarding",
    category: "adventure",
    image: img("sand-boarding"),
    summary:
      "An hour of unlimited sandboarding on the dunes, reached by 4x4. If you can snowboard, you will feel at home.",
    price: { amount: 50, currency: "USD" },
    duration: "3 hours",
    departs: "8:30 am - 9:00 am, daily",
    returns: "12:00 pm - 12:30 pm",
    minGuests: 3,
    types: ["Private"],
    includes: [
      "Pickup from your hotel or home",
      "1 hour of unlimited sandboarding",
      "Drop-off at your hotel or home",
    ],
  },
  {
    slug: "dhow-cruise-marina",
    title: "Dhow Cruise, Dubai Marina",
    category: "cruises",
    image: img("dhow-cruise-marina"),
    summary:
      "Hotel pickup, then a traditional dhow through Dubai Marina with views of Jumeirah Beach Residence, Burj Al Arab, Palm Jumeirah and Atlantis.",
    price: null,
    duration: null,
    departs: null,
    returns: null,
    types: ["Shared", "Private"],
    includes: [],
    featured: true,
  },
  {
    slug: "dhow-cruise-creek",
    title: "Dinner Cruise, Dubai Creek",
    category: "cruises",
    image: img("dhow-cruise-creek"),
    summary:
      "An evening on a traditional wooden dhow along Dubai Creek, passing Sheikh Saeed's house and the Heritage Village, with an international buffet and Arabic music.",
    price: null,
    duration: null,
    departs: null,
    returns: null,
    types: ["Shared", "Private"],
    includes: [],
  },
  {
    slug: "five-star-dhow-dinner",
    title: "5 Star Dhow Dinner Cruise",
    category: "cruises",
    image: img("five-star-dhow-dinner"),
    summary:
      "Dinner on the Rustar Dhow, a wooden dhow with a teak interior, with an international buffet and live entertainment past old and new Dubai.",
    price: null,
    duration: null,
    departs: null,
    returns: null,
    types: [],
    includes: [],
    notes: ["Priced for six people. Each extra person is AED 200."],
  },
  {
    slug: "musandam-dibba-cruise",
    title: "Musandam Dibba Cruise",
    category: "cruises",
    image: img("musandam-dibba-cruise"),
    summary:
      "A day on a traditional Omani dhow from Dibba port, with swimming, snorkeling, hand line fishing and an Arabic and Asian buffet on board.",
    price: null,
    duration: null,
    departs: "Morning pickup",
    returns: null,
    types: [],
    includes: [
      "Pickup from your location",
      "Swimming and snorkeling",
      "Hand line fishing",
      "Arabic and Asian buffet on board",
      "Drop-off at your hotel",
    ],
  },
  {
    slug: "dubai-city-tour",
    title: "Dubai City Tour",
    category: "city-tours",
    image: img("dubai-city-tour"),
    summary:
      "Old and new Dubai in one day, from the Gold and Spice Souks and Bastakiya to Jumeirah Mosque, Burj Al Arab, Atlantis and Burj Khalifa. Most stops are for photos.",
    price: { amount: 41, currency: "USD" },
    duration: "6-7 hours",
    departs: "8:00 am - 8:30 am, daily",
    returns: null,
    types: ["Shared", "Private"],
    includes: [
      "Pickup from your hotel or home",
      "Dubai Creek and Bastakiya",
      "Jumeirah Mosque and Jumeirah Beach",
      "Downtown Dubai and Burj Khalifa",
      "Dubai Marina and Palm Island",
      "Burj Al Arab and Madinat Jumeirah",
      "Atlantis Dubai",
      "Gold Souk and Spice Souk",
    ],
    featured: true,
  },
  {
    slug: "abu-dhabi-city-tour",
    title: "Abu Dhabi City Tour from Dubai",
    category: "city-tours",
    image: img("abu-dhabi-city-tour"),
    summary:
      "A day trip to the capital for Sheikh Zayed Grand Mosque, the Heritage Village, Emirates Palace and the Corniche.",
    price: null,
    duration: "6-7 hours",
    departs: "8:00 am - 8:30 am, daily",
    returns: null,
    types: ["Shared", "Private"],
    includes: [
      "Pickup from your hotel or home",
      "Sheikh Zayed Grand Mosque",
      "Abu Dhabi Heritage Village",
      "Emirates Palace, if entry is allowed",
      "Abu Dhabi Corniche",
      "Drop-off at your hotel or home",
    ],
  },
  {
    slug: "sharjah-ajman-city-tour",
    title: "Sharjah & Ajman City Tour",
    category: "city-tours",
    image: img("sharjah-ajman-city-tour"),
    summary:
      "A half day through two neighbouring Emirates, with King Faisal Mosque, the Blue Souk, Sharjah's museums and Ajman Museum.",
    price: { amount: 280, childAmount: 250, currency: "AED", unit: "per adult" },
    duration: "4-5 hours",
    departs: "8:30 am - 9:00 am, daily",
    returns: null,
    minGuests: 4,
    types: ["Shared", "Private"],
    includes: [
      "Pickup from your hotel or home in Dubai or Sharjah",
      "Soft drinks and water",
      "King Faisal Mosque",
      "Rulers Old Palace",
      "Natural History and Archaeological museums",
      "Blue Souk",
      "Ajman Museum and Corniche",
      "Drop-off at your hotel or home",
    ],
  },
  {
    slug: "al-ain-city-tour",
    title: "Al Ain City Tour",
    category: "city-tours",
    image: img("al-ain-city-tour"),
    summary:
      "A day in the garden city with the oasis, the camel market, Al Ain Museum, Jebel Hafeet and Al Ain Zoo, with lunch included.",
    price: { amount: 350, childAmount: 325, currency: "AED", unit: "per adult" },
    duration: "6-7 hours",
    departs: "8:00 am - 8:30 am, daily",
    returns: null,
    minGuests: 4,
    types: ["Shared", "Private"],
    includes: [
      "Pickup from your hotel or home in Dubai or Sharjah",
      "Lunch and soft drinks",
      "Camel Market",
      "Al Ain Museum and Palace of Sheikh Zayed",
      "Al Ain Oasis",
      "Ain Al Faydah",
      "Al Ain Zoo",
      "Jebel Hafeet",
      "Drop-off at your hotel or home",
    ],
  },
  {
    slug: "abu-dhabi-ferrari-world",
    title: "Abu Dhabi Grand Mosque & Ferrari World",
    category: "attractions",
    image: img("abu-dhabi-ferrari-world"),
    summary:
      "A guided day from Dubai with an hour at Sheikh Zayed Grand Mosque, stops at Emirates Palace and the Heritage Village, then three hours at Ferrari World on Yas Island.",
    price: { amount: 140, currency: "USD" },
    duration: "8 hours",
    departs: null,
    returns: null,
    types: ["Shared", "Private"],
    includes: [
      "Hotel pickup and drop-off by 4x4",
      "Licensed, bilingual tour guide",
      "Sheikh Zayed Grand Mosque",
      "Cold mineral water",
    ],
    notes: [
      "Lunch at Marina Mall is at your own expense.",
      "Mosque dress code: women cover arms, legs and head. Men cover shoulders and knees. Guests who do not follow it are refused entry.",
    ],
  },
  {
    slug: "burj-khalifa",
    title: "Burj Khalifa, At the Top",
    category: "attractions",
    image: img("burj-khalifa"),
    summary:
      "Tickets to the observation decks on floors 124 and 125. Ask about sunset slots and premium tickets to the 148th floor.",
    price: null,
    duration: "3-4 hours",
    departs: "Your choice of time",
    returns: null,
    types: [],
    includes: ["Observation deck tickets, floors 124 and 125"],
    extras: ["Pickup from your hotel or home"],
  },
  {
    slug: "atlantis-aquaventure",
    title: "Atlantis Aquaventure & Lost Chambers",
    category: "attractions",
    image: img("atlantis-aquaventure"),
    summary:
      "A day at the Atlantis water park with the slides and river rides, plus The Lost Chambers aquarium and lunch at Kaleidoscope.",
    price: { amount: 126, currency: "USD" },
    duration: "6 hours",
    departs: "9:00 am - 9:30 am",
    returns: null,
    minGuests: 2,
    types: ["Shared", "Private"],
    includes: [
      "Hotel pickup and drop-off by 4x4",
      "Entry to Atlantis Aquaventure",
      "Unlimited access to all rides",
      "Kaleidoscope lunch",
    ],
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
