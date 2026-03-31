# Spec 6.3: File Operations Lesson Content

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a learner comfortable with navigation, I want to learn how to create, view, and manage files so that I can work with data in Linux.

## Context

### Why

File manipulation is the next logical step after navigation. This lesson introduces state-modifying commands (`mkdir`, `touch`, `echo`, `rm`) and teaches safety (e.g., the dangers of `rm -r`).

### Related Specs

- Specs 1.7-1.11 (mkdir, touch, cat, echo, rm)
- Spec 2.2: Lesson Data Structure

### Dependencies

- Specs 1.7-1.11 (mkdir, touch, cat, echo, rm)
- Spec 2.2: Lesson Data Structure

## Technical Specification

### Data Models

- Uses `StepData` interface from `src/types/index.ts`

### Components/Modules

**File**: `src/data/lessons/fileops.ts`
- Exports an array of `StepData` objects (10 steps).
- Defines the initial filesystem state.
- Implements custom validation logic (`customValidate`) to check if files/directories were actually created/removed.

**File**: `src/data/lessons/index.json`
- Needs to include metadata for the `fileops` lesson (key: `fileops`, slug: `file-operations`).

## Acceptance Criteria

- [ ] **AC1**: Lesson metadata exists
  - Given the application is running
  - When the catalog page loads
  - Then the "fileops" lesson is listed with the correct title, description, and step count (10 steps)

- [ ] **AC2**: Steps 1-2 - Directory creation
  - Given the user is on steps 1 and 2
  - When they use `mkdir` and `mkdir -p`
  - Then the directories are created in the virtual filesystem and they progress

- [ ] **AC3**: Steps 3-4 - File creation and viewing
  - Given the user is on steps 3 and 4
  - When they use `touch` and `cat`
  - Then the file is created, its (empty) contents are viewed, and they progress

- [ ] **AC4**: Steps 5-7 - Writing and appending
  - Given the user is on steps 5, 6, and 7
  - When they use `echo >`, `echo >>`, and `cat`
  - Then the file contents are correctly overwritten, appended, and viewed

- [ ] **AC5**: Steps 8-10 - Removal and safety
  - Given the user is on steps 8, 9, and 10
  - When they use `rm`, attempt to remove a directory without `-r` (and fail as expected), and finally use `rm -r`
  - Then the file/directory is removed (or blocked appropriately) and they progress

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Verified that `fileops.ts` and `index.json` already contain the correct content and metadata matching the spec.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft