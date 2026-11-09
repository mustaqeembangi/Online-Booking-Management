# Work log

## 2026-11-09: new Ammar Tours website

**What changed:** new site on Next.js 16, React 19 and Tailwind 4 replacing the demo template. Pages: home, tours with category filter, 28 tour pages, about, contact, 404, sitemap and robots. Booking panel sends a prefilled WhatsApp message.

**Why:** the template had invented phone number, ratings, testimonials and a fake card checkout.

**Sources:** six tours, ratings and prices from the operator's GetYourGuide paste. Other tours and photos from ammartours.com. Contact details from the operator.

**Paths:** `src/data/tours.ts`, `src/data/site.ts`, `src/app`, `src/components`, `docs/REDESIGN-PLAN.md`.

**Checks run:** `tsc --noEmit` passed. `npm run lint` had one unused-import warning, since fixed. `npm run build` passed, 36 static pages, before that one-line fix. Browser run at 390, 820, 1180 and 1440 wide across 8 routes: no horizontal overflow, no broken images. Booking flow on desktop and phone opened WhatsApp with the right message.

**Delivery:** on branch `redesign/ammar-tours`, not merged to `main`. The operator removed the old template files by hand.
