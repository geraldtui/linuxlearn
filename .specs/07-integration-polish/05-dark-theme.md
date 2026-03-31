# Spec 7.5: Dark Theme Styling

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a learner, I want a beautiful, modern dark interface that's easy on the eyes during long learning sessions.

## Context

### Why

A cohesive dark theme matches the aesthetic of real terminal environments and reduces eye strain. This spec ensures consistent application of the Tailwind configuration across all components.

### Related Specs

- All Phase 4 UI Components

### Dependencies

- All Phase 4 UI Components

## Technical Specification

### Components/Modules

**Files to modify/verify**:
- `tailwind.config.js` (Theme colors)
- `src/styles/globals.css` (Base styles)
- All components in `src/components/` and `src/pages/`

## Acceptance Criteria

- [ ] **AC1**: Global Background
  - Given the application is running
  - When viewing any page (Landing, Catalog, Lesson, 404)
  - Then the global background is a consistent dark color (`bg-terminal-bg` / `#0f172a`)

- [ ] **AC2**: Typography
  - Given text is rendered
  - When inspecting the fonts
  - Then UI elements use the standard sans-serif stack, and all terminal inputs/outputs use a monospace font (`JetBrains Mono`, `Fira Code`, or `monospace`)

- [ ] **AC3**: Color Consistency
  - Given the user interacts with the UI
  - When viewing components (buttons, borders, text)
  - Then they strictly use the defined Tailwind palette (`terminal-surface`, `terminal-text`, `terminal-muted`, `terminal-prompt`, `terminal-success`, `terminal-error`) without hardcoded hex values in components

- [ ] **AC4**: Focus States
  - Given the user navigates using a keyboard (Tab)
  - When an interactive element (link, button, input) receives focus
  - Then it has a clear, visible focus ring or outline for accessibility

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Verified that `tailwind.config.js` and `globals.css` correctly implement the dark theme palette and typography specified.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft