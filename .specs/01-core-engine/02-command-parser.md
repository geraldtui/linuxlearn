# Spec 1.2: Command Parser

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to type Linux commands in any common format, So that I don't have to worry about exact flag order or spacing rules.

## Context

### Why
Users type commands in varied formats (different flag orders, extra spaces, quoted strings). The parser must normalise these variations into a consistent structure so command handlers and the validator can work reliably regardless of how the user typed the input.

### Related Specs
- Spec 1.3: Command Executor (consumes ParsedCommand)
- Spec 2.1: Command Validator (uses normaliseCommand for comparison)

### Dependencies
- None

## Technical Specification

### Data Models

**File**: `src/types/index.ts`
- `ParsedCommand` interface: command, flags, args, raw, redirect?

### Components/Modules

**New File**: `src/utils/commandParser.ts`
- Export `parseCommand(input: string): ParsedCommand`
- Export `normalizeCommand(cmd: string): string` (for validator normalisation)
- Internal `tokenize()` helper (handles quoted strings)

## Acceptance Criteria

- [ ] **AC1**: Basic command parsing extracts command, flags, and args
  - Given input `"ls -l /home"`
  - When `parseCommand` is called
  - Then result is `{ command: 'ls', flags: { l: true }, args: ['/home'] }`

- [ ] **AC2**: Combined and separated flags are equivalent
  - Given inputs `"ls -la"`, `"ls -l -a"`, and `"ls -a -l"`
  - When `parseCommand` is called on each
  - Then all three produce `flags: { l: true, a: true }`

- [ ] **AC3**: Quoted strings are preserved as a single argument
  - Given input `'echo "hello world"'`
  - When `parseCommand` is called
  - Then `args` is `["hello world"]` (one element, not two)

- [ ] **AC4**: Redirects are detected and separated from args
  - Given input `'echo text > file.txt'`
  - When `parseCommand` is called
  - Then `redirect` is `{ type: '>', target: 'file.txt' }` and `args` is `['text']`

- [ ] **AC5**: Extra whitespace between tokens does not affect output
  - Given input `"ls    -l     /home"`
  - When `parseCommand` is called
  - Then result is identical to parsing `"ls -l /home"`

- [ ] **AC6**: Empty input returns an empty ParsedCommand
  - Given input `""`  or whitespace-only input
  - When `parseCommand` is called
  - Then `command` is `''` and `flags`, `args` are empty

## Edge Cases

- Unclosed quotes: treat remaining characters as a single unquoted token
- `>>` redirect is correctly distinguished from `>`
- Input with only flags and no command (e.g. `"-la"`) sets command to `"-la"`

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 6 ACs validated against implementation, 3/3 edge cases; Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: User story rewritten to reflect learner perspective (was describing system internals)
- **Changed**: AC5 "Then" clause made specific — now states the output equals parsing without extra spaces (was "parsing works correctly")
- **Changed**: AC6 (empty input) promoted from Edge Cases into a full AC for explicit testability
- **Changed**: Edge Case "unclosed quotes" clarified from "handle gracefully" to concrete expected behaviour
- **Changed**: Edge Cases trimmed to 3 critical items
- **Status**: Draft → Approved
- **Author**: Claude AI
