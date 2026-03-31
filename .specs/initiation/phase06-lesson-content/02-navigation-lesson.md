# Spec 6.2: Navigation Lesson Content

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a learner who knows basic commands, I want to master directory navigation so that I can move around the filesystem confidently.

## Context

### Why

Navigation is a core skill in Linux. This lesson builds on the basics by teaching absolute vs. relative paths and special directory shortcuts (`.`, `..`, `~`, `-`), requiring a more complex initial filesystem state.

### Related Specs

- Spec 1.6: cd Command
- Spec 2.2: Lesson Data Structure

### Dependencies

- Spec 1.6: cd Command
- Spec 2.2: Lesson Data Structure

## Technical Specification

### Data Models

- Uses `StepData` interface from `src/types/index.ts`

### Components/Modules

**File**: `src/data/lessons/navigation.ts`
- Exports an array of `StepData` objects.
- Defines a deeper initial filesystem state (3-4 levels) to support complex navigation.
- Implements custom validation logic (`customValidate`) where necessary.

**File**: `src/data/lessons/index.json`
- Needs to include metadata for the `navigation` lesson (key: `navigation`, slug: `navigation-and-paths`).

## Acceptance Criteria

- [ ] **AC1**: Lesson metadata exists
  - Given the application is running
  - When the catalog page loads
  - Then the "navigation" lesson is listed with the correct title, description, and step count (6 steps)

- [ ] **AC2**: Initial filesystem complexity
  - Given the user starts the navigation lesson
  - When the first interactive step loads
  - Then the virtual filesystem has at least 3 levels of nested directories

- [ ] **AC3**: Steps 1-2 - Absolute and relative paths
  - Given the user is on steps 1 and 2
  - When they use absolute paths (e.g., `cd /home/user/documents`) and relative paths (e.g., `cd documents/work`)
  - Then the commands succeed and they progress

- [ ] **AC4**: Steps 3-4 - Current and parent directories
  - Given the user is on steps 3 and 4
  - When they use `.` / `./` and `..` / `../../`
  - Then the commands succeed and they progress

- [ ] **AC5**: Steps 5-6 - Home and previous directories
  - Given the user is on steps 5 and 6
  - When they use `~` / `cd` (no args) and `cd -`
  - Then the commands succeed and they progress

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Added Home directory shortcut step to `navigation.ts` and updated step count in `index.json` to 7 to match the spec's AC5 which includes `~`.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft