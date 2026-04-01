# auto-spec

Autonomously create, review, update, implement, and verify a feature specification from start to finish.

This command runs the complete Spec-Driven Development (SDD) workflow:
1. **Check for existing specs** - Search for matching specs, ask user if found
2. **Create spec** - Draft the specification (may ask clarifying questions)
3. **Review spec** - Validate completeness and quality
4. **Update spec** - Fix any issues found and mark as "Approved"
5. **Implement spec** - Write the code on a feature branch
6. **Verify spec** - Validate implementation and mark as "Verified"

**Prerequisites:**
- User provides a clear feature request or user story
- Agent may ask clarifying questions before creating the spec

**Usage:** /auto-spec [feature description]

**Example:** /auto-spec As a user, I want to export lesson progress to JSON, so that I can backup my learning data

---

You are an autonomous agent executing the full Spec-Driven Development workflow. Follow these steps:

## Step 1: Check for Existing Matching Specs

**Before creating a new spec, search for existing specs that might match.**

1. Extract keywords from the user's request (component names, feature areas, action verbs)
2. Use glob/grep to find potentially matching specs:
   ```bash
   find .specs -type f -name "*.md"
   grep -r "ComponentName\|feature-keyword" .specs/
   ```
3. Read potentially matching specs
4. Evaluate match quality (>70% = strong, 40-70% = partial, <40% = weak)
5. If match found, ask user:
   ```
   🔍 Found existing spec that matches:
   - Spec: [path]
   - Status: [status]
   - Overlap: [percentage]
   
   Would you like to:
   A) Update the existing spec
   B) Create a new spec
   ```
6. If user chooses update, use `/spec-update` instead and skip to Step 5 (implement)

## Step 2: Create Specification

**Use the spec-create skill to draft the specification.**

Read the skill file:
```
/Users/gerald.tui/.cursor/skills/spec-create/SKILL.md
```

Follow the skill instructions:
1. Gather information from user's request
2. Assess scope (split if >7 ACs or >3 components)
3. Read template if needed
4. Identify project context
5. Create the spec file in `.specs/[appropriate-folder]/[feature-name].md`
6. Include all required sections (User Story, Context, Technical Spec, ACs)
7. Keep it concise (under 200 lines preferred, 300 max)

**If you need clarifying questions, ask them now before proceeding.**

## Step 3: Review Specification

**Use the spec-review skill to validate the spec.**

Read the skill file:
```
/Users/gerald.tui/.cursor/skills/spec-review/SKILL.md
```

Follow the skill instructions:
1. Read the complete specification
2. Check structural completeness & conciseness
3. Validate user story quality
4. Check context clarity & brevity
5. Review technical specification conciseness
6. Validate acceptance criteria (3-7 ACs)
7. Check scope assessment
8. Detect ambiguities
9. Verify project alignment

Generate a review report identifying any issues.

## Step 4: Update Specification

**Use the spec-update skill to fix issues and mark as "Approved".**

Read the skill file:
```
/Users/gerald.tui/.cursor/skills/spec-update/SKILL.md
```

Follow the skill instructions:
1. Address all issues found in review
2. Update affected sections
3. Add changelog entry
4. Update status to "Approved"
5. Ensure spec remains concise

**Do NOT ask user for approval - autonomously fix issues and approve.**

## Step 5: Implement Specification

**Use the spec-exec skill to implement the feature.**

Read the skill file:
```
/Users/gerald.tui/.cursor/skills/spec-exec/SKILL.md
```

Follow the skill instructions:
1. Create feature branch: `git checkout -b feature/[feature-name]`
2. Read and understand the spec
3. Identify files to modify
4. Implement incrementally (one AC at a time)
5. Follow Uncle Bob's Clean Code principles:
   - Meaningful names
   - Small functions (5-15 lines)
   - No side effects
   - Self-documenting code
   - DRY (no duplication)
   - Frontend: Extract reusable components (no duplicate JSX)
6. Remove temporary/debug code
7. Run quality checks (linter, type check)
8. Update spec status to "Implemented"

**Do NOT ask user for approval - autonomously implement the spec.**

## Step 6: Verify Implementation

**Use the spec-verify skill to validate the implementation.**

Read the skill file:
```
/Users/gerald.tui/.cursor/skills/spec-verify/SKILL.md
```

Follow the skill instructions:
1. Read the specification
2. Validate Clean Code principles (FIRST)
3. Check data models
4. Check component structure
5. Validate each acceptance criterion (3-7 ACs)
6. Verify edge cases
7. Check error handling
8. Generate compliance report
9. Update spec status to "Verified"

**Do NOT ask user for approval - autonomously verify and mark as verified.**

## Step 7: Final Summary

Provide a comprehensive summary:

```markdown
# Auto-Spec Complete: [Feature Name]

## Specification
- **File**: .specs/[folder]/[feature-name].md
- **Status**: Verified ✅
- **Branch**: feature/[feature-name]

## Workflow Summary

### 1. Spec Created
- User Story: [brief]
- Acceptance Criteria: [count] ACs
- Scope: [line count] lines

### 2. Spec Reviewed
- Issues Found: [count]
- All issues resolved ✅

### 3. Spec Approved
- Status: Approved ✅

### 4. Implementation Complete
- Files Changed: [count]
- Clean Code: ✅ All principles followed
- Quality Checks: ✅ Linter and type check passed

### 5. Verification Complete
- Acceptance Criteria: [X/Y] satisfied
- Edge Cases: [X/Y] handled
- Validation Result: COMPLIANT ✅

## Files Changed
- [file1] - [description]
- [file2] - [description]

## Next Steps
- Manual testing recommended
- Review the changes in: .specs/[folder]/[feature-name].md
- Merge to main when ready: /feature-merge
```

## Important Notes

- **Autonomy**: Only ask clarifying questions during Step 2 (spec creation) if absolutely necessary
- **No approval gates**: Do NOT ask user to approve review, implementation, or verification
- **Quality**: Follow all Clean Code principles and spec guidelines
- **Transparency**: Provide clear summaries at each step
- **Error handling**: If any step fails, report the error and stop (don't continue)

## Error Handling

If any step fails:
1. Report which step failed and why
2. Provide the error details
3. Suggest how to fix it
4. Stop execution (don't continue to next steps)

## Success Criteria

A successful auto-spec execution should:
- Create a concise spec (under 200 lines)
- Have 3-7 testable acceptance criteria
- Pass review with no critical issues
- Implement all ACs following Clean Code principles
- Pass verification with COMPLIANT status
- Be ready for manual testing and merge
