# Work log

## 2026-11-13: GetYourGuide photos and full text for the six GetYourGuide tours

**What changed:** each of the six tours now has its own two GetYourGuide photos (2560 px originals, saved at 1920 px) and the full GetYourGuide text: highlights, what's included, what the 7-hour option adds, stops (Abu Dhabi tours), not included, good to know, not suitable for, what to bring. Review counts updated. GetYourGuide filler lines ("Guide 5.0/5", guide-marketing blurbs) and a desert-sunset line wrongly on an Abu Dhabi listing were left out. Qasr Al Watan lists exist only in Spanish on GetYourGuide and were translated.

**How the content was fetched:** GetYourGuide refuses direct requests (403). Apify actors with the Social Hub key (`SCRPR_APIFY_TOKEN`): `scrapesage/getyourguide-scraper` for text, `memo23/tours-activities-scraper` for a second photo. Neither returns the full gallery; generic crawlers were blocked. About $0.36 spent. Raw data and originals in `/home/dev/uploads/gyg-photos/` (not in the repo). CDN size `/80.jpg` = 2560x1707.

**Paths:** `src/data/tours.ts` (new optional fields `photos`, `highlights`, `optionIncludes`, `stops`, `notIncluded`, `notSuitableFor`, `whatToBring`), `src/app/tours/[slug]/page.tsx`, `public/images/tours/<slug>.jpg` and `<slug>-2.jpg`.

**Checks run:** `tsc --noEmit` and eslint on the changed files passed. Dev server on 5181: all six tour pages, one other tour and home return 200; desktop and phone screenshots checked.

**Delivery:** committed on `content/gyg-tours` (on top of the unpushed `seo/optimizations`). Not pushed or deployed; waiting for the operator's OK on the preview.

## 2026-11-09: SEO, share images and small optimisations

**What changed:** site address corrected to `travel.ammartours.com` everywhere Google and link previews read it (it pointed at the old `ammartours.com`). New page titles and descriptions, category pages in the sitemap, breadcrumb and website structured data. Generated JPEG share images for the site and each tour, new site icons and web manifest. Security headers, image caching, AVIF, smaller logo, skip link.

**Paths:** `src/lib/seo.ts`, `src/lib/og.tsx`, `src/app/opengraph-image.tsx`, `src/app/tours/[slug]/opengraph-image.tsx`, `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/manifest.ts`, `src/app/sitemap.ts`, `next.config.ts`.

**Checks run:** `tsc --noEmit`, `npm run lint` and `npm run build` passed. Production build served locally: canonical, Open Graph, Twitter and structured data checked on 7 page types. Lighthouse mobile on a local build, before the final share-image fix: home 89 performance, 100 accessibility, 96 best practices, 100 SEO; tour page 96, 100, 96, 100. Best practices is held back by the Vercel Analytics script being unavailable locally.

**Delivery:** committed on `seo/optimizations`. Not pushed or deployed.

## 2026-11-09: 2026 visual redesign

**What changed:** new look across every page: floating glass menu, full-screen hero, oversized fluid type, photo bento grid, full-photo tour cards, swipeable tour rail, stacking evening chapters, WhatsApp message preview, split hero on tour pages, full-screen phone menu, floating booking bar.

**Why:** the operator felt the first version looked dated and asked for a current style that works on all screens.

**Paths:** `src/app/globals.css`, `src/components/layout`, `src/components/home`, `src/components/tours`, `src/components/ui/Rail.tsx`, `src/app`.

**Checks run:** 9 routes at 14 screen sizes from 320x568 to 3440x1440: no horizontal overflow or broken images. Hero text clear of the menu at 320x568 and 844x390. Phone booking flow opened WhatsApp with the right message. Scroll animations leave content fully visible. `tsc --noEmit`, `npm run lint` and `npm run build` passed.

**Delivery:** approved by the operator on the preview and pushed to `main`.

## 2026-11-09: new Ammar Tours website

**What changed:** new site on Next.js 16, React 19 and Tailwind 4 replacing the demo template. Pages: home, tours with category filter, 28 tour pages, about, contact, 404, sitemap and robots. Booking panel sends a prefilled WhatsApp message.

**Why:** the template had invented phone number, ratings, testimonials and a fake card checkout.

**Sources:** six tours, ratings and prices from the operator's GetYourGuide paste. Other tours and photos from ammartours.com. Contact details from the operator.

**Paths:** `src/data/tours.ts`, `src/data/site.ts`, `src/app`, `src/components`, `docs/REDESIGN-PLAN.md`.

**Checks run:** `tsc --noEmit` passed. `npm run lint` had one unused-import warning, since fixed. `npm run build` passed, 36 static pages, before that one-line fix. Browser run at 390, 820, 1180 and 1440 wide across 8 routes: no horizontal overflow, no broken images. Booking flow on desktop and phone opened WhatsApp with the right message.

**Delivery:** pushed to `main` and `redesign/ammar-tours` at 3b2f8c1 using a repo-only deploy key. A clean `npm ci`, type check, lint and build passed in the repo before the push. Vercel result not checked from here.
