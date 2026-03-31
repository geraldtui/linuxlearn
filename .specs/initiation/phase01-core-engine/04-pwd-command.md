# Spec 1.4: pwd Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `pwd` command to see my current directory, So that I know where I am in the filesystem.

## Context

### Why
`pwd` is the first command most learners encounter. It provides orientation in the filesystem and is a prerequisite for understanding all path-based commands.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `pwd()` method)
- Spec 1.3: Command Executor (registers and routes this command)

### Dependencies
- Spec 1.1: Virtual Filesystem

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/pwd.ts`
- Exports `pwd` command handler function
- Returns `fs.pwd()` as output with exitCode 0

**Modified File**: `src/engine/commands/index.ts`
- Register `pwd` in command registry

## Acceptance Criteria

- [ ] **AC1**: pwd returns the current working directory
  - Given the filesystem is initialised with cwd `/home/user`
  - When the user types `pwd`
  - Then the output is `/home/user`

- [ ] **AC2**: pwd reflects directory changes made by cd
  - Given the user has run `cd documents` (cwd is now `/home/user/documents`)
  - When the user types `pwd`
  - Then the output is `/home/user/documents`

- [ ] **AC3**: pwd always exits with code 0
  - Given any filesystem state
  - When the user types `pwd`
  - Then `exitCode` is `0` and `error` is undefined

- [ ] **AC4**: pwd is tolerant of extra arguments
  - Given the user types `pwd /some/path`
  - When the command is executed
  - Then the output is still the current working directory (extra args are ignored)

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 4 ACs validated against implementation; Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC4 title fixed from "produces no output on error" (misleading) to "is tolerant of extra arguments" — the body described ignoring extra args, not error output
- **Status**: Draft → Approved
- **Author**: Claude AI
