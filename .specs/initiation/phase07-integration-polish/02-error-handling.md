# Spec 7.2: Error Handling & Edge Cases

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a learner, I want helpful error messages when I make mistakes so that I can learn from them and correct my approach.

## Context

### Why

Robust error handling prevents user frustration. This spec ensures that invalid commands, filesystem permission issues, validation failures, and edge cases (like rapid clicking or empty inputs) are handled gracefully and provide educational feedback.

### Related Specs

- Spec 2.1: Command Validator
- Spec 4.1: InteractiveTerminal Component

### Dependencies

- Spec 2.1: Command Validator
- Spec 4.1: InteractiveTerminal Component

## Technical Specification

### Components/Modules

**Files to modify/verify**:
- `src/utils/checkCommand.ts` (Validation logic)
- `src/engine/commandExecutor.ts` (Command execution errors)
- `src/components/InteractiveTerminal.tsx` (Error display)
- `src/context/InteractiveTerminalContext.tsx` (Error state management)

## Acceptance Criteria

- [ ] **AC1**: Command Syntax Errors
  - Given the user is in an interactive terminal
  - When they type an invalid command (e.g., `notacommand`) or invalid flags (e.g., `ls --fake`)
  - Then a bash-style error is displayed in red text (e.g., `bash: notacommand: command not found`)

- [ ] **AC2**: Filesystem Errors
  - Given the user is in an interactive terminal
  - When they attempt an invalid FS operation (e.g., `cd non_existent_dir`, `rm -r /`)
  - Then the appropriate error is displayed (e.g., `cd: non_existent_dir: No such file or directory`)

- [ ] **AC3**: Validation Hints
  - Given a step expects `ls -a`
  - When the user types a valid command that is incorrect for the step (e.g., `ls`)
  - Then a helpful validation hint is displayed below the terminal (e.g., "Try using the -a flag to see hidden files")

- [ ] **AC4**: Empty/Whitespace Input
  - Given the user is in an interactive terminal
  - When they submit an empty string or only spaces
  - Then a new empty prompt line is added to the output without triggering an error state

- [ ] **AC5**: Rapid Submission Prevention
  - Given the user is in an interactive terminal
  - When they rapidly press Enter multiple times
  - Then the application does not crash, and the `lockError` state prevents spamming of validation errors

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Updated `checkCommand` to fall back to `stepData.hint` if `result.error` is empty when validation fails. Empty inputs are now handled gracefully in `InteractiveTerminal.tsx` by just adding a prompt line.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft