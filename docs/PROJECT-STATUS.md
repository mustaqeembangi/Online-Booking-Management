# Project status

Updated 2026-11-13.

**State:** live on `main` at https://travel.ammartours.com since 2026-11-13: the 2026 redesign, the SEO and share-image work, and only the six GetYourGuide tours (photos and full text from GetYourGuide). The 22 old tours were removed the same day and redirect to `/tours`.

**Needs the operator**
- For more than two photos per tour, export them from the GetYourGuide supplier account (scrapers only reach the main photo).
- Confirm +971 55 231 3157 is also the WhatsApp number.
- Confirm whether the GetYourGuide cancellation rule (full refund up to 24 hours before) also applies to direct WhatsApp bookings; it is not shown on the site yet.
- Revoke the Cloudinary key that was committed in the old `.env.local.example`.
- Tell the owner ammartours.com is hacked (casino spam, broken forms).

**Decisions:** no database in v1, booking is a prefilled WhatsApp message, no online payment.

**Next action:** submit the sitemap (https://travel.ammartours.com/sitemap.xml) in Google Search Console.
