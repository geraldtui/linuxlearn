# Spec 4.5: Header Component

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want clear navigation, So that I can return to the lesson list or home page.

## Context

### Why

A consistent header anchors branding and primary routes across lesson and marketing pages, using Next.js client navigation where applicable.

### Related Specs

- None (layout shell; used by lesson and landing pages)

### Dependencies

- Next.js `Link` for internal routes

## Technical Specification

### Components/Modules

**File**: `src/components/Header.tsx`
- Renders product name / logo text linking to home
- Renders primary nav links (at minimum Home and Learn)
- Uses Next.js `<Link>` for internal navigation

**Routes** (project uses rewrites; user-facing paths may be `/` and `/learn` mapping to `/en` and `/en/learn`)

## Acceptance Criteria

- [x] **AC1**: Branding link (serves as Home)
  - Given the header is visible
  - When the user clicks the SudoSkills brand
  - Then they navigate to the site home (e.g. `/` or `/en`); a separate “Home” nav item is optional if the brand already fulfils this

- [x] **AC2**: Learn link
  - Given the header is visible
  - When the user clicks Learn
  - Then they navigate to the lesson catalog (e.g. `/learn` or `/en/learn`)

- [x] **AC3**: Next.js Link usage
  - Given an internal nav entry
  - When implemented
  - Then it uses Next.js `<Link>` (not raw `<a href>` for client-side transitions)

- [x] **AC4**: Dark theme and layout
  - Given any supported page
  - When the header renders
  - Then it uses the shared dark surface styling and horizontal padding consistent with the rest of the app

- [x] **AC5**: Active route indication (optional enhancement)
  - Given the router reports the current path
  - When the user is on Learn or Home
  - Then the matching nav item may show an active style; if not implemented, nav must still function (no broken links)

## Edge Cases

- Additional links (e.g. Cheatsheet) may be omitted or disabled until a future phase; do not leave dead links

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 10/10
- **Notes**: Implementation validated against spec, all 5 ACs satisfied, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Brand → home with `aria-label`; Learn uses Next.js `Link`; active style on Learn when `pathname` includes `/learn`; nav `aria-label="Main"`
- **Files**: `src/components/Header.tsx`
- **Deviations**: None

### 2026-03-31 — Review / Update (AC1)
- **Changed**: AC1 — brand link explicitly doubles as Home; separate Home nav optional

### 2026-03-31 — Review / Update
- **Changed**: AC5 framed as optional with fallback so strict “active link” is not blocking MVP
- **Changed**: Documented rewrite-friendly paths (`/` / `/learn`)
- **Status**: Draft → Approved

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
