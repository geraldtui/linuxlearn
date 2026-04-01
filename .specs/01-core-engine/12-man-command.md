# Spec 1.12: Man Command with Hidden Hints

**Status**: Verified
**Last Modified**: 2026-04-01

## User Story
As a learner, I want to use the 'man' command to view manual pages for available commands, So that I can learn command syntax and options while completing lessons.

## Context

The `man` (manual) command is essential for Linux learning - it's how users discover command options and syntax in real Linux environments. This spec adds:
1. A new `man` command to the virtual terminal engine
2. UI enhancement to hide hints until clicked
3. Lesson description updates to remind users about `man` availability

**Related Specs:**
- Spec 1.3: Command Executor (adds new command to registry)
- Spec 4.2: Step Component (adds hint toggle UI)
- Spec 6.1-6.3: Lesson Content (updates descriptions)

## Technical Specification

### Data Models

**File**: `src/types/index.ts`
- Add `manPages` optional property to `StepData` interface (type: `Record<string, string>`)

### Components/Modules

**File (NEW)**: `src/engine/commands/man.ts`
- Implements `man` command handler
- Returns manual page content for supported commands
- Returns error for unsupported commands

**File (MODIFIED)**: `src/engine/commands/index.ts`
- Register `man` command in command registry

**File (MODIFIED)**: `src/components/Step.tsx`
- Add state for hint visibility toggle
- Add "Show Hint" button that reveals hint on click
- Hide hint by default

**File (MODIFIED)**: `src/data/lessons/*.ts`
- Update all step descriptions to include: "Use 'man [command]' to view command usage."

### Manual Page Content

**File (NEW)**: `src/data/manPages.ts`
- Export manual page content for all implemented commands (pwd, ls, cd, mkdir, touch, cat, echo, rm, clear)
- Format: command name, synopsis, description, common options

## Acceptance Criteria

- [x] **AC1**: Man command displays manual page
  - Given user types `man ls`
  - When command is executed
  - Then manual page for `ls` is displayed with synopsis and options

- [x] **AC2**: Man command handles unknown commands
  - Given user types `man unknowncommand`
  - When command is executed
  - Then error message "No manual entry for unknowncommand" is displayed

- [x] **AC3**: Man command works for all implemented commands
  - Given any of: pwd, ls, cd, mkdir, touch, cat, echo, rm, clear
  - When user types `man [command]`
  - Then appropriate manual page is displayed

- [x] **AC4**: Hints are hidden by default
  - Given user is on any interactive step
  - When step loads
  - Then hint is not visible

- [x] **AC5**: Hints can be revealed
  - Given hint is hidden
  - When user clicks "Show Hint" button
  - Then hint text is displayed

- [x] **AC6**: Lesson descriptions mention man command
  - Given user is on any interactive step
  - When reading the step description
  - Then description includes reminder about `man` command availability

## Edge Cases

- `man` without arguments returns error: "What manual page do you want?"
- `man man` returns manual page for the man command itself
- Manual pages are lesson-agnostic (same content across all lessons)
- Hint toggle state resets when navigating to different step

## Changelog

### 2026-04-01 - Verified
- All 6 acceptance criteria satisfied
- Clean Code principles followed
- Implementation complete and validated

### 2026-04-01 - Initial Creation
- Created specification for man command and hint toggle feature
- Defined 6 acceptance criteria
- Identified 4 files to modify, 2 files to create
