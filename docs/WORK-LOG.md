# Work log

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
