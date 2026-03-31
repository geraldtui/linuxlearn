# Spec 2.2: Lesson Data Structure

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a content creator, I want a clear, self-contained data schema for lessons, So that I can add new lessons without modifying application code.

## Context

### Why

A well-defined lesson schema keeps content separate from logic. Each lesson is a standalone TypeScript file exporting an array of step objects; a JSON catalog lists all lessons for the UI. This lets contributors add content without touching engine, validation, or component code.

### Related Specs

- Spec 1.1: Virtual Filesystem (provides `FileSystemTree` type used in `initialFS`)
- Spec 2.1: Command Validator (consumes `StepData` for validation)
- Spec 3.1: InteractiveTerminalContext (consumes `StepData[]` and `LessonMeta`)

### Dependencies

- Spec 1.1: Virtual Filesystem (`FileSystemTree` type)

## Technical Specification

### Data Models

**File**: `src/types/index.ts`
- `StepData` interface — fields: title, description, content?, expectedCommand (string[]), expectedOutput?, initialFS (FileSystemTree), initialCwd, interactive, readOnly?, hint?, customValidate?
- `LessonMeta` interface — fields: key, slug, title, description, stepCount

### Components/Modules

**Files**:
- `src/data/lessons/index.json` — JSON array of `LessonMeta` objects (lesson catalog)
- `src/data/lessons/{key}.ts` — Each exports a default `StepData[]` array

## Acceptance Criteria

- [ ] **AC1**: StepData interface contains all required fields
  - Given a developer opens `src/types/index.ts`
  - When they inspect the `StepData` interface
  - Then it has fields: title (string), description (string), expectedCommand (string[]), initialFS (FileSystemTree), initialCwd (string), interactive (boolean)

- [ ] **AC2**: LessonMeta interface contains all required fields
  - Given a developer opens `src/types/index.ts`
  - When they inspect the `LessonMeta` interface
  - Then it has fields: key (string), slug (string), title (string), description (string), stepCount (number)

- [ ] **AC3**: Lesson catalog is valid JSON conforming to LessonMeta[]
  - Given the file `src/data/lessons/index.json`
  - When it is parsed
  - Then each entry has key, slug, title, description, and stepCount fields

- [ ] **AC4**: Lesson files export StepData[] arrays
  - Given a lesson file like `src/data/lessons/basics.ts`
  - When it is imported
  - Then the default export is a non-empty array of objects conforming to `StepData`

- [ ] **AC5**: Non-interactive steps have readOnly true and empty expectedCommand
  - Given a step with `interactive: false`
  - When the step data is inspected
  - Then `readOnly` is `true` and `expectedCommand` is `[]`

- [ ] **AC6**: Each step's initialFS is a valid FileSystemTree
  - Given any step in any lesson
  - When its `initialFS` is inspected
  - Then it is a non-empty tree whose nodes have `type: 'dir'` or `type: 'file'`

## Edge Cases

- Lesson file with zero steps is invalid (should have at least 1 step)
- Steps may omit optional fields (content, expectedOutput, hint, customValidate, readOnly)
- customValidate functions are not JSON-serializable — lesson data must be loaded client-side via dynamic import
- `stepCount` in catalog should match the actual array length in the lesson file (validated at integration, not build time)

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 6 ACs validated against implementation, 4/4 edge cases handled, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: Added edge case for `stepCount` / actual array length consistency
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft
