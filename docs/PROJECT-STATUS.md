# Project status

Updated 2026-11-09.

**State:** the 2026 redesign is on `main`, approved by the operator on 2026-11-09. Vercel deploys from `main`.

**Needs the operator**
- Confirm whether the number on the car in the home page photo (04-345 88 99) is current.
- Supply a clean Atlantis photo without text.
- Confirm prices. GetYourGuide "from" prices are used for its six tours. Other prices come from the old ammartours.com and may be out of date. Evening safari, morning safari and Abu Dhabi city tour show "Ask for price" because the old prices conflicted.
- Confirm +971 55 231 3157 is also the WhatsApp number.
- Supply a cancellation policy and real photos for the six GetYourGuide tours, which reuse older photos.
- Revoke the Cloudinary key that was committed in the old `.env.local.example`.
- Tell the owner ammartours.com is hacked (casino spam, broken forms).

**Decisions:** no database in v1, booking is a prefilled WhatsApp message, no online payment.

**Next action:** work through the items above.
