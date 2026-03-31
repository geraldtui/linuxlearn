# Spec 2.1: Command Validator

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want immediate feedback on whether my typed command is correct, So that I can learn from mistakes and advance through the lesson.

## Context

### Why

The validator bridges the gap between the execution engine (Phase 1) and the lesson system. It executes the user's command, then checks the result against the lesson step's expectations — matching the command string, output, and optional custom logic — to decide pass/fail.

### Related Specs

- Spec 1.1: Virtual Filesystem (provides the filesystem instance)
- Spec 1.2: Command Parser (provides `normalizeCommand`)
- Spec 1.3: Command Executor (provides `executeCommand`)
- Spec 2.2: Lesson Data Structure (provides `StepData` and expectations)

### Dependencies

- Phase 1 Core Engine (all specs 1.1–1.11)

## Technical Specification

### Data Models

**File**: `src/types/index.ts`
- Uses existing `StepData` interface (expectedCommand, expectedOutput, customValidate)
- Uses existing `ValidationResult` interface (isSuccess, output, error?)

### Components/Modules

**New File**:
- `src/utils/checkCommand.ts` — `checkCommand(userCommand, stepData, filesystem)` function

**Used Modules**:
- `src/engine/commandExecutor.ts` — `executeCommand`
- `src/utils/commandParser.ts` — `normalizeCommand`

## Acceptance Criteria

- [ ] **AC1**: Correct command returns success
  - Given a step expecting `["ls"]` and the user types `ls`
  - When `checkCommand` is called
  - Then `isSuccess` is `true` and `output` contains the listing

- [ ] **AC2**: Wrong command returns failure
  - Given a step expecting `["mkdir projects"]` and the user types `pwd`
  - When `checkCommand` is called
  - Then `isSuccess` is `false` and `error` is defined

- [ ] **AC3**: Execution error propagates as failure
  - Given a step expecting `["cat readme.txt"]` and the user types `cat nonexistent.txt`
  - When `checkCommand` is called
  - Then `isSuccess` is `false` and `output` contains the bash error message

- [ ] **AC4**: Output matching enforced when expectedOutput is set
  - Given a step with `expectedOutput: "/home/user"` and the user types `pwd`
  - When `checkCommand` is called from cwd `/home/user`
  - Then `isSuccess` is `true`; from cwd `/etc`, `isSuccess` is `false`

- [ ] **AC5**: customValidate function is honoured
  - Given a step with `customValidate` that checks `fs.getCwd() === "/home/user/documents"`
  - When user types `cd documents` from `/home/user`
  - Then `isSuccess` is `true` only if customValidate returns `true`

- [ ] **AC6**: Normalised comparison accepts flag-order variations
  - Given a step expecting `["ls -la"]` and the user types `ls -al`
  - When `checkCommand` is called
  - Then `isSuccess` is `true` (flags normalised to alphabetical order)

## Edge Cases

- Empty user command is passed directly to executor (returns empty result)
- Step with no `expectedOutput` skips output check (passes by default)
- Step with no `customValidate` skips custom check (passes by default)

## Changelog

### 2026-03-31 — Implementation Improved (Phase 3 fix)
- **Author**: Claude AI
- **Status**: Implemented (re-verified, all 6 ACs still pass)
- **Changed**: Removed early-return on execution error in `checkCommand`. Now evaluates all three conditions (command match, output match, custom validate) even when the command produces an error. This enables lesson steps that expect errors (e.g., `rm` on a directory without `-r`) to be validated correctly.
- **Backward-compatible**: AC3 still passes because execution-error scenarios also fail command match.

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 6 ACs validated against implementation, 3/3 edge cases handled, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC3 "Given" clause added step-context (was missing the expected command)
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
