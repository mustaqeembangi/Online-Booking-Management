// Real guest reviews copied from the tours' GetYourGuide pages (pages saved by the operator, 2026-11-13).
// Text is as written by the guest; a long review may be cut at a sentence and end in "…".
// GetYourGuide's page did not make each review's star rating readable, so none is shown.

export interface Review {
  name: string;
  country?: string;
  date: string;
  text: string;
}

export const REVIEWS: Record<string, Review[]> = {
  "desert-safari-quad-camel-sandboarding": [
    { name: "Mohammed", country: "United Kingdom", date: "November 11, 2026", text: "Mustafa was amazing and really helped to enhance the experience. He was kind, patient and polite. I highly recommend Mustafa and Ammar Tours for your desert safari experience." },
    { name: "Abdellatif", country: "Switzerland", date: "November 11, 2026", text: "Nabeel was our tour guide. He was a 10/10. He helped us with everything, was super cheerful, and let us do everything. We recommend him 100%." },
    { name: "Jay", country: "United Kingdom", date: "November 12, 2026", text: "Was well worth the money and was good fun, MK was a great guide!" },
    { name: "Reboir", country: "Netherlands", date: "November 12, 2026", text: "Arif was really the best guide for this! I really enjoyed" },
  ],
  "red-dune-safari-quad-camel-bbq": [
    { name: "Myron", country: "France", date: "November 11, 2026", text: "Arif was great. He also took my pregnant wife into consideration, and she was able to skip the dune bashing and wait in an air-conditioned room. He answered all our questions. He knows the city really well. I would recommend him again and again." },
    { name: "Dzsenifer", country: "Hungary", date: "November 11, 2026", text: "It exceeded all our expectations! We would also like to thank our tour guide, Nadeem, who was very friendly and helpful, for this perfect evening." },
    { name: "Cora", country: "Germany", date: "November 11, 2026", text: "We had a great time. Enjoyed the dune bashing, the food and the show. Our guide Mohammed took great pictures and was super friendly" },
    { name: "Rafaela", country: "Portugal", date: "November 10, 2026", text: "Excellent tour!! The guide Muhammad was amazing, explain everything clearly and gave us enough time in every activity, highly recommend this tour! 10/10" },
    { name: "Reuben", country: "United Arab Emirates", date: "November 9, 2026", text: "Captain safdar was awesome, great experience, food was great, sand boarding was great, quad biking was great." },
    { name: "Arzu", country: "Germany", date: "November 11, 2026", text: "Faiq was our tour guide and a very funny and likeable man. No matter what, he was always laughing and was very helpful." },
  ],
  "safari-quad-camel-bbq-buffet": [
    { name: "Ramon", country: "United Arab Emirates", date: "November 6, 2026", text: "Kaptain was a very pleasant and friendly guide. He was very open-minded and kept the group in a good mood the whole time. This trip with him is absolutely recommended. It's an experience that's an absolute must-do." },
    { name: "Giada", country: "Italy", date: "November 11, 2026", text: "Highly recommended excursion! Muhammad, the guide, was very kind, friendly and good company. A wonderful way to spend the day! Highly recommended!" },
    { name: "Madalina", country: "Romania", date: "November 11, 2026", text: "It was totally amazing Everything !! Our guide was excellent! Thank you!" },
    { name: "Andrej", country: "Croatia", date: "November 9, 2026", text: "Arif Ali Everything was perfect,Arif is the best sarafi guide! 👌❤️" },
    { name: "Nijin P", country: "United Arab Emirates", date: "November 8, 2026", text: "Our guide Farooq was really helpful. really appreciate his efforts." },
  ],
  "evening-tour-quad-camel-bbq": [
    { name: "Klaudia", country: "Poland", date: "September 28, 2026", text: "I had an amazing desert safari experience in Dubai and a huge part of it was thanks to our tour guide Aamir! He is an absolutely fantastic driver — the dune driving was an absolute adrenaline rush, but at the same time I felt completely safe. He knows the desert very well and made the whole experience exciting! Ps. Music was great too! 🤩 Throughout the entire trip — from the quad bikes and camel ride to the desert and the camp — Aamir made sure we were comfortable and well taken care of. He constantly checked if we needed anything, offered us water, told us interesting things about the places we were passing, and even showed us a camel farm along the way. And on top of being a great driver and a genuinely lovely person, he is THE BEST photographer! He took some amazing photos for us and knew exactly where to stop for the best views. Honestly, Aamir made the whole experience even more special. The best guy and the best driver — highly recommended!!!" },
    { name: "Laura", country: "Germany", date: "February 11, 2026", text: "Absolut perfect trip! Would definitely recommend and do it again (actually did this now for the 2nd time). Our guide Faiq was very attentive, didn’t pressure us into buying anything (major plus! :)) and a nice person. 5 out of 5 stars well deserved." },
    { name: "Sinem", country: "Turkey", date: "October 16, 2026", text: "Captain Safdar was very polite, attentive, and friendly. He helped us a lot. We were very pleased. 🤗" },
    { name: "Francesca", country: "Italy", date: "October 13, 2026", text: "Salar Khan was an excellent guide, and we had a great time." },
  ],
  "abu-dhabi-tour-sheikh-zayed-mosque": [
    { name: "Pierre", date: "September 6, 2026", text: "We had a fantastic experience exploring Abu Dhabi with Zohaib. From the moment he picked us up, everything was smooth, comfortable, and well organized. Zohaib was extremely polite, friendly, and professional, and he made the tour feel more like a personal experience rather than just a sightseeing trip. Zohaib also shared interesting information along the way and gave us plenty of time to enjoy each place. Thanks" },
    { name: "Kamar", country: "United Kingdom", date: "August 16, 2026", text: "We had an amazing tour with Zohaib today. We had a great time, and he explained everything so well. My kids were very happy and enjoyed the tour with him. It was a private tour, and everything was perfect. Thank you, Zohaib, for making our day so special! ❤️" },
    { name: "Diana", country: "Spain", date: "August 20, 2026", text: "A very nice experience. The mosque was impressive. Highly recommended. Attiq was our tour guide, a very attentive and friendly person." },
    { name: "Daniella", country: "Netherlands", date: "October 12, 2026", text: "zohaib drives very carefully en brings us on time to every place and made great pictures from us" },
  ],
  "abu-dhabi-city-tour-qasr-al-watan": [
    { name: "Marat", country: "United Kingdom", date: "November 15, 2025", text: "Just finished an unforgettable trip to Abu Dhabi, and I have to say -it exceeded every expectation. The Presidential Palace (Qasr Al Watan) was absolutely breathtaking. The architecture, the sheer scale, and the level of craftsmanship made it feel like stepping into a living masterpiece. It’s not just a palace; it’s a celebration of art, knowledge, and Emirati heritage. The Sheikh Zayed Grand Mosque was another highlight -peaceful, majestic, and truly awe-inspiring. The white marble, intricate details, and serene atmosphere make it one of the most beautiful places I’ve ever visited. A special mention goes to our guide, Mohammed. He was incredibly friendly, knowledgeable, and attentive throughout the day. His passion for Abu Dhabi truly made the experience exceptional. …" },
  ],
};

// One review from each of three tours, for the home page.
export const HOME_REVIEWS: { slug: string; review: Review }[] = [
  { slug: "red-dune-safari-quad-camel-bbq", review: REVIEWS["red-dune-safari-quad-camel-bbq"][0] },
  { slug: "evening-tour-quad-camel-bbq", review: REVIEWS["evening-tour-quad-camel-bbq"][1] },
  { slug: "abu-dhabi-tour-sheikh-zayed-mosque", review: REVIEWS["abu-dhabi-tour-sheikh-zayed-mosque"][1] },
];
