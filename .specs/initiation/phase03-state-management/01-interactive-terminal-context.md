# Spec 3.1: InteractiveTerminalContext

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a learner, I want my lesson progress tracked automatically and my terminal state managed per step, So that I can resume where I left off and navigate between completed steps.

## Context

### Why

The context provider is the central hub connecting the execution engine, validator, localStorage, and UI components. It manages the current step, filesystem instance, terminal output, and success/error state — providing a single React Context that all lesson UI components consume.

### Related Specs

- Spec 1.1: Virtual Filesystem (instantiated per step)
- Spec 2.1: Command Validator (`checkCommand` called on user input)
- Spec 2.2: Lesson Data Structure (`StepData[]` consumed as lesson content)
- Spec 3.2: localStorage Integration (`loadProgress`/`saveProgress` for persistence)

### Dependencies

- Spec 1.1: Virtual Filesystem
- Spec 1.3: Command Executor
- Spec 2.1: Command Validator
- Spec 3.2: localStorage Integration

## Technical Specification

### Data Models

**File**: `src/context/InteractiveTerminalContext.tsx`
- `TerminalContextState` interface — state: step, lastStep, success, error, lockError, output (string[]), filesystem, lessonData, lessonKey; actions: nextStep, prevStep, setStep, executeUserCommand, resetLesson

### Components/Modules

**New Files**:
- `src/context/InteractiveTerminalContext.tsx` — `InteractiveTerminalProvider` component and `useTerminalContext` hook

**Props**:
- `children: React.ReactNode`
- `lessonData: StepData[]`
- `lessonKey: string`

## Acceptance Criteria

- [ ] **AC1**: Progress loaded on mount and filesystem initialised
  - Given a lesson page renders with lessonKey `"basics"`
  - When `InteractiveTerminalProvider` mounts
  - Then saved progress is loaded from localStorage and filesystem is initialised from the step's `initialFS`

- [ ] **AC2**: executeUserCommand validates input and sets success/error
  - Given an interactive step expecting `["ls"]` and user types `ls`
  - When `executeUserCommand("ls")` is called
  - Then command output is appended to `output[]`, `success` is `true`, and `error` is `null`

- [ ] **AC3**: nextStep advances only when current step is solved
  - Given the current step has `success === false`
  - When `nextStep()` is called
  - Then step does not change; when `success === true`, step increments by 1

- [ ] **AC4**: setStep prevents jumping beyond lastStep
  - Given `lastStep` is 3 and user calls `setStep(5)`
  - When the guard condition is evaluated
  - Then step does not change; `setStep(2)` succeeds

- [ ] **AC5**: Progress auto-saved on step completion and navigation
  - Given the user solves a step (success=true) or navigates via next/prev/setStep
  - When the action completes
  - Then `saveProgress(lessonKey, { currentStep, lastStep })` is called

- [ ] **AC6**: resetLesson clears all state to step 0
  - Given a lesson is partially completed
  - When `resetLesson()` is called
  - Then step=0, lastStep=0, filesystem reinitialised, and progress saved as `{ currentStep: 0, lastStep: 0 }`

## Edge Cases

- Non-interactive steps (`interactive: false`) ignore `executeUserCommand` calls
- Confetti fires via `canvas-confetti` when the final step is solved
- Error display throttled via `lockError` (2-second timeout)
- `prevStep` at step 0 is a no-op; `nextStep` at the last step is a no-op

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: All 6 ACs verified, all 4 edge cases handled. Fixed two bugs during implementation.
- **Bugs Fixed**:
  - **Double-execution**: `executeUserCommand` called `executeCommand` separately, then `checkCommand` called it again internally. State-modifying commands (mkdir, rm) failed validation on second execution. Fix: removed direct `executeCommand` call, use `checkCommand` as single execution path.
  - **Error-step blocking**: Execution errors caused early return before validation. Steps expecting errors (e.g., "rm documents" without -r) could never be solved. Fix: `checkCommand` now evaluates all conditions regardless of execution errors.
- **Files Changed**: `src/context/InteractiveTerminalContext.tsx`, `src/utils/checkCommand.ts`

### 2026-03-31 — Review Update
- **Changed**: No content changes required — spec passed review
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
