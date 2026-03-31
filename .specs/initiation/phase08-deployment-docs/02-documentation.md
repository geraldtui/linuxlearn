# Spec 8.2: Documentation

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a contributor or maintainer, I want clear documentation so that I can understand and extend the project.

## Context

### Why

Good documentation is essential for open-source projects or future maintenance. It explains how the architecture works, how to run the project locally, and how to add new lesson content.

### Related Specs

- `sys-design.md`
- `sdd-roadmap.md`

### Dependencies

- None

## Technical Specification

### Components/Modules

**Files to create/modify**:
- `README.md` (Main project documentation)
- `LESSONS.md` (Optional: Guide on creating new lessons)

## Acceptance Criteria

- [ ] **AC1**: README Overview
  - Given the `README.md` file
  - When a user reads it
  - Then it contains a clear project description, list of features, and the tech stack used

- [ ] **AC2**: Setup Instructions
  - Given a new developer clones the repo
  - When they follow the `README.md`
  - Then there are clear, working instructions for `npm install` and `npm run dev`

- [ ] **AC3**: Content Creation Guide
  - Given a contributor wants to add a new Linux command lesson
  - When they look for documentation
  - Then there is a section in `README.md` (or a separate `LESSONS.md`) explaining the `StepData` structure and how to add a file to `src/data/lessons/`

- [ ] **AC4**: Architecture Reference
  - Given a developer wants to understand the codebase
  - When they read the `README.md`
  - Then there is a brief explanation of the Client-side Virtual Filesystem and Command Execution flow, or a link to `sys-design.md`

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Updated README.md to include detailed instructions on adding new lessons via `StepData` and a brief architecture overview linking to `sys-design.md`.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft