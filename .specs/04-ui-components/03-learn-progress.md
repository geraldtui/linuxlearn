# Spec 4.3: LearnProgress Component

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to see my progress through the lesson and jump back to previous steps, So that I can review concepts.

## Context

### Why

A step list gives orientation and quick navigation within the bounds of `lastStep` from context, so learners cannot skip ahead to unsolved content.

### Related Specs

- Spec 3.1: InteractiveTerminalContext (`lessonData`, `step`, `lastStep`, `setStep`)

### Dependencies

- Spec 3.1: InteractiveTerminalContext

## Technical Specification

### Components/Modules

**File**: `src/components/LearnProgress.tsx`
- Consumes `useTerminalContext()`
- Renders a vertical list of steps with title (or short label) per `StepData`
- Invokes `setStep(index)` only when navigation is allowed by context rules

## Acceptance Criteria

- [x] **AC1**: Lists all lesson steps
  - Given a lesson with N steps in `lessonData`
  - When `LearnProgress` renders
  - Then N entries are shown, each identifiable (e.g. by step title)

- [x] **AC2**: Visual states for current, completed, locked
  - Given `step`, `lastStep`, and an index `i`
  - When the list renders
  - Then the current step is visually highlighted; indices `i < lastStep` appear completed (e.g. checkmark); indices `i > lastStep` appear locked (muted, not actionable)

- [x] **AC3**: Navigation rules
  - Given a locked step (`index > lastStep`)
  - When the user activates that control
  - Then `setStep` is not called for that index
  - Given an unlocked step (`index <= lastStep`)
  - When the user activates that control
  - Then `setStep(index)` is called

- [x] **AC4**: Current step activation
  - Given the user clicks the row for the current `step`
  - When the handler runs
  - Then behaviour is idempotent (no error); step may remain unchanged

- [x] **AC5**: Responsive width
  - Given a narrow viewport
  - When the lesson layout renders
  - Then the progress UI remains usable (e.g. full-width under main content, collapsible pattern, or horizontal scroll — chosen to match existing lesson page layout)

## Edge Cases

- Long step titles truncate with ellipsis or wrap without breaking layout

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
- **Notes**: Verified step list, completed/current/locked states, `setStep` rules; responsive: full-width + bottom border on small screens, sidebar on `lg+`; `aria-label` on nav; lesson page uses `flex-col lg:flex-row`
- **Files**: `src/components/LearnProgress.tsx`, `src/pages/en/learn/[lesson].tsx`
- **Deviations**: None

### 2026-03-31 — Review / Update
- **Changed**: AC3 split “locked vs unlocked” into explicit Given-When-Then pairs
- **Changed**: AC5 softened to “usable on narrow viewports” to allow layout variants (sidebar vs stacked)
- **Status**: Draft → Approved

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
