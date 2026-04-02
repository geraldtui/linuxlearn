# Spec 5.3: Landing Page

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a new visitor, I want to understand what SudoSchool offers and easily start my first lesson.

## Context

### Why

The landing page is the entry point for the application. It needs to be fast, SEO-friendly, and compose the marketing components created in Phase 4. It also provides a smart CTA that resumes progress if the user has visited before.

### Related Specs

- Spec 4.6: Landing Page Components (`Hero`, `Features`, `HowItWorks`)
- Spec 3.2: localStorage Integration (`getAllProgress()`)

### Dependencies

- Spec 4.6: Landing Page Components
- Spec 3.2: localStorage Integration

## Technical Specification

### Components/Modules

**File**: `src/pages/en/index.tsx`
- Composes `<Header>`, `<Hero>`, `<Features>`, and `<HowItWorks>`
- Checks `localStorage` on mount to determine CTA state

**File**: `next.config.js` (or similar Next.js config)
- Configures rewrite/redirect from `/` to `/en`

## Acceptance Criteria

- [ ] **AC1**: Page composition
  - Given a user visits the landing page
  - When the page renders
  - Then it displays the Header, Hero, Features, and HowItWorks components in order

- [ ] **AC2**: Root redirect
  - Given a user navigates to the root URL `/`
  - When the request is processed
  - Then they are redirected or rewritten to `/en` (or the configured default locale path)

- [ ] **AC3**: Smart CTA - New user
  - Given a user with no saved progress in `localStorage`
  - When the Hero component renders
  - Then the primary CTA says "Start Learning" and links to `/learn`

- [ ] **AC4**: Smart CTA - Returning user
  - Given a user has saved progress for at least one lesson
  - When the Hero component mounts and checks storage
  - Then the primary CTA updates to "Continue Learning" and links to their most recently active lesson (or the catalog)

- [ ] **AC5**: SEO Metadata
  - Given the landing page is rendered
  - When inspecting the document `<head>`
  - Then appropriate `<title>` and `<meta name="description">` tags are present

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Added smart CTA logic to Hero component and SEO metadata to index page.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft