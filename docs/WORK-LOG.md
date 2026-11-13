# Work log

## 2026-11-13: Arabic version of the whole site

**What changed:** every page now exists in Arabic under `/ar` (home, tours, categories, all six tours, about, contact, not found), right-to-left with `<html lang="ar" dir="rtl">`, Cairo + IBM Plex Sans Arabic fonts (loaded only on Arabic pages), no letter spacing, taller line heights, mirrored arrows, RTL photo viewer (next on the left, swipe and arrow keys follow), RTL carousel, Arabic calendar (react-day-picker `ar` locale). Header has an English / عربي switch that keeps the page. Arabic WhatsApp booking messages use Arabic labels and date and show the Arabic and English tour names. Reviews stay in the guests' English with a note. SEO: canonical + hreflang (en, ar, x-default) on every page, Arabic titles/descriptions, `og:locale` ar_AE, sitemap lists both languages (24 entries). Unknown addresses show the styled 404 in the right language (catch-all routes). English URLs unchanged.

**Structure:** pages moved to `src/views` (take `lang`); routes in `src/app/(en)` and `src/app/(ar)/ar` (two root layouts sharing `SiteShell`); interface text in `src/i18n/ui.ts`; tour Arabic text in `src/data/tours-ar.ts`. Share images stay at `/opengraph-image` and `/tours/<slug>/opengraph-image` (outside the groups; inside a group they got hashed URLs). Arabic pages use the English share images. Translations written by Claude in plain Modern Standard Arabic; not reviewed by a native speaker yet.

**Checks run:** `tsc --noEmit`, eslint, `npm run build` passed (stale `.next/dev` types from an old dev server were moved to /tmp; they referenced the old page paths). Built site: 18 URLs checked for status, `lang`/`dir` and title; hreflang tags on an Arabic tour; 404s in both languages; old tour redirect 308; Arabic home, tour page and phone booking sheet with calendar screenshotted; Arabic booking produced the expected WhatsApp text; language switch maps tour ↔ /ar tour; 12 pages × 8 sizes with no sideways scrolling or broken images. The "View all photos" badge moved to the corner the booking card does not cover on desktop.

**Delivery:** committed with the reviews / GetYourGuide work; push waits for the operator's OK.

## 2026-11-13: real guest reviews and "Book on GetYourGuide"

**What changed:** real GetYourGuide reviews (from the operator's saved pages) on each tour ("Guest reviews" row with a link to all reviews on that tour's GetYourGuide page) and a "What guests say" section on the home page (3 reviews, each linking to its tour). Data in `src/data/reviews.ts`; cards in `src/components/tours/ReviewCard.tsx` (long ones fold at 5 lines with Read more). Star counts per review are not shown: the saved pages draw every star the same, so a per-review rating could not be read. Left out: Slovenian-language, mixed, and Qasr Al Watan list reviews from 2023 that describe a Dubai tour (Zabeel Palace, Bastakiya); Qasr Al Watan shows its 2025 featured review, cut at a sentence. Each tour now has its GetYourGuide URL (`tour.gyg.url`): the header rating and a "Prefer to pay online? Book on GetYourGuide" line in the booking card / phone sheet link to it. Booking card made shorter (tighter spacing, note behind "Add a note") so it fits a 1440×900 screen.

**Checks run:** `tsc --noEmit`, eslint, `npm run build` passed. Built site: reviews render on tour and home pages, Read more expands, GetYourGuide link present on desktop and in the phone sheet with the right URL; card height 729 px of 729 px available at 1440×900 (1280×800: 38 px scroll inside the card); 6 pages × 8 sizes with no sideways scrolling or broken images (a 320 px overflow from review cards was found and fixed).

## 2026-11-13: new Facebook link

**What changed:** Facebook link set to https://www.facebook.com/profile.php?id=61595509272753 (operator supplied). One setting in `src/data/site.ts`, used by the contact page, footer and the site's structured data (`sameAs`).

**Checks run:** `tsc --noEmit` and `npm run build` passed.

## 2026-11-13: clickable photos everywhere, hero slideshow, motion on every browser

**What changed:** home hero is a crossfading slideshow of 5 GetYourGuide photos with a slow zoom (`src/components/home/HeroSlides.tsx`); each slide links to its tour, with progress bars to pick one; pauses on hover, in hidden tabs and for reduced motion. Tour pages: the main photo opens the full-screen viewer ("View all N photos"), the viewer has a thumbnail strip and preloads neighbours (`src/components/tours/Gallery.tsx`: `PhotoViewer`, `PhotoTrigger`, `GalleryGrid`). Route stops open Google Maps. Clickable now: home chapter cards (tour), booking steps (tours / WhatsApp), sample message (WhatsApp with that text), facts strip (GetYourGuide, tours, WhatsApp; pauses on hover), About dunes photo and matching services (category pages). Hover lift / press feedback on cards and tiles. Scroll-in animation now also on Safari and Firefox via `src/components/layout/RevealOnScroll.tsx` (IntersectionObserver fallback; nothing hidden without JavaScript); tour page sections and gallery photos animate in.

**Why:** the operator asked for clickable photos and elements, more animation and fluid design, and a more beautiful hero.

**Checks run:** `tsc --noEmit`, eslint and `npm run build` passed. Built site: slideshow advances (7 s) and a slide click opens its tour; tour main photo opens photo 1 of 26 and the left arrow wraps to 26; chapter card opens its tour; reveal fallback forced in Chromium revealed 13 of 13 sections while scrolling (WebKit not installed here, so Safari itself not tested); 6 pages × 8 sizes with no sideways scrolling or broken images; phone screenshots checked.

**Delivery:** pushed to `main` (e0e61ec) after the operator's OK; live home shows the slideshow and tour pages the photo viewer.

## 2026-11-13: less empty space, photo viewer, smoother feel

**What changed:** section spacing cut from up to 10rem to 6.5rem; home contact band, "chapters" cards and category tiles made shorter (home at 1440 px: chapters 1943 → 1604 px, contact band 810 → 576 px). Tour header shorter on laptops, smaller photo on phones. Tour galleries are a 3-column grid on every screen and open a full-screen viewer (tap, swipe, arrow keys, Esc; `src/components/tours/Gallery.tsx`). Floating WhatsApp button hidden on tour pages (they have the Book bar / booking card), so it no longer covers text on phones. Smooth scrolling and photo hover zoom (off with reduced motion). The sample booking message names a current tour.

**Why:** the operator found too much white space and asked for better, smoother UI on every screen size.

**Checks run:** `tsc --noEmit`, `npm run lint`, `npm run build` passed. Built site: section heights measured at 1440 and 390 px; desktop and phone screenshots checked; viewer opened, stepped and closed on a phone; 6 pages × 8 sizes (320 to 2560 px) with no sideways scrolling and no broken images.

**Delivery:** pushed to `main` (d6fa6f4) after the operator's OK; live pages return 200 and show the viewer.

## 2026-11-13: full GetYourGuide galleries for the other five tours

**What changed:** the operator saved the other five GetYourGuide pages (.mht). Galleries found: Red Dune BBQ 25, Safari BBQ Buffet 24, Evening Tour 31, Abu Dhabi Sheikh Zayed 13, Qasr Al Watan 13. Curated to 20 / 20 / 26 / 8 / 8 (counts that fill the grid evenly; dropped near-duplicates, empty-sand shots and dune-buggy shots, which are not part of these tours). Home "chapters" third chapter is "The camp" again, with a real fire show photo. About hero uses the plain dunes photo (`red-dune-safari-quad-camel-bbq-20.jpg`).

**Paths:** `public/images/tours/<slug>[-N].jpg`, `src/data/tours.ts` (`photos(slug, count)`), `src/components/home/EveningSequence.tsx`, `src/app/about/page.tsx`. Originals: `/home/dev/uploads/gyg-photos/<tour id>-gallery/`.

**Checks run:** `tsc --noEmit`, `npm run lint`, `npm run build` passed; local screenshots of two tour galleries and the camp chapter checked; no broken images on home.

## 2026-11-13: full photo gallery for the Desert Safari, Quad Bike, Camel and Sandboarding tour

**What changed:** the operator saved the GetYourGuide page from their own browser (.mht). It lists the tour's 15 gallery photos; 14 are used (main photo + a gallery grid on the tour page: one large photo, then a 3-column grid, 2 on phones). Originals (2560 px) in `/home/dev/uploads/gyg-photos/t74766-gallery/`. About page now uses photo 3 of that set.

**How:** read photo IDs from the saved page (`tour_img/<id>`), download `cdn.getyourguide.com/img/tour/<id>/80.jpg`. The same works for the other five tours once their pages are saved.

**Checks run:** `tsc --noEmit`, `npm run build` passed; desktop screenshot checked.

**Delivery:** pushed to `main` (9e83ff1).

## 2026-11-13: tour page redesigned in GetYourGuide style

**What changed:** tour pages now use GetYourGuide's layout: a key-facts row (duration, pickup, guide, payment) and topic rows with the title on the left: Highlights, What's included (with the 7-hour option and Not included inside it, tick / plus / cross marks), Route (Abu Dhabi tours, pickup to drop-off), Not suitable for, Important information (What to bring, Good to know). The duplicate duration line in the header was removed. "More …" heading only when every related tour shares the category.

**Why:** the operator found the included / not included / avoid sections poorly designed and asked for the site to follow GetYourGuide.

**Paths:** `src/app/tours/[slug]/page.tsx`.

**Checks run:** `tsc --noEmit`, `npm run lint`, `npm run build` passed; desktop and phone screenshots of the built pages checked.

**Delivery:** pushed to `main` (9e83ff1).

## 2026-11-13: site cut down to the six GetYourGuide tours

**What changed:** the 22 tours taken from the old ammartours.com were removed, with their photos; their URLs redirect (308) to `/tours`. Two categories remain: Desert safaris (4) and City tours (2). Home hero is now the GetYourGuide photo of an Ammar 4x4 with sandboarders ("Dunes. Desert. City."). The "chapters" section now uses the Red Dune Safari's GetYourGuide lists in three chapters (drive, dunes, evening). About page, contact band and share image use GetYourGuide photos. Dhow cruise and other removed tour wording taken out of titles, descriptions and the About services list (Musandam, Hatta, water sports, fishing, golf, scuba, helicopter, dhow cruise removed from it).

**Why:** the operator asked to keep only what is on GetYourGuide and to use the new photos for the hero.

**More photos:** also tried Apify actors `vanderleicatanzaro/getyourguide` (needs a paid plan), `tortuga/getyourguide-scraper` and `parsebird/getyourguide-scraper`: none return more than the main photo. More photos need the GetYourGuide supplier account.

**Paths:** `src/data/tours.ts`, `next.config.ts`, `src/components/home/*`, `src/app/about/page.tsx`, `src/app/opengraph-image.tsx`, `src/lib/seo.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/tours/page.tsx`, `public/images/tours`.

**Checks run:** `tsc --noEmit`, `npm run lint`, `npm run build` passed. Production build served locally: home (desktop and phone), category tiles, about and tours list screenshots checked; an old tour URL returns 308 to `/tours`.

**Delivery:** pushed to `main` (9e83ff1) after the operator's explicit OK.

## 2026-11-13: GetYourGuide photos and full text for the six GetYourGuide tours

**What changed:** each of the six tours now has its own two GetYourGuide photos (2560 px originals, saved at 1920 px) and the full GetYourGuide text: highlights, what's included, what the 7-hour option adds, stops (Abu Dhabi tours), not included, good to know, not suitable for, what to bring. Review counts updated. GetYourGuide filler lines ("Guide 5.0/5", guide-marketing blurbs) and a desert-sunset line wrongly on an Abu Dhabi listing were left out. Qasr Al Watan lists exist only in Spanish on GetYourGuide and were translated.

**How the content was fetched:** GetYourGuide refuses direct requests (403). Apify actors with the Social Hub key (`SCRPR_APIFY_TOKEN`): `scrapesage/getyourguide-scraper` for text, `memo23/tours-activities-scraper` for a second photo. Neither returns the full gallery; generic crawlers were blocked. About $0.36 spent. Raw data and originals in `/home/dev/uploads/gyg-photos/` (not in the repo). CDN size `/80.jpg` = 2560x1707.

**Paths:** `src/data/tours.ts` (new optional fields `photos`, `highlights`, `optionIncludes`, `stops`, `notIncluded`, `notSuitableFor`, `whatToBring`), `src/app/tours/[slug]/page.tsx`, `public/images/tours/<slug>.jpg` and `<slug>-2.jpg`.

**Checks run:** `tsc --noEmit` and eslint on the changed files passed. Dev server on 5181: all six tour pages, one other tour and home return 200; desktop and phone screenshots checked. `npm run build` passed. After deploy: all six live pages, their second photos and the home page return 200 and show the new sections.

**Delivery:** the operator approved going live without viewing the preview. Pushed `content/gyg-tours` to `main` (e6cecf6, includes the SEO work 3f65e8f); Vercel deployed it to travel.ammartours.com on 2026-11-13.

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
