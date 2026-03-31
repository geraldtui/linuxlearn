# Spec 4.2: Step Component

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to see clear instructions alongside the terminal, So that I know what to do at each step.

## Context

### Why

Each lesson step pairs instructional copy with the simulated terminal. The layout must stay readable on large and small screens and reflect the current step from context without duplicating lesson data in props.

### Related Specs

- Spec 2.2: Lesson Data Structure (`StepData` fields for title, description, hint)
- Spec 3.1: InteractiveTerminalContext (`lessonData`, `step`)
- Spec 4.1: InteractiveTerminal

### Dependencies

- Spec 2.2: Lesson Data Structure
- Spec 3.1: InteractiveTerminalContext
- Spec 4.1: InteractiveTerminal

## Technical Specification

### Components/Modules

**File**: `src/components/Step.tsx`
- Consumes `useTerminalContext()`
- Renders instruction panel (title, description, step position)
- Embeds `<InteractiveTerminal />`
- No required props (context-only)

## Acceptance Criteria

- [x] **AC1**: Responsive layout
  - Given a viewport at desktop width (e.g. `lg` breakpoint)
  - When `Step` renders
  - Then instructions and terminal appear side-by-side; on narrow viewports they stack vertically (instructions above terminal)

- [x] **AC2**: Step metadata from context
  - Given `lessonData[step]` exists
  - When the component renders
  - Then the visible title matches `title`, the body matches `description`, and the learner sees which step number they are on (e.g. “Step X of Y”)

- [x] **AC3**: Terminal embedded
  - Given any valid step index
  - When `Step` renders
  - Then `InteractiveTerminal` is present and receives state only via context (no duplicate lesson props passed down)

- [x] **AC4**: Hint visibility
  - Given the current `StepData` includes a non-empty `hint`
  - When the component renders
  - Then the hint text is visible in the instruction area (collapsible not required for MVP)

- [x] **AC5**: Missing step guard
  - Given `lessonData[step]` is undefined (e.g. transient load)
  - When the component renders
  - Then the user sees a non-breaking fallback (e.g. loading placeholder) rather than a thrown error

## Edge Cases

- Duplicate hint in `InteractiveTerminal` error panel vs `Step` is acceptable if both improve discoverability; avoid contradictory wording

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
- **Notes**: Verified responsive layout, context-only wiring, hint panel, embedded terminal; loading guard uses `role="status"`
- **Files**: `src/components/Step.tsx`
- **Deviations**: None

### 2026-03-31 — Review / Update (cross-refs)
- **Changed**: Related Specs / Dependencies — added Spec 2.2 (`StepData` copy fields)

### 2026-03-31 — Review / Update
- **Changed**: AC5 added for undefined `currentStep` (loading guard)
- **Changed**: Edge case on duplicate hints (implementation flexibility)
- **Status**: Draft → Approved

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
