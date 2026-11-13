# Project status

Updated 2026-11-13.

**State:** live on `main` at https://travel.ammartours.com since 2026-11-13: the 2026 redesign, the SEO and share-image work, and only the six GetYourGuide tours, each with its GetYourGuide photo gallery and full text, on a GetYourGuide-style tour page; real guest reviews and a "Book on GetYourGuide" link; the whole site in Arabic under `/ar` (since 2026-11-13). The 22 old tours were removed and redirect to `/tours`.

**Ready, not live:** GetYourGuide-style tour pages (commit c72fbde on `content/gyg-tours`); the operator chose not to publish yet on 2026-11-13.

**Needs the operator**
- Confirm +971 55 231 3157 is also the WhatsApp number.
- Ideally have a native Arabic speaker read the Arabic pages once (written by Claude).
- Confirm whether the GetYourGuide cancellation rule (full refund up to 24 hours before) also applies to direct WhatsApp bookings; it is not shown on the site yet.
- Revoke the Cloudinary key that was committed in the old `.env.local.example`.
- Tell the owner ammartours.com is hacked (casino spam, broken forms).

**Decisions:** no database in v1, booking is a prefilled WhatsApp message, no online payment.

**Next action:** submit the sitemap (https://travel.ammartours.com/sitemap.xml) in Google Search Console.
