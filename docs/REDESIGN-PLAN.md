# Ammar Tours redesign plan

Replace the Chisfis demo template with a focused tour website for Ammar Tours. Static site, no database in v1. Bookings are sent as a prefilled WhatsApp message. Vercel deploys from pushes.

## Stack

Latest stable Next.js (App Router), React, TypeScript and Tailwind CSS. Keep `@vercel/analytics`. Add only what is needed: `react-day-picker` for the date picker, `@headlessui/react` for menus and popovers, an icon set such as `lucide-react`. Remove everything else from the template (30+ demo pages, stays, cars, flights, real estate, auth, checkout, demo JSON, `src/images`, `.env.local.example`).

## Facts rules

- `src/data/tours.ts` and `src/data/site.ts` are the only source of business facts. Do not edit tour facts.
- Never invent ratings, review counts, testimonials, customer numbers, years in business, licences, discounts, or cancellation policies.
- Real ratings exist only in `tour.gyg` and `GYG_TOTAL_REVIEWS`. Always show them as GetYourGuide ratings, for example "4.9 on GetYourGuide (45,718 reviews)", and link to `SITE.socials.getyourguide`. Never as structured-data `aggregateRating`. Never show the old struck-through GetYourGuide price.
- Tours with `price: null` show "Ask for price". Show prices in the currency in the data. Missing duration or times are simply left out, never shown as blank labels.
- `includes` can be empty: hide that block when it is.
- Everyday words for customers, no marketing filler such as "unforgettable" or "world-class".

## Design

An original look. Not like excursionpoint or funtoursdubai: no top bars, discount badges, struck-through prices, star emoji or crowded card walls. Big real photography, lots of white space, confident type.

- Colours: ink `#12201A`, logo green `#6FBF44` (button fill with ink text), deep green `#2F6B2A` (links and small accents on white), dune `#C65A1E` (used sparingly, for prices), white page background, hairlines `#E4E7E2`. Sections are white or solid ink.
- No pastel pills or tinted boxes. Chips are solid colour with strong text, or plain text.
- Type via `next/font`: Bricolage Grotesque for headings, Instrument Sans for body.
- Never browser-default controls: no native `<select>`, date input, `alert`/`confirm`, `title` tooltips. Scrollbars are themed thin. Inputs are custom styled.
- Works at phone (390), iPad portrait and landscape, and desktop (1440). No horizontal overflow.
- `next/image` for every photo with correct `sizes`. Meaningful `alt` text. Visible keyboard focus.
- No dark mode.

## Pages

| Route | Content |
|---|---|
| `/` | Full-bleed photo hero (`/images/tours/dune-bashing.jpg`) with headline and two actions, the five categories, a selection of featured tours, the evening safari told as a sequence of what happens using its `includes`, three-step "how booking works", and an ink contact band. |
| `/tours` | All tours with a category filter driven by `?category=`. |
| `/tours/[slug]` | Statically generated. Photo, summary, key facts, included list, extras, notes, related tours, and the booking panel. On phones the panel becomes a sticky bottom bar opening a sheet. |
| `/about` | Facts from the company: Dubai tour operator, services (hotel accommodation, visas, inter-emirates city tours, desert safari, Musandam trips, Hatta mountain safari, water sports, fishing trips, golf, scuba diving, helicopter tours, dhow cruise dinner, airport meet and assist, multilingual guides). |
| `/contact` | Phone, WhatsApp, email, address with map link, social links, and a message form that opens WhatsApp prefilled. |

Also `not-found`, `sitemap.ts`, `robots.ts`, per-page metadata, Open Graph, and JSON-LD (`TravelAgency` site-wide, `TouristTrip` on tours, no `aggregateRating`). Redirect old template routes `/listing-experiences*` to `/tours`.

## Booking

The panel collects date (custom picker, no past dates), adults, children, tour type when the tour has both, pickup hotel or area, name and an optional note. It respects `minGuests`. It shows a total only when the tour has a price, and labels it as an estimate. Submit opens `https://wa.me/<SITE.whatsappNumber>?text=<encoded summary>`. No payment and no fake confirmation page.

## Shared module contract (built first, then used by page work)

- `src/lib/whatsapp.ts`: `whatsappLink(message?: string): string` and `bookingMessage(input: BookingInput): string`.
- `src/components/ui/Button.tsx`: `<Button href? variant="primary|outline|ink" size="md|lg" icon?>`.
- `src/components/ui/Container.tsx`, `DatePicker.tsx`, `Stepper.tsx`, `TextField.tsx`, `Select.tsx`.
- `src/components/layout/Header.tsx`, `Footer.tsx`, `WhatsAppFab.tsx`.
- `src/components/tours/TourCard.tsx`: `<TourCard tour={tour} />`.

## Working rules for builders

Do not run git commit, push or branch commands. Stay inside your own files. Check with `npx tsc --noEmit` and only your own pages. Do not start long-running dev servers on ports other than the one given to you.
