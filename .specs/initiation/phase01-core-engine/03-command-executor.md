# Spec 1.3: Command Executor

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want my commands to execute on the virtual filesystem, So that I can see realistic output and learn how Linux commands work.

## Context

### Why
The executor is the single entry point that ties together the parser, the command registry, and the filesystem. Without it, each command spec would need to wire up its own parsing and dispatch, creating duplication and inconsistency.

### Related Specs
- Specs 1.4–1.11: Each command registers a handler with this executor

### Dependencies
- Spec 1.1: Virtual Filesystem
- Spec 1.2: Command Parser

## Technical Specification

### Data Models

**File**: `src/types/index.ts`
- Add `ExecutionResult` interface: output, error?, exitCode

### Components/Modules

**New File**: `src/engine/commandExecutor.ts`
- Export `executeCommand(input: string, fs: VirtualFilesystem): ExecutionResult`
- Internally calls `parseCommand`, looks up handler in registry, calls handler

**New File**: `src/engine/commands/index.ts`
- Export `commandRegistry: Record<string, CommandHandler>`
- Export `CommandHandler` type: `(parsed: ParsedCommand, fs: VirtualFilesystem) => ExecutionResult`

## Acceptance Criteria

- [ ] **AC1**: A known command returns the correct output
  - Given a `VirtualFilesystem` with cwd `/home/user`
  - When `executeCommand('pwd', fs)` is called
  - Then `result.output` is `/home/user` and `result.exitCode` is `0`

- [ ] **AC2**: An unknown command returns a command-not-found error
  - Given any filesystem state
  - When `executeCommand('foobar', fs)` is called
  - Then `result.error` is `bash: foobar: command not found` and `result.exitCode` is `127`

- [ ] **AC3**: Command errors are surfaced through result.error
  - Given a filesystem where `nope.txt` does not exist
  - When `executeCommand('cat nope.txt', fs)` is called
  - Then `result.error` contains `No such file or directory` and `result.exitCode` is `1`

- [ ] **AC4**: State-changing commands update the filesystem
  - Given a filesystem where `projects` does not exist
  - When `executeCommand('mkdir projects', fs)` is called
  - Then `fs.isDirectory('projects')` returns `true`

- [ ] **AC5**: Empty input returns an empty result without error
  - Given any filesystem state
  - When `executeCommand('', fs)` is called
  - Then `result.output` is `''`, `result.error` is undefined, and `result.exitCode` is `0`

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 5 ACs validated against implementation; Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC1 rewritten with concrete command (`pwd`) and verifiable output (was "appropriate handler is invoked" — untestable)
- **Changed**: AC2 merged "command not found" from old AC5 into AC2 with explicit exitCode 127
- **Changed**: AC3 rewritten with concrete example (was "invalid command or execution error" — vague)
- **Changed**: AC5 (empty input) added as explicit criterion (previously only implied)
- **Removed**: Standalone "Error Handling" optional section — content was fully captured in ACs (redundant)
- **Status**: Draft → Approved
- **Author**: Claude AI
