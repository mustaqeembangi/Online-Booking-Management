# Project status

Updated 2026-11-09.

**Current task:** replace the Chisfis demo template with a real Ammar Tours website.

**State:** the new site replaced the template and is pushed to `main` (3b2f8c1) and `redesign/ammar-tours`. The Vercel deployment result has not been checked from here.

**Needs the operator**
- Review the live design and say what should change.
- Confirm prices. GetYourGuide "from" prices are used for its six tours. Other prices come from the old ammartours.com and may be out of date. Evening safari, morning safari and Abu Dhabi city tour show "Ask for price" because the old prices conflicted.
- Confirm +971 55 231 3157 is also the WhatsApp number.
- Supply a cancellation policy and real photos for the six GetYourGuide tours, which reuse older photos.
- Revoke the Cloudinary key that was committed in the old `.env.local.example`.
- Tell the owner ammartours.com is hacked (casino spam, broken forms).

**Decisions:** no database in v1, booking is a prefilled WhatsApp message, no online payment.

**Next action:** open the live site and confirm Vercel deployed it, then work through the items above.
