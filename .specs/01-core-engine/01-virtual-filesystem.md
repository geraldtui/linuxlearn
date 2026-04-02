# Spec 1.1: Virtual Filesystem

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want my typed commands to work against a real-feeling Linux filesystem, So that I can practice navigation and file operations without affecting my real system.

## Context

### Why
SudoSchool needs an in-memory filesystem that behaves like real Linux to provide authentic learning without requiring server-side containers or affecting users' actual systems. All command handlers depend on this as their shared state.

### Related Specs
- Spec 1.3: Command Executor (depends on this)
- Specs 1.4–1.11: All command specs depend on this

### Dependencies
- None (foundational component)

## Technical Specification

### Data Models

**File**: `src/types/index.ts`
- Add `FSNode` interface (type: 'file' | 'dir', content?, children?, permissions?)
- Add `FileSystemTree` type (nested record structure)

### Components/Modules

**New Files**:
- `src/engine/filesystem.ts` — `VirtualFilesystem` class; state: tree, cwd, prevCwd; methods: resolvePath, exists, isDirectory, isFile, mkdir, ls, cd, pwd, touch, cat, writeFile, rm

## Acceptance Criteria

- [ ] **AC1**: Path resolution returns correct absolute paths
  - Given paths `~`, `-`, `.`, `..`, `/home/user`, and `./documents`
  - When `resolvePath()` is called
  - Then each resolves to the expected absolute path (e.g. `~` → `/home/user`)

- [ ] **AC2**: Directory creation and listing work correctly
  - Given a filesystem with `/home/user`
  - When `mkdir('projects')` then `ls('.')` are called
  - Then `projects` appears in the listing

- [ ] **AC3**: File creation, reading, and deletion work correctly
  - Given a filesystem with `/home/user`
  - When `touch('notes.txt')`, `writeFile('notes.txt', 'hi')`, `cat('notes.txt')` are called
  - Then `cat` returns `'hi'`; after `rm('notes.txt')`, `exists('notes.txt')` returns `false`

- [ ] **AC4**: cd updates cwd and prevCwd
  - Given cwd is `/home/user`
  - When `cd('documents')` is called then `cd('-')` is called
  - Then cwd returns to `/home/user`

- [ ] **AC5**: Errors match bash format for invalid operations
  - Given `cd` is called on a file, `cat` on a directory, and `rm` on a non-existent path
  - When each operation is attempted
  - Then errors match `{command}: {path}: No such file or directory / Is a directory / Not a directory`

- [ ] **AC6**: Filesystem initialises from a provided tree and cwd
  - Given a `FileSystemTree` and an initial cwd string
  - When `new VirtualFilesystem(tree, cwd)` is called
  - Then `pwd()` returns the provided cwd and the tree is navigable

## Edge Cases

- Root directory `/` cannot be removed
- Cannot `cd` into a file
- Removing a non-empty directory without `-r` fails
- Creating a file whose parent directory does not exist fails
- Path normalisation resolves `..` past root to `/`

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 6 ACs validated against implementation, 5/5 edge cases; Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: User story rewritten to reflect learner perspective (not system capability)
- **Changed**: AC2/AC3 made specific and independently testable (were too broad)
- **Changed**: AC4 added explicitly for `cd` / prevCwd tracking (was not covered)
- **Changed**: AC5 (error format) clarified with concrete examples
- **Changed**: AC6 (initialisation) renamed from old AC5 for clarity
- **Changed**: Edge Cases trimmed from 6 to 5 items (removed duplicate path normalisation note)
- **Status**: Draft → Approved
- **Author**: Claude AI
