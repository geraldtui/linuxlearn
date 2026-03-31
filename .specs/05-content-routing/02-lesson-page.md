# Spec 5.2: Lesson Page

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to work through lesson steps with clear instructions and an interactive terminal, So that I can learn by doing.

## Context

### Why

The dynamic lesson page is the core learning experience. It fetches the correct lesson data based on the URL, wraps the UI components in the state provider, and handles the celebratory completion state.

### Related Specs

- Spec 2.2: Lesson Data Structure
- Spec 3.1: InteractiveTerminalContext
- Phase 4 UI Components (`Step`, `LearnProgress`, `LearnFooter`, `Header`)

### Dependencies

- Spec 2.2: Lesson Data Structure
- Spec 3.1: InteractiveTerminalContext
- Phase 4 UI Components

## Technical Specification

### Components/Modules

**File**: `src/pages/en/learn/[lesson].tsx`
- Uses `getStaticPaths` to generate routes from `index.json`
- Uses `getStaticProps` to pass lesson metadata
- Dynamically imports `src/data/lessons/{key}.ts` on the client (to avoid serializing functions like `customValidate`)
- Wraps content in `<InteractiveTerminalProvider>`
- Renders `<Header>`, `<LearnProgress>`, `<Step>`, and `<LearnFooter>`

## Acceptance Criteria

- [ ] **AC1**: Static paths generation
  - Given the `index.json` catalog has N lessons
  - When Next.js builds the site
  - Then it generates N static routes matching `/en/learn/[slug]`

- [ ] **AC2**: Client-side data loading
  - Given a user navigates to a valid lesson route
  - When the page mounts
  - Then it dynamically imports the corresponding `StepData[]` array and shows a loading state until ready

- [ ] **AC3**: 404 on invalid lesson
  - Given a user navigates to `/en/learn/non-existent-lesson`
  - When `getStaticProps` runs
  - Then it returns `notFound: true`

- [ ] **AC4**: Layout composition
  - Given the lesson data has loaded
  - When the page renders
  - Then it displays the Header, Progress sidebar, Step content, and Footer in the correct layout

- [ ] **AC5**: Completion confetti
  - Given the user is on the final step of a lesson
  - When they successfully complete that step
  - Then a confetti animation triggers (via `canvas-confetti` or similar, triggered by context/effect)

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Implementation verified. Fixed bug where lastStep was not updated correctly and confetti never triggered. Redefined lastStep to mean highest step completed.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft