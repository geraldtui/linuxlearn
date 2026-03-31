# Spec 1.10: echo Command

**Last Modified**: 2026-03-31
**Status**: Verified

## User Story

As a learner, I want to use the `echo` command to print text and write it to files, So that I can learn how shell output and file redirection works.

## Context

### Why
`echo` teaches two distinct concepts: printing to the terminal and output redirection (`>`, `>>`). These are foundational to understanding how shell pipelines and scripting work. The command parser (Spec 1.2) handles redirect tokenization; the echo handler consumes that parsed redirect.

### Related Specs
- Spec 1.1: Virtual Filesystem (provides `writeFile()`)
- Spec 1.2: Command Parser (parses `>` and `>>` redirects)
- Spec 1.3: Command Executor (registers this command)

### Dependencies
- Spec 1.1: Virtual Filesystem
- Spec 1.2: Command Parser

## Technical Specification

### Components/Modules

**New File**: `src/engine/commands/echo.ts`
- Exports `echo` command handler
- Joins all args as text
- If `parsed.redirect` present, calls `fs.writeFile()` with append flag
- Otherwise returns text as output

**Modified File**: `src/engine/commands/index.ts`
- Register `echo` in command registry

## Acceptance Criteria

- [ ] **AC1**: echo prints text to the terminal
  - Given the user types `echo Hello World`
  - When the command is executed
  - Then the output is `Hello World`

- [ ] **AC2**: echo with > writes text to a file
  - Given `greeting.txt` does not exist
  - When the user types `echo Hello > greeting.txt`
  - Then `greeting.txt` exists and `fs.cat('greeting.txt')` returns `Hello\n`

- [ ] **AC3**: echo with >> appends to an existing file
  - Given `greeting.txt` already contains `Hello\n`
  - When the user types `echo World >> greeting.txt`
  - Then `fs.cat('greeting.txt')` returns `Hello\nWorld\n`

- [ ] **AC4**: echo with redirect produces no terminal output
  - Given `file.txt` does not exist
  - When the user types `echo text > file.txt`
  - Then the terminal `output` string is empty

- [ ] **AC5**: echo preserves quoted strings as a single argument
  - Given the user types `echo "hello world"`
  - When the command is executed
  - Then the output is `hello world` (one string, not two words)

## Edge Cases

- `echo` with no args prints an empty line
- Redirect creates the file if it doesn't exist
- Redirect to a directory path returns an error

## Changelog

### 2026-03-31 — Verified
- **Author**: Claude AI
- **Status**: Verified
- **Validation Result**: COMPLIANT
- **Quality Score**: 9/10
- **Notes**: All 5 ACs validated against implementation, 3/3 edge cases handled, Clean Code principles followed
- **Issues Fixed**: None

### 2026-03-31 — Review Update
- **Changed**: AC1 "Given" clause added (was missing, started directly with "When")
- **Changed**: AC2 "Given" clause added (was missing)
- **Changed**: AC4 "Given" clause added (was missing)
- **Status**: Draft → Approved
- **Author**: Claude AI
