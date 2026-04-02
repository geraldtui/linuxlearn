# Spec 4.6: Landing Page Components

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a new visitor, I want an attractive landing page that explains what SudoSchool is, So that I am motivated to start learning.

## Context

### Why

The landing page is the first impression: it should communicate value quickly, match the dark modern aesthetic, and route visitors to the lesson catalog via a clear primary CTA.

### Related Specs

- Spec 4.5: Header Component (typically composed on the landing page)
- Spec 5.3: Landing Page (page-level wiring; separate phase)

### Dependencies

- Spec 4.5: Header (recommended composition)
- Next.js `Link` for CTA

## Technical Specification

### Components/Modules

**Preferred structure** (extract from inline page markup if not already split):
- `src/components/landing/Hero.tsx` — headline, subheadline, primary CTA
- `src/components/landing/Features.tsx` — short value props (e.g. grid of feature cards)
- `src/components/landing/HowItWorks.tsx` — numbered or stepped explanation of the learn flow

**Page composition** (existing or new):
- `src/pages/en/index.tsx` (or equivalent) imports the above sections and `<Header />`

## Acceptance Criteria

- [x] **AC1**: Hero content and CTA
  - Given the landing page loads
  - When the user views the hero
  - Then they see a primary headline, supporting subheadline, and a CTA that navigates to the lesson catalog (`/learn` or `/en/learn`)

- [x] **AC2**: Features section
  - Given the landing page loads
  - When the user scrolls to the features area
  - Then at least three distinct value props are shown (e.g. interactive practice, progress tracking, no install)

- [x] **AC3**: How it works section
  - Given the landing page loads
  - When the user views the “how it works” section
  - Then the copy describes the core loop: read instruction → type command → get feedback → advance

- [x] **AC4**: Responsive layout
  - Given mobile and desktop widths
  - When the page renders
  - Then content reflows without horizontal overflow; feature grid stacks on small screens

- [x] **AC5**: Visual consistency
  - Given the app design tokens / Tailwind theme
  - When the landing sections render
  - Then they use the same dark background and accent colours as the learn experience (no clashing light-only theme)

## Edge Cases

- CTA label may be “Start Learning”; optional future variant “Continue Learning” belongs in Spec 5.3 when progress-aware routing is specified

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
- **Notes**: Added `Hero`, `Features`, `HowItWorks` under `src/components/landing/`; `en/index.tsx` composes them with `Header`; page uses `bg-terminal-bg` for theme consistency; How it works lists read → type → feedback → advance
- **Files**: `src/components/landing/Hero.tsx`, `Features.tsx`, `HowItWorks.tsx`, `src/pages/en/index.tsx`
- **Deviations**: None

### 2026-03-31 — Review / Update
- **Changed**: AC3 added explicit “how it works” content requirement (was implied only in roadmap)
- **Changed**: File paths under `src/components/landing/` for clarity and reuse
- **Status**: Draft → Approved

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
