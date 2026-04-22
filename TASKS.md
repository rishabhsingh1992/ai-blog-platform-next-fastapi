# TASKS

Prioritized engineering backlog for moving this project from prototype to production-ready blog.

## P0: Correctness and Navigation

- [ ] Implement missing route at /blog or remove the header link to it.
- [ ] Implement missing route at /about or remove the header link to it.
- [ ] Decide whether home page (/) and /blog should have distinct behavior; document that choice in README.md.

## P1: Persisted Content Flow

- [ ] Replace in-memory posts in app/lib/posts.ts with a persistent data store.
- [ ] Add a post model with slug, title, tag, excerpt, content, createdAt, and updatedAt.
- [ ] Update app/actions.ts createPost to persist posts and handle write failures.
- [ ] Use tag and excerpt fields in createPost, not just title/content.
- [ ] Add server-side slug generation and duplicate-slug protection.
- [ ] Revalidate affected routes after create (home and detail pages).

## P1: Validation and UX Hardening

- [ ] Introduce schema validation for form input (for example, zod).
- [ ] Enforce length limits and content constraints for title, excerpt, and body.
- [ ] Return structured field-level errors consistently from server action.
- [ ] Add success redirect to newly created post after successful publish.

## P2: Testing and Reliability

- [ ] Add unit tests for post helper logic (including estimateReadTime).
- [ ] Add integration tests for create action validation behavior.
- [ ] Add route-level render tests for /, /blog/[slug], and /blog/create.
- [ ] Add CI workflow for lint + build + tests on pull requests.

## P2: Content and Platform Features

- [ ] Add metadata enhancements (Open Graph, Twitter cards, canonical URLs).
- [ ] Add 404 experience and post-not-found UX improvements.
- [ ] Define content authoring strategy: DB-backed admin UI, markdown files, or CMS.
- [ ] Add pagination and/or sorting for larger post collections.

## P3: Developer Experience

- [ ] Add scripts for type-checking and test execution in package.json.
- [ ] Add .env.example documenting required environment variables once persistence is added.
- [ ] Add architectural decision notes for chosen persistence and content pipeline.

## Completed Validation Snapshot (2026-04-22)

- [x] Baseline lint check passed.
- [x] Baseline production build passed.
