# Project status

Updated 2026-11-09.

**Current task:** 2026 visual redesign, on branch `design/2026`, committed locally and shown on a dev preview. Not pushed, so the live site is unchanged.

**Live site:** the first version is on `main` (e9e6182). The Vercel deployment result has not been checked from here.

**Needs the operator**
- Review the new design on the preview and say whether it can go live.
- Confirm prices. GetYourGuide "from" prices are used for its six tours. Other prices come from the old ammartours.com and may be out of date. Evening safari, morning safari and Abu Dhabi city tour show "Ask for price" because the old prices conflicted.
- Confirm +971 55 231 3157 is also the WhatsApp number.
- Supply a cancellation policy and real photos for the six GetYourGuide tours, which reuse older photos.
- Revoke the Cloudinary key that was committed in the old `.env.local.example`.
- Tell the owner ammartours.com is hacked (casino spam, broken forms).

**Decisions:** no database in v1, booking is a prefilled WhatsApp message, no online payment.

**Next action:** the operator reviews the preview. After approval, merge `design/2026` into `main` and push, which deploys through Vercel.
