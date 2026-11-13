# Project status

Updated 2026-11-13.

**State:** the 2026 redesign is live on `main` at https://travel.ammartours.com. SEO and share-image work is committed on `seo/optimizations`, not yet live. GetYourGuide photos and full text for the six GetYourGuide tours are committed on `content/gyg-tours` (built on top of the SEO branch), not yet live.

**Needs the operator**
- Confirm whether the number on the car in the home page photo (04-345 88 99) is current.
- Supply a clean Atlantis photo without text.
- Confirm prices. GetYourGuide "from" prices are used for its six tours. Other prices come from the old ammartours.com and may be out of date. Evening safari, morning safari and Abu Dhabi city tour show "Ask for price" because the old prices conflicted.
- Confirm +971 55 231 3157 is also the WhatsApp number.
- Confirm whether the GetYourGuide cancellation rule (full refund up to 24 hours before) also applies to direct WhatsApp bookings; it is not shown on the site yet.
- Revoke the Cloudinary key that was committed in the old `.env.local.example`.
- Tell the owner ammartours.com is hacked (casino spam, broken forms).

**Decisions:** no database in v1, booking is a prefilled WhatsApp message, no online payment.

**Next action:** after the operator approves the preview, push `content/gyg-tours` (includes the SEO work) to `main`, then submit the sitemap in Google Search Console.
