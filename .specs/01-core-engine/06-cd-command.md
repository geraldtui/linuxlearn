# Spec 1.6: cd Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `cd` command to navigate between directories, So that I can explore the filesystem and practice path concepts.

## Context

### Why
`cd` teaches the foundational concept of working directory and paths. Supporting special paths (`..`, `~`, `-`) gives learners realistic experience with how bash navigation actually works, which is critical for later lessons on paths.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `cd()`, tracks `prevCwd`)
- Spec 1.3: Command Executor (registers this command)

### Dependencies
- Spec 1.1: Virtual Filesystem

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/cd.ts`
- Exports `cd` command handler
- Defaults to `~` when no argument provided
- Delegates to `fs.cd()`, returns error on failure

**Modified File**: `src/engine/commands/index.ts`
- Register `cd` in command registry

## Acceptance Criteria

- [ ] **AC1**: cd changes the working directory
  - Given `/home/user/documents` exists and cwd is `/home/user`
  - When the user types `cd documents`
  - Then `fs.getCwd()` returns `/home/user/documents`

- [ ] **AC2**: cd with no argument goes to home directory
  - Given cwd is `/etc`
  - When the user types `cd`
  - Then `fs.getCwd()` returns `/home/user`

- [ ] **AC3**: cd .. navigates to the parent directory
  - Given cwd is `/home/user/documents`
  - When the user types `cd ..`
  - Then `fs.getCwd()` returns `/home/user`

- [ ] **AC4**: cd - returns to the previous directory
  - Given cwd is `/home/user/documents` and previous cwd was `/home/user/downloads`
  - When the user types `cd -`
  - Then `fs.getCwd()` returns `/home/user/downloads`

- [ ] **AC5**: cd produces no output on success
  - Given `cd` executes successfully
  - When checking the result
  - Then `output` is an empty string

- [ ] **AC6**: cd errors when path doesn't exist or is a file
  - Given `nope` does not exist
  - When the user types `cd nope`
  - Then error is `bash: cd: nope: No such file or directory`
  - Given `file.txt` is a file
  - When the user types `cd file.txt`
  - Then error is `bash: cd: file.txt: Not a directory`

## Edge Cases

- `cd /` navigates to filesystem root
- `cd .` stays in current directory (no error)
- `cd ~` always works regardless of cwd

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 6 ACs validated against implementation, 3/3 edge cases; Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: Old AC3 split into two separate ACs — AC3 (`cd ..`) and AC4 (`cd -`) — each now has a single Given-When-Then scenario (was one AC with two unrelated scenarios, violating single-criterion rule)
- **Changed**: Old AC4/AC5/AC6 renumbered to AC5/AC6 accordingly
- **Status**: Draft → Approved
- **Author**: Claude AI
