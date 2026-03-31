# Spec 5.1: Lesson Catalog Page

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to see all available lessons and my progress, So that I can choose what to learn next.

## Context

### Why

The catalog page is the main hub for learners to discover content and track their overall journey. It reads the static lesson metadata and merges it with client-side progress from `localStorage` to show completion states.

### Related Specs

- Spec 2.2: Lesson Data Structure (`LessonMeta` interface, `index.json`)
- Spec 3.2: localStorage Integration (`getAllProgress()`)
- Spec 4.5: Header Component

### Dependencies

- Spec 2.2: Lesson Data Structure
- Spec 3.2: localStorage Integration
- Spec 4.5: Header Component

## Technical Specification

### Data Models

- Uses `LessonMeta` from `src/types/index.ts`
- Uses `getAllProgress()` from `src/utils/storage.ts`

### Components/Modules

**File**: `src/pages/en/learn/index.tsx`
- Renders `<Header />`
- Imports `src/data/lessons/index.json` as static data
- Uses `useEffect` to load progress client-side
- Renders a grid/list of lesson cards

## Acceptance Criteria

- [ ] **AC1**: Displays all lessons
  - Given `src/data/lessons/index.json` contains multiple lessons
  - When the user navigates to `/learn`
  - Then a card/row is rendered for each lesson showing its title and description

- [ ] **AC2**: Shows progress for started lessons
  - Given the user has completed 3 out of 8 steps in the "basics" lesson
  - When the catalog page loads
  - Then the "basics" card shows "3 / 8 steps" and a "Continue" button

- [ ] **AC3**: Shows default state for unstarted lessons
  - Given the user has no progress for the "fileops" lesson
  - When the catalog page loads
  - Then the "fileops" card shows a "Start" button (or 0 / N steps)

- [ ] **AC4**: Navigation to lesson
  - Given the user clicks on a lesson card or its CTA button
  - When the click occurs
  - Then the user is navigated to `/en/learn/[slug]`

- [ ] **AC5**: Hydration mismatch prevention
  - Given the page uses `localStorage` (client-only)
  - When the page is SSR'd or statically generated
  - Then it does not throw hydration errors (e.g. by defaulting to 0 progress until mounted)

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Implementation verified. Cleaned up unused imports. All ACs met.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft