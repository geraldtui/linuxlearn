# Spec 4.1: InteractiveTerminal Component

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want a realistic terminal interface where I can type commands and see output, with the cursor inside the terminal window instead of at the bottom, so that it feels exactly like using a real Linux terminal.

**Change Reason**: User requested a more realistic terminal UI with inline input and a blinking cursor instead of a separate input field.

## Context

### Why

The terminal is the primary interaction surface for lessons. It must stay in sync with lesson state from context (output, errors, success, filesystem path) while remaining keyboard-friendly and visually consistent with a dark “real terminal” aesthetic. The input should be inline with the output history, with a blinking cursor at the end of the current prompt line, to match the behavior of real terminals and improve immersion.

**Update 2026-03-31**: Updated to require inline input and a blinking cursor for a more realistic feel.

### Related Specs

- Spec 2.2: Lesson Data Structure (`StepData.readOnly`, `StepData.interactive`, `hint`)
- Spec 3.1: InteractiveTerminalContext (`executeUserCommand`, `output`, `success`, `error`, `step`, `lessonData`, `filesystem`)

### Dependencies

- Spec 2.2: Lesson Data Structure (step fields consumed via context)
- Spec 3.1: InteractiveTerminalContext

## Technical Specification

### Components/Modules

**File**: `src/components/InteractiveTerminal.tsx`
- Consumes `useTerminalContext()`
- Renders scrollable output from `output: string[]`
- Renders the current input line (prompt + typed text + blinking cursor) inline at the end of the terminal output history
- Keeps the actual `<input>` element visually hidden but functional (opacity 0, absolute positioning) to capture keyboard events
- Ensures clicking anywhere in the terminal output area focuses the hidden input field
- Derives `readOnly` / interactivity from current `StepData` (`readOnly`, `interactive`) unless optional props override (see below)

**Optional props** (for testing or future embeds; may be omitted in MVP):
- `readOnly?: boolean` — when set, forces read-only regardless of step
- `onCommandExecute?: (cmd: string) => void` — optional hook after submit (in addition to context)

## Acceptance Criteria

- [x] **AC1**: Context wiring and output display
  - Given `InteractiveTerminal` is rendered inside `InteractiveTerminalProvider`
  - When context `output` contains multiple lines
  - Then each line is rendered in order in a scrollable region

- [x] **AC2**: Submit on Enter and input cleared
  - Given the current step is interactive and not solved
  - When the user types a non-empty command and presses Enter
  - Then `executeUserCommand` is called with that string and the input field is cleared

- [x] **AC3**: Input disabled when appropriate
  - Given the current step has `success === true`, or `readOnly === true`, or `interactive === false`
  - When the terminal input is rendered
  - Then the user cannot submit new commands (input disabled or input area not shown per design)

- [x] **AC4**: Visual styling matches terminal theme
  - Given the component is rendered
  - When inspected
  - Then the area uses a dark terminal background, monospace text, a distinct prompt colour (e.g. cyan), and success/error feedback uses distinct colours (e.g. green / red)

- [x] **AC5**: Output auto-scrolls (Updated 2026-03-31)
  - Given new lines are appended to `output` or the user types new input
  - When the DOM updates
  - Then the output region scrolls so the latest content and the active input line are visible

- [x] **AC6**: Command history via keyboard
  - Given the user has submitted at least one command in the current step (or session scope defined by implementation)
  - When they press ArrowUp / ArrowDown while the input is focused
  - Then previously typed commands are recalled in order (behaviour aligned with common shell history)

- [x] **AC7**: Inline input and blinking cursor (Added 2026-03-31)
  - Given the terminal is interactive
  - When the user types
  - Then the input field is visually hidden, the typed text appears inline at the bottom of the output history, and a blinking cursor is displayed immediately after the text

- [x] **AC8**: Focus management (Added 2026-03-31)
  - Given the terminal is interactive
  - When the user clicks anywhere within the terminal output area
  - Then the hidden input field receives focus

## Edge Cases

- Empty or whitespace-only submit does not call `executeUserCommand`
- Optional props: if both context and `readOnly` prop apply, the stricter rule (no input) wins when `readOnly` is true

## Changelog

### [2026-03-31] - Verified (Realistic Terminal UI)
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 10/10
- **Notes**: Implementation validated against updated spec, all 8 ACs satisfied, Clean Code principles followed
- **Issues Fixed**: None

### [2026-03-31] - Implemented (Realistic Terminal UI)
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Implemented inline input with blinking cursor for realistic terminal feel
- **Files**: 
  - `src/components/InteractiveTerminal.tsx` - Hidden input field, inline text rendering, click-to-focus
  - `src/styles/globals.css` - Added blink animation
- **Deviations**: None
- **AC Status**: All 8 ACs verified (AC7 and AC8 newly implemented)

### [2026-03-31] - Requirement Change
- **Changed**: Updated to require inline input and a blinking cursor instead of a separate input field.
- **Reason**: User requested a more realistic terminal UI.
- **Impact**: `src/components/InteractiveTerminal.tsx` needs to be modified to hide the input field and render text inline.
- **Breaking Changes**: None
- **Author**: AI Assistant

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
- **Notes**: Optional props `readOnly` / `onCommandExecute`; read-only override when `readOnly === true`; per-step command history with ArrowUp/ArrowDown; `role="log"` + `aria-live` on output, `aria-label` on input; whitespace submit still no-op
- **Files**: `src/components/InteractiveTerminal.tsx`
- **Deviations**: None

### 2026-03-31 — Review / Update (cross-refs)
- **Changed**: Related Specs / Dependencies — added Spec 2.2 for `StepData` fields used via context

### 2026-03-31 — Review / Update
- **Changed**: Replaced roadmap reference to `executeCommand` with `executeUserCommand` (Spec 3.1)
- **Changed**: Clarified disabled states using `StepData` fields; optional props called out explicitly
- **Changed**: AC6 (history) scoped to “current step or session” to avoid over-specifying storage
- **Status**: Draft → Approved

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
