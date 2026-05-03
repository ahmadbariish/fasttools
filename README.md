# Googleads

Next.js App Router project for bilingual browser tools.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. The root route redirects to `/en`; Arabic content is available under `/ar`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Architecture

- `app/` contains the Next.js App Router routes.
- `app/[lang]/` contains localized English and Arabic pages.
- `app/[lang]/tools/[slug]/page.tsx` renders the browser tools by slug.
- `lib/pseo/pages.ts` contains the pSEO tool slug registry and metadata builders.
- `app/sitemap.ts` and `app/robots.ts` generate SEO files.
- `middleware.ts` keeps localized routing under `/en` and `/ar`.
