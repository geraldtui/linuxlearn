# Spec 4.4: LearnFooter Component

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want easy navigation controls, So that I can move between steps quickly using buttons or keyboard shortcuts.

## Context

### Why

Footer actions complement the progress sidebar: explicit Previous/Next controls and keyboard shortcuts reduce friction once a step is solved.

### Related Specs

- Spec 3.1: InteractiveTerminalContext (`step`, `success`, `nextStep`, `prevStep`, `lessonData`)

### Dependencies

- Spec 3.1: InteractiveTerminalContext

## Technical Specification

### Components/Modules

**File**: `src/components/LearnFooter.tsx`
- Consumes `useTerminalContext()`
- Renders Previous and Next buttons and a step counter (`current / total`)
- Registers a `window` `keydown` listener with cleanup on unmount for shortcuts

## Acceptance Criteria

- [x] **AC1**: Previous button
  - Given `step === 0`
  - When the footer renders
  - Then Previous is disabled
  - Given `step > 0`
  - When the user clicks Previous
  - Then `prevStep()` is called

- [x] **AC2**: Next button
  - Given `success === false` or the user is on the last step
  - When the footer renders
  - Then Next is disabled
  - Given `success === true` and not on the last step
  - When the user clicks Next
  - Then `nextStep()` is called

- [x] **AC3**: Step counter
  - Given any valid `step` and `lessonData.length`
  - When the footer renders
  - Then the user sees a counter of the form “(step + 1) / lessonData.length”

- [x] **AC4**: Keyboard shortcuts with cleanup
  - Given the footer is mounted
  - When the user presses Shift+Enter (global)
  - Then `prevStep()` runs (unless already on first step per `prevStep` implementation)
  - When the component unmounts
  - Then the keydown listener is removed

- [x] **AC5**: Enter to advance without stealing terminal submit
  - Given `success === true` and focus is inside the terminal text `<input>`
  - When the user presses Enter
  - Then the terminal’s submit behaviour runs (command handling), not `nextStep`
  - Given `success === true` and focus is not in an `<input>` or `<textarea>`
  - When the user presses Enter
  - Then `nextStep()` runs

- [x] **AC6**: Styling and placement
  - Given the lesson page layout
  - When the footer renders
  - Then it spans the lesson content width with a distinct surface (border/background) and clearly visible enabled/disabled button styles

## Edge Cases

- Focus inside other editable regions (e.g. future `contenteditable`) should follow the same rule as `<input>` / `<textarea>` for AC5

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 10/10
- **Notes**: Implementation validated against spec, all 6 ACs satisfied, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Verified prev/next disabled rules, step counter, global Enter/Shift+Enter with listener cleanup; added `type="button"` and `aria-label` on nav buttons
- **Files**: `src/components/LearnFooter.tsx`
- **Deviations**: None

### 2026-03-31 — Review / Update
- **Changed**: AC5 added to document interaction between global Enter and terminal input (avoids ambiguous “Enter always next”)
- **Changed**: AC4 requires explicit listener cleanup
- **Status**: Draft → Approved

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
