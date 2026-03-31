# Spec 3.2: localStorage Integration

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a learner, I want my progress saved automatically, So that I don't lose my place when I close the browser.

## Context

### Why

Progress persistence is critical for learner motivation. A lightweight `localStorage` wrapper stores per-lesson progress (current step and furthest step reached) so the app can restore state on return visits. The original design referenced the `lookie` library (used by RegexLearn), but it was unavailable on npm, so a custom SSR-safe wrapper was built instead.

### Related Specs

- Spec 3.1: InteractiveTerminalContext (calls `loadProgress`/`saveProgress`)

### Dependencies

- None (standalone utility)

## Technical Specification

### Data Models

**File**: `src/utils/storage.ts`
- `LessonProgress` interface — fields: currentStep (number), lastStep (number)

### Components/Modules

**New File**:
- `src/utils/storage.ts` — exports `loadProgress`, `saveProgress`, `clearProgress`, `getAllProgress`

### Storage

- Key format: `lesson.{lessonKey}` (e.g., `lesson.basics`)
- Value: JSON-serialised `LessonProgress` object

## Acceptance Criteria

- [ ] **AC1**: saveProgress stores data under correct key
  - Given lessonKey `"basics"` and progress `{ currentStep: 3, lastStep: 5 }`
  - When `saveProgress("basics", progress)` is called
  - Then `localStorage.getItem("lesson.basics")` returns the JSON string

- [ ] **AC2**: loadProgress retrieves and parses stored data
  - Given `localStorage` contains `lesson.basics` with valid JSON
  - When `loadProgress("basics")` is called
  - Then it returns a `LessonProgress` object with correct `currentStep` and `lastStep`

- [ ] **AC3**: loadProgress returns null when no data exists
  - Given no entry for `lesson.navigation` in `localStorage`
  - When `loadProgress("navigation")` is called
  - Then it returns `null`

- [ ] **AC4**: clearProgress removes the lesson entry
  - Given `localStorage` contains `lesson.basics`
  - When `clearProgress("basics")` is called
  - Then `localStorage.getItem("lesson.basics")` returns `null`

- [ ] **AC5**: getAllProgress returns progress for all stored lessons
  - Given `localStorage` contains `lesson.basics` and `lesson.navigation`
  - When `getAllProgress()` is called
  - Then it returns `{ basics: {...}, navigation: {...} }` with both entries

- [ ] **AC6**: SSR-safe — all functions return defaults when window is undefined
  - Given code runs in a server-side context (`typeof window === 'undefined'`)
  - When any storage function is called
  - Then `loadProgress` returns `null`, `saveProgress`/`clearProgress` are no-ops, `getAllProgress` returns `{}`

## Edge Cases

- Corrupted JSON in localStorage: `loadProgress` catches the parse error, logs via `console.error`, and returns `null`
- localStorage quota exceeded: `saveProgress` catches the error and logs via `console.error` (no crash)
- Other keys in localStorage (non-lesson): `getAllProgress` filters by `lesson.` prefix only

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: All 6 ACs verified against existing implementation, all 3 edge cases handled
- **Deviations**: None

### 2026-03-31 — Review Update
- **Changed**: Edge cases clarified — error handling logs via `console.error` (was vague "silently")
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
