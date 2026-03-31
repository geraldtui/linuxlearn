# Spec 1.11: rm Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `rm` command to delete files and directories, So that I can learn how to manage and clean up the filesystem.

## Context

### Why
`rm` closes the create-read-delete loop for file management. Teaching it alongside the `-r` flag reinforces the concept that directories are not simply deleted like files. The safety guard on `/` prevents confusing lesson state corruption.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `rm()`)
- Spec 1.3: Command Executor (registers this command)

### Dependencies
- Spec 1.1: Virtual Filesystem

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/rm.ts`
- Exports `rm` command handler
- Reads `-r` flag (recursive) and `-f` flag (force) from parsed command
- Delegates to `fs.rm(path, recursive, force)`
- Returns error if no argument provided

**Modified File**: `src/engine/commands/index.ts`
- Register `rm` in command registry

## Acceptance Criteria

- [ ] **AC1**: rm removes a file
  - Given `greeting.txt` exists in the cwd
  - When the user types `rm greeting.txt`
  - Then `fs.exists('greeting.txt')` returns `false`

- [ ] **AC2**: rm without -r errors on a directory
  - Given `documents` is a directory
  - When the user types `rm documents`
  - Then the error is `rm: cannot remove 'documents': Is a directory`

- [ ] **AC3**: rm -r removes a directory and its contents
  - Given `documents` is a directory containing files
  - When the user types `rm -r documents`
  - Then `fs.exists('documents')` returns `false`

- [ ] **AC4**: rm errors on non-existent path (without -f)
  - Given `nope.txt` does not exist
  - When the user types `rm nope.txt`
  - Then the error is `rm: cannot remove 'nope.txt': No such file or directory`

- [ ] **AC5**: rm -f silently ignores non-existent files
  - Given `nope.txt` does not exist
  - When the user types `rm -f nope.txt`
  - Then there is no error and exitCode is `0`

- [ ] **AC6**: rm cannot remove the root directory
  - Given any filesystem state
  - When the user types `rm -r /`
  - Then the error is `rm: cannot remove '/': Permission denied`

- [ ] **AC7**: rm produces no output on success
  - Given `rm` executes successfully
  - When checking the result
  - Then `output` is an empty string and exitCode is `0`

## Edge Cases

- `-rf` and `-fr` flag combinations both work identically

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 7 ACs validated against implementation, 1/1 edge case handled, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC7 added — "produces no output on success" was buried in Edge Cases section; it is a core behaviour that belongs in ACs
- **Changed**: AC1 and AC3 de-hardcoded — removed `/home/user/` prefix from `fs.exists()` assertions (was coupling ACs to a specific cwd)
- **Changed**: Edge Cases trimmed to 1 critical item (was 2, removed the now-promoted AC)
- **Status**: Draft → Approved
- **Author**: Claude AI
