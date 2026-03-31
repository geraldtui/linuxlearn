# Spec 1.5: ls Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `ls` command to list directory contents, So that I can see what files and directories exist.

## Context

### Why
`ls` is one of the most-used Linux commands. Learners need it to explore the filesystem, verify results of other commands (like `mkdir`, `touch`), and understand directory structure. Supporting `-l` and `-a` flags covers the most common real-world usage.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `ls()` method)
- Spec 1.3: Command Executor (registers this command)

### Dependencies
- Spec 1.1: Virtual Filesystem

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/ls.ts`
- Exports `ls` command handler
- Passes `-l` and `-a` flags to `fs.ls()`
- Default path is `.` (current directory) when no arg provided

**Modified File**: `src/engine/commands/index.ts`
- Register `ls` in command registry

## Acceptance Criteria

- [ ] **AC1**: ls with no arguments lists the current directory
  - Given the cwd contains `documents` and `file.txt`
  - When the user types `ls`
  - Then the output includes both entries, space-separated

- [ ] **AC2**: ls with a path argument lists that directory
  - Given a directory `/home/user/documents` exists
  - When the user types `ls documents`
  - Then the output lists the contents of `documents`

- [ ] **AC3**: ls -l shows long format with permissions
  - Given the cwd contains entries
  - When the user types `ls -l`
  - Then each line includes permissions (e.g. `drwxr-xr-x`) and file name

- [ ] **AC4**: ls -a shows hidden files
  - Given the cwd contains `.bashrc` and `documents`
  - When the user types `ls -a`
  - Then both `.bashrc` and `documents` appear in output

- [ ] **AC5**: ls errors on non-existent path
  - Given `/home/user/nope` does not exist
  - When the user types `ls nope`
  - Then the error is `ls: cannot access 'nope': No such file or directory`

## Edge Cases

- Combined flags `-la` and `-al` both work identically
- Empty directory produces empty output (no error)
- Results are sorted alphabetically

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 5 ACs validated against implementation, 3/3 edge cases; Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: No content changes needed — spec was already well-formed
- **Status**: Draft → Approved
- **Author**: Claude AI
