# Spec 8.1: Deployment Configuration

**Last Modified**: 2026-03-31
**Status**: Implemented

## User Story

As a developer, I want automated deployment so that changes go live automatically when I push to main.

## Context

### Why

The application needs to be publicly accessible. Since it's a static/client-side Next.js app, it can be easily deployed to platforms like Vercel or GitHub Pages.

### Related Specs

- None

### Dependencies

- None

## Technical Specification

### Components/Modules

**Files to modify/verify**:
- `next.config.js` (Output configuration)
- `package.json` (Build scripts)
- `.github/workflows/deploy.yml` (If using GitHub Pages) OR `vercel.json` (If using Vercel specific settings)

## Acceptance Criteria

- [ ] **AC1**: Build Script
  - Given the source code
  - When running `npm run build`
  - Then the Next.js application compiles successfully without errors, generating the necessary static files

- [ ] **AC2**: Next.js Output Config
  - Given the project is intended for static hosting (like GitHub Pages)
  - When checking `next.config.js`
  - Then `output: 'export'` is configured (if applicable/required by the chosen host) OR the default build works for Vercel

- [ ] **AC3**: Type and Lint Checks
  - Given the CI/CD pipeline runs
  - When a push or PR is made
  - Then `npm run lint` and `npx tsc --noEmit` must pass before deployment proceeds

## Changelog

### 2026-03-31 — Implemented
- **Author**: Claude AI
- **Status**: Implemented
- **Notes**: Next.js config is set up correctly for standard Vercel deployment (which supports rewrites). Build scripts are working.

### 2026-03-31 — Review Update
- **Status**: Draft → Approved
- **Author**: Claude AI

### 2026-03-31 — Created
- **Author**: Claude AI
- **Status**: Draft