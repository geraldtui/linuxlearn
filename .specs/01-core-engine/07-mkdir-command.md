# Spec 1.7: mkdir Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `mkdir` command to create new directories, So that I can practise organising files into a folder structure.

## Context

### Why
Creating directories is one of the earliest practical tasks learners perform. The `-p` flag for nested creation is taught alongside basic `mkdir` because it prevents confusing errors and is extremely common in real workflows.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `mkdir()`)
- Spec 1.3: Command Executor (registers this command)

### Dependencies
- Spec 1.1: Virtual Filesystem

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/mkdir.ts`
- Exports `mkdir` command handler
- Reads `-p` flag to pass `recursive` option to `fs.mkdir()`
- Returns error message if no argument supplied

**Modified File**: `src/engine/commands/index.ts`
- Register `mkdir` in command registry

## Acceptance Criteria

- [ ] **AC1**: mkdir creates a new directory
  - Given `/home/user` exists and `projects` does not
  - When the user types `mkdir projects`
  - Then `fs.isDirectory('/home/user/projects')` returns `true`

- [ ] **AC2**: mkdir -p creates nested directories
  - Given none of `projects/web/frontend` exist
  - When the user types `mkdir -p projects/web/frontend`
  - Then all three levels are created successfully

- [ ] **AC3**: mkdir errors when directory already exists
  - Given `documents` already exists
  - When the user types `mkdir documents`
  - Then the error is `mkdir: cannot create directory 'documents': File exists`

- [ ] **AC4**: mkdir errors when parent doesn't exist (without -p)
  - Given `projects` does not exist
  - When the user types `mkdir projects/web`
  - Then the error is `mkdir: cannot create directory 'projects/web': No such file or directory`

- [ ] **AC5**: mkdir errors when no argument is given
  - Given the user types `mkdir` with no arguments
  - When the command is executed
  - Then the error is `mkdir: missing operand`

- [ ] **AC6**: mkdir produces no output on success
  - Given `mkdir` executes successfully
  - When checking the result
  - Then `output` is an empty string and exitCode is `0`

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 6 ACs validated against implementation, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC5 added for missing-operand error (was described in technical spec bullets but absent from ACs)
- **Changed**: Old AC5 (no output on success) renumbered to AC6
- **Status**: Draft → Approved
- **Author**: Claude AI
