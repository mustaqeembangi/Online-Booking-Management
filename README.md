# Ammar Tours website

Tour website for Ammar Tours, Dubai. Static Next.js site, deployed by Vercel from Git pushes. Bookings are sent as a prefilled WhatsApp message. No database and no online payment.

## Map

- `src/data/tours.ts`: every tour, price and rating. Edit tours here.
- `src/data/site.ts`: phone, WhatsApp, email, address and social links.
- `src/app`: pages (home, tours, tour detail, about, contact, sitemap, robots).
- `src/components`: `ui` controls, `layout` header and footer, `home`, `tours` (card and booking panel), `info`.
- `src/lib/whatsapp.ts`: builds WhatsApp links and booking messages.
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
