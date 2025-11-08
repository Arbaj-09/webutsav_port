# WebUtsav Portfolio 2025 (Next.js 14 + TS)

Production-ready portfolio app with Tailwind, App Router, dynamic PDF generation (@react-pdf/renderer), and dynamic product pages.

## Quick start

1) Install dependencies

```bash
npm install
```

2) Run dev server

```bash
npm run dev
```

Open http://localhost:3000

3) Generate PDF

- Click "Download Portfolio PDF" in hero or footer.
- Dynamic API: GET /api/generate-pdf
- Static fallback: /WebUtsav_Portfolio_2025_Final.pdf (add a real PDF into /public to enable fallback)

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Build
- `npm start` — Run production build

## Notes
- Tailwind is configured (globals.css includes @tailwind)
- Remote images allowed in next.config.js
- Sitemap at /sitemap.xml
- Products data in /data/products.json (18 entries)
- Clients data in /data/clients.json
