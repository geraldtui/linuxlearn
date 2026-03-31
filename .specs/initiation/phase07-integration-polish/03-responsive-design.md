# Spec 7.3: Responsive Design

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a mobile user, I want to learn Linux commands on my phone or tablet with a touch-friendly interface.

## Context

### Why

The application must be usable on various device sizes. While a physical keyboard is ideal for terminal learning, the layout must adapt gracefully to smaller screens, ensuring the terminal input is accessible and the progress sidebar doesn't consume the whole screen.

### Related Specs

- All Phase 4 UI Components

### Dependencies

- All Phase 4 UI Components

## Technical Specification

### Components/Modules

**Files to modify/verify**:
- `src/pages/en/learn/[lesson].tsx` (Layout structure)
- `src/components/LearnProgress.tsx` (Sidebar to top-bar on mobile)
- `src/components/InteractiveTerminal.tsx` (Input sizing and focus)
- `src/components/LearnFooter.tsx` (Button sizing)

## Acceptance Criteria

- [ ] **AC1**: Mobile Layout (< 1024px)
  - Given the user is on a mobile device or narrow window
  - When viewing a lesson page
  - Then the layout stacks vertically: Header -> Horizontal Progress Bar -> Step Content (Terminal) -> Footer

- [ ] **AC2**: Desktop Layout (>= 1024px)
  - Given the user is on a desktop device
  - When viewing a lesson page
  - Then the layout uses a side-by-side structure: Progress Sidebar on the left, Step Content on the right

- [ ] **AC3**: Touch Targets
  - Given the user is on a touch device
  - When interacting with the UI
  - Then all buttons (Next, Previous, Catalog links) have a minimum touch target size of 44x44px

- [ ] **AC4**: Terminal Input on Mobile
  - Given the user is on a mobile device
  - When focusing the terminal input
  - Then the input field is full-width, uses a font size of at least 16px (to prevent iOS auto-zoom), and remains visible on screen

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Verified responsive design. The layout correctly stacks on mobile (`flex-col lg:flex-row`), input is full width, and touch targets are adequate. Added `text-base` (16px) to input to prevent iOS zoom.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft