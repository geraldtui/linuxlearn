# Spec 6.1: Basics Lesson Content

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a complete beginner, I want to learn the most fundamental Linux commands so that I can navigate and understand the terminal.

## Context

### Why

This is the introductory lesson for new users. It must teach the absolute basics (`pwd`, `ls`, `cd`, `clear`) in a gentle, step-by-step manner, building confidence before moving to more complex topics.

### Related Specs

- Phase 1 Command Specs (pwd, ls, cd, clear)
- Spec 2.2: Lesson Data Structure

### Dependencies

- Phase 1 Command Specs
- Spec 2.2: Lesson Data Structure

## Technical Specification

### Data Models

- Uses `StepData` interface from `src/types/index.ts`

### Components/Modules

**File**: `src/data/lessons/basics.ts`
- Exports an array of `StepData` objects.
- Defines the initial filesystem state and current working directory for the lesson.
- Implements custom validation logic (`customValidate`) where necessary.

**File**: `src/data/lessons/index.json`
- Needs to include metadata for the `basics` lesson (key: `basics`, slug: `basic-commands`).

## Acceptance Criteria

- [ ] **AC1**: Lesson metadata exists
  - Given the application is running
  - When the catalog page loads
  - Then the "basics" lesson is listed with the correct title, description, and step count (8 steps)

- [ ] **AC2**: Step 1 - Introduction
  - Given the user starts the basics lesson
  - When step 1 loads
  - Then it is a read-only informational step introducing the terminal

- [ ] **AC3**: Step 2 - pwd
  - Given the user is on step 2
  - When they type `pwd`
  - Then the command succeeds and they progress

- [ ] **AC4**: Steps 3-5 - ls variations
  - Given the user is on steps 3, 4, and 5
  - When they type `ls`, `ls -l`, and `ls -a` respectively
  - Then the commands succeed and teach the different flags

- [ ] **AC5**: Steps 6-8 - cd navigation
  - Given the user is on steps 6, 7, and 8
  - When they type `cd documents`, `cd ..`, and `cd ~` respectively
  - Then the filesystem state updates correctly and they progress

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Verified that `basics.ts` and `index.json` already contain the correct content and metadata matching the spec.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft