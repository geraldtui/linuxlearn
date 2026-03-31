# Spec 1.8: touch Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `touch` command to create empty files, So that I can practise creating files before writing content to them.

## Context

### Why
`touch` is the simplest way to create a file and is taught alongside `mkdir` and `cat`. In the MVP, we simulate only the file-creation behaviour (not timestamp updating), which is sufficient for lessons.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `touch()`)
- Spec 1.3: Command Executor (registers this command)

### Dependencies
- Spec 1.1: Virtual Filesystem

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/touch.ts`
- Exports `touch` command handler
- Calls `fs.touch()` with the provided path
- Returns error if no argument supplied

**Modified File**: `src/engine/commands/index.ts`
- Register `touch` in command registry

## Acceptance Criteria

- [ ] **AC1**: touch creates an empty file
  - Given `README.md` does not exist in the cwd
  - When the user types `touch README.md`
  - Then `fs.isFile('README.md')` returns `true`

- [ ] **AC2**: touch on an existing file does nothing
  - Given `notes.txt` already exists with content `hello`
  - When the user types `touch notes.txt`
  - Then the file still exists and its content is unchanged

- [ ] **AC3**: touch produces no output on success
  - Given `touch` executes successfully
  - When checking the result
  - Then `output` is an empty string and exitCode is `0`

- [ ] **AC4**: touch errors when parent directory doesn't exist
  - Given `nope/` does not exist
  - When the user types `touch nope/file.txt`
  - Then the error is `touch: cannot touch 'nope/file.txt': No such file or directory`

- [ ] **AC5**: touch errors when path is a directory
  - Given `documents` is an existing directory
  - When the user types `touch documents`
  - Then the error is `touch: cannot touch 'documents': Is a directory`

- [ ] **AC6**: touch errors when no argument is given
  - Given the user types `touch` with no arguments
  - When the command is executed
  - Then the error is `touch: missing file operand`

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 6 ACs validated against implementation, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC1 "Then" de-hardcoded — was `fs.isFile('/home/user/README.md')`, now uses relative `fs.isFile('README.md')` to avoid coupling to a specific cwd
- **Changed**: AC6 added for missing-operand error (was described in technical spec but absent from ACs)
- **Status**: Draft → Approved
- **Author**: Claude AI
