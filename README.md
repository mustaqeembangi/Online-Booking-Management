# Ammar Tours website

Tour website for Ammar Tours, Dubai. Static Next.js site, deployed by Vercel from Git pushes. Bookings are sent as a prefilled WhatsApp message. No database and no online payment.

## Map

- `src/data/tours.ts`: every tour, price, rating, photos and GetYourGuide link. Edit tours here (English text).
- `src/data/tours-ar.ts`: Arabic text for the same tours and categories. Keep list order the same as the English.
- `src/data/reviews.ts`: real GetYourGuide reviews shown on tour pages and the home page.
- `src/data/site.ts`: phone, WhatsApp, email, address and social links.
- `src/i18n`: languages. `ui.ts` holds every interface text in English and Arabic; `lp(lang, path)` makes links (`/tours` or `/ar/tours`).
- `src/views`: the pages themselves (home, tours, tour detail, about, contact, not found) and `SiteShell` (html, fonts, header, footer). Each takes `lang`.
- `src/app/(en)` and `src/app/(ar)/ar`: thin route files for English (`/`) and Arabic (`/ar`), each group with its own root layout. Sitemap, robots, icons and share images stay in `src/app`.
- `src/components`: `ui` controls, `layout` header and footer, `home`, `tours` (card, booking panel, gallery, reviews), `info`.
- `src/lib/whatsapp.ts`: builds WhatsApp links and booking messages (Arabic messages show both tour names). `src/lib/seo.ts`: titles, descriptions, canonical and hreflang.
- `public/images`: logo and tour photos.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run build
```

## Notes

- [Current status](docs/PROJECT-STATUS.md)
- [Work log](docs/WORK-LOG.md)
- [Redesign plan and content rules](docs/REDESIGN-PLAN.md)
