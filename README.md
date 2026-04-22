# Blog (Next.js 16)

A minimal blog application built with Next.js App Router, React 19, TypeScript, and Tailwind CSS v4.

## Project Status

Current status: functional prototype.

- Home page lists posts from an in-memory data source.
- Dynamic route renders full post details at /blog/[slug].
- Create form submits through a server action with basic validation.
- Lint and production build both pass.

Production readiness is not complete yet. The create flow does not persist data and several navigation links point to routes that are not implemented. See TASKS.md for prioritized work.

## Tech Stack

- Next.js 16.2.4 (App Router, Turbopack)
- React 19.2.4
- TypeScript 5 (strict mode)
- Tailwind CSS v4 via @import and @theme
- ESLint 9 with eslint-config-next/core-web-vitals and typescript presets

## Application Structure

Top-level layout:

- app/layout.tsx: root layout, metadata, global shell
- app/page.tsx: home page with recent post cards
- app/blog/[slug]/page.tsx: dynamic post detail route
- app/blog/create/page.tsx: create post page
- app/blog/create/create-post-form.tsx: client form and action wiring
- app/actions.ts: server action for create flow validation
- app/lib/posts.ts: in-memory post data and read-time helper
- app/ui/header.tsx and app/ui/footer.tsx: shared navigation/footer
- app/globals.css: Tailwind v4 setup and design tokens

## Implemented Routes

- /: static home page
- /blog/[slug]: dynamic blog post route
- /blog/create: static create-post page

Notes:

- Header currently links to /blog and /about, but those routes do not exist yet.

## Local Development

Prerequisites:

- Node.js 20 LTS or newer
- npm 10 or newer

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

Run production server:

```bash
npm run start
```

## Quality Check Snapshot

Verification run on 2026-04-22:

- npm run lint: passed
- npm run build: passed

## Known Gaps

- Create post action validates title/content only and does not persist data.
- Tag and excerpt fields are captured by the form but ignored in server action logic.
- Posts are hardcoded in memory, with no database or CMS integration.
- No automated test suite is configured yet.

## Next Steps

See TASKS.md for prioritized implementation work and suggested delivery order.
