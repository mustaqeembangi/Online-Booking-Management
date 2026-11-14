# Project status

Updated 2026-11-13.

**State:** live on `main` at https://travel.ammartours.com since 2026-11-13: the 2026 redesign, the SEO and share-image work, and only the six GetYourGuide tours, each with its GetYourGuide photo gallery and full text, on a tour page laid out like GetYourGuide (mosaic, full description, review summary); real guest reviews and a "Book on GetYourGuide" link; the whole site in Arabic under `/ar` (since 2026-11-13). The 22 old tours were removed and redirect to `/tours`.

**Ready, not live — two designs for the client to choose:** v1 classic tour-company look on `redesign/classic` (from the client's AI mock-up); v2 on `redesign/v2` (styled after oceanairtravels.com). Both branches pushed 2026-11-14 as Vercel previews (public since the operator turned off Vercel Authentication for previews; Vercel sends noindex): v1 https://online-booking-management-csp7if5kj-mbangi66s-projects.vercel.app , v2 https://online-booking-management-46nj2fltw-mbangi66s-projects.vercel.app . Live site unchanged. Next: client picks one, then merge that branch to `main`.

**Needs the operator**
- Confirm +971 55 231 3157 is also the WhatsApp number.
- The home headline says "Dune Buggy" but no tour offers one: add a buggy tour or change the word.
- Ideally have a native Arabic speaker read the Arabic pages once (written by Claude).
- Confirm whether the GetYourGuide cancellation rule (full refund up to 24 hours before) also applies to direct WhatsApp bookings; it is not shown on the site yet.
- Revoke the Cloudinary key that was committed in the old `.env.local.example`.
- Tell the owner ammartours.com is hacked (casino spam, broken forms).

**Decisions:** no database in v1, booking is a prefilled WhatsApp message, no online payment.

**Next action:** submit the sitemap (https://travel.ammartours.com/sitemap.xml) in Google Search Console.
