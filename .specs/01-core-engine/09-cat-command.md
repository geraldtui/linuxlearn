# Spec 1.9: cat Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `cat` command to view the contents of a file, So that I can verify what has been written to it.

## Context

### Why
`cat` is the standard way to read file contents in a terminal. It is taught immediately after file creation (`touch`, `echo >`) so learners can confirm their other commands worked correctly.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `cat()`)
- Spec 1.3: Command Executor (registers this command)

### Dependencies
- Spec 1.1: Virtual Filesystem

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/cat.ts`
- Exports `cat` command handler
- Calls `fs.cat()` and returns the file content as output
- Returns error if no argument supplied

**Modified File**: `src/engine/commands/index.ts`
- Register `cat` in command registry

## Acceptance Criteria

- [ ] **AC1**: cat displays file contents
  - Given `welcome.txt` contains `Hello Linux`
  - When the user types `cat welcome.txt`
  - Then the output is `Hello Linux`

- [ ] **AC2**: cat preserves multi-line content
  - Given `notes.txt` contains `line1\nline2`
  - When the user types `cat notes.txt`
  - Then both lines appear in the output

- [ ] **AC3**: cat errors when file doesn't exist
  - Given `nope.txt` does not exist
  - When the user types `cat nope.txt`
  - Then the error is `cat: nope.txt: No such file or directory`

- [ ] **AC4**: cat errors when path is a directory
  - Given `documents` is an existing directory
  - When the user types `cat documents`
  - Then the error is `cat: documents: Is a directory`

- [ ] **AC5**: cat errors when no argument is given
  - Given the user types `cat` with no arguments
  - When the command is executed
  - Then the error is `cat: missing file operand`

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 5 ACs validated against implementation, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC5 "Given" clause added to complete the Given-When-Then format (was missing "Given")
- **Status**: Draft → Approved
- **Author**: Claude AI
